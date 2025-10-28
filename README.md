# 🔗 Simple URL Shortener App

A full-stack **URL Shortener** built with **Next.js**, **Express.js**, and **MongoDB**.  
It allows users to shorten long URLs, manage them via a personal dashboard, and track visit history.

---

## 🚀 Features

- 🔑 **User Authentication** using JWT (register, login, logout)
- ✂️ **Shorten Long URLs** into unique short links
- 📈 **Track Visits** for each short link
- 🧾 **History Logging** for every action (create, edit, delete, visit)
- 🗂️ **Dashboard** with table view of user’s links
- 🛠️ **Edit / Delete** functionality for each URL
- 🔒 Auth middleware for secure API routes
- 🌐 Responsive frontend built with **Next.js + Tailwind CSS**

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | Next.js 14, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose ORM) |
| Auth | JWT Tokens + Cookies |
| Styling | Tailwind CSS |

---
## 🚀 Future Enhancements (If More Time Were Available)

This project was designed as a one-day technical challenge MVP.  
If more time were available, the following features would make the application production-ready, more insightful, and more user-friendly.

### 🧾 1. QR Code Generation for Short Links
- Generate downloadable QR codes for each short URL to make sharing easier.
- Backend endpoint: `GET /links/:id/qrcode`
- Implementation: Use `qrcode` or `qr-image` npm package to render PNG/SVG images.
- Benefit: Users can print or scan codes to instantly reach the original URL.

### 🌍 2. Advanced Analytics & Visitor Tracking
- Record extended metadata for every visit:
  - **Visitor IP**, **country**, **region**, **browser**, **device**, **referrer**, and **time spent**.
- Store the data in a `visits` collection for detailed analytics dashboards.
- Add map-based visualization and time-series charts (Recharts / Chart.js).
- Benefit: Provides valuable insights for marketing and performance optimization.

### 📈 3. Real-Time Dashboard & CSV Export
- Create a `/dashboard` route that summarizes:
  - Total visits per link
  - Geo distribution
  - Top referrers
- Add export functionality to download analytics as CSV or Excel.
- Benefit: Helps users monitor link performance easily.


## ⚙️ Installation

### 1️⃣ Clone the repo
```bash
git clone https://github.com/YOUR_USERNAME/url-shortener.git
cd url-shortener


