// Extrai o bairro do endereço da unidade (texto após o último " - ")
export function extractBairro(unit) {
  const parts = (unit.end || "").split(" - ");
  return parts[parts.length - 1].trim().toUpperCase();
}

// Classifica a cor com base na porcentagem relativa ao maior número de casos
// Verde: 0-10% | Amarelo: 11-40% | Laranja: 41-70% | Vermelho: >70%
export function classifyColor(count, maxCount) {
  if (maxCount === 0 || count === 0) return "green";
  const pct = (count / maxCount) * 100;
  if (pct <= 10) return "green";
  if (pct <= 40) return "yellow";
  if (pct <= 70) return "orange";
  return "red";
}

export const colorClasses = {
  green: { dot: "bg-green-500", bg: "bg-green-50", text: "text-green-700", label: "Baixo" },
  yellow: { dot: "bg-yellow-500", bg: "bg-yellow-50", text: "text-yellow-700", label: "Moderado" },
  orange: { dot: "bg-orange-500", bg: "bg-orange-50", text: "text-orange-700", label: "Alto" },
  red: { dot: "bg-red-500", bg: "bg-red-50", text: "text-red-700", label: "Surto" },
};