import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ProjectsPage from './pages/ProjectsPage'
import CaseStudyPage from './pages/CaseStudyPage'

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />} path="/">
          <Route element={<HomePage />} index />
          <Route element={<AboutPage />} path="about" />
          <Route element={<ProjectsPage />} path="projects" />
          <Route element={<CaseStudyPage />} path="case-study/visa" />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
