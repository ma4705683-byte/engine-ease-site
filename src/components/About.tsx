import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, Users, Award, Clock, Shield, Star } from 'lucide-react';

const About = () => {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose AutoRepair Pro?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            With over 20 years of experience, we've built our reputation on quality workmanship, 
            honest pricing, and exceptional customer service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="bg-card border-border text-center hover:border-primary/50 transition-colors">
            <CardHeader>
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle className="text-foreground">Licensed & Insured</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Fully licensed professionals with comprehensive insurance coverage for your peace of mind.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border text-center hover:border-primary/50 transition-colors">
            <CardHeader>
              <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle className="text-foreground">Fast Service</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Most repairs completed same day. We value your time and get you back on the road quickly.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border text-center hover:border-primary/50 transition-colors">
            <CardHeader>
              <Award className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle className="text-foreground">Quality Guarantee</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                All work backed by our comprehensive warranty. We stand behind every repair we make.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-garage-dark rounded-lg p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Our Story
              </h3>
              <p className="text-muted-foreground mb-4">
                Founded in 2003, AutoRepair Pro started as a small family business with a simple mission: 
                provide honest, reliable automotive repair services to our community.
              </p>
              <p className="text-muted-foreground mb-6">
                Today, we're proud to be the trusted choice for thousands of satisfied customers. 
                Our team of certified technicians uses the latest diagnostic equipment and genuine parts 
                to ensure your vehicle runs safely and efficiently.
              </p>
              
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">5000+</div>
                  <div className="text-sm text-muted-foreground">Happy Customers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">20+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">4.9★</div>
                  <div className="text-sm text-muted-foreground">Average Rating</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Card className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <Users className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Expert Team</h4>
                      <p className="text-sm text-muted-foreground">
                        ASE-certified technicians with years of experience on all makes and models.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <Wrench className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Modern Equipment</h4>
                      <p className="text-sm text-muted-foreground">
                        State-of-the-art diagnostic tools and equipment for accurate repairs.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <Star className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Customer First</h4>
                      <p className="text-sm text-muted-foreground">
                        Transparent pricing, honest recommendations, and exceptional service.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;