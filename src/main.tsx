import { StrictMode } from "react"

import { createRoot } from "react-dom/client"

import { RouterProvider } from "react-router-dom"

import { TooltipProvider } from "@/components/ui/tooltip"

import { ThemeProvider } from "@/components/theme-provider"

import { router } from "@/routes"

import "./index.css"
import { PersistGate } from "redux-persist/integration/react"
import { store, persistor } from "@/app/store"
import { Provider } from "react-redux"
import { Toaster } from "sonner"
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <TooltipProvider>
            <RouterProvider router={router} />
            <Toaster richColors />
          </TooltipProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
)
