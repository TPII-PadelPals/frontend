import AuthLayout from "@/components/AuthLayout";
import { Toaster } from "@/components/ui/toaster";
import Providers from "@/providers";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PadelPals",
  description: "Un servicio de conexión entre jugadores y canchas de pádel basados en IA",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang="en">
        <body>
          <AuthLayout>
            <div className="main">{children}</div>
          </AuthLayout>
          <Toaster />
        </body>
      </html>
    </Providers>
  );
}
