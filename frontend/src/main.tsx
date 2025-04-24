import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import AllRoutes from "./routers/AllRoutes";


import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <AllRoutes />
      </HelmetProvider>
    </BrowserRouter>
  </StrictMode>,
)
