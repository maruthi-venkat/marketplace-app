# Marketplace App

A full-stack e-commerce marketplace application built with React.js and Node.js, using Airtable as the database.

## Features

- User Authentication
- Product Management
  - Add new products
  - View all products
  - View my products (seller's products)
- Order Management
  - Place orders
  - View order history
  - Track order status

## Tech Stack

### Frontend
- React.js
- React Router for navigation
- Axios for API calls
- Framer Motion for animations
- Tailwind CSS for styling

### Backend
- Node.js
- Express.js
- Airtable for database
- JWT for authentication

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Airtable account

### Installation

1. Clone the repository
```bash
git clone https://github.com/maruthi-venkat/marketplace-app/
cd marketplace_app
```

2. Install dependencies
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Set up environment variables
```bash
# Backend (.env)
PORT=5000
AIRTABLE_API_KEY=your_airtable_api_key
AIRTABLE_BASE_ID=your_airtable_base_id
JWT_SECRET=your_jwt_secret

# Frontend (.env)
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the application
```bash
# Start backend (from backend directory)
npm start

# Start frontend (from frontend directory)
npm start
```

## Database Structure

### Tables
1. Products
   - name
   - description
   - price
   - image
   - sellerId

2. Orders
   - productId
   - productName
   - buyerId
   - sellerId
   - quantity
   - totalAmount
   - orderDate
   - status

3. Users
   - userId
   - email
   - password

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details
