
import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, LogIn, User, Home, Briefcase, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-background">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-tunisian-terracotta">
            Artisan<span className="text-tunisian-blue">Tunisie</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-8">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center gap-1 transition-colors hover:text-tunisian-terracotta ${
                    isActive ? "text-tunisian-terracotta" : ""
                  }`
                }
              >
                <Home className="h-4 w-4" />
                <span>Accueil</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/artisans"
                className={({ isActive }) =>
                  `flex items-center gap-1 transition-colors hover:text-tunisian-terracotta ${
                    isActive ? "text-tunisian-terracotta" : ""
                  }`
                }
              >
                <Briefcase className="h-4 w-4" />
                <span>Artisans</span>
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* User Actions */}
        <div className="flex items-center gap-2">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline-block">{user.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile">
                    <User className="mr-2 h-4 w-4" />
                    Mon profil
                  </Link>
                </DropdownMenuItem>
                {user.role === "artisan" && (
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard">
                      <Briefcase className="mr-2 h-4 w-4" />
                      Tableau de bord
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Déconnexion
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button
                variant="ghost"
                className="hidden sm:flex"
                asChild
              >
                <Link to="/login">
                  <LogIn className="mr-2 h-4 w-4" />
                  Connexion
                </Link>
              </Button>
              <Button asChild>
                <Link to="/register">S'inscrire</Link>
              </Button>
            </>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMenu}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`container mx-auto border-t md:hidden ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        <nav className="py-4">
          <ul className="flex flex-col gap-4">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 transition-colors hover:bg-muted ${
                    isActive ? "text-tunisian-terracotta" : ""
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                <Home className="h-5 w-5" />
                <span>Accueil</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/artisans"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 transition-colors hover:bg-muted ${
                    isActive ? "text-tunisian-terracotta" : ""
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                <Briefcase className="h-5 w-5" />
                <span>Artisans</span>
              </NavLink>
            </li>
            {!user && (
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 transition-colors hover:bg-muted ${
                      isActive ? "text-tunisian-terracotta" : ""
                    }`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  <LogIn className="h-5 w-5" />
                  <span>Connexion</span>
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
