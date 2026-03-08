import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import useTheme from "@/hooks/useTheme";
import { APPROUTES } from "@/constant/routes";
import { Link } from "react-router";
import AppIcon from "./AppIcon";
import { useAuthStore } from "@/store/authStore";
import { UserMenu } from "./UserMenu";
import { getUser, logoutUser } from "@/services/authService";
import { useNavigate } from "react-router";

export default function Navbar() {
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const { theme, toggleTheme } = useTheme();
  const navLinks = [{ title: "home", link: APPROUTES.Home }];
  const { email, setEmail, clearAuth } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!email) {
          const userData = await getUser();
          if (userData && userData.email) {
            setEmail(userData.email);
          }
        }
      } catch (error) {
        console.error("Failed to fetch user", error);
      }
    };
    fetchUser();
  }, [email, setEmail]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      clearAuth();
      navigate(APPROUTES.Landing);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className=" bg-background text-foreground transition-colors duration-300">
      <nav
        className="flex items-center justify-between px-6 py-3 border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-50"
        style={{ height: "56px" }}
      >
        <div className="flex items-center gap-2.5 select-none">
          <div className="relative">
            <div className="">
              <AppIcon />
            </div>
          </div>
          <span className="font-semibold text-[15px] tracking-tight">
            PDF Extractor
          </span>
        </div>

        <div className="flex items-center gap-1">
          {navLinks.map((nav) => (
            <Link to={nav.link}>
              <button
                key={nav.title}
                onClick={() => setActiveLink(nav.title)}
                className={`
              px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-150
              ${
                activeLink === nav.title
                  ? "bg-secondary text-secondary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              }
                `}
              >
                {nav.title}
              </button>
            </Link>
          ))}

          <div className="w-px h-5 mx-2 bg-border" />

          <button
            className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200"
            aria-label="Toggle theme"
            onClick={toggleTheme}
          >
            {theme == "dark" ? <Moon /> : <Sun />}
          </button>
       
{email &&          <UserMenu email={email} onLogout={handleLogout} />
}        </div>
      </nav>
    </div>
  );
}
