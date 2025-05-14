
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { IndianRupee, ShoppingCart, Trash, Calendar, User, Phone } from 'lucide-react';
import { toast } from 'sonner';

const Cart = () => {
  const { items, removeFromCart, clearCart, getTotalPrice } = useCart();
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [weddingDate, setWeddingDate] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const handleProceedPayment = () => {
    if (!username || !phoneNumber || !bookingDate || !weddingDate || !paymentMethod) {
      toast.error('Please fill in all fields');
      return;
    }

    // Simulate payment processing
    toast.success('Payment successful! Your bookings have been confirmed.');
    clearCart();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-playfair font-bold mb-8 flex items-center">
            <ShoppingCart className="mr-3" size={32} /> Your Cart
          </h1>
          
          {items.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h2 className="text-2xl font-medium mb-4">Your cart is empty</h2>
              <p className="text-gray-600 mb-6">
                Add some wedding services to your cart to get started with your wedding planning.
              </p>
              <Button asChild>
                <a href="/dashboard">Browse Services</a>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-6">
                {items.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col md:flex-row">
                    <div className="md:w-1/3 h-48 mb-4 md:mb-0 md:mr-6">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    
                    <div className="md:w-2/3">
                      <div className="flex justify-between">
                        <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500"
                        >
                          <Trash size={18} />
                        </Button>
                      </div>
                      
                      <p className="text-gray-600 mb-2">
                        Type: {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                      </p>
                      
                      {item.location && (
                        <p className="text-gray-600 mb-2">Location: {item.location}</p>
                      )}
                      
                      {item.capacity && (
                        <p className="text-gray-600 mb-2">Capacity: {item.capacity} guests</p>
                      )}
                      
                      <div className="flex items-center text-primary font-semibold mt-4">
                        <IndianRupee size={16} className="mr-1" />
                        <span>
                          {item.price.toLocaleString()}
                          {item.type === 'catering' && ' per plate'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Order Summary and Checkout */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold mb-6 border-b pb-4">Booking Details</h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <Input
                          id="username"
                          type="text"
                          placeholder="Your full name"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <Input
                          id="phoneNumber"
                          type="tel"
                          placeholder="Your phone number"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="bookingDate" className="block text-sm font-medium text-gray-700">
                        Booking Date
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <Input
                          id="bookingDate"
                          type="date"
                          value={bookingDate}
                          onChange={(e) => setBookingDate(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="weddingDate" className="block text-sm font-medium text-gray-700">
                        Wedding Date
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <Input
                          id="weddingDate"
                          type="date"
                          value={weddingDate}
                          onChange={(e) => setWeddingDate(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">
                        Payment Method
                      </label>
                      <select
                        id="paymentMethod"
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Select payment method</option>
                        <option value="creditCard">Credit Card</option>
                        <option value="debitCard">Debit Card</option>
                        <option value="upi">UPI</option>
                        <option value="netBanking">Net Banking</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mt-8 border-t pt-6">
                    <div className="flex justify-between text-xl font-semibold">
                      <span>Total Amount</span>
                      <div className="flex items-center text-primary">
                        <IndianRupee size={18} />
                        <span>{getTotalPrice().toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex gap-4">
                      <Button variant="outline" onClick={clearCart} className="flex-1">
                        Clear Cart
                      </Button>
                      <Button onClick={handleProceedPayment} className="flex-1">
                        Proceed Payment
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
