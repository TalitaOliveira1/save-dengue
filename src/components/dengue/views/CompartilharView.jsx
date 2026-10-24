import React from "react";
import { MessageCircle, Link as LinkIcon, Facebook, Twitter } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const shareText = "Alerta Dengue Recife! Fique atento aos sintomas: febre alta, dor no corpo e nas articulações, dor de cabeça, dor atrás dos olhos e manchas vermelhas na pele. Em caso de suspeita, procure uma unidade de saúde. Confira o painel de alerta da Prefeitura do Recife e proteja sua região!";
const shareUrl = typeof window !== "undefined" ? window.location.href : "https://recife.pe.gov.br";

export default function CompartilharView() {
  const { toast } = useToast();

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

  const shareFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, "_blank");
  };

  const shareTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, "_blank");
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#212529]">Compartilhar</h1>
        <p className="text-sm text-slate-500 mt-1">Ajude a proteger mais pessoas compartilhando este alerta</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 max-w-xl">
        <p className="text-sm text-slate-600 mb-4">
          Compartilhe o painel de alerta de dengue da Prefeitura do Recife com sua comunidade.
        </p>
        <div className="space-y-3">
          <button
            onClick={shareWhatsApp}
            className="w-full flex items-center justify-center gap-2 bg-[#00a651] hover:bg-[#008f47] text-white text-sm font-medium py-3 rounded-lg transition-colors"
          >
            <MessageCircle className="w-4 h-4" /> Compartilhar no WhatsApp
          </button>
          <button
            onClick={copyLink}
            className="w-full flex items-center justify-center gap-2 border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm py-3 rounded-lg transition-colors"
          >
            <LinkIcon className="w-4 h-4" /> Copiar link
          </button>
          <div className="flex gap-3">
            <button
              onClick={shareFacebook}
              className="flex-1 flex items-center justify-center gap-2 border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm py-3 rounded-lg transition-colors"
            >
              <Facebook className="w-4 h-4" /> Facebook
            </button>
            <button
              onClick={shareTwitter}
              className="flex-1 flex items-center justify-center gap-2 border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm py-3 rounded-lg transition-colors"
            >
              <Twitter className="w-4 h-4" /> Twitter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}