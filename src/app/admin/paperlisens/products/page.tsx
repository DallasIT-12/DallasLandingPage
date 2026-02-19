'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Icon } from '@iconify/react';
import Link from 'next/link';

// --- DND KIT IMPORTS ---
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  rectSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// --- SORTABLE IMAGE COMPONENT ---
function SortableImage({ url, index, onRemove }: { url: string; index: number; onRemove: () => void }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: url });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 100 : 1,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative w-24 h-24 rounded-2xl overflow-hidden border border-white/10 group shadow-2xl cursor-grab active:cursor-grabbing"
    >
      <img
        src={url}
        alt=""
        className="w-full h-full object-cover select-none"
        {...attributes}
        {...listeners}
      />
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        className="absolute top-1 right-1 w-6 h-6 bg-rose-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-10"
      >
        <Icon icon="lucide:x" className="text-xs" />
      </button>
      {index === 0 && (
        <div className="absolute bottom-0 left-0 right-0 bg-[#d6bd98] text-[#111827] text-[7px] font-black py-1 text-center uppercase tracking-tighter">
          Thumbnail
        </div>
      )}
    </div>
  );
}

// --- TYPE DEFINITIONS ---
type ProductVariant = {
  id: string;
  variant_name?: string | null;
  variant_name_en?: string | null;
  variant_name_zh?: string | null;
  variant_name_2?: string | null;
  variant_name_2_en?: string | null;
  variant_name_2_zh?: string | null;
  price: number;
  image: string;
  images: string[];
  variant_slug: string;
};

type Product = {
  id: string;
  productSlug: string;
  name: string;
  name_en?: string;
  name_zh?: string;
  category: string;
  slug?: string;
  price: number;
  image: string;
  images: string[];
  description?: string;
  description_en?: string;
  description_zh?: string;
  variants?: ProductVariant[];
  attr_label_1?: string;
  attr_label_2?: string;
};

const CATEGORY_SLUGS = [
  { slug: 'box-cupcake', label: 'Box Cupcake' },
  { slug: 'paper-tray', label: 'Paper Tray' },
  { slug: 'box-take-away', label: 'Box Take Away' },
  { slug: 'tempat-pensil', label: 'Tempat Pensil' },
  { slug: 'lain-lain', label: 'Lain-lain' },
];

const labelClasses = "block text-[10px] font-black text-slate-500 uppercase mb-2 tracking-[0.2em]";
const inputClasses = "w-full p-4 bg-[#0f172a] border border-white/10 rounded-2xl outline-none focus:ring-2 focus:ring-[#d6bd98] text-white transition-all shadow-inner";

