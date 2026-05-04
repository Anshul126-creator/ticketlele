import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, Filter, X, SlidersHorizontal } from "lucide-react";
import { events, categories, cities } from "../data/events";
import EventCard from "../components/EventCard";

export default function Events() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);

  const q = searchParams.get("q") || "";
  const categoryParam = searchParams.get("category") || "All";
  const cityParam = searchParams.get("city") || "All Cities";

  const [search, setSearch] = useState(q);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [selectedCity, setSelectedCity] = useState(cityParam);
  const [sortBy, setSortBy] = useState("date");

  const filtered = useMemo(() => {
    let list = [...events];
    if (search) {
      const term = search.toLowerCase();
      list = list.filter(
        (e) =>
          e.title.toLowerCase().includes(term) ||
          e.venue.toLowerCase().includes(term) ||
          e.city.toLowerCase().includes(term) ||
          e.category.toLowerCase().includes(term)
      );
    }
    if (selectedCategory !== "All") {
      list = list.filter((e) => e.category === selectedCategory);
    }
    if (selectedCity !== "All Cities") {
      list = list.filter((e) => e.city === selectedCity);
    }
    list.sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
    return list;
  }, [search, selectedCategory, selectedCity, sortBy]);

  const applySearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ q: search, category: selectedCategory, city: selectedCity });
  };

  const clearFilter = (key: string) => {
    if (key === "category") setSelectedCategory("All");
    if (key === "city") setSelectedCity("All Cities");
    if (key === "search") setSearch("");
  };

  const activeFilters = [
    search && { key: "search", label: `"${search}"` },
    selectedCategory !== "All" && { key: "category", label: selectedCategory },
    selectedCity !== "All Cities" && { key: "city", label: selectedCity },
  ].filter(Boolean) as { key: string; label: string }[];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">All Events</h1>
          <p className="text-gray-500 mb-6">
            Discover {events.length} incredible events happening near you
          </p>

          <form onSubmit={applySearch} className="flex gap-3">
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search events, artists, venues..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 bg-gray-50"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-3 bg-sky-500 text-white rounded-xl text-sm font-semibold hover:bg-sky-600 transition-colors"
            >
              Search
            </button>
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-colors ${
                showFilters
                  ? "bg-sky-50 border-sky-300 text-sky-600"
                  : "border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:inline">Filters</span>
            </button>
          </form>

          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200 flex flex-wrap gap-4">
              <div className="flex flex-col gap-1 min-w-36">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 bg-white"
                >
                  {categories.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1 min-w-36">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">City</label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 bg-white"
                >
                  {cities.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1 min-w-36">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 bg-white"
                >
                  <option value="date">Date (Soonest)</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>
          )}

          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {activeFilters.map(({ key, label }) => (
                <span
                  key={key}
                  className="flex items-center gap-1.5 px-3 py-1 bg-sky-50 text-sky-700 border border-sky-200 rounded-full text-sm font-medium"
                >
                  <Filter className="w-3 h-3" />
                  {label}
                  <button onClick={() => clearFilter(key)} className="hover:text-sky-900">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600 text-sm">
            <span className="font-semibold text-gray-900">{filtered.length}</span>{" "}
            {filtered.length === 1 ? "event" : "events"} found
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-7 h-7 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search or filters.</p>
            <button
              onClick={() => {
                setSearch("");
                setSelectedCategory("All");
                setSelectedCity("All Cities");
              }}
              className="px-5 py-2.5 bg-sky-500 text-white rounded-xl font-semibold text-sm hover:bg-sky-600 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
