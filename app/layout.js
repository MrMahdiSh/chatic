import "./globals.css";

export const metadata = {
  title: "چتیک",
  description: "بهترین راه حل برای پشتیبانی از کاربران",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <head>
        {/* Link to favicon */}
        <link
          rel="icon"
          href="/images/logo/Icon.png"
          sizes="any"
          type="image/png"
        />
        <link rel="apple-touch-icon" href="/images/logo/Icon.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
