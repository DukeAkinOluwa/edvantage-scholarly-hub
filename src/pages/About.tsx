
import { AspectRatio } from "@/components/ui/aspect-ratio";
import PageTransition from "../components/PageTransition";

const About = () => {
  return (
    <PageTransition>
      <div className="container mx-auto py-16 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Hero Section */}
          <div className="flex flex-col-reverse md:flex-row gap-8 items-center mb-16">
            <div className="md:w-1/2">
              <h1 className="text-4xl font-bold mb-4 text-edvantage-blue">About Edvantage</h1>
              <p className="text-lg leading-relaxed text-gray-700">
                Edvantage simplifies the academic journey for tertiary students by providing an engaging and efficient 
                platform that integrates time management, collaboration, and academic tools. The app is built to help 
                students overcome challenges such as poor time management, disjointed academic planning, and a lack 
                of centralized collaboration tools.
              </p>
            </div>
            <div className="md:w-1/2">
              <div className="rounded-xl overflow-hidden shadow-xl">
                <AspectRatio ratio={16/9}>
                  <img 
                    src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" 
                    alt="Student using Edvantage app" 
                    className="object-cover w-full h-full"
                  />
                </AspectRatio>
              </div>
            </div>
          </div>
          
          <div className="space-y-16">
            {/* Mission Section */}
            <section className="bg-gradient-to-r from-edvantage-light-blue to-white p-8 rounded-2xl shadow-sm">
              <h2 className="text-2xl font-semibold mb-6 text-edvantage-blue">Our Mission</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <ul className="space-y-4 text-lg leading-relaxed text-gray-700">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">✅</span>
                      <span>Enhance student productivity through disciplined time management.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">✅</span>
                      <span>Support goal achievement by providing tools for scheduling, task management, and reminders.</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <ul className="space-y-4 text-lg leading-relaxed text-gray-700">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">✅</span>
                      <span>Encourage collaboration by enabling real-time sharing of study materials, schedules, and academic resources.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">✅</span>
                      <span>Motivate students with gamification features that track progress and reward achievements.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>
            
            {/* Purpose & Story Section */}
            <div className="grid md:grid-cols-2 gap-10">
              <section>
                <h2 className="text-2xl font-semibold mb-4 text-edvantage-blue">Our Purpose</h2>
                <div className="rounded-xl overflow-hidden mb-4 shadow-md">
                  <AspectRatio ratio={4/3}>
                    <img 
                      src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
                      alt="Educational technology" 
                      className="object-cover w-full h-full"
                    />
                  </AspectRatio>
                </div>
                <p className="text-lg leading-relaxed text-gray-700">
                  Edvantage simplifies the academic journey for tertiary students by providing an engaging and efficient 
                  platform that integrates time management, collaboration, and academic tools. The app is built to help 
                  students overcome challenges such as poor time management, disjointed academic planning, and a lack 
                  of centralized collaboration tools.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4 text-edvantage-blue">Our Brand Story</h2>
                <div className="rounded-xl overflow-hidden mb-4 shadow-md">
                  <AspectRatio ratio={4/3}>
                    <img 
                      src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7" 
                      alt="Student studying" 
                      className="object-cover w-full h-full"
                    />
                  </AspectRatio>
                </div>
                <p className="text-lg leading-relaxed text-gray-700">
                  Edvantage was born out of a student's struggle to juggle assignments, deadlines, and personal life. 
                  Recognizing the need for a centralized academic productivity platform, the idea of Edvantage was 
                  developed to help students manage their studies effectively, collaborate with peers, and stay 
                  motivated to achieve academic excellence.
                </p>
              </section>
            </div>
            
            {/* Values Section */}
            <section className="bg-gray-50 p-10 rounded-3xl shadow-inner">
              <h2 className="text-2xl font-semibold mb-8 text-center text-edvantage-blue">Our Values</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-6 bg-white rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-edvantage-light-blue flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-edvantage-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-center text-edvantage-blue">Efficiency</h3>
                  <p className="text-gray-700 text-center">Saves students time by streamlining academic processes.</p>
                </div>
                <div className="p-6 bg-white rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-edvantage-light-blue flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-edvantage-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-center text-edvantage-blue">Community</h3>
                  <p className="text-gray-700 text-center">Encourages peer collaboration and academic support.</p>
                </div>
                <div className="p-6 bg-white rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-edvantage-light-blue flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-edvantage-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-center text-edvantage-blue">Integrity</h3>
                  <p className="text-gray-700 text-center">Ensures transparent communication and ethical practices.</p>
                </div>
                <div className="p-6 bg-white rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-edvantage-light-blue flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-edvantage-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-center text-edvantage-blue">Reliability</h3>
                  <p className="text-gray-700 text-center">Provides accurate, up-to-date academic information.</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default About;
