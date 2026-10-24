import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';

const CSV_URL = "https://media.base44.com/files/public/6ab812b660ae4e77b2dfbf8e/f4a433638_dadossms-recife.csv";

// Parser CSV robusto: separador ";", campos com aspas, quebras de linha dentro de aspas
function parseCSV(text, delimiter = ";") {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === delimiter) {
        row.push(field);
        field = "";
      } else if (ch === '\n' || ch === '\r') {
        if (ch === '\r' && text[i + 1] === '\n') i++;
        row.push(field);
        field = "";
        if (row.some(c => c !== "")) rows.push(row);
        row = [];
      } else {
        field += ch;
      }
    }
  }
  if (field !== "" || row.length > 0) {
    row.push(field);
    if (row.some(c => c !== "")) rows.push(row);
  }
  return rows;
}

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const res = await fetch(CSV_URL);
    if (!res.ok) throw new Error('Falha ao buscar CSV: ' + res.status);
    let text = await res.text();
    // Remove BOM
    if (text.charCodeAt(0) === 0xFEFF) text = text.slice(1);

    const rows = parseCSV(text);
    if (rows.length < 2) {
      return Response.json({ records: [], countsByCNES: [], countsByBairro: [], total: 0 });
    }

    const headers = rows[0].map(h => h.trim());
    const wanted = ["NU_NOTIFIC", "DT_NOTIFIC", "ID_UNIDADE", "NM_BAIRRO", "CS_SEXO", "NU_IDADE_N", "CLASSI_FIN", "EVOLUCAO", "HOSPITALIZ"];
    const colIdx = {};
    wanted.forEach(w => { colIdx[w] = headers.indexOf(w); });

    const records = [];
    const cnesCounts = {};
    const bairroCounts = {};

    for (let i = 1; i < rows.length; i++) {
      const cols = rows[i];
      const rec = {};
      wanted.forEach(w => {
        const idx = colIdx[w];
        rec[w] = idx >= 0 ? (cols[idx] || "") : "";
      });
      records.push(rec);

      const cnes = (rec.ID_UNIDADE || "").trim();
      if (cnes) cnesCounts[cnes] = (cnesCounts[cnes] || 0) + 1;

      const bairro = (rec.NM_BAIRRO || "").trim().toUpperCase();
      if (bairro) bairroCounts[bairro] = (bairroCounts[bairro] || 0) + 1;
    }

    const countsByCNES = Object.entries(cnesCounts)
      .map(([id_unidade, count]) => ({ id_unidade, count }))
      .sort((a, b) => b.count - a.count);

    const countsByBairro = Object.entries(bairroCounts)
      .map(([nm_bairro, count]) => ({ nm_bairro, count }))
      .sort((a, b) => b.count - a.count);

    return Response.json({
      records,
      countsByCNES,
      countsByBairro,
      total: records.length
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}