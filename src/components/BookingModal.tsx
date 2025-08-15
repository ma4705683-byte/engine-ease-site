import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface Service {
  title: string;
  price: string;
  duration: string;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service;
}

const timeSlots = [
  '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
];

export const BookingModal = ({ isOpen, onClose, service }: BookingModalProps) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    preferredDate: undefined as Date | undefined,
    preferredTime: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.phone || !formData.preferredDate || !formData.preferredTime) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`https://urcqmvbhokiwotgtsbin.supabase.co/functions/v1/send-booking-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service: service.title,
          price: service.price,
          duration: service.duration,
          customerName: formData.fullName,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          preferredDate: format(formData.preferredDate, 'yyyy-MM-dd'),
          preferredTime: formData.preferredTime,
          notes: formData.notes
        })
      });

      if (response.ok) {
        toast({
          title: "Booking Request Sent!",
          description: "We've received your booking request and will contact you soon to confirm.",
        });
        
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          preferredDate: undefined,
          preferredTime: '',
          notes: ''
        });
        onClose();
      } else {
        throw new Error('Failed to send booking request');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send booking request. Please try again or call us directly.",
        variant: "destructive"
      });
    }

    setIsSubmitting(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">Book {service.title}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fullName" className="text-foreground">Full Name *</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="bg-input border-border text-foreground"
                required
              />
            </div>
            <div>
              <Label htmlFor="phone" className="text-foreground">Phone *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="bg-input border-border text-foreground"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email" className="text-foreground">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-input border-border text-foreground"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-foreground">Preferred Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal bg-input border-border",
                      !formData.preferredDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.preferredDate ? format(formData.preferredDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-popover border-border">
                  <Calendar
                    mode="single"
                    selected={formData.preferredDate}
                    onSelect={(date) => setFormData({ ...formData, preferredDate: date })}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label className="text-foreground">Preferred Time *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal bg-input border-border",
                      !formData.preferredTime && "text-muted-foreground"
                    )}
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    {formData.preferredTime || "Select time"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-popover border-border">
                  <div className="grid grid-cols-2 gap-2 p-3">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        variant="ghost"
                        size="sm"
                        onClick={() => setFormData({ ...formData, preferredTime: time })}
                        className="text-foreground hover:bg-accent"
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div>
            <Label htmlFor="notes" className="text-foreground">Additional Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Any specific requirements or additional information..."
              className="bg-input border-border text-foreground"
              rows={3}
            />
          </div>

          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-semibold text-foreground mb-2">Service Summary</h4>
            <div className="space-y-1 text-sm text-muted-foreground">
              <div>Service: {service.title}</div>
              <div>Price: {service.price}</div>
              <div>Duration: {service.duration}</div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Book Service'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};