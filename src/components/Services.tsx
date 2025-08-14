import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wrench, Disc, Cpu, Car, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: Wrench,
    title: 'Oil Change',
    description: 'Complete oil change service with premium motor oil and filter replacement.',
    price: 'From $35',
    features: ['Premium motor oil', 'Filter replacement', '21-point inspection']
  },
  {
    icon: Disc,
    title: 'Brake Repair',
    description: 'Professional brake inspection, repair, and replacement services.',
    price: 'From $89',
    features: ['Brake inspection', 'Pad replacement', 'Rotor resurfacing']
  },
  {
    icon: Cpu,
    title: 'Engine Diagnostics',
    description: 'Advanced computer diagnostics to identify and resolve engine issues.',
    price: 'From $120',
    features: ['Computer scan', 'Error code analysis', 'Repair recommendations']
  },
  {
    icon: Car,
    title: 'Tire Services',
    description: 'Tire installation, rotation, balancing, and alignment services.',
    price: 'From $25',
    features: ['Tire rotation', 'Wheel balancing', 'Alignment check']
  }
];

const Services = () => {
  return (
    <section className="py-20 bg-garage-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive automotive repair and maintenance services to keep your vehicle running smoothly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="bg-card border-border hover:border-primary/50 transition-all duration-300 group hover:shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <service.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl text-foreground">{service.title}</CardTitle>
                <div className="text-2xl font-bold text-primary">{service.price}</div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-center">
                      <ArrowRight className="h-4 w-4 text-primary mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary">
            View All Services
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;