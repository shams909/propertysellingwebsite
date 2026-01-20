import React, { useEffect, useState } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaPaperPlane,
  FaCheckCircle,
} from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    propertyType: "",
    message: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        propertyType: "",
        message: "",
      });
      setSubmitted(false);
    }, 3000);
  };

  const officeLocations = [
    {
      id: 1,
      name: "Main Office",
      address: "123 Real Estate Avenue, New York, NY 10001",
      phone: "+1 (555) 123-4567",
      email: "main@propertysellingco.com",
      hours: "Mon - Fri: 9:00 AM - 6:00 PM",
      image:
        "https://plus.unsplash.com/premium_photo-1661923465953-937e49c9e624?w=900&auto=format&fit=crop&q=60",
    },
    {
      id: 2,
      name: "Downtown Branch",
      address: "456 Commerce Street, New York, NY 10002",
      phone: "+1 (555) 234-5678",
      email: "downtown@propertysellingco.com",
      hours: "Mon - Fri: 10:00 AM - 7:00 PM",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
    },
    {
      id: 3,
      name: "Brooklyn Office",
      address: "789 Brooklyn Plaza, Brooklyn, NY 11201",
      phone: "+1 (555) 345-6789",
      email: "brooklyn@propertysellingco.com",
      hours: "Mon - Sat: 9:00 AM - 5:00 PM",
      image:
        "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80",
    },
  ];

  const faqs = [
    {
      question: "How long does the home buying process take?",
      answer:
        "Typically, the home buying process takes 30-45 days from offer acceptance to closing. However, this can vary based on financing and inspection requirements.",
    },
    {
      question: "What documents do I need to buy a property?",
      answer:
        "You'll need proof of income, tax returns, bank statements, identification, and pre-approval letter. Our agents will guide you through the complete documentation process.",
    },
    {
      question: "Do you handle rentals as well?",
      answer:
        "Yes, we handle both sales and rentals. Our team can help you find the perfect rental property that fits your budget and lifestyle.",
    },
    {
      question: "What makes your agency different?",
      answer:
        "We offer personalized service, extensive market knowledge, and cutting-edge technology to ensure the best experience for our clients.",
    },
    {
      question: "Can I schedule a property viewing online?",
      answer:
        "Absolutely! You can schedule viewings through our website or by calling us directly. We'll arrange a convenient time for you.",
    },
    {
      question: "Do you offer financing assistance?",
      answer:
        "While we don't provide financing directly, we work with trusted mortgage partners who can help you find the best loan options.",
    },
  ];

  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="bg-[#050505] min-h-screen relative">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-orange-600/10 via-transparent to-orange-600/5 pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            Get in <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-orange-600">Touch</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl">
            Have questions about a property? Our expert agents are here to help
            you find your perfect home. Reach out to us today!
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="max-w-6xl mx-auto px-4 py-12 relative z-20">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: FaPhone,
              title: "Call Us",
              info: "+1 (555) 123-4567",
              color: "from-blue-500/20 to-blue-600/20",
              iconColor: "text-blue-400",
            },
            {
              icon: FaEnvelope,
              title: "Email Us",
              info: "hello@propertysellingco.com",
              color: "from-purple-500/20 to-purple-600/20",
              iconColor: "text-purple-400",
            },
            {
              icon: FaClock,
              title: "Business Hours",
              info: "Mon-Fri: 9AM-6PM",
              color: "from-pink-500/20 to-pink-600/20",
              iconColor: "text-pink-400",
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative"
              >
                <div className={`absolute -inset-0.5 bg-linear-to-r ${item.color} rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500`}></div>
                <div className="relative bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-8 transition-all hover:border-white/20">
                  <div className={`text-4xl mb-4 ${item.iconColor}`}>
                    <Icon />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                  <p className="text-gray-400">{item.info}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="max-w-6xl mx-auto px-4 py-16 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Contact Form */}
          <div>
            <h2 className="text-4xl font-bold text-white mb-2">
              Send us a Message
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Fill out the form below and we'll get back to you as soon as
              possible.
            </p>

            {submitted ? (
              <div className="bg-green-500/10 border border-green-500/30 backdrop-blur-xl rounded-2xl p-8 text-center">
                <FaCheckCircle className="text-6xl text-green-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-green-400 mb-2">
                  Message Sent!
                </h3>
                <p className="text-green-300">
                  Thank you for contacting us. We'll get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 transition"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 transition"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 transition"
                  />
                  <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-orange-500/50 transition"
                  >
                    <option value="">Select Property Type</option>
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="apartment">Apartment</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 transition resize-none"
                  required
                ></textarea>

                <button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-full transition flex items-center justify-center gap-2 text-lg shadow-lg shadow-orange-500/20"
                >
                  Send Message <FaPaperPlane />
                </button>
              </form>
            )}
          </div>

          {/* Contact Image */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-linear-to-r from-orange-600 to-orange-400 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
                alt="Contact"
                className="w-full rounded-2xl group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white/5 border border-white/10 backdrop-blur-xl text-white p-6 rounded-2xl shadow-2xl max-w-xs">
              <p className="font-bold text-lg mb-2 text-orange-400">Quick Tip</p>
              <p className="text-sm text-gray-300">
                Response time within 24 hours guaranteed for all inquiries!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-16 relative z-10">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-white mb-4 text-center">
            Visit Our Offices
          </h2>
          <p className="text-gray-400 text-lg text-center mb-12 max-w-2xl mx-auto">
            Stop by any of our locations to speak with our agents in person.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {officeLocations.map((office) => (
              <div
                key={office.id}
                className="group relative"
              >
                <div className="absolute -inset-0.5 bg-linear-to-r from-orange-600 to-orange-400 rounded-3xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
                <div className="relative bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl overflow-hidden transition-all">
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={office.image}
                      alt={office.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-4">
                      {office.name}
                    </h3>

                    <div className="space-y-3 text-sm">
                      <div className="flex gap-3">
                        <FaMapMarkerAlt className="text-orange-400 text-lg flex-shrink-0 mt-0.5" />
                        <p className="text-gray-400">{office.address}</p>
                      </div>
                      <div className="flex gap-3">
                        <FaPhone className="text-orange-400 text-lg flex-shrink-0" />
                        <p className="text-gray-400">{office.phone}</p>
                      </div>
                      <div className="flex gap-3">
                        <FaEnvelope className="text-orange-400 text-lg flex-shrink-0" />
                        <p className="text-gray-400">{office.email}</p>
                      </div>
                      <div className="flex gap-3">
                        <FaClock className="text-orange-400 text-lg flex-shrink-0" />
                        <p className="text-gray-400">{office.hours}</p>
                      </div>
                    </div>

                    <button className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-full transition shadow-lg shadow-orange-500/20">
                      Get Directions
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 py-16 relative z-10">
        <h2 className="text-4xl font-bold text-white mb-4 text-center">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-400 text-lg text-center mb-12">
          Find answers to common questions about our services.
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`bg-white/5 border rounded-2xl overflow-hidden transition-all ${openFaq === index ? 'border-orange-500/50' : 'border-white/10 hover:border-white/20'}`}
            >
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full px-6 py-5 text-left font-bold text-white hover:bg-white/5 transition flex justify-between items-center"
              >
                <span>{faq.question}</span>
                <span
                  className={`text-orange-400 text-xl transition-transform duration-300 ${openFaq === index ? "rotate-45" : ""}`}
                >
                  +
                </span>
              </button>
              {openFaq === index && (
                <div className="px-6 py-4 text-gray-400 border-t border-white/10">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Social Media & Newsletter */}
      <section className="py-16 relative z-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-orange-500/10 rounded-full blur-[80px] pointer-events-none"></div>

            <div className="grid md:grid-cols-2 gap-12 relative z-10">
              {/* Newsletter */}
              <div>
                <h3 className="text-2xl font-bold mb-4 text-white">Stay Updated</h3>
                <p className="text-gray-400 mb-6">
                  Subscribe to get the latest real estate updates and property
                  listings.
                </p>
                <div className="flex gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-6 py-3 rounded-full bg-black/30 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                  />
                  <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-bold transition shadow-lg shadow-orange-500/20">
                    Subscribe
                  </button>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="text-2xl font-bold mb-4 text-white">Follow Us</h3>
                <p className="text-gray-400 mb-6">
                  Connect with us on social media for daily property updates and
                  tips.
                </p>
                <div className="flex gap-4">
                  {[
                    { icon: FaFacebook, name: "Facebook" },
                    { icon: FaTwitter, name: "Twitter" },
                    { icon: FaLinkedin, name: "LinkedIn" },
                    { icon: FaInstagram, name: "Instagram" },
                  ].map((social, idx) => {
                    const Icon = social.icon;
                    return (
                      <button
                        key={idx}
                        className="bg-white/5 border border-white/10 hover:bg-orange-500 hover:border-orange-500 text-gray-400 hover:text-white p-3 rounded-full text-xl transition-all"
                        title={social.name}
                      >
                        <Icon />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-6xl mx-auto px-4 py-16 text-center relative z-10">
        <h2 className="text-4xl font-bold text-white mb-4">
          Ready to Find Your Dream Home?
        </h2>
        <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
          Our expert agents are ready to help you navigate the real estate
          market and find the perfect property.
        </p>
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-full font-bold text-lg transition shadow-lg shadow-orange-500/20">
          Browse Properties Now
        </button>
      </section>
    </div>
  );
};

export default Contact;
