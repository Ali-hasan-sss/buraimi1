import { cn } from "@/lib/utils";
import { getSiteContactSettings } from "@/lib/site-contact-settings";
import { siteSocialIconLabel } from "@/lib/site-contact-settings-icons";

import { SocialPlatformIcon } from "./SocialPlatformIcon";

export async function SiteSocialLinksBar({
  className,
  iconClassName,
}: {
  className?: string;
  iconClassName?: string;
}) {
  const { socialLinks } = await getSiteContactSettings();
  if (!socialLinks.length) return null;

  return (
    <div
      className={cn("flex flex-wrap items-center justify-center gap-3", className)}
      role="list"
    >
      {socialLinks.map((link, i) => {
        const label = siteSocialIconLabel(link.icon);
        const isHttp =
          link.url.startsWith("http://") || link.url.startsWith("https://");
        return (
          <a
            key={`${link.icon}-${i}`}
            href={link.url}
            role="listitem"
            className="text-foreground/90 hover:text-foreground inline-flex size-10 items-center justify-center rounded-full border border-white/30 bg-white/10 transition-colors hover:bg-white/20"
            aria-label={label}
            {...(isHttp
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            <SocialPlatformIcon
              name={link.icon}
              className={cn("size-5", iconClassName)}
              aria-hidden
            />
          </a>
        );
      })}
    </div>
  );
}
