
import PageTransition from "../components/PageTransition";

const About = () => {
  return (
    <PageTransition>
      <div className="container mx-auto py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-edvantage-blue">About Edvantage</h1>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Our Purpose</h2>
              <p className="text-lg leading-relaxed text-gray-700">
                Edvantage simplifies the academic journey for tertiary students by providing an engaging and efficient 
                platform that integrates time management, collaboration, and academic tools. The app is built to help 
                students overcome challenges such as poor time management, disjointed academic planning, and a lack 
                of centralized collaboration tools.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <ul className="space-y-3 text-lg leading-relaxed text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✅</span>
                  <span>Enhance student productivity through disciplined time management.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✅</span>
                  <span>Support goal achievement by providing tools for scheduling, task management, and reminders.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✅</span>
                  <span>Encourage collaboration by enabling real-time sharing of study materials, schedules, and academic resources.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✅</span>
                  <span>Motivate students with gamification features that track progress and reward achievements.</span>
                </li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Our Brand Story</h2>
              <p className="text-lg leading-relaxed text-gray-700">
                Edvantage was born out of a student's struggle to juggle assignments, deadlines, and personal life. 
                Recognizing the need for a centralized academic productivity platform, the idea of Edvantage was 
                developed to help students manage their studies effectively, collaborate with peers, and stay 
                motivated to achieve academic excellence.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-white rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-2 text-edvantage-blue">Efficiency</h3>
                  <p className="text-gray-700">Saves students time by streamlining academic processes.</p>
                </div>
                <div className="p-6 bg-white rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-2 text-edvantage-blue">Community</h3>
                  <p className="text-gray-700">Encourages peer collaboration and academic support.</p>
                </div>
                <div className="p-6 bg-white rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-2 text-edvantage-blue">Integrity</h3>
                  <p className="text-gray-700">Ensures transparent communication and ethical practices.</p>
                </div>
                <div className="p-6 bg-white rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-2 text-edvantage-blue">Reliability</h3>
                  <p className="text-gray-700">Provides accurate, up-to-date academic information.</p>
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
