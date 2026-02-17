import { Inter } from "next/font/google";
import "../styles/styles.css";

const _inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans">
        <div className="animated-bg" aria-hidden="true" />
        <div className="relative z-10 min-h-dvh flex flex-col">
          <main className="flex-1 flex flex-col">{children}</main>
          <footer className="py-6 text-center text-xs text-foreground-muted tracking-wide">
            Built with Uniform &middot; Next.js
          </footer>
        </div>
      </body>
    </html>
  );
}
