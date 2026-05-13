import type { Metadata } from "next";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import "./globals.css";

export const metadata: Metadata = {
  title: "Monastery Tower | Ikh Huree Residence",
  description:
    "Ikh Huree Residence нь хотын төвд амьдрах, ажиллах, уулзах, худалдаа үйлчилгээ авах хэрэгцээг нэг дор төвлөрүүлсэн дээд зэрэглэлийн apartment төсөл.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mn" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
