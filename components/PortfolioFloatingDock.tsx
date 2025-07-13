"use client";
import { useState } from "react";
import { FloatingDock } from "./FloatingDock";
import { IconHome, IconCode, IconBulb, IconBrandGithub, IconBrandLinkedin, IconFileText, IconMail, IconDeviceGamepad2 } from "@tabler/icons-react";
import Link from 'next/link';
import MailModal from "./MailModal";

const navItems = [
  { title: "Home", icon: <IconHome />, href: "/", isInternal: true },
  { title: "Projects", icon: <IconCode />, href: "/projects", isInternal: true },
  { title: "Skills", icon: <IconBulb />, href: "/skills", isInternal: true },
  { title: "GitHub", icon: <IconBrandGithub />, href: "https://github.com/Abhi-boostin" },
  { title: "LinkedIn", icon: <IconBrandLinkedin />, href: "https://www.linkedin.com/in/abhiboostin/" },
  { title: "Resume", icon: <IconFileText />, href: "https://drive.google.com/file/d/1y9pewdw7wXkRyk-TGUvp8H1_TlOW4dQB/view?usp=drive_link" },
  { title: "Mail", icon: <IconMail />, href: "#", isInternal: false, isMail: true },
  { title: "Game", icon: <IconDeviceGamepad2 />, href: "/game", isInternal: true },
];

export default function PortfolioFloatingDock() {
  const [isMailModalOpen, setIsMailModalOpen] = useState(false);

  const handleItemClick = (item: any) => {
    if (item.isMail) {
      setIsMailModalOpen(true);
      return false; // Prevent default link behavior
    }
    return true; // Allow default link behavior
  };

  return (
    <>
      <FloatingDock 
        items={navItems} 
        Link={Link} 
        onItemClick={handleItemClick}
      />
      <MailModal 
        isOpen={isMailModalOpen} 
        onClose={() => setIsMailModalOpen(false)} 
      />
    </>
  );
} 