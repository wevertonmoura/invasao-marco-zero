import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// --- 🚀 SEO & METADADOS PROFISSIONAIS ---
export const metadata: Metadata = {
  title: "Invasão Marco Zero | Treino Invasores",
  description: "Garanta sua vaga no treino de 8km no Marco Zero. Uma experiência única no Recife Antigo com direito a travessia de barco!",
  
  // Palavras-chave para ajudar a achar no Google
  keywords: ["corrida recife", "treino invasores", "corrida marco zero", "recife antigo", "corrida de rua", "invasores running", "parque das esculturas"],
  authors: [{ name: "Grupo Invasores" }],

  // Configuração para quando compartilhar o link no WhatsApp/Instagram
  openGraph: {
    title: "Invasão Marco Zero - Treino Invasores! 🏃‍♂️⛴️",
    description: "Bora pros 8km no Recife Antigo com travessia de barco? Garanta sua vaga agora!",
    url: "https://treino-invasores.vercel.app", 
    siteName: "Grupo Invasores",
    locale: "pt_BR",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className="scroll-smooth">
      <body className={`${inter.className} antialiased bg-white text-slate-900`}>
        {children}
      </body>
    </html>
  );
}