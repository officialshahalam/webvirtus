import {
  Gauge,
  ShieldCheck,
  Code,
  Wrench,
  Infinity,
  Rocket,
  LucideIcon,
  LayoutDashboard,
  DollarSign,
  MessageCircle,
  Calculator,
  Briefcase,
} from "lucide-react";
import NextjsIcon from "../../public/icons/webIcons/NextjsIcon";
import ReactIcon from "../../public/icons/webIcons/ReactIcon";
import NodejsIcon from "../../public/icons/webIcons/NodejsIcon";
import SupabaseIcon from "../../public/icons/webIcons/SupabaseIcon";
import OpenAIIcon from "../../public/icons/webIcons/OpenAiIcon";
import PyTorchIcon from "../../public/icons/webIcons/PyTorchIcon";
import TensorFlowIcon from "../../public/icons/webIcons/TensorFlowIcon";
import NetlifyIcon from "../../public/icons/webIcons/NetlifyIcon";
import VercelIcon from "../../public/icons/webIcons/VercelIcon";
import DigitalOceanIcon from "../../public/icons/webIcons/DigitalOceanIcon";
import AWSIcon from "../../public/icons/webIcons/AWSIcon";
import FirebaseIcon from "../../public/icons/webIcons/FirebaseIcon";
import GSAPIcon from "../../public/icons/webIcons/GSAPIcon";
import { TailwindIcon } from "../../public/icons/webIcons/TailwindIcon";
import { TbBrandFramerMotion, TbBrandThreejs } from "react-icons/tb";
import {
  SiApachekafka,
  SiAppwrite,
  SiExpress,
  SiMongodb,
  SiPrisma,
} from "react-icons/si";
import { BiLogoPostgresql } from "react-icons/bi";
import { DiRedis } from "react-icons/di";
import { GrServices } from "react-icons/gr";
import { FaDocker, FaGooglePlay } from "react-icons/fa";
import { FaFlutter } from "react-icons/fa6";
import ExpoIcon from "../../public/icons/mobileIcons/ExpoIcon";
import { IoLogoAppleAppstore } from "react-icons/io5";

export const processSteps = [
  {
    title: "Requirement Analysis",
    description: [
      "We gather and analyze business needs to define clear project goals.",
      "Detailed requirement documentation ensures alignment with client expectations.",
    ],
  },
  {
    title: "Design and Prototyping",
    description: [
      "We create scalable architecture and intuitive UI/UX designs.",
      "Wireframes and prototypes ensure clarity before development begins.",
    ],
  },
  {
    title: "Development and Integration",
    description: [
      "Our developers build robust systems with secure and scalable code.",
      "Third-party services and APIs are integrated seamlessly.",
    ],
  },
  {
    title: "Testing and Quality Assurance",
    description: [
      "We rigorously test functionality, performance, and security.",
      "Our QA process ensures a bug-free and reliable product.",
    ],
  },
  {
    title: "Deployment and Optimization",
    description: [
      "We launch the solution with performance tuning and monitoring.",
      "Continuous optimization ensures adaptability and business readiness.",
    ],
  },
  {
    title: "Training and Support",
    description: [
      "We train your team for smooth adoption and platform management.",
      "Ongoing support and updates guarantee long-term success.",
    ],
  },
];

export const features = [
  {
    title: "Blazing Performance",
    icon: Gauge,
    desc: "Our applications are optimized for lightning-fast performance, ensuring smooth user experiences, reduced load times, and better SEO rankings.",
  },
  {
    title: "Enterprise Security",
    icon: ShieldCheck,
    desc: "We implement robust security measures, from authentication to data protection, safeguarding your platform against vulnerabilities and threats.",
  },
  {
    title: "Developer First",
    icon: Code,
    desc: "Built with modern technologies like Next.js, Node.js, and scalable databases, our stack is clean, modular, and developer-friendly for rapid iteration.",
  },
  {
    title: "Custom Flexibility",
    icon: Wrench,
    desc: "Every project is tailored to your business needs, giving you full flexibility in design, features, and integrations without limitations.",
  },
  {
    title: "Infinite Scalability",
    icon: Infinity,
    desc: "Whether you're starting small or growing to millions of users, our solutions scale seamlessly with your business while maintaining top performance.",
  },
  {
    title: "Enhanced Performance",
    icon: Rocket,
    desc: "From optimized APIs to CDN delivery, we fine-tune every detail to deliver exceptional performance, user engagement, and long-term reliability.",
  },
];

