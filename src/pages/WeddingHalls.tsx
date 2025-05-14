
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { weddingHalls } from '../data/weddingData';
import { useCart } from '../contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search,
  Calendar,
  MapPin,
  Users,
  IndianRupee
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

const WeddingHalls = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedHall, setSelectedHall] = useState<typeof weddingHalls[0] | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [sortBy, setSortBy] = useState<'default' | 'priceAsc' | 'priceDesc'>('default');
  const [filterBooked, setFilterBooked] = useState(false);
  
  const { addToCart } = useCart();
  
  const filteredHalls = weddingHalls.filter(hall => {
    const matchesSearch = hall.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hall.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    // For the "Show only available halls" filter
    if (filterBooked) {
      const today = new Date().toISOString().split('T')[0];
      const isBooked = hall.bookedDates.includes(today);
      return matchesSearch && !isBooked;
    }
    
    return matchesSearch;
  });
  
  const sortedHalls = [...filteredHalls].sort((a, b) => {
    if (sortBy === 'priceAsc') {
      return a.price - b.price;
    } else if (sortBy === 'priceDesc') {
      return b.price - a.price;
    }
    return 0;
  });
  
  const handleConfirmBooking = () => {
    if (selectedHall) {
      addToCart({
        id: selectedHall.id,
        type: 'hall',
        name: selectedHall.name,
        price: selectedHall.price,
        location: selectedHall.location,
        image: selectedHall.image,
        capacity: selectedHall.capacity,
        details: selectedHall.details
      });
      setShowDetails(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section 
          className="py-80 bg-cover bg-center relative"
          style={{ 
            backgroundImage: "url('http://i.pinimg.com/originals/3d/6c/95/3d6c95ba4baa025bbed3d6927f8f6a01.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-60"></div>
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-white mb-6 animate-fade-in">
              Wedding Halls
            </h1>
            <p className="text-white text-xl max-w-3xl mx-auto">
              Find the perfect venue for your dream wedding ceremony
            </p>
          </div>
        </section>
        
        {/* Search & Filter Section */}
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <Input
                    type="text"
                    placeholder="Search by location or hall name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <div className="flex gap-4">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'default' | 'priceAsc' | 'priceDesc')}
                    className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="default">Sort by</option>
                    <option value="priceAsc">Price: Low to High</option>
                    <option value="priceDesc">Price: High to Low</option>
                  </select>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="filterBooked"
                      checked={filterBooked}
                      onChange={() => setFilterBooked(!filterBooked)}
                      className="mr-2"
                    />
                    <label htmlFor="filterBooked">Show only available halls</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Halls Grid Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {filteredHalls.length === 0 ? (
              <div className="text-center py-10">
                <h3 className="text-xl font-medium">No wedding halls found for "{searchTerm}"</h3>
                <p className="mt-2 text-gray-600">Try another location or clear your search</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sortedHalls.map((hall) => (
                  <div key={hall.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow card-hover">
                    <div className="h-56 overflow-hidden">
                      <img 
                        src={hall.image} 
                        alt={hall.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold font-playfair mb-2">{hall.name}</h3>
                      
                      <div className="flex items-center mb-2 text-gray-600">
                        <MapPin size={16} className="mr-2" />
                        <span>{hall.location}</span>
                      </div>
                      
                      <div className="flex items-center mb-2 text-gray-600">
                        <Users size={16} className="mr-2" />
                        <span>Capacity: {hall.capacity} guests</span>
                      </div>
                      
                      <div className="flex items-center mb-4 text-primary font-semibold">
                        <IndianRupee size={16} className="mr-2" />
                        <span>{hall.price.toLocaleString()}</span>
                      </div>
                      
                      <Button 
                        variant="outline"
                        onClick={() => {
                          setSelectedHall(hall);
                          setShowDetails(true);
                        }}
                        className="w-full"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      
      {/* Hall Details Dialog */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-playfair">{selectedHall?.name}</DialogTitle>
          </DialogHeader>
          
          {selectedHall && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <img 
                  src={selectedHall.image} 
                  alt={selectedHall.name}
                  className="w-full h-64 object-cover rounded-md" 
                />
              </div>
              
              <div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-500">Location</h4>
                    <p className="flex items-center">
                      <MapPin size={16} className="mr-2 text-primary" />
                      {selectedHall.location}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-500">Price</h4>
                    <p className="flex items-center text-lg font-semibold">
                      <IndianRupee size={16} className="mr-2 text-primary" />
                      {selectedHall.price.toLocaleString()}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-500">Capacity</h4>
                    <p className="flex items-center">
                      <Users size={16} className="mr-2 text-primary" />
                      {selectedHall.capacity} guests
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-500">Available Dates</h4>
                    <div className="flex items-start">
                      <Calendar size={16} className="mr-2 mt-1 text-primary" />
                      <p className="text-sm">
                        Not available on: {selectedHall.bookedDates.join(', ')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-2">
                <h4 className="font-medium text-gray-500 mb-2">Details</h4>
                <p className="text-gray-700">{selectedHall.details}</p>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDetails(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmBooking}>
              Confirm Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default WeddingHalls;
