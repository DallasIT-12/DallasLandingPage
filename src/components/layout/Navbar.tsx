'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { Icon } from '@iconify/react';
import LanguageSwitcher from '@/components/common/LanguageSwitcher';
import { useTranslations } from 'next-intl';

export default function Navbar() {
    const t = useTranslations();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Consider window width for desktop vs mobile sizing
    const [isLargeMobile, setIsLargeMobile] = useState(false);

    // We need to run client-side to get window size accurately. 
    // However, simpler approach is to rely entirely on Tailwind's responsive classes 
    // where possible instead of tracking window.innerWidth.
    // We'll update inline styles to Tailwind classes where we can.

    const navLinks = [
        { href: '/', label: t('Navbar.home') },
        { href: '/about', label: t('Navbar.about') },
        { href: '/products', label: t('Navbar.products') },
        { href: '/KATALOG DALLAS.pdf', label: t('Navbar.catalog'), download: true },
        { href: '/paperlisens', label: t('Navbar.paperlisens') },
        { href: '/articles', label: t('Navbar.articles') },
        { href: '#contact', label: t('Navbar.contact'), isScroll: true },
    ];

    const smoothScroll = (e: React.MouseEvent, targetId: string) => {
        e.preventDefault();
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const renderNavLinks = () => navLinks.map(link => {
        const isHome = false; // We can't rely on isHome for color because it depends on the active page, but let's make it universal
        const baseClasses = "py-4 md:py-0 text-center md:text-left border-b border-gray-200/50 md:border-none w-full md:w-auto font-medium transition-all duration-300 hover:text-black md:hover:-translate-y-[2px] cursor-pointer no-underline";
        const textColor = "text-gray-600";

        if (link.isScroll) {
            return (
                <a
                    key={link.label}
                    href={`/${link.href}`}
                    onClick={(e) => {
                        if (window.location.pathname === '/' || window.location.pathname === '/id' || window.location.pathname === '/en' || window.location.pathname === '/zh') {
                            smoothScroll(e, link.href);
                        }
                        setIsMenuOpen(false);
                    }}
                    className={`${baseClasses} text-gray-600`}
                >
                    {link.label}
                </a>
            );
        }

        return (
            <Link
                key={link.label}
                href={link.href}
                download={link.download ? 'KATALOG DALLAS.pdf' : undefined}
                onClick={() => setIsMenuOpen(false)}
                className={`${baseClasses} ${textColor}`}
            >
                {link.label}
            </Link>
        )
    });

    return (
        <>
            {/* Top Bar Contact Info & Social Media */}
            <div className="bg-white text-black text-xs py-2 md:py-1 fixed top-0 left-0 w-full z-[100] border-b border-gray-200">
                <div className="max-w-[1280px] mx-auto px-6 flex justify-center md:justify-between items-center flex-wrap md:flex-nowrap gap-2 md:gap-0">
                    <div className="flex items-center gap-4 flex-wrap justify-center">
                        <span className="hidden md:flex items-center gap-1">
                            <Icon icon="mdi:map-marker" className="text-[14px]" />
                            {t('TopBar.address')}
                        </span>
                        <span className="flex items-center gap-1">
                            <Icon icon="mdi:phone" className="text-[14px]" />
                            <span className="inline md:hidden">081260001487</span>
                            <span className="hidden md:inline">081260001487 | 085946896488 | 085235531946</span>
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <a href="https://www.instagram.com/paperlisens22?igsh=bDl4OHI3d2d0eHV0" target="_blank" rel="noopener noreferrer" className="text-black" title="Instagram">
                            <Icon icon="mdi:instagram" className="text-[18px]" />
                        </a>
                        <a href="https://www.tiktok.com/@paperlisenss22" target="_blank" rel="noopener noreferrer" className="text-black" title="TikTok">
                            <Icon icon="ic:baseline-tiktok" className="text-[18px]" />
                        </a>
                        <a href="https://id.shp.ee/tpQ9dbH" target="_blank" rel="noopener noreferrer" className="text-black" title="Shopee Paperlisens">
                            <Icon icon="ic:baseline-shopping-bag" className="text-[18px]" />
                        </a>
                        <a href="https://id.shp.ee/ZqzSum7" target="_blank" rel="noopener noreferrer" className="text-black" title="Shopee Tray&me">
                            <Icon icon="ic:baseline-shopping-bag" className="text-[18px]" />
                        </a>
                        <a href="https://www.facebook.com/share/1G3GADNMZi/" target="_blank" rel="noopener noreferrer" className="text-black" title="Facebook">
                            <Icon icon="mdi:facebook" className="text-[18px]" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="fixed top-[36px] md:top-[30px] w-full z-50 bg-white/95 backdrop-blur-[20px] saturate-[180%] border-b border-gray-200/50">
                <div className="max-w-[1280px] mx-auto px-6 relative">
                    <div className="flex justify-between items-center py-4">
                        <Link href="/" style={{ textDecoration: 'none' }}>
                            <Image src="/logo1.webp" alt="Percetakan Dallas" width={360} height={108} style={{ height: '36px', width: 'auto', filter: 'invert(1)' }} priority />
                        </Link>

                        <button aria-label="Toggle mobile menu" onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden bg-transparent border-none text-black text-2xl">
                            <Icon icon={isMenuOpen ? "mdi:close" : "mdi:menu"} />
                        </button>
                        <div className="hidden md:flex gap-8 items-center">
                            {renderNavLinks()}
                            <LanguageSwitcher />
                        </div>
                    </div>

                    {isMenuOpen && (
                        <div className="md:hidden absolute top-[100%] left-0 right-0 bg-white flex flex-col items-center px-6 pb-4 border-b border-gray-200/50 shadow-md">
                            {renderNavLinks()}
                            <div className="mt-4 pt-4 border-t border-gray-200/50 w-full flex justify-center">
                                <LanguageSwitcher />
                            </div>
                        </div>
                    )}
                </div>
            </nav>
        </>
    );
}
