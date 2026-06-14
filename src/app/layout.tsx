import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/header";
import { ThemeProvider } from "@/components/theme";
import { Sidebar } from "@/components/nav";
import { PlatformProvider } from "@/components/platform-context";
import { getNav } from "@/lib/nav";
import { getStarCount } from "@/lib/github";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://baas.abhivarde.in";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "BaaS Party",
    template: "%s · BaaS Party",
  },
  description:
    "Compare Supabase, Appwrite, and Convex syntax side by side — real code, real tasks. The fastest way to pick your backend.",
  keywords: [
    "supabase",
    "appwrite",
    "convex",
    "baas",
    "backend as a service",
    "comparison",
    "syntax",
    "code snippets",
  ],
  authors: [{ name: "Abhi Varde", url: "https://abhivarde.in" }],
  creator: "Abhi Varde",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "BaaS Party",
    title: "BaaS Party 🎉",
    description:
      "Compare Supabase, Appwrite, and Convex syntax side by side — real code, real tasks.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "BaaS Party — Backend syntax comparison by example",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BaaS Party 🎉",
    description:
      "Compare Supabase, Appwrite, and Convex syntax side by side — real code, real tasks.",
    images: ["/og.png"],
    creator: "@abhivarde",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const nav = getNav();
  const stars = await getStarCount();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          enableColorScheme={false}
          disableTransitionOnChange
        >
          <TooltipProvider>
            <PlatformProvider>
              <Header nav={nav} stars={stars} />
              <div className="flex">
                <Sidebar nav={nav} />
                <main className="flex min-h-[calc(100vh-3.5rem)] flex-1 flex-col">
                  {children}
                </main>
              </div>
            </PlatformProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
