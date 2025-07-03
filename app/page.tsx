import PortfolioFloatingDock from "../components/PortfolioFloatingDock";
import HomeSection from "../components/HomeSection";
import ProjectsSection from "../components/ProjectsSection";
import SkillsSection from "../components/SkillsSection";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-white dark:bg-neutral-950">
      {/* Floating Dock */}
      <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center pointer-events-none">
        <div className="pointer-events-auto">
          <PortfolioFloatingDock />
        </div>
      </div>

      {/* Sections */}
      <HomeSection />
      <ProjectsSection />
      <SkillsSection />
    </main>
  );
}
