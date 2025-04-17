
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="pattern-bg border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          {/* Logo and Description */}
          <div className="flex flex-col">
            <Link to="/" className="mb-4 flex items-center gap-2">
              <span className="text-xl font-bold text-tunisian-terracotta">
                Artisan<span className="text-tunisian-blue">Tunisie</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Trouvez facilement des artisans qualifiés pour tous vos projets
              en Tunisie. Plomberie, électricité, menuiserie et plus encore.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-medium">Liens rapides</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="transition-colors hover:text-tunisian-terracotta"
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  to="/artisans"
                  className="transition-colors hover:text-tunisian-terracotta"
                >
                  Trouver un artisan
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="transition-colors hover:text-tunisian-terracotta"
                >
                  Devenir artisan
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="transition-colors hover:text-tunisian-terracotta"
                >
                  Se connecter
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-4 text-lg font-medium">Catégories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/artisans?category=plumbing"
                  className="transition-colors hover:text-tunisian-terracotta"
                >
                  Plomberie
                </Link>
              </li>
              <li>
                <Link
                  to="/artisans?category=electricity"
                  className="transition-colors hover:text-tunisian-terracotta"
                >
                  Électricité
                </Link>
              </li>
              <li>
                <Link
                  to="/artisans?category=carpentry"
                  className="transition-colors hover:text-tunisian-terracotta"
                >
                  Menuiserie
                </Link>
              </li>
              <li>
                <Link
                  to="/artisans?category=painting"
                  className="transition-colors hover:text-tunisian-terracotta"
                >
                  Peinture
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-lg font-medium">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-tunisian-terracotta" />
                <span>Tunis, Tunisie</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-tunisian-terracotta" />
                <span>+216 71 123 456</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-tunisian-terracotta" />
                <span>contact@artisantunisie.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} ArtisanTunisie. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
