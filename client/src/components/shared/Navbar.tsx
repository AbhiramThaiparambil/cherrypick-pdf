import { useState } from "react";
import { Sun, Moon, LayoutGrid } from "lucide-react";
import useTheme from "@/hooks/useTheme";

export default function Navbar() {
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const { theme, toggleTheme } = useTheme();
  const navLinks = ["Features", "About"];

  return (
    <div className=" bg-background text-foreground transition-colors duration-300">
      <nav
        className="flex items-center justify-between px-6 py-3 border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-50"
        style={{ height: "56px" }}
      >
        <div className="flex items-center gap-2.5 select-none">
          <div className="relative">
            <div className="p-1.5 rounded-md bg-primary/10 text-primary">
              {/* <LogoIcon /> */}
              <LayoutGrid />
            </div>
          </div>
          <span className="font-semibold text-[15px] tracking-tight">
            CherryPick PDF
          </span>
        </div>

        <div className="flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => setActiveLink(link)}
              className={`
                px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-150
                ${
                  activeLink === link
                    ? "bg-secondary text-secondary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }
              `}
            >
              {link}
            </button>
          ))}

          <div className="w-px h-5 mx-2 bg-border" />

          <button
            className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200"
            aria-label="Toggle theme"
            onClick={toggleTheme}
          >
            {theme == "dark" ? <Moon /> : <Sun />}
          </button>

          <button className="ml-2 px-5 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 active:scale-95 bg-primary text-primary-foreground hover:opacity-90">
            Sign In
          </button>
        </div>
      </nav>
    </div>
  );
}
