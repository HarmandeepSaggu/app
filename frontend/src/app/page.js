"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import { MessageCircle, Users, Zap, Shield, ArrowRight, Menu, X } from 'lucide-react';

export default function ChatAppLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 overflow-hidden">
      {/* Navigation */}
      <nav className="relative z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            YOUR LOGO
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">HOME</a>
            <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">ABOUT</a>
            <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">SERVICE</a>
            <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">CONTACT</a>
          </div>

          <div className="hidden md:flex items-center space-x-4">
           <Link href="/login">
  <span className="w-full block text-center px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-all duration-300 shadow-lg font-medium">
    Sign In
  </span>
</Link>

<Link href="/register">
  <span className="w-full block text-center px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-all duration-300 shadow-lg font-medium">
    Sign Up
  </span>
</Link>

          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-gray-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-2xl p-6 mx-4">
            <div className="flex flex-col space-y-4">
              <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">HOME</a>
              <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">ABOUT</a>
              <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">SERVICE</a>
              <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">CONTACT</a>
              <div className="pt-4 border-t border-gray-200">
                <button className="w-full mb-2 px-4 py-2 text-purple-600 hover:text-purple-700 transition-colors font-medium">
                  Sign Up
                </button>
                <button className="w-full px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-all duration-300 shadow-lg font-medium">
                  Sign In
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="relative px-6 py-12 lg:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="text-gray-800">MOBILE CHAT</span>
                <br />
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  APPLICATION
                </span>
              </h1>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg">
                Connect with friends, family, and colleagues instantly. Experience seamless messaging with our modern, secure, and feature-rich chat platform designed for the mobile-first world.
              </p>
              
              <button className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full hover:shadow-2xl transform hover:scale-105 transition-all duration-300 font-semibold text-lg">
                GET STARTED
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Right Illustration */}
            <div className={`relative transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
              <div className="relative">
                {/* Background Elements */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-3xl transform rotate-3"></div>
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-purple-200 rounded-full opacity-60 animate-pulse"></div>
                <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-blue-200 rounded-full opacity-60 animate-pulse delay-1000"></div>
                
                {/* Main Illustration Container */}
                <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
                  {/* Chat Interface Mockup */}
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                          <MessageCircle className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-semibold text-gray-800">ChatApp</span>
                      </div>
                      <div className="flex space-x-1">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      </div>
                    </div>

                    {/* Chat Messages */}
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                          A
                        </div>
                        <div className="bg-gray-100 rounded-2xl rounded-tl-md px-4 py-2 max-w-xs">
                          <p className="text-gray-800 text-sm">Hey! How's the new chat app coming along?</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3 justify-end">
                        <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl rounded-tr-md px-4 py-2 max-w-xs">
                          <p className="text-white text-sm">It's amazing! The UI is so smooth 🚀</p>
                        </div>
                        <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                          Y
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                          B
                        </div>
                        <div className="bg-gray-100 rounded-2xl rounded-tl-md px-4 py-2 max-w-xs">
                          <p className="text-gray-800 text-sm">Can't wait to try it out! 💬</p>
                        </div>
                      </div>
                    </div>

                    {/* Input Area */}
                    <div className="flex items-center space-x-3 pt-4 border-t border-gray-200">
                      <div className="flex-1 bg-gray-100 rounded-full px-4 py-2">
                        <p className="text-gray-500 text-sm">Type a message...</p>
                      </div>
                      <button className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                        <ArrowRight className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div className="bg-white rounded-full p-3 shadow-lg animate-bounce">
                    <MessageCircle className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                
                <div className="absolute top-1/4 -right-8">
                  <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-full p-2 shadow-lg animate-pulse">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                </div>
                
                <div className="absolute bottom-1/4 -left-8">
                  <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-full p-2 shadow-lg animate-pulse delay-500">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-7xl mx-auto mt-20 lg:mt-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              Why Choose Our <span className="text-purple-600">Chat App?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built with cutting-edge technology for the best messaging experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Instant message delivery with real-time synchronization across all devices"
              },
              {
                icon: Shield,
                title: "Secure & Private",
                description: "End-to-end encryption keeps your conversations safe and private"
              },
              {
                icon: Users,
                title: "Group Chats",
                description: "Create groups, share media, and collaborate with teams effortlessly"
              }
            ].map((feature, index) => (
              <div key={index} className={`bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{transitionDelay: `${600 + index * 200}ms`}}>
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Background Decorations */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-1/4 w-28 h-28 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse delay-2000"></div>
      </div>
    </div>
  );
}
// "use client";
// import React, { useEffect, useRef } from 'react';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// // Register ScrollTrigger plugin
// gsap.registerPlugin(ScrollTrigger);

// const ScrollCards = () => {
//   const containerRef = useRef(null);
//   const cardsRef = useRef([]);