// --- MAIN PAGE COMPONENT ---
export default function PaperlisensProductsAdmin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  // Edit Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Shopee-style Variant Options
  const [v1Options, setV1Options] = useState('');
  const [v2Options, setV2Options] = useState('');
  const [isBulkPrice, setIsBulkPrice] = useState(false);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/paperlisens/products');
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const filteredProducts = useMemo(() => {
    return products
      .filter(p => filterCategory ? p.category === filterCategory : true)
      .filter(p => searchQuery ? p.name.toLowerCase().includes(searchQuery.toLowerCase()) : true);
  }, [products, searchQuery, filterCategory]);

  const handleEditClick = async (product: Product) => {
    try {
      const res = await fetch(`/api/paperlisens/products/${product.productSlug}`);
      let data;
      if (res.ok) {
        data = await res.json();
      } else {
        data = JSON.parse(JSON.stringify(product));
      }

      // LOGIK LEBIH KETAT:
      // Gunakan data ASLI dari database (baseImage/baseGallery).
      // Jangan gunakan fallback varian agar tidak tercampur.

      const dbImage = data.baseImage || '/placeholder.png';
      const dbGallery = Array.isArray(data.baseGallery) && data.baseGallery.length > 0
        ? data.baseGallery
        : [dbImage];

      // Bersihkan dari duplikat/invalid
      const finalGallery = Array.from(new Set(dbGallery.filter((img: string) => !!img)));

      setEditingProduct({
        ...data,
        images: finalGallery,
        image: dbImage,
        slug: data.slug || CATEGORY_SLUGS.find(c => c.label === data.category)?.slug || 'lain-lain'
      });

      // Initialize variant options for Shopee-style generator
      const v1s = Array.from(new Set((data.variants || []).map((v: any) => v.variant_name).filter(Boolean)));
      const v2s = Array.from(new Set((data.variants || []).map((v: any) => v.variant_name_2).filter(Boolean)));
      setV1Options(v1s.join(', '));
      setV2Options(v2s.join(', '));

    } catch (err) {
      setEditingProduct(JSON.parse(JSON.stringify(product)));
    }
    setIsEditModalOpen(true);
  };

  const handleAddClick = () => {
    setEditingProduct({
      id: '',
      productSlug: '',
      name: '',
      category: CATEGORY_SLUGS[0].label,
      slug: CATEGORY_SLUGS[0].slug,
      price: 0,
      image: '/placeholder.png',
      images: ['/placeholder.png'],
      description: '',
      variants: []
    });
    setV1Options('');
    setV2Options('');
    setIsEditModalOpen(true);
  };

  const generateVariants = () => {
    if (!editingProduct) return;

    const opt1 = v1Options.split(',').map(s => s.trim()).filter(Boolean);
    const opt2 = v2Options.split(',').map(s => s.trim()).filter(Boolean);

    if (opt1.length === 0 && opt2.length === 0) {
      alert('Masukkan setidaknya satu pilihan variasi.');
      return;
    }

    const existingVariants = editingProduct.variants || [];
    const variantMap = new Map();
    existingVariants.forEach(v => {
      const key = `${v.variant_name || ''}|${(v as any).variant_name_2 || ''}`;
      variantMap.set(key, v);
    });

    const newVariants: ProductVariant[] = [];

    if (opt1.length > 0 && opt2.length > 0) {
      opt1.forEach(o1 => {
        opt2.forEach(o2 => {
          const key = `${o1}|${o2}`;
          if (variantMap.has(key)) {
            newVariants.push(variantMap.get(key));
          } else {
            newVariants.push({
              id: `new-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
              variant_name: o1,
              variant_name_2: o2,
              price: editingProduct.price,
              image: '/placeholder.png',
              images: [],
              variant_slug: `${editingProduct.productSlug || 'prod'}-v${Math.random().toString(36).substr(2, 5)}`
            } as any);
          }
        });
      });
    } else if (opt1.length > 0) {
      opt1.forEach(o1 => {
        const key = `${o1}|`;
        if (variantMap.has(key)) {
          newVariants.push(variantMap.get(key));
        } else {
          newVariants.push({
            id: `new-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
            variant_name: o1,
            price: editingProduct.price,
            image: '/placeholder.png',
            images: [],
            variant_slug: `${editingProduct.productSlug || 'prod'}-v${Math.random().toString(36).substr(2, 5)}`
          } as any);
        }
      });
    } else if (opt2.length > 0) {
      opt2.forEach(o2 => {
        const key = `|${o2}`;
        if (variantMap.has(key)) {
          newVariants.push(variantMap.get(key));
        } else {
          newVariants.push({
            id: `new-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
            variant_name: '',
            variant_name_2: o2,
            price: editingProduct.price,
            image: '/placeholder.png',
            images: [],
            variant_slug: `${editingProduct.productSlug || 'prod'}-v${Math.random().toString(36).substr(2, 5)}`
          } as any);
        }
      });
    }

    setEditingProduct({
      ...editingProduct,
      variants: newVariants
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!editingProduct) return;

    setIsSaving(true);
    try {
      const isNew = !editingProduct.id || editingProduct.id.startsWith('new-');
      const targetSlug = editingProduct.productSlug;
      const url = isNew ? '/api/paperlisens/products' : `/api/paperlisens/products/${targetSlug}`;
      const method = isNew ? 'POST' : 'PUT';

      // Pastikan data yang dikirim bersih
      const payload = { ...editingProduct };
      if (isNew) {
        // Jangan kirim ID temporary ke backend agar backend generate ID baru yang valid
        delete (payload as any).id;
      }

      console.log(`[ADMIN_SAVE] Method: ${method}, URL: ${url}`);
      console.log(`[ADMIN_SAVE] Payload ID: ${payload.id || '(New Product)'}`);
      console.log(`[ADMIN_SAVE] Target Slug: ${targetSlug || '(Generated from name)'}`);

      const res = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        console.log('[ADMIN_SAVE] Success!');
        await fetchProducts();
        setIsEditModalOpen(false);
      } else {
        const err = await res.json();
        console.error('[ADMIN_SAVE] Error Response:', err);
        alert('Gagal menyimpan: ' + (err.error || 'Unknown error'));
      }
    } catch (err) {
      console.error('[ADMIN_SAVE] Network Error:', err);
      alert('Terjadi kesalahan saat menyimpan.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus produk ini? Semua varian juga akan terhapus.')) return;

    try {
      const res = await fetch(`/api/paperlisens/products/${slug}`, { method: 'DELETE' });
      if (res.ok) {
        await fetchProducts();
      } else {
        alert('Gagal menghapus produk.');
      }
    } catch (err) {
      alert('Terjadi kesalahan saat menghapus.');
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id && editingProduct) {
      const oldIndex = editingProduct.images.indexOf(active.id as string);
      const newIndex = editingProduct.images.indexOf(over.id as string);

      const newImages = arrayMove(editingProduct.images, oldIndex, newIndex);
      setEditingProduct({
        ...editingProduct,
        images: newImages,
        image: newImages[0] // Update thumbnail utama otomatis
      });
    }
  };

  return (
    <div className="animate-in fade-in duration-700">
      {!isEditModalOpen ? (
        <div className="space-y-10">
          {/* HEADER SECTION */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-[#1e293b] p-8 rounded-[2.5rem] border border-white/5 shadow-2xl">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-1.5 h-6 bg-[#d6bd98] rounded-full" />
                <h1 className="text-3xl font-black text-white tracking-tight">Katalog Produk</h1>
              </div>
              <p className="text-slate-400 text-sm font-medium">
                Manajemen inventaris <span className="text-[#d6bd98] font-bold">Paperlisens</span> &bull; Total {products.length} Item
              </p>
            </div>
            <div className="flex gap-3 w-full lg:w-auto">
              <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-4 bg-white/5 text-white rounded-2xl font-bold text-xs uppercase tracking-widest border border-white/10 hover:bg-white/10 transition-all">
                <Icon icon="lucide:download" className="text-lg" />
                Export CSV
              </button>
              <button
                onClick={handleAddClick}
                className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-8 py-4 bg-[#d6bd98] text-[#111827] rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-[#d6bd98]/20 hover:bg-white transition-all active:scale-95"
              >
                <Icon icon="lucide:plus-circle" className="text-lg" />
                Tambah Produk
              </button>
            </div>
          </div>

          {/* FILTER & SEARCH BOX */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 relative group">
              <Icon icon="lucide:search" className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#d6bd98] transition-colors text-xl" />
              <input
                type="text"
                placeholder="Cari nama produk, kategori, atau ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-16 pr-6 py-5 bg-[#1e293b] border border-white/5 rounded-3xl outline-none focus:ring-2 focus:ring-[#d6bd98] text-slate-200 placeholder:text-slate-600 transition-all shadow-xl"
              />
            </div>
            <div className="relative">
              <Icon icon="lucide:filter" className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none text-lg" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full pl-16 pr-6 py-5 bg-[#1e293b] border border-white/5 rounded-3xl outline-none focus:ring-2 focus:ring-[#d6bd98] text-slate-300 font-bold text-sm cursor-pointer appearance-none shadow-xl"
              >
                <option value="">Semua Kategori</option>
                {CATEGORY_SLUGS.map(cat => <option key={cat.slug} value={cat.label}>{cat.label}</option>)}
              </select>
              <Icon icon="lucide:chevron-down" className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none" />
            </div>
          </div>

          {/* TABLE CONTAINER */}
          <div className="bg-[#1e293b] rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/[0.02] border-b border-white/5">
                    <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Informasi Produk</th>
                    <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Kategori</th>
                    <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Harga Satuan</th>
                    <th className="px-10 py-6 text-right text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {loading ? (
                    <tr>
                      <td colSpan={4} className="py-40 text-center">
                        <div className="flex flex-col items-center gap-6">
                          <div className="relative w-20 h-20">
                            <div className="absolute inset-0 border-4 border-[#d6bd98]/10 rounded-full" />
                            <div className="absolute inset-0 border-4 border-[#d6bd98] rounded-full border-t-transparent animate-spin" />
                          </div>
                          <p className="text-slate-500 font-black uppercase text-xs tracking-[0.3em] animate-pulse">Sinkronisasi Database...</p>
                        </div>
                      </td>
                    </tr>
                  ) : filteredProducts.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-40 text-center">
                        <div className="flex flex-col items-center gap-4 text-slate-600">
                          <Icon icon="lucide:package-search" className="text-6xl opacity-20" />
                          <p className="font-bold text-lg">Produk tidak ditemukan</p>
                          <p className="text-sm font-medium max-w-xs mx-auto">Coba gunakan kata kunci lain atau reset filter kategori.</p>
                          <button
                            onClick={() => { setSearchQuery(''); setFilterCategory(''); }}
                            className="mt-4 px-6 py-2 bg-white/5 hover:bg-white/10 rounded-full text-xs font-bold transition-all"
                          >
                            Reset Pencarian
                          </button>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredProducts.map(p => (
                      <tr key={p.id} className="group hover:bg-white/[0.02] transition-colors">
                        <td className="px-10 py-8">
                          <div className="flex items-center gap-6 max-w-md">
                            <div className="w-20 h-20 rounded-2xl overflow-hidden border border-white/10 bg-[#0f172a] flex-shrink-0 shadow-2xl group-hover:scale-110 transition-transform duration-500">
                              <img src={p.image} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div className="min-w-0">
                              <p className="font-black text-white text-base leading-snug line-clamp-2 group-hover:text-[#d6bd98] transition-colors">
                                {p.name}
                              </p>
                              <p className="text-[10px] font-black text-slate-500 uppercase mt-2 tracking-widest flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-slate-600 rounded-full" />
                                UID: {p.id}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-10 py-8">
                          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 text-slate-300 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest">
                            <Icon icon="lucide:tag" className="text-xs text-[#d6bd98]" />
                            {p.category}
                          </span>
                        </td>
                        <td className="px-10 py-8">
                          <div className="flex flex-col">
                            <p className="text-white font-black text-lg">
                              {(() => {
                                if (p.variants && p.variants.length > 0) {
                                  const prices = p.variants.map(v => v.price).filter(price => price > 0);
                                  if (prices.length > 0) {
                                    const min = Math.min(...prices);
                                    const max = Math.max(...prices);
                                    if (min === max) return `Rp ${min.toLocaleString('id-ID')}`;
                                    return `Rp ${min.toLocaleString('id-ID')} - ${max.toLocaleString('id-ID')}`;
                                  }
                                }
                                return `Rp ${p.price.toLocaleString('id-ID')}`;
                              })()}
                            </p>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter mt-1">Range Harga</p>
                          </div>
                        </td>
                        <td className="px-10 py-8 text-right">
                          <div className="flex justify-end items-center gap-3">
                            <button
                              onClick={() => handleEditClick(p)}
                              className="w-12 h-12 flex items-center justify-center bg-white/5 hover:bg-[#d6bd98] text-[#d6bd98] hover:text-[#111827] rounded-2xl transition-all shadow-lg border border-white/5 group-hover:border-[#d6bd98]/50"
                            >
                              <Icon icon="lucide:edit-3" className="text-xl" />
                            </button>
                            <button
                              onClick={() => handleDelete(p.productSlug)}
                              className="w-12 h-12 flex items-center justify-center bg-white/5 hover:bg-rose-500/10 text-slate-500 hover:text-rose-500 rounded-2xl transition-all shadow-lg border border-white/5 hover:border-rose-500/30"
                            >
                              <Icon icon="lucide:trash-2" className="text-xl" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        editingProduct && (
          <form onSubmit={handleSave} className="space-y-10">
            {/* HEADER SECTION FOR EDIT */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-[#1e293b] p-8 rounded-[2.5rem] border border-white/5 shadow-2xl">
              <div className="flex items-center gap-6">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="w-12 h-12 flex items-center justify-center bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white rounded-2xl transition-all border border-white/10"
                >
                  <Icon icon="lucide:arrow-left" className="text-2xl" />
                </button>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-1.5 h-6 bg-[#d6bd98] rounded-full" />
                    <h1 className="text-3xl font-black text-white tracking-tight">
                      {editingProduct.id && !editingProduct.id.startsWith('new-') ? 'Edit Produk' : 'Tambah Produk Baru'}
                    </h1>
                  </div>
                  <p className="text-slate-400 text-sm font-medium">
                    {editingProduct.id && !editingProduct.id.startsWith('new-') ? `UID: ${editingProduct.id}` : 'Silahkan isi detail produk di bawah ini'}
                  </p>
                </div>
              </div>
              <div className="flex gap-3 w-full lg:w-auto">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 lg:flex-none px-8 py-4 bg-white/5 text-slate-400 rounded-2xl font-black uppercase text-xs tracking-widest border border-white/10 hover:bg-white/10 transition-all"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-10 py-4 bg-[#d6bd98] text-[#111827] rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-[#d6bd98]/20 hover:bg-white transition-all disabled:opacity-50"
                >
                  {isSaving ? <Icon icon="lucide:loader-2" className="animate-spin text-lg" /> : <Icon icon="lucide:save" className="text-lg" />}
                  Simpan Produk
                </button>
              </div>
            </div>

            {/* EDIT FORM CONTENT */}
            <div className="bg-[#1e293b] rounded-[3rem] border border-white/10 shadow-2xl overflow-hidden flex flex-col">
              <div className="p-8 lg:p-12 space-y-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  {/* Left Column: Basic Info */}
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 gap-6 p-6 bg-white/5 rounded-3xl border border-white/5">
                      <div>
                        <label className={labelClasses}>Nama Produk (ID)</label>
                        <input
                          type="text"
                          value={editingProduct.name}
                          onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                          className={inputClasses}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className={labelClasses}>Product Name (EN)</label>
                          <input
                            type="text"
                            value={(editingProduct as any).name_en || ''}
                            onChange={(e) => setEditingProduct({ ...editingProduct, name_en: e.target.value } as any)}
                            className={`${inputClasses} text-xs py-3`}
                            placeholder="English name"
                          />
                        </div>
                        <div>
                          <label className={labelClasses}>产品名称 (ZH)</label>
                          <input
                            type="text"
                            value={(editingProduct as any).name_zh || ''}
                            onChange={(e) => setEditingProduct({ ...editingProduct, name_zh: e.target.value } as any)}
                            className={`${inputClasses} text-xs py-3`}
                            placeholder="Chinese name"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className={labelClasses}>Product Slug (Read-only)</label>
                      <input
                        type="text"
                        value={editingProduct.productSlug}
                        readOnly
                        className={`${inputClasses} opacity-50 cursor-not-allowed`}
                      />
                    </div>

                    <div>
                      <label className={labelClasses}>Kategori</label>
                      <select
                        value={editingProduct.category}
                        onChange={(e) => {
                          const selectedLabel = e.target.value;
                          const selectedSlug = CATEGORY_SLUGS.find(c => c.label === selectedLabel)?.slug || 'lain-lain';
                          setEditingProduct({
                            ...editingProduct,
                            category: selectedLabel,
                            slug: selectedSlug
                          });
                        }}
                        className={inputClasses}
                      >
                        {CATEGORY_SLUGS.map(cat => <option key={cat.slug} value={cat.label}>{cat.label}</option>)}
                      </select>
                    </div>

                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-4">
                          <div>
                            <label className={labelClasses}>Label Variasi 1 (Contoh: Warna)</label>
                            <input
                              type="text"
                              value={(editingProduct as any).attr_label_1 || ''}
                              onChange={(e) => setEditingProduct({ ...editingProduct, attr_label_1: e.target.value } as any)}
                              className={inputClasses}
                              placeholder="Contoh: Warna"
                            />
                          </div>
                          <div>
                            <label className={labelClasses}>Pilihan Variasi 1 (Pisahkan dengan koma)</label>
                            <textarea
                              value={v1Options}
                              onChange={(e) => setV1Options(e.target.value)}
                              className={`${inputClasses} h-24 resize-none py-3 text-xs leading-relaxed`}
                              placeholder="Contoh: Coklat, Kuning, Merah"
                            />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <label className={labelClasses}>Label Variasi 2 (Opsional: Ukuran)</label>
                            <input
                              type="text"
                              value={(editingProduct as any).attr_label_2 || ''}
                              onChange={(e) => setEditingProduct({ ...editingProduct, attr_label_2: e.target.value } as any)}
                              className={inputClasses}
                              placeholder="Contoh: Ukuran"
                            />
                          </div>
                          <div>
                            <label className={labelClasses}>Pilihan Variasi 2 (Pisahkan dengan koma)</label>
                            <textarea
                              value={v2Options}
                              onChange={(e) => setV2Options(e.target.value)}
                              className={`${inputClasses} h-24 resize-none py-3 text-xs leading-relaxed`}
                              placeholder="Contoh: 20 pcs, 50 pcs"
                            />
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={generateVariants}
                        className="w-full py-4 bg-white/5 hover:bg-[#d6bd98]/10 text-[#d6bd98] border border-[#d6bd98]/20 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all flex items-center justify-center gap-2 group"
                      >
                        <Icon icon="lucide:refresh-cw" className="group-hover:rotate-180 transition-transform duration-500" />
                        Generate / Update Kombinasi Varian
                      </button>
                    </div>

                    <div className="p-6 bg-white/5 rounded-3xl border border-white/5 space-y-4">
                      <div>
                        <label className={labelClasses}>Deskripsi Produk (ID)</label>
                        <textarea
                          rows={4}
                          value={editingProduct.description || ''}
                          onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                          className={`${inputClasses} resize-none`}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className={labelClasses}>Description (EN)</label>
                          <textarea
                            rows={3}
                            value={(editingProduct as any).description_en || ''}
                            onChange={(e) => setEditingProduct({ ...editingProduct, description_en: e.target.value } as any)}
                            className={`${inputClasses} text-xs py-3 resize-none`}
                            placeholder="English description"
                          />
                        </div>
                        <div>
                          <label className={labelClasses}>产品描述 (ZH)</label>
                          <textarea
                            rows={3}
                            value={(editingProduct as any).description_zh || ''}
                            onChange={(e) => setEditingProduct({ ...editingProduct, description_zh: e.target.value } as any)}
                            className={`${inputClasses} text-xs py-3 resize-none`}
                            placeholder="Chinese description"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <div>
                        <label className={labelClasses}>Rentang Harga (Otomatis dari Varian)</label>
                        <div className={`${inputClasses} bg-white/5 border-dashed flex items-center`}>
                          <span className="font-black text-[#d6bd98]">
                            {(() => {
                              if (editingProduct.variants && editingProduct.variants.length > 0) {
                                const prices = editingProduct.variants.map(v => v.price).filter(p => p > 0);
                                if (prices.length > 0) {
                                  const min = Math.min(...prices);
                                  const max = Math.max(...prices);
                                  if (min === max) return `Rp ${min.toLocaleString('id-ID')}`;
                                  return `Rp ${min.toLocaleString('id-ID')} - Rp ${max.toLocaleString('id-ID')}`;
                                }
                              }
                              return 'Belum ada varian / harga';
                            })()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Images & Variants */}
                  <div className="space-y-10">
                    {/* --- GALERI PRODUK UTAMA --- */}
                    <div className="p-8 bg-[#0f172a] rounded-[2rem] border border-white/5 space-y-6">
                      <label className={labelClasses}>Galeri Produk Utama (Klik & Tahan untuk urutkan)</label>

                      <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                      >
                        <div className="flex flex-wrap gap-4">
                          <SortableContext
                            items={editingProduct.images || []}
                            strategy={rectSortingStrategy}
                          >
                            {(editingProduct.images || []).map((img, idx) => (
                              <SortableImage
                                key={img}
                                url={img}
                                index={idx}
                                onRemove={() => {
                                  const newList = editingProduct.images.filter((_, i) => i !== idx);
                                  setEditingProduct({
                                    ...editingProduct,
                                    images: newList,
                                    image: newList.length > 0 ? newList[0] : '/placeholder.png'
                                  });
                                }}
                              />
                            ))}
                          </SortableContext>

                          <input
                            type="file"
                            id="main-gallery-upload"
                            className="hidden"
                            multiple
                            accept="image/*"
                            onChange={async (e) => {
                              const files = Array.from(e.target.files || []);
                              const uploadPromises = files.map(async (file) => {
                                const formData = new FormData();
                                formData.append('file', file);
                                const res = await fetch('/api/upload', { method: 'POST', body: formData });
                                const data = await res.json();
                                return data.url;
                              });
                              const urls = await Promise.all(uploadPromises);
                              const validUrls = urls.filter(u => !!u);
                              const newList = [...(editingProduct.images || []), ...validUrls];
                              setEditingProduct({
                                ...editingProduct,
                                images: newList,
                                image: newList[0]
                              });
                            }}
                          />
                          <label htmlFor="main-gallery-upload" className="w-24 h-24 flex flex-col items-center justify-center bg-white/5 hover:bg-white/10 border border-dashed border-white/20 rounded-2xl cursor-pointer transition-all gap-2">
                            <Icon icon="lucide:plus-circle" className="text-[#d6bd98] text-2xl" />
                            <span className="text-[8px] font-black text-slate-500 uppercase">Tambah</span>
                          </label>
                        </div>
                      </DndContext>

                      <p className="text-[9px] text-slate-500 font-medium italic">Foto di urutan pertama (paling kiri) otomatis menjadi Thumbnail utama.</p>
                    </div>

                    {/* --- VARIASI PRODUK --- */}
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <label className={labelClasses}>Daftar Variasi</label>
                        <div className="flex items-center gap-4">
                          <label className="flex items-center gap-2 cursor-pointer group select-none">
                            <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${isBulkPrice ? 'bg-[#d6bd98] border-[#d6bd98]' : 'border-slate-500 group-hover:border-[#d6bd98]'}`}>
                              {isBulkPrice && <Icon icon="lucide:check" className="text-[#111827] text-xs" />}
                            </div>
                            <input type="checkbox" className="hidden" checked={isBulkPrice} onChange={e => setIsBulkPrice(e.target.checked)} />
                            <span className={`text-[10px] font-bold uppercase tracking-wider ${isBulkPrice ? 'text-[#d6bd98]' : 'text-slate-500 group-hover:text-slate-300'}`}>Edit Harga per Ukuran (Varian 2)</span>
                          </label>
                          <button
                            type="button"
                            onClick={() => {
                              const newVariants = [...(editingProduct.variants || [])];
                              newVariants.push({
                                id: `new-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
                                variant_name: 'Varian Baru',
                                price: editingProduct.price,
                                image: '/placeholder.png',
                                images: [],
                                variant_slug: `${editingProduct.productSlug || 'prod'}-v${Date.now().toString(36)}`
                              });
                              setEditingProduct({ ...editingProduct, variants: newVariants });
                            }}
                            className="text-[10px] font-black text-[#d6bd98] uppercase tracking-widest hover:text-white transition-all flex items-center gap-2"
                          >
                            <Icon icon="lucide:plus" /> Tambah Varian
                          </button>
                        </div>
                      </div>

                      <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                        {(editingProduct.variants || []).map((v, idx) => (
                          <div key={v.id} className="p-6 bg-[#0f172a] rounded-[2rem] border border-white/5 space-y-6 transition-all hover:border-[#d6bd98]/30">
                            <div className="flex justify-between items-start gap-4">
                              <div className="flex-1 space-y-3">
                                <input
                                  type="text"
                                  value={v.variant_name || ''}
                                  onChange={(e) => {
                                    const newVariants = [...(editingProduct.variants || [])];
                                    newVariants[idx].variant_name = e.target.value;
                                    setEditingProduct({ ...editingProduct, variants: newVariants });
                                  }}
                                  placeholder="Nama Varian (ID)"
                                  className="bg-transparent border-b border-white/10 outline-none text-white font-black text-sm focus:border-[#d6bd98] pb-1 w-full"
                                />
                                <div className="grid grid-cols-2 gap-3">
                                  <input
                                    type="text"
                                    value={(v as any).variant_name_en || ''}
                                    onChange={(e) => {
                                      const newVariants = [...(editingProduct.variants || [])];
                                      (newVariants[idx] as any).variant_name_en = e.target.value;
                                      setEditingProduct({ ...editingProduct, variants: newVariants });
                                    }}
                                    placeholder="Variant Name (EN)"
                                    className="bg-transparent border-b border-white/5 outline-none text-slate-400 font-bold text-[10px] focus:border-blue-400 pb-1 w-full"
                                  />
                                  <input
                                    type="text"
                                    value={(v as any).variant_name_zh || ''}
                                    onChange={(e) => {
                                      const newVariants = [...(editingProduct.variants || [])];
                                      (newVariants[idx] as any).variant_name_zh = e.target.value;
                                      setEditingProduct({ ...editingProduct, variants: newVariants });
                                    }}
                                    placeholder="变体名称 (ZH)"
                                    className="bg-transparent border-b border-white/5 outline-none text-slate-400 font-bold text-[10px] focus:border-emerald-400 pb-1 w-full"
                                  />
                                </div>

                                <div className="pt-2 border-t border-white/5 space-y-3">
                                  <p className="text-[8px] font-black text-slate-600 uppercase">Variasi 2 (Opsional)</p>
                                  <input
                                    type="text"
                                    value={v.variant_name_2 || ''}
                                    onChange={(e) => {
                                      const newVariants = [...(editingProduct.variants || [])];
                                      newVariants[idx].variant_name_2 = e.target.value;
                                      setEditingProduct({ ...editingProduct, variants: newVariants });
                                    }}
                                    placeholder="Nama Varian 2 (ID)"
                                    className="bg-transparent border-b border-white/10 outline-none text-white font-black text-sm focus:border-[#d6bd98] pb-1 w-full"
                                  />
                                  <div className="grid grid-cols-2 gap-3">
                                    <input
                                      type="text"
                                      value={v.variant_name_2_en || ''}
                                      onChange={(e) => {
                                        const newVariants = [...(editingProduct.variants || [])];
                                        newVariants[idx].variant_name_2_en = e.target.value;
                                        setEditingProduct({ ...editingProduct, variants: newVariants });
                                      }}
                                      placeholder="Variant Name 2 (EN)"
                                      className="bg-transparent border-b border-white/5 outline-none text-slate-400 font-bold text-[10px] focus:border-blue-400 pb-1 w-full"
                                    />
                                    <input
                                      type="text"
                                      value={v.variant_name_2_zh || ''}
                                      onChange={(e) => {
                                        const newVariants = [...(editingProduct.variants || [])];
                                        newVariants[idx].variant_name_2_zh = e.target.value;
                                        setEditingProduct({ ...editingProduct, variants: newVariants });
                                      }}
                                      placeholder="变体名称 2 (ZH)"
                                      className="bg-transparent border-b border-white/5 outline-none text-slate-400 font-bold text-[10px] focus:border-emerald-400 pb-1 w-full"
                                    />
                                  </div>
                                </div>
                              </div>
                              <button type="button" onClick={() => {
                                const newVariants = (editingProduct.variants || []).filter((_, i) => i !== idx);
                                setEditingProduct({ ...editingProduct, variants: newVariants });
                              }} className="text-rose-500 hover:scale-125 transition-all mt-1"><Icon icon="lucide:trash-2" /></button>
                            </div>

                            <div className="grid grid-cols-2 gap-6 items-end">
                              <div>
                                <label className="text-[9px] font-bold text-slate-500 uppercase mb-2 block">Harga Khusus (Rp)</label>
                                <input
                                  type="number"
                                  value={v.price}
                                  onChange={(e) => {
                                    const newVal = parseInt(e.target.value) || 0;
                                    let newVariants = [...(editingProduct.variants || [])];

                                    if (isBulkPrice) {
                                      // Only update variants that share the same "Varian 2" (e.g. same size/quantity)
                                      const currentV2 = newVariants[idx].variant_name_2;
                                      newVariants = newVariants.map((v, i) => {
                                        if (v.variant_name_2 === currentV2) {
                                          return { ...v, price: newVal };
                                        }
                                        return v;
                                      });
                                    } else {
                                      newVariants[idx].price = newVal;
                                    }

                                    setEditingProduct({ ...editingProduct, variants: newVariants });
                                  }}
                                  className="w-full bg-white/5 rounded-xl p-3 text-xs outline-none focus:ring-1 focus:ring-[#d6bd98] text-white"
                                />
                              </div>
                              <div>
                                <label className="text-[9px] font-bold text-slate-500 uppercase mb-2 block">Foto Varian (1 Foto)</label>
                                <div className="flex gap-3 items-center">
                                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-black/20 border border-white/10 flex-shrink-0">
                                    <img src={v.image || '/placeholder.png'} className="w-full h-full object-cover" />
                                  </div>
                                  <input
                                    type="file"
                                    id={`v-img-${idx}`}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={async (e) => {
                                      const file = e.target.files?.[0];
                                      if (!file) return;
                                      const formData = new FormData();
                                      formData.append('file', file);
                                      const res = await fetch('/api/upload', { method: 'POST', body: formData });
                                      const data = await res.json();
                                      if (data.url) {
                                        const newVariants = [...(editingProduct.variants || [])];
                                        const currentVariantName = newVariants[idx].variant_name;

                                        // Update ALL variants that assume the same "Varian 1" (e.g. all Red variants)
                                        const updatedVariants = newVariants.map((v: ProductVariant) => {
                                          if (v.variant_name === currentVariantName) {
                                            return { ...v, image: data.url };
                                          }
                                          return v;
                                        });

                                        setEditingProduct({ ...editingProduct, variants: updatedVariants });
                                      }
                                    }}
                                  />
                                  <div className="flex flex-col gap-2 flex-1">
                                    <label htmlFor={`v-img-${idx}`} className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-3 text-[9px] font-black uppercase text-center cursor-pointer transition-all">Ganti Foto</label>
                                    {v.image && v.image !== '/placeholder.png' && (
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const newVariants = [...(editingProduct.variants || [])];
                                          const currentVariantName = newVariants[idx].variant_name;

                                          // Delete image for ALL variants with same "Varian 1"
                                          const updatedVariants = newVariants.map((v: ProductVariant) => {
                                            if (v.variant_name === currentVariantName) {
                                              return { ...v, image: '/placeholder.png' };
                                            }
                                            return v;
                                          });

                                          setEditingProduct({ ...editingProduct, variants: updatedVariants });
                                        }}
                                        className="flex-1 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-500 rounded-xl p-3 text-[9px] font-black uppercase text-center cursor-pointer transition-all"
                                      >
                                        Hapus
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end items-center gap-4 pt-10 border-t border-white/5">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    disabled={isSaving}
                    className="px-8 py-4 text-slate-400 font-bold uppercase text-[10px] tracking-widest hover:text-white transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="flex items-center gap-2 px-10 py-4 bg-[#d6bd98] text-[#111827] rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] shadow-xl shadow-[#d6bd98]/20 hover:bg-white transition-all disabled:opacity-50"
                  >
                    {isSaving ? (
                      <Icon icon="lucide:loader-2" className="animate-spin text-lg" />
                    ) : (
                      <Icon icon="lucide:save" className="text-lg" />
                    )}
                    Simpan Perubahan
                  </button>
                </div>
              </div>
            </div>
          </form>
        )
      )}

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(214, 189, 152, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(214, 189, 152, 0.4);
        }
      `}</style>
    </div>
  );
}
