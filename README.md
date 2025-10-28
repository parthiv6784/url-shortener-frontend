

---

#  URL Shortener App

This is a simple **URL Shortener** made using **Next.js**, **Express.js**, and **MongoDB**.
It lets users shorten long links, log in to manage them, and track visits.

---

##  Features

* User login and signup (JWT authentication)
* Create short links from long URLs
* View and delete your links anytime
* Track total visits for each link
* Simple dashboard to manage everything
* Responsive UI made with Tailwind CSS

---

##  Tech Stack

* **Frontend:** Next.js, Tailwind CSS
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **Auth:** JWT

---

##  Future Improvements

If I had more time, I would like to add:

* **QR Code Generation** – each short link gets a QR code
* **Analytics** – show visitor details (IP, location, device, time spent)
* **Dashboard Charts** – show visits and top referrers
* **CSV Export** – export link analytics for records

---

##  Setup

1. Clone the repo

   ```bash
   git clone https://github.com/YOUR_USERNAME/url-shortener.git
   cd url-shortener
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Add `.env` file with your MongoDB URL and JWT secret

4. Run backend and frontend

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)