export const webTechStack = [
  {
    title: "Frontend Frameworks",
    stacks: [
      { name: "React", Icon: ReactIcon },
      { name: "Next.js", Icon: NextjsIcon },
      { name: "Tailwind CSS", Icon: TailwindIcon },
      { name: "GSAP", Icon: GSAPIcon },
      { name: "Three.js", Icon: TbBrandThreejs },
      { name: "Framer Motion", Icon: TbBrandFramerMotion },
    ],
  },
  {
    title: "Backend Framework",
    stacks: [
      { name: "Node.js", Icon: NodejsIcon },
      { name: "Express.js", Icon: SiExpress },
      { name: "Supabase", Icon: SupabaseIcon },
    ],
  },
  {
    title: "DataBase",
    stacks: [
      { name: "MongoDb", Icon: SiMongodb },
      { name: "PostgreSQL", Icon: BiLogoPostgresql },
      { name: "Prisma", Icon: SiPrisma },
      { name: "Redis", Icon: DiRedis },
    ],
  },
  {
    title: "AI Platforms",
    stacks: [
      { name: "OpenAI", Icon: OpenAIIcon },
      { name: "PyTorch", Icon: PyTorchIcon },
      { name: "TensorFlow", Icon: TensorFlowIcon },
    ],
  },
  {
    title: "Scalability",
    stacks: [
      { name: "Microservice", Icon: GrServices },
      { name: "Redis", Icon: DiRedis },
      { name: "Kafka", Icon: SiApachekafka },
      { name: "Docker", Icon: FaDocker },
    ],
  },
  {
    title: "Deployment Frameworks",
    stacks: [
      { name: "Netlify", Icon: NetlifyIcon },
      { name: "Vercel", Icon: VercelIcon },
      { name: "Digital Ocean", Icon: DigitalOceanIcon },
      { name: "AWS", Icon: AWSIcon },
      { name: "Firebase", Icon: FirebaseIcon },
    ],
  },
];

export const mobileTechStack = [
  {
    title: "Mobile Frameworks",
    stacks: [
      { name: "React Native", Icon: ReactIcon },
      { name: "Flutter", Icon: FaFlutter },
      { name: "NativeWind", Icon: TailwindIcon },
      { name: "Expo", Icon: ExpoIcon },
    ],
  },
  {
    title: "Backend Framework",
    stacks: [
      { name: "Node.js", Icon: NodejsIcon },
      { name: "Express.js", Icon: SiExpress },
      { name: "Appwrite", Icon: SiAppwrite },
    ],
  },
  {
    title: "DataBase",
    stacks: [
      { name: "MongoDb", Icon: SiMongodb },
      { name: "PostgreSQL", Icon: BiLogoPostgresql },
      { name: "Prisma", Icon: SiPrisma },
      { name: "Redis", Icon: DiRedis },
    ],
  },
  {
    title: "AI Platforms",
    stacks: [
      { name: "OpenAI", Icon: OpenAIIcon },
      { name: "PyTorch", Icon: PyTorchIcon },
      { name: "TensorFlow", Icon: TensorFlowIcon },
    ],
  },
  {
    title: "Deployment Frameworks",
    stacks: [
      { name: "Google Play Store", Icon: FaGooglePlay },
      { name: "Apple App Store", Icon: IoLogoAppleAppstore },
      { name: "Expo App Service", Icon: ExpoIcon },
    ],
  },
];

