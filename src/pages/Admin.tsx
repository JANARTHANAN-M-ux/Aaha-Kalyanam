import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { mockUsers, mockBookings, mockCancellations, mockServices } from '../data/weddingData'; // Added mockServices
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut, Users, Calendar, AlertCircle, BarChart } from 'lucide-react';

const Admin = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [activeUsers, setActiveUsers] = useState(0);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/dashboard');
    }
    setActiveUsers(Math.floor(Math.random() * 20) + 5);
  }, [user, navigate]);

  if (!user || user.role !== 'admin') {
    return null;
  }

  const todayBookings = mockBookings.filter(booking =>
    new Date(booking.date).toDateString() === new Date().toDateString()
  );

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkAUAERAvvrNZ6rOh_0C2hRZFLq7y3J4Yx4sdxEvcP5nsDuxXelp-hTFLn15P2dxjGtCs&usqp=CAU')", 
        backgroundAttachment: "fixed",
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

            <Button
              variant="ghost"
              onClick={logout}
              className="flex items-center"
            >
              <LogOut size={20} className="mr-2" />
              Logout
            </Button>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-1">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <CardDescription>All registered users</CardDescription>
                </div>
                <Users className="w-6 h-6 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockUsers.length}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {activeUsers} active today
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-1">
                  <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
                  <CardDescription>Confirmed bookings</CardDescription>
                </div>
                <Calendar className="w-6 h-6 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockBookings.length}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {todayBookings.length} new today
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-1">
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

          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="cancellations">Cancellations</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger> {/* Added Services Tab */}
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Dashboard Overview</CardTitle>
                  <CardDescription>
                    Summary of activities across AAHA KALYANAM
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 flex justify-center">
                  <div className="text-center">
                    <BarChart size={80} className="mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-500">
                      Analytics visualization would appear here in a production environment.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Users</CardTitle>
                    <CardDescription>New users who registered recently</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockUsers.slice(0, 3).map((user) => (
                        <div key={user.id} className="border-b pb-4 last:border-0 last:pb-0">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">{user.username}</p>
                              <p className="text-sm text-gray-500">{user.email}</p>
                            </div>
                            <div className="text-sm text-gray-500">
                              Joined On {user.lastLogin}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Bookings</CardTitle>
                    <CardDescription>Latest services booked by users</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockBookings.slice(0, 3).map((booking) => (
                        <div key={booking.id} className="border-b pb-4 last:border-0 last:pb-0">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">{booking.service}</p>
                              <p className="text-sm text-gray-500">By {booking.user}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-primary">₹{booking.amount}</p>
                              <p className="text-sm text-gray-500">{booking.date}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>Registered Users</CardTitle>
                  <CardDescription>All users registered on AAHA KALYANAM</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-md">
                    <div className="grid grid-cols-4 font-medium bg-muted p-4">
                      <div>Username</div>
                      <div>Email</div>
                      <div>Phone Number</div>
                      <div>Last Login</div>
                    </div>
                    {mockUsers.map((user) => (
                      <div key={user.id} className="grid grid-cols-4 p-4 border-t">
                        <div>{user.username}</div>
                        <div>{user.email}</div>
                        <div>{user.phoneNumber}</div>
                        <div>{user.lastLogin}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="bookings">
              <Card>
                <CardHeader>
                  <CardTitle>All Bookings</CardTitle>
                  <CardDescription>Services booked through the platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-md">
                    <div className="grid grid-cols-5 font-medium bg-muted p-4">
                      <div>User</div>
                      <div>Service</div>
                      <div>Date</div>
                      <div>Amount</div>
                      <div>Status</div>
                    </div>
                    {mockBookings.map((booking) => (
                      <div key={booking.id} className="grid grid-cols-5 p-4 border-t">
                        <div>{booking.user}</div>
                        <div>{booking.service}</div>
                        <div>{booking.date}</div>
                        <div>₹{booking.amount.toLocaleString()}</div>
                        <div>
                          <span
                            className={`inline-block px-2 py-1 rounded-full text-xs ${
                              booking.status === 'Confirmed'
                                ? 'bg-green-100 text-green-800'
                                : booking.status === 'Pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {booking.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cancellations">
              <Card>
                <CardHeader>
                  <CardTitle>Cancelled Bookings</CardTitle>
                  <CardDescription>Services that were cancelled by users</CardDescription>
                </CardHeader>
                <CardContent>
                  {mockCancellations.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      No cancellations found
                    </div>
                  ) : (
                    <div className="border rounded-md">
                      <div className="grid grid-cols-5 font-medium bg-muted p-4">
                        <div>User</div>
                        <div>Service</div>
                        <div>Date</div>
                        <div>Amount</div>
                        <div>Reason</div>
                      </div>
                      {mockCancellations.map((cancellation) => (
                        <div key={cancellation.id} className="grid grid-cols-5 p-4 border-t">
                          <div>{cancellation.user}</div>
                          <div>{cancellation.service}</div>
                          <div>{cancellation.date}</div>
                          <div>₹{cancellation.amount}</div>
                          <div>{cancellation.reason}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="services">
              <Card>
                <CardHeader>
                  <CardTitle>Services</CardTitle>
                  <CardDescription>List of available services for users</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockServices.map((service) => (
                      <div key={service.id} className="border-b pb-4 last:border-0 last:pb-0">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">{service.name}</p>
                            <p className="text-sm text-gray-500">{service.description}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-primary">₹{service.price}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Admin;
