import React, { useState, useEffect } from "react";
import { MapPin, Phone, Clock, Search } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { extractBairro, classifyColor, colorClasses } from "@/components/dengue/caseClassifier";

export const unidades = [
  // UPAs (24h)
  { nome: "UPA Boa Viagem", tipo: "UPA", end: "Av. Boa Viagem, 1200 - Boa Viagem", tel: "(81) 3355-0000", horario: "24h" },
  { nome: "UPA Ibura", tipo: "UPA", end: "Rua do Ibura, 500 - Ibura", tel: "(81) 3355-1111", horario: "24h" },
  { nome: "UPA Cidade Tiradentes", tipo: "UPA", end: "Estrada do Arrude, 380 - Campina do Barreto", tel: "(81) 3184-4495", horario: "24h" },
  { nome: "UPA Macaxeira", tipo: "UPA", end: "Estrada da Macaxeira, 300 - Macaxeira", tel: "(81) 3355-5404", horario: "24h" },
  { nome: "UPA Arruda", tipo: "UPA", end: "Rua do Arruda, 100 - Arruda", tel: "(81) 3355-4317", horario: "24h" },
  { nome: "UPA Vasco da Gama", tipo: "UPA", end: "Estrada de Vasco da Gama, 200 - Vasco da Gama", tel: "(81) 3442-2710", horario: "24h" },
  { nome: "UPA San Martin", tipo: "UPA", end: "Estrada de San Martin, 150 - San Martin", tel: "(81) 3355-9562", horario: "24h" },
  { nome: "UPA Dois Irmãos", tipo: "UPA", end: "Estrada de Dois Irmãos, 250 - Dois Irmãos", tel: "(81) 3355-5400", horario: "24h" },
  { nome: "UPA Campo Grande", tipo: "UPA", end: "Rua do Campo Grande, 400 - Campo Grande", tel: "(81) 3355-4318", horario: "24h" },
  { nome: "UPA Cordeiro", tipo: "UPA", end: "Rua do Cordeiro, 180 - Cordeiro", tel: "(81) 3355-7550", horario: "24h" },
  // Policlínicas
  { nome: "Policlínica Albert Sabin", tipo: "Policlínica", end: "Av. Rui Barbosa, 1100 - Tamarineira", tel: "(81) 3355-5401", horario: "07h - 17h" },
  { nome: "PAM Centro / Policlínica Centro", tipo: "Policlínica", end: "Rua Mário Domingues, 70 - Boa Vista", tel: "(81) 3355-1543", horario: "07h - 17h" },
  { nome: "Policlínica Professor Barros Lima", tipo: "Policlínica", end: "Rua Xavantes, 205 - Casa Amarela", tel: "(81) 3355-5400", horario: "07h - 17h" },
  { nome: "Policlínica do Sancho", tipo: "Policlínica", end: "Rua Emília Torreão, 135 - Afogados", tel: "(81) 3355-9563", horario: "07h - 17h" },
  { nome: "Policlínica de Casa Amarela", tipo: "Policlínica", end: "Rua Xavantes, 205 - Casa Amarela", tel: "(81) 3355-5404", horario: "07h - 17h" },
  { nome: "Policlínica de Afogados", tipo: "Policlínica", end: "Rua Emília Torreão, 135 - Afogados", tel: "(81) 3355-9568", horario: "07h - 17h" },
  { nome: "Policlínica do Cordeiro", tipo: "Policlínica", end: "Rua do Cordeiro, 180 - Cordeiro", tel: "(81) 3355-7552", horario: "07h - 17h" },
  // USFs e Hospital
  { nome: "USF Casa Amarela", tipo: "USF", end: "Rua do Sossego, 33 - Casa Amarela", tel: "(81) 3355-2222", horario: "07h - 19h" },
  { nome: "USF Várzea", tipo: "USF", end: "Rua da Várzea, 88 - Várzea", tel: "(81) 3355-3333", horario: "07h - 19h" },
  { nome: "Hospital Oswaldo Cruz", tipo: "Hospital", end: "Av. Cruz Cabugá, 29 - Santo Amaro", tel: "(81) 3355-4444", horario: "24h" },
];

const tipoCores = {
  UPA: "bg-red-50 text-red-600",
  Policlínica: "bg-blue-50 text-blue-600",
  USF: "bg-green-50 text-green-600",
  Hospital: "bg-purple-50 text-purple-600",
};

const filtros = ["Todas", "UPA", "Policlínica", "USF", "Hospital"];

export default function UnidadesSaudeView() {
  const [filtro, setFiltro] = useState("Todas");
  const [busca, setBusca] = useState("");
  const [countsByBairro, setCountsByBairro] = useState({});
  const [loadingCounts, setLoadingCounts] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await base44.functions.invoke("smsRecifeData", {});
        const map = {};
        (res.data.countsByBairro || []).forEach((b) => { map[b.nm_bairro] = b.count; });
        setCountsByBairro(map);
      } catch (e) {
        console.error("Erro ao carregar casos:", e);
      } finally {
        setLoadingCounts(false);
      }
    })();
  }, []);

  const unitCounts = unidades.map((u) => {
    const bairro = extractBairro(u);
    return { ...u, _count: countsByBairro[bairro] || 0 };
  });
  const maxCount = Math.max(...unitCounts.map((u) => u._count), 0);

  const filtradas = unitCounts.filter((u) => {
    const matchTipo = filtro === "Todas" || u.tipo === filtro;
    const matchBusca = u.nome.toLowerCase().includes(busca.toLowerCase()) || u.end.toLowerCase().includes(busca.toLowerCase());
    return matchTipo && matchBusca;
  });

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#212529]">Unidades de Saúde</h1>
        <p className="text-sm text-slate-500 mt-1">Locais de atendimento para suspeitas de dengue no Recife</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {filtros.map((f) => (
            <button
              key={f}
              onClick={() => setFiltro(f)}
              className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${
                filtro === f ? "bg-[#0b1e42] text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar unidade..."
            className="w-full sm:w-56 pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0056b3]/20"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {filtradas.map((u, i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-200 p-5">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-sm font-semibold text-slate-800">{u.nome}</h3>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium shrink-0 ${tipoCores[u.tipo]}`}>{u.tipo}</span>
            </div>
            <div className="mt-3 space-y-2 text-xs text-slate-500">
              <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-[#0056b3] shrink-0" />{u.end}</p>
              <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-[#0056b3] shrink-0" />{u.tel}</p>
              <p className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#0056b3] shrink-0" />{u.horario}</p>
            </div>
            {(() => {
              const colorKey = classifyColor(u._count, maxCount);
              const c = colorClasses[colorKey];
              return (
                <div className="mt-3 flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${c.dot}`} />
                  <span className={`text-[10px] font-medium ${c.text}`}>
                    {loadingCounts ? "—" : `${u._count} ${u._count === 1 ? "caso" : "casos"}`}
                  </span>
                </div>
              );
            })()}
          </div>
        ))}
        {filtradas.length === 0 && (
          <p className="text-sm text-slate-400 col-span-2 text-center py-8">Nenhuma unidade encontrada.</p>
        )}
      </div>
    </div>
  );
}