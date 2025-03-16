
export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  date: string;
  author: string;
  imageUrl: string;
  tags?: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "How Edvantage Helps Students Meet Assignment Deadlines",
    slug: "how-edvantage-helps-meet-deadlines",
    excerpt: "Discover how Edvantage's innovative time management tools can help you stay on top of your assignments and never miss a deadline again.",
    date: "June 15, 2023",
    author: "Akinduko AkinOluwa",
    imageUrl: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    tags: ["Time Management", "Productivity", "Assignments"]
  },
  {
    id: 2,
    title: "The Power of Study Squads: Collaborative Learning with Edvantage",
    slug: "power-of-study-squads",
    excerpt: "Learn how Edvantage's Study Squads feature facilitates collaborative learning, resource sharing, and improved academic performance.",
    date: "July 2, 2023",
    author: "Owolabi Titilayo",
    imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
    tags: ["Collaboration", "Study Groups", "Learning"]
  },
  {
    id: 3,
    title: "5 Ways Edvantage's Gamification Features Keep Students Motivated",
    slug: "gamification-features-for-motivation",
    excerpt: "Explore how Edvantage uses gamification to transform academic tasks into engaging challenges that keep students motivated and on track.",
    date: "August 10, 2023",
    author: "David Adeyemi",
    imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
    tags: ["Gamification", "Motivation", "Academic Success"]
  },
  {
    id: 4,
    title: "Maximizing Your Academic Performance with Edvantage's AI Study Support",
    slug: "maximizing-performance-with-ai-support",
    excerpt: "Discover how Edvantage's AI-powered study tools can help explain complex topics, summarize lengthy materials, and optimize your learning experience.",
    date: "September 5, 2023",
    author: "Oluwaseun Johnson",
    imageUrl: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    tags: ["AI Support", "Study Techniques", "Academic Excellence"]
  },
  {
    id: 5,
    title: "Why Nigerian Students Need Edvantage: Addressing Local Academic Challenges",
    slug: "addressing-nigerian-academic-challenges",
    excerpt: "An in-depth look at how Edvantage addresses the specific productivity and communication challenges faced by students in Nigerian universities and polytechnics.",
    date: "October 12, 2023",
    author: "Akinduko AkinOluwa",
    imageUrl: "https://images.unsplash.com/photo-1517486808906-6ca8b3f8e1c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    tags: ["Nigerian Education", "Local Solutions", "Academic Challenges"]
  },
  {
    id: 6,
    title: "FAQ: Everything You Need to Know About Getting Started with Edvantage",
    slug: "faq-getting-started-with-edvantage",
    excerpt: "Answers to the most common questions about Edvantage features, pricing, and how to make the most of the platform for your academic success.",
    date: "November 8, 2023",
    author: "Owolabi Titilayo",
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    tags: ["FAQ", "Getting Started", "User Guide"]
  }
];
