import React from "react";
import { base44 } from "@/api/base44Client";
import {
  Home,
  Map,
  Bell,
  FileText,
  Stethoscope,
  Hospital,
  Share2,
  Info,
  LogOut } from
"lucide-react";

const items = [
{ id: "inicio", label: "Início", icon: Home },
{ id: "mapa", label: "Mapa de Risco", icon: Map },
{ id: "alertas", label: "Alertas", icon: Bell },
{ id: "notificacoes", label: "Notificações", icon: FileText },
{ id: "sintomas", label: "Sintomas", icon: Stethoscope },
{ id: "unidades", label: "Unidades de Saúde", icon: Hospital },
{ id: "compartilhar", label: "Compartilhar", icon: Share2 },
{ id: "sobre", label: "Sobre o Projeto", icon: Info }];


const sources = [
{ label: "Sesau Recife", dot: "bg-white" },
{ label: "SEVS", dot: "bg-green-400" },
{ label: "Cievs Recife", dot: "bg-purple-400" },
{ label: "INMET", dot: "bg-blue-400" },
{ label: "SMS Recife", dot: "bg-cyan-400" },
{ label: "LEVEDIQ", dot: "bg-amber-400" },
{ label: "IDH", dot: "bg-pink-400" }];


export default function Sidebar({ active, onChange }) {
  return (
    <aside className="w-64 shrink-0 bg-[#0b1e42] text-white flex flex-col">
      <div className="px-5 py-5 flex items-center gap-3 border-b border-white/10">
        <img
          src="https://images.seeklogo.com/logo-png/27/1/prefeitura-do-recife-logo-png_seeklogo-272328.png"
          alt="Prefeitura do Recife"
          className="h-10 w-auto object-contain" />
        
        <div className="leading-tight">
          <p className="text-sm font-semibold">Prefeitura do Recife</p>
          <p className="text-[11px] text-white/60">Save Dengue</p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {items.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => onChange(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              isActive ?
              "bg-[#0056b3] text-white" :
              "text-white/80 hover:bg-white/10 hover:text-white"}`
              }>
              
              <Icon className="w-4 h-4 shrink-0" />
              <span>{label}</span>
            </button>);

        })}
      </nav>

      <div className="px-5 py-3 border-t border-white/10">
        <p className="text-[11px] uppercase tracking-wide text-white/40 mb-2">Fontes de dados</p>
        <div className="flex flex-wrap gap-x-3 gap-y-1.5">
          {sources.map((s) =>
          <div key={s.label} className="flex items-center gap-1.5 text-[11px]">
              <span className={`w-2 h-2 rounded-full ${s.dot}`} />
              <span className="text-white/70">{s.label}</span>
            </div>
          )}
        </div>
      </div>

      <div className="px-5 py-4 border-t border-white/10">
        <p className="text-[11px] text-white/50 mb-3">Dados atualizados em 10/09/2026</p>
        <button
          onClick={() => base44.auth.logout("/login")}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm transition-colors">
          
          <LogOut className="w-4 h-4" />
          Sair
        </button>
      </div>
    </aside>);

}