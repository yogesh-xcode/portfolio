<h1 align="center">Yogesh Portfolio v2</h1>
<p align="center">A production-ready Next.js portfolio with integrated contact workflows (Resend + Twilio WhatsApp).</p>
<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript" />
  <img src="https://img.shields.io/badge/Contact-Resend-000000?style=flat-square" />
  <img src="https://img.shields.io/badge/Alerts-Twilio%20WhatsApp-red?style=flat-square" />
</p>

---

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Getting Started](#getting-started)
5. [Project Structure](#project-structure)
6. [Configuration](#configuration)
7. [Contact API Behavior](#contact-api-behavior)
8. [Scripts](#scripts)
9. [Deployment Notes](#deployment-notes)

---

## Introduction

This repository contains the second version of `yogeshbuilds.in`, built with the Next.js App Router. It includes a fully designed single-page portfolio, interactive UI behavior, and a backend contact endpoint that sends email and WhatsApp notifications.

---

## Features

- Portfolio sections for hero, services, projects, about, and contact
- Custom cursor and reveal animations on the frontend
- Contact form submission to `POST /api/contact`
- Email notifications using Resend:
  - Owner notification
  - Visitor auto-reply
- WhatsApp notification using Twilio
- Graceful partial-failure handling across delivery channels
- Form validation for required fields and email format

---

## Tech Stack

| Tool | Purpose |
| --- | --- |
| [Next.js](https://nextjs.org) | App framework (App Router) |
| [React](https://react.dev) | UI rendering |
| [TypeScript](https://www.typescriptlang.org) | Type safety |
| [Resend](https://resend.com) | Contact email delivery |
| [Twilio](https://www.twilio.com) | WhatsApp notifications |
| [ESLint](https://eslint.org) | Linting |

---

## Getting Started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Configure environment variables

Create `.env.local` and set values:

```env
RESEND_API_KEY=
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
WHATSAPP_NUMBER=+917448624928
```

### 3. Run development server

```bash
pnpm dev
```

Open `http://localhost:3000`.

---

## Project Structure

```text
.
├── src/
│   └── app/
│       ├── api/
│       │   └── contact/
│       │       └── route.ts
│       ├── globals.css
│       ├── layout.tsx
│       └── page.tsx
├── public/
├── trash/
│   └── portfolio.html
├── .env.example
├── changelog.md
└── README.md
```

---

## Configuration

Use `.env.example` as a template and keep real credentials in `.env.local`.

Service requirements:
- Resend domain should be verified for your sender address.
- Twilio WhatsApp sender must be enabled in your Twilio account.

---

## Contact API Behavior

Endpoint: `POST /api/contact`

Expected payload:

```json
{
  "name": "Visitor Name",
  "email": "visitor@example.com",
  "message": "Hello, I'd like to work with you.",
  "projectType": "Optional"
}
```

On submit, the API attempts:
- Resend owner notification email
- Resend visitor auto-reply email
- Twilio WhatsApp notification

If all channels fail, it returns an error. If at least one succeeds, it returns success with a `partial` flag when needed.

---

## Scripts

```bash
pnpm dev      # start local dev server
pnpm lint     # run ESLint
pnpm build    # production build
pnpm start    # run production server
```

---

## Deployment Notes

- Set all required environment variables in your hosting platform.
- Keep secrets out of git.
- Verify DNS and sender setup for Resend and Twilio before going live.
