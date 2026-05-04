import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Ticket, Menu, X, Search } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const transparent = isHome && !scrolled && !menuOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        transparent
          ? "bg-transparent"
          : "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className={`p-1.5 rounded-lg transition-colors ${transparent ? "bg-white/20" : "bg-sky-50"}`}>
              <Ticket className={`w-5 h-5 ${transparent ? "text-white" : "text-sky-600"}`} />
            </div>
            <span className={`font-bold text-lg tracking-tight ${transparent ? "text-white" : "text-gray-900"}`}>
              Ticket<span className={transparent ? "text-sky-300" : "text-sky-500"}>LELE</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {[
              { label: "Events", to: "/events" },
            
            ].map(({ label, to }) => (
              <Link
                key={label}
                to={to}
                className={`text-sm font-medium transition-colors ${
                  transparent
                    ? "text-white/80 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/events"
              className={`p-2 rounded-lg transition-colors ${
                transparent ? "text-white/80 hover:text-white hover:bg-white/10" : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Search className="w-4 h-4" />
            </Link>
            <Link
              to="/events"
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                transparent
                  ? "bg-white text-gray-900 hover:bg-sky-50"
                  : "bg-sky-500 text-white hover:bg-sky-600"
              }`}
            >
              Browse Events
            </Link>
          </div>

          <button
            className={`md:hidden p-2 rounded-lg ${transparent ? "text-white" : "text-gray-700"}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-4 flex flex-col gap-3">
            {[
              { label: "Events", to: "/events" },
              { label: "Sports", to: "/events?category=Sports" },
              { label: "Music", to: "/events?category=Music" },
              { label: "Theatre", to: "/events?category=Theatre" },
            ].map(({ label, to }) => (
              <Link
                key={label}
                to={to}
                onClick={() => setMenuOpen(false)}
                className="text-gray-700 font-medium py-1"
              >
                {label}
              </Link>
            ))}
            <Link
              to="/events"
              onClick={() => setMenuOpen(false)}
              className="mt-2 px-4 py-2 bg-sky-500 text-white rounded-lg font-semibold text-center"
            >
              Browse Events
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
