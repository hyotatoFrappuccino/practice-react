import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import './global.css'
import App from './App.tsx'
import ProblemPage from './pages/ProblemPage.tsx'
import SubmitPage from './pages/SubmitPage.tsx'
import GradingStatusPage from './pages/GradingStatusPage.tsx'
import LecturePage from './pages/LecturePage.tsx'
import LectureDetailPage from './pages/LectureDetailPage.tsx'
import BoardPage from './pages/BoardPage.tsx'
import PostDetailPage from './pages/PostDetailPage.tsx'
import PostWritePage from './pages/PostWritePage.tsx'
import GroupPage from './pages/GroupPage.tsx'
import GroupDetailPage from './pages/GroupDetailPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/problems/:id" element={<ProblemPage />} />
        <Route path="/problems/:id/submit" element={<SubmitPage />} />
        <Route path="/status" element={<GradingStatusPage />} />
        <Route path="/lectures" element={<LecturePage />} />
        <Route path="/lectures/:id" element={<LectureDetailPage />} />
        <Route path="/board" element={<BoardPage />} />
        <Route path="/board/write" element={<PostWritePage />} />
        <Route path="/board/:id" element={<PostDetailPage />} />
        <Route path="/groups" element={<GroupPage />} />
        <Route path="/groups/:id" element={<GroupDetailPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
