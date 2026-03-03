# Health-Aware Food Recommendation System (Expo + Express + MongoDB)

A full-stack beginner-friendly mobile application where users enter health conditions and receive **rule-based** fast-food recommendations.

## Tech Stack

- **Frontend:** React Native with Expo
- **Backend:** Node.js + Express
- **Database:** MongoDB Atlas
- **Authentication:** JWT
- **Security:** Password hashing with bcrypt + protected routes

---

## Project Structure

```bash
APP/
├── backend/
│   ├── src/
│   │   ├── app.js
│   │   ├── server.js
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   ├── adminController.js
│   │   │   ├── authController.js
│   │   │   ├── menuController.js
│   │   │   └── profileController.js
│   │   ├── middleware/
│   │   │   └── authMiddleware.js
│   │   ├── models/
│   │   │   ├── HealthProfile.js
│   │   │   └── User.js
│   │   ├── routes/
│   │   │   ├── adminRoutes.js
│   │   │   ├── authRoutes.js
│   │   │   ├── menuRoutes.js
│   │   │   └── profileRoutes.js
│   │   └── utils/
│   │       ├── menuData.js
│   │       └── recommendationEngine.js
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── App.js
│   ├── app.json
│   ├── .env.example
│   ├── package.json
│   └── src/
│       ├── api/client.js
│       ├── components/
│       │   ├── Field.js
│       │   ├── PrimaryButton.js
│       │   └── ToggleField.js
│       ├── context/AuthContext.js
│       ├── navigation/AppNavigator.js
│       ├── screens/
│       │   ├── AdminScreen.js
│       │   ├── HomeScreen.js
│       │   ├── LoginScreen.js
│       │   ├── MenuScreen.js
│       │   ├── ProfileScreen.js
│       │   ├── RecommendationScreen.js
│       │   └── SignupScreen.js
│       ├── theme/colors.js
│       └── utils/storage.js
└── README.md
```

---

## Features Implemented

### 1) Authentication
- Signup (name, email, password)
- Login
- JWT token issuance
- Secure token storage in Expo SecureStore

### 2) User Health Profile
Users can save:
- Diabetes (Yes/No)
- High Blood Pressure (Yes/No)
- High Cholesterol (Yes/No)
- Allergies (text)
- Daily calorie goal

### 3) Restaurant Menu Screen (Static Sample)
- Burger
- Pizza
- Fries
- Soft Drink
- Salad

With nutrition fields:
- Calories
- Sugar
- Sodium
- Fat

### 4) Rule-Based Recommendation Engine
Rules:
- Diabetes: removes high sugar items
- High BP: removes high sodium items
- High Cholesterol: removes high fat/fried items
- Allergies: removes matching ingredient items

Output sections:
- Recommended items
- Avoid items
- Explanation message

### 5) Admin Panel (Basic)
- View all users
- View all health profiles

---

## Backend API Routes

- `POST /auth/signup`
- `POST /auth/login`
- `GET /profile/me` (protected)
- `POST /profile` (protected)
- `GET /profile/all` (admin)
- `GET /menu`
- `GET /menu/recommendations` (protected)
- `GET /admin/users` (admin)
- `GET /admin/overview` (admin)

---

## MongoDB Schema Examples

### User Schema
```js
{
  name: String,
  email: String,
  password: String, // hashed
  role: 'user' | 'admin'
}
```

### HealthProfile Schema
```js
{
  user: ObjectId, // ref User
  diabetes: Boolean,
  highBloodPressure: Boolean,
  highCholesterol: Boolean,
  allergies: String,
  calorieGoal: Number
}
```

---

## Environment Variables

### Backend (`backend/.env`)
Use `backend/.env.example` as template:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxx.mongodb.net/health_food_app?retryWrites=true&w=majority
JWT_SECRET=super_secret_jwt_key
JWT_EXPIRES_IN=7d
```

### Frontend (`frontend/.env`)
Use `frontend/.env.example` as template:

```env
EXPO_PUBLIC_API_URL=http://localhost:5000
```

---

## Local Setup Instructions

### 1) Clone and install backend
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### 2) Install and run frontend
```bash
cd ../frontend
npm install
cp .env.example .env
npm run start
```

Then run app on simulator/device from Expo QR.

---

## Deployment Guide

### Backend (Render/Railway)
1. Push repository to GitHub.
2. Create a new Web Service using `backend` folder.
3. Set environment variables:
   - `PORT`
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `JWT_EXPIRES_IN`
4. Build command: `npm install`
5. Start command: `npm start`
6. Copy deployment URL, e.g. `https://your-api.onrender.com`

### MongoDB Atlas
1. Create cluster and database user.
2. Whitelist IP (`0.0.0.0/0` for development or restricted IP in production).
3. Use connection string in `MONGODB_URI`.

### Frontend (Expo EAS)
1. Install EAS CLI:
   ```bash
   npm install -g eas-cli
   ```
2. Login and configure:
   ```bash
   cd frontend
   eas login
   eas build:configure
   ```
3. Set `EXPO_PUBLIC_API_URL` to deployed backend URL.
4. Build:
   ```bash
   eas build --platform android
   # or
   eas build --platform ios
   ```

For quick testing you can also use Expo Go with:
```bash
npm run start
```

---

## Notes
- This project intentionally uses **rule-based filtering** (no ML model).
- The admin role can be set manually in MongoDB by updating a user document (`role: "admin"`).
