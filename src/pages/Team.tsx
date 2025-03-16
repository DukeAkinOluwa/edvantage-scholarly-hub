
import PageTransition from "../components/PageTransition";
import { teamMembers } from "../data/teamData";
import TeamMember from "../components/TeamMember";

const Team = () => {
  return (
    <PageTransition>
      <div className="container mx-auto py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4 text-edvantage-blue">Our Leadership Team</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the visionaries behind Edvantage who are passionate about transforming
              the academic experience for tertiary students.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => (
              <TeamMember
                key={member.id}
                name={member.name}
                role={member.role}
                bio={member.bio}
                imageUrl={member.imageUrl}
                socialLinks={member.socialLinks}
                delay={index * 100}
              />
            ))}
          </div>
          
          <div className="mt-20 text-center bg-gray-50 p-10 rounded-xl">
            <h2 className="text-2xl font-bold mb-4">Join Our Team</h2>
            <p className="text-lg text-gray-700 mb-6">
              We're always looking for talented individuals who are passionate about education
              and technology to join our mission of empowering students.
            </p>
            <a 
              href="/contact" 
              className="inline-block bg-edvantage-blue text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Team;
