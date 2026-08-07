import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface QuoteEmailRequest {
  name: string;
  email: string;
  phone: string;
  company?: string;
  occasion?: string;
  event_date?: string;
  guest_count?: number;
  venue?: string;
  budget?: string;
  customizations?: string;
  additional_requirements?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const quoteData: QuoteEmailRequest = await req.json();
    console.log("Sending quote request notification for:", quoteData.email);

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>New Quote Request</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #D4AF37 0%, #FFD700 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 32px;">New Quote Request</h1>
          </div>
          
          <div style="background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none;">
            <h2 style="color: #D4AF37; margin-top: 0;">Customer Information</h2>
            <table style="width: 100%; margin-bottom: 30px;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; width: 180px;">Name:</td>
                <td style="padding: 8px 0;">${quoteData.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Email:</td>
                <td style="padding: 8px 0;">${quoteData.email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Phone:</td>
                <td style="padding: 8px 0;">${quoteData.phone}</td>
              </tr>
              ${quoteData.company ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Company:</td>
                <td style="padding: 8px 0;">${quoteData.company}</td>
              </tr>
              ` : ''}
            </table>

            <h2 style="color: #D4AF37;">Event Details</h2>
            <table style="width: 100%; margin-bottom: 30px;">
              ${quoteData.occasion ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold; width: 180px;">Occasion:</td>
                <td style="padding: 8px 0;">${quoteData.occasion}</td>
              </tr>
              ` : ''}
              ${quoteData.event_date ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Event Date:</td>
                <td style="padding: 8px 0;">${new Date(quoteData.event_date).toLocaleDateString()}</td>
              </tr>
              ` : ''}
              ${quoteData.guest_count ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Guest Count:</td>
                <td style="padding: 8px 0;">${quoteData.guest_count}</td>
              </tr>
              ` : ''}
              ${quoteData.venue ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Venue:</td>
                <td style="padding: 8px 0;">${quoteData.venue}</td>
              </tr>
              ` : ''}
              ${quoteData.budget ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Budget:</td>
                <td style="padding: 8px 0;">${quoteData.budget}</td>
              </tr>
              ` : ''}
            </table>

            ${quoteData.customizations ? `
              <h2 style="color: #D4AF37;">Customizations</h2>
              <div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #D4AF37; margin-bottom: 20px;">
                <p style="margin: 0; white-space: pre-wrap;">${quoteData.customizations}</p>
              </div>
            ` : ''}

            ${quoteData.additional_requirements ? `
              <h2 style="color: #D4AF37;">Additional Requirements</h2>
              <div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #D4AF37;">
                <p style="margin: 0; white-space: pre-wrap;">${quoteData.additional_requirements}</p>
              </div>
            ` : ''}
          </div>

          <div style="background: #1f2937; color: white; padding: 20px; text-align: center; border-radius: 0 0 8px 8px;">
            <p style="margin: 0; font-size: 14px;">Hushwood & Co - Quote Request Notification</p>
            <p style="margin: 10px 0 0 0; font-size: 12px; color: #9ca3af;">Respond within 24 hours for best customer experience</p>
          </div>
        </body>
      </html>
    `;

    const emailResponse = await resend.emails.send({
      from: "Hushwood & Co Quotes <onboarding@resend.dev>",
      to: ["hushwoodco@gmail.com"],
      subject: `New Quote Request from ${quoteData.name} - ${quoteData.occasion || 'Event'}`,
      html: emailHtml,
    });

    console.log("Quote email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailId: emailResponse }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error sending quote email:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
