import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Calendar, MapPin, Clock, CheckCircle, ChevronLeft, CreditCard, Lock } from "lucide-react";
import type { Event } from "../data/events";

interface BookingState {
  event: Event;
  quantity: number;
  total: number;
}

export default function BookingConfirm() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as BookingState | null;

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No booking in progress</h2>
          <Link to="/events" className="text-sky-500 hover:underline">
            Browse Events
          </Link>
        </div>
      </div>
    );
  }

  const { event, quantity, total } = state;

  const validate = () => {
    const newErrors: Partial<typeof form> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = "Valid email required";
    if (!form.phone.match(/^\+?[\d\s\-()]{7,}$/)) newErrors.phone = "Valid phone required";
    if (!form.cardNumber.replace(/\s/g, "").match(/^\d{16}$/)) newErrors.cardNumber = "16-digit card number required";
    if (!form.expiry.match(/^\d{2}\/\d{2}$/)) newErrors.expiry = "Format: MM/YY";
    if (!form.cvv.match(/^\d{3,4}$/)) newErrors.cvv = "3-4 digit CVV";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  const formatCard = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiry = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return digits;
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
        <div className="max-w-md w-full mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-lg p-10 text-center">
            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-emerald-500" />
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900 mb-2">Booking Confirmed!</h1>
            <p className="text-gray-500 mb-6">
              Your tickets for <span className="font-semibold text-gray-800">{event.title}</span> have been booked successfully. A confirmation email has been sent to{" "}
              <span className="font-semibold text-gray-800">{form.email}</span>.
            </p>

            <div className="bg-gray-50 rounded-2xl p-5 text-left mb-6 space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4 text-sky-500" />
                {new Date(event.date).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4 text-sky-500" />
                {event.time}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4 text-sky-500" />
                {event.venue}, {event.city}
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between font-bold text-gray-900">
                <span>{quantity} x Ticket{quantity > 1 ? "s" : ""}</span>
                <span>${total}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button className="w-full py-3 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl transition-colors">
                Download Tickets
              </button>
              <Link
                to="/events"
                className="w-full py-3 border border-gray-200 text-gray-700 font-semibold rounded-xl text-center hover:bg-gray-50 transition-colors"
              >
                Browse More Events
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link
          to={`/events/${event.id}`}
          className="inline-flex items-center gap-1 text-gray-500 hover:text-gray-700 text-sm mb-6 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Event
        </Link>

        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Complete Your Booking</h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-6">
            {/* Personal Info */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-5">Personal Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="John Doe"
                    className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 transition-colors ${
                      errors.name ? "border-rose-400 bg-rose-50" : "border-gray-200"
                    }`}
                  />
                  {errors.name && <p className="text-rose-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="john@example.com"
                    className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 transition-colors ${
                      errors.email ? "border-rose-400 bg-rose-50" : "border-gray-200"
                    }`}
                  />
                  {errors.email && <p className="text-rose-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+1 234 567 8900"
                    className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 transition-colors ${
                      errors.phone ? "border-rose-400 bg-rose-50" : "border-gray-200"
                    }`}
                  />
                  {errors.phone && <p className="text-rose-500 text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-5">
                <CreditCard className="w-5 h-5 text-sky-500" />
                <h2 className="text-lg font-bold text-gray-900">Payment Details</h2>
                <div className="ml-auto flex items-center gap-1 text-xs text-gray-400">
                  <Lock className="w-3 h-3" />
                  Secure & encrypted
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Card Number</label>
                  <input
                    type="text"
                    value={form.cardNumber}
                    onChange={(e) => setForm({ ...form, cardNumber: formatCard(e.target.value) })}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    className={`w-full px-4 py-3 rounded-xl border text-sm font-mono tracking-widest focus:outline-none focus:ring-2 focus:ring-sky-400 transition-colors ${
                      errors.cardNumber ? "border-rose-400 bg-rose-50" : "border-gray-200"
                    }`}
                  />
                  {errors.cardNumber && <p className="text-rose-500 text-xs mt-1">{errors.cardNumber}</p>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Expiry Date</label>
                    <input
                      type="text"
                      value={form.expiry}
                      onChange={(e) => setForm({ ...form, expiry: formatExpiry(e.target.value) })}
                      placeholder="MM/YY"
                      maxLength={5}
                      className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 transition-colors ${
                        errors.expiry ? "border-rose-400 bg-rose-50" : "border-gray-200"
                      }`}
                    />
                    {errors.expiry && <p className="text-rose-500 text-xs mt-1">{errors.expiry}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">CVV</label>
                    <input
                      type="text"
                      value={form.cvv}
                      onChange={(e) =>
                        setForm({ ...form, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) })
                      }
                      placeholder="123"
                      maxLength={4}
                      className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 transition-colors ${
                        errors.cvv ? "border-rose-400 bg-rose-50" : "border-gray-200"
                      }`}
                    />
                    {errors.cvv && <p className="text-rose-500 text-xs mt-1">{errors.cvv}</p>}
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-sky-500 hover:bg-sky-600 disabled:bg-sky-300 text-white font-bold rounded-xl transition-colors shadow-lg shadow-sky-200 text-base flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  Confirm & Pay ${total}
                </>
              )}
            </button>
          </form>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 space-y-4">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-5">
                  <span className="inline-block px-2 py-0.5 bg-sky-50 text-sky-600 text-xs font-semibold rounded-full mb-2">
                    {event.category}
                  </span>
                  <h3 className="font-bold text-gray-900 text-lg leading-tight mb-4">{event.title}</h3>

                  <div className="space-y-2.5 text-sm text-gray-500 mb-5">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-sky-500 shrink-0" />
                      {new Date(event.date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-sky-500 shrink-0" />
                      {event.time}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-sky-500 shrink-0" />
                      {event.venue}, {event.city}
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-4 space-y-2 text-sm">
                    <div className="flex justify-between text-gray-500">
                      <span>${event.price} x {quantity} {quantity === 1 ? "ticket" : "tickets"}</span>
                      <span>${event.price * quantity}</span>
                    </div>
                    <div className="flex justify-between text-gray-500">
                      <span>Service fee</span>
                      <span>${total - event.price * quantity}</span>
                    </div>
                    <div className="flex justify-between font-bold text-gray-900 text-base pt-2 border-t border-gray-100">
                      <span>Total</span>
                      <span>${total}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                <p className="text-emerald-700 text-sm font-medium flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  Free cancellation up to 24 hours before the event. Instant ticket delivery via email.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
