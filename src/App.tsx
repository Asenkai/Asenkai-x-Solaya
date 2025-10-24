import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { CMSProvider, useCMS } from "@/contexts/CMSContext";
import { SessionProvider, useSession } from "@/contexts/SessionContext";
import React, { useEffect } from "react";
import AdminLogin from "@/pages/admin/Login";
import AdminLayout from "@/components/layout/AdminLayout";
import LeadsList from "@/pages/admin/LeadsList";
import AdminSettings from "@/pages/admin/Settings";

const queryClient = new QueryClient();

// Component to handle GTM script injection
const GTMInjector: React.FC = () => {
  const { globalCopy } = useCMS();

  useEffect(() => {
    if (globalCopy?.gtm_container_id) {
      const gtmId = globalCopy.gtm_container_id;

      // Head script
      const scriptHead = document.createElement('script');
      scriptHead.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${gtmId}');`;
      document.getElementById('gtm-head')?.appendChild(scriptHead);

      // Body noscript iframe
      const noscriptBody = document.createElement('noscript');
      noscriptBody.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}"
      height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
      document.getElementById('gtm-body')?.appendChild(noscriptBody);

      return () => {
        // Clean up scripts if component unmounts (though for App, it's unlikely)
        scriptHead.remove();
        noscriptBody.remove();
      };
    }
  }, [globalCopy?.gtm_container_id]);

  return null;
};


const AppContent = () => {
  const { loading: cmsLoading, error: cmsError } = useCMS();
  const { loading: sessionLoading } = useSession();

  if (cmsLoading || sessionLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-700">Loading application...</p>
      </div>
    );
  }

  if (cmsError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-500">Error: {cmsError}</p>
      </div>
    );
  }

  return (
    <>
      <GTMInjector />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<LeadsList />} />
            <Route path="leads" element={<LeadsList />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <CMSProvider>
        <SessionProvider>
          <AppContent />
        </SessionProvider>
      </CMSProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;