import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { mockUsers, mockBookings, mockCancellations } from '../data/weddingData';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { LogOut, Users, Calendar, AlertCircle, PlusCircle, BarChart } from 'lucide-react';

const Admin = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [activeUsers, setActiveUsers] = useState(0);

  const [serviceName, setServiceName] = useState('');
  const [serviceCategory, setServiceCategory] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');
  const [servicePrice, setServicePrice] = useState('');
  const [serviceImage, setServiceImage] = useState('');

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/dashboard');
    }
    setActiveUsers(Math.floor(Math.random() * 20) + 5);
  }, [user, navigate]);

  if (!user || user.role !== 'admin') {
    return null;
  }

  const todayBookings = mockBookings.filter(
    (booking) => new Date(booking.date).toDateString() === new Date().toDateString()
  );

  const handleAddService = (e) => {
    e.preventDefault();
    const newService = {
      name: serviceName,
      category: serviceCategory,
      description: serviceDescription,
      price: servicePrice,
      image: serviceImage,
    };
    console.log('New service added:', newService);
    alert('Service added successfully!');
    setServiceName('');
    setServiceCategory('');
    setServiceDescription('');
    setServicePrice('');
    setServiceImage('');
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkAUAERAvvrNZ6rOh_0C2hRZFLq7y3J4Yx4sdxEvcP5nsDuxXelp-hTFLn15P2dxjGtCs&usqp=CAU')",
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="bg-white/80 min-h-screen">
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-playfair font-bold">
                <span className="text-primary">Admin</span> <span className="text-gold">Dashboard</span>
              </h1>
              <p className="text-gray-600 text-sm">Welcome back, {user.username}</p>
            </div>
            <Button variant="ghost" onClick={logout} className="flex items-center">
              <LogOut size={20} className="mr-2" />
              Logout
            </Button>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-8 flex flex-wrap gap-2">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="cancellations">Cancellations</TabsTrigger>
              <TabsTrigger value="add-service">Add Service</TabsTrigger>
            </TabsList>

            {/* Overview */}
            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div>
                      <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                      <CardDescription>All registered users</CardDescription>
                    </div>
                    <Users className="w-6 h-6 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{mockUsers.length}</div>
                    <p className="text-xs text-muted-foreground mt-1">{activeUsers} active today</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div>
                      <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
                      <CardDescription>Confirmed bookings</CardDescription>
                    </div>
                    <Calendar className="w-6 h-6 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{mockBookings.length}</div>
                    <p className="text-xs text-muted-foreground mt-1">{todayBookings.length} new today</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div>
                      <CardTitle className="text-sm font-medium">Cancellations</CardTitle>
                      <CardDescription>Total cancellations</CardDescription>
                    </div>
                    <AlertCircle className="w-6 h-6 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{mockCancellations.length}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Last cancellation on {mockCancellations[0]?.date}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Users Tab */}
            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>Registered Users</CardTitle>
                  <CardDescription>List of users who have registered</CardDescription>
                </CardHeader>
                <CardContent className="overflow-x-auto">
                  <table className="min-w-full text-sm border">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 text-left">Username</th>
                        <th className="px-4 py-2 text-left">Email</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockUsers.map((user, index) => (
                        <tr key={index} className="border-t">
                          <td className="px-4 py-2">{user.username}</td>
                          <td className="px-4 py-2">{user.email}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Bookings Tab */}
            <TabsContent value="bookings">
              <Card>
                <CardHeader>
                  <CardTitle>All Bookings</CardTitle>
                  <CardDescription>Confirmed user bookings</CardDescription>
                </CardHeader>
                <CardContent className="overflow-x-auto">
                  <table className="min-w-full text-sm border">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 text-left">Username</th>
                        <th className="px-4 py-2 text-left">Service</th>
                        <th className="px-4 py-2 text-left">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockBookings.map((booking, index) => (
                        <tr key={index} className="border-t">
                          <td className="px-4 py-2">{booking.username}</td>
                          <td className="px-4 py-2">{booking.service}</td>
                          <td className="px-4 py-2">{booking.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Cancellations Tab */}
            <TabsContent value="cancellations">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Cancellations</CardTitle>
                  <CardDescription>Bookings cancelled by users</CardDescription>
                </CardHeader>
                <CardContent className="overflow-x-auto">
                  <table className="min-w-full text-sm border">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 text-left">Username</th>
                        <th className="px-4 py-2 text-left">Service</th>
                        <th className="px-4 py-2 text-left">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockCancellations.map((cancel, index) => (
                        <tr key={index} className="border-t">
                          <td className="px-4 py-2">{cancel.username}</td>
                          <td className="px-4 py-2">{cancel.service}</td>
                          <td className="px-4 py-2">{cancel.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Add Service Tab */}
            <TabsContent value="add-service">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PlusCircle className="w-5 h-5 text-primary" />
                    Add New Service
                  </CardTitle>
                  <CardDescription>Enter new wedding-related service details</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddService} className="space-y-6">
                    <div>
                      <Label htmlFor="serviceName">Service Name</Label>
                      <Input
                        id="serviceName"
                        value={serviceName}
                        onChange={(e) => setServiceName(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="serviceCategory">Category</Label>
                      <Input
                        id="serviceCategory"
                        value={serviceCategory}
                        onChange={(e) => setServiceCategory(e.target.value)}
                        placeholder="e.g., Catering, Hall"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="serviceDescription">Description</Label>
                      <Textarea
                        id="serviceDescription"
                        value={serviceDescription}
                        onChange={(e) => setServiceDescription(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="servicePrice">Price (₹)</Label>
                      <Input
                        id="servicePrice"
                        type="number"
                        value={servicePrice}
                        onChange={(e) => setServicePrice(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="serviceImage">Image URL</Label>
                      <Input
                        id="serviceImage"
                        type="url"
                        value={serviceImage}
                        onChange={(e) => setServiceImage(e.target.value)}
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Add Service
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>

        <footer className="bg-white py-4 border-t mt-8">
          <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
            © {new Date().getFullYear()} AAHA KALYANAM Admin Dashboard. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Admin;
