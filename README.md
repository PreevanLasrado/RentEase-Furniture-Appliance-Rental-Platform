# 🏠 RentEase – Furniture & Appliance Rental Platform

RentEase is a full-stack Furniture & Appliance Rental Platform developed using the **MERN Stack (MongoDB, Express.js, React.js, and Node.js)**. The application provides a seamless platform for users to browse, rent, and manage furniture and home appliances, while allowing administrators to efficiently manage products, inventory, orders, and users through an intuitive admin dashboard.

---

## 📌 Features

### 👤 User Features
- User Registration & Login (JWT Authentication)
- Browse Furniture & Appliances
- Search and Filter Products
- View Product Details
- Add to Wishlist
- Add to Cart
- Secure Checkout Process
- Online Payment Integration
- Place Rental Orders
- View Order History
- Manage User Profile
- Secure Logout

### 🔑 Admin Features
- Admin Login
- Dashboard Overview
- Add New Products
- Update Product Details
- Delete Products
- Manage Categories
- Manage Users
- View & Manage Orders
- Inventory & Stock Management
- Product Availability Management

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js
- JWT Authentication
- Multer (Image Upload)

### Database
- MongoDB Atlas
- Mongoose

### Payment Gateway
- Razorpay

---

## 📂 Project Structure

```
RentEase - Furniture & Appliance Rental Platform
│
├── client
│   ├── src
│   ├── public
│   └── package.json
│
├── server
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── services
│   ├── uploads
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### Clone the Repository

```bash
git clone https://github.com/PreevanLasrado/RentEase-Furniture-Appliance-Rental-Platform.git
```

### Navigate to the Project

```bash
cd RentEase-Furniture-Appliance-Rental-Platform
```

### Install Client Dependencies

```bash
cd client
npm install
```

### Install Server Dependencies

```bash
cd ../server
npm install
```

---

## ▶️ Run the Application

### Start Backend

```bash
cd server
npm start
```

### Start Frontend

```bash
cd client
npm run dev
```

---

## 🔒 Environment Variables

Create a `.env` file inside the **server** folder.

```env
PORT=5000
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
JWT_SECRET=YOUR_SECRET_KEY
```

**Note:** Never upload your `.env` file to GitHub.

---

## 🚀 Future Enhancements

- Product Reviews & Ratings
- Rental Duration Selection
- Live Inventory Tracking
- Email Notifications
- Coupon & Discount System
- AI-Based Product Recommendations
- Mobile Responsive Improvements
- Dark Mode
- Multi-language Support

---

## 👨‍💻 Author

**Preevan Lasrado**

GitHub: https://github.com/PreevanLasrado

---

## 📜 License

This project is developed for educational, learning, and portfolio purposes.
