import type { Metadata } from "next";
import "./globals.css";
import MainNavBar from "@/src/components/main-nav/MainNavBar";
import Footer from "@/src/components/Footer";
import SessionWrapper from "@/src/components/SessionWrapper";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "../../i18n/routing";
import { ErrorProvider } from "@/src/context/ErrorContext";
import { ThemeProvider } from "@/src/components/theme-provider";

export const metadata: Metadata = {
  title: "<Bilog/>",
  description:
    "A global blog platform by Heo Hyeonbin (Max) supporting both English and Korean, sharing stories, insights, and knowledge.",
  openGraph: {
    title: "<Bilog/>",
    description:
      "A global blog platform by Heo Hyeonbin (Max) supporting both English and Korean, sharing stories, insights, and knowledge.",
    images: ["/logo.png"],
  },
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body className="flex flex-col items-center font-lora ">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SessionWrapper>
            <ErrorProvider>
              <NextIntlClientProvider messages={messages}>
                <div className="lg:w-[1000px] md:w-[760px] min-h-[95vh] sm:w-[95vw] pb-20">
                  <MainNavBar />
                  {children}
                </div>
                <div id="modal"></div>
                <Footer />
              </NextIntlClientProvider>
            </ErrorProvider>
          </SessionWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
