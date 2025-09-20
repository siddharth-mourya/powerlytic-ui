import Providers from "./providers";
import { ReactNode } from "react";
import "./globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        hhh
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
