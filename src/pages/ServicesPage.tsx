import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wrench, Disc, Cpu, Car, Zap, Settings, Shield, Droplets } from 'lucide-react';

const allServices = [
  {
    icon: Wrench,
    title: 'Oil Change & Maintenance',
    description: 'Complete oil change service with premium motor oil, filter replacement, and comprehensive vehicle inspection.',
    price: 'From $35',
    duration: '30 minutes',
    includes: ['Premium motor oil', 'Oil filter replacement', '21-point inspection', 'Fluid level check']
  },
  {
    icon: Disc,
    title: 'Brake Services',
    description: 'Professional brake inspection, repair, and replacement services for optimal safety and performance.',
    price: 'From $89',
    duration: '1-2 hours',
    includes: ['Brake system inspection', 'Pad replacement', 'Rotor resurfacing', 'Brake fluid check']
  },
  {
    icon: Cpu,
    title: 'Engine Diagnostics',
    description: 'Advanced computer diagnostics to identify and resolve engine issues quickly and accurately.',
    price: 'From $120',
    duration: '45 minutes',
    includes: ['Computer scan', 'Error code analysis', 'Performance testing', 'Repair recommendations']
  },
  {
    icon: Car,
    title: 'Tire Services',
    description: 'Complete tire services including installation, rotation, balancing, and wheel alignment.',
    price: 'From $25',
    duration: '30-45 minutes',
    includes: ['Tire rotation', 'Wheel balancing', 'Alignment check', 'Pressure monitoring']
  },
  {
    icon: Zap,
    title: 'Electrical Systems',
    description: 'Comprehensive electrical system diagnosis and repair including battery, alternator, and starter.',
    price: 'From $75',
    duration: '1-3 hours',
    includes: ['Battery testing', 'Alternator check', 'Starter inspection', 'Wiring diagnosis']
  },
  {
    icon: Settings,
    title: 'Transmission Service',
    description: 'Professional transmission maintenance and repair to ensure smooth shifting and longevity.',
    price: 'From $150',
    duration: '2-4 hours',
    includes: ['Fluid change', 'Filter replacement', 'System inspection', 'Performance testing']
  },
  {
    icon: Shield,
    title: 'AC & Heating',
    description: 'Complete climate control system service to keep you comfortable year-round.',
    price: 'From $95',
    duration: '1-2 hours',
    includes: ['AC inspection', 'Refrigerant check', 'Heater testing', 'Filter replacement']
  },
  {
    icon: Droplets,
    title: 'Coolant System',
    description: 'Cooling system maintenance and repair to prevent engine overheating and damage.',
    price: 'From $80',
    duration: '1 hour',
    includes: ['Coolant flush', 'Radiator inspection', 'Thermostat check', 'Hose examination']
  }
];

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-garage-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Services
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional automotive repair and maintenance services with transparent pricing 
            and guaranteed quality workmanship.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allServices.map((service, index) => (
              <Card key={index} className="bg-card border-border hover:border-primary/50 transition-all duration-300 group hover:shadow-lg">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <service.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{service.price}</div>
                      <div className="text-sm text-muted-foreground">{service.duration}</div>
                    </div>
                  </div>
                  <CardTitle className="text-xl text-foreground">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-foreground mb-2">What's Included:</h4>
                    <ul className="space-y-1">
                      {service.includes.map((item, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-center">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button 
                    className="w-full bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary"
                    onClick={() => window.location.href = '/book'}
                  >
                    Book This Service
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-garage-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Need a Custom Service?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Don't see what you're looking for? Contact us for custom automotive solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary"
              onClick={() => window.location.href = '/contact'}
            >
              Contact Us
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-muted-foreground text-muted-foreground hover:border-primary hover:text-primary"
              onClick={() => window.location.href = '/book'}
            >
              Book a Service
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicesPage;