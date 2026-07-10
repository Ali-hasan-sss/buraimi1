"use client";

import { Mail } from "lucide-react";

export default function StudentPortalSupportCard() {
  return (
    <div className="bg-gradient-to-br from-[#254151] to-[#2d4a5c] rounded-2xl p-6 text-white">
      <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
        <Mail className="size-5" />
        بحاجة إلى مساعدة؟
      </h4>
      <p className="text-blue-100 mb-4 text-sm">
        فريق الدعم الفني متاح لمساعدتك في حل أي مشكلة تواجهك
      </p>
      <div className="space-y-2 text-sm">
        <p className="flex items-center gap-2">
          <Mail className="size-4" />
          <a
            href="mailto:support@buc.edu.om"
            className="hover:text-[#c2a772] transition-colors"
          >
            support@buc.edu.om
          </a>
        </p>
      </div>
    </div>
  );
}
