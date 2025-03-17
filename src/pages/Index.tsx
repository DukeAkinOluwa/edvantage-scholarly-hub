
import PageTransition from "../components/PageTransition";
import Hero from "../components/Hero";
import FeatureCard from "../components/FeatureCard";
import FaqItem from "../components/FaqItem";
import PricingTier from "../components/PricingTier";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
      ),
      title: "Time & Task Management",
      description: "Centralized academic calendar, reminders, and prioritization systems to help you stay organized and meet deadlines."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
      title: "Collaboration & Study Groups",
      description: "Create study squads, join class groups, and collaborate on projects with ease."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
        </svg>
      ),
      title: "Gamification & Motivation",
      description: "Earn points, compete on leaderboards, and receive rewards for achieving academic milestones."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
        </svg>
      ),
      title: "Academic Resources & AI Support",
      description: "Access a rich library of course materials and get AI assistance in understanding complex topics."
    }
  ];

  const faqs = [
    {
      question: "What is Edvantage?",
      answer: "Edvantage is a productivity and collaboration tool designed specifically for tertiary students. It helps with time management, collaboration, and provides academic resources to enhance your learning experience."
    },
    {
      question: "How much does Edvantage cost?",
      answer: "Edvantage offers a freemium model. Basic features are available for free, with premium features accessible for ₦1200/year - an affordable price designed specifically for students."
    },
    {
      question: "Can I use Edvantage on multiple devices?",
      answer: "Yes! Edvantage is available on web and mobile platforms, allowing you to access your academic tools and resources anywhere, anytime."
    },
    {
      question: "How do study squads work?",
      answer: "Study squads allow you to create or join groups with classmates, share resources, discuss topics, and collaborate on projects. You can set group goals, assign tasks, and track progress together."
    },
    {
      question: "Is my data secure with Edvantage?",
      answer: "Absolutely. We take data privacy and security seriously. All your personal information and academic data are encrypted and protected according to the highest industry standards."
    }
  ];

  return (
    <PageTransition>
      {/* Hero Section */}
      <Hero 
        title="Empowering Students for Academic Success"
        subtitle="Edvantage helps tertiary students manage time effectively, collaborate with peers, and access academic resources - all in one platform."
        ctaText="Get Started"
        ctaLink="/contact"
        secondaryCtaText="Learn More"
        secondaryCtaLink="/about"
        imageUrl="https://images.unsplash.com/photo-1557425955-df376b5903c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
      />

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-edvantage-blue mb-4">Designed for Student Success</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Edvantage combines essential tools that address the unique challenges faced by tertiary students.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={index * 100}
              />
            ))}
          </div>
        </div>
      </section>

      {/* NEW Pricing Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-edvantage-blue mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the plan that suits your academic needs, with affordable options for every student.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <PricingTier
              name="Basic"
              price="Free"
              period="forever"
              description="Essential features for individual students"
              features={[
                "Academic calendar",
                "Basic task management",
                "Access to study guides",
                "Email support"
              ]}
              ctaText="Get Started"
              ctaLink="/contact"
            />
            
            <PricingTier
              name="Pro"
              price="₦1200"
              period="year"
              description="Everything in Basic plus premium features"
              features={[
                "Advanced task prioritization",
                "Study group collaboration",
                "AI study assistant",
                "Gamification rewards",
                "Priority support"
              ]}
              isPopular={true}
              ctaText="Try Pro"
              ctaLink="/contact"
            />
            
            <PricingTier
              name="Campus"
              price="Custom"
              period="year"
              description="Enterprise solution for institutions"
              features={[
                "Everything in Pro",
                "Campus-wide deployment",
                "Admin dashboard",
                "API integration",
                "Dedicated support",
                "Custom branding"
              ]}
              ctaText="Contact Us"
              ctaLink="/contact"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-edvantage-blue text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="text-5xl font-bold mb-2">2.1M+</div>
              <p className="text-xl opacity-80">Nigerian Students</p>
            </div>
            <div className="p-6">
              <div className="text-5xl font-bold mb-2">47%</div>
              <p className="text-xl opacity-80">Mobile Adoption</p>
            </div>
            <div className="p-6">
              <div className="text-5xl font-bold mb-2">₦1200</div>
              <p className="text-xl opacity-80">Per Year</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-edvantage-blue mb-4">What Students Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from students who have transformed their academic experience with Edvantage.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-edvantage-light-blue rounded-full flex items-center justify-center text-edvantage-blue">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Chioma Okafor</h4>
                  <p className="text-sm text-gray-500">Computer Science Student</p>
                </div>
              </div>
              <p className="text-gray-600">
                "Edvantage has completely changed how I manage my academic life. The reminder system ensures I never miss deadlines, and the study squads feature has made group projects so much easier!"
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-edvantage-light-blue rounded-full flex items-center justify-center text-edvantage-blue">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Emmanuel Adebayo</h4>
                  <p className="text-sm text-gray-500">Mechanical Engineering Student</p>
                </div>
              </div>
              <p className="text-gray-600">
                "As a course rep, Edvantage has made communicating with my classmates seamless. The academic calendar keeps everyone on the same page, and the gamification makes studying more fun!"
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-edvantage-light-blue rounded-full flex items-center justify-center text-edvantage-blue">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Amina Ibrahim</h4>
                  <p className="text-sm text-gray-500">Business Administration Student</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The AI study support is a game-changer for difficult concepts. I've seen my grades improve since using Edvantage, and the affordable price makes it accessible to all students."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-edvantage-blue mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get answers to common questions about Edvantage and how it can help you succeed academically.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <FaqItem 
                key={index}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
            
            <div className="text-center mt-12">
              <Link to="/blog" className="text-edvantage-blue hover:text-blue-700 font-semibold">
                View more FAQs in our blog →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-edvantage-blue mb-6">Ready to Transform Your Academic Experience?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of students already using Edvantage to enhance their productivity,
              collaboration, and academic success.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="px-8 py-3 bg-edvantage-blue text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Get Started Now
              </Link>
              <Link to="/about" className="px-8 py-3 bg-white border border-edvantage-blue text-edvantage-blue rounded-lg font-medium hover:bg-gray-50 transition-colors">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Index;
