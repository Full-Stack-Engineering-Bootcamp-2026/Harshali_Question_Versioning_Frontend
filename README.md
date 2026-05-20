# VitalLog Frontend

Frontend application for the VitalLog Personal Health & Fitness Dashboard.

# Dependencies Used

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Redux Toolkit
- Redux Persist
- React Router DOM
- Axios
- React Hook Form
- Zod
- Recharts
- Sonner
- Lucide React


# Features

## Authentication

- Login/Register
- JWT-based authentication
- Protected routes
- Role-based routing
- Force password reset
- Forgot password flow
- Password strength indicator

## Member Features

- Member dashboard
- Vital logging & management
- Fitness activity logging
- Daily streak tracking
- Profile management
- Profile image upload
- Change password

## Staff Features

- View active members
- Access member dashboards
- Monitor member vitals
- Raise manual flags
- Resolve active flags
- View flagged members

## Admin Features

- Admin dashboard analytics
- Registration trend charts
- Flagged vitals distribution
- Manage staff accounts
- Platform monitoring

## UI & Dashboard Features

- Responsive layouts
- Role-based sidebar navigation
- Reusable components
- Pagination support
- Search and filters
- Interactive charts using Recharts
- Toast notifications using Sonner
- Minimal healthcare dashboard UI

## Additional Features

- Redux Persist authentication state
- Axios API integration
- Zod form validation
- Modular feature-based architecture
- Reusable dashboard components

---

# Environment Variables

Create a .env file in the root directory.

```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
```
