import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Project0 from "./pages/Project0";
import Project1 from "./pages/Project1";
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
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/homework-0" element={<Project0 />} />
            <Route path="/project-1" element={<Project1 />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
