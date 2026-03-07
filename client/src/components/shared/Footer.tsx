import { Twitter, Linkedin } from "lucide-react";

const footerLinks = ["Privacy Policy", "Terms of Service", "Contact"];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background py-10 px-6">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-6">
        <nav className="flex gap-8">
          {footerLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {link}
            </a>
          ))}
        </nav>

        <div className="flex gap-4">
          {[Twitter, Linkedin].map((Icon, i) => (
            <a
              key={i}
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground hover:border-primary hover:text-primary transition-all"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-xs text-muted-foreground/60">
          © {new Date().getFullYear()} CherryPick PDF. Built for speed and
          privacy.
        </p>
      </div>
    </footer>
  );
}
