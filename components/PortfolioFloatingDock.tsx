import { FloatingDock } from "./FloatingDock";
import { IconHome, IconCode, IconBulb, IconBrandGithub, IconBrandLinkedin, IconDownload, IconMail } from "@tabler/icons-react";
import Link from 'next/link';

const navItems = [
  { title: "Home", icon: <IconHome />, href: "/", isInternal: true },
  { title: "Projects", icon: <IconCode />, href: "/projects", isInternal: true },
  { title: "Skills", icon: <IconBulb />, href: "/skills", isInternal: true },
  { title: "GitHub", icon: <IconBrandGithub />, href: "https://github.com/yourusername" },
  { title: "LinkedIn", icon: <IconBrandLinkedin />, href: "https://linkedin.com/in/yourusername" },
  { title: "Resume", icon: <IconDownload />, href: "/resume.pdf" },
  { title: "Mail", icon: <IconMail />, href: "mailto:your@email.com" },
];

export default function PortfolioFloatingDock() {
  return <FloatingDock items={navItems} Link={Link} />;
} 