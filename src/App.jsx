import { profile, ui } from './data/content'
import { useReveal } from './lib/hooks'
import StatusBar from './components/StatusBar'
import Hero from './components/Hero'
import Metrics from './components/Metrics'
import PipelineSection from './components/PipelineSection'
import StackSection from './components/StackSection'
import ProjectsSection from './components/ProjectsSection'
import ExperienceSection from './components/ExperienceSection'
import ContactSection from './components/ContactSection'

export default function App() {
  useReveal()

  return (
    <>
      <a className="skip" href="#pipeline">
        Lewati ke konten
      </a>
      <StatusBar />
      <main>
        <Hero />
        <Metrics />
        <PipelineSection />
        <StackSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <footer className="foot">
        <div className="wrap">
          <span>
            © {new Date().getFullYear()} {profile.nama}
          </span>
          <span>{ui.footer}</span>
        </div>
      </footer>
    </>
  )
}
