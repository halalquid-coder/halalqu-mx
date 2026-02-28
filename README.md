# Halalqu MVP

Halalqu is a production-ready MVP web application built for a halal lifestyle discovery platform. This MVP focuses specifically on a halal food directory and verification layer.

## Architecture & Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS & Shadcn UI
- **Database:** SQLite (Development) -> easily swappable to PostgreSQL on Vercel
- **ORM:** Prisma
- **Data Fetching:** Next.js Server Components and Server Actions

## Features Completed
1. **Landing Page:** Modern hero section, value proposition, featured restaurants.
2. **Restaurant Directory:** Explore page with basic category and name search functionality.
3. **Restaurant Detail:** Dedicated page for each place, showing cover image, halal status badge, description, and reviews.
4. **Halal Status System:** Core differentiator with badge components indicating (MUI Certified, Community Verified, Muslim Owned, Self Claimed).
5. **Submit a Place:** Form to allow community submissions (defaults to unverified state).
6. **Admin Panel:** Dashboard to approve or reject pending submissions (placeholder auth).
7. **Auth Views:** Beautiful placeholder UI for Login, Register, and User Profile.

## Getting Started

Follow these steps to run the application locally:

### Prerequisites

Ensure you have Node.js and npm installed.

### Installation

1. Clone or navigate to the project directory:
   ```bash
   cd halalqu-web
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Setup the database and run the seed script:
   ```bash
   npx prisma generate
   npx prisma db push
   npm run db:seed
   ```
   > The seed script will populate the database with an admin user (`admin@halalqu.com` / `admin123`) and a few initial restaurants.

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Project Structure

- `src/app/`: Next.js App Router pages (Home, Explore, Submit, Admin, Login, Register, Profile)
- `src/components/`: Reusable UI components (Layouts, Shadcn components, Halal Status Badges, Restaurant Cards)
- `src/lib/`: Library configurations (Prisma client singleton)
- `prisma/`: Database schema and seed script

## Next Steps for Production

- Implement real authentication (e.g., NextAuth.js or Clerk) to protect the `/submit`, `/admin`, and `/profile` routes.
- Swap the local SQLite database to a cloud PostgreSQL instance (like Supabase or Vercel Postgres) for production deployment.
- Add real image uploading capabilities (e.g., using AWS S3 or Uploadthing) for place submissions and user profiles.
- Implement comprehensive input validation using Zod on server actions.

## Deployment

This app is ready to be deployed on Vercel.

1. Push your code to a GitHub repository.
2. Import the project in Vercel.
3. Add your `DATABASE_URL` to the Environment Variables.
4. Deploy!
