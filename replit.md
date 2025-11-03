# AI Chat Interface

## Overview

This is a modern AI chat application built with a full-stack TypeScript architecture. The application provides a ChatGPT-inspired interface where users can have conversations with an AI assistant. It features a clean, distraction-free chat experience with conversation history management, theme switching, and responsive design that works seamlessly across devices.

The application uses the PublicAI API (specifically the swiss-ai/apertus-70b-instruct model) to power AI responses and stores conversation data in memory (with support for PostgreSQL via Drizzle ORM).

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System:**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server
- Wouter for lightweight client-side routing
- Single-page application (SPA) architecture

**State Management:**
- React Context API for global chat state (ChatContext)
- TanStack Query (React Query) for server state management and API caching
- Local component state with React hooks

**UI Component System:**
- shadcn/ui component library with Radix UI primitives
- Tailwind CSS for styling with custom design tokens
- Theme system supporting light/dark modes via ThemeProvider
- Custom CSS variables for color scheme and spacing consistency
- ChatGPT-inspired design patterns emphasizing clarity and minimal distraction

**Key Design Decisions:**
- **Problem:** Need consistent, accessible UI components
- **Solution:** shadcn/ui with Radix UI for accessibility and customization
- **Rationale:** Provides production-ready components while maintaining full styling control

### Backend Architecture

**Server Framework:**
- Express.js for HTTP server and API routing
- TypeScript with ES modules
- HTTP server creation via Node's native `http` module

**API Design:**
- RESTful endpoints under `/api` prefix:
  - `GET /api/conversations` - List all conversations
  - `GET /api/conversations/:id` - Get specific conversation
  - `POST /api/chat` - Send message and get AI response
  - `DELETE /api/conversations/:id` - Delete conversation
- JSON-based request/response format
- Error handling with HTTP status codes

**Storage Layer:**
- In-memory storage implementation (MemStorage class)
- Interface-based design (IStorage) allowing for database swapping
- Drizzle ORM configured for PostgreSQL (schema defined but using in-memory currently)
- Session storage configuration using connect-pg-simple

**Key Design Decisions:**
- **Problem:** Need flexible storage that can start simple and scale
- **Solution:** Interface-based storage abstraction with in-memory default
- **Rationale:** Allows rapid development and testing while maintaining upgrade path to persistent database

### Data Models

**Schema Definition (shared/schema.ts):**
- User model with username/password fields
- Conversation model with messages array, timestamps, and metadata
- Message model with role (user/assistant), content, and timestamp
- Zod schemas for runtime validation

**Key Design Decisions:**
- **Problem:** Type safety across frontend and backend
- **Solution:** Shared TypeScript types and Zod validation schemas
- **Rationale:** Single source of truth prevents type mismatches and enables runtime validation

### Development & Build Process

**Development Mode:**
- Vite dev server with HMR (Hot Module Replacement)
- Express middleware mode for API integration
- Replit-specific plugins for development experience

**Production Build:**
- Vite builds client to `dist/public`
- esbuild bundles server code to `dist`
- Static file serving in production mode

**Key Design Decisions:**
- **Problem:** Seamless development experience with API and frontend
- **Solution:** Vite middleware mode integrated with Express
- **Rationale:** Single development server, no CORS issues, simplified proxy setup

## External Dependencies

### AI Service Integration
- **PublicAI API** (https://api.publicai.co/v1/chat/completions)
  - Model: swiss-ai/apertus-70b-instruct
  - Authentication via Bearer token (PUBLICAI_API_KEY environment variable)
  - Used for generating AI responses to user messages

### Database
- **PostgreSQL** (via Neon serverless driver)
  - Connection via DATABASE_URL environment variable
  - Drizzle ORM for type-safe database queries
  - Migration system configured with drizzle-kit
  - Currently using in-memory storage; PostgreSQL integration available

### UI Component Libraries
- **Radix UI** - Accessible component primitives (dialogs, dropdowns, tooltips, etc.)
- **shadcn/ui** - Pre-styled component system built on Radix UI
- **Lucide React** - Icon library for UI elements

### Styling & Design
- **Tailwind CSS** - Utility-first CSS framework
- **Google Fonts** - Inter font family for UI typography
- **class-variance-authority** - Type-safe component variants
- **tailwind-merge** & **clsx** - Conditional className utilities

### State & Data Management
- **TanStack Query** - Server state management, caching, and synchronization
- **React Hook Form** - Form state management (configured, not actively used)
- **Zod** - Schema validation for TypeScript

### Development Tools
- **Replit-specific plugins** - Development banner, cartographer, error overlay
- **tsx** - TypeScript execution for development server
- **esbuild** - Fast JavaScript bundler for production builds

### Key Integration Decisions
- **Problem:** Need reliable AI completions with minimal setup
- **Solution:** PublicAI API with swiss-ai model
- **Rationale:** Provides capable AI model without complex infrastructure

- **Problem:** Database that works in serverless environments
- **Solution:** Neon PostgreSQL with serverless driver
- **Rationale:** Edge-compatible, scalable, and developer-friendly for Replit deployments