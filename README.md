# 🏷️ Printify Pro

> **Version**: Beta 0.1.7  
> **Status**: Active Development

A comprehensive label management and printing system built with Next.js 14, featuring role-based access control, customizable label templates, and real-time activity tracking.

![Next.js](https://img.shields.io/badge/Next.js-14.2.9-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-6.3.1-2D3748?logo=prisma)
![Material-UI](https://img.shields.io/badge/Material--UI-6.0.2-007FFF?logo=mui)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Database Setup](#-database-setup)
- [Running the Application](#-running-the-application)
- [Project Structure](#-project-structure)
- [API Routes](#-api-routes)
- [Authentication](#-authentication)
- [Deployment](#-deployment)
- [Contributing](#-contributing)

---

## ✨ Features

### 🔐 User Management
- **Role-Based Access Control** (Admin, Manager, User)
- Secure authentication with NextAuth.js
- User registration and profile management
- Activity tracking and audit logs

### 🏷️ Label Management
- **Customizable Label Templates** (4x4, 4x6 formats)
- Multi-language support (English/Chinese)
- Barcode and QR code generation
- Batch label printing
- Real-time label preview

### 📊 Dashboard & Analytics
- Activity monitoring dashboard
- User statistics and reports
- Label history tracking
- Role-based dashboard views

### 🎨 UI/UX
- Modern Material-UI design system
- Responsive layout for all devices
- Dark/Light theme support
- Lottie animations
- Print-optimized views

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **UI Library**: Material-UI (MUI) v6
- **State Management**: SWR for data fetching
- **Styling**: Emotion (CSS-in-JS)
- **Animations**: Lottie, DotLottie
- **Rich Text Editor**: TipTap

### Backend
- **API**: Next.js API Routes
- **Database**: PostgreSQL (Supabase)
- **ORM**: Prisma 6.3.1
- **Authentication**: NextAuth.js v4
- **Password Hashing**: bcryptjs

### DevOps
- **Hosting**: Vercel
- **Database Pooling**: PgBouncer
- **CI/CD**: GitHub Actions (keep-alive automation)
- **Package Manager**: pnpm

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v18 or higher
- **pnpm**: v8 or higher (or npm/yarn)
- **PostgreSQL**: v14 or higher (or Supabase account)
- **Git**: Latest version

---

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/LeviChen559/pritifyPro.git
   cd printify_pro
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   *(See [Environment Variables](#-environment-variables) section below)*

4. **Generate Prisma client**
   ```bash
   pnpm prisma generate
   ```

5. **Run database migrations**
   ```bash
   pnpm prisma db push
   # or for production
   pnpm prisma migrate deploy
   ```

---

## 🔑 Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Database Configuration (Supabase/PostgreSQL)
POSTGRES_PRISMA_URL_pgbouncer="postgresql://user:password@host:6543/database?pgbouncer=true"
POSTGRES_URL_NON_POOLING="postgresql://user:password@host:5432/database"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here" # Generate with: openssl rand -base64 32

# Public Site URL
NEXT_PUBLIC_SITE_URL="http://localhost:3000"

# Optional: Legacy Database (if migrating)
DATABASE_HOST="localhost"
DATABASE_USER="postgres"
DATABASE_PASSWORD="password"
DATABASE_NAME="printify_pro"
```

### 🔐 Security Notes
- Never commit `.env.local` to version control
- Use strong, unique values for `NEXTAUTH_SECRET`
- For production, use environment-specific URLs

---

## 🗄️ Database Setup

### Using Supabase (Recommended)

1. Create a [Supabase](https://supabase.com) account
2. Create a new project
3. Copy the connection strings from Project Settings → Database
4. Update `.env.local` with your credentials
5. Run migrations:
   ```bash
   pnpm prisma db push
   ```

### Local PostgreSQL

1. Install PostgreSQL locally
2. Create a new database:
   ```sql
   CREATE DATABASE printify_pro;
   ```
3. Update `.env.local` with local credentials
4. Run migrations:
   ```bash
   pnpm prisma migrate dev
   ```

### Database Schema

The application uses the following main tables:
- **users**: User accounts with role-based access
- **mylabels**: Custom label configurations
- **activities**: Activity logs and audit trail
- **labelstyle**: Label template styling configurations

---

## 🏃 Running the Application

### Development Mode
```bash
pnpm dev
```
Access the app at [http://localhost:3000](http://localhost:3000)

### Production Build
```bash
pnpm build
pnpm start
```

### Linting
```bash
pnpm lint
```

### Database Management
```bash
# Open Prisma Studio (GUI for database)
pnpm prisma studio

# Reset database (CAUTION: Deletes all data)
pnpm prisma migrate reset

# Generate Prisma client
pnpm prisma generate
```

---

## 📁 Project Structure

```
printify_pro/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── migrations/            # Migration files
├── src/
│   ├── app/
│   │   ├── api/               # API routes
│   │   │   ├── auth/          # NextAuth endpoints
│   │   │   ├── prisma/        # Database operations
│   │   │   └── keepalive/     # Database keep-alive
│   │   ├── dashboard/         # Dashboard pages
│   │   │   ├── mylabels/      # Label management
│   │   │   ├── admin/         # Admin panel
│   │   │   ├── roles/         # Role management
│   │   │   └── setting/       # User settings
│   │   ├── signin/            # Sign-in page
│   │   ├── signup/            # Sign-up page
│   │   └── page.tsx           # Home page
│   ├── components/            # Reusable components
│   │   ├── activitiesTable/   # Activity logs table
│   │   ├── labelTable/        # Label listing table
│   │   ├── userTable/         # User management table
│   │   └── ...
│   ├── section/               # Page sections
│   │   ├── labelCards/        # Label templates (4x4, 4x6)
│   │   ├── labelEditCard/     # Label editor
│   │   ├── labelPrintCard/    # Print preview
│   │   └── sideBar/           # Navigation sidebar
│   ├── store/                 # State management
│   │   └── formStore.tsx      # Form state (Zustand/Context)
│   ├── utils/
│   │   ├── lib/               # Utility functions
│   │   │   ├── auth.ts        # Auth configuration
│   │   │   ├── prisma.ts      # Prisma client
│   │   │   └── help.ts        # Helper functions
│   │   └── db/                # Database utilities
│   ├── theme/                 # MUI theme configuration
│   └── type/                  # TypeScript definitions
├── .github/
│   └── workflows/
│       └── keepalive.yml      # Auto keep-alive workflow
├── package.json
├── tsconfig.json
└── next.config.mjs
```

---

## 🔌 API Routes

### Authentication
- `POST /api/auth/signin` - User sign-in
- `POST /api/auth/signout` - User sign-out
- `GET /api/auth/session` - Get current session

### User Management
- `GET /api/prisma/getUsers` - Fetch all users
- `POST /api/prisma/addUser` - Create new user
- `DELETE /api/prisma/addUser` - Delete user
- `PUT /api/prisma/updateUser` - Update user details

### Label Operations
- `GET /api/prisma/getLabels` - Fetch labels
- `POST /api/prisma/addNewActive` - Create new label
- `PUT /api/prisma/updateLabel` - Update label
- `DELETE /api/prisma/deleteLabel` - Delete label

### System
- `GET /api/keepalive` - Database keep-alive endpoint (pinged by GitHub Actions)

---

## 🔐 Authentication

### NextAuth.js Configuration

The app uses **NextAuth.js** with:
- **Provider**: Credentials (email/password)
- **Adapter**: Prisma Adapter
- **Session Strategy**: JWT
- **Password Security**: bcrypt hashing

### User Roles
1. **Admin**: Full system access
2. **Manager**: Label management + user viewing
3. **User**: Label viewing and printing only

### Protected Routes
- All `/dashboard/*` routes require authentication
- Role-based access control implemented via middleware

---

## 🌐 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables from `.env.local`
   - Deploy

3. **Configure Database**
   - Ensure Supabase connection strings are set
   - Run migrations: `pnpm prisma migrate deploy`

### Environment Variables in Vercel
Add all variables from `.env.local` to Vercel's Environment Variables section.

### GitHub Actions Keep-Alive
The repository includes a GitHub Actions workflow (`.github/workflows/keepalive.yml`) that:
- Pings `/api/keepalive` every 6 days
- Prevents Supabase free-tier from auto-pausing
- Maintains database connection

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style
- Follow TypeScript best practices
- Use ESLint configuration provided
- Write meaningful commit messages

---

## 📄 License

This project is private and proprietary. All rights reserved.

---

## 👨‍💻 Author

**Levi Chen**
- GitHub: [@LeviChen559](https://github.com/LeviChen559)
- Project: [pritifyPro](https://github.com/LeviChen559/pritifyPro)

---

## 🐛 Known Issues

- Password comparison in auth may need optimization
- Database connection pooling requires monitoring in production
- Free-tier Supabase requires keep-alive automation

---

## 📝 Changelog

### Beta 0.1.7 (Current)
- Implemented keep-alive automation
- Added role-based access control
- Improved label printing system
- Enhanced UI/UX with Lottie animations

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org) - React framework
- [Prisma](https://prisma.io) - Database ORM
- [Material-UI](https://mui.com) - UI components
- [Supabase](https://supabase.com) - Database hosting
- [Vercel](https://vercel.com) - Deployment platform

---

**Happy Printing! 🏷️✨**
