# Authentication Implementation

This document describes the authentication system implemented in the Food App.

## Features

### Login Page (`/login`)
- **Email/Password Login**: Users can log in with their email and password
- **Phone Login**: Alternative authentication via phone number
- **Auth Mode Toggle**: Switch between email and phone authentication
- **Social Login**: Google authentication option (ready for integration)
- **Responsive Design**: Fully responsive with gradient background and modern UI
- **Error Handling**: Clear error messages for failed authentication

### Signup Page (`/signup`)
- **Email/Password Registration**: Create account with name, email, and password
- **Phone Registration**: Alternative registration via phone number
- **Password Confirmation**: Validates that passwords match
- **Terms Agreement**: Checkbox for terms of service acceptance
- **Auth Mode Toggle**: Switch between email and phone registration
- **Social Signup**: Google authentication option (ready for integration)
- **Form Validation**: Client-side validation for all inputs

### Auth Modal Component
- **Reusable Modal**: Can be used anywhere in the app
- **Dual Mode**: Supports both login and signup modes
- **Toggle Between Modes**: Easy switching between login and signup
- **Compact Design**: Optimized for quick authentication

## Backend Updates

### User Model
- Added `email` and `password` fields
- Implemented bcrypt password hashing
- Added `matchPassword` method for password verification
- Made `phone` field optional (sparse index)

### Auth Controller
- `register`: New endpoint for email/password registration
- `login`: New endpoint for email/password authentication
- `loginOrRegister`: Existing phone authentication (renamed to `phone-login`)
- `verifyPhone`: Existing phone verification endpoint

### Auth Routes
- `POST /api/auth/register` - Email/password registration
- `POST /api/auth/login` - Email/password login
- `POST /api/auth/phone-login` - Phone authentication
- `POST /api/auth/verify-phone` - Phone verification

## Navigation Updates

### Navbar
- Added user display when logged in
- Sign In/Sign Out button with authentication logic
- Cart badge shows item count
- Navigation links to Login/Signup pages
- Admin link for admin users

### App Routes
- `/login` - Login page
- `/signup` - Signup page
- Protected routes for authenticated users
- Admin routes for admin users

## Usage

### Login
1. Navigate to `/login`
2. Choose authentication method (Email or Phone)
3. Enter credentials
4. Click "Login" or "Send Verification Code"

### Signup
1. Navigate to `/signup`
2. Choose registration method (Email or Phone)
3. Fill in required fields
4. Accept terms and conditions
5. Click "Create Account" or "Send Verification Code"

### Using Auth Modal
```jsx
import AuthModal from './components/AuthModal/AuthModal';

// In your component
const [showAuth, setShowAuth] = useState(false);

<button onClick={() => setShowAuth(true)}>Sign In</button>

{showAuth && (
  <AuthModal 
    onClose={() => setShowAuth(false)} 
    initialMode="login" // or "signup"
  />
)}
```

## Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Protected routes
- Token stored in localStorage
- Axios interceptor for automatic token injection

## Styling

- Modern gradient backgrounds
- Smooth transitions and hover effects
- Responsive design for mobile and desktop
- Consistent color scheme matching the app theme
- Form validation styling

## Future Enhancements

- [ ] Google OAuth integration
- [ ] Facebook login
- [ ] Password reset functionality
- [ ] Email verification
- [ ] Two-factor authentication
- [ ] Remember me functionality
- [ ] Session management
