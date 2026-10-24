import React from "react";

export default function SobreProjetoView() {
  return (
    <div className="p-6 space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-[#212529]">Sobre o Projeto</h1>
        <p className="text-sm text-slate-500 mt-1">Painel de Alerta de Dengue da Prefeitura do Recife</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 text-sm text-slate-600 leading-relaxed">
        <p>
          O Painel de Alerta de Dengue é uma iniciativa da Prefeitura do Recife, em parceria com a Secretaria
          de Saúde (Sesau), a Secretaria Estadual de Saúde (SEVS) e o Cievs Recife, para monitorar e
          informar a população sobre a situação epidemiológica da dengue no município.
        </p>
        <p>
          Os dados são atualizados semanalmente com base nas notificações compulsórias registradas nas
          unidades de saúde e cruzados com indicadores de vigilância entomológica.
        </p>
        <p>
          O objetivo é permitir que cidadãos e gestores acompanhem em tempo real o nível de risco de cada
          região e tomem medidas de prevenção e cuidado.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="text-sm font-semibold text-slate-700 mb-3">Fontes de dados</h3>
        <ul className="space-y-2 text-sm text-slate-600">
          <li>• Sesau Recife - Secretaria Municipal de Saúde</li>
          <li>• SEVS - Secretaria Estadual de Saúde de Pernambuco</li>
          <li>• Cievs Recife - Centro de Informações Estratégicas em Vigilância em Saúde</li>
          <li>• INMET - Instituto Nacional de Meteorologia</li>
          <li>• SMS Recife - Secretaria Municipal de Saúde do Recife</li>
          <li>• LEVEDIQ - Laboratório de Vigilância de Dengue e Quimioprofilaxia</li>
          <li>• IDH - Índice de Desenvolvimento Humano</li>
        </ul>
      </div>
    </div>
  );
}