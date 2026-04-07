"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase'; 
import confetti from 'canvas-confetti';
import { 
  MapPin, Calendar, Clock, CheckCircle, 
  AlertCircle, ArrowRight, Activity, Zap, Trophy, Mail, 
  Loader2, Lock, HelpCircle, Instagram, CalendarPlus, Ship,
  Camera // <-- Adicionado o ícone da Câmera aqui
} from 'lucide-react';

import GaleriaExperiencia from './components/GaleriaExperiencia'; 

const WHATSAPP_GROUP_LINK = "https://chat.whatsapp.com/BEjOT8bcJkZB8D8Krzxr3R";
const INSTAGRAM_LINK = "https://www.instagram.com/invasores_081?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==";

const EVENTO_DATA = '2026-04-19T06:00:00'; 
const DATA_LIMITE = new Date(EVENTO_DATA); 

const EVENT_CONFIG = {
  name: "TREINÃO MARCO ZERO",
  tagline: "Corra, caminhe e atravesse a história de Recife.",
  date: "19/04/2026", 
  location: "Praça do Marco Zero - Recife Antigo",
  mapsLink: "https://www.google.com/maps/search/?api=1&query=Praça+do+Marco+Zero+Recife",
  time: "06:00 (Concentração)",
  pace: "8km (Corrida ou Caminhada)",
  boatFee: "R$ 7,00 (Travessia)"
};

const Card = ({ children, className = "", highlight = false }: { children: React.ReactNode, className?: string, highlight?: boolean }) => (
  <div className={`
    p-6 rounded-2xl border transition-all duration-300
    ${highlight 
      ? 'bg-orange-600 border-orange-500 text-white shadow-lg shadow-orange-500/30' 
      : 'bg-white border-slate-200 text-slate-800 shadow-xl shadow-slate-200/50 hover:border-orange-500/30'
    }
    ${className}
  `}>
    {children}
  </div>
);

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState<any>({});
  const [mounted, setMounted] = useState(false);

  const calculateTimeLeft = () => {
    const difference = +new Date(EVENTO_DATA) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        dias: Math.floor(difference / (1000 * 60 * 60 * 24)),
        horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
        min: Math.floor((difference / 1000 / 60) % 60),
        seg: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  useEffect(() => {
    setMounted(true);
    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => { setTimeLeft(calculateTimeLeft()); }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!mounted) return null;

  const timerComponents: any = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval] && timeLeft[interval] !== 0) return;
    timerComponents.push(
      <div key={interval} className="flex flex-col items-center bg-white border border-slate-100 shadow-sm p-3 rounded-xl min-w-[70px]">
        <span className="text-2xl md:text-3xl font-black text-slate-800 font-mono">{timeLeft[interval] < 10 ? `0${timeLeft[interval]}` : timeLeft[interval]}</span>
        <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">{interval}</span>
      </div>
    );
  });

  if (timerComponents.length === 0) return <div className="text-orange-600 font-black text-xl animate-pulse">É HOJE! 🚀</div>;

  return <div className="flex gap-2 justify-center mb-8">{timerComponents}</div>;
};

