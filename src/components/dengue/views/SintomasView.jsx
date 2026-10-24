import React from "react";
import { Droplets, Box, Wine, Trash2, Leaf, Sun, ThermometerSun, Activity } from "lucide-react";

const sintomas = [
  "Febre alta (até 39°C)",
  "Dor de cabeça intensa",
  "Dores no corpo e nas articulações",
  "Manchas vermelhas na pele",
  "Náusea e vômito",
  "Dor atrás dos olhos",
];

const prevencao = [
  { icon: Droplets, label: "Evite água parada em vasos e pratos" },
  { icon: Box, label: "Mantenha caixas d'água bem tampadas" },
  { icon: Wine, label: "Descarte garrafas com a boca virada" },
  { icon: Trash2, label: "Limpe o lixo e mantenha o quintal organizado" },
  { icon: Leaf, label: "Verifique pratos de plantas semanalmente" },
  { icon: Sun, label: "Use roupas claras e repelente" },
];

export default function SintomasView() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#212529]">Sintomas e Prevenção</h1>
        <p className="text-sm text-slate-500 mt-1">Como identificar a dengue e se proteger</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-red-500" />
            <h2 className="text-sm font-semibold text-slate-700">Principais sintomas</h2>
          </div>
          <ul className="space-y-2">
            {sintomas.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2" />
                {s}
              </li>
            ))}
          </ul>
          <div className="mt-4 p-3 rounded-lg bg-red-50 text-xs text-red-700">
            <ThermometerSun className="w-4 h-4 inline mr-1" />
            Procure uma unidade de saúde ao apresentar dois ou mais sintomas.
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <h2 className="text-sm font-semibold text-slate-700 mb-4">Como se prevenir</h2>
          <div className="grid grid-cols-2 gap-4">
            {prevencao.map((p, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-2 p-3 rounded-lg bg-slate-50">
                <p.icon className="w-6 h-6 text-[#0056b3]" />
                <span className="text-[11px] text-slate-600">{p.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}