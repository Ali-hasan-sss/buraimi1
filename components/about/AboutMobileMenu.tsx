"use client";

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronDown, Menu } from 'lucide-react';

import type { MenuItem } from '@/components/about/aboutMenu';

type Props = {
    menuItems: MenuItem[];
    activeSection: string;
    expandedMenus: string[];
    isOpen: boolean;
    onToggleOpen: () => void;
    onToggleMenu: (id: string) => void;
    onSelectSection: (id: string) => void;
};

export default function AboutMobileMenu({
    menuItems,
    activeSection,
    expandedMenus,
    isOpen,
    onToggleOpen,
    onToggleMenu,
    onSelectSection,
}: Props) {
    return (
        <>
            <div className="lg:hidden mb-6">
                <button
                    onClick={onToggleOpen}
                    className="w-full bg-gradient-to-l from-[#254151] to-[#2d4a5c] text-white p-4 rounded-xl shadow-lg flex items-center justify-between"
                >
                    <div className="flex items-center gap-3">
                        <Menu className="size-6" />
                        <span className="font-bold text-sm sm:text-base">القائمة الرئيسية</span>
                    </div>
                    <ChevronDown
                        className={`size-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    />
                </button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="lg:hidden mb-6 overflow-hidden"
                    >
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                            <nav className="p-3 max-h-[60vh] overflow-y-auto custom-scrollbar">
                                <div className="space-y-1">
                                    {menuItems.map((item) => (
                                        <div key={item.id}>
                                            <div className="w-full">
                                                <button
                                                    onClick={() => {
                                                        if (item.hasSubMenu) {
                                                            onToggleMenu(item.id);
                                                        } else {
                                                            onSelectSection(item.id);
                                                        }
                                                    }}
                                                    className={`w-full group relative overflow-hidden rounded-xl transition-all duration-300 ${activeSection === item.id && !item.hasSubMenu
                                                        ? 'bg-gradient-to-l from-[#254151] to-[#2d4a5c] text-white shadow-lg'
                                                        : 'hover:bg-gray-50 text-gray-700'
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-3 p-4">
                                                        <div
                                                            className={`p-2 rounded-lg transition-all duration-300 ${activeSection === item.id && !item.hasSubMenu
                                                                ? 'bg-white/20'
                                                                : 'bg-gradient-to-br from-[#6096b4]/10 to-[#c2a772]/10'
                                                                }`}
                                                        >
                                                            <item.icon
                                                                className={`size-5 ${activeSection === item.id && !item.hasSubMenu
                                                                    ? 'text-white'
                                                                    : 'text-[#254151]'
                                                                    }`}
                                                            />
                                                        </div>
                                                        <span className="flex-1 min-w-0 text-right font-medium text-sm truncate">
                                                            {item.title}
                                                        </span>
                                                        {item.hasSubMenu && (
                                                            <ChevronLeft
                                                                className={`size-4 transition-transform duration-300 ${expandedMenus.includes(item.id) ? 'rotate-90' : ''
                                                                    }`}
                                                            />
                                                        )}
                                                    </div>
                                                </button>

                                                <AnimatePresence>
                                                    {item.hasSubMenu && expandedMenus.includes(item.id) && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: 'auto', opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.3 }}
                                                            className="overflow-hidden"
                                                        >
                                                            <div className="pr-4 pt-1 pb-2 space-y-1">
                                                                {item.subItems?.map((subItem) => (
                                                                    <button
                                                                        key={subItem.id}
                                                                        onClick={() => onSelectSection(subItem.id)}
                                                                        className={`w-full group flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${activeSection === subItem.id
                                                                            ? 'bg-gradient-to-l from-[#6096b4] to-[#7aa5be] text-white shadow-md'
                                                                            : 'hover:bg-gray-50 text-gray-600'
                                                                            }`}
                                                                    >
                                                                        <div
                                                                            className={`p-1.5 rounded-lg ${activeSection === subItem.id
                                                                                ? 'bg-white/20'
                                                                                : 'bg-[#6096b4]/10'
                                                                                }`}
                                                                        >
                                                                            <subItem.icon
                                                                                className={`size-4 ${activeSection === subItem.id
                                                                                    ? 'text-white'
                                                                                    : 'text-[#6096b4]'
                                                                                    }`}
                                                                            />
                                                                        </div>
                                                                        <span className="text-sm font-medium truncate">
                                                                            {subItem.title}
                                                                        </span>
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </nav>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
