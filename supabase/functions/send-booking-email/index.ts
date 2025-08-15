import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface BookingRequest {
  service: string;
  price: string;
  duration: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const bookingData: BookingRequest = await req.json();

    console.log("Received booking request:", bookingData);

    const emailResponse = await resend.emails.send({
      from: "Garage Booking <onboarding@resend.dev>",
      to: ["i4dexigner@gmail.com"],
      subject: `New Service Booking Request - ${bookingData.service}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h1 style="color: #ff6b35; margin-bottom: 30px; text-align: center;">New Service Booking Request</h1>
            
            <div style="background-color: #ff6b35; color: white; padding: 15px; border-radius: 8px; margin-bottom: 25px;">
              <h2 style="margin: 0; font-size: 24px;">${bookingData.service}</h2>
              <p style="margin: 5px 0 0 0; font-size: 16px;">${bookingData.price} • ${bookingData.duration}</p>
            </div>

            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
              <h3 style="color: #333; margin-top: 0; margin-bottom: 15px;">Customer Information</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">Name:</td>
                  <td style="padding: 8px 0; color: #333;">${bookingData.customerName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td>
                  <td style="padding: 8px 0; color: #333;">${bookingData.customerEmail}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">Phone:</td>
                  <td style="padding: 8px 0; color: #333;">${bookingData.customerPhone}</td>
                </tr>
              </table>
            </div>

            <div style="background-color: #e8f4f8; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
              <h3 style="color: #333; margin-top: 0; margin-bottom: 15px;">Appointment Details</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">Preferred Date:</td>
                  <td style="padding: 8px 0; color: #333;">${new Date(bookingData.preferredDate).toLocaleDateString()}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">Preferred Time:</td>
                  <td style="padding: 8px 0; color: #333;">${bookingData.preferredTime}</td>
                </tr>
              </table>
            </div>

            ${bookingData.notes ? `
              <div style="background-color: #fff3cd; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
                <h3 style="color: #333; margin-top: 0; margin-bottom: 15px;">Additional Notes</h3>
                <p style="color: #333; margin: 0; line-height: 1.6;">${bookingData.notes}</p>
              </div>
            ` : ''}

            <div style="background-color: #d4edda; padding: 20px; border-radius: 8px; text-align: center;">
              <h3 style="color: #155724; margin-top: 0; margin-bottom: 10px;">Next Steps</h3>
              <p style="color: #155724; margin: 0; line-height: 1.6;">
                Please contact the customer to confirm the appointment details and schedule the service.
              </p>
            </div>
          </div>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-booking-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);