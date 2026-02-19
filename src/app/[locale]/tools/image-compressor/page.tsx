'use client';

import { useState, useRef, useCallback } from 'react';
import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from 'framer-motion';

type CompressedFile = {
    id: string;
    originalFile: File;
    previewUrl: string;
    compressedBlob: Blob | null;
    compressedUrl: string | null;
    status: 'pending' | 'processing' | 'done' | 'error';
    originalSize: number;
    compressedSize: number;
    finalQuality: number; // To track what quality resulted in the target size
    isDownloaded: boolean;
};

type CompressionMode = 'manual' | 'auto';

export default function ImageCompressorPage() {
    const [files, setFiles] = useState<CompressedFile[]>([]);
    const [mode, setMode] = useState<CompressionMode>('auto');
    const [quality, setQuality] = useState(0.8); // Manual quality (0-1)
    const [targetSizeMB, setTargetSizeMB] = useState(0.5); // Target size in MB for Auto mode
    const [isDragOver, setIsDragOver] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const formatSize = (bytes: number) => {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const compressToQuality = (canvas: HTMLCanvasElement, quality: number): Promise<Blob | null> => {
        return new Promise((resolve) => {
            canvas.toBlob((blob) => {
                resolve(blob);
            }, 'image/webp', quality);
        });
    };

    const processFile = async (fileObj: CompressedFile, currentMode: CompressionMode, currentQuality: number, currentTargetMB: number) => {
        return new Promise<void>((resolve) => {
            const img = document.createElement('img');
            img.src = fileObj.previewUrl;
            img.onload = async () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    setFiles(prev => prev.map(f => f.id === fileObj.id ? { ...f, status: 'error' } : f));
                    resolve();
                    return;
                }
                ctx.drawImage(img, 0, 0);

                let finalBlob: Blob | null = null;
                let finalQ = currentQuality;

                if (currentMode === 'manual') {
                    finalBlob = await compressToQuality(canvas, currentQuality);
                } else {
                    // Auto Mode: Binary search for the best quality under target size
                    // We want the highest quality that is <= targetSize
                    // Range: 0.05 to 0.95

                    const targetBytes = currentTargetMB * 1024 * 1024;
                    let minQ = 0.05;
                    let maxQ = 0.95;
                    let bestBlob: Blob | null = null;
                    let bestQ = 0.5;

                    // Optimization: Try 0.9 first, if it's already under, keep it.
                    // This avoids quality degradation if the original is already small enough.
                    const highQBlob = await compressToQuality(canvas, 0.9);
                    if (highQBlob && highQBlob.size <= targetBytes) {
                        finalBlob = highQBlob;
                        finalQ = 0.9;
                    } else {
                        // Binary search
                        for (let i = 0; i < 6; i++) { // 6 iterations is enough precision
                            const midQ = (minQ + maxQ) / 2;
                            const blob = await compressToQuality(canvas, midQ);

                            if (blob) {
                                if (blob.size <= targetBytes) {
                                    // It fits! Try to get better quality
                                    bestBlob = blob;
                                    bestQ = midQ;
                                    minQ = midQ; // Look in upper half
                                } else {
                                    // Too big, reduce quality
                                    maxQ = midQ; // Look in lower half
                                }
                            }
                        }
                        finalBlob = bestBlob || await compressToQuality(canvas, minQ); // Fallback to lowest checked
                        finalQ = bestQ;
                    }
                }

                if (finalBlob) {
                    const compressedUrl = URL.createObjectURL(finalBlob);
                    setFiles(prev => prev.map(f => f.id === fileObj.id ? {
                        ...f,
                        compressedBlob: finalBlob,
                        compressedUrl,
                        compressedSize: finalBlob!.size,
                        finalQuality: finalQ,
                        status: 'done'
                    } : f));
                } else {
                    setFiles(prev => prev.map(f => f.id === fileObj.id ? { ...f, status: 'error' } : f));
                }
                resolve();
            };
            img.onerror = () => {
                setFiles(prev => prev.map(f => f.id === fileObj.id ? { ...f, status: 'error' } : f));
                resolve();
            };
        });
    };

    const handleFiles = useCallback(async (newFiles: File[]) => {
        const validFiles = newFiles.filter(f => f.type.startsWith('image/'));

        const newFileObjs: CompressedFile[] = validFiles.map(f => ({
            id: Math.random().toString(36).substr(2, 9),
            originalFile: f,
            previewUrl: URL.createObjectURL(f),
            compressedBlob: null,
            compressedUrl: null,
            status: 'pending',
            originalSize: f.size,
            compressedSize: 0,
            finalQuality: 0,
            isDownloaded: false
        }));

        setFiles(prev => [...prev, ...newFileObjs]);

        // Process immediately
        for (const fileObj of newFileObjs) {
            setFiles(prev => prev.map(f => f.id === fileObj.id ? { ...f, status: 'processing' } : f));
            await processFile(fileObj, mode, quality, targetSizeMB);
        }
    }, [mode, quality, targetSizeMB]);

    const onDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const onDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        if (e.dataTransfer.files) {
            handleFiles(Array.from(e.dataTransfer.files));
        }
    };

    const reprocessAll = async (newMode: CompressionMode, newQuality: number, newTargetMB: number) => {
        setMode(newMode);
        setQuality(newQuality);
        setTargetSizeMB(newTargetMB);

        const filesToProcess = files.map(f => ({ ...f, status: 'processing' as const }));
        setFiles(filesToProcess);

        for (const fileObj of filesToProcess) {
            await processFile(fileObj, newMode, newQuality, newTargetMB);
        }
    };

    const removeFile = (id: string) => {
        setFiles(prev => prev.filter(f => f.id !== id));
    };

    const downloadAll = async () => {
        const newFiles = files.map(f => {
            if (f.compressedUrl && f.status === 'done') {
                const link = document.createElement('a');
                link.href = f.compressedUrl;
                link.download = f.originalFile.name.replace(/\.[^/.]+$/, "") + '.webp';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                return { ...f, isDownloaded: true };
            }
            return f;
        });
        setFiles(newFiles);
    };

    return (
        <div className="min-h-screen bg-[#001D39] text-white font-sans py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Header */}
                <div className="text-center space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-center gap-3"
                    >
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#D4A017] to-[#B8860B] flex items-center justify-center shadow-lg shadow-[#D4A017]/20">
                            <Icon icon="mdi:image-filter-hdr" className="text-2xl text-white" />
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                            Dallas <span className="text-[#D4A017]">Image Compressor</span>
                        </h1>
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-400 max-w-lg mx-auto"
                    >
                        Smart WebP Converter. Reduces file size while maintaining visual quality.
                    </motion.p>
                </div>

                {/* Upload Area */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className={`border-2 border-dashed rounded-[2rem] p-10 text-center cursor-pointer transition-all duration-300 ${isDragOver ? 'border-[#D4A017] bg-[#D4A017]/5 scale-[1.02]' : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'}`}
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                    onClick={() => fileInputRef.current?.click()}
                >
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        multiple
                        accept="image/*"
                        onChange={(e) => e.target.files && handleFiles(Array.from(e.target.files))}
                    />
                    <div className="bg-white/5 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10">
                        <Icon icon="mdi:cloud-upload" className={`text-4xl transition-colors ${isDragOver ? 'text-[#D4A017]' : 'text-slate-400'}`} />
                    </div>
                    <p className="text-xl font-bold text-white mb-2">Drag & Drop images here</p>
                    <p className="text-slate-500 text-sm">or click to browse from your device</p>
                </motion.div>

                {/* Controls & List */}
                {files.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        {/* Controls */}
                        <div className="bg-[#1e293b] p-6 rounded-3xl border border-white/5 space-y-6">
                            {/* Mode Selection */}
                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1 space-y-4">
                                    <div className="flex bg-black/20 p-1 rounded-xl w-fit">
                                        <button
                                            onClick={() => reprocessAll('auto', quality, targetSizeMB)}
                                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${mode === 'auto' ? 'bg-[#D4A017] text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                                        >
                                            Auto (Target Size)
                                        </button>
                                        <button
                                            onClick={() => reprocessAll('manual', quality, targetSizeMB)}
                                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${mode === 'manual' ? 'bg-[#D4A017] text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                                        >
                                            Manual Quality
                                        </button>
                                    </div>

                                    {mode === 'auto' ? (
                                        <div>
                                            <div className="flex justify-between mb-2">
                                                <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Max File Size</label>
                                                <span className="text-sm font-bold text-[#D4A017]">{targetSizeMB} MB</span>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <input
                                                    type="range"
                                                    min="0.1"
                                                    max="5"
                                                    step="0.1"
                                                    value={targetSizeMB}
                                                    onChange={(e) => reprocessAll('auto', quality, parseFloat(e.target.value))}
                                                    className="flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#D4A017]"
                                                />
                                                <div className="flex gap-2">
                                                    {[0.2, 0.5, 1, 2].map(size => (
                                                        <button
                                                            key={size}
                                                            onClick={() => reprocessAll('auto', quality, size)}
                                                            className={`px-2 py-1 rounded text-xs font-bold border ${targetSizeMB === size ? 'border-[#D4A017] text-[#D4A017]' : 'border-white/10 text-slate-500 hover:border-white/30'}`}
                                                        >
                                                            {size}MB
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-xs text-slate-500 mt-2">
                                                System will automatically adjust quality to get under {targetSizeMB}MB.
                                                <span className="text-[#D4A017] ml-1">Recommended for Web: 0.2MB - 0.5MB</span>
                                            </p>
                                        </div>
                                    ) : (
                                        <div>
                                            <div className="flex justify-between mb-2">
                                                <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Compression Quality</label>
                                                <span className="text-sm font-bold text-[#D4A017]">{Math.round(quality * 100)}%</span>
                                            </div>
                                            <input
                                                type="range"
                                                min="0.1"
                                                max="1"
                                                step="0.1"
                                                value={quality}
                                                onChange={(e) => reprocessAll('manual', parseFloat(e.target.value), targetSizeMB)}
                                                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#D4A017]"
                                            />
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-end">
                                    <button
                                        onClick={downloadAll}
                                        className="w-full sm:w-auto h-12 px-8 bg-[#D4A017] hover:bg-[#B8860B] text-white rounded-xl font-bold uppercase tracking-widest text-xs shadow-lg shadow-[#D4A017]/20 transition-all active:scale-95 flex items-center justify-center gap-2"
                                    >
                                        <Icon icon="mdi:download-multiple" className="text-lg" />
                                        Download All
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* File List */}
                        <div className="grid grid-cols-1 gap-4">
                            <AnimatePresence>
                                {files.map((file) => (
                                    <motion.div
                                        key={file.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className="bg-[#1e293b] p-4 rounded-2xl border border-white/5 flex items-center gap-4 group"
                                    >
                                        {/* Preview */}
                                        <div className="w-16 h-16 bg-black/20 rounded-xl overflow-hidden flex-shrink-0 relative">
                                            <img src={file.previewUrl} className="w-full h-full object-cover" alt="preview" />
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1 min-w-0">
                                            <p className="font-bold text-white text-sm truncate">{file.originalFile.name}</p>
                                            <div className="flex items-center gap-2 mt-1 flex-wrap">
                                                <span className="text-xs text-slate-500 line-through">{formatSize(file.originalSize)}</span>
                                                <Icon icon="mdi:arrow-right" className="text-xs text-slate-600" />
                                                {file.status === 'done' ? (
                                                    <>
                                                        <span className={`text-xs font-bold ${file.compressedSize > (targetSizeMB * 1024 * 1024) && mode === 'auto' ? 'text-amber-500' : 'text-[#4ade80]'}`}>
                                                            {formatSize(file.compressedSize)}
                                                        </span>
                                                        <span className="text-[10px] text-slate-500">
                                                            (Q: {Math.round(file.finalQuality * 100)}%)
                                                        </span>
                                                    </>
                                                ) : (
                                                    <span className="text-xs text-[#D4A017] animate-pulse">Processing...</span>
                                                )}
                                                {file.status === 'done' && (
                                                    <span className="text-[10px] px-2 py-0.5 bg-white/5 rounded-full text-[#4ade80] font-bold">
                                                        -{Math.round(((file.originalSize - file.compressedSize) / file.originalSize) * 100)}%
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center gap-2">
                                            {file.status === 'done' && file.compressedUrl && (
                                                <a
                                                    href={file.compressedUrl}
                                                    download={file.originalFile.name.replace(/\.[^/.]+$/, "") + '.webp'}
                                                    onClick={() => {
                                                        setFiles(prev => prev.map(f => f.id === file.id ? { ...f, isDownloaded: true } : f));
                                                    }}
                                                    className={`w-10 h-10 flex items-center justify-center rounded-full transition-all ${file.isDownloaded ? 'bg-[#4ade80] text-[#1e293b]' : 'bg-white/5 hover:bg-[#D4A017] text-slate-400 hover:text-white'}`}
                                                    title={file.isDownloaded ? "Downloaded" : "Download"}
                                                >
                                                    <Icon icon={file.isDownloaded ? "mdi:check-bold" : "mdi:download"} className="text-lg" />
                                                </a>
                                            )}

                                            <button
                                                onClick={() => removeFile(file.id)}
                                                className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-500 rounded-full transition-all"
                                                title="Remove"
                                            >
                                                <Icon icon="mdi:close" className="text-lg" />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