const FAQSection = () => {
  const faqs = [
    { p: "Preciso pagar algo para participar?", r: "O treino em si é 100% gratuito! O único custo é a taxa do barqueiro de R$ 7,00 para a travessia até o Parque das Esculturas. Leve trocado ou pague no PIX direto a eles." },
    { p: "Qual é o percurso?", r: "Serão 8km no total. Vamos sair do Marco Zero, passar pelos principais pontos do Recife Antigo, fazer a travessia de barco e retornar." },
    { p: "Iniciante pode ir?", r: "Com certeza! Teremos um grupo focado na caminhada para os mesmos 8km. O objetivo é a experiência e a resenha." },
  ];

  return (
    <section className="py-16 px-4 bg-slate-50 border-t border-slate-200 shadow-inner">
      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-10">
          <HelpCircle className="w-10 h-10 text-orange-500 mx-auto mb-4" />
          <h2 className="text-3xl font-black text-slate-900 italic tracking-tight uppercase leading-tight">Dúvidas Frequentes</h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm hover:border-orange-500/50 transition-colors">
              <h3 className="font-bold text-slate-800 text-lg mb-2 flex items-center gap-2"><span className="text-orange-500 font-bold">?</span> {faq.p}</h3>
              <p className="text-slate-600 text-sm leading-relaxed pl-4 border-l-2 border-orange-200">{faq.r}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Hero = ({ onRegisterClick }: { onRegisterClick: () => void }) => (
  <section className="relative pt-12 pb-20 px-4 overflow-hidden min-h-[500px] flex items-center justify-center">
    <div className="absolute inset-0 z-0">
      <img 
        src="/images/old-recife-marco-zero.jpg" 
        alt="Fundo Marco Zero nítido" 
        className="w-full h-full object-cover opacity-100" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
    </div>
    
    <div className="container mx-auto max-w-xl text-center relative z-10 flex flex-col items-center pt-8">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50/70 border border-blue-200/50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-6 shadow-sm backdrop-blur-sm relative z-20">
        <Ship className="w-4 h-4" /> Inclui Travessia de Barco (R$ 7,00)
      </div>

      <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter text-white mb-6 leading-[0.9] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] relative z-20">
        TREINÃO<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">MARCO ZERO</span>
      </h1>

      <p className="text-slate-50 text-lg mb-8 max-w-sm mx-auto leading-relaxed font-medium drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] relative z-20">
        {EVENT_CONFIG.tagline}
      </p>
      
      <div className="relative z-20 mb-4"><Countdown /></div>

      <button onClick={onRegisterClick} className="group relative w-full max-w-xs mx-auto bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white font-black text-lg py-4 px-8 rounded-xl shadow-lg shadow-orange-600/50 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-3 relative z-20">
        GARANTIR MINHA VAGA <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  </section>
);

const InfoSection = () => (
  <section className="py-10 px-4 bg-slate-50 border-t border-slate-200 shadow-inner">
    <div className="container mx-auto max-w-lg">
      <div className="text-center mb-10">
        <div className="w-16 h-1 bg-orange-500 mx-auto rounded-full mb-6" />
        <h2 className="text-3xl font-black text-slate-900 italic tracking-tight uppercase leading-tight">O Treino</h2>
        <p className="text-slate-600 mt-4 text-lg max-w-sm mx-auto font-medium leading-relaxed">
          Do iniciante ao avançado: <span className="text-slate-900 font-bold">8km de muita resenha e visual incrível</span> no coração da cidade.
        </p>
      </div>

      <div className="space-y-4">
        <a href={EVENT_CONFIG.mapsLink} target="_blank" rel="noopener noreferrer" className="block group w-full">
          <Card className="flex items-center gap-5 cursor-pointer hover:bg-white hover:border-orange-500/60 transition-all text-left">
            <div className="p-3 bg-orange-50 rounded-lg border border-orange-100 text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors"><MapPin className="w-6 h-6" /></div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider group-hover:text-orange-600 transition-colors">Ponto de Encontro</p>
                <span className="text-[10px] bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded border border-orange-200 group-hover:bg-orange-500 group-hover:text-white transition-colors font-bold">VER NO MAPA</span>
              </div>
              <p className="text-slate-900 font-bold text-lg underline decoration-slate-300 underline-offset-4 group-hover:decoration-orange-500 transition-all leading-snug">{EVENT_CONFIG.location}</p>
            </div>
          </Card>
        </a>

        <Card className="flex items-center gap-5 w-full text-left">
          <div className="p-3 bg-orange-50 rounded-lg border border-orange-100 text-orange-600"><Calendar className="w-6 h-6" /></div>
          <div><p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Data</p><p className="text-slate-900 font-bold text-lg leading-snug">{EVENT_CONFIG.date}</p></div>
        </Card>

        <Card className="flex items-center gap-5 w-full text-left">
          <div className="p-3 bg-orange-50 rounded-lg border border-orange-100 text-orange-600"><Clock className="w-6 h-6" /></div>
          <div><p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Largada</p><p className="text-slate-900 font-bold text-lg leading-snug">{EVENT_CONFIG.time}</p></div>
        </Card>

        <Card className="flex items-center gap-5 border-blue-200 bg-blue-50/50 w-full text-left shadow-sm">
          <div className="p-3 bg-blue-100 rounded-lg border border-blue-200 text-blue-700"><Ship className="w-6 h-6" /></div>
          <div><p className="text-xs text-blue-600 font-bold uppercase tracking-wider">Custo Extra</p><p className="text-slate-900 font-bold text-lg leading-tight">{EVENT_CONFIG.boatFee}</p><p className="text-sm text-slate-600 mt-1 font-medium leading-relaxed">Leve trocado ou pague no PIX direto a eles.</p></div>
        </Card>
      </div>
    </div>
  </section>
);

const QuoteSection = () => (
  <section className="py-16 px-4 bg-orange-600 relative overflow-hidden shadow-inner border-t border-orange-700 shadow-orange-700/50">
    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-multiply"></div>
    <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-3xl"></div>
    <div className="container mx-auto max-w-lg text-center relative z-10">
      <Zap className="w-12 h-12 text-white/90 mx-auto mb-4 animate-pulse" />
      <h2 className="text-3xl md:text-4xl font-black text-white italic tracking-tighter leading-tight max-w-xs mx-auto">"A ÚNICA COMPETIÇÃO É COM VOCÊ MESMO."</h2>
    </div>
  </section>
);

const RegistrationForm = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [errors, setErrors] = useState({ name: false, email: false });
  const [confirmedData, setConfirmedData] = useState<any>(null); 
  const [isFreshRegistration, setIsFreshRegistration] = useState(false);
  
  // NOVO ESTADO: Guarda a foto escolhida da galeria
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  
  const agora = new Date();
  const inscricoesEncerradas = agora > DATA_LIMITE;
  const [formData, setFormData] = useState({ name: '', email: '', distance: 'Corrida 8km', health: '', health_details: '', termsAccepted: false });

  useEffect(() => {
    const dadosSalvos = localStorage.getItem('invasores_marco_zero');
    if (dadosSalvos) { setConfirmedData(JSON.parse(dadosSalvos)); setSuccess(true); }
  }, []);

  const isEmailValid = (email: string) => { return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email); };

  const triggerConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;
    const frame = () => {
      confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#ea580c', '#ffffff'] });
      confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#ea580c', '#ffffff'] });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  };

  const handleReset = () => {
    localStorage.removeItem('invasores_marco_zero');
    setSuccess(false); setConfirmedData(null); setIsFreshRegistration(false);
    setUserPhoto(null); // Limpa a foto
    setFormData({ name: '', email: '', distance: 'Corrida 8km', health: '', health_details: '', termsAccepted: false });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUserPhoto(imageUrl);
    }
  };

  const handleSubmit = async () => {
    setErrors({ name: false, email: false }); setErrorMsg('');

    if(!formData.name || !formData.email || !formData.distance || !formData.health || !formData.termsAccepted) {
      setErrorMsg("Por favor, preencha todos os campos e aceite os termos."); return;
    }
    if (formData.name.trim().length < 3) {
      setErrorMsg("O nome precisa ter pelo menos 3 letras."); setErrors(prev => ({ ...prev, name: true })); return;
    }
    if (!isEmailValid(formData.email)) {
      setErrorMsg("E-mail inválido! Verifique se digitou corretamente."); setErrors(prev => ({ ...prev, email: true })); return;
    }

    setLoading(true);

    try {
      const { data: jaExiste } = await supabase.from('inscricoes').select('id').eq('email', formData.email).maybeSingle();
      if (jaExiste) {
        setErrorMsg("Este e-mail já está inscrito! 🛑"); setErrors(prev => ({ ...prev, email: true })); setLoading(false); return; 
      }

      const { data, error } = await supabase.from('inscricoes').insert([{ name: formData.name, email: formData.email, level: formData.distance, health: formData.health, health_details: formData.health_details, terms_accepted: formData.termsAccepted, age: null, phone: 'Não informado' }]).select().single();
      if (error) throw error;

      localStorage.setItem('invasores_marco_zero', JSON.stringify(data));
      setConfirmedData(data); setIsFreshRegistration(true); triggerConfetti(); setSuccess(true);
    } catch (error) {
      console.error('Erro:', error); setErrorMsg("Erro ao realizar inscrição. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (success && confirmedData && isFreshRegistration) {
      const timer = setTimeout(() => { window.location.href = WHATSAPP_GROUP_LINK; }, 4000); 
      return () => clearTimeout(timer);
    }
  }, [success, confirmedData, isFreshRegistration]);

  // === TELA DE SUCESSO (CARTÃO PREMIUM BRANCO) ===
  if (success && confirmedData) {
    const shareText = encodeURIComponent(`Fala! Me inscrevi na Invasão Marco Zero. 🏃‍♂️💨\n\nSerão 8km com direito a travessia de barco!\nGaranta sua vaga aqui: https://seusite.com.br`);
    const shareLink = `https://wa.me/?text=${shareText}`;
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(EVENT_CONFIG.name)}&dates=20260412T090000Z/20260412T130000Z&details=${encodeURIComponent(EVENT_CONFIG.tagline)}&location=${encodeURIComponent(EVENT_CONFIG.location)}`;

    return (
      <div id="inscricao" className="bg-white px-4 pt-20 pb-10">
        <div className="container mx-auto max-w-lg">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-black text-slate-900 italic uppercase mb-2 leading-tight">Tudo Certo!</h2>
            <p className="text-slate-600">Te esperamos lá no Marco Zero.</p>
          </div>
          
          {/* O CARTÃO BRANCO (Área do Print) */}
          <div className="relative bg-white border-2 border-orange-500 rounded-3xl p-6 shadow-2xl shadow-orange-500/20 mb-8 overflow-hidden text-center">
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-6">
                <span className="text-slate-900 font-black italic text-2xl tracking-tighter uppercase">Invasores</span>
                <span className="text-[10px] font-bold text-orange-700 uppercase tracking-widest border border-orange-200 px-3 py-1 rounded-full bg-orange-50">Confirmado</span>
              </div>

              {/* A FOTO GIGANTE */}
              <div className="relative w-full h-80 bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 mb-6 shadow-inner">
                {userPhoto ? (
                  <img src={userPhoto} alt="Foto do Atleta" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-slate-400">
                    <Camera size={48} className="mb-2 opacity-20" />
                    <p className="text-xs font-bold uppercase tracking-widest">Sua foto aparecerá aqui</p>
                  </div>
                )}
                
                {/* SELO CENTRALIZADO */}
                {userPhoto && (
                  <div className="absolute bottom-0 left-0 right-0 bg-green-600 text-white py-3 font-black italic text-sm flex items-center justify-center gap-2 shadow-lg">
                    <CheckCircle size={18} className="animate-pulse" /> ATLETA CONFIRMADO
                  </div>
                )}
              </div>

              {/* DADOS DO ATLETA */}
              <div className="space-y-4">
                <div>
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Nome do Atleta</p>
                  <p className="text-slate-900 text-3xl font-black capitalize leading-tight">{confirmedData.name}</p>
                </div>

                <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="text-left">
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Nº Inscrição</p>
                    <p className="text-orange-600 font-mono font-black text-2xl">#{confirmedData.numero_inscricao || "001"}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Modalidade</p>
                    <p className="text-slate-900 font-bold text-lg">{confirmedData.level}</p>
                  </div>
                </div>

                <div className="text-slate-500 text-[10px] font-bold uppercase tracking-widest pt-2">
                  19/04/2026 • 06:00h • Marco Zero, Recife
                </div>
              </div>
            </div>
          </div>

          {/* BOTÕES DE AÇÃO (Fora do Cartão) */}
          <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl text-center space-y-3 shadow-sm">
            {isFreshRegistration ? (
              <div className="flex flex-col items-center justify-center gap-2 text-slate-600 mb-6 animate-pulse"><Loader2 className="w-5 h-5 animate-spin text-green-500" /><p className="text-sm font-bold">Abrindo o Grupo VIP...</p></div>
            ) : ( <p className="text-slate-600 text-sm mb-4">Personalize e Compartilhe:</p> )}
            
            <label className="flex w-full bg-slate-900 hover:bg-slate-800 text-white font-black text-sm py-4 rounded-xl shadow-lg transition-all items-center justify-center gap-3 cursor-pointer">
              <Camera size={20} /> {userPhoto ? "TROCAR FOTO DA GALERIA" : "📸 ADICIONAR MINHA FOTO"}
              <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
            </label>

            <a href={WHATSAPP_GROUP_LINK} target="_blank" rel="noopener noreferrer" className="block w-full bg-green-600 hover:bg-green-500 text-white font-black text-sm py-4 rounded-xl shadow-lg transition-all transform hover:scale-[1.02] flex items-center justify-center gap-3 animate-pulse hover:animate-none">ENTRAR NO GRUPO VIP</a>
            <a href={shareLink} target="_blank" rel="noopener noreferrer" className="block w-full bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 font-black text-sm py-4 rounded-xl shadow-sm transition-all transform hover:scale-[1.02] flex items-center justify-center gap-3"><Instagram size={18} /> CHAMAR UM PARCEIRO(A)</a>
            <a href={googleCalendarUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 text-slate-500 text-xs font-bold hover:text-orange-600 transition-colors mt-4"><CalendarPlus size={16} /> Salvar na Agenda (Google)</a>
            <button onClick={handleReset} className="text-slate-500 font-bold underline hover:text-slate-800 text-xs mt-6 block mx-auto">Fazer Nova Inscrição</button>
          </div>
        </div>
      </div>
    );
  }

  if (inscricoesEncerradas) {
    return (
      <div id="inscricao" className="bg-slate-50 px-4 py-20 pb-32 border-t border-slate-100 shadow-inner">
        <div className="container mx-auto max-w-lg text-center">
          <div className="bg-white border border-slate-200 p-10 rounded-3xl shadow-xl">
            <Lock className="w-10 h-10 mx-auto mb-4 text-slate-400" />
            <h2 className="text-3xl font-black text-slate-900 italic uppercase mb-4 max-w-xs mx-auto leading-tight">Inscrições Encerradas</h2>
            <p className="text-slate-600 text-lg max-w-xs mx-auto leading-relaxed">O evento já aconteceu ou atingimos a data limite.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="inscricao" className="bg-white px-4 py-20 pb-32 border-t border-slate-200 relative overflow-hidden">
      
      <Zap className="absolute -bottom-10 -left-10 w-40 h-40 text-orange-100/50 -rotate-12 pointer-events-none z-0 hidden md:block" />
      <MapPin className="absolute -top-10 -right-10 w-40 h-40 text-blue-100/50 rotate-12 pointer-events-none z-0 hidden md:block" />

      <div className="container mx-auto max-w-lg relative z-10">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-black text-slate-900 italic tracking-tighter uppercase max-w-xs mx-auto leading-tight">Garanta sua Vaga</h2>
          <div className="w-24 h-1.5 bg-orange-500 mx-auto mt-4 rounded-full" />
        </div>

        <div className="bg-white border border-slate-200 p-6 md:p-8 rounded-3xl shadow-xl shadow-slate-200 border-t-2 border-t-orange-500">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Nome</label>
              <input type="text" placeholder="Como você gosta de ser chamado?" 
                className={`w-full bg-slate-50 border text-slate-900 p-4 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all placeholder:text-slate-400 font-medium ${errors.name ? 'border-red-500 animate-pulse' : 'border-slate-200'}`}
                value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">E-mail</label>
              <div className="relative">
                <input type="email" placeholder="seu@email.com" 
                  className={`w-full bg-slate-50 border text-slate-900 p-4 pl-12 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all placeholder:text-slate-400 font-medium ${errors.email ? 'border-red-500 animate-pulse' : 'border-slate-200'}`}
                  value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                />
                <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${errors.email ? 'text-red-500' : 'text-slate-400'}`} />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Sua Modalidade (8km)</label>
              <div className="grid grid-cols-2 gap-3">
                {['Corrida 8km', 'Caminhada 8km'].map((dist) => (
                  <button key={dist} onClick={() => setFormData({...formData, distance: dist})} 
                    className={`py-4 px-2 rounded-xl text-sm font-bold border transition-all leading-snug transform active:scale-95 ${formData.distance === dist ? 'bg-orange-600 text-white border-orange-500 shadow-lg shadow-orange-500/30' : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300'}`}
                  >
                    {dist}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 bg-pink-100 rounded-full"><Activity className="w-4 h-4 text-pink-600" /></div>
                <label className="text-sm font-bold text-slate-700">Possui alguma condição de saúde?</label>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <button onClick={() => setFormData({...formData, health: 'Não'})} className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all transform active:scale-95 ${formData.health === 'Não' ? 'bg-green-50 border-green-500 text-green-700' : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'}`}>
                  <span className="font-bold">Não, sou apto</span><CheckCircle className="w-5 h-5" />
                </button>
                <button onClick={() => setFormData({...formData, health: 'Sim'})} className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all transform active:scale-95 ${formData.health === 'Sim' ? 'bg-red-50 border-red-500 text-red-700' : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'}`}>
                  <span className="font-bold">Sim, tenho</span><AlertCircle className="w-5 h-5" />
                </button>
              </div>
              
              {formData.health === 'Sim' && (
                <div className="mt-2">
                  <input type="text" placeholder="Qual? (Ex: Asma, Hipertensão...)" 
                    className="w-full bg-slate-50 border border-red-300 text-slate-900 p-4 rounded-xl focus:ring-2 focus:ring-red-500 outline-none placeholder:text-slate-400 font-medium"
                    value={formData.health_details} onChange={e => setFormData({...formData, health_details: e.target.value})} 
                  />
                </div>
              )}
            </div>

            <label className="flex gap-3 items-start p-4 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer hover:border-slate-300 transition-colors relative z-10">
              <input type="checkbox" checked={formData.termsAccepted} onChange={e => setFormData({...formData, termsAccepted: e.target.checked})} className="mt-1 w-6 h-6 flex-shrink-0 accent-orange-600 rounded border-slate-300 transform active:scale-95" />
              <span className="text-xs text-slate-600 leading-relaxed font-medium">Estou ciente do custo de R$ 7,00 do barco, declaro que estou apto fisicamente para o treino e autorizo o uso da minha imagem em fotos e vídeos.</span>
            </label>

            {errorMsg && <div className="text-red-700 text-sm text-center font-bold bg-red-50 p-4 rounded-xl border border-red-200 max-w-xs mx-auto leading-relaxed">{errorMsg}</div>}

            <button onClick={handleSubmit} disabled={loading} className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white font-black text-xl py-5 rounded-xl shadow-lg shadow-orange-500/30 transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center relative z-10">
              {loading ? <span className="flex items-center gap-3"><Loader2 className="w-6 h-6 animate-spin"/>Confirmando...</span> : "CONFIRMAR INSCRIÇÃO"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LandingPage() {
  const scrollToForm = () => { document.getElementById('inscricao')?.scrollIntoView({ behavior: 'smooth' }); };
  return (
    <main className="min-h-screen bg-white font-sans selection:bg-orange-500 selection:text-white scroll-smooth relative">
      <div className="relative z-10">
        <Hero onRegisterClick={scrollToForm} />
        <InfoSection />
        <GaleriaExperiencia />
        <QuoteSection />
        <FAQSection />
        <RegistrationForm />
      </div>
      
      <footer className="bg-slate-50 pt-10 pb-8 border-t border-slate-200 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-300 via-orange-500 to-blue-300 pointer-events-none" />
        <div className="container mx-auto px-4 text-center">
          <div className="mb-10 flex flex-col items-center gap-2">
             <Trophy className="w-10 h-10 text-slate-300" />
            <span className="text-2xl font-black text-slate-300 italic tracking-tighter cursor-default">INVASORES</span>
          </div>

          <div className="flex justify-center items-center gap-6 mb-10">
            <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" className="group p-4 rounded-full bg-white border border-slate-200 text-slate-500 hover:text-pink-600 hover:border-pink-200 hover:bg-pink-50 transition-all transform hover:scale-110 shadow-sm"><Instagram size={24} /></a>
            <a href={WHATSAPP_GROUP_LINK} target="_blank" rel="noopener noreferrer" className="group p-4 rounded-full bg-white border border-slate-200 text-slate-500 hover:text-green-600 hover:border-green-200 hover:bg-green-50 transition-all transform hover:scale-110 shadow-sm">
               <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="0" fill="currentColor" className="group-hover:fill-green-600 transition-colors"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            </a>
          </div>

          <div className="flex flex-col items-center gap-2 max-w-xs mx-auto">
            <p className="text-slate-600 text-xs font-medium">© 2026 Grupo Invasores. Todos os direitos reservados.</p>
            <p className="text-slate-500 text-[10px] leading-relaxed mt-1">Desenvolvido com foco na energia do Recife Antigo.</p>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="mt-8 py-3 px-6 rounded-lg bg-white border border-slate-200 text-orange-600 font-bold text-xs uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center gap-2 mx-auto shadow-sm transform active:scale-95 relative z-10">Voltar ao Topo <ArrowRight className="-rotate-90 w-4 h-4" /></button>
          </div>
        </div>
      </footer>
    </main>
  );
}