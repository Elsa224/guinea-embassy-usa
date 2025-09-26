# Consulat de Côte d'Ivoire - Website & Admin Dashboard

Official website and administration dashboard for the Consulate General of Côte d'Ivoire in New York.

![Côte d'Ivoire Flag Colors](https://img.shields.io/badge/Côte%20d'Ivoire-Orange%20%26%20Green-ff7f00?style=flat&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjZmY3ZjAwIi8+CjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSI2LjY3IiB5PSIxMy4zMyIgZmlsbD0iIzAwYWE0ZiIvPgo8L3N2Zz4K)
[![Next.js](https://img.shields.io/badge/Next.js-15.5.3-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-blue?style=flat&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.x-blue?style=flat&logo=tailwind-css)](https://tailwindcss.com/)

## 🏛️ Project Overview

This is a comprehensive Next.js application serving as both the public website and private administration dashboard for the Consulate General of Côte d'Ivoire in New York. The project features a modern design with Côte d'Ivoire's national colors (orange and green) and provides bilingual support (French/English).

### 🌟 Key Features

- **Public Website**: Consular services, news, events, and information
- **Admin Dashboard**: Complete content management system
- **Bilingual Support**: French (primary) and English
- **Authentication**: NextAuth.js v5 with role-based access control
- **Database**: PostgreSQL with Prisma ORM
- **Modern UI**: shadcn/ui components with Tailwind CSS v4
- **Responsive Design**: Mobile-first approach
- **Comprehensive Logging**: All operations tracked and auditable

## 🚀 Tech Stack

### Core Framework

- **Next.js 15.5.3** with App Router and Turbopack
- **React 19.1.0** with server components
- **TypeScript** with strict mode enabled

### Styling & UI

- **Tailwind CSS v4** with custom design system
- **shadcn/ui** components with Radix UI primitives
- **Framer Motion** for smooth animations
- **Lucide React** for icons
- **Custom Fonts**: Poppins, Inter, and Roboto

### Backend & Database

- **PostgreSQL** database
- **Prisma ORM** for database operations
- **NextAuth.js v5** (beta) for authentication
- **bcryptjs** for password hashing
- **Zod** for schema validation

### Development & Quality

- **ESLint** with Next.js configuration
- **Prettier** with import organization and Tailwind class sorting
- **TypeScript** strict mode
- **Turbopack** for faster builds and development

## 📁 Project Structure

```
📦 consulat-app-prod/
├── 🎨 app/                     # Next.js App Router
│   ├── 🏛️ (public)/           # Public website routes
│   │   ├── layout.tsx          # Public layout with navigation
│   │   ├── page.tsx            # Homepage
│   │   ├── services/           # Consular services pages
│   │   ├── actualites/         # News and announcements
│   │   └── mediatheque/        # Media gallery
│   ├── 🔐 admin/              # Admin dashboard (protected)
│   │   ├── layout.tsx          # Admin root layout
│   │   ├── page.tsx            # Dashboard overview
│   │   ├── posts/              # Content management
│   │   │   ├── page.tsx        # Posts list with search/filter
│   │   │   ├── new/            # Create new post
│   │   │   └── [id]/           # View/edit specific post
│   │   ├── users/              # User management
│   │   │   ├── page.tsx        # Users list with roles
│   │   │   ├── new/            # Create new user
│   │   │   └── [id]/           # View/edit user profile
│   │   └── not-found.tsx       # Custom 404 for admin
│   ├── 🔑 auth/               # Authentication pages
│   ├── 🛠️ api/                # API routes
│   │   ├── admin/              # Protected admin APIs
│   │   └── auth/               # NextAuth.js routes
│   └── globals.css             # Global styles and variables
├── 🧩 components/              # Reusable UI components
│   ├── admin/                  # Admin-specific components
│   │   ├── AdminLayout.tsx     # Admin dashboard layout
│   │   └── AdminHeader.tsx     # Admin navigation header
│   ├── layout/                 # Public layout components
│   └── ui/                     # shadcn/ui components
├── 🗃️ lib/                    # Utilities and configurations
│   ├── auth.ts                 # NextAuth.js configuration
│   ├── db.ts                   # Prisma client
│   ├── permissions.ts          # Role-based access control
│   ├── validations.ts          # Zod schemas
│   ├── logger.ts               # Custom logging system
│   └── middleware/             # Request middleware
├── 🗄️ prisma/                 # Database schema and migrations
│   ├── schema.prisma           # Database schema
│   ├── migrations/             # Database migrations
│   └── seed.ts                 # Database seeding
└── 📋 docs/                   # Documentation
    └── TROUBLESHOOTING.md      # Issues and solutions
```

## 🛠️ Installation & Setup

### Prerequisites

- **Node.js** 18+
- **pnpm** (recommended) or npm
- **PostgreSQL** database

### 1. Clone the Repository

```bash
git clone <repository-url>
cd consulat-app-prod
```

### 2. Install Dependencies

```bash
pnpm install
# or
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/consulat_db"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-key-here"

# Admin Credentials (for first login)
ADMIN_EMAIL="admin@consulat.ci"
ADMIN_PASSWORD="your-secure-password"
```

### 4. Database Setup

```bash
# Generate Prisma client
pnpm db:generate

# Push schema to database
pnpm db:push

# Seed the database (optional)
pnpm db:seed
```

### 5. Start Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.
Access the admin dashboard at [http://localhost:3000/admin](http://localhost:3000/admin).

## 🎛️ Available Scripts

### Development

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build production application
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier

### Database Operations

- `pnpm db:generate` - Generate Prisma client
- `pnpm db:push` - Push schema to database
- `pnpm db:migrate` - Run database migrations
- `pnpm db:seed` - Seed database with initial data
- `pnpm db:studio` - Open Prisma Studio
- `pnpm db:reset` - Reset database (⚠️ destructive)

## 🔐 Authentication & Authorization

### User Roles

- **SUPER_ADMIN**: Complete system access
- **ADMIN**: User management and content control
- **EDITOR**: Content creation and modification
- **AUTHOR**: Personal content creation only

### Default Admin Account

- **Email**: admin@consulat.ci
- **Password**: Set via `ADMIN_PASSWORD` environment variable

## 🎨 Design System

### Color Palette

- **CI Orange**: `#ff7f00` (Côte d'Ivoire flag orange)
- **CI Green**: `#00aa4f` (Côte d'Ivoire flag green)
- **Gradients**: Custom CSS gradients combining both colors

### Typography

- **Headings**: Poppins font family
- **Body**: Inter font family
- **Monospace**: Roboto Mono

### Components

- Uses shadcn/ui "new-york" style
- Stone base color scheme
- Consistent spacing and responsive breakpoints

## 🗄️ Database Schema

### Core Entities

- **User**: Authentication and role management
- **Post**: Bilingual content with categories and tags
- **Category**: Content organization
- **Tag**: Content labeling
- **Media**: File uploads and management
- **AuditLog**: Complete operation tracking

### Key Features

- **Bilingual JSON fields**: `{fr: string, en?: string}`
- **Role-based permissions**: Hierarchical access control
- **Soft deletes**: Data preservation
- **Comprehensive logging**: All operations tracked

## 🚀 Deployment

The project includes deployment scripts and PM2 configuration:

- `consulat_app_deploy.sh` - Primary deployment script
- `ecosystem.config.js` - PM2 process management

### Production Build

```bash
pnpm build
pnpm start
```

## 📋 Admin Dashboard Features

### 📝 Content Management

- **Posts Management**: Create, edit, delete articles with bilingual support
- **Categories & Tags**: Organize content with hierarchical categories
- **Media Library**: Upload and manage images, documents
- **Publishing Workflow**: Draft → Review → Published → Archived

### 👥 User Management

- **User CRUD**: Complete user lifecycle management
- **Role Assignment**: Granular permission control
- **Activity Tracking**: User action logging
- **Bulk Operations**: Efficient user management

### 📊 Dashboard Overview

- **Quick Stats**: Posts, users, media counts
- **Recent Activity**: Latest content and user actions
- **System Health**: Performance and error monitoring

### 🔍 Advanced Features

- **Search & Filtering**: Powerful content discovery
- **Pagination**: Efficient data loading
- **Responsive Design**: Works on all devices
- **Real-time Notifications**: Toast messages for feedback

## 🐛 Troubleshooting

For detailed troubleshooting guide, see [TROUBLESHOOTING.md](./docs/TROUBLESHOOTING.md).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary and confidential. All rights reserved by the Consulate General of Côte d'Ivoire in New York.

## 📞 Support

For technical support or questions:

- **Website**: [Consulate Official Website]
- **Phone**: (646) 476-7614
- **External Services**: express54.org

---

**🇨🇮 Consulat Général de Côte d'Ivoire - New York**
