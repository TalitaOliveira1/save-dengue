import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, ArrowUpRight, AlertCircle, Info, MessageCircle, Link as LinkIcon, MapPin, Database } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const alerts = [
  { icon: ArrowUpRight, color: "text-orange-500", title: "Risco elevado em RPA 3", time: "há 2h" },
  { icon: AlertCircle, color: "text-red-500", title: "Surto confirmado no Ibura", time: "há 5h" },
  { icon: Info, color: "text-yellow-500", title: "Mutirão de limpeza no fim de semana", time: "há 1d" },
];

const regioes = [
  { id: 1, name: "RPA 1 - Centro", risk: "Moderado", level: "Moderado", color: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-200", desc: "Sua região apresenta risco moderado de transmissão de dengue." },
  { id: 2, name: "RPA 2 - Norte", risk: "Elevado", level: "Elevado", color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-200", desc: "Sua região apresenta aumento do risco de transmissão de dengue." },
  { id: 3, name: "RPA 3 - Nordeste", risk: "Alto", level: "Alto", color: "text-red-600", bg: "bg-red-50", border: "border-red-200", desc: "Sua região apresenta alto risco de transmissão de dengue. Tome precauções." },
  { id: 4, name: "RPA 4 - Oeste", risk: "Baixo", level: "Baixo", color: "text-green-600", bg: "bg-green-50", border: "border-green-200", desc: "Sua região apresenta baixo risco de transmissão de dengue." },
  { id: 5, name: "RPA 5 - Sudeste", risk: "Moderado", level: "Moderado", color: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-200", desc: "Sua região apresenta risco moderado de transmissão de dengue." },
  { id: 6, name: "RPA 6 - Sul", risk: "Elevado", level: "Elevado", color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-200", desc: "Sua região apresenta aumento do risco de transmissão de dengue." },
];

const shareText = "Alerta Dengue Recife! Fique atento aos sintomas: febre alta, dor no corpo e nas articulações, dor de cabeça, dor atrás dos olhos e manchas vermelhas na pele. Em caso de suspeita, procure uma unidade de saúde. Confira o painel de alerta da Prefeitura do Recife e proteja sua região!";
const shareUrl = typeof window !== "undefined" ? window.location.href : "https://recife.pe.gov.br";

export default function RightSidebar({ onNavigate }) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [regiaoId, setRegiaoId] = useState(3);
  const [editing, setEditing] = useState(false);
  const regiao = regioes.find((r) => r.id === regiaoId);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast({ title: "Link copiado!", description: "O link foi copiado para a área de transferência." });
    } catch {
      toast({ title: "Não foi possível copiar", variant: "destructive" });
    }
  };

  const shareWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`, "_blank");
  };

  return (
    <aside className="w-72 shrink-0 bg-white border-l border-slate-200 overflow-y-auto">
      <div className="sticky top-0 z-10 bg-white border-b border-slate-100 px-5 py-3">
        <button
          onClick={() => navigate("/sms-recife")}
          className="w-full flex items-center justify-center gap-2 bg-[#0b1e42] hover:bg-[#0056b3] text-white text-xs font-medium py-2 rounded-lg transition-colors"
        >
          <Database className="w-3.5 h-3.5" />
          SMS-Recife
        </button>
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-sm font-semibold text-slate-800">Situação da sua região</h3>
        </div>
        {editing ? (
          <div className="mt-2 space-y-1">
            {regioes.map((r) => (
              <button
                key={r.id}
                onClick={() => { setRegiaoId(r.id); setEditing(false); }}
                className="w-full text-left px-2 py-1.5 rounded-md text-xs text-slate-600 hover:bg-slate-100"
              >
                {r.name}
              </button>
            ))}
            <button onClick={() => setEditing(false)} className="text-[11px] text-slate-400 hover:underline mt-1">Cancelar</button>
          </div>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="flex items-center gap-1 text-xs text-[#0056b3] hover:underline"
          >
            <MapPin className="w-3 h-3" />
            {regiao.name} — Alterar localização
          </button>
        )}
      </div>

      <div className="px-5">
        <div className={`rounded-xl ${regiao.bg} border ${regiao.border} p-4`}>
          <AlertTriangle className={`w-7 h-7 mb-2 ${regiao.color}`} />
          <p className={`text-sm font-bold ${regiao.color}`}>Risco {regiao.level.toUpperCase()}</p>
          <p className="text-xs text-slate-600 mt-1">{regiao.desc}</p>
          <button
            onClick={() => onNavigate("alertas")}
            className="text-xs text-[#0056b3] font-medium hover:underline mt-2"
          >
            Saiba mais
          </button>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-slate-800">Alertas Recentes</h3>
          <button
            onClick={() => onNavigate("alertas")}
            className="text-xs text-[#0056b3] hover:underline"
          >
            Ver todos
          </button>
        </div>
        <div className="space-y-3">
          {alerts.map((a, i) => (
            <div key={i} className="flex items-start gap-3">
              <a.icon className={`w-4 h-4 mt-0.5 ${a.color}`} />
              <div>
                <p className="text-xs font-medium text-slate-800">{a.title}</p>
                <p className="text-[11px] text-slate-400">{a.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-5 border-t border-slate-100">
        <h3 className="text-sm font-semibold text-slate-800 mb-1">Compartilhe este alerta</h3>
        <p className="text-xs text-slate-500 mb-3">Ajude a proteger mais pessoas compartilhando esta informação.</p>
        <button
          onClick={shareWhatsApp}
          className="w-full flex items-center justify-center gap-2 bg-[#00a651] hover:bg-[#008f47] text-white text-sm font-medium py-2.5 rounded-lg transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          Compartilhar no WhatsApp
        </button>
        <button
          onClick={copyLink}
          className="w-full flex items-center justify-center gap-2 mt-2 border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm py-2.5 rounded-lg transition-colors"
        >
          <LinkIcon className="w-4 h-4" />
          Copiar link
        </button>
      </div>
    </aside>
  );
}