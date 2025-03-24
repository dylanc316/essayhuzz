# EssayHuzz - AI-Powered Essay Writing Tool

A modern web application to help students write better essays with AI assistance. The application provides accurate quotations, structured analysis, and human-sounding content.

## Project Structure

This project follows a standard client-server architecture:

- `/frontend`: Next.js front-end application
- `/backend`: Express.js back-end API

## Tech Stack

### Frontend
- Next.js 15.x
- React 19.x
- Tailwind CSS
- TypeScript
- Axios for API requests

### Backend
- Node.js with Express
- TypeScript
- MongoDB with Mongoose
- JWT Authentication
- Nodemailer for email service

## Getting Started

### Prerequisites
- Node.js 18.x or higher
- MongoDB instance (local or Atlas)

### Development Setup

1. Clone the repository
```bash
git clone https://github.com/yourusername/essayhuzz.git
cd essayhuzz
```

2. Install dependencies for both frontend and backend
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. Set up environment variables
   - Create `.env` in the backend directory
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```
   
   - Create `.env.local` in the frontend directory
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

4. Start the development servers
```bash
# Start backend server (in backend directory)
npm run dev

# Start frontend server (in frontend directory)
npm run dev
```

5. Open your browser and navigate to `http://localhost:3000`

## Features

- User authentication (register, login, email verification)
- Document management (upload, create, edit)
- AI-powered essay writing and analysis
- Character and theme analysis
- Real-time essay feedback and improvement
- Library of classic literature

## Project Structure

### Frontend
```
frontend/
├── src/
│   ├── app/                 # Next.js App Router
│   ├── components/          # Reusable components
│   ├── styles/              # Global styles
│   └── ...
├── public/                  # Static assets
├── package.json
└── ...
```

### Backend
```
backend/
├── src/
│   ├── controllers/         # Request handlers
│   ├── middleware/          # Express middleware
│   ├── models/              # Mongoose models
│   ├── routes/              # API routes
│   ├── utils/               # Helper functions
│   └── index.ts             # Entry point
├── package.json
└── ...
```

## License

MIT
