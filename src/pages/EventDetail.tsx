import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Calendar,
  MapPin,
  Clock,
  Tag,
  ChevronLeft,
  Minus,
  Plus,
  Users,
  Share2,
  Heart,
} from "lucide-react";
import { events } from "../data/events";
import EventCard from "../components/EventCard";

export default function EventDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const event = events.find((e) => e.id === id);
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Event not found</h2>
          <Link to="/events" className="text-sky-500 hover:underline">
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  const relatedEvents = events.filter(
    (e) => e.category === event.category && e.id !== event.id
  ).slice(0, 3);

  const occupancy = ((event.totalSeats - event.availableSeats) / event.totalSeats) * 100;
  const total = event.price * quantity;
  const serviceFee = Math.round(total * 0.1);

  const handleBook = () => {
    navigate("/booking/confirm", {
      state: { event, quantity, total: total + serviceFee },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero */}
      <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <Link
            to="/events"
            className="inline-flex items-center gap-1 text-white/70 hover:text-white text-sm mb-4 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Events
          </Link>
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="inline-block px-2.5 py-1 bg-sky-500 text-white text-xs font-semibold rounded-full mb-3">
                {event.category}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                {event.title}
              </h1>
            </div>
            <div className="flex gap-2 shrink-0 mt-2">
              <button
                onClick={() => setLiked(!liked)}
                className={`p-2.5 rounded-full backdrop-blur-sm transition-all ${
                  liked ? "bg-rose-500 text-white" : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                <Heart className={`w-5 h-5 ${liked ? "fill-current" : ""}`} />
              </button>
              <button className="p-2.5 rounded-full bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm transition-all">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: Calendar,
                  label: "Date",
                  value: new Date(event.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  }),
                },
                { icon: Clock, label: "Time", value: event.time },
                { icon: MapPin, label: "Venue", value: event.venue },
                { icon: MapPin, label: "City", value: event.city },
              ].map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-sm"
                >
                  <div className="w-9 h-9 bg-sky-50 rounded-lg flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-sky-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">{label}</p>
                    <p className="text-sm font-semibold text-gray-800 mt-0.5">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">About This Event</h2>
              <p className="text-gray-600 leading-relaxed">{event.description}</p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {event.tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-200 text-gray-600 text-sm rounded-full"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>

            {/* Availability */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-5 h-5 text-sky-500" />
                <h3 className="font-bold text-gray-900">Seat Availability</h3>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                <span>{event.availableSeats.toLocaleString()} of {event.totalSeats.toLocaleString()} seats available</span>
                <span className={occupancy > 80 ? "text-rose-500 font-semibold" : "text-sky-500 font-semibold"}>
                  {Math.round(occupancy)}% sold
                </span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${occupancy > 80 ? "bg-rose-400" : "bg-sky-400"}`}
                  style={{ width: `${occupancy}%` }}
                />
              </div>
              {event.availableSeats < 100 && (
                <p className="text-rose-500 text-sm font-medium mt-3">
                  Hurry — only {event.availableSeats} seats left!
                </p>
              )}
            </div>
          </div>

          {/* Right: Booking Widget */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden">
              <div className="bg-gradient-to-br from-sky-500 to-cyan-500 px-6 py-5">
                <p className="text-sky-100 text-sm font-medium">Tickets from</p>
                <p className="text-4xl font-extrabold text-white mt-1">${event.price}</p>
                <p className="text-sky-100 text-sm mt-1">per person</p>
              </div>

              <div className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Number of Tickets
                  </label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-9 h-9 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-600 hover:border-sky-400 hover:text-sky-500 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-2xl font-bold text-gray-900 w-8 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(10, quantity + 1))}
                      className="w-9 h-9 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-600 hover:border-sky-400 hover:text-sky-500 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">Max 10 tickets per order</p>
                </div>

                <div className="border-t border-gray-100 pt-4 space-y-2">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>${event.price} x {quantity} {quantity === 1 ? "ticket" : "tickets"}</span>
                    <span>${total}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Service fee (10%)</span>
                    <span>${serviceFee}</span>
                  </div>
                  <div className="flex justify-between font-bold text-gray-900 text-base pt-2 border-t border-gray-100">
                    <span>Total</span>
                    <span>${total + serviceFee}</span>
                  </div>
                </div>

                <button
                  onClick={handleBook}
                  className="w-full py-3.5 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl transition-colors shadow-md shadow-sky-200"
                >
                  Book Now
                </button>

                <p className="text-xs text-center text-gray-400">
                  Free cancellation up to 24 hours before the event
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Events */}
        {relatedEvents.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-6">
              More {event.category} Events
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedEvents.map((e) => (
                <EventCard key={e.id} event={e} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
