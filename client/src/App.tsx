import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Gamme from "@/pages/Gamme";
import Simulateur from "@/pages/Simulateur";
import Contact from "@/pages/Contact";
import Demarche from "@/pages/Demarche";
import LitteratureJuridique from "@/pages/LitteratureJuridique";
import Cookies from "@/pages/Cookies";
import CGV from "@/pages/CGV";
import Admin from "@/pages/Admin";
import NotFound from "@/pages/not-found";

function Router() {
  return (
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
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="dark">
          <Toaster />
          <Router />
          <WhatsAppWidget />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
