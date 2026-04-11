"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '../lib/supabase';
import { Trophy, Users, Trash2, Copy, Check, Lock, ChevronRight, Home, ArrowLeft, Footprints, Flag } from 'lucide-react';

// --- 🔒 CONFIGURAÇÃO DE SEGURANÇA ---
const SENHA_SECRETA = "85113257"; // <--- Sua senha

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [inscritos, setInscritos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchInscritos();
    }
  }, [isAuthenticated]);

  async function fetchInscritos() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('inscricoes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setInscritos(data || []);
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao carregar lista.');
    } finally {
      setLoading(false);
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === SENHA_SECRETA) {
      setIsAuthenticated(true);
    } else {
      alert("Senha incorreta! Tente novamente.");
      setPasswordInput("");
    }
  };

  const handleCopyEmails = () => {
    const listaEmails = inscritos
      .map(i => i.email)
      .filter(email => email && email.includes('@'))
      .join(', ');

    if (!listaEmails) {
      alert("Nenhum e-mail encontrado.");
      return;
    }
    navigator.clipboard.writeText(listaEmails);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir esta inscrição?")) return;
    try {
      const { error } = await supabase.from('inscricoes').delete().eq('id', id);
      if (error) throw error;
      setInscritos(inscritos.filter(i => i.id !== id));
    } catch (error) {
      alert('Erro ao excluir. Verifique permissões SQL.');
    }
  };

  // --- TELA DE BLOQUEIO (LOGIN) 🔒 ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative">
        <Link href="/" className="absolute top-6 left-6 text-slate-500 hover:text-white flex items-center gap-2 transition-colors font-bold text-sm">
          <ArrowLeft size={18} /> Voltar ao Site
        </Link>

        <form onSubmit={handleLogin} className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-2xl max-w-sm w-full text-center">
          <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-orange-500" />
          </div>
          <h1 className="text-2xl font-black text-white italic mb-2">ÁREA RESTRITA</h1>
          <p className="text-slate-400 text-sm mb-6">Digite a senha de administrador para acessar os dados.</p>
          
          <input 
            type="password" 
            placeholder="Senha de acesso"
            className="w-full bg-slate-950 border border-slate-700 text-white p-3 rounded-lg focus:border-orange-500 outline-none mb-4 text-center tracking-widest"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            autoFocus
          />
          
          <button type="submit" className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2">
            ACESSAR PAINEL <ChevronRight size={18} />
          </button>
        </form>
      </div>
    );
  }

  // --- PAINEL PRINCIPAL (ATUALIZADO PARA MARCO ZERO) ---
  const total = inscritos.length;
  // Contadores ajustados para 8km
  const corrida = inscritos.filter(i => i.level === 'Corrida 8km').length;
  const caminhada = inscritos.filter(i => i.level === 'Caminhada 8km').length;
  // Conta quem preencheu alguma equipe diferente de "Nenhuma" (tratando null e undefined)
  const comEquipe = inscritos.filter(i => i.equipe && i.equipe !== 'Nenhuma' && i.equipe.trim() !== '').length;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 p-4 md:p-8 font-sans selection:bg-orange-500 selection:text-white">
      
      {/* Cabeçalho */}
      <div className="max-w-6xl mx-auto mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
             <Link href="/" className="bg-slate-800 hover:bg-slate-700 p-2 rounded-lg text-slate-300 transition-colors" title="Ir para o Início">
                <Home size={20} />
             </Link>
             <h1 className="text-3xl font-black text-white italic tracking-tighter">
              PAINEL <span className="text-orange-500">INVASORES</span>
            </h1>
          </div>
          <p className="text-slate-500 font-medium">Gestão do Treinão Marco Zero</p>
        </div>

        <div className="flex gap-3">
          <button 
            onClick={handleCopyEmails}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${copied ? 'bg-green-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'}`}
          >
            {copied ? <Check size={18} /> : <Copy size={18} />}
            {copied ? "Copiado!" : "Copiar E-mails"}
          </button>
          <button onClick={fetchInscritos} className="bg-orange-600 hover:bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg shadow-orange-900/20 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2v6h-6"/><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M3 22v-6h6"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/></svg>
            Atualizar
          </button>
        </div>
      </div>

      {/* Cards de Estatísticas */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
          <div className="flex items-center gap-3 mb-2 text-slate-400"><Users size={20} /> <span className="text-xs font-bold uppercase tracking-wider">Total</span></div>
          <p className="text-4xl font-black text-white">{total}</p>
        </div>
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
          <div className="flex items-center gap-3 mb-2 text-orange-500"><Trophy size={20} /> <span className="text-xs font-bold uppercase tracking-wider">Corrida 8km</span></div>
          <p className="text-4xl font-black text-white">{corrida}</p>
        </div>
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
          <div className="flex items-center gap-3 mb-2 text-green-500"><Footprints size={20} /> <span className="text-xs font-bold uppercase tracking-wider">Caminhada</span></div>
          <p className="text-4xl font-black text-white">{caminhada}</p>
        </div>
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
          <div className="flex items-center gap-3 mb-2 text-blue-400"><Flag size={20} /> <span className="text-xs font-bold uppercase tracking-wider">Com Equipe</span></div>
          <p className="text-4xl font-black text-white">{comEquipe}</p>
        </div>
      </div>

      {/* Tabela de Inscritos */}
      <div className="max-w-6xl mx-auto bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-400">
            <thead className="bg-slate-950 text-slate-300 uppercase font-black text-[10px] tracking-widest">
              <tr>
                <th className="p-4 pl-6">Atleta</th>
                <th className="p-4">Modalidade</th>
                <th className="p-4">Equipe / Assessoria</th>
                <th className="p-4">E-mail de Contato</th>
                <th className="p-4 text-center pr-6">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {loading ? (
                <tr><td colSpan={5} className="p-8 text-center text-slate-500 animate-pulse font-medium">Carregando batalhão...</td></tr>
              ) : inscritos.length === 0 ? (
                <tr><td colSpan={5} className="p-12 text-center text-slate-500 font-medium">Nenhum Invasor confirmado ainda.</td></tr>
              ) : (
                inscritos.map((pessoa) => (
                  <tr key={pessoa.id} className="hover:bg-slate-800/30 transition-colors group">
                    <td className="p-4 pl-6 font-bold text-white capitalize">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs text-orange-500 border border-slate-700">
                          {pessoa.name.charAt(0)}
                        </div>
                        {pessoa.name}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded text-xs font-bold border
                        ${pessoa.level === 'Corrida 8km' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' : ''}
                        ${pessoa.level === 'Caminhada 8km' ? 'bg-green-500/10 text-green-400 border-green-500/20' : ''}
                      `}>
                        {pessoa.level || 'Sem dist.'}
                      </span>
                    </td>
                    
                    {/* COLUNA DE EQUIPE */}
                    <td className="p-4">
                      {pessoa.equipe && pessoa.equipe !== 'Nenhuma' ? (
                        <span className="flex items-center gap-1.5 text-blue-400 font-bold bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-md w-fit text-xs truncate max-w-[200px]">
                          <Flag size={12} /> {pessoa.equipe}
                        </span>
                      ) : (
                        <span className="text-slate-600 text-xs font-medium italic">Avulso</span>
                      )}
                    </td>

                    <td className="p-4 select-all font-mono text-xs">{pessoa.email || '-'}</td>
                    <td className="p-4 pr-6 text-center">
                      <button onClick={() => handleDelete(pessoa.id)} className="text-slate-500 hover:text-red-500 transition-colors p-2 rounded-lg hover:bg-red-500/10" title="Remover Inscrição">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-6 text-center text-slate-600 text-xs font-medium">
        Gestão Exclusiva - Desenvolvido para os Invasores
      </div>
    </main>
  );
}