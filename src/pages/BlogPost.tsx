
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PageTransition from "../components/PageTransition";
import { blogPosts } from "../data/blogData";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<typeof blogPosts[0] | undefined>(undefined);
  
  useEffect(() => {
    const foundPost = blogPosts.find(p => p.slug === slug);
    setPost(foundPost);
  }, [slug]);

  if (!post) {
    return (
      <div className="container mx-auto py-16 px-4 text-center">
        <h1 className="text-2xl font-bold">Blog post not found</h1>
        <p className="mt-4">The article you're looking for doesn't exist or has been removed.</p>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="container mx-auto py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <img 
              src={post.imageUrl} 
              alt={post.title} 
              className="w-full h-[400px] object-cover rounded-xl" 
            />
          </div>
          
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          
          <div className="flex items-center text-gray-600 mb-8">
            <span>By {post.author}</span>
            <span className="mx-2">•</span>
            <span>{post.date}</span>
          </div>
          
          <div className="prose prose-lg max-w-none">
            {/* This is where the full content would go */}
            <p className="text-lg leading-relaxed text-gray-700 mb-6">
              {post.excerpt}
            </p>
            
            {/* Placeholder content */}
            <p className="text-lg leading-relaxed text-gray-700 mb-6">
              At Edvantage, we believe that every student has the potential to excel academically when given the right tools and support. Our platform is designed to address the specific challenges faced by tertiary students in managing their academic responsibilities and collaborating effectively with peers.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Understanding the Challenge</h2>
            <p className="text-lg leading-relaxed text-gray-700 mb-6">
              Many students struggle with juggling multiple assignments, project deadlines, and exam preparations while trying to maintain a balanced life. This often leads to last-minute cramming, missed deadlines, and unnecessary stress. Edvantage was created to address these challenges head-on.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Our Approach</h2>
            <p className="text-lg leading-relaxed text-gray-700 mb-6">
              By integrating time management tools, collaborative features, and academic resources in one platform, Edvantage provides a comprehensive solution for student productivity. Our user-friendly interface ensures that students can easily navigate the app and make the most of its features.
            </p>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-2xl font-semibold mb-6">Related Articles</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {blogPosts
                .filter(p => p.slug !== slug)
                .slice(0, 2)
                .map(relatedPost => (
                  <a 
                    key={relatedPost.id} 
                    href={`/blog/${relatedPost.slug}`}
                    className="block group"
                  >
                    <div className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 group-hover:shadow-lg">
                      <img 
                        src={relatedPost.imageUrl} 
                        alt={relatedPost.title} 
                        className="w-full h-48 object-cover" 
                      />
                      <div className="p-6">
                        <h4 className="text-xl font-semibold mb-2 group-hover:text-edvantage-blue transition-colors">
                          {relatedPost.title}
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {relatedPost.date}
                        </p>
                      </div>
                    </div>
                  </a>
                ))}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default BlogPost;
