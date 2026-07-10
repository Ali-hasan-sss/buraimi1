"use client";

import { AnimatePresence, motion } from 'framer-motion';
import { Building2, ChevronDown, ChevronLeft } from 'lucide-react';

import type { MenuItem } from '@/components/about/aboutMenu';

type Props = {
    menuItems: MenuItem[];
    activeSection: string;
    expandedMenus: string[];
    isCollapsed: boolean;
    onToggleCollapsed: () => void;
    onToggleMenu: (id: string) => void;
    onSelectSection: (id: string) => void;
};

export default function AboutDesktopSidebarMenu({
    menuItems,
    activeSection,
    expandedMenus,
    isCollapsed,
    onToggleCollapsed,
    onToggleMenu,
    onSelectSection,
}: Props) {
    return (
        <aside className="hidden lg:block">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                <button
                    onClick={onToggleCollapsed}
                    className="w-full bg-gradient-to-l from-[#254151] to-[#2d4a5c] p-6 hover:from-[#2d4a5c] hover:to-[#254151] transition-all duration-300"
                >
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                            <Building2 className="size-6 text-white" />
                        </div>
                        <div className="flex-1 text-right">
                            <h2 className="text-xl font-bold text-white">القائمة الرئيسية</h2>
                            <p className="text-sm text-blue-100">اختر القسم المطلوب</p>
                        </div>
                        <ChevronDown
                            className={`size-5 text-white/80 transition-transform duration-300 ${isCollapsed ? '-rotate-180' : ''
                                }`}
                        />
                    </div>
                </button>

                <AnimatePresence>
                    {!isCollapsed && (
                        <motion.nav
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                        >
                            <div className="p-3 max-h-[calc(100vh-16rem)] overflow-y-auto custom-scrollbar">
                                <div className="space-y-1">
                                    {menuItems.map((item, index) => (
                                        <motion.div
                                            key={item.id}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                        >
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
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.nav>
                    )}
                </AnimatePresence>
            </div>
        </aside>
    );
}