export const testimonials = [
  {
    id: 1,
    text: "I highly recommend Bishen for any Builder.io and Next.js projects. Their work on our project was exceptional, delivering a high-quality, performant website that exceeded our expectations. They demonstrated excellent technical skills, clear communication, and a strong work ethic throughout the process. The developer's expertise in integrating Builder.io with Next.js resulted in a user-friendly, scalable solution that perfectly met our needs. Their proactive approach and ability to meet deadlines make them a valuable asset to any team. If you're looking for a skilled and reliable developer for your web projects, look no further!",
    author: "Bernd Holbein",
    position: "CEO, Symbiofy & Former Head of Engineering, Google",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face&auto=format",
  },
  {
    id: 2,
    text: "Bishen and his team showed exceptional expertise in React and Node.js development. The project was delivered on time with outstanding code quality and performance optimization. Their attention to detail and collaborative approach made the entire development process smooth and efficient.",
    author: "Carl-Johan Larsson",
    position: "Senior Partnerships Manager, Tech Corp",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face&auto=format",
  },
  {
    id: 3,
    text: "Working with this team was a game-changer for our startup. They built a robust, scalable platform that handles thousands of users seamlessly. Their expertise in modern web technologies and cloud architecture is truly impressive. Highly recommended for any complex web development project.",
    author: "Sarah Mitchell",
    position: "CTO, InnovateLab",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b742?w=64&h=64&fit=crop&crop=face&auto=format",
  },
  {
    id: 4,
    text: "The level of professionalism and technical expertise demonstrated throughout our project was outstanding. They delivered a beautiful, responsive web application that perfectly captured our vision. Their communication was clear, timelines were met, and the final product exceeded all expectations.",
    author: "Michael Chen",
    position: "Founder, Digital Solutions Inc",
    avatar:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=64&h=64&fit=crop&crop=face&auto=format",
  },
];

