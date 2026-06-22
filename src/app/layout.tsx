import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Guía del Aeropuerto de Barcelona El Prat (BCN) — Todo lo que necesitas saber",
  description:
    "Guía completa para pasajeros del Aeropuerto de Barcelona El Prat: cómo llegar, transporte, control de seguridad, líquidos en el equipaje de mano, navigación por terminales T1 y T2 y preguntas frecuentes.",
  keywords: [
    "aeropuerto barcelona el prat",
    "BCN aeropuerto",
    "como llegar aeropuerto barcelona",
    "control seguridad aeropuerto",
    "liquidos avion reglas",
    "metro L9 aeropuerto",
    "aerobus barcelona",
    "terminal 1 terminal 2 barcelona",
  ],
  openGraph: {
    title: "Guía del Aeropuerto de Barcelona El Prat (BCN)",
    description:
      "Todo lo que necesitas para volar desde Barcelona sin estrés: transporte, seguridad, terminales y consejos prácticos.",
    type: "website",
    locale: "es_ES",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
