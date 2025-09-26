"use client";
import { Paperclip, Phone, Send, Video } from "lucide-react";
import React, { useState } from "react";

const Page = () => {
  const chatMessages = [
    {
      id: 1,
      sender: "Sarah Wilson",
      role: "Project Manager",
      message:
        "Good morning! The design phase has been completed and is ready for your review.",
      time: "9:30 AM",
      avatar: "SW",
      isTeam: true,
    },
    {
      id: 2,
      sender: "You",
      role: "Client",
      message:
        "Great work! I love the color scheme. Can we make the header section a bit taller?",
      time: "10:15 AM",
      avatar: "JD",
      isTeam: false,
    },
    {
      id: 3,
      sender: "Mike Chen",
      role: "Lead Developer",
      message:
        "Absolutely! I'll adjust the header height. Also, development phase 1 is starting today.",
      time: "10:45 AM",
      avatar: "MC",
      isTeam: true,
    },
    {
      id: 4,
      sender: "Sarah Wilson",
      role: "Project Manager",
      message:
        "Perfect! Mike will have the development environment ready by EOD. You'll receive preview links soon.",
      time: "11:20 AM",
      avatar: "SW",
      isTeam: true,
    },
    {
      id: 5,
      sender: "You",
      role: "Client",
      message:
        "Great work! I love the color scheme. Can we make the header section a bit taller?",
      time: "10:15 AM",
      avatar: "JD",
      isTeam: false,
    },
    {
      id: 6,
      sender: "Sarah Wilson",
      role: "Project Manager",
      message:
        "Perfect! Mike will have the development environment ready by EOD. You'll receive preview links soon.",
      time: "11:20 AM",
      avatar: "SW",
      isTeam: true,
    },
    {
      id: 7,
      sender: "You",
      role: "Client",
      message:
        "Great work! I love the color scheme. Can we make the header section a bit taller?",
      time: "10:15 AM",
      avatar: "JD",
      isTeam: false,
    },
  ];

  const [chatMessage, setChatMessage] = useState("");

  return (
    <div className="bg-[#000a0e] h-[calc(100vh-48px)] sm:h-screen w-full flex flex-col">
      {/* Chat Header */}
      <div className="p-3 sm:p-4 md:p-6 border-b border-[#50585b] flex-shrink-0">
        <div className="flex justify-between items-center">
          <div className="min-w-0 flex-1">
            <h2 className="text-lg sm:text-xl font-bold text-[#dceff8] truncate">
              Team Chat
            </h2>
            <p className="text-xs sm:text-sm text-[#017dae] truncate">
              Direct communication with your development team
            </p>
          </div>
          <div className="flex space-x-1 sm:space-x-2 ml-2">
            <button className="p-1.5 sm:p-2 text-[#dceff8] hover:bg-[#001721] rounded-lg transition-colors">
              <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button className="p-1.5 sm:p-2 text-[#dceff8] hover:bg-[#001721] rounded-lg transition-colors">
              <Video className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4">
        {chatMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.isTeam ? "justify-start" : "justify-end"}`}
          >
            <div
              className={`flex items-center space-x-2 sm:space-x-3 w-full gap-1 max-w-[70%] sm:max-w-[85%] md:max-w-md lg:max-w-lg ${
                msg.isTeam ? "" : "flex-row-reverse space-x-reverse"
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-semibold flex-shrink-0 ${
                  msg.isTeam ? "bg-blue-300 m-0!" : "bg-blue-600 m-0!"
                }`}
              >
                {msg.avatar}
              </div>

              {/* Chat Bubble */}
              <div
                className={`p-3 sm:p-4 rounded-2xl min-w-0 flex-1 ${
                  msg.isTeam ? "bg-[#1a2f3a]" : "bg-[#017dae]"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 mb-1">
                  <span className="font-semibold text-xs sm:text-sm text-[#dceff8]">
                    {msg.sender}
                  </span>
                  <span className="text-xs text-[#7eb3cc] sm:text-[#a0c4d0]">
                    {msg.role}
                  </span>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed text-[#dceff8] break-words">
                  {msg.message}
                </p>
                <p className="text-xs mt-2 text-[#7eb3cc]">{msg.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <div className="p-3 sm:p-[13px] border-t border-[#50585b] flex-shrink-0">
        <div className="flex space-x-2 sm:space-x-3">
          <button className="p-2 text-[#dceff8] hover:bg-[#001721] rounded-lg transition-colors flex-shrink-0">
            <Paperclip className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <input
            type="text"
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            placeholder="Type your message here..."
            className="flex-1 border border-[#50585b] bg-[#001721] text-[#dceff8] placeholder-[#7eb3cc] rounded-lg px-3 sm:px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#017dae] focus:border-transparent"
            onKeyPress={(e) => e.key === "Enter" && setChatMessage("")}
          />
          <button
            onClick={() => setChatMessage("")}
            className="bg-[#017dae] text-white p-2 rounded-lg hover:bg-[#015a7f] transition-colors flex-shrink-0"
          >
            <Send className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
