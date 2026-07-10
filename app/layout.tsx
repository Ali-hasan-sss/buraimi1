import type { Metadata } from "next";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Toaster } from "@/components/ui/sonner";
import ReduxProvider from "@/components/providers/ReduxProvider";

import localFont from "next/font/local";

const cairo = localFont({
  src: [
    {
      path: "../public/fonts/cairo/Cairo-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/cairo/Cairo-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/cairo/Cairo-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/cairo/Cairo-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/cairo/Cairo-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/cairo/Cairo-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/fonts/cairo/Cairo-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/cairo/Cairo-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-cairo",
  display: "swap",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const direction = locale === "ar" ? "rtl" : "ltr";
  const messages = await getMessages();

  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${cairo.variable} font-sans antialiased`}
      >
        {/* <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        > */}
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ReduxProvider>
            {children}
            <Toaster />
          </ReduxProvider>
        </NextIntlClientProvider>
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
