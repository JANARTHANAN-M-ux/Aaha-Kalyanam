
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { decorPackages } from '../data/weddingData';
import { useCart } from '../contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search,
  Palette,
  Calendar,
  IndianRupee
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

const Decors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPackage, setSelectedPackage] = useState<typeof decorPackages[0] | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [sortBy, setSortBy] = useState<'default' | 'priceAsc' | 'priceDesc'>('default');
  const [filterBooked, setFilterBooked] = useState(false);
  
  const { addToCart } = useCart();
  
  const filteredPackages = decorPackages.filter(pkg => {
    const matchesSearch = pkg.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    // For the "Show only available packages" filter
    if (filterBooked) {
      const today = new Date().toISOString().split('T')[0];
      const isBooked = pkg.bookedDates.includes(today);
      return matchesSearch && !isBooked;
    }
    
    return matchesSearch;
  });
  
  const sortedPackages = [...filteredPackages].sort((a, b) => {
    if (sortBy === 'priceAsc') {
      return a.price - b.price;
    } else if (sortBy === 'priceDesc') {
      return b.price - a.price;
    }
    return 0;
  });
  
  const handleConfirmBooking = () => {
    if (selectedPackage) {
      addToCart({
        id: selectedPackage.id,
        type: 'decor',
        name: selectedPackage.name,
        price: selectedPackage.price,
        image: selectedPackage.image,
        details: selectedPackage.details
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
            backgroundImage: "url('https://wedapz.com/admin-panel/uploads/280853361_384119363729222_2297653372056721864_n.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-60"></div>
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-white mb-6 animate-fade-in">
              Decoration Services
            </h1>
            <p className="text-white text-xl max-w-3xl mx-auto">
              Transform your venue with our exquisite decoration packages
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
                    placeholder="Search decoration packages..."
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
                    <label htmlFor="filterBooked">Show only available packages</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Decor Packages Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {filteredPackages.length === 0 ? (
              <div className="text-center py-10">
                <h3 className="text-xl font-medium">No decoration packages found for "{searchTerm}"</h3>
                <p className="mt-2 text-gray-600">Try another search term or clear your search</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sortedPackages.map((pkg) => (
                  <div key={pkg.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow card-hover">
                    <div className="h-56 overflow-hidden">
                      <img 
                        src={pkg.image} 
                        alt={pkg.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold font-playfair mb-2">{pkg.name}</h3>
                      
                      <div className="flex items-center mb-4 text-primary font-semibold">
                        <IndianRupee size={16} className="mr-2" />
                        <span>{pkg.price.toLocaleString()}</span>
                      </div>
                      
                      <Button 
                        variant="outline"
                        onClick={() => {
                          setSelectedPackage(pkg);
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
      
      {/* Package Details Dialog */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-playfair">{selectedPackage?.name}</DialogTitle>
          </DialogHeader>
          
          {selectedPackage && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <img 
                  src={selectedPackage.image} 
                  alt={selectedPackage.name}
                  className="w-full h-64 object-cover rounded-md" 
                />
              </div>
              
              <div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-500">Decoration Style</h4>
                    <p className="flex items-center">
                      <Palette size={16} className="mr-2 text-primary" />
                      {selectedPackage.name}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-500">Price</h4>
                    <p className="flex items-center text-lg font-semibold">
                      <IndianRupee size={16} className="mr-2 text-primary" />
                      {selectedPackage.price.toLocaleString()}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-500">Available Dates</h4>
                    <div className="flex items-start">
                      <Calendar size={16} className="mr-2 mt-1 text-primary" />
                      <p className="text-sm">
                        Not available on: {selectedPackage.bookedDates.join(', ')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-2">
                <h4 className="font-medium text-gray-500 mb-2">Package Details</h4>
                <p className="text-gray-700">{selectedPackage.details}</p>
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

export default Decors;
