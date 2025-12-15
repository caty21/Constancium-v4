import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Simulator authentication
  app.post("/api/simulator-auth", async (req, res) => {
    const { username, password } = req.body;
    const validUsername = process.env.SIMULATOR_USERNAME;
    const validPassword = process.env.SIMULATOR_PASSWORD;
    
    if (username === validUsername && password === validPassword) {
      res.json({ success: true });
    } else {
      res.status(401).json({ success: false, error: "Identifiants incorrects" });
    }
  });

  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    const { name, email, phone, subject, message, toEmail } = req.body;
    
    // Validate input
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      // Send email via Resend API if available
      const resendApiKey = process.env.RESEND_API_KEY;
      
      if (resendApiKey) {
        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: 'capucine@constancium.com',
            to: toEmail || 'capucine@constancium.com',
            replyTo: email,
            subject: `Nouveau message de ${name}: ${subject}`,
            html: `
              <h2>Nouveau message de ${name}</h2>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Téléphone:</strong> ${phone || 'Non fourni'}</p>
              <p><strong>Sujet:</strong> ${subject}</p>
              <p><strong>Message:</strong></p>
              <p>${message.replace(/\n/g, '<br>')}</p>
            `,
          }),
        });

        if (!response.ok) {
          console.error('Failed to send email via Resend');
        }
      }

      // Log the message for records
      console.log(`Contact form submission:
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Subject: ${subject}
      Message: ${message}
      To: ${toEmail}`);

      // Return success response
      res.json({ success: true, message: "Message received. We will contact you soon." });
    } catch (error) {
      console.error('Error processing contact form:', error);
      res.status(500).json({ error: "Failed to process your message. Please try again." });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
