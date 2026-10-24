import React, { useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, Loader2, ShieldCheck, Droplets, Bug, HeartPulse } from "lucide-react";
import GoogleIcon from "@/components/GoogleIcon";
import { safeReturnTo } from "@/lib/authReturnTo";

const PREFEITURA_LOGO =
  "https://upload.wikimedia.org/wikipedia/commons/0/02/Logo_prefeitura_do_recife.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const returnTo = safeReturnTo();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await base44.auth.loginViaEmailPassword(email, password);
      window.location.href = returnTo;
    } catch (err) {
      setError(err.message || "Email ou senha inválidos");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = () => {
    base44.auth.loginWithProvider("google", returnTo);
  };

  const registerLink =
    "/register" + (returnTo !== "/" ? "?returnTo=" + encodeURIComponent(returnTo) : "");

  return (
    <div className="min-h-screen w-full grid lg:grid-cols-2 bg-background">
      {/* Painel temático — prevenção de dengue */}
      <div className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-12 text-white">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-400/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 w-96 h-96 rounded-full bg-blue-300/10 blur-3xl" />

        <div className="relative">
          <img
            src={PREFEITURA_LOGO}
            alt="Prefeitura do Recife"
            className="h-10 w-auto brightness-0 invert opacity-95"
          />
        </div>

        <div className="relative space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
            <ShieldCheck className="w-4 h-4" />
            Plataforma de Prevenção
          </div>
          <h1 className="text-4xl font-bold leading-tight tracking-tight">
            SAVE-DENGUE
          </h1>
          <p className="text-lg text-blue-50/90 max-w-md">
            Juntos contra a dengue. Acompanhe casos, unidades de saúde e
            alertas em tempo real no Recife.
          </p>

          <ul className="space-y-4 max-w-md">
            <li className="flex items-start gap-3">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/15">
                <Droplets className="w-5 h-5" />
              </span>
              <span className="text-blue-50/90">
                Combate aos criadouros do <strong>Aedes aegypti</strong>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/15">
                <Bug className="w-5 h-5" />
              </span>
              <span className="text-blue-50/90">
                Monitoramento de casos por bairro e unidade
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/15">
                <HeartPulse className="w-5 h-5" />
              </span>
              <span className="text-blue-50/90">
                Alertas e orientações de saúde pública
              </span>
            </li>
          </ul>
        </div>

        <p className="relative text-sm text-blue-100/70">
          Em parceria com a Prefeitura do Recife
        </p>
      </div>

      {/* Painel do formulário */}
      <div className="flex flex-col items-center justify-center px-6 py-12 sm:px-12">
        <div className="w-full max-w-md">
          <div className="mb-8 flex flex-col items-center text-center">
            <img
              src={PREFEITURA_LOGO}
              alt="Prefeitura do Recife"
              className="h-11 w-auto mb-6 lg:hidden"
            />
            <div className="mb-3 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-600">
              <ShieldCheck className="w-7 h-7 text-white" aria-hidden="true" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Bem-vindo de volta
            </h1>
            <p className="text-muted-foreground mt-2">Acesse a sua conta</p>
          </div>

          <div className="bg-card rounded-2xl shadow-sm border border-border p-8">
            <Button
              variant="outline"
              className="w-full h-12 text-sm font-medium mb-6"
              onClick={handleGoogle}
            >
              <GoogleIcon className="w-5 h-5 mr-2" />
              Continuar com Google
            </Button>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-3 text-muted-foreground">ou</span>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    autoFocus
                    placeholder="voce@exemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Senha</Label>
                  <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                    Esqueceu a senha?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
                  <Input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full h-12 font-medium bg-blue-600 hover:bg-blue-700" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  "Entrar"
                )}
              </Button>
            </form>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Não tem uma conta?{" "}
            <Link to={registerLink} className="text-primary font-medium hover:underline">
              Criar uma
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}