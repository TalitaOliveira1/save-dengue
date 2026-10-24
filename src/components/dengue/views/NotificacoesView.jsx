import React, { useState, useEffect } from "react";

const baseRows = [
{ bairro: "Boa Viagem", rpa: "RPA 6", casos: 214, status: "Elevado", color: "bg-orange-500" },
{ bairro: "Ibura", rpa: "RPA 3", casos: 198, status: "Alto", color: "bg-red-500" },
{ bairro: "Casa Amarela", rpa: "RPA 2", casos: 156, status: "Elevado", color: "bg-orange-500" },
{ bairro: "Santo Amaro", rpa: "RPA 1", casos: 98, status: "Moderado", color: "bg-yellow-400" },
{ bairro: "Várzea", rpa: "RPA 4", casos: 41, status: "Baixo", color: "bg-green-400" },
{ bairro: "Jaboatão", rpa: "RPA 5", casos: 77, status: "Moderado", color: "bg-yellow-400" }];


export default function NotificacoesView() {
  const [tick, setTick] = useState(0);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((t) => t + 1);
      setLastUpdate(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const rows = baseRows.map((r) => ({
    ...r,
    casos: r.casos + Math.floor(Math.random() * 5) * (tick % 2 === 0 ? 1 : -1),
  }));

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#212529]">Notificações</h1>
        <p className="text-sm text-slate-500 mt-1">Casos notificados por bairro - Semana epidemiológica 20</p>
      </div>

      <p className="text-[11px] text-slate-400">
        Última atualização: {lastUpdate.toLocaleTimeString("pt-BR")} · atualização automática a cada 60s
      </p>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-500 text-xs">
            <tr>
              <th className="text-left px-4 py-3 font-medium">Bairro</th>
              <th className="text-left px-4 py-3 font-medium">RPA</th>
              <th className="text-left px-4 py-3 font-medium">Casos</th>
              <th className="text-left px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) =>
            <tr key={i} className="border-t border-slate-100 hover:bg-slate-50">
                <td className="px-4 py-3 text-slate-700">{r.bairro}</td>
                <td className="px-4 py-3 text-slate-500">{r.rpa}</td>
                <td className="px-4 py-3 font-medium text-slate-800">{r.casos}</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-2 text-xs">
                    <span className={`w-2 h-2 rounded-full ${r.color}`} />
                    {r.status}
                  </span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

}