"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

export type StudentPortalQuickLink = {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
};

export default function StudentPortalQuickLinks({
  links,
}: {
  links: StudentPortalQuickLink[];
}) {
  return (
    <div className="grid gap-4">
      {links.map((link, index) => (
        <motion.div
          key={link.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 + index * 0.1 }}
          className="group bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-[#6096b4] rounded-xl p-5 transition-all duration-300 shadow-sm hover:shadow-lg cursor-pointer"
        >
          <div className="flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
              style={{ backgroundColor: link.color }}
            >
              <link.icon className="size-6 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-gray-800 group-hover:text-[#254151] transition-colors mb-1">
                {link.title}
              </h4>
              <p className="text-sm text-gray-600">{link.description}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
