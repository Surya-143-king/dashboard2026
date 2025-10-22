# User Management System

## Overview

A modern full-stack user management application built with React, Express, and PostgreSQL. The application provides a comprehensive interface for managing user profiles with detailed personal information, education, skills, and work experience. It features a purple-themed, Material Design-inspired UI built with shadcn/ui components and Tailwind CSS.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite for fast development and optimized production builds
- **Routing:** Wouter for lightweight client-side routing
- **State Management:** TanStack Query (React Query) for server state management
- **Form Handling:** React Hook Form with Zod validation resolvers
- **UI Components:** shadcn/ui component library built on Radix UI primitives
- **Styling:** Tailwind CSS with custom purple theme configuration

**Design System:**
- Hybrid approach combining Material Design principles with custom purple branding
- Dark mode support with comprehensive color system (HSL-based)
- Custom design tokens for primary purple colors (270° hue, varying lightness/saturation)
- Semantic colors for success, error, and warning states
- Typography system using Inter font family
- Responsive breakpoints with mobile-first approach

**Component Structure:**
- Reusable UI components in `client/src/components/ui/`
- Feature-specific components (AddUserModal, BasicInfoTab, EducationSkillsTab, ExperienceTab)
- Page components (UserList, UserProfile, NotFound)
- Form validation using Zod schemas with inline error display

**Data Flow:**
- TanStack Query manages API requests, caching, and invalidation
- Optimistic updates for improved user experience
- Toast notifications for user feedback on actions
- Client-side form validation before API submission

### Backend Architecture

**Technology Stack:**
- **Runtime:** Node.js with Express.js framework
- **Language:** TypeScript with ES modules
- **ORM:** Drizzle ORM for type-safe database operations
- **Validation:** Zod for request validation with drizzle-zod integration
- **Build:** esbuild for production bundling

**API Design:**
- RESTful API endpoints under `/api/users` namespace
- CRUD operations: GET (list/single), POST (create), PATCH (update), DELETE
- Request validation using Zod schemas derived from database schema
- Consistent error responses with appropriate HTTP status codes
- JSON request/response format

**Storage Layer:**
- Dual storage implementation: In-memory storage (MemStorage) for development
- Database-ready with schema defined using Drizzle ORM
- User table with comprehensive fields for personal, education, and professional information
- Work experience stored as JSON-serialized array
- UUID primary keys for users

**Development Environment:**
- Vite middleware integration for hot module replacement in development
- Custom logging middleware for API request tracking
- Error handling with process exit on critical Vite errors
- Static file serving for production builds

### Database Schema

**Users Table:**
- Personal Information: firstName, lastName, email, yearOfBirth, gender, phone, alternatePhone
- Address Details: address, pincode, domicileState, domicileCountry
- Education: school, degree, course, yearOfCompletion, grade
- Professional: skills, projects, workExperience (JSON), linkedIn, resume
- Primary key: UUID (auto-generated)
- Unique constraint on email field

**Schema Management:**
- Drizzle Kit for migrations and schema push
- Type-safe schema definitions with automatic TypeScript inference
- Zod schemas generated from Drizzle schema for runtime validation
- Insert and Update schemas with appropriate field requirements

### External Dependencies

**Database:**
- PostgreSQL via Neon serverless driver (@neondatabase/serverless)
- Connection managed through DATABASE_URL environment variable
- Drizzle ORM as abstraction layer

**UI Component Libraries:**
- Radix UI primitives for accessible, unstyled components (20+ component primitives)
- shadcn/ui configuration with "new-york" style variant
- Lucide React for consistent iconography
- embla-carousel-react for carousel functionality
- cmdk for command palette patterns

**Form & Validation:**
- React Hook Form for performant form state management
- Zod for schema validation
- @hookform/resolvers for integration between the two
- drizzle-zod for database schema to validation schema conversion

**Styling & Theming:**
- Tailwind CSS with custom configuration
- PostCSS for CSS processing
- class-variance-authority for component variant management
- clsx and tailwind-merge for conditional class composition
- Custom CSS variables for theme consistency

**Development Tools:**
- Replit-specific plugins for development experience
- TypeScript for type safety across the stack
- Vite plugins for enhanced development workflow

**Utilities:**
- date-fns for date manipulation and formatting
- nanoid for unique ID generation
- wouter for lightweight routing