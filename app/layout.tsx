import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar";
import AuthProvider from "./auth/AuthProvider";
import QueryClientProviderWrapper from "./QueryClientProvider";

export const metadata: Metadata = {
  title: "Issue Hub",
  description: "A simple issue tracker. Built with Next.js and Prisma.",
};

const poppins = Poppins({
  weight: ["400", "500", "600"],
  variable: "--font-poppins",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className}`}>
        <QueryClientProviderWrapper>
          <AuthProvider>
            <Navbar />
            <main>{children}</main>
          </AuthProvider>
        </QueryClientProviderWrapper>
      </body>
    </html>
  );
}
