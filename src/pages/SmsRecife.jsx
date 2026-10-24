import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, AlertTriangle, Loader2, Database } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { unidades } from "@/components/dengue/views/UnidadesSaudeView";
import { extractBairro, classifyColor, colorClasses } from "@/components/dengue/caseClassifier";

const colLabels = {
  NU_NOTIFIC: "Notificação",
  DT_NOTIFIC: "Data",
  ID_UNIDADE: "CNES",
  NM_BAIRRO: "Bairro",
  CS_SEXO: "Sexo",
  NU_IDADE_N: "Idade",
  CLASSI_FIN: "Classificação",
  EVOLUCAO: "Evolução",
  HOSPITALIZ: "Hospitalizado",
};

const colOrder = ["NU_NOTIFIC", "DT_NOTIFIC", "ID_UNIDADE", "NM_BAIRRO", "CS_SEXO", "NU_IDADE_N", "CLASSI_FIN", "EVOLUCAO", "HOSPITALIZ"];

export default function SmsRecife() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [busca, setBusca] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await base44.functions.invoke("smsRecifeData", {});
        setData(res.data);
      } catch (e) {
        setError(e.message || "Erro ao carregar dados");
      }
    })();
  }, []);

  const unitCounts = useMemo(() => {
    if (!data) return [];
    const bairroMap = {};
    (data.countsByBairro || []).forEach((b) => { bairroMap[b.nm_bairro] = b.count; });
    return unidades.map((u) => {
      const bairro = extractBairro(u);
      const count = bairroMap[bairro] || 0;
      return { ...u, bairro, count };
    });
  }, [data]);

  const maxCount = useMemo(() => Math.max(...unitCounts.map((u) => u.count), 0), [unitCounts]);

  const matchedBairros = useMemo(() => {
    const set = new Set(unitCounts.filter((u) => u.count > 0).map((u) => u.bairro));
    return set;
  }, [unitCounts]);

  const filteredRecords = useMemo(() => {
    if (!data) return [];
    const q = busca.toLowerCase().trim();
    if (!q) return data.records;
    return data.records.filter((r) =>
      colOrder.some((c) => (r[c] || "").toString().toLowerCase().includes(q))
    );
  }, [data, busca]);

  if (error) {
    return (
      <div className="min-h-screen bg-[#f4f6fa] flex items-center justify-center p-6">
        <div className="max-w-md text-center">
          <AlertTriangle className="w-10 h-10 text-red-500 mx-auto mb-3" />
          <p className="text-sm text-slate-700 mb-4">{error}</p>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-[#0b1e42] text-white text-sm rounded-lg hover:bg-[#0056b3] transition-colors"
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-[#f4f6fa] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-[#0056b3] animate-spin" />
          <p className="text-sm text-slate-500">Carregando dados do SINAN...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f6fa]">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Database className="w-5 h-5 text-[#0056b3]" />
            <div>
              <h1 className="text-lg font-bold text-[#212529]">SMS-Recife — Dados SINAN 2025</h1>
              <p className="text-xs text-slate-500">{data.total.toLocaleString("pt-BR")} notificações de dengue</p>
            </div>
          </div>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-4 py-2 bg-[#0b1e42] hover:bg-[#0056b3] text-white text-sm font-medium rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
        {/* Aviso sobre correspondência de códigos CNES */}
        <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-800">
            <p className="font-semibold mb-1">Códigos CNES (ID_UNIDADE) não puderam ser vinculados aos nomes das unidades do app.</p>
            <p>As unidades do aplicativo não possuem código CNES cadastrado. Os totais por unidade abaixo foram obtidos cruzando o bairro da unidade com a coluna NM_BAIRRO do arquivo. Os códigos CNES brutos são listados em seguida, sem nome associado.</p>
          </div>
        </div>

        {/* Total de casos por unidade (mesma contagem dos cards) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <h2 className="text-sm font-semibold text-slate-800 mb-1">Total de casos por unidade</h2>
          <p className="text-xs text-slate-500 mb-4">Contagem por bairro (NM_BAIRRO) — mesma usada no classificador da página Unidades de Saúde.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 text-left">
                  <th className="py-2 pr-4 font-medium">Unidade</th>
                  <th className="py-2 pr-4 font-medium">Tipo</th>
                  <th className="py-2 pr-4 font-medium">Bairro</th>
                  <th className="py-2 pr-4 font-medium">Casos</th>
                  <th className="py-2 font-medium">Nível</th>
                </tr>
              </thead>
              <tbody>
                {unitCounts.map((u, i) => {
                  const colorKey = classifyColor(u.count, maxCount);
                  const c = colorClasses[colorKey];
                  return (
                    <tr key={i} className="border-b border-slate-100">
                      <td className="py-2 pr-4 text-slate-700">{u.nome}</td>
                      <td className="py-2 pr-4 text-slate-500">{u.tipo}</td>
                      <td className="py-2 pr-4 text-slate-500">{u.bairro}</td>
                      <td className="py-2 pr-4">
                        <span className="inline-flex items-center gap-1.5">
                          <span className={`w-2 h-2 rounded-full ${c.dot}`} />
                          <span className={`font-medium ${c.text}`}>{u.count}</span>
                        </span>
                      </td>
                      <td className="py-2">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${c.bg} ${c.text}`}>{c.label}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Casos por código CNES (ID_UNIDADE) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <h2 className="text-sm font-semibold text-slate-800 mb-1">Casos por código CNES (ID_UNIDADE)</h2>
          <p className="text-xs text-slate-500 mb-4">{(data.countsByCNES || []).length} códigos distintos — sem nome de unidade associado.</p>
          <div className="max-h-64 overflow-y-auto">
            <table className="w-full text-xs">
              <thead className="sticky top-0 bg-white">
                <tr className="border-b border-slate-200 text-slate-500 text-left">
                  <th className="py-2 pr-4 font-medium">Código CNES</th>
                  <th className="py-2 font-medium">Casos</th>
                </tr>
              </thead>
              <tbody>
                {(data.countsByCNES || []).map((c, i) => (
                  <tr key={i} className="border-b border-slate-100">
                    <td className="py-1.5 pr-4 text-slate-700 font-mono">{c.id_unidade}</td>
                    <td className="py-1.5 text-slate-600">{c.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tabela de notificações com busca */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <h2 className="text-sm font-semibold text-slate-800">Notificações</h2>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                placeholder="Buscar..."
                className="w-full sm:w-64 pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0056b3]/20"
              />
            </div>
          </div>
          <p className="text-xs text-slate-400 mb-3">{filteredRecords.length.toLocaleString("pt-BR")} de {data.total.toLocaleString("pt-BR")} registros</p>
          <div className="max-h-[480px] overflow-auto border border-slate-100 rounded-lg">
            <table className="w-full text-xs whitespace-nowrap">
              <thead className="sticky top-0 bg-slate-50">
                <tr className="text-slate-500 text-left">
                  {colOrder.map((c) => (
                    <th key={c} className="py-2 px-3 font-medium border-b border-slate-200">{colLabels[c]}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map((r, i) => (
                  <tr key={i} className="border-b border-slate-50 hover:bg-slate-50">
                    {colOrder.map((c) => (
                      <td key={c} className="py-1.5 px-3 text-slate-600">{r[c] || "—"}</td>
                    ))}
                  </tr>
                ))}
                {filteredRecords.length === 0 && (
                  <tr>
                    <td colSpan={colOrder.length} className="py-8 text-center text-slate-400">Nenhum registro encontrado.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}