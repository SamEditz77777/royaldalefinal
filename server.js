import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import sgMail from '@sendgrid/mail';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const ownerEmail = process.env.OWNER_EMAIL;
const senderEmail = process.env.SENDER_EMAIL || ownerEmail;
const sendgridApiKey = process.env.SENDGRID_API_KEY;
let sendgridEnabled = false;

if (!ownerEmail || !senderEmail) {
  console.error('ERROR: OWNER_EMAIL and SENDER_EMAIL must be set in .env');
  process.exit(1);
}

if (sendgridApiKey) {
  sgMail.setApiKey(sendgridApiKey);
  sendgridEnabled = true;
  console.log('✅ SendGrid email notifications enabled');
} else {
  console.warn('⚠️ SENDGRID_API_KEY is not set. Email notifications are disabled until you configure SendGrid.');
}

// Path to store quotes
const quotesFile = path.join(__dirname, 'quotes.json');

// Ensure quotes file exists
if (!fs.existsSync(quotesFile)) {
  fs.writeFileSync(quotesFile, JSON.stringify([], null, 2));
}

// Helper: Read all quotes
const readQuotes = () => {
  const data = fs.readFileSync(quotesFile, 'utf-8');
  return JSON.parse(data);
};

// Helper: Save quote
const saveQuote = (quote) => {
  const quotes = readQuotes();
  quotes.push({
    ...quote,
    id: Date.now(),
    submittedAt: new Date().toISOString(),
  });
  fs.writeFileSync(quotesFile, JSON.stringify(quotes, null, 2));
};

// API: Submit quote
app.post('/api/quote/submit', async (req, res) => {
  try {
    const { contact, selectedProducts, doors, project } = req.body;

    // Validate
    if (!contact?.email || !contact?.name) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Save to database
    saveQuote({
      contact,
      selectedProducts,
      doors,
      project,
    });

    // Send email to owner
    const mailContent = `
      <h2>New Quote Request from ROYAL DALE</h2>
      <hr>
      <h3>Customer Details</h3>
      <p><strong>Name:</strong> ${contact.name}</p>
      <p><strong>Email:</strong> ${contact.email}</p>
      <p><strong>Phone:</strong> ${contact.phone}</p>
      ${contact.company ? `<p><strong>Company:</strong> ${contact.company}</p>` : ''}
      
      <h3>Selected Products</h3>
      <ul>
        ${selectedProducts.map((p) => `<li>${p}</li>`).join('')}
      </ul>
      
      <h3>Specifications</h3>
      ${doors
        .map(
          (d, i) => `
        <div style="margin-bottom: 15px; padding: 10px; background: #f5f5f5; border-radius: 5px;">
          <strong>Item #${i + 1}: ${d.product}</strong><br>
          Quantity: ${d.quantity}<br>
          Height: ${d.heightInch}"<br>
          Width: ${d.widthInch}"<br>
          Finish: ${d.finish}<br>
          ${d.customDesign ? `Custom Design: ${d.customDesign}<br>` : ''}
          ${d.notes ? `Notes: ${d.notes}<br>` : ''}
        </div>
      `,
        )
        .join('')}
      
      <h3>Project Details</h3>
      <p><strong>Type:</strong> ${project.type}</p>
      <p><strong>Timeline:</strong> ${project.timeline}</p>
      ${project.notes ? `<p><strong>Additional Requirements:</strong> ${project.notes}</p>` : ''}
      
      <hr>
      <p><em>This quote was submitted on ${new Date().toLocaleString()}</em></p>
    `;

    if (sendgridEnabled) {
      await sgMail.send({
        from: senderEmail,
        to: ownerEmail,
        subject: `New Quote Request from ${contact.name}`,
        html: mailContent,
      });

      // Send confirmation email to customer
      await sgMail.send({
        from: senderEmail,
        to: contact.email,
        subject: 'Your Quote Request Received - ROYAL DALE',
        html: `
          <h2>Thank you, ${contact.name}!</h2>
          <p>We have received your quote request.</p>
          <p>Our team will contact you within 24 hours at <strong>${contact.phone}</strong>.</p>
          <p>If you have any urgent questions, please reach out directly.</p>
          <br>
          <p>Best regards,<br><strong>ROYAL DALE Team</strong></p>
        `,
      });
    } else {
      console.warn('Email sending skipped because SENDGRID_API_KEY is not configured.');
    }

    res.json({
      success: true,
      message: sendgridEnabled
        ? 'Quote submitted successfully. Check your email!'
        : 'Quote submitted successfully. Email notifications are disabled until SendGrid is configured.',
    });
  } catch (error) {
    console.error('Error submitting quote:', error);
    res.status(500).json({ error: 'Failed to submit quote', details: error.message });
  }
});

// API: Get all quotes (admin)
app.get('/api/quotes', (req, res) => {
  try {
    const quotes = readQuotes();
    res.json(quotes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quotes' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Quote server running on http://localhost:${PORT}`);
  console.log('📧 Email notifications enabled');
  console.log('💾 Quotes saved to: quotes.json');
});
