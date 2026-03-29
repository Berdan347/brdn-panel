import "./globals.css";

export const metadata = {
  title: "Alias Üretim Paneli",
  description: "Profesyonel alias üretim paneli",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}