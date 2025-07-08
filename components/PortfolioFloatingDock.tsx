import { FloatingDock } from "./FloatingDock";
import { IconHome, IconCode, IconBulb, IconBrandGithub, IconBrandLinkedin, IconFileText, IconMail, IconDeviceGamepad2 } from "@tabler/icons-react";
import Link from 'next/link';

const navItems = [
  { title: "Home", icon: <IconHome />, href: "/", isInternal: true },
  { title: "Projects", icon: <IconCode />, href: "/projects", isInternal: true },
  { title: "Skills", icon: <IconBulb />, href: "/skills", isInternal: true },
  { title: "GitHub", icon: <IconBrandGithub />, href: "https://github.com/Abhi-boostin" },
  { title: "LinkedIn", icon: <IconBrandLinkedin />, href: "https://www.linkedin.com/in/abhiboostin/" },
  { title: "Resume", icon: <IconFileText />, href: "https://drive.google.com/file/d/1y9pewdw7wXkRyk-TGUvp8H1_TlOW4dQB/view?usp=drive_link" },
  { title: "Mail", icon: <IconMail />, href: "mailto:abhimanyusinghwoks@gmail.com" },
  { title: "Game", icon: <IconDeviceGamepad2 />, href: "/game", isInternal: true },
];

export default function PortfolioFloatingDock() {
  return <FloatingDock items={navItems} Link={Link} />;
} 