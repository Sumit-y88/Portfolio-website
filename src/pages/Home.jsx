import { AboutSection } from "../components/sections/AboutSection";
import { HeroSection } from "../components/sections/HeroSection";
import { ProjectsSection } from "../components/sections/ProjectsSection";
import { SkillsSection } from "../components/sections/SkillsSection";

export const Home = () => (
  <>
    <div data-scroll-section>
      <HeroSection />
    </div>
    <div data-scroll-section>
      <AboutSection />
    </div>
    <div data-scroll-section>
      <SkillsSection />
    </div>
    <div data-scroll-section>
      <ProjectsSection />
    </div>
  </>
);

