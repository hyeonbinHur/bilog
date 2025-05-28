import type { Metadata } from "next";
import "./globals.css";
import dynamic from "next/dynamic";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "../../i18n/routing";
import { ErrorProvider } from "@/src/context/ErrorContext";
// import { ThemeProvider } from "@/src/components/theme-provider";
import { GoogleAnalytics } from "@next/third-parties/google";
import Footer from "@/src/components/Footer";
import { MusicProvider } from "@/src/context/MusicContext";
import { Lora } from "next/font/google";

const MainNavBar = dynamic(
  () => import("@/src/components/main-nav/MainNavBar")
);

const SessionWrapper = dynamic(() => import("@/src/components/SessionWrapper"));

export const metadata: Metadata = {
  title: "H-Bilog",
  description:
    "This is H-Bilog which global blog platform by Hur Hyeonbin (Max) supporting both English and Korean, sharing stories, insights, and knowledge.",
  openGraph: {
    title: "H-Bilog",
    description:
      "A global blog platform by Hur Hyeonbin (Max) supporting both English and Korean, sharing stories, insights, and knowledge.",
    images: ["https://bilog-phi.vercel.app/logo.png"],
  },
  metadataBase: new URL("https://bilog-phi.vercel.app/"),
  icons: {
    icon: "https://bilog-phi.vercel.app/logo.png",
  },
};

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

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
    <html lang={locale} className={lora.className}>
      <head>
        <meta
          name="google-site-verification"
          content="mUsZGWCoo43HJ2n-1D6AVgkhIQFmRMw2kP4ptDLKsBg"
        />
      </head>
      <body className="flex flex-col items-center">
        {/* Warning: Extra attributes from the server: class,style 발생 요인  */}
        {/* <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        > */}
          <SessionWrapper>
            <ErrorProvider>
              <MusicProvider>
                <NextIntlClientProvider messages={messages}>
                  <div className="lg:w-[1000px] md:w-[760px] min-h-[95vh] w-[95vw] pb-20">
                    <MainNavBar />
                    {children}
                  </div>
                  <div id="modal"></div>
                  <Footer />
                </NextIntlClientProvider>
              </MusicProvider>
            </ErrorProvider>
          </SessionWrapper>
        {/* </ThemeProvider> */}
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID as string} />
      </body>
    </html>
  );
}
