import React, { useEffect, useState } from "react";
import {
  FaCalendar,
  FaUser,
  FaSearch,
  FaTags,
  FaArrowRight,
} from "react-icons/fa";

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = [
    "All",
    "Real Estate Tips",
    "Market Trends",
    "Home Buying",
    "Investment",
    "Interior Design",
  ];

 const blogPosts = [
  {
    id: 1,
    title: "Top 10 Tips for First-Time Home Buyers",
    excerpt:
      "Buying your first home is an exciting journey. Here are the essential tips to make your home buying experience smooth and successful.",
    category: "Home Buying",
    author: "Sarah Johnson",
    date: "January 15, 2026",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&w=800&q=80",
    content: "Full detailed content about first-time home buying tips...",
  },
  {
    id: 2,
    title: "2026 Real Estate Market Predictions",
    excerpt:
      "Experts predict significant changes in the real estate market. Discover what 2026 holds for property investors and buyers.",
    category: "Market Trends",
    author: "Michael Chen",
    date: "January 12, 2026",
    readTime: "8 min read",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    content: "Full detailed content about market predictions...",
  },
  {
    id: 3,
    title: "How to Invest in Real Estate Successfully",
    excerpt:
      "Real estate investment can be profitable if done right. Learn the strategies that successful investors use to build wealth.",
    category: "Investment",
    author: "David Wilson",
    date: "January 10, 2026",
    readTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?auto=format&fit=crop&w=800&q=80",
    content: "Full detailed content about real estate investment...",
  },
  {
    id: 4,
    title: "Modern Interior Design Trends for 2026",
    excerpt:
      "Transform your home with the latest interior design trends. From minimalism to maximalism, discover what's hot this year.",
    category: "Interior Design",
    author: "Emma Davis",
    date: "January 8, 2026",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    content: "Full detailed content about interior design trends...",
  },
  {
    id: 5,
    title: "Understanding Property Taxes and Hidden Costs",
    excerpt:
      "Don't get caught off guard by unexpected costs. Learn about all the fees and taxes involved in property ownership.",
    category: "Real Estate Tips",
    author: "Robert Martinez",
    date: "January 5, 2026",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
    content: "Full detailed content about property taxes...",
  },
  {
    id: 6,
    title: "Neighborhood Guide: Finding Your Perfect Location",
    excerpt:
      "Choosing the right neighborhood is as important as choosing the right property. Here's how to evaluate different areas.",
    category: "Home Buying",
    author: "Lisa Anderson",
    date: "January 3, 2026",
    readTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=800&q=80",
    content: "Full detailed content about neighborhoods...",
  },
  {
    id: 7,
    title: "Sustainable Housing: Green Real Estate Solutions",
    excerpt:
      "Eco-friendly homes are becoming increasingly popular. Discover sustainable building practices and green technologies.",
    category: "Real Estate Tips",
    author: "James Green",
    date: "December 30, 2025",
    readTime: "8 min read",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80",
    content: "Full detailed content about sustainable housing...",
  },
  {
    id: 8,
    title: "The Rise of Smart Homes and IoT Technology",
    excerpt:
      "Smart home technology is revolutionizing how we live. Learn about the latest innovations in home automation.",
    category: "Market Trends",
    author: "Patricia White",
    date: "December 28, 2025",
    readTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80",
    content: "Full detailed content about smart homes...",
  },
  {
    id: 9,
    title: "Commercial Real Estate Investment Opportunities",
    excerpt:
      "Explore the world of commercial real estate and find lucrative investment opportunities in your area.",
    category: "Investment",
    author: "William Thompson",
    date: "December 25, 2025",
    readTime: "9 min read",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    content: "Full detailed content about commercial real estate...",
  },
];

  // Filter posts based on category and search
  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 text-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Real Estate Blog
          </h1>
          <p className="text-lg md:text-xl text-orange-100 mb-8">
            Discover insights, tips, and trends in the real estate world
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full input px-6 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-4 focus:ring-orange-300"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-orange-600 hover:bg-orange-700 text-white p-2 rounded-lg transition">
                <FaSearch />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {filteredPosts.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 py-12">
          <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition">
            <div className="grid md:grid-cols-2 gap-6 p-8">
              <div>
                <img
                  src={filteredPosts[0].image}
                  alt={filteredPosts[0].title}
                  className="w-full h-96 object-cover rounded-lg"
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="inline-block bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold w-fit mb-4">
                  Featured Article
                </span>
                <h2 className="text-3xl font-bold text-slate-800 mb-4">
                  {filteredPosts[0].title}
                </h2>
                <p className="text-gray-600 text-lg mb-6">
                  {filteredPosts[0].excerpt}
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
                  <span className="flex items-center gap-2">
                    <FaUser className="text-orange-500" />{" "}
                    {filteredPosts[0].author}
                  </span>
                  <span className="flex items-center gap-2">
                    <FaCalendar className="text-orange-500" />{" "}
                    {filteredPosts[0].date}
                  </span>
                  <span>{filteredPosts[0].readTime}</span>
                </div>
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold w-fit flex items-center gap-2 transition">
                  Read More <FaArrowRight />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <FaTags className="text-orange-500" /> Categories
        </h3>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition ${
                selectedCategory === category
                  ? "bg-orange-500 text-white shadow-lg"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        {filteredPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) =>
              // Skip the first post if it's the featured one
              index === 0 &&
              selectedCategory === "All" &&
              searchQuery === "" ? null : (
                <div
                  key={post.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-2xl transition transform hover:-translate-y-2 overflow-hidden"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-110 transition duration-300"
                    />
                    <span className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {post.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-800 mb-3 line-clamp-2 hover:text-orange-500 transition cursor-pointer">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>

                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-4 text-xs text-gray-500 mb-4 pb-4 border-b">
                      <span className="flex items-center gap-1">
                        <FaUser className="text-orange-400" /> {post.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaCalendar className="text-orange-400" /> {post.date}
                      </span>
                      <span>{post.readTime}</span>
                    </div>

                    {/* Read More Button */}
                    <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-2 rounded-lg font-semibold transition flex items-center justify-center gap-2">
                      Read Article <FaArrowRight size={14} />
                    </button>
                  </div>
                </div>
              ),
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500 mb-4">
              No articles found matching your search.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>

      {/* Newsletter Section */}
      <section className="bg-gradient-to-r from-orange-500 via-orange-450 to-orange-600 text-white py-16 mt-12">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-lg text-orange-100 mb-8">
            Get the latest real estate insights and tips delivered to your inbox
            weekly.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-4 focus:ring-orange-300"
            />
            <button className="bg-slate-800 hover:bg-slate-900 text-white px-8 py-3 rounded-lg font-semibold transition">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-slate-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <h4 className="text-4xl font-bold text-orange-500 mb-2">
                {blogPosts.length}+
              </h4>
              <p className="text-gray-600">Articles Published</p>
            </div>
            <div>
              <h4 className="text-4xl font-bold text-orange-500 mb-2">50K+</h4>
              <p className="text-gray-600">Monthly Readers</p>
            </div>
            <div>
              <h4 className="text-4xl font-bold text-orange-500 mb-2">
                {categories.length - 1}+
              </h4>
              <p className="text-gray-600">Categories</p>
            </div>
            <div>
              <h4 className="text-4xl font-bold text-orange-500 mb-2">100%</h4>
              <p className="text-gray-600">Expert Verified</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="max-w-6xl mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">
          Ready to Find Your Dream Property?
        </h2>
        <p className="text-gray-600 text-lg mb-8">
          Explore our properties or contact our expert agents today.
        </p>
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition">
          Browse Properties
        </button>
      </section>
    </div>
  );
};

export default Blog;
