import React, { useState, useEffect } from "react";
import { ArrowUpRight, AlertCircle, Info } from "lucide-react";

const baseAlerts = [
  { icon: ArrowUpRight, color: "text-orange-500", bg: "bg-orange-50", title: "Risco elevado em RPA 3", desc: "Aumento de 32% nos casos prováveis na última semana.", minutesAgo: 120 },
  { icon: AlertCircle, color: "text-red-500", bg: "bg-red-50", title: "Surto confirmado no Ibura", desc: "Equipes de saúde realizam bloqueio de transmissão na área.", minutesAgo: 300 },
  { icon: Info, color: "text-yellow-500", bg: "bg-yellow-50", title: "Mutirão de limpeza no fim de semana", desc: "Ação conjunta entre Sesau e população neste sábado.", minutesAgo: 1440 },
  { icon: ArrowUpRight, color: "text-orange-500", bg: "bg-orange-50", title: "Aumento em RPA 6", desc: "Bairros do Sul registram crescimento de casos.", minutesAgo: 2880 },
];

function formatTimeAgo(minutes) {
  if (minutes < 60) return `há ${minutes}min`;
  if (minutes < 1440) return `há ${Math.floor(minutes / 60)}h`;
  return `há ${Math.floor(minutes / 1440)}d`;
}

export default function AlertasView() {
  const [elapsed, setElapsed] = useState(0);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed((e) => e + 1);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const alerts = baseAlerts.map((a) => ({
    ...a,
    time: formatTimeAgo(a.minutesAgo + elapsed),
  }));

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#212529]">Alertas</h1>
        <p className="text-sm text-slate-500 mt-1">Avisos e comunicados oficiais sobre a dengue no Recife</p>
      </div>

      <p className="text-[11px] text-slate-400">
        Última atualização: {lastUpdate.toLocaleTimeString("pt-BR")} · atualização automática a cada 60s
      </p>

      <div className="space-y-3">
        {alerts.map((a, i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-200 p-4 flex gap-4">
            <div className={`w-10 h-10 rounded-lg ${a.bg} flex items-center justify-center shrink-0`}>
              <a.icon className={`w-5 h-5 ${a.color}`} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-800">{a.title}</h3>
                <span className="text-[11px] text-slate-400">{a.time}</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">{a.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}