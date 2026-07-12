export const metadata = {
  title: "English Free",
  description: "Learn English anytime, anywhere",
};

import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
