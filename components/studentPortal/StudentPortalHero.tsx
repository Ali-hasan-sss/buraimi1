"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

export default function StudentPortalHero() {
  return (
    <div className="relative bg-gradient-to-l from-[#254151] to-[#2d4a5c] overflow-hidden">
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "url(/assets/f0e151d5a6a95277d4603ec80c838f52dc92392e.png)",
          backgroundSize: "400px 400px",
          backgroundRepeat: "repeat",
        }}
      />

      <div className="relative container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-block mb-6">
            <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
              <GraduationCap className="size-16 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            بوابة الطالب
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            نظام إلكتروني متكامل لإدارة شؤونك الأكاديمية
          </p>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-[#6096b4] via-[#c2a772] to-[#6096b4]" />
    </div>
  );
}
