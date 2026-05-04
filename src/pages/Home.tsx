import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, ChevronRight, Star, Shield, Zap, TrendingUp } from "lucide-react";
import { events, categories } from "../data/events";
import EventCard from "../components/EventCard";

const featuredEvents = events.filter((e) => e.featured);

const stats = [
  { label: "Events Listed", value: "12,000+" },
  { label: "Happy Customers", value: "2.4M+" },
  { label: "Cities Covered", value: "180+" },
  { label: "Partners Worldwide", value: "800+" },
];

const features = [
  {
    icon: Shield,
    title: "Buyer Guarantee",
    desc: "Every ticket is verified and protected. Full refund if your event is cancelled.",
  },
  {
    icon: Zap,
    title: "Instant Delivery",
    desc: "Receive your tickets instantly via email or the TicketHive app.",
  },
  {
    icon: Star,
    title: "Best Prices",
    desc: "We compare prices across verified sellers to get you the best deal.",
  },
  {
    icon: TrendingUp,
    title: "Trending Events",
    desc: "Discover what's hot in your city and never miss a great event.",
  },
];

export default function Home() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/events?q=${encodeURIComponent(search)}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-sky-500/20 border border-sky-400/30 text-sky-300 text-sm font-medium px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 bg-sky-400 rounded-full animate-pulse" />
            Live events happening near you
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
            Find Your Next
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">
              Unforgettable
            </span>
            Experience
          </h1>
          <p className="text-lg text-gray-300 mb-10 max-w-xl mx-auto leading-relaxed">
            Book tickets to the world's best concerts, sports events, theatre shows, and more — all in one place.
          </p>

          <form
            onSubmit={handleSearch}
            className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search events, artists, venues..."
                className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 shadow-lg"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3.5 bg-sky-500 hover:bg-sky-400 text-white font-semibold rounded-xl transition-colors shadow-lg text-sm whitespace-nowrap"
            >
              Search Events
            </button>
          </form>

          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {categories.slice(1).map((cat) => (
              <button
                key={cat}
                onClick={() => navigate(`/events?category=${cat}`)}
                className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white/80 hover:text-white text-xs font-medium rounded-full border border-white/20 transition-all backdrop-blur-sm"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent mx-auto" />
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-950 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(({ label, value }) => (
              <div key={label} className="text-center">
                <p className="text-3xl font-extrabold text-white mb-1">{value}</p>
                <p className="text-sm text-gray-500">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-sky-500 font-semibold text-sm uppercase tracking-wider mb-2">Don't Miss Out</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Featured Events</h2>
          </div>
          <button
            onClick={() => navigate("/events")}
            className="hidden sm:flex items-center gap-1 text-sky-500 font-semibold text-sm hover:gap-2 transition-all"
          >
            View All <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        <div className="text-center mt-8 sm:hidden">
          <button
            onClick={() => navigate("/events")}
            className="px-6 py-3 border border-sky-500 text-sky-500 font-semibold rounded-xl hover:bg-sky-50 transition-colors"
          >
            View All Events
          </button>
        </div>
      </section>

      {/* Browse by category */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sky-500 font-semibold text-sm uppercase tracking-wider mb-2">Explore</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Browse by Category</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { label: "Music", icon: "🎵", color: "bg-sky-50 hover:bg-sky-100 border-sky-200", text: "text-sky-700" },
              { label: "Sports", icon: "⚽", color: "bg-emerald-50 hover:bg-emerald-100 border-emerald-200", text: "text-emerald-700" },
              { label: "Theatre", icon: "🎭", color: "bg-amber-50 hover:bg-amber-100 border-amber-200", text: "text-amber-700" },
              { label: "Comedy", icon: "😄", color: "bg-orange-50 hover:bg-orange-100 border-orange-200", text: "text-orange-700" },
              { label: "Arts", icon: "🎨", color: "bg-rose-50 hover:bg-rose-100 border-rose-200", text: "text-rose-700" },
              { label: "Conference", icon: "💼", color: "bg-slate-50 hover:bg-slate-100 border-slate-200", text: "text-slate-700" },
            ].map(({ label, icon, color, text }) => (
              <button
                key={label}
                onClick={() => navigate(`/events?category=${label}`)}
                className={`flex flex-col items-center gap-2 p-5 rounded-2xl border-2 transition-all cursor-pointer ${color}`}
              >
                <span className="text-3xl">{icon}</span>
                <span className={`font-semibold text-sm ${text}`}>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-sky-500 font-semibold text-sm uppercase tracking-wider mb-2">Why Ticketlele</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            The smarter way to buy tickets
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-11 h-11 bg-sky-50 rounded-xl flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-sky-500" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-gray-950 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg"
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-5">
            Ready for an unforgettable night?
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Thousands of events, instant tickets, zero hassle.
          </p>
          <button
            onClick={() => navigate("/events")}
            className="px-8 py-4 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-xl text-lg transition-colors shadow-xl shadow-sky-500/20"
          >
            Explore All Events
          </button>
        </div>
      </section>

      {/* Cities */}
      <section className="py-16 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500 mb-6 font-medium uppercase tracking-wider">
            Top Cities
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {["bhopal,patna,vidisha"].map(
              (city) => (
                <button
                  key={city}
                  onClick={() => navigate(`/events?city=${city}`)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-200 text-gray-600 text-sm font-medium hover:border-sky-400 hover:text-sky-600 transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  {city}
                </button>
              )
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
