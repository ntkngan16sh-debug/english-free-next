import "./globals.css";

export const metadata = {
  title: "English Free",
  description: "Học tiếng Anh miễn phí cho người Việt"
};

export default function RootLayout({ children }) {
  return <html lang="vi"><body>{children}</body></html>;
}
