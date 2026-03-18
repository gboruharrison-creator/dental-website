import { useState, useEffect } from "react";
import { send } from "@emailjs/browser";
import toast from "react-hot-toast";

const servicesList = [
  "General Check-up", "Teeth Whitening", "Dental Implants",
  "Invisalign", "Emergency Appointment", "Veneers",
  "Root Canal", "Children's Dentistry", "Other",
];

export default function BookingModal({ isOpen, onClose }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", date: "", message: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Replace with your EmailJS IDs when you set up EmailJS
      // await send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", form, "YOUR_PUBLIC_KEY");
      toast.success("Booking request sent! We'll confirm within 2 hours.");
      onClose();
      setForm({ name: "", email: "", phone: "", service: "", date: "", message: "" });
    } catch {
      toast.error("Something went wrong. Please call us on 020 7946 0321.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="bg-primary p-6 rounded-t-2xl">
          <h2 className="text-white text-xl font-bold">Book an Appointment</h2>
          <p className="text-blue-100 text-sm mt-1">We'll confirm your booking within 2 hours</p>
          <button onClick={onClose} className="absolute top-4 right-4 text-white/70 hover:text-white text-2xl leading-none">×</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <input name="name" value={form.name} onChange={handleChange} required
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
                placeholder="Jane Smith" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input name="phone" value={form.phone} onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
                placeholder="07700 000000" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} required
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
              placeholder="jane@example.com" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Service *</label>
              <select name="service" value={form.service} onChange={handleChange} required
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary bg-white">
                <option value="">Select service</option>
                {servicesList.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date *</label>
              <input name="date" type="date" value={form.date} onChange={handleChange} required
                min={new Date().toISOString().split("T")[0]}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
            <textarea name="message" value={form.message} onChange={handleChange} rows={3}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary resize-none"
              placeholder="Any concerns or special requirements..." />
          </div>

          <button type="submit" disabled={loading}
            className="w-full btn-primary py-3 disabled:opacity-60 disabled:cursor-not-allowed">
            {loading ? "Sending..." : "Request Appointment →"}
          </button>

          <p className="text-xs text-gray-400 text-center">
            Or call us directly: <a href="tel:02079460321" className="text-primary font-medium">020 7946 0321</a>
          </p>
        </form>
      </div>
    </div>
  );
}