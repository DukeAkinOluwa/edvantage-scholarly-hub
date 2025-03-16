
import { useState } from "react";
import { Link } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import BlogCard from "../components/BlogCard";
import { blogPosts } from "../data/blogData";

// Create a fake blogPosts data since it's not provided in the allowed files
// This will be placeholders until real data is added
const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredPosts = blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageTransition>
      <div className="container mx-auto py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-edvantage-blue">Edvantage Blog</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Insights, tips, and news about productivity, student life, and getting the most out of your academic journey.
            </p>
          </div>
          
          <div className="mb-10">
            <div className="relative max-w-md mx-auto">
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full px-5 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-edvantage-blue"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="absolute right-3 top-3 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </button>
            </div>
          </div>
          
          {filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <BlogCard 
                  key={post.id}
                  title={post.title}
                  excerpt={post.excerpt}
                  date={post.date}
                  author={post.author}
                  slug={post.slug}
                  imageUrl={post.imageUrl}
                  delay={index * 100}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-2xl font-semibold mb-2">No articles found</h3>
              <p className="text-gray-600">Try adjusting your search terms</p>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default Blog;
