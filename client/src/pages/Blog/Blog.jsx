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
    <div className="bg-[#050505] min-h-screen relative">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-orange-600/20 via-transparent to-orange-600/10 pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Real Estate <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-orange-600">Blog</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Discover insights, tips, and trends in the real estate world
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-xl transition-all shadow-lg shadow-orange-500/20">
                <FaSearch />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {filteredPosts.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 py-12 relative z-10">
          <div className="relative group">
            <div className="absolute -inset-1 bg-linear-to-r from-orange-600 to-orange-400 rounded-3xl blur opacity-20"></div>
            <div className="relative bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl">
              <div className="grid md:grid-cols-2 gap-8 p-8">
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src={filteredPosts[0].image}
                    alt={filteredPosts[0].title}
                    className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="flex flex-col justify-center">
                  <span className="inline-block bg-orange-500 text-white px-4 py-1.5 rounded-full text-sm font-bold w-fit mb-4 shadow-lg shadow-orange-500/20">
                    Featured Article
                  </span>
                  <h2 className="text-3xl font-bold text-white mb-4 group-hover:text-orange-400 transition-colors">
                    {filteredPosts[0].title}
                  </h2>
                  <p className="text-gray-400 text-lg mb-6 line-clamp-3">
                    {filteredPosts[0].excerpt}
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
                    <span className="flex items-center gap-2">
                      <FaUser className="text-orange-400" />{" "}
                      {filteredPosts[0].author}
                    </span>
                    <span className="flex items-center gap-2">
                      <FaCalendar className="text-orange-400" />{" "}
                      {filteredPosts[0].date}
                    </span>
                    <span className="text-gray-500">{filteredPosts[0].readTime}</span>
                  </div>
                  <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-bold w-fit flex items-center gap-2 transition-all shadow-lg shadow-orange-500/20">
                    Read More <FaArrowRight />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="max-w-6xl mx-auto px-4 py-8 relative z-10">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <FaTags className="text-orange-400" /> Categories
        </h3>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2.5 rounded-full font-bold transition-all ${selectedCategory === category
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                  : "bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white"
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="max-w-6xl mx-auto px-4 py-12 relative z-10">
        {filteredPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) =>
              // Skip the first post if it's the featured one
              index === 0 &&
                selectedCategory === "All" &&
                searchQuery === "" ? null : (
                <div
                  key={post.id}
                  className="group relative"
                >
                  <div className="absolute -inset-0.5 bg-linear-to-r from-orange-600 to-orange-400 rounded-3xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
                  <div className="relative bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl overflow-hidden transition-all duration-300">
                    {/* Image */}
                    <div className="relative overflow-hidden h-48">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
                      <span className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        {post.category}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-white mb-3 line-clamp-2 group-hover:text-orange-400 transition-colors cursor-pointer">
                        {post.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>

                      {/* Meta Info */}
                      <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-4 pb-4 border-b border-white/10">
                        <span className="flex items-center gap-1">
                          <FaUser className="text-orange-400" /> {post.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaCalendar className="text-orange-400" /> {post.date}
                        </span>
                        <span>{post.readTime}</span>
                      </div>

                      {/* Read More Button */}
                      <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20">
                        Read Article <FaArrowRight size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-gray-400 mb-6">
              No articles found matching your search.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-orange-500/20"
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>

      {/* Newsletter Section */}
      <section className="relative py-20 mt-12 z-10">
        <div className="absolute inset-0 bg-linear-to-r from-orange-600/10 via-transparent to-orange-600/10 pointer-events-none"></div>
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-orange-500/10 rounded-full blur-[80px] pointer-events-none"></div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white relative z-10">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto relative z-10">
              Get the latest real estate insights and tips delivered to your inbox
              weekly.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto relative z-10">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-xl bg-black/30 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
              />
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-orange-500/20">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 relative z-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6">
              <h4 className="text-4xl font-bold text-orange-400 mb-2">
                {blogPosts.length}+
              </h4>
              <p className="text-gray-400">Articles Published</p>
            </div>
            <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6">
              <h4 className="text-4xl font-bold text-orange-400 mb-2">50K+</h4>
              <p className="text-gray-400">Monthly Readers</p>
            </div>
            <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6">
              <h4 className="text-4xl font-bold text-orange-400 mb-2">
                {categories.length - 1}+
              </h4>
              <p className="text-gray-400">Categories</p>
            </div>
            <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6">
              <h4 className="text-4xl font-bold text-orange-400 mb-2">100%</h4>
              <p className="text-gray-400">Expert Verified</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="max-w-6xl mx-auto px-4 py-16 text-center relative z-10">
        <h2 className="text-3xl font-bold text-white mb-4">
          Ready to Find Your Dream Property?
        </h2>
        <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
          Explore our properties or contact our expert agents today.
        </p>
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-orange-500/20">
          Browse Properties
        </button>
      </section>
    </div>
  );
};

export default Blog;
