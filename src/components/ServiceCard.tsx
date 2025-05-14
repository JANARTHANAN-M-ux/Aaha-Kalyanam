
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

type ServiceCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
};

const ServiceCard = ({ title, description, icon, path }: ServiceCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 service-card">
      <div className="flex items-center justify-center mb-4">
        <div className="h-16 w-16 bg-primary bg-opacity-20 rounded-full flex items-center justify-center text-primary">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-playfair font-bold text-center mb-2">{title}</h3>
      <p className="text-gray-600 text-center mb-6">{description}</p>
      <div className="text-center">
        <Button asChild className="bg-primary hover:bg-secondary">
          <Link to={path}>Explore Services</Link>
        </Button>
      </div>
    </div>
  );
};

export default ServiceCard;
