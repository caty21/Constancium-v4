import { Switch, Route } from "wouter";
import { lazy, Suspense } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import WhatsAppWidget from "@/components/WhatsAppWidget";

const Home = lazy(() => import("@/pages/Home"));
const About = lazy(() => import("@/pages/About"));
const Gamme = lazy(() => import("@/pages/Gamme"));
const Simulateur = lazy(() => import("@/pages/Simulateur"));
const Contact = lazy(() => import("@/pages/Contact"));
const Demarche = lazy(() => import("@/pages/Demarche"));
const LitteratureJuridique = lazy(() => import("@/pages/LitteratureJuridique"));
const Cookies = lazy(() => import("@/pages/Cookies"));
const CGV = lazy(() => import("@/pages/CGV"));
const Admin = lazy(() => import("@/pages/Admin"));
const NotFound = lazy(() => import("@/pages/not-found"));

// Précharge les pages principales en arrière-plan après 3s
setTimeout(() => {
  import("@/pages/About");
  import("@/pages/Gamme");
  import("@/pages/Contact");
}, 3000);

function Router() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/gamme" component={Gamme} />
        <Route path="/simulateur" component={Simulateur} />
        <Route path="/contact" component={Contact} />
        <Route path="/demarche" component={Demarche} />
        <Route path="/litterature-juridique" component={LitteratureJuridique} />
        <Route path="/cookies" component={Cookies} />
        <Route path="/cgv" component={CGV} />
        <Route path="/admin" component={Admin} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div>
          <Toaster />
          <Router />
          <WhatsAppWidget />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
