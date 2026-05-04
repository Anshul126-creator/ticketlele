import { Link } from "react-router-dom";
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";
import type { Event } from "../data/events";

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const occupancy = ((event.totalSeats - event.availableSeats) / event.totalSeats) * 100;
  const isAlmostFull = event.availableSeats < 100;

  return (
    <Link
      to={`/events/${event.id}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
    >
      <div className="relative overflow-hidden h-48">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/95 text-gray-800 text-xs font-semibold rounded-full">
          {event.category}
        </span>
        {isAlmostFull && (
          <span className="absolute top-3 right-3 px-2.5 py-1 bg-rose-500 text-white text-xs font-semibold rounded-full">
            Almost Full
          </span>
        )}
        <div className="absolute bottom-3 left-3 text-white">
          <p className="font-bold text-lg leading-tight drop-shadow">{event.title}</p>
        </div>
      </div>

      <div className="p-4">
        <div className="flex flex-col gap-1.5 mb-4 text-sm text-gray-500">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-sky-500 shrink-0" />
            <span>{new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
            <Clock className="w-3.5 h-3.5 text-sky-500 ml-2 shrink-0" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-sky-500 shrink-0" />
            <span className="truncate">{event.venue}, {event.city}</span>
          </div>
        </div>

        <div className="mb-3">
          <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
            <span>{event.availableSeats.toLocaleString()} seats left</span>
            <span>{Math.round(occupancy)}% sold</span>
          </div>
          <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${occupancy > 80 ? "bg-rose-400" : "bg-sky-400"}`}
              style={{ width: `${occupancy}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400">From</p>
            <p className="text-xl font-bold text-gray-900">INR{event.price}</p>
          </div>
          <div className="flex items-center gap-1 text-sky-500 text-sm font-semibold group-hover:gap-2 transition-all">
            Get Tickets
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}
