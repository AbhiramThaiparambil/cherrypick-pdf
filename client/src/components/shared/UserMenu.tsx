import { useState } from "react";
import { LogOut } from "lucide-react";

interface UserMenuProps {
  email: string | null;
  onLogout: () => void;
}

export function UserMenu({ email, onLogout }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const initial = email ? email.charAt(0).toUpperCase() : "?";

  return (
    <div className="relative">
      {/* Profile Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity focus:outline-none border border-border"
      >
        {initial}
      </button>

      {/* Popover Menu */}
      {isOpen && (
        <>
          {/* Invisible backdrop to close on click-outside */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)} 
          />
          
          <div className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-lg shadow-lg z-50 py-2 animate-in fade-in zoom-in duration-150">
            <div className="px-4 py-2 border-b border-border mb-1">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Account</p>
              <p className="text-sm truncate font-medium text-foreground">{email}</p>
            </div>
            
            <button
              onClick={() => {
                onLogout();
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </>
      )}
    </div>
  );
}