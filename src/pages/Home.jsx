import React, { useState } from "react";
import Sidebar from "@/components/dengue/Sidebar";
import RightSidebar from "@/components/dengue/RightSidebar";
import InicioView from "@/components/dengue/views/InicioView";
import MapaRiscoView from "@/components/dengue/views/MapaRiscoView";
import AlertasView from "@/components/dengue/views/AlertasView";
import NotificacoesView from "@/components/dengue/views/NotificacoesView";
import SintomasView from "@/components/dengue/views/SintomasView";
import UnidadesSaudeView from "@/components/dengue/views/UnidadesSaudeView";
import CompartilharView from "@/components/dengue/views/CompartilharView";
import SobreProjetoView from "@/components/dengue/views/SobreProjetoView";

const views = {
  inicio: InicioView,
  mapa: MapaRiscoView,
  alertas: AlertasView,
  notificacoes: NotificacoesView,
  sintomas: SintomasView,
  unidades: UnidadesSaudeView,
  compartilhar: CompartilharView,
  sobre: SobreProjetoView,
};

export default function Home() {
  const [active, setActive] = useState("inicio");
  const ActiveView = views[active];

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#f4f6fa]">
      <Sidebar active={active} onChange={setActive} />
      <main className="flex-1 overflow-y-auto">
        <ActiveView onNavigate={setActive} />
      </main>
      <RightSidebar onNavigate={setActive} />
    </div>
  );
}