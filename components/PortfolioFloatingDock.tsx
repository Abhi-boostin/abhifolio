import { FloatingDock } from "./FloatingDock";
import { IconHome, IconCode, IconBulb, IconBrandGithub, IconBrandLinkedin, IconDownload, IconMail } from "@tabler/icons-react";

const navItems = [
  { title: "Home", icon: <IconHome />, href: "#home" },
  { title: "Projects", icon: <IconCode />, href: "#projects" },
  { title: "Skills", icon: <IconBulb />, href: "#skills" },
  { title: "GitHub", icon: <IconBrandGithub />, href: "https://github.com/yourusername" },
  { title: "LinkedIn", icon: <IconBrandLinkedin />, href: "https://linkedin.com/in/yourusername" },
  { title: "Resume", icon: <IconDownload />, href: "/resume.pdf" },
  { title: "Mail", icon: <IconMail />, href: "mailto:your@email.com" },
];

export default function PortfolioFloatingDock() {
  return <FloatingDock items={navItems} />;
} 