// image-compressor: simple video to WebM compressor using ffmpeg
// Usage: node index.js <inputFile> <outputFile>
// Requires ffmpeg installed and available in PATH.

const { execFile } = require('child_process');
const path = require('path');

function compressVideo(inputPath, outputPath) {
    return new Promise((resolve, reject) => {
        const args = [
            '-i', inputPath,
            '-c:v', 'libvpx',
            '-crf', '10',
            '-b:v', '1M',
            '-c:a', 'libvorbis',
            outputPath,
        ];
        execFile('ffmpeg', args, (error, stdout, stderr) => {
            if (error) {
                reject(new Error(`ffmpeg error: ${stderr}`));
            } else {
                resolve(stdout);
            }
        });
    });
}

if (require.main === module) {
    const [, , inputFile, outputFile] = process.argv;
    if (!inputFile || !outputFile) {
        console.error('Usage: node index.js <inputFile> <outputFile>');
        process.exit(1);
    }
    const outPath = outputFile.endsWith('.webm') ? outputFile : `${outputFile}.webm`;
    compressVideo(inputFile, outPath)
        .then(() => console.log(`Compressed to ${outPath}`))
        .catch(err => {
            console.error('Compression failed:', err.message);
            process.exit(1);
        });
}

module.exports = { compressVideo };
