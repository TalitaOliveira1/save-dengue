import React, { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { bairros } from "@/components/dengue/bairrosData";

const rpas = [
  { id: 1, name: "RPA 1 - Centro", risk: "Moderado", color: "bg-yellow-400", casos: 412 },
  { id: 2, name: "RPA 2 - Norte", risk: "Elevado", color: "bg-orange-500", casos: 689 },
  { id: 3, name: "RPA 3 - Nordeste", risk: "Alto", color: "bg-red-500", casos: 921 },
  { id: 4, name: "RPA 4 - Oeste", risk: "Baixo", color: "bg-green-400", casos: 187 },
  { id: 5, name: "RPA 5 - Sudeste", risk: "Moderado", color: "bg-yellow-400", casos: 354 },
  { id: 6, name: "RPA 6 - Sul", risk: "Elevado", color: "bg-orange-500", casos: 685 },
];

const trendByRisk = {
  Alto: { text: "Em alta", color: "text-red-500" },
  Elevado: { text: "Em alta", color: "text-orange-500" },
  Moderado: { text: "Estável", color: "text-yellow-500" },
  Baixo: { text: "Em queda", color: "text-green-500" },
};

export default function MapaRiscoView() {
  const [view, setView] = useState("regioes");
  const [selected, setSelected] = useState(null);
  const [busca, setBusca] = useState("");
  const [tick, setTick] = useState(0);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const detailsRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((t) => t + 1);
      setLastUpdate(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleSelect = (item) => {
    setSelected(item);
    setTimeout(() => {
      detailsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const dynamicRpas = rpas.map((r) => ({
    ...r,
    casos: r.casos + Math.floor(Math.random() * 10) * (tick % 2 === 0 ? 1 : -1),
  }));

  const dynamicBairros = bairros.map((b) => ({
    ...b,
    casos: b.casos + Math.floor(Math.random() * 5) * (tick % 2 === 0 ? 1 : -1),
  }));

  const bairrosFiltrados = dynamicBairros.filter((b) =>
    b.name.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#212529]">Mapa de Risco</h1>
        <p className="text-sm text-slate-500 mt-1">Distribuição espacial dos casos de dengue no Recife</p>
        <p className="text-[11px] text-slate-400 mt-1">Última atualização: {lastUpdate.toLocaleTimeString("pt-BR")} · atualização automática a cada 60s</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-slate-700">Visualização</h2>
          <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
            <button
              onClick={() => setView("bairros")}
              className={`px-3 py-1 text-xs rounded-md transition-colors ${
                view === "bairros" ? "bg-[#0b1e42] text-white" : "text-slate-500"
              }`}
            >
              Bairros
            </button>
            <button
              onClick={() => setView("regioes")}
              className={`px-3 py-1 text-xs rounded-md transition-colors ${
                view === "regioes" ? "bg-[#0b1e42] text-white" : "text-slate-500"
              }`}
            >
              Regiões
            </button>
          </div>
        </div>

        {view === "bairros" && (
          <div className="relative mb-4">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar bairro..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0056b3]/20"
            />
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          <div className="grid grid-cols-2 gap-3">
            {view === "regioes"
              ? dynamicRpas.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => handleSelect(r)}
                    className={`text-left p-4 rounded-xl border transition-all ${
                      selected?.id === r.id ? "border-[#0056b3] ring-2 ring-[#0056b3]/20" : "border-slate-100 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`w-3 h-3 rounded-full ${r.color}`} />
                      <span className="text-xs font-medium text-slate-700">{r.name}</span>
                    </div>
                    <p className="text-2xl font-bold text-[#212529]">{r.casos}</p>
                    <p className="text-[11px] text-slate-400">casos - Risco {r.risk}</p>
                  </button>
                ))
              : bairrosFiltrados.map((b, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelect(b)}
                    className={`text-left p-3 rounded-xl border transition-all ${
                      selected?.name === b.name ? "border-[#0056b3] ring-2 ring-[#0056b3]/20" : "border-slate-100 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`w-3 h-3 rounded-full ${b.color}`} />
                      <span className="text-xs font-medium text-slate-700 truncate">{b.name}</span>
                    </div>
                    <p className="text-lg font-bold text-[#212529]">{b.casos}</p>
                    <p className="text-[11px] text-slate-400">casos - Risco {b.risk}</p>
                  </button>
                ))}
            {view === "bairros" && bairrosFiltrados.length === 0 && (
              <p className="text-xs text-slate-400 col-span-2 text-center py-6">Nenhum bairro encontrado.</p>
            )}
          </div>

          <div ref={detailsRef} className="rounded-xl bg-slate-50 border border-slate-100 p-5">
            {selected ? (
              <div>
                <h3 className="text-sm font-semibold text-slate-700">{selected.name}</h3>
                <div className="mt-3 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Casos prováveis</span>
                    <span className="font-medium">{selected.casos}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Nível de risco</span>
                    <span className="font-medium">{selected.risk}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Tendência</span>
                    <span className={`font-medium ${trendByRisk[selected.risk].color}`}>{trendByRisk[selected.risk].text}</span>
                  </div>
                  {selected.rpaName && (
                    <div className="flex justify-between">
                      <span className="text-slate-500">Região</span>
                      <span className="font-medium">{selected.rpaName}</span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-sm text-slate-400">
                {view === "bairros" ? "Selecione um bairro para ver detalhes." : "Selecione uma região para ver detalhes."}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}