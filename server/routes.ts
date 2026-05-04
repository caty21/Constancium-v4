import type { Express } from "express";
import { createServer, type Server } from "http";
import { getSimulatorCredentials, setSimulatorCredentials } from "./credentials";
import { randomBytes } from "crypto";

const adminTokens = new Set<string>();

export async function registerRoutes(app: Express): Promise<Server> {
  // Simulator authentication
  app.post("/api/simulator-auth", async (req, res) => {
    const { username, password } = req.body;
    const creds = getSimulatorCredentials();

    if (!creds.username || !creds.password) {
      return res.status(500).json({ success: false, error: "Configuration serveur manquante" });
    }

    if (username === creds.username && password === creds.password) {
      res.json({ success: true });
    } else {
      res.status(401).json({ success: false, error: "Identifiants incorrects" });
    }
  });

  // Admin login
  app.post("/api/admin/login", async (req, res) => {
    const { password } = req.body;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      return res.status(500).json({ error: "Mot de passe administrateur non configuré" });
    }

    if (password !== adminPassword) {
      return res.status(401).json({ error: "Mot de passe administrateur incorrect" });
    }

    const token = randomBytes(32).toString("hex");
    adminTokens.add(token);

    const creds = getSimulatorCredentials();
    res.json({
      token,
      simulatorUsername: creds.username,
      simulatorPassword: creds.password,
    });
  });

  // Admin update simulator credentials
  app.post("/api/admin/update-credentials", async (req, res) => {
    const { token, username, password } = req.body;

    if (!token || !adminTokens.has(token)) {
      return res.status(401).json({ error: "Session invalide" });
    }

    if (!username?.trim() || !password?.trim()) {
      return res.status(400).json({ error: "Identifiant et mot de passe requis" });
    }

    setSimulatorCredentials({ username: username.trim(), password: password.trim() });
    res.json({ success: true });
  });

  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    const { name, email, phone, subject, message, toEmail } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
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

      console.log(`Contact form submission: Name: ${name}, Email: ${email}`);
      res.json({ success: true, message: "Message received. We will contact you soon." });
    } catch (error) {
      console.error('Error processing contact form:', error);
      res.status(500).json({ error: "Failed to process your message. Please try again." });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
