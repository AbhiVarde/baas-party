import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/header";
import { ThemeProvider } from "@/components/theme";
import { Sidebar } from "@/components/nav";
import { Footer } from "@/components/footer";
import { getNav } from "@/lib/nav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BaaS Party",
  description: "Backend-as-a-Service syntax comparison by example",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const nav = getNav();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <Header nav={nav} />
            <Sidebar nav={nav} />
            <main className="flex min-h-[calc(100vh-3.5rem)] flex-col pt-14 lg:pl-56">
              <div className="flex-1">{children}</div>
              <Footer />
            </main>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
