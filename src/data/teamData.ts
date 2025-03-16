
export interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  socialLinks: {
    platform: 'twitter' | 'linkedin' | 'github';
    url: string;
  }[];
}

export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Akinduko AkinOluwa",
    role: "Founder & CEO",
    bio: "Akinduko is a visionary leader with a passion for education technology. His experience as a student led him to create Edvantage to solve the productivity challenges facing tertiary students.",
    imageUrl: "./Images/AkinOluwa.jpg",
    socialLinks: [
      {
        platform: "twitter",
        url: "https://twitter.com/akinoluwa"
      },
      {
        platform: "linkedin",
        url: "https://linkedin.com/in/akinoluwa"
      }
    ]
  },
  {
    id: 2,
    name: "Owolabi Titilayo",
    role: "Co-Founder & COO",
    bio: "Titilayo brings operational excellence and strategic vision to Edvantage. Her background in business administration ensures the company delivers on its promises to students.",
    imageUrl: "./Images/Titilayo.jpg",
    socialLinks: [
      {
        platform: "twitter",
        url: "https://twitter.com/titilayo"
      },
      {
        platform: "linkedin",
        url: "https://linkedin.com/in/titilayo"
      }
    ]
  },
  // {
  //   id: 3,
  //   name: "David Adeyemi",
  //   role: "CTO",
  //   bio: "David leads the technical vision and development of Edvantage. With expertise in mobile applications and AI, he ensures the platform delivers a seamless experience for students.",
  //   imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
  //   socialLinks: [
  //     {
  //       platform: "github",
  //       url: "https://github.com/davidadeyemi"
  //     },
  //     {
  //       platform: "linkedin",
  //       url: "https://linkedin.com/in/davidadeyemi"
  //     }
  //   ]
  // },
  // {
  //   id: 4,
  //   name: "Oluwaseun Johnson",
  //   role: "Head of Design",
  //   bio: "Oluwaseun crafts the user experience that makes Edvantage intuitive and engaging. Her design philosophy focuses on simplicity and accessibility for all students.",
  //   imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1061&q=80",
  //   socialLinks: [
  //     {
  //       platform: "twitter",
  //       url: "https://twitter.com/oluwaseun"
  //     },
  //     {
  //       platform: "linkedin",
  //       url: "https://linkedin.com/in/oluwaseun"
  //     }
  //   ]
  // }
];
