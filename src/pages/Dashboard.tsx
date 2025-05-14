
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ImageSlider from '../components/ImageSlider';
import ServiceCard from '../components/ServiceCard';
import { useAuth } from '../contexts/AuthContext';
import { 
  Home, 
  Camera, 
  Palette, 
  Utensils, 
  ShoppingCart, 
  User 
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Slider */}
        <ImageSlider />
        
        {/* Welcome Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6">
              Welcome, <span className="text-primary">{user?.username}</span>!
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 italic mb-8 max-w-3xl mx-auto gradient-text animate-fade-in">
              "Creating unforgettable moments for your most precious day."
            </p>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our comprehensive wedding services designed to make your wedding planning journey smooth and enjoyable. 
              From magnificent venues to exquisite catering, we have everything to make your special day perfect.
            </p>
          </div>
        </section>
        
        {/* Services Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-center mb-12">
              Our Premium Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ServiceCard 
                title="Wedding Halls" 
                description="Discover premium venues for your perfect ceremony." 
                icon={<Home size={32} />}
                path="/wedding-halls"
              />
              
              <ServiceCard 
                title="Photography" 
                description="Capture your special moments with our expert photographers." 
                icon={<Camera size={32} />}
                path="/photography"
              />
              
              <ServiceCard 
                title="Decors" 
                description="Transform your venue with exquisite decoration packages." 
                icon={<Palette size={32} />}
                path="/decors"
              />
              
              <ServiceCard 
                title="Catering" 
                description="Delight your guests with our gourmet catering services." 
                icon={<Utensils size={32} />}
                path="/catering"
              />
              
              <ServiceCard 
                title="Your Cart" 
                description="View and manage your selected services." 
                icon={<ShoppingCart size={32} />}
                path="/cart"
              />
              
              <ServiceCard 
                title="Admin Panel" 
                description="Manage bookings and user information (Admin only)." 
                icon={<User size={32} />}
                path="/admin"
              />
            </div>
          </div>
        </section>
        
        {/* Testimonial Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-center mb-12">
              What Our Clients Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <p className="text-gray-600 italic mb-4">
                  "AAHA KALYANAM made our wedding planning journey so smooth and stress-free. Their attention to detail and dedication is unmatched."
                </p>
                <p className="font-semibold">- Priya & Karthik</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <p className="text-gray-600 italic mb-4">
                  "The decor was exactly as we envisioned. Everyone was amazed by how beautiful our venue looked. Thank you for making our day special!"
                </p>
                <p className="font-semibold">- Meera & Ajay</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <p className="text-gray-600 italic mb-4">
                  "The photography team captured every precious moment perfectly. We will treasure these memories forever. Highly recommended!"
                </p>
                <p className="font-semibold">- Deepa & Vikram</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
