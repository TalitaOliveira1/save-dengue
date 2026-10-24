import React, { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Droplets, Box, Wine, Trash2, Leaf, ChevronRight, ShieldCheck, Search } from "lucide-react";
import { bairros } from "@/components/dengue/bairrosData";

const stats = [
{ label: "Casos Prováveis", value: "3.248", change: "+18%", up: true, color: "text-orange-500" },
{ label: "Casos Confirmados", value: "1.756", change: "+12%", up: true, color: "text-red-500" },
{ label: "Internações", value: "312", change: "+8%", up: true, color: "text-blue-500" },
{ label: "Tendência", value: "Em alta", change: "", up: true, color: "text-purple-500" }];

const rpas = [
{ id: 1, name: "RPA 1 - Centro", risk: "Moderado", color: "bg-yellow-400" },
{ id: 2, name: "RPA 2 - Norte", risk: "Elevado", color: "bg-orange-500" },
{ id: 3, name: "RPA 3 - Nordeste", risk: "Alto", color: "bg-red-500" },
{ id: 4, name: "RPA 4 - Oeste", risk: "Baixo", color: "bg-green-400" },
{ id: 5, name: "RPA 5 - Sudeste", risk: "Moderado", color: "bg-yellow-400" },
{ id: 6, name: "RPA 6 - Sul", risk: "Elevado", color: "bg-orange-500" }];

const prevention = [
{ icon: Droplets, label: "Evite água parada" },
{ icon: Box, label: "Tampe caixas d'água" },
{ icon: Wine, label: "Descarte garrafas" },
{ icon: Trash2, label: "Limpe o lixo" },
{ icon: Leaf, label: "Verde os pratos" },
{ icon: ChevronRight, label: "Limpe calhas" }];

export default function InicioView({ onNavigate }) {
  const [view, setView] = useState("bairros");
  const [busca, setBusca] = useState("");
  const [tick, setTick] = useState(0);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((t) => t + 1);
      setLastUpdate(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const dynamicStats = stats.map((s) => {
    if (s.label === "Tendência") return s;
    const baseValue = parseInt(s.value.replace(/\./g, ""), 10);
    const variation = Math.floor(Math.random() * 15) * (tick % 2 === 0 ? 1 : -1);
    return { ...s, value: (baseValue + variation).toLocaleString("pt-BR") };
  });

  const bairrosFiltrados = bairros.filter((b) =>
  b.name.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#212529]">Mapa de Alerta de Dengue</h1>
        <p className="text-sm text-slate-500 mt-1">Nível de risco por região - Última atualização: {lastUpdate.toLocaleTimeString("pt-BR")}</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-slate-700">Distribuição por região</h2>
          <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
            <button
              onClick={() => setView("bairros")}
              className={`px-3 py-1 text-xs rounded-md transition-colors ${
              view === "bairros" ? "bg-[#0b1e42] text-white" : "text-slate-500"}`
              }>
              
              Bairros
            </button>
            <button
              onClick={() => setView("regioes")}
              className={`px-3 py-1 text-xs rounded-md transition-colors ${
              view === "regioes" ? "bg-[#0b1e42] text-white" : "text-slate-500"}`
              }>
              
              Regiões
            </button>
          </div>
        </div>

        {view === "bairros" ?
        <>
            <div className="relative mb-4">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar bairro..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0056b3]/20" />
            
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-80 overflow-y-auto pr-1">
              {bairrosFiltrados.map((b, i) =>
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer">
                  <span className={`w-3 h-3 rounded-full shrink-0 ${b.color}`} />
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-slate-700 truncate">{b.name}</p>
                    <p className="text-[11px] text-slate-400">Risco {b.risk} · {b.rpaName}</p>
                  </div>
                </div>
            )}
              {bairrosFiltrados.length === 0 &&
            <p className="text-xs text-slate-400 col-span-3 text-center py-6">Nenhum bairro encontrado.</p>
            }
            </div>
          </> :

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {rpas.map((r) =>
          <div key={r.id} className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer">
                <span className={`w-3 h-3 rounded-full ${r.color}`} />
                <div>
                  <p className="text-xs font-medium text-slate-700">{r.name}</p>
                  <p className="text-[11px] text-slate-400">Risco {r.risk}</p>
                </div>
              </div>
          )}
          </div>
        }

        <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-slate-100">
          {[
          { c: "bg-green-400", l: "Baixo" },
          { c: "bg-yellow-400", l: "Moderado" },
          { c: "bg-orange-500", l: "Elevado" },
          { c: "bg-red-500", l: "Alto" }].
          map((x) =>
          <div key={x.l} className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${x.c}`} />
              <span className="text-xs text-slate-500">{x.l}</span>
            </div>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-sm font-semibold text-slate-700 mb-3">Panorama Epidemiológico - Recife</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {dynamicStats.map((s) =>
          <div key={s.label} className="bg-white rounded-2xl border border-slate-200 p-4">
              <p className="text-xs text-slate-500">{s.label}</p>
              <p className="text-2xl font-bold text-[#212529] mt-1">{s.value}</p>
              <p className={`text-xs mt-1 flex items-center gap-1 ${s.color}`}>
                {s.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {s.change || "em relação à semana anterior"}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-5">
        <div className="flex items-center gap-2 mb-4">
          <ShieldCheck className="w-5 h-5 text-[#0056b3]" />
          <h2 className="text-sm font-semibold text-slate-700">Como se prevenir</h2>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {prevention.map((p, i) =>
          <div key={i} className="flex flex-col items-center text-center gap-2">
              <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-[#0056b3]">
                <p.icon className="w-5 h-5" />
              </div>
              <span className="text-[11px] text-slate-600">{p.label}</span>
            </div>
          )}
        </div>
        <button
          onClick={() => onNavigate("sintomas")}
          className="text-xs text-[#0056b3] font-medium hover:underline mt-4">
          
          Ver todas as dicas
        </button>
      </div>
    </div>);

}