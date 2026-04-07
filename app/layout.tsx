import type { Metadata } from "next";
import { Inter } from "next/font/google"; 
import "./globals.css";

// Configuração da Fonte (Otimizada)
const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap', 
  variable: '--font-inter',
});

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
    url: "https://treino-invasores.vercel.app", // Você pode atualizar com seu link oficial depois
    siteName: "Grupo Invasores",
    locale: "pt_BR",
    type: "website",
  },
  
  // Ícone da aba do navegador
  icons: {
    icon: "/icon.png", 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className="scroll-smooth">
      {/* Atualizado para fundo branco (bg-white) e texto escuro (text-slate-900) para combinar com o novo design */}
      <body className={`${inter.className} antialiased bg-white text-slate-900`}>
        {children}
      </body>
    </html>
  );
}