"use client";
import { teamMembers } from "@/constants";
import BookNow from "@/shared/custom-components/BookNow";
import { Eye, Heart, Star } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
const targets = { projects: 50, clients: 25, satisfaction: 99 };

const AboutPage = () => {
  const [animatedStats, setAnimatedStats] = useState({
    projects: 0,
    clients: 0,
    satisfaction: 0,
  });

  const statsRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Animate numbers when stats section comes into view
  useEffect(() => {
    const animateStats = () => {
      const duration = 2000;
      const steps = 60;
      const stepTime = duration / steps;

      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;

        setAnimatedStats({
          projects: Math.floor(targets.projects * progress),
          clients: Math.floor(targets.clients * progress),
          satisfaction: Math.floor(targets.satisfaction * progress),
        });

        if (step >= steps) {
          clearInterval(timer);
          setAnimatedStats(targets);
        }
      }, stepTime);
    };
    animateStats();
    setHasAnimated(true);
  }, [hasAnimated]);

  return (
    <div className="relative bg-gradient-to-br from-blue-500 to-blue-300">
      <div className="w-11/12 mx-auto px-4 pt-[150px] pb-10">
        {/* Hero Section */}
        <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-blue-100 mb-2 drop-shadow-lg">
          About WebVirtus
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-blue-200 leading-relaxed">
          Empowering businesses through innovative web and mobile solutions.
        </p>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8 my-5 md:my-10">
          {[
            {
              title: "Our Mission",
              icon: Heart,
              desc: "To empower businesses with cutting-edge IT solutions that drive growth, enhance security, and optimize performance. We aim to build lasting partnerships through exceptional customer service and innovation.",
            },
            {
              title: "Our Vision",
              icon: Eye,
              desc: "To be a leading provider of IT services globally, delivering innovative, scalable, and secure solutions that enable businesses to transform and excel in the digital era.",
            },
            {
              title: "Our Promise",
              icon: Star,
              desc: "We promise to deliver solutions that not only meet but exceed your expectations, ensuring your IT systems are secure, efficient, and aligned with your business objectives.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-blue-300 to-blue-400 backdrop-blur-lg rounded-2xl p-8 shadow-xl border flex flex-col items-center justify-center gap-4 group"
            >
              <div className="bg-blue-100 p-5 rounded-full group-hover:scale-115 transition-all duration-300">
                <item.icon />
              </div>
              <h2 className="text-2xl font-bold text-white relative">
                {item.title}
              </h2>
              <p className="text-sm text-gray-500 text-center">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div
          ref={statsRef}
          className="bg-gradient-to-br from-blue-100 to-blue-300 rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 mb-8 sm:mb-12 md:mb-16 lg:mb-20 shadow-2xl border border-blue-100/30"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-center text-white">
            <div className="space-y-2 sm:space-y-3 p-3 sm:p-4 max-lg:border-b backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold drop-shadow-lg">
                {animatedStats.projects}+
              </div>
              <div className="text-sm sm:text-base md:text-lg opacity-90 leading-tight font-medium">
                Projects Delivered
              </div>
            </div>
            <div className="space-y-2 sm:space-y-3 p-3 sm:p-4 max-lg:border-b backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold drop-shadow-lg">
                {animatedStats.clients}+
              </div>
              <div className="text-sm sm:text-base md:text-lg opacity-90 leading-tight font-medium">
                Happy Clients
              </div>
            </div>
            <div className="space-y-2 sm:space-y-3 p-3 sm:p-4 max-lg:border-b backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold drop-shadow-lg">
                {animatedStats.satisfaction}%
              </div>
              <div className="text-sm sm:text-base md:text-lg opacity-90 leading-tight font-medium">
                Client Satisfaction
              </div>
            </div>
            <div className="space-y-2 sm:space-y-3 p-3 sm:p-4 border-0 sm:border-b lg:border-0 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold drop-shadow-lg">
                24/7
              </div>
              <div className="text-sm sm:text-base md:text-lg opacity-90 leading-tight font-medium">
                Support Available
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-gradient-to-br from-blue-300/50 to-blue-400/50 rounded-3xl p-12 shadow-2xl border">
          <h2 className="text-4xl font-bold text-blue-50 text-center mb-12">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="flex flex-col justify-center items-center gap-6 p-6 bg-[#00151e] rounded-2xl shadow-lg"
              >
                <Image
                  src={member.image}
                  width={80}
                  height={90}
                  objectFit="contain"
                  alt="User Image"
                  className="rounded-full"
                />
                <div className="flex flex-col items-center justify-center gap-">
                  <h3 className="text-xl font-semibold text-blue-50">
                    {member.name}
                  </h3>
                  <p className="text-blue-200 font-medium">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BookNow />
    </div>
  );
};

export default AboutPage;
