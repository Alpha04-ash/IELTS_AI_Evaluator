# Feature Specification: IELTS AI Mock Test Platform

## User Stories

### User Story 1 - Student Registration and Login
**Acceptance Scenarios**:
1. **Given** a new student on the landing page, **When** they fill out the registration form, **Then** a new account is created in the PostgreSQL database.
2. **Given** a registered student, **When** they enter their credentials, **Then** they are redirected to the student dashboard.

### User Story 2 - Taking a Mock Test
**Acceptance Scenarios**:
1. **Given** an authenticated student, **When** they start a "Full Mock Test", **Then** the system scrapes a real IELTS exam and presents Listening, Reading, Writing, and Speaking modules sequentially.
2. **Given** a Speaking test module, **When** the student speaks, **Then** Gemini AI processes the audio/text and provides real-time feedback and grading.

### User Story 3 - AI Grading and Feedback
**Acceptance Scenarios**:
1. **Given** a completed Writing or Speaking test, **When** the student submits, **Then** Gemini AI provides a band score (1-9) and detailed feedback based on IELTS criteria.
2. **Given** completed Reading and Listening tests, **When** the student finishes, **Then** the system automatically calculates the score based on correct answers.

### User Story 4 - Admin Access
**Acceptance Scenarios**:
1. **Given** the login page, **When** the user enters username `admin` and password `1234!`, **Then** they gain access to the Admin Dashboard.
2. **Given** the Admin Dashboard, **When** the admin views the list of users, **Then** they can see all registered students and their test results.

## Requirements

### Functional Requirements
- **Authentication**: JWT-based auth with NextAuth.js or custom middleware.
- **IELTS Modules**:
    - **Listening**: Audio playback with real-time question answering.
    - **Reading**: Split-screen view (Text on left, Questions on right).
    - **Writing**: Text editor with word count and Gemini AI feedback.
    - **Speaking**: Voice-to-text (Web Speech API) and Text-to-speech integration with Gemini AI conversation.
- **Web Scraping**: Server-side logic to fetch latest IELTS exams from reliable sources (e.g., ielts-exam.net).
- **AI Examiner**: Integration with Google Gemini API for grading Writing and Speaking modules.
- **Admin Panel**: Restricted access to view user data and manage content.

### Non-Functional Requirements
- **UI/UX**: Minimalistic, clean, and modern design using Tailwind CSS and Framer Motion.
- **Performance**: Fast loading times for audio and scraped content.
- **Security**: Password hashing and protected API routes.

## Success Criteria
- Students can successfully complete a full IELTS mock test (4 modules).
- Gemini AI provides accurate feedback and band scores.
- Admin can log in with specific credentials and view user data.
- The design is responsive and minimalistic.
