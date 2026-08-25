import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-white selection:bg-blue-100">
      <Navbar />

      <main className="flex-1 flex flex-col items-center w-full pt-12 pb-24">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto px-8 w-full mb-16 text-center">
          <p className="text-sm font-bold text-[#1d64d8] tracking-widest uppercase mb-3">
            Contact Us
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
            Get in Touch
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Whether you have a question about our structural analysis tools,
            need a custom engineering solution, or just want to say hello, we
            are here to help.
          </p>
        </div>

        <div className="max-w-screen-2xl mx-auto px-8 w-full flex flex-col md:flex-row gap-16">
          {/* Left Column: Contact Information */}
          <div className="md:w-1/2 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Contact Information
              </h2>
              <p className="text-slate-600 mb-8 max-w-md">
                Fill out the form and we will get back to you within 24 hours.
                You can also reach out directly via email or visit the campus
                office.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-start gap-5">
                <div className="bg-blue-50 p-3.5 rounded-full shrink-0">
                  <MapPin className="w-6 h-6 text-[#1d64d8]" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">
                    Office Location
                  </h3>
                  <p className="text-slate-600 mt-2 leading-relaxed">
                    Jadavpur University, Main Campus
                    <br />
                    188, Raja S.C. Mallick Rd
                    <br />
                    Kolkata, West Bengal 700032
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div className="bg-blue-50 p-3.5 rounded-full shrink-0">
                  <Mail className="w-6 h-6 text-[#1d64d8]" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">
                    Email Address
                  </h3>
                  <p className="text-slate-600 mt-1">contact@strucdesc.com</p>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div className="bg-blue-50 p-3.5 rounded-full shrink-0">
                  <Phone className="w-6 h-6 text-[#1d64d8]" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">
                    Phone Number
                  </h3>
                  <p className="text-slate-600 mt-1">+91 (123) 456-7890</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="md:w-1/2 bg-slate-50 p-8 md:p-10 rounded-2xl border border-slate-100 shadow-sm">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="firstName"
                    className="text-sm font-semibold text-slate-900"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1d64d8] focus:border-transparent transition-all bg-white"
                    placeholder="John"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="lastName"
                    className="text-sm font-semibold text-slate-900"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1d64d8] focus:border-transparent transition-all bg-white"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-slate-900"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1d64d8] focus:border-transparent transition-all bg-white"
                  placeholder="john@example.com"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="subject"
                  className="text-sm font-semibold text-slate-900"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1d64d8] focus:border-transparent transition-all bg-white"
                  placeholder="How can we help?"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm font-semibold text-slate-900"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1d64d8] focus:border-transparent transition-all bg-white resize-none"
                  placeholder="Your message here..."
                ></textarea>
              </div>

              {/* Note: type="button" prevents page reload for now until backend is connected */}
              <button
                type="button"
                className="w-full bg-[#1d64d8] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors shadow-sm"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
