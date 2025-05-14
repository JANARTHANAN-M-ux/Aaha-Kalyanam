
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
            backgroundImage: "url('https://matrimony.home.blog/wp-content/uploads/2021/09/tamil-wedding.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-60"></div>
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-white mb-6 animate-fade-in">
              About <span className="text-primary">AAHA</span> <span className="text-gold">KALYANAM</span>
            </h1>
            <p className="text-white text-xl max-w-3xl mx-auto">
              Your premier wedding planning partner committed to making your special day perfect.
            </p>
          </div>
        </section>
        
        {/* Mission & Vision */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="bg-gray-50 p-8 rounded-lg shadow-md">
                <h2 className="text-3xl font-playfair font-bold mb-6 text-primary">Our Mission</h2>
                <p className="text-gray-700 leading-relaxed">{aboutContent.mission}</p>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-lg shadow-md">
                <h2 className="text-3xl font-playfair font-bold mb-6 text-gold">Our Vision</h2>
                <p className="text-gray-700 leading-relaxed">{aboutContent.vision}</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Story */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                <img 
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1p5z2dLq6ZQE1eypL9w_2aCO-b-bbLGe_uCHjn4TDa6SYgin81Q&s=10&ec=72940544" 
                  alt="Our Story" 
                  className="rounded-lg shadow-lg w-full h-auto"
                />
              </div>
              
              <div className="md:w-1/2">
                <h2 className="text-3xl font-playfair font-bold mb-6 gradient-text">Our Story</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {aboutContent.story}
                </p>
                <div className="bg-white p-4 rounded-md shadow-sm">
                  <h3 className="text-xl font-bold mb-3 text-primary">What Sets Us Apart</h3>
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
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-center mb-12">
              Our Expert Team
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {aboutContent.team.map((member, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-md text-center">
                  <div className="w-24 h-24 bg-primary bg-opacity-20 mx-auto rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-primary">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                  <p className="text-primary mb-4">{member.position}</p>
                  <p className="text-gray-600">{member.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Achievements */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-center mb-12">
              Our Achievements
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {aboutContent.achievements.map((achievement, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md flex items-center">
                  <div className="h-12 w-12 bg-gold rounded-full flex items-center justify-center text-white mr-4">
                    <span className="font-bold">{index + 1}</span>
                  </div>
                  <p className="text-gray-700">{achievement}</p>
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
