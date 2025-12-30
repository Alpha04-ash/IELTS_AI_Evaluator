# Technical Specification: IELTS AI Mock Test Platform

## Technical Context
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Shadcn UI + Framer Motion
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js (Credentials Provider)
- **AI**: Google Generative AI (Gemini Pro)
- **Scraping**: Cheerio or Puppeteer (depending on site complexity)
- **State Management**: React Context / Server Actions

## Technical Implementation Brief
- **Auth**: Custom logic to handle the `admin/1234!` case explicitly, while allowing normal registration for students.
- **Scraper**: A server-side utility that fetches exam data. Since real-time scraping is requested, we will implement caching to avoid redundant requests and improve speed.
- **AI Integration**: Gemini will be used to analyze Writing essays and Speaking transcripts. For Speaking, we'll use the Web Speech API for STT (Speech-to-Text) and feed the transcript to Gemini.
- **Database Schema**:
    - `User`: Handles accounts and roles.
    - `Exam`: Stores scraped exam data (temporarily cached).
    - `Result`: Stores student scores and AI feedback.

## Source Code Structure
```
src/
  app/              # Next.js App Router (pages, layouts, api)
    (auth)/         # Auth routes (login, register)
    dashboard/      # Student/Admin dashboards
    test/           # Mock test interface
  components/       # UI Components (Shadcn + Custom)
    ui/             # Base primitives
    test/           # IELTS specific components (timer, modules)
  lib/              # Shared utilities
    ai/             # Gemini API wrapper
    scraper/        # Scraping logic
    prisma.ts       # DB client
  hooks/            # Custom React hooks (voice-to-text, etc.)
  types/            # TypeScript interfaces
```

## Contracts

### Data Models (Prisma)
```prisma
model User {
  id        String   @id @default(cuid())
  username  String   @unique
  password  String
  role      String   @default("student") // "admin" or "student"
  results   Result[]
}

model Result {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  type      String   // "LISTENING", "READING", "WRITING", "SPEAKING"
  score     Float
  feedback  String   @db.Text
  createdAt DateTime @default(now())
}
```

### API Endpoints
- `POST /api/auth/register`: Create user account.
- `GET /api/exams/scrape`: Trigger/Fetch exam data.
- `POST /api/ai/grade`: Send student input to Gemini for grading.

## Delivery Phases

### Phase 1: Foundation & Auth
- Initialize Next.js, Prisma, and Tailwind.
- Implement login/registration with hardcoded `admin` check.
- Create basic layout and navigation.

### Phase 2: Scraping & Content
- Build the scraper for IELTS exam content.
- Implement the Reading and Listening test UI.

### Phase 3: AI & Interactivity
- Integrate Gemini API.
- Build Writing test with AI grading.
- Build Speaking test with Voice-to-Text and AI feedback.

### Phase 4: Admin Dashboard & Refinement
- Create admin view for user results.
- Final polish on design and animations.

## Verification Strategy
- **Linting**: `npm run lint`
- **Scraper Test**: Helper script `scripts/test-scraper.ts` to verify data extraction from target sites.
- **AI Test**: Helper script `scripts/test-gemini.ts` to verify prompt responses.
- **Auth Test**: Manual verification of admin login and protected routes.
