-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  PRIMARY KEY (id)
);

-- Create services table
CREATE TABLE public.services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price_from INTEGER NOT NULL, -- in cents
  duration_minutes INTEGER NOT NULL,
  image_url TEXT,
  includes TEXT[], -- array of what's included
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create bookings table
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  service_id UUID NOT NULL REFERENCES public.services ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  preferred_date DATE NOT NULL,
  preferred_time TIME NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile"
ON public.profiles FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = id);

-- RLS Policies for services (public read)
CREATE POLICY "Services are viewable by everyone"
ON public.services FOR SELECT
USING (true);

-- RLS Policies for bookings
CREATE POLICY "Users can view their own bookings"
ON public.bookings FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own bookings"
ON public.bookings FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own bookings"
ON public.bookings FOR UPDATE
USING (auth.uid() = user_id);

-- Create function to handle profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function for updated_at timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample services data
INSERT INTO public.services (name, description, price_from, duration_minutes, includes) VALUES
('Oil Change & Maintenance', 'Complete oil change service with premium motor oil, filter replacement, and comprehensive vehicle inspection.', 3500, 30, ARRAY['Premium motor oil', 'Oil filter replacement', '21-point inspection', 'Fluid level check']),
('Brake Services', 'Professional brake inspection, repair, and replacement services for optimal safety and performance.', 8900, 90, ARRAY['Brake system inspection', 'Pad replacement', 'Rotor resurfacing', 'Brake fluid check']),
('Engine Diagnostics', 'Advanced computer diagnostics to identify and resolve engine issues quickly and accurately.', 12000, 45, ARRAY['Computer scan', 'Error code analysis', 'Performance testing', 'Repair recommendations']),
('Tire Services', 'Complete tire services including installation, rotation, balancing, and wheel alignment.', 2500, 45, ARRAY['Tire rotation', 'Wheel balancing', 'Alignment check', 'Pressure monitoring']),
('Electrical Systems', 'Comprehensive electrical system diagnosis and repair including battery, alternator, and starter.', 7500, 120, ARRAY['Battery testing', 'Alternator check', 'Starter inspection', 'Wiring diagnosis']),
('Transmission Service', 'Professional transmission maintenance and repair to ensure smooth shifting and longevity.', 15000, 180, ARRAY['Fluid change', 'Filter replacement', 'System inspection', 'Performance testing']),
('AC & Heating', 'Complete climate control system service to keep you comfortable year-round.', 9500, 90, ARRAY['AC inspection', 'Refrigerant check', 'Heater testing', 'Filter replacement']),
('Coolant System', 'Cooling system maintenance and repair to prevent engine overheating and damage.', 8000, 60, ARRAY['Coolant flush', 'Radiator inspection', 'Thermostat check', 'Hose examination']);