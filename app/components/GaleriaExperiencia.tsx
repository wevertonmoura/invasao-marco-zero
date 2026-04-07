"use client";

import React from 'react';
import { Camera, Trophy } from 'lucide-react';

// --- CONFIGURAÇÃO DAS IMAGENS ---
const imagensExperiencia = [
  {
    src: "/images/travessia.jpg", 
    alt: "Grupo de corredores sorrindo e celebrando a travessia de barco no Rio Capibaribe",
    caption: "A Experiência Única da Travessia"
  },
  {
    src: "/images/visual-brennand.jpg",
    alt: "Chegada no Parque das Esculturas Brennand visto do mar",
    caption: "Cenário Épico no Parque das Esculturas"
  },
  {
    src: "/images/old-recife-marco-zero.jpg",
    alt: "Rosa dos ventos do Marco Zero e prédios históricos",
    caption: "Onde Recife Começa | Rosa dos Ventos"
  },
  {
    src: "/images/sol-capibaribe.jpg",
    alt: "Sol nascendo no Rio Capibaribe",
    caption: "Energia Única do Grupo Invasores"
  },
];

const GaleriaExperiencia = () => {
  return (
    // Fundo branco para contrastar com as outras seções (Efeito Zebra)
    <section className="py-20 px-4 bg-white border-t border-slate-100 shadow-inner">
      <div className="container mx-auto max-w-lg">
        <div className="text-center mb-12">
          
          <p className="text-slate-600 mt-4 text-lg font-medium max-w-sm mx-auto leading-relaxed">
            Visualize a energia única da travessia de barco e a beleza do Recife Antigo que te esperam.
          </p>
        </div>

        {/* --- GRID DE IMAGENS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {imagensExperiencia.map((imagem, index) => (
            <div 
              key={index} 
              // aspect-[4/3] padroniza o tamanho de TODAS as fotos! Nenhuma fica maior que a outra.
              className="group relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-orange-500/10 border border-slate-100 transition-all transform hover:scale-[1.03]"
            >
              <img 
                src={imagem.src} 
                alt={imagem.alt} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
              />
              
              {/* CÓDIGO CORRIGIDO: Opacidade 100% no celular (sempre visível) e animação mantida para PC */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-5 text-white opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300">
                <p className="font-bold text-lg leading-tight drop-shadow-md">{imagem.caption}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-orange-50 border border-orange-200 p-6 rounded-2xl text-center mt-12 flex items-center justify-center gap-3 shadow-sm">
             <Trophy className="w-6 h-6 text-orange-600 flex-shrink-0" />
             <p className="text-orange-950 font-bold text-sm">Lembre-se: O trajeto oficial inclui a travessia de barco (R$ 7,00)! É uma oportunidade fotográfica única.</p>
        </div>
      </div>
    </section>
  );
};

export default GaleriaExperiencia;