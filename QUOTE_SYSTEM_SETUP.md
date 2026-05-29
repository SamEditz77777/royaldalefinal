# 🚀 ROYAL DALE Quote System - Setup Guide

## What Was Added

You now have a complete quote submission system with:
- ✅ **Email Notifications** - You get an email when someone submits a quote
- ✅ **Database** - All quotes saved in `quotes.json`
- ✅ **Confirmation Emails** - Customers get a confirmation email
- ✅ **Backend API** - Secure API endpoint to handle submissions

---

## 📧 Email Setup (Gmail)

### Step 1: Create Gmail App Password

1. Go to: https://myaccount.google.com/apppasswords
2. You need 2-Factor Authentication enabled
3. Select **Mail** and **Windows Computer**
4. Click **Generate**
5. Copy the 16-character password

### Step 2: Create .env File

Create a file named `.env` in the project root:

```
OWNER_EMAIL=your-email@gmail.com
EMAIL_PASSWORD=your-16-character-app-password
VITE_API_URL=http://localhost:5000
```

**Replace with your actual Gmail and app password!**

### Step 3: Start Both Servers

In your project folder, run:

```bash
npm run dev:full
```

This starts:
- Backend API on `http://localhost:5000`
- Frontend on `http://localhost:5173`

---

## 📁 Files Added/Modified

### New Files:
- `server.js` - Backend API server
- `.env.example` - Environment variables template
- `quotes.json` - Stores all submitted quotes (auto-created)

### Modified Files:
- `package.json` - Added express, cors, nodemailer, concurrently
- `src/components/QuoteForm.tsx` - Now submits to backend API

---

## 🔄 How It Works

### Customer Submits Quote:
1. Customer fills out the form
2. Clicks "Submit Quote"
3. Data is sent to backend API
4. Quote is saved to `quotes.json`
5. **You receive an email** with all details
6. **Customer receives confirmation email**
7. Team contacts customer within 24 hours

### To View All Submitted Quotes:
Open `quotes.json` in your project folder - it contains all quote submissions in JSON format.

---

## 🚨 Troubleshooting

### "Failed to connect to backend"
- Make sure backend is running: `npm run dev:full`
- Check `VITE_API_URL` in your `.env` file

### "Email failed to send"
- Verify Gmail credentials are correct
- Check that you used an App Password (not regular password)
- Ensure 2FA is enabled on your Gmail account

### Where are my quotes?
- Check `quotes.json` in the project root
- It's automatically created on first submission

---

## 🔐 Security Notes

- Never commit `.env` file (it's in `.gitignore`)
- Use Gmail App Password, not your actual password
- The `quotes.json` is local to your server
- All data is encrypted in transit (HTTPS in production)

---

## 📝 Next Steps

1. ✅ Set up your Gmail App Password (see above)
2. ✅ Create `.env` file with your credentials
3. ✅ Run `npm run dev:full`
4. ✅ Test by submitting a quote
5. ✅ Check your email for notification!

Good luck! 🎉
