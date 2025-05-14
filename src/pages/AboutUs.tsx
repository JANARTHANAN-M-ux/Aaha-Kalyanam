import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { aboutContent } from '../data/weddingData';

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section
          className="py-80 bg-cover bg-center relative"
          style={{
            backgroundImage:
              "url('https://matrimony.home.blog/wp-content/uploads/2021/09/tamil-wedding.jpg')",
          }}
        >
          <div ></div>
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="text-5xl md:text-6xl font-playfair font-bold text-white mb-6 drop-shadow-lg animate-fade-in">
               <span className="text-black">AAHA</span>{' '}
              <span className="text-black">KALYANAM</span>
            </h1>
            <p className="text-white text-xl max-w-10xl mx-auto drop-shadow-sm">
              Your premier wedding planning partner committed to making your special day perfect.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-orange-50">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="bg-white p-10 rounded-2xl shadow-xl border-l-4 border-orange-300 transition-transform hover:scale-105">
                <h2 className="text-3xl font-bold text-orange-600 mb-4">Our Mission</h2>
                <p className="text-gray-700 leading-relaxed">{aboutContent.mission}</p>
              </div>
              <div className="bg-white p-10 rounded-2xl shadow-xl border-l-4 border-yellow-400 transition-transform hover:scale-105">
                <h2 className="text-3xl font-bold text-yellow-500 mb-4">Our Vision</h2>
                <p className="text-gray-700 leading-relaxed">{aboutContent.vision}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1p5z2dLq6ZQE1eypL9w_2aCO-b-bbLGe_uCHjn4TDa6SYgin81Q&s=10&ec=72940544"
                  alt="Our Story"
                  className="rounded-xl shadow-2xl w-full h-auto"
                />
              </div>
              <div className="md:w-1/2">
                <h2 className="text-4xl font-playfair font-bold mb-4 text-orange-600">Our Story</h2>
                <p className="text-gray-700 leading-relaxed mb-6">{aboutContent.story}</p>
                <div className="bg-orange-50 p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-3 text-orange-500">What Sets Us Apart</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Comprehensive wedding services under one roof</li>
                    <li>Personalized attention to every client</li>
                    <li>Expert team with years of experience</li>
                    <li>Attention to cultural traditions and customs</li>
                    <li>Transparent pricing and no hidden costs</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 bg-orange-50">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-playfair font-bold text-center text-orange-600 mb-12">
              Our Expert Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {aboutContent.team.map((member, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow text-center transform hover:-translate-y-1"
                >
                  <div className="w-24 h-24 bg-orange-100 mx-auto rounded-full flex items-center justify-center mb-4">
                    <span className="text-3xl font-bold text-orange-600">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-orange-500 mb-3">{member.position}</p>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-playfair font-bold text-center text-yellow-500 mb-12">
              Our Achievements
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {aboutContent.achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="bg-orange-50 p-6 rounded-xl shadow-md flex items-start"
                >
                  <div className="h-12 w-12 bg-orange-400 text-white font-bold rounded-full flex items-center justify-center mr-4 shadow-inner">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 leading-relaxed">{achievement}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;
