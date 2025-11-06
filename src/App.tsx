import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import Index from "./pages/Index";
import Project0 from "./pages/Project0";
import Project1 from "./pages/Project1";
import Project2 from "./pages/Project2";
import Project3 from "./pages/Project3";
import Project4 from "./pages/Project4";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  // Get the base name from the environment
  const basename = import.meta.env.PROD ? '/CS180-Submissions' : '';
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename={basename}>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/project-0" element={<Project0 />} />
            <Route path="/project-1" element={<Project1 />} />
            <Route path="/project-2" element={<Project2 />} />
            <Route path="/project-3" element={<Project3 />} />
            <Route path="/project-4" element={<Project4 />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
