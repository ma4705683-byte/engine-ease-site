import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Clock, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import garageHero from '@/assets/garage-hero.jpg';
import { BookingModal } from '@/components/BookingModal';

const Hero = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const defaultService = {
    title: 'General Service',
    price: 'From $50',
    duration: '1 hour'
  };
  return (
    <section className="relative min-h-screen flex items-center pt-16">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${garageHero})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-garage-dark/90 via-garage-dark/70 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Expert Auto Repair
            <span className="block text-primary">You Can Trust</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Professional automotive services with over 20 years of experience. 
            From routine maintenance to major repairs, we keep your vehicle running at its best.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary text-primary-foreground font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => setIsBookingModalOpen(true)}
            >
              Book a Service
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Link to="/services">
              <Button variant="outline" size="lg" className="border-muted-foreground text-muted-foreground hover:border-primary hover:text-primary w-full">
                View Services
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-3 gap-8">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <div className="font-semibold text-foreground">Licensed</div>
                <div className="text-sm text-muted-foreground">Certified Techs</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="h-8 w-8 text-primary" />
              <div>
                <div className="font-semibold text-foreground">Same Day</div>
                <div className="text-sm text-muted-foreground">Service</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Star className="h-8 w-8 text-primary" />
              <div>
                <div className="font-semibold text-foreground">5-Star</div>
                <div className="text-sm text-muted-foreground">Reviews</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        service={defaultService}
      />
    </section>
  );
};

export default Hero;