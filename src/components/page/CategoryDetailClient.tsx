'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { Link } from '@/i18n/routing';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function ProductCategoryPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug;
  const t = useTranslations();
  const tCat = useTranslations('Categories');
  const tMaterials = useTranslations('Materials');
  const tCommon = useTranslations('Common');

  const [isSmallMobile, setIsSmallMobile] = useState(false);
  const [isMediumMobile, setIsMediumMobile] = useState(false);
  const [isLargeMobile, setIsLargeMobile] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [screenReady, setScreenReady] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallMobile(window.innerWidth < 480);
      setIsMediumMobile(window.innerWidth < 640);
      setIsLargeMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    setScreenReady(true);
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Reset zoom when image changes or closes
  useEffect(() => {
    setZoomLevel(1);
  }, [selectedImage]);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedImage]);



  // Construct categories dynamically from translations
  const dallasCategories = useMemo(() => [
    {
      title: tCat('hampers.title'), slug: "kotak-hampers", img: "/kotak%20hampers.webp", desc: tCat('hampers.desc'),
      tags: [tCat('hampers.tags.tag1'), tCat('hampers.tags.tag2')],
      gallery: [
        "/box%20hampers%20kraft%20(1).webp", "/box%20hampers%20kraft%20(2).webp", "/box%20hampers%20kraft%20(3).webp",
        "/box%20hampers%20natal%20(1).webp", "/box%20hampers%20natal%20(2).webp", "/box%20hampers%20natal%20(3).webp",
        "/gable%20box%20(1).webp", "/gable%20box%20(10).webp", "/gable%20box%20(11).webp", "/gable%20box%20(12).webp",
        "/gable%20box%20(13).webp", "/gable%20box%20(14).webp", "/gable%20box%20(15).webp", "/gable%20box%20(16).webp",
        "/gable%20box%20(17).webp", "/gable%20box%20(18).webp", "/gable%20box%20(19).webp", "/gable%20box%20(2).webp",
        "/gable%20box%20(20).webp", "/gable%20box%20(3).webp", "/gable%20box%20(4).webp", "/gable%20box%20(5).webp",
        "/gable%20box%20(6).webp", "/gable%20box%20(7).webp", "/gable%20box%20(8).webp", "/gable%20box%20(9).webp",
        "/gable%20box%20idul%20fitri%20(1).webp", "/gable%20box%20idul%20fitri%20(2).webp", "/gable%20box%20idul%20fitri%20(3).webp",
        "/gable%20box%20idul%20fitri%20(4).webp", "/gable%20box%20idul%20fitri%20(5).webp", "/gable%20box%20idul%20fitri%20(6).webp",
        "/gable%20box%20idul%20fitri%20(7).webp", "/gable%20box%20idul%20fitri%20(8).webp", "/hardbox%20(1).webp",
        "/hardbox%20(2).webp", "/hardbox%20(3).webp", "/kotak%20hampers.webp"
      ],
      explanation: "Kotak Hampers adalah kemasan hadiah premium yang dirancang khusus untuk mempercantik tampilan parsel dan bingkisan di momen-momen spesial. Lebih dari sekadar pembungkus, kotak hampers menjadi 'wajah pertama' yang memberikan kesan mewah dan berkesan bagi penerima. Dengan desain cetak custom, kotak hampers bisa menjadi media branding yang kuat untuk bisnis gift, toko kue, maupun perusahaan.",
      applications: ["Parsel Lebaran / Idul Fitri", "Hampers pernikahan & souvenir", "Hampers Natal & Tahun Baru", "Gift box corporate / perusahaan", "Bingkisan ulang tahun premium"],
      commonMaterials: ["Art Carton 260–310 gsm", "Ivory 310 gsm", "Art Paper (untuk laminasi luar)", "Corrugated Board (untuk struktur kokoh)"]
    },
    {
      title: tCat('bakery.title'), slug: "kotak-bakery", img: "/kotak%20cake.webp", desc: tCat('bakery.desc'),
      tags: [tCat('bakery.tags.tag1'), tCat('bakery.tags.tag2')],
      gallery: [
        "/box%20donat%20motif%20(1).webp", "/box%20donat%20motif%20(1).webp", "/box%20donat%20motif%20(2).webp",
        "/box%20donat%20motif%20(2).webp", "/box%20donat%20motif%20(3).webp", "/box%20donat%20motif%20(3).webp",
        "/box%20donat%20motif%20(4).webp", "/box%20donat%20motif%20(4).webp", "/box%20donat%20motif%20(5).webp",
        "/box%20donat%20motif%20(6).webp", "/box%20donat%20motif.webp", "/box%20roti%20bakar%20(1).webp",
        "/box%20roti%20bakar%20(2).webp", "/box%20roti%20bakar%20(3).webp", "/box%20slice%20cake-1.webp",
        "/box%20slice%20cake-2.webp", "/box%20slice%20cake.webp", "/box%20tart%20handle%20(1).webp",
        "/box%20tart%20handle%20(2).webp", "/box%20tart%20handle%20(3).webp", "/box%20tart%20handle%20(4).webp",
        "/box%20tart%20handle%20(5).webp", "/box%20tart%20handle%20(6).webp", "/cheese%20cake%20(1).webp",
        "/cheese%20cake%20(2).webp", "/cheese%20cake%20(3).webp", "/cheese%20cake%20(4).webp",
        "/cupcake%20isi%2012%20(1).webp", "/cupcake%20isi%2012%20(2).webp", "/cupcake%20isi%2012%20(3).webp",
        "/cupcake%20isi%2012%20(4).webp", "/cupcake%20isi%2012%20(5).webp", "/cupcake%20isi%2012%20(6).webp",
        "/cupcake%20isi%2016%20(1).webp", "/cupcake%20isi%2016%20(2).webp", "/cupcake%20isi%2016%20(3).webp",
        "/cupcake%20isi%2016%20(4).webp", "/cupcake%20isi%2016%20(5).webp", "/cupcake%20isi%204%20(1).webp",
        "/cupcake%20isi%204%20(2).webp", "/cupcake%20isi%204%20(3).webp", "/cupcake%20isi%204%20(4).webp",
        "/cupcake%20isi%204%20motif%20(1).webp", "/cupcake%20isi%204%20motif%20(2).webp", "/cupcake%20isi%204%20motif%20(3).webp",
        "/cupcake%20isi%204%20motif%20(4).webp", "/cupcake%20isi%204%20motif%20(5).webp", "/cupcake%20isi%206%20(1).webp",
        "/cupcake%20isi%206%20(2).webp", "/cupcake%20isi%206%20(3).webp", "/cupcake%20isi%209%20(1).webp",
        "/cupcake%20isi%209%20(2).webp", "/cupcake%20isi%209%20(3).webp", "/cupcake%20isi%209%20(4).webp",
        "/cupcake%20isi%209%20(5).webp", "/cupcake%20isi%209%20(6).webp", "/cupcake%20isi%209%20(7).webp",
        "/cupcake%20isi%209%20(8).webp", "/cupcake%20isi%209%20(9).webp", "/dallas%20donat%20isi%203.webp",
        "/dallas%20donat%20isi%206.webp", "/donat%20isi%201(1).webp", "/donat%20isi%201(2).webp", "/donat%20isi%201.webp",
        "/kotak%20cake.webp", "/kotak%20cupcake%20isi%204%20(1).webp", "/kotak%20cupcake%20isi%204%20(2).webp",
        "/kotak%20cupcake%20isi%204%20(3).webp", "/kotak%20cupcake%20isi%204%20(4).webp", "/kotak%20cupcake%20isi%204%20(5).webp",
        "/kotak%20cupcake%20isi%204%20(6).webp", "/kotak%20cupcake%20isi%204%20(7).webp", "/kotak%20cupcake%20isi%206%20(1).webp",
        "/kotak%20cupcake%20isi%206%20(2).webp", "/kotak%20cupcake%20isi%206%20(3).webp", "/kotak%20cupcake%20isi%206%20(4).webp",
        "/kotak%20cupcake%20motif%20isi%201%20(1).webp", "/kotak%20cupcake%20motif%20isi%201%20(2).webp",
        "/kotak%20rollcake%20(1).webp", "/kotak%20rollcake%20(2).webp", "/kotak%20rollcake%20(3).webp",
        "/kotak%20rollcake%20(4).webp", "/kotak%20rollcake%20(5).webp", "/kotak%20rollcake%20(6).webp",
        "/kotak%20rollcake%20(7).webp", "/kotak%20rollcake%20(8).webp", "/kotak%20rollcake%20(9).webp",
        "/kotak%20rollcake%20mika%20(1).webp", "/kotak%20rollcake%20mika%20(2).webp", "/kotak%20rollcake%20mika%20(3).webp",
        "/kotak%20rollcake%20mika%20(4).webp", "/paperlisens%20cupcake.webp", "/tenteng%20cupcake%20isi%206%20(1).webp",
        "/tenteng%20cupcake%20isi%206%20(2).webp", "/tenteng%20cupcake%20isi%206%20(3).webp", "/tenteng%20cupcake%20isi%206%20(4).webp",
        "/tusuk%20roti%20(1).webp", "/tusuk%20roti%20(2).webp"
      ],
      explanation: "Kotak Bakery adalah kemasan fungsional sekaligus estetis yang dirancang untuk melindungi produk roti, kue, dan pastry agar tetap segar, rapi, dan menarik. Kemasan ini harus tahan terhadap minyak dan kelembapan sambil tetap menampilkan desain yang menggugah selera. Bagi pelaku usaha bakery, kotak custom adalah investasi branding yang membuat produk tampil lebih profesional dan meningkatkan nilai jual.",
      applications: ["Box kue ulang tahun", "Kotak donat & cupcake", "Box roti tawar & pastry", "Kemasan brownies & cookies", "Box tart & pie premium"],
      commonMaterials: ["Ivory 310 gsm (Food Grade)", "Duplex 310 gsm", "Food Grade Paper", "Art Carton (untuk box premium)"]
    },
    {
      title: tCat('rokok.title'), slug: "rokok", img: "/custom%20rokok%203.webp", desc: tCat('rokok.desc'),
      tags: [tCat('rokok.tags.tag1'), tCat('rokok.tags.tag2')],
      gallery: [
        "/custom%20rokok%20(1).webp", "/custom%20rokok%20(10).webp", "/custom%20rokok%20(11).webp",
        "/custom%20rokok%20(12).webp", "/custom%20rokok%20(13).webp", "/custom%20rokok%20(14).webp",
        "/custom%20rokok%20(15).webp", "/custom%20rokok%20(16).webp", "/custom%20rokok%20(17).webp",
        "/custom%20rokok%20(18).webp", "/custom%20rokok%20(19).webp", "/custom%20rokok%20(2).webp",
        "/custom%20rokok%20(20).webp", "/custom%20rokok%20(21).webp", "/custom%20rokok%20(22).webp",
        "/custom%20rokok%20(23).webp", "/custom%20rokok%20(24).webp", "/custom%20rokok%20(3).webp",
        "/custom%20rokok%20(4).webp", "/custom%20rokok%20(5).webp", "/custom%20rokok%20(6).webp",
        "/custom%20rokok%20(7).webp", "/custom%20rokok%20(8).webp", "/custom%20rokok%20(9).webp",
        "/custom%20rokok%201.webp", "/custom%20rokok%202.webp", "/custom%20rokok%203.webp",
        "/custom%20rokok%204.webp", "/custom%20rokok.webp", "/foto%20rokok%201.webp",
        "/foto%20rokok.webp", "/kotak%20rokok%201.webp"
      ],
      explanation: "Kotak Rokok Custom adalah kemasan presisi tinggi yang menjadi identitas visual sebuah merek rokok. Setiap detail — mulai dari ketajaman grafis, ketepatan warna, hingga finishing metalik — sangat krusial karena kotak rokok adalah media branding utama yang dilihat konsumen setiap hari. Dallas telah berpengalaman puluhan tahun mencetak kotak rokok dengan standar kualitas industri yang ketat.",
      applications: ["Kemasan rokok kretek", "Kemasan rokok filter", "Kemasan cigarillo & cerutu", "Box rokok edisi terbatas / limited edition", "Packaging rokok elektrik (pod)"],
      commonMaterials: ["Ivory 230–310 gsm", "Tipping Paper (untuk filter)", "SBS (Solid Bleached Sulfate) Board", "Inner Frame Board"]
    },
    {
      title: tCat('nasi.title'), slug: "kotak-nasi", img: "/kotak%20nasi%20(1).webp", desc: tCat('nasi.desc'),
      tags: [tCat('nasi.tags.tag1'), tCat('nasi.tags.tag2')],
      gallery: [
        "/kotak%20nasi%20(1).webp", "/kotak%20nasi%20(2).webp", "/kotak%20nasi%20(3).webp",
        "/kotak%20nasi%20(4).webp", "/kotak%20nasi%20(5).webp", "/kotak%20nasi%20(6).webp",
        "/kotak%20nasi%20(7).webp", "/kotak%20nasi%20(8).webp", "/kotak%20nasi%20(9).webp"
      ],
      explanation: "Kotak Nasi adalah kemasan praktis yang dirancang untuk mengemas nasi beserta lauk pauk secara higienis dan rapi. Digunakan secara luas dalam kegiatan katering, acara keagamaan, kantor, dan komunitas. Kotak nasi yang di-custom dengan logo atau desain khusus memberikan sentuhan profesional dan meningkatkan citra penyelenggara acara maupun usaha katering.",
      applications: ["Nasi kotak acara kantor & meeting", "Katering hajatan & pernikahan", "Kotak nasi acara keagamaan", "Prasmanan & buffet box", "Nasi tumpeng mini"],
      commonMaterials: ["Duplex 310 gsm", "Food Grade Paper", "Ivory 250 gsm (untuk versi premium)", "Kraft Paper (untuk kesan natural)"]
    },
    {
      title: tCat('buku.title'), slug: "buku", img: "/buku%20(6).webp", desc: tCat('buku.desc'),
      tags: [tCat('buku.tags.tag1')],
      gallery: [
        "/buku%20(1).webp", "/buku%20(2).webp", "/buku%20(3).webp",
        "/buku%20(4).webp", "/buku%20(5).webp", "/buku%20(6).webp",
        "/buku%20(7).webp", "/buku%20(8).webp", "/buku%20(9).webp", "/foto%20buku.webp"
      ],
      explanation: "Cetak Buku mencakup proses produksi berbagai jenis buku, mulai dari buku ajar, novel, company profile, hingga jurnal ilmiah. Kualitas cetak buku diukur dari kejelasan teks, ketajaman gambar, serta kekuatan jilid (binding) yang menentukan daya tahan buku. Di Dallas, kami menangani cetak buku dari skala kecil (print on demand) hingga produksi massal ribuan eksemplar dengan kualitas konsisten.",
      applications: ["Buku ajar & modul pembelajaran", "Novel & buku cerita", "Company profile & annual report", "Yearbook & buku wisuda", "Jurnal ilmiah & skripsi"],
      commonMaterials: ["HVS 70–80 gsm (isi buku)", "Art Paper 120–150 gsm (isi full color)", "Art Carton 260 gsm (cover)", "Ivory 310 gsm (hard cover)", "Book Paper 57,5 gsm (novel)"]
    },
    {
      title: tCat('kalender.title'), slug: "kalender", img: "/foto%20kalender.webp", desc: tCat('kalender.desc'),
      tags: [tCat('kalender.tags.tag1')],
      gallery: [
        "/foto%20kalender.webp", "/kalender%20(1).webp", "/kalender%20(2).webp",
        "/kalender%20(3).webp", "/kalender%20(4).webp", "/kalender.webp"
      ],
      explanation: "Kalender adalah media promosi fungsional yang hadir di meja atau dinding pelanggan selama satu tahun penuh. Artinya, brand Anda terlihat setiap hari — menjadikannya salah satu alat pemasaran paling efektif dari segi jangka waktu dan biaya. Desain yang menarik dan material premium membuat kalender custom menjadi hadiah korporat yang bernilai dan disukai penerima.",
      applications: ["Kalender dinding perusahaan", "Kalender meja / duduk", "Kalender spiralwire premium", "Kalender poster", "Kalender custom foto / keluarga"],
      commonMaterials: ["Art Paper 150–260 gsm (lembar isi)", "Art Carton 310 gsm (stand/dudukan)", "Ivory 310 gsm (untuk kalender premium)", "Spiralwire / Ring jilid"]
    },
    {
      title: tCat('paperbag.title'), slug: "paperbag", img: "/paperbag.webp", desc: tCat('paperbag.desc'),
      tags: [tCat('paperbag.tags.tag1'), tCat('paperbag.tags.tag2')],
      gallery: [
        "/foto%20paperbag.webp", "/paperbag%20(1).webp", "/paperbag%20(2).webp",
        "/paperbag%20(3).webp", "/paperbag%20(4).webp", "/paperbag%20(5).webp",
        "/paperbag%20(6).webp", "/paperbag%20(7).webp", "/paperbag%20(8).webp", "/paperbag.webp"
      ],
      explanation: "Paperbag (tas kertas) adalah kemasan jinjing yang stylish dan ramah lingkungan, menjadi pilihan utama brand-brand modern sebagai pengganti kantong plastik. Paperbag custom dengan logo dan desain eksklusif berfungsi sebagai 'iklan berjalan' — setiap orang yang membawa paperbag Anda secara tidak langsung mempromosikan brand. Material yang kuat memastikan paperbag tahan beban dan tidak mudah sobek.",
      applications: ["Shopping bag toko fashion & retail", "Paperbag event & launching produk", "Paperbag seminar & konferensi", "Goodie bag hadiah", "Paperbag restoran & coffee shop"],
      commonMaterials: ["Ivory 230–310 gsm", "Art Paper 260 gsm", "Kraft Paper (untuk kesan eco-friendly)", "Art Carton (untuk paperbag tebal)"]
    },
    {
      title: tCat('map.title'), slug: "map", img: "/map.webp", desc: tCat('map.desc'),
      tags: [tCat('map.tags.tag1'), tCat('map.tags.tag2')],
      gallery: [
        "/map%20(1).webp", "/map%20(10).webp", "/map%20(11).webp", "/map%20(2).webp",
        "/map%20(3).webp", "/map%20(4).webp", "/map%20(5).webp", "/map%20(6).webp",
        "/map%20(7).webp", "/map%20(8).webp", "/map%20(9).webp", "/map.webp"
      ],
      explanation: "Map (folder) adalah wadah dokumen cetak yang memberikan kesan profesional dan terorganisir. Digunakan secara luas di dunia korporat, pendidikan, dan acara formal. Map custom dengan logo instansi atau perusahaan menunjukkan perhatian terhadap detail dan kredibilitas. Juga berfungsi sebagai media branding yang elegan saat digunakan di seminar, rapat, atau presentasi bisnis.",
      applications: ["Map seminar & workshop", "Map raport / rapor sekolah", "Map ijazah & sertifikat", "Document folder perusahaan", "Map presentasi & proposal bisnis"],
      commonMaterials: ["Art Carton 260–310 gsm", "Ivory 310 gsm", "BC (Board Coated)", "Linen Paper (untuk kesan premium)"]
    },
    {
      title: tCat('brosur.title'), slug: "brosur", img: "/foto%20brosur.webp", desc: tCat('brosur.desc'),
      tags: [tCat('brosur.tags.tag1')], gallery: ["/foto%20brosur.webp"],
      explanation: "Brosur adalah media cetak promosi yang efektif untuk menyampaikan informasi produk, layanan, atau acara secara ringkas dan visual. Dengan lipatan yang presisi dan desain yang menarik, brosur mampu menyampaikan pesan bisnis Anda secara langsung ke tangan calon pelanggan. Kualitas kertas dan cetakan yang tajam membuat brosur terlihat profesional dan meningkatkan kepercayaan konsumen terhadap brand Anda.",
      applications: ["Brosur promosi produk & layanan", "Leaflet acara & event", "Flyer promo restoran & kafe", "Pamflet pendidikan & kesehatan", "Menu lipat restoran"],
      commonMaterials: ["Art Paper 120 gsm (standar)", "Art Paper 150 gsm (premium)", "Ivory 230 gsm (untuk brosur tebal)", "HVS 100 gsm (untuk leaflet ekonomis)"]
    },

    // Materials with Detailed Info
    {
      title: tMaterials('artPaper.name'),
      slug: "art-paper",
      img: "/BAHAN-AP.webp",
      desc: tMaterials('artPaper.desc'),
      isMaterial: true,
      explanation: "Art Paper adalah jenis kertas dengan permukaan yang halus, licin, dan mengkilap (glossy) di kedua sisinya. Kertas ini memiliki daya serap tinta yang rendah sehingga hasil cetakan terlihat sangat tajam dan vibrant.",
      applications: ["Brosur eksklusif", "Flyer promosi", "Katalog produk", "Isi buku atau majalah premium", "Kalender dinding"],
      varieties: ["100 gsm", "120 gsm", "150 gsm (Standar brosur premium)"],
      gallery: ["/BAHAN-AP.webp", "/foto%20brosur.webp"]
    },
    {
      title: tMaterials('ivoryPaper.name'),
      slug: "ivory-paper",
      img: "/BAHAN-IVORY.webp",
      desc: tMaterials('ivoryPaper.desc'),
      isMaterial: true,
      explanation: "Kertas Ivory adalah material 'all-in-one' yang menggabungkan karakteristik Art Carton dan BW. Satu sisinya memiliki coating glossy yang halus, sementara sisi lainnya doff (tanpa coating) namun tetap putih bersih.",
      applications: ["Box packaging skincare/kosmetik", "Paper bag premium", "Packaging makanan (Food Grade)", "Kotak obat-obatan", "Hangtag fashion"],
      varieties: ["210 gsm", "230 gsm", "250 gsm", "310 gsm (Paling populer untuk box)", "350 gsm"],
      gallery: ["/BAHAN-IVORY.webp", "/paperlisens%20produk%20unggulan%20(1).webp"]
    },
    {
      title: tMaterials('tipping.name'),
      slug: "bahan-tipping",
      img: "/BAHAN-TIPPING.webp",
      desc: tMaterials('tipping.desc'),
      isMaterial: true,
      explanation: "Tipping Paper adalah kertas khusus industri yang didesain dengan ketahanan tinggi dan tekstur spesifik. Di Dallas, kami menguasai kategori ini dengan spesifikasi teknis yang sangat presisi.",
      applications: ["Pembungkus filter rokok (filter wrapping)", "Segel kemasan khusus", "Komponen teknis produk tembakau"],
      varieties: ["Standard White", "Cork Pattern (Motif kayu)", "Custom Printing dengan logo/poly"],
      gallery: ["/BAHAN-TIPPING.webp"]
    },
    {
      title: tMaterials('duplex.name'),
      slug: "duplex",
      img: "/BAHAN-DC.webp",
      desc: tMaterials('duplex.desc'),
      isMaterial: true,
      explanation: "Kertas Duplex (Duplex Board) memiliki ciri khas perbedaan warna di kedua sisinya: satu sisi putih (coated) untuk area cetak, dan sisi lainnya abu-abu (uncoated). Sangat ekonomis dan kokoh.",
      applications: ["Box martabak & nasi", "Packaging produk massal", "Alas kue", "Box kemasan sparepart", "Packaging mainan"],
      varieties: ["250 gsm", "310 gsm", "400 gsm (Sangat tebal dan kaku)"],
      gallery: ["/BAHAN-DC.webp", "/mobile_banner_2.webp"]
    }
  ], [tCat, tMaterials]);

  const category = dallasCategories.find(cat => cat.slug === slug);

  if (!category) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>
        <main style={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
          <div style={{ textAlign: 'center', color: '#1f2937' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: '700' }}>{tCommon('categoryNotFound')}</h1>
            <p style={{ marginTop: '0.5rem', color: '#64748b' }}>{tCommon('categoryNotFoundDesc')}</p>
            <Link href="/" style={{ marginTop: '2rem', display: 'inline-block', color: '#0A4174', fontWeight: '600' }}>Kembali ke Home</Link>
          </div>
        </main>
      </div>
    );
  }

  if (!screenReady) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid rgba(0,29,57,0.1)', borderTopColor: '#001D39', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', color: '#1e293b', overflowX: 'hidden' }}>
      <Navbar />

      {/* Main Content */}
      <main style={{ padding: isLargeMobile ? '2rem 1.5rem' : '4rem 2rem', maxWidth: '1200px', margin: '120px auto 0' }}>

        {/* Breadcrumb / Back button style */}
        <div style={{ marginBottom: '32px' }}>
          <button onClick={() => router.back()} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#0A4174', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600', fontSize: '1rem' }}>
            <Icon icon="mdi:arrow-left" />
            {tCommon('back')}
          </button>
        </div>

        {category.isMaterial ? (
          <div style={{ display: 'grid', gridTemplateColumns: isLargeMobile ? '1fr' : '1fr 1fr', gap: isLargeMobile ? '2rem' : '4rem', alignItems: 'start', marginBottom: '4rem' }}>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} style={{ position: 'relative' }}>
              <div style={{
                borderRadius: '24px',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)'
              }}>
                <Image
                  src={category.img}
                  alt={category.title}
                  width={600}
                  height={600}
                  style={{ borderRadius: '24px', width: '100%', height: 'auto', display: 'block' }}
                />
                {/* Gradient overlay */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '120px',
                  background: 'linear-gradient(to top, rgba(0,29,57,0.7), transparent)',
                  borderRadius: '0 0 24px 24px',
                  pointerEvents: 'none'
                }} />
                {/* Material badge */}
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  left: '20px',
                  background: 'linear-gradient(135deg, #D4A017, #B8860B)',
                  color: '#fff',
                  padding: '8px 18px',
                  borderRadius: '24px',
                  fontSize: '12px',
                  fontWeight: '700',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  boxShadow: '0 4px 15px rgba(212, 160, 23, 0.4)'
                }}>
                  Informasi Bahan
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h2 style={{ fontSize: isLargeMobile ? '2rem' : '2.75rem', fontWeight: '800', color: '#001D39', marginBottom: '8px', lineHeight: '1.1' }}>
                {category.title}
              </h2>
              <div style={{ width: '50px', height: '3px', background: 'linear-gradient(90deg, #D4A017, #B8860B)', borderRadius: '2px', marginBottom: '24px' }} />
              <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#4b5563', marginBottom: '32px' }}>
                {category.explanation}
              </p>

              {/* Applications */}
              <div style={{
                background: 'linear-gradient(145deg, #001D39 0%, #0a2744 100%)',
                padding: '28px',
                borderRadius: '20px',
                border: '1px solid rgba(212, 160, 23, 0.2)',
                marginBottom: '20px'
              }}>
                <h3 style={{ fontWeight: '700', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px', color: '#D4A017', fontSize: '14px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                  <Icon icon="mdi:tools" /> Bisa Dibuat Apa Saja?
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {category.applications?.map((app, i) => (
                    <span key={i} style={{
                      backgroundColor: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      color: '#e5e7eb',
                      padding: '8px 16px',
                      borderRadius: '10px',
                      fontSize: '0.875rem',
                      fontWeight: '500'
                    }}>{app}</span>
                  ))}
                </div>
              </div>

              {/* Varieties */}
              <div style={{
                background: 'linear-gradient(145deg, #001D39 0%, #0a2744 100%)',
                padding: '28px',
                borderRadius: '20px',
                border: '1px solid rgba(212, 160, 23, 0.2)'
              }}>
                <h3 style={{ fontWeight: '700', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px', color: '#D4A017', fontSize: '14px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                  <Icon icon="mdi:layers-outline" /> Macam / Ketebalan
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {category.varieties?.map((v, i) => (
                    <span key={i} style={{
                      background: 'linear-gradient(135deg, rgba(212, 160, 23, 0.15), rgba(184, 134, 11, 0.1))',
                      border: '1px solid rgba(212, 160, 23, 0.3)',
                      color: '#D4A017',
                      padding: '8px 16px',
                      borderRadius: '10px',
                      fontSize: '0.875rem',
                      fontWeight: '600'
                    }}>{v}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        ) : (
          <div style={{ marginBottom: '4rem' }}>
            {/* Hero: Image + Title + Info layout, similar to material pages */}
            <div style={{ display: 'grid', gridTemplateColumns: isLargeMobile ? '1fr' : '1fr 1fr', gap: isLargeMobile ? '2rem' : '4rem', alignItems: 'start' }}>
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} style={{ position: 'relative' }}>
                <div style={{
                  borderRadius: '24px',
                  overflow: 'hidden',
                  position: 'relative',
                  boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)'
                }}>
                  <Image
                    src={category.img}
                    alt={category.title}
                    width={600}
                    height={600}
                    style={{ borderRadius: '24px', width: '100%', height: 'auto', display: 'block' }}
                  />
                  {/* Gradient overlay */}
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '120px',
                    background: 'linear-gradient(to top, rgba(0,29,57,0.7), transparent)',
                    borderRadius: '0 0 24px 24px',
                    pointerEvents: 'none'
                  }} />
                  {/* Product badge */}
                  <div style={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    background: 'linear-gradient(135deg, #0A4174, #001D39)',
                    color: '#fff',
                    padding: '8px 18px',
                    borderRadius: '24px',
                    fontSize: '12px',
                    fontWeight: '700',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    boxShadow: '0 4px 15px rgba(10, 65, 116, 0.4)'
                  }}>
                    Produk Kami
                  </div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <h2 style={{ fontSize: isLargeMobile ? '2rem' : '2.75rem', fontWeight: '800', color: '#001D39', marginBottom: '8px', lineHeight: '1.1' }}>
                  {category.title}
                </h2>
                <div style={{ width: '50px', height: '3px', background: 'linear-gradient(90deg, #D4A017, #B8860B)', borderRadius: '2px', marginBottom: '16px' }} />

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                  {category.tags?.map((tag: string) => (
                    <span key={tag} style={{
                      backgroundColor: 'rgba(10, 65, 116, 0.08)',
                      border: '1px solid rgba(10, 65, 116, 0.15)',
                      color: '#0A4174',
                      fontSize: '0.8rem',
                      padding: '6px 14px',
                      borderRadius: '10px',
                      fontWeight: '600'
                    }}>{tag}</span>
                  ))}
                </div>

                {/* Explanation */}
                <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#4b5563', marginBottom: '32px' }}>
                  {category.explanation || category.desc}
                </p>

                {/* Applications / Kegunaan */}
                {category.applications && (
                  <div style={{
                    background: 'linear-gradient(145deg, #001D39 0%, #0a2744 100%)',
                    padding: '28px',
                    borderRadius: '20px',
                    border: '1px solid rgba(212, 160, 23, 0.2)',
                    marginBottom: '20px'
                  }}>
                    <h3 style={{ fontWeight: '700', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px', color: '#D4A017', fontSize: '14px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                      <Icon icon="mdi:lightbulb-on-outline" /> Kegunaan Umum
                    </h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {category.applications.map((app: string, i: number) => (
                        <span key={i} style={{
                          backgroundColor: 'rgba(255,255,255,0.08)',
                          border: '1px solid rgba(255,255,255,0.12)',
                          color: '#e5e7eb',
                          padding: '8px 16px',
                          borderRadius: '10px',
                          fontSize: '0.875rem',
                          fontWeight: '500'
                        }}>{app}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Materials */}
                {category.commonMaterials && (
                  <div style={{
                    background: 'linear-gradient(145deg, #001D39 0%, #0a2744 100%)',
                    padding: '28px',
                    borderRadius: '20px',
                    border: '1px solid rgba(212, 160, 23, 0.2)'
                  }}>
                    <h3 style={{ fontWeight: '700', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px', color: '#D4A017', fontSize: '14px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                      <Icon icon="mdi:layers-outline" /> Material yang Biasa Digunakan
                    </h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                      {category.commonMaterials.map((m: string, i: number) => (
                        <span key={i} style={{
                          background: 'linear-gradient(135deg, rgba(212, 160, 23, 0.15), rgba(184, 134, 11, 0.1))',
                          border: '1px solid rgba(212, 160, 23, 0.3)',
                          color: '#D4A017',
                          padding: '8px 16px',
                          borderRadius: '10px',
                          fontSize: '0.875rem',
                          fontWeight: '600'
                        }}>{m}</span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        )}

        {/* Gallery Section */}
        <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '4rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '12px' }}>
              <span style={{ width: '30px', height: '1px', background: 'linear-gradient(90deg, transparent, #D4A017)' }} />
              <span style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', color: '#D4A017' }}>GALLERY</span>
              <span style={{ width: '30px', height: '1px', background: 'linear-gradient(90deg, #D4A017, transparent)' }} />
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#001D39' }}>
              Contoh Penggunaan &amp; Gallery
            </h2>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isLargeMobile ? '1fr 1fr' : 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: isLargeMobile ? '12px' : '1.5rem'
          }}>
            {category.gallery.map((imageSrc, index) => (
              <div key={index}
                onClick={() => setSelectedImage(imageSrc)}
                style={{
                  position: 'relative',
                  width: '100%',
                  paddingTop: '100%',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                  cursor: 'pointer',
                  border: '2px solid transparent',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.border = '2px solid rgba(212, 160, 23, 0.5)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
                  const overlay = e.currentTarget.querySelector('.gallery-overlay') as HTMLElement;
                  if (overlay) overlay.style.opacity = '1';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.border = '2px solid transparent';
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';
                  const overlay = e.currentTarget.querySelector('.gallery-overlay') as HTMLElement;
                  if (overlay) overlay.style.opacity = '0';
                }}
              >
                <Image
                  src={imageSrc}
                  alt={`${category.title} - ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  style={{ objectFit: 'cover', transition: 'transform 0.4s ease' }}
                />
                {/* Hover overlay */}
                <div className="gallery-overlay" style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(0,29,57,0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0,
                  transition: 'opacity 0.3s ease'
                }}>
                  <Icon icon="mdi:magnify-plus" style={{ fontSize: '36px', color: '#D4A017' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div style={{
          marginTop: '80px',
          textAlign: 'center',
          background: 'linear-gradient(145deg, #001D39 0%, #0a2744 50%, #001D39 100%)',
          padding: isLargeMobile ? '40px 24px' : '56px 40px',
          borderRadius: '32px',
          color: 'white',
          border: '1px solid rgba(212, 160, 23, 0.2)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Decorative glow */}
          <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(212, 160, 23, 0.1) 0%, transparent 70%)', filter: 'blur(40px)' }} />
          <div style={{ position: 'absolute', bottom: '-50px', left: '-50px', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(10, 65, 116, 0.2) 0%, transparent 70%)', filter: 'blur(40px)' }} />

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '16px' }}>
            <span style={{ width: '30px', height: '1px', background: 'linear-gradient(90deg, transparent, #D4A017)' }} />
            <span style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '2px', color: '#D4A017' }}>KONSULTASI GRATIS</span>
            <span style={{ width: '30px', height: '1px', background: 'linear-gradient(90deg, #D4A017, transparent)' }} />
          </div>
          <h2 style={{ fontSize: isLargeMobile ? '1.5rem' : '2rem', fontWeight: '700', marginBottom: '16px', position: 'relative' }}>Tertarik Menggunakan Bahan Ini?</h2>
          <p style={{ marginBottom: '32px', opacity: 0.7, maxWidth: '600px', margin: '0 auto 32px', lineHeight: '1.7' }}>Dapatkan penawaran harga terbaik dan konsultasi gratis mengenai kebutuhan cetak Anda langsung dengan tim ahli kami.</p>
          <a href="https://wa.me/6281260001487" style={{
            background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
            color: 'white',
            padding: '16px 40px',
            borderRadius: '50px',
            textDecoration: 'none',
            fontWeight: '700',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '1.1rem',
            boxShadow: '0 4px 20px rgba(37, 211, 102, 0.35)',
            transition: 'all 0.3s ease',
            position: 'relative'
          }}>
            <Icon icon="mdi:whatsapp" fontSize="24" /> Hubungi Kami Sekarang
          </a>
        </div>
      </main>

      {/* Image Zoom Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            zIndex: 100,
            overflow: 'auto',
            display: 'flex',
            alignItems: zoomLevel > 1 ? 'flex-start' : 'center',
            justifyContent: zoomLevel > 1 ? 'flex-start' : 'center',
          }}
        >
          <button
            onClick={() => setSelectedImage(null)}
            style={{
              position: 'fixed',
              top: '20px',
              right: '20px',
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 110,
              color: 'white',
              backdropFilter: 'blur(4px)'
            }}
          >
            <Icon icon="mdi:close" style={{ fontSize: '24px' }} />
          </button>

          <div
            onClick={(e) => {
              e.stopPropagation();
              setZoomLevel(prev => prev === 1 ? 2.5 : 1);
            }}
            style={{
              position: 'relative',
              minWidth: zoomLevel > 1 ? '250vw' : 'auto',
              minHeight: zoomLevel > 1 ? '250vh' : 'auto',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: zoomLevel > 1 ? 'zoom-out' : 'zoom-in',
              padding: '20px'
            }}
          >
            <img
              src={selectedImage}
              alt="Zoomed View"
              style={{
                maxWidth: zoomLevel > 1 ? 'none' : '100vw',
                maxHeight: zoomLevel > 1 ? 'none' : '100vh',
                width: zoomLevel > 1 ? 'auto' : '100%',
                height: zoomLevel > 1 ? 'auto' : '100%',
                objectFit: 'contain',
                userSelect: 'none',
                transform: zoomLevel > 1 ? 'scale(1)' : 'none',
              }}
            />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}