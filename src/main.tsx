import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import './global.css'
import App from './App.tsx'
import ProblemPage from './pages/ProblemPage.tsx'
import SubmitPage from './pages/SubmitPage.tsx'
import GradingStatusPage from './pages/GradingStatusPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/problems/:id" element={<ProblemPage />} />
        <Route path="/problems/:id/submit" element={<SubmitPage />} />
        <Route path="/status" element={<GradingStatusPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