export const myProjects = [
  {
    title: "🎓 StudyNotion – Learn, Teach, Grow. 📚",
    desc: "StudyNotion is a dynamic ed-tech platform where students can explore and purchase a wide range of courses.It empowers instructors to create, manage, and sell their courses with ease",
    subdesc:
      "The platform features an intuitive dashboard for instructors to analyze performance and engagement.Built for seamless online learning and teaching—anytime, anywhere",
    href: "https://studynotion855.vercel.app/",
    texture: "/models/textures/project3.mp4",
    logo: "/assets/project-logo3.png",
    logoStyle: {
      backgroundColor: "#60f5a1",
      background:
        "linear-gradient(0deg, #60F5A150, #60F5A150), linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(208, 213, 221, 0.8) 100%)",
      border: "0.2px solid rgba(208, 213, 221, 1)",
      boxShadow: "0px 0px 60px 0px rgba(35, 131, 96, 0.3)",
    },
    spotlight: "/assets/spotlight3.png",
    tags: [
      {
        id: 1,
        name: "React.js",
        path: "/assets/react.svg",
        docs: "https://react.dev/learn/installation",
      },
      {
        id: 2,
        name: "TailwindCSS",
        path: "/assets/tailwindcss.png",
        docs: "https://tailwindcss.com/docs/installation/using-vite",
      },
      {
        id: 3,
        name: "Express Js",
        path: "/assets/express.svg",
        docs: "https://expressjs.com/en/starter/installing.html",
      },
      {
        id: 4,
        name: "Mongo Db",
        path: "/assets/mongodb.svg",
        docs: "https://mongoosejs.com/docs/",
      },
    ],
  },

  {
    title: "GlobalMeet – Seamless Video Calling & Online Meeting Platform",
    desc: "GlobalMeet offers real-time video calling with screen sharing, instant and scheduled meetings.It ensures smooth, secure, and high-quality communication across all devices.",
    subdesc:
      "The app also features meeting recording with playback, chat, and lobby controls.Perfect for remote work, virtual events, and online learning environments.",
    href: "https://global-meet.vercel.app/",
    texture: "/models/textures/project1.mp4",
    logo: "/assets/project-logo1.png",
    logoStyle: {
      backgroundColor: "#2A1816",
      border: "0.2px solid #36201D",
      boxShadow: "0px 0px 60px 0px #AA3C304D",
    },
    spotlight: "/assets/spotlight1.png",
    tags: [
      {
        id: 1,
        name: "Figma.js",
        path: "/assets/figma.svg",
        docs: "https://www.figma.com/community/plugin/991866272578143756/figma-docs",
      },
      {
        id: 2,
        name: "Next.js",
        path: "/assets/next.js.svg",
        docs: "https://nextjs.org/docs",
      },
      {
        id: 3,
        name: "TailwindCSS",
        path: "/assets/tailwindcss.png",
        docs: "https://tailwindcss.com/docs/installation/using-vite",
      },
      {
        id: 4,
        name: "TypeScript",
        path: "/assets/typescript.png",
        docs: "https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html",
      },
    ],
  },

  {
    title: "MoveX – Go Anywhere, Anytime! 🚀",
    desc: "MoveX is a fast, reliable, and affordable transportation solution at your fingertips.It offers a smooth user experience for booking rides anytime, anywhere.",
    subdesc:
      "With real-time tracking and smart navigation, finding nearby rides is effortless.Designed for seamless mobility to fit your daily travel needs.",
    href: "https://www.linkedin.com/posts/mohdshahalam855_appdevelopment-reactnative-googlemap-activity-7309548973424291840-VoxL?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEddJO8BeRaLs3I9wdQkQiBhDJmj8KV3bW4",
    texture: "/models/textures/project2.mp4",
    logo: "/assets/project-logo2.png",
    logoStyle: {
      backgroundColor: "#13202F",
      border: "0.2px solid #17293E",
      boxShadow: "0px 0px 60px 0px #2F6DB54D",
    },
    spotlight: "/assets/spotlight2.png",
    tags: [
      {
        id: 1,
        name: "Expo.js",
        path: "/assets/expo.svg",
        docs: "https://docs.expo.dev/get-started/introduction/",
      },
      {
        id: 2,
        name: "TypeScript",
        path: "/assets/typescript.png",
        docs: "https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html",
      },
      {
        id: 3,
        name: "Neon serverless Postgree SQL",
        path: "/assets/neon.svg",
        docs: "https://neon.tech/docs/introduction",
      },
    ],
  },
];

export const teamMembers = [
  {
    name: "Mohd Shahalam",
    role: "CEO & Founder",
    image:
      "https://ik.imagekit.io/aalam855/MyMedia/my-image-icon.png?updatedAt=1757879063971",
  },
  {
    name: "Aman Mirza",
    role: "CTO & Co-Founder",
    image:
      "https://ik.imagekit.io/aalam855/MyMedia/my-image.png?updatedAt=1757879063847",
  },
  {
    name: "Sandeep Yadev",
    role: "Lead Designer",
    image:
      "https://ik.imagekit.io/aalam855/MyMedia/seller-avatar.avif?updatedAt=1757217987681",
  },
];

export const sidebarItems: { Icon: LucideIcon; title: string; href: string }[] =
  [
    {
      Icon: LayoutDashboard,
      title: "Dashboard",
      href: "/dashboard",
    },
    {
      Icon: Briefcase,
      title: "Projects",
      href: "/dashboard/projects",
    },
    {
      Icon: DollarSign,
      title: "Milestones & Payments",
      href: "/dashboard/milestones-payment",
    },
    {
      Icon: Calculator,
      title: "Cost Calculate",
      href: "/cost-analysis",
    },
    {
      Icon: MessageCircle,
      title: "Team Chat",
      href: "/dashboard/chatting",
    },
  ];