//   const cardsData = [
//     {
//       id: 1,
//       title: "VIDEO EDITING",
//       description: "Focused on crafting engaging, story-driven edits that elevate brand narratives and keep audiences immersed across digital platforms.",
//       image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=300&fit=crop",
//       gradient: "from-purple-500 to-pink-500"
//     },
//     {
//       id: 2,
//       title: "SHOPIFY",
//       description: "Designing smooth, conversion-focused storefronts with custom styling and optimized UX to power standout eCommerce experiences.",
//       image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
//       gradient: "from-blue-500 to-yellow-400"
//     },
//     {
//       id: 3,
//       title: "BRANDING",
//       description: "Strategic identity systems and cohesive visual worlds that capture your voice, resonate with users, and scale across every touchpoint.",
//       image: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=400&h=300&fit=crop",
//       gradient: "from-pink-500 to-orange-400"
//     },
//     {
//       id: 4,
//       title: "WEB DEVELOPMENT",
//       description: "Building responsive, performance-optimized websites with modern frameworks and clean code architecture.",
//       image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop",
//       gradient: "from-green-500 to-teal-400"
//     },
//     {
//       id: 5,
//       title: "UI/UX DESIGN",
//       description: "Creating intuitive user experiences with thoughtful design systems that prioritize usability and aesthetic appeal.",
//       image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&h=300&fit=crop",
//       gradient: "from-indigo-500 to-purple-500"
//     },
//     {
//       id: 6,
//       title: "MOBILE APPS",
//       description: "Developing cross-platform mobile applications with native performance and seamless user interactions.",
//       image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop",
//       gradient: "from-red-500 to-pink-500"
//     }
//   ];

//   useEffect(() => {
//     const cards = cardsRef.current;
    
//     // Set initial state - all cards start from the right
//     gsap.set(cards, {
//       x: 500,
//       opacity: 0,
//       scale: 0.9
//     });

//     // Create scroll triggers for each card
//     cards.forEach((card, index) => {
//       ScrollTrigger.create({
//         trigger: containerRef.current,
//         start: `top+=${index * 200} center`,
//         end: `top+=${index * 200 + 300} center`,
//         scrub: 1,
//         onUpdate: (self) => {
//           const progress = self.progress;
          
//           // Animate current card entering from right
//           gsap.to(card, {
//             x: 500 * (1 - progress),
//             opacity: progress,
//             scale: 0.9 + (0.1 * progress),
//             duration: 0.3,
//             ease: "power2.out"
//           });

//           // Move previous cards to the left when new card appears
//           for (let i = 0; i < index; i++) {
//             const previousCard = cards[i];
//             const leftOffset = (index - i) * 50 * progress; // Each previous card moves 50px left
            
//             gsap.to(previousCard, {
//               x: -leftOffset,
//               scale: 1 - (0.05 * progress * (index - i)), // Slight scale down
//               opacity: 1 - (0.1 * progress * (index - i)), // Slight fade
//               duration: 0.3,
//               ease: "power2.out"
//             });
//           }
//         },
//         onEnter: () => {
//           gsap.to(card, {
//             boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
//             duration: 0.5
//           });
//         },
//         onLeave: () => {
//           gsap.to(card, {
//             boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
//             duration: 0.5
//           });
//         }
//       });
//     });

//     // Cleanup
//     return () => {
//       ScrollTrigger.getAll().forEach(trigger => trigger.kill());
//     };
//   }, []);

//   return (
//     <div className="min-h-screen bg-black text-white overflow-hidden">
//       {/* Header section */}
//       <div className="h-screen flex items-center justify-center">
//         <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
//           Our Services
//         </h1>
//       </div>

//       {/* Cards container - Horizontal stacking */}
//       <div 
//         ref={containerRef}
//         className="relative min-h-[400vh] flex items-center justify-center px-8"
//       >
//         <div className="relative w-full max-w-5xl h-[500px] flex items-center justify-center">
//           {cardsData.map((card, index) => (
//             <div
//               key={card.id}
//               ref={el => cardsRef.current[index] = el}
//               className="absolute w-full max-w-4xl"
//               style={{ zIndex: cardsData.length - index }}
//             >
//               <div className="bg-gray-900 rounded-3xl overflow-hidden shadow-lg border border-gray-800 backdrop-blur-sm">
//                 <div className="grid md:grid-cols-2 gap-0">
//                   {/* Image section */}
//                   <div className="relative h-80 md:h-96 overflow-hidden">
//                     <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-80`}></div>
//                     <img 
//                       src={card.image} 
//                       alt={card.title}
//                       className="w-full h-full object-cover mix-blend-overlay"
//                     />
//                     <div className="absolute inset-0 bg-black bg-opacity-20"></div>
//                   </div>
                  
//                   {/* Content section */}
//                   <div className="p-8 md:p-12 flex flex-col justify-center">
//                     <div className="mb-6">
//                       <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-6">
//                         <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
//                       </div>
//                     </div>
                    
//                     <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
//                       {card.title}
//                     </h2>
                    
//                     <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6">
//                       {card.description}
//                     </p>
                    
//                     <div className="flex items-center space-x-4">
//                       <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-sm font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105">
//                         Learn More
//                       </button>
//                       <div className="w-8 h-8 border border-gray-600 rounded-full flex items-center justify-center hover:border-purple-500 transition-colors cursor-pointer">
//                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                         </svg>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Footer section */}
//       <div className="h-screen flex items-center justify-center">
//         <p className="text-2xl text-gray-400">
//           Keep scrolling to explore more...
//         </p>
//       </div>
//     </div>
//   );
// };

// export default ScrollCards;
