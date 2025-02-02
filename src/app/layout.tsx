import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Predicate Task UI",
  description: "Call and retrieve tasks from the Predicate API",
  icons: {
    icon: "/predicate.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={"antialiased"}>{children}</body>
    </html>
  );
}
