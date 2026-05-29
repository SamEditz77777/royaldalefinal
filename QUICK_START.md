# ✅ QUOTE SYSTEM SETUP COMPLETE!

## 🎯 What Was Built

Your ROYAL DALE website now has a **complete quote submission system** with:

1. ✅ **Email Notifications** - You get an email every time someone submits a quote
2. ✅ **Customer Confirmation Emails** - Customers get a confirmation email
3. ✅ **Database Storage** - All quotes saved in `quotes.json`
4. ✅ **Backend API** - Secure server to handle submissions
5. ✅ **Admin Panel** - View all submitted quotes

---

## 🚀 QUICK START

### Step 1: Configure Gmail (2 minutes)

Your email is how you'll receive quote notifications!

**Get your Gmail App Password:**
1. Go to: https://myaccount.google.com/apppasswords
2. Make sure 2-Factor Authentication is enabled
3. Select **Mail** and **Windows Computer**
4. Click **Generate** to get your 16-character password

**Example:**
- Email: `your-email@gmail.com`
- App Password: `abcd efgh ijkl mnop`

### Step 2: Update .env File

Open `.env` file in the project folder and replace:

```
OWNER_EMAIL=your-email@gmail.com
EMAIL_PASSWORD=your-16-character-app-password
VITE_API_URL=http://localhost:5000
```

**Save the file!**

### Step 3: Start Both Servers

Run this command in the project folder:

```bash
npm run dev:full
```

This will start:
- ✅ Backend API on http://localhost:5000
- ✅ Frontend on http://localhost:5173

---

## 📊 How Customers Submit Quotes

1. Customer visits your website
2. Fills out the quote form (name, email, products, sizes, etc.)
3. At the final step, they see **two submission options:**
   - **Submit Quote** (brown button) - Submits to your database
   - **WhatsApp** (green button) - Sends directly to WhatsApp
4. When they click "Submit Quote":
   - ✅ Quote saved to database
   - ✅ **You receive an email** with all details
   - ✅ Customer gets confirmation email
   - ✅ Form resets for next submission

---

## 📧 What You'll Receive

When a customer submits a quote, you'll get an email with:

```
Subject: New Quote Request from John Doe

Customer Details:
- Name: John Doe
- Email: john@example.com
- Phone: +91 9999999999
- Company: XYZ Builders

Selected Products:
• Laminate Doors
• FRP Doors
• PVC Doors

Specifications (all sizes in inches):
1. Laminate Doors
   Quantity: 5
   Height: 80"
   Width: 32"
   Finish: Matte
   
2. FRP Doors
   Quantity: 3
   Height: 84"
   Width: 36"
   Finish: Gloss

Project Details:
Type: Commercial
Timeline: Immediate (1-2 weeks)
Additional Requirements: Fast delivery required
```

---

## 💾 Where Are My Quotes?

All submitted quotes are saved in: **`quotes.json`** (in project root)

Example structure:
```json
[
  {
    "id": 1622505600000,
    "submittedAt": "2025-05-29T10:30:00.000Z",
    "contact": {
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+91 9999999999"
    },
    "selectedProducts": ["Laminate Doors", "FRP Doors"],
    "doors": [...],
    "project": {...}
  }
]
```

---

## 👤 Admin Panel

To view all submitted quotes in a nice interface:

1. Open `src/components/AdminQuotes.tsx` (already created)
2. You can add a route to this component to view quotes
3. Or simply check the `quotes.json` file directly

---

## 🔧 Available Commands

```bash
# Start frontend only
npm run dev

# Start backend server only
npm run server

# Start both frontend + backend together
npm run dev:full

# Build for production
npm build
```

---

## 📁 File Structure

```
royaldale-main/
├── server.js                    ← Backend API (NEW)
├── .env                        ← Your email config (NEW)
├── .env.example                ← Template (NEW)
├── QUOTE_SYSTEM_SETUP.md       ← Detailed setup guide (NEW)
├── quotes.json                 ← Database of all quotes (AUTO-CREATED)
├── package.json                ← Updated with new dependencies
└── src/
    └── components/
        ├── QuoteForm.tsx       ← Updated to submit to backend
        └── AdminQuotes.tsx      ← View all quotes (NEW)
```

---

## 🧪 Testing the System

1. Start the servers: `npm run dev:full`
2. Go to http://localhost:5173
3. Fill out a quote form completely
4. Click "Submit Quote"
5. You should receive an email within seconds!
6. Quote appears in `quotes.json`

---

## ⚠️ Important Notes

### Email Setup
- Use **App Password**, not your regular Gmail password
- Requires **2-Factor Authentication** to be enabled
- Never share your `.env` file
- The `.env` file is ignored by git (already in `.gitignore`)

### Database
- `quotes.json` stores all quotes locally on your server
- Each quote gets a unique `id` and `submittedAt` timestamp
- Keep this file safe - it contains customer data

### WhatsApp Button
- The **WhatsApp button still works** independently
- Customers can use this for immediate contact
- No backend needed for WhatsApp submissions

---

## 🆘 Troubleshooting

### Problem: "Email failed to send"
**Solution:**
- Verify Gmail and App Password in `.env`
- Check Gmail 2FA is enabled
- Try regenerating your App Password

### Problem: "Cannot connect to backend"
**Solution:**
- Make sure you ran `npm run dev:full`
- Check both servers are running in terminal
- Look for errors in terminal output

### Problem: "Quotes not saving"
**Solution:**
- Check `quotes.json` exists in project root
- Make sure backend is running
- Check terminal for API errors

### Problem: "VITE_API_URL not working"
**Solution:**
- Ensure `.env` file exists in project root
- Check the URL: `http://localhost:5000` (no trailing slash)
- Restart dev servers after changing `.env`

---

## 📞 Quick Recap

What happens when customer submits a quote:

```
Customer Form → Submit Quote Button
       ↓
   API Call to Backend
       ↓
   Quote Saved to quotes.json ✅
   Email Sent to You ✅
   Email Sent to Customer ✅
   Success Message Shown ✅
```

---

## 🎉 You're All Set!

Your quote system is ready to go! Next steps:

1. ✅ Add your Gmail credentials to `.env`
2. ✅ Run `npm run dev:full`
3. ✅ Test by submitting a quote
4. ✅ Check your email!
5. ✅ View quotes in `quotes.json`

**Good luck with ROYAL DALE! 🚪✨**
