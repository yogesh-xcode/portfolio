# Changelog

## 2026-03-11 11:27 IST
- Migrated `portfolio.html` into the Next.js App Router app.
- Rebuilt the full page structure in `src/app/page.tsx` with React-compatible markup.
- Ported design system and section styles into `src/app/globals.css`.
- Added client-side interactions in React (`custom cursor`, `scroll reveal`, `sticky nav scroll state`).
- Updated root layout fonts and metadata in `src/app/layout.tsx`.
- Created root `trash/` and moved original source file to `trash/portfolio.html`.

## 2026-03-11 11:32 IST
- Updated portfolio content using resume data from `YOGESHRESUME#1.pdf`.
- Personal branding updated from placeholder identity to `Yogesh` / `yogesh.dev`.
- Hero, stats, service descriptions, project cards, and about content now reflect real experience:
  - Full Stack Developer Consultant at Vocman India (Jan 2026 - Present)
  - Full Stack Developer Intern at MoviCloud Innovations (May 2025 - Jul 2025)
  - B.Sc Computer Science, Bharathidasan University (Graduated May 2025)
- Tech stack tags aligned to resume (Laravel, Node.js, React/Next.js, MySQL/MariaDB, REST APIs, SQL optimization, debugging).
- Contact section updated with resume details:
  - Email: `yogesh.xcode@gmail.com`
  - Phone: `+91 74486 24928`
  - LinkedIn: `linkedin.com/in/yogesh-xcode`
- Footer links changed to working Email / LinkedIn / Call actions.

## 2026-03-11 11:34 IST
- Removed academic details from the portfolio content per request.
- Replaced the stats item that referenced graduation with a work-focused production support metric.
- Tightened service tech tags to only include resume-listed skills/areas (`Schema Design`, `Indexing`, `API Integration`, `FTP Deployment`, `Debugging`).
- Updated About sidebar copy to focus only on current role/work scope.

## 2026-03-11 11:37 IST
- Removed remaining non-resume technology labels from project tags.
- Standardized technology wording to match resume phrasing (for example: `Laravel (PHP)`, `REST API development`, `SQL query optimization`, `environment configuration`).
- Expanded the `Core Stack` list to include only explicit resume-listed technologies and skills, with no combined/invented labels.

## 2026-03-11 11:38 IST
- Corrected MoviCloud project wording to explicitly state DMS and PMS were two separate systems.
- Updated the project outcome text to reference impact across both DMS and PMS implementations.

## 2026-03-11 11:40 IST
- Reworked the Work section to show exactly 3 projects with project-specific technologies.
- Split MoviCloud work into two separate project cards:
  - `Drive Management Service (DMS)`
  - `Patient Management System (PMS)`
- Updated project tech tags so they match the actual development stack used per project and removed mismatched combinations.
- Switched project grid layout from `grid-2` to `grid-3` to display all three projects consistently on desktop.

## 2026-03-11 11:41 IST
- Updated contact email across the app to your domain email: `yogesh@yogeshbuilds.in`.
- Updated visible brand/domain text from `yogesh.dev` to `yogeshbuilds.in` in navigation and footer.

## 2026-03-11 11:50 IST
- Updated all 3 project cards to match your clarified project scopes and primary stacks.
- Project 1 changed from email-management framing to a Chennai Metro full operations management platform, with role context as 1 of 2 developers.
- Project 1 stack corrected to: `Laravel (PHP)`, `MariaDB`, `Blade`, `Bootstrap`, `JavaScript`.
- Project 2 (DMS) stack corrected to: `Next.js`, `shadcn/ui`, `React`, `Supabase`, `TypeScript`.
- Project 3 (PMS) stack corrected to: `Python`, `FastAPI`, `Tesseract`, `Laravel (PHP)`, `MongoDB`, `Redis`, `Gemini API`.

## 2026-03-11 11:57 IST
- Fixed Project 1 action text inconsistency by changing it to the same `Hire for ... Work →` pattern used by Projects 2 and 3.
- Added card body flex alignment so project link rows remain visually aligned even when project descriptions have different lengths.

## 2026-03-11 12:00 IST
- Aligned project card spacing above the green outcome box by introducing a shared `.project-summary` block (title + description) with consistent desktop min-height.
- Applied responsive override so the fixed summary height is disabled on smaller screens.

## 2026-03-11 12:03 IST
- Extended Project 2 (DMS) description with two additional lines for workflow/UI and Supabase integration context.
- Extended Project 3 (PMS) description with two additional lines covering FastAPI + Tesseract processing and Gemini API workflow support.

## 2026-03-11 12:06 IST
- Removed one added line from Project 2 and one added line from Project 3 descriptions to keep both cards concise.

## 2026-03-11 12:06 IST
- Reworked project card sizing to enforce consistent `project-title` and `project-desc` dimensions directly.
- Set fixed desktop min-heights and full-width blocks for project names and descriptions so all cards align uniformly.
- Kept responsive behavior by removing fixed min-heights on smaller screens.

## 2026-03-11 12:07 IST
- Removed one description line from Project 2.
- Removed one description line from Project 3.

## 2026-03-11 12:10 IST
- Fixed project-card vertical alignment by changing project title/description sizing from flexible min-heights to fixed desktop heights.
- Added overflow control to title and description blocks so the green outcome panel starts at the same vertical position across all three cards.
- Kept mobile behavior flexible by reverting fixed heights to auto on smaller screens.

## 2026-03-11 12:12 IST
- Tightened project-card spacing consistency by converting `.project-summary` into a fixed two-row grid (`title` + `description`) with explicit row heights.
- Removed internal margin-based spacing in title/description and moved spacing control to the summary grid, preventing drift in the green outcome panel start position.

## 2026-03-11 12:45 IST
- Implemented full contact form backend integration with `POST /api/contact` in `src/app/api/contact/route.ts`.
- Added Resend email workflow on submit:
  - Notification email to `contact@yogeshbuilds.in`
  - Auto-reply email to the visitor from `hello@yogeshbuilds.in` with `Reply-To: contact@yogeshbuilds.in`
- Added Google Sheets logging (`Sheet1!A:D`) using Google Service Account credentials from `GOOGLE_SERVICE_ACCOUNT_JSON` and sheet ID from `GOOGLE_SHEET_ID`.
- Added graceful partial-failure handling so email and Sheets operations are independent; request only fails when all channels fail.
- Converted contact section from `mailto` link to async form submission with loading, success, and error UI states.
- Added `.env.example` with required environment variables: `RESEND_API_KEY`, `GOOGLE_SERVICE_ACCOUNT_JSON`, `GOOGLE_SHEET_ID`.
