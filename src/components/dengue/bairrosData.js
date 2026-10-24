// Bairros do Recife por RPA - dados oficiais (Prefeitura do Recife)
// Risco atribuído conforme a RPA de cada bairro

const riskConfig = {
  Baixo: { color: "bg-green-400", text: "text-green-600" },
  Moderado: { color: "bg-yellow-400", text: "text-yellow-600" },
  Elevado: { color: "bg-orange-500", text: "text-orange-600" },
  Alto: { color: "bg-red-500", text: "text-red-600" },
};

const rpaRisk = {
  1: "Moderado",
  2: "Elevado",
  3: "Alto",
  4: "Baixo",
  5: "Moderado",
  6: "Elevado",
};

const bairrosPorRpa = {
  1: ["Bairro do Recife", "Boa Vista", "caxangá", "Coelhos", "Ilha do Leite", "Ilha Joana Bezerra", "Paissandu", "Santo Amaro", "Santo Antônio", "São José", "Soledade"],
  2: ["Água Fria", "Alto Santa Terezinha", "Arruda", "Beberibe", "Bomba do Hemetério", "Cajueiro", "Campina do Barreto", "Campo Grande", "Dois Unidos", "Encruzilhada", "Fundão", "Hipódromo", "Linha do Tiro", "Peixinhos", "Ponto de Parada", "Porto da Madeira", "Rosarinho", "Torreão"],
  3: ["Aflitos", "Alto do Mandu", "Alto José Bonifácio", "Alto José do Pinho", "Apipucos", "Brejo da Guabiraba", "Brejo de Beberibe", "Casa Amarela", "Casa Forte", "Córrego do Jenipapo", "Derby", "Dois Irmãos", "Espinheiro", "Graças", "Guabiraba", "Jaqueira", "Macaxeira", "Mangabeira", "Monteiro", "Morro da Conceição", "Nova Descoberta", "Parnamirim", "Passarinho", "Pau-Ferro", "Poço da Panela", "Santana", "Sítio dos Pintos", "Tamarineira", "Vasco da Gama"],
  4: ["caxangá", "Cidade Universitária", "Cordeiro", "Engenho do Meio", "Ilha do Retiro", "Iputinga", "Madalena", "Prado", "Torre", "Torrões", "Várzea", "Zumbi"],
  5: ["Afogados", "Areias", "Barro", "Bongi", "Caçote", "Coqueiral", "Curado", "Estância", "Jardim São Paulo", "Jiquiá", "Mangueira", "Mustardinha", "San Martin", "Sancho", "Tejipió", "Totó"],
  6: ["Boa Viagem", "Brasília Teimosa", "Cohab", "Ibura", "Imbiribeira", "Ipsep", "Jordão", "Pina"],
};

const rpaNames = {
  1: "RPA 1 - Centro",
  2: "RPA 2 - Norte",
  3: "RPA 3 - Nordeste",
  4: "RPA 4 - Oeste",
  5: "RPA 5 - Sudeste",
  6: "RPA 6 - Sul",
};

// Gera a lista completa de bairros com risco e casos (estimados)
const bairros = Object.entries(bairrosPorRpa).flatMap(([rpa, nomes]) => {
  const risk = rpaRisk[rpa];
  return nomes.map((name, i) => ({
    name,
    rpa: Number(rpa),
    rpaName: rpaNames[rpa],
    risk,
    color: riskConfig[risk].color,
    riskText: riskConfig[risk].text,
    casos: Math.round((risk === "Alto" ? 60 : risk === "Elevado" ? 45 : risk === "Moderado" ? 25 : 10) * (0.7 + (i % 5) * 0.12)),
  }));
});

export { bairros, rpaNames, rpaRisk, riskConfig };