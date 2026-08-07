import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface OrderItem {
  product_id: string;
  quantity: number;
  customization_notes?: string;
  product?: {
    title: string;
    price: number;
  };
}

interface OrderEmailRequest {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
  items: OrderItem[];
  totalAmount: number;
  notes?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const orderData: OrderEmailRequest = await req.json();
    console.log("Sending order confirmation email for:", orderData.orderNumber);

    // Generate order items HTML
    const itemsHtml = orderData.items.map(item => `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">
          ${item.product?.title || item.product_id}
          ${item.customization_notes ? `<br><small style="color: #6b7280;">Customization: ${item.customization_notes}</small>` : ''}
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center;">${item.quantity}</td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">₹${item.product?.price?.toFixed(2) || '0.00'}</td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">₹${((item.product?.price || 0) * item.quantity).toFixed(2)}</td>
      </tr>
    `).join('');

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Order Confirmation - ${orderData.orderNumber}</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #D4AF37 0%, #FFD700 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 32px;">New Order Received</h1>
            <p style="color: white; margin: 10px 0 0 0; font-size: 18px;">Order #${orderData.orderNumber}</p>
          </div>
          
          <div style="background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none;">
            <h2 style="color: #D4AF37; margin-top: 0;">Customer Information</h2>
            <table style="width: 100%; margin-bottom: 30px;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; width: 150px;">Name:</td>
                <td style="padding: 8px 0;">${orderData.customerName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Email:</td>
                <td style="padding: 8px 0;">${orderData.customerEmail}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Phone:</td>
                <td style="padding: 8px 0;">${orderData.customerPhone}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Delivery Address:</td>
                <td style="padding: 8px 0;">${orderData.deliveryAddress}</td>
              </tr>
            </table>

            <h2 style="color: #D4AF37;">Order Details</h2>
            <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; margin-bottom: 20px;">
              <thead>
                <tr style="background: #f3f4f6;">
                  <th style="padding: 12px; text-align: left; border-bottom: 2px solid #e5e7eb;">Product</th>
                  <th style="padding: 12px; text-align: center; border-bottom: 2px solid #e5e7eb;">Quantity</th>
                  <th style="padding: 12px; text-align: right; border-bottom: 2px solid #e5e7eb;">Price</th>
                  <th style="padding: 12px; text-align: right; border-bottom: 2px solid #e5e7eb;">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="3" style="padding: 16px; text-align: right; font-weight: bold; font-size: 18px; border-top: 2px solid #D4AF37;">Total Amount:</td>
                  <td style="padding: 16px; text-align: right; font-weight: bold; font-size: 18px; color: #D4AF37; border-top: 2px solid #D4AF37;">₹${orderData.totalAmount.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>

            ${orderData.notes ? `
              <h2 style="color: #D4AF37;">Additional Notes</h2>
              <div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #D4AF37;">
                <p style="margin: 0;">${orderData.notes}</p>
              </div>
            ` : ''}

            <div style="margin-top: 30px; padding: 20px; background: #fff3cd; border-radius: 8px; border: 1px solid #ffc107;">
              <p style="margin: 0; font-weight: bold; color: #856404;">Payment Method: Cash on Delivery (COD)</p>
            </div>
          </div>

          <div style="background: #1f2937; color: white; padding: 20px; text-align: center; border-radius: 0 0 8px 8px;">
            <p style="margin: 0; font-size: 14px;">Hushwood & Co - Creating Unforgettable Moments</p>
            <p style="margin: 10px 0 0 0; font-size: 12px; color: #9ca3af;">This is an automated order notification</p>
          </div>
        </body>
      </html>
    `;

    const emailResponse = await resend.emails.send({
      from: "Hushwood & Co Orders <onboarding@resend.dev>",
      to: ["hushwoodco@gmail.com"],
      subject: `New Order #${orderData.orderNumber} - ₹${orderData.totalAmount.toFixed(2)}`,
      html: emailHtml,
    });

    console.log("Order email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailId: emailResponse }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error sending order email:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
