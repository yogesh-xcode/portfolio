"use client";

import { type ChangeEvent, type FormEvent, useEffect, useState } from "react";

type FormStatus = "idle" | "submitting" | "success" | "error";

interface ContactFormData {
  name: string;
  email: string;
  projectType: string;
  message: string;
}

export default function Home() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    projectType: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleFieldChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormStatus("submitting");
    setStatusMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const payload = (await response.json()) as { ok?: boolean; partial?: boolean; error?: string };

      if (!response.ok || !payload.ok) {
        throw new Error(payload.error ?? "Could not submit your message.");
      }

      setFormStatus("success");
      if (payload.partial) {
        setStatusMessage(
          "Message received. There was a temporary issue in one delivery channel, but your request was captured.",
        );
      } else {
        setStatusMessage("Message sent successfully. I will get back to you within 24 hours.");
      }
      setFormData({ name: "", email: "", projectType: "", message: "" });
    } catch {
      setFormStatus("error");
      setStatusMessage("Unable to send right now. Please try again in a moment.");
    }
  };

  useEffect(() => {
    const nav = document.getElementById("mainNav");
    const reveals = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));

    const onScroll = () => {
      nav?.classList.toggle("scrolled", window.scrollY > 50);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12 },
    );

    reveals.forEach((el) => observer.observe(el));

    let cleanupCursor = () => {};

    if (window.matchMedia("(pointer: fine)").matches) {
      const cursor = document.getElementById("cursor");
      const ring = document.getElementById("cursorRing");

      if (cursor && ring) {
        let mx = 0;
        let my = 0;
        let rx = 0;
        let ry = 0;
        let animationFrame = 0;

        const onMove = (event: MouseEvent) => {
          mx = event.clientX;
          my = event.clientY;
        };

        const animateCursor = () => {
          rx += (mx - rx) * 0.12;
          ry += (my - ry) * 0.12;
          cursor.style.left = `${mx}px`;
          cursor.style.top = `${my}px`;
          ring.style.left = `${rx}px`;
          ring.style.top = `${ry}px`;
          animationFrame = window.requestAnimationFrame(animateCursor);
        };

        const hoverTargets = Array.from(
          document.querySelectorAll<HTMLElement>(
            "a, button, .service-card, .project-card",
          ),
        );

        const onEnter = () => document.body.classList.add("cursor-hover");
        const onLeave = () => document.body.classList.remove("cursor-hover");

        hoverTargets.forEach((el) => {
          el.addEventListener("mouseenter", onEnter);
          el.addEventListener("mouseleave", onLeave);
        });

        document.addEventListener("mousemove", onMove);
        animationFrame = window.requestAnimationFrame(animateCursor);

        cleanupCursor = () => {
          document.removeEventListener("mousemove", onMove);
          hoverTargets.forEach((el) => {
            el.removeEventListener("mouseenter", onEnter);
            el.removeEventListener("mouseleave", onLeave);
          });
          window.cancelAnimationFrame(animationFrame);
          document.body.classList.remove("cursor-hover");
        };
      }
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
      cleanupCursor();
    };
  }, []);

  return (
    <>
      <div className="cursor" id="cursor" />
      <div className="cursor-ring" id="cursorRing" />

      <nav id="mainNav">
        <div className="nav-logo">
          <span>{"//"}</span> yogeshbuilds.in
        </div>
        <div className="nav-links">
          <a href="#work">Work</a>
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#contact" className="nav-cta">
            Hire Me
          </a>
        </div>
      </nav>

      <section id="hero">
        <div className="hero-bg-text">BUILD</div>

        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div className="hero-availability">
            <span className="dot" />
            Available for full-time and freelance roles · March 2026
          </div>

          <div className="hero-title display">
            I build reliable
            <br />
            <span className="italic">full-stack</span> systems
            <br />
            for operations-heavy teams.
          </div>

          <p className="body-lg hero-sub">
            Software Engineer based in Chennai. I ship Laravel, Node.js, and
            React solutions with clear communication and production ownership.
          </p>

          <div className="hero-actions">
            <a href="#work" className="btn-primary">
              View My Work
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a href="#contact" className="btn-ghost">
              Let&apos;s Talk
            </a>
          </div>
        </div>

        <div className="hero-scroll-hint">scroll</div>
      </section>

      <div className="stats-strip reveal">
        <div className="stat">
          <div className="stat-number">2</div>
          <div className="stat-label">Industry roles</div>
        </div>
        <div className="stat">
          <div className="stat-number">70%</div>
          <div className="stat-label">Manual effort reduced</div>
        </div>
        <div className="stat">
          <div className="stat-number">24h</div>
          <div className="stat-label">Response time</div>
        </div>
        <div className="stat">
          <div className="stat-number">Prod</div>
          <div className="stat-label">Production issue handling</div>
        </div>
      </div>

      <section id="services">
        <div className="container">
          <div className="section-header reveal">
            <div>
              <div className="section-index mono">01 / SERVICES</div>
              <div className="heading-lg">What I build</div>
            </div>
            <p className="body-lg" style={{ maxWidth: "320px", fontSize: "0.9rem" }}>
              Focused on three core disciplines - each delivered with precision
              and ownership.
            </p>
          </div>

          <div className="grid-3">
            <div className="service-card reveal reveal-delay-1">
              <div className="service-icon">⬡</div>
              <div className="service-title">Frontend Development</div>
              <p className="service-desc">
                Production-ready interfaces using React and Next.js with
                responsive layouts, clean UX flows, and maintainable TypeScript.
              </p>
              <div className="tech-tags">
                <span className="tag">React</span>
                <span className="tag">Next.js</span>
                <span className="tag">TypeScript</span>
                <span className="tag">JavaScript</span>
                <span className="tag">Responsive UI</span>
              </div>
            </div>

            <div className="service-card reveal reveal-delay-2">
              <div className="service-icon">⌗</div>
              <div className="service-title">Backend & APIs</div>
              <p className="service-desc">
                Scalable backend services using Laravel and Node.js with clean
                MVC patterns, REST APIs, and robust error handling.
              </p>
              <div className="tech-tags">
                <span className="tag">Laravel</span>
                <span className="tag">Node.js</span>
                <span className="tag">REST APIs</span>
                <span className="tag">MySQL</span>
                <span className="tag">MariaDB</span>
              </div>
            </div>

            <div className="service-card reveal reveal-delay-3">
              <div className="service-icon">◈</div>
              <div className="service-title">ERP & Workflow Systems</div>
              <p className="service-desc">
                End-to-end delivery for internal tools and process-heavy
                platforms, from schema design to deployment and debugging.
              </p>
              <div className="tech-tags">
                <span className="tag">Schema Design</span>
                <span className="tag">Indexing</span>
                <span className="tag">API Integration</span>
                <span className="tag">FTP Deployment</span>
                <span className="tag">Debugging</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="work">
        <div className="container">
          <div className="section-header reveal">
            <div>
              <div className="section-index mono">02 / SELECTED WORK</div>
              <div className="heading-lg">Projects</div>
            </div>
            <a href="#contact" className="btn-ghost">
              Start a project →
            </a>
          </div>

          <div className="grid-3">
            <div className="project-card reveal reveal-delay-1">
              <div className="project-image">
                <div className="mock-browser">
                  <div className="mock-browser-bar">
                    <span className="mock-dot" style={{ background: "#FF6B6B" }} />
                    <span className="mock-dot" style={{ background: "#FFD93D" }} />
                    <span className="mock-dot" style={{ background: "#6BCB77" }} />
                    <div className="mock-url" />
                  </div>
                  <div className="mock-content">
                    <div className="mock-line medium" />
                    <div className="mock-line short" />
                    <div className="mock-line medium" style={{ marginTop: "12px" }} />
                    <div className="mock-line" style={{ width: "90%" }} />
                  </div>
                </div>
              </div>
              <div className="project-body">
                <div className="project-meta">
                  <span className="project-type">Consulting · Vocman India</span>
                  <span className="project-year">2026</span>
                </div>
                <div className="project-summary">
                  <div className="project-title">
                    Chennai Metro Operations Management Platform
                  </div>
                  <p className="project-desc">
                    Worked as 1 of 2 developers on a full operations management
                    platform for Chennai Metro, covering core internal workflows
                    and day-to-day process handling.
                  </p>
                </div>
                <div className="project-outcome">
                  📈 Delivered production features across a large operations
                  management system in a lean 2-person team
                </div>
                <div className="tech-tags" style={{ marginBottom: "var(--s3)" }}>
                  <span className="tag">Laravel (PHP)</span>
                  <span className="tag">MariaDB</span>
                  <span className="tag">Blade</span>
                  <span className="tag">Bootstrap</span>
                  <span className="tag">JavaScript</span>
                </div>
                <div className="project-links">
                  <a href="#contact" className="project-link">
                    Hire for Ops Work →
                  </a>
                  <a href="mailto:yogesh@yogeshbuilds.in" className="project-link muted">
                    Contact →
                  </a>
                </div>
              </div>
            </div>

            <div className="project-card reveal reveal-delay-2">
              <div
                className="project-image"
                style={{ background: "linear-gradient(135deg,#E8E4D8,#D4EBE0)" }}
              >
                <div className="mock-browser">
                  <div className="mock-browser-bar">
                    <span className="mock-dot" style={{ background: "#FF6B6B" }} />
                    <span className="mock-dot" style={{ background: "#FFD93D" }} />
                    <span className="mock-dot" style={{ background: "#6BCB77" }} />
                    <div className="mock-url" />
                  </div>
                  <div className="mock-content">
                    <div
                      className="mock-line"
                      style={{
                        width: "45%",
                        height: "10px",
                        background: "var(--accent-lt)",
                      }}
                    />
                    <div className="mock-line short" style={{ marginTop: "10px" }} />
                    <div className="mock-line medium" />
                    <div className="mock-line short" />
                  </div>
                </div>
              </div>
              <div className="project-body">
                <div className="project-meta">
                  <span className="project-type">Internship · MoviCloud</span>
                  <span className="project-year">2025</span>
                </div>
                <div className="project-summary">
                  <div className="project-title">Drive Management Service (ERP)</div>
                  <p className="project-desc">
                    Built DMS as an ERP product for HR staffing operations,
                    similar to platforms like drivems.co.in and INFEC HR.
                    Integrated Supabase-backed data operations for daily use.
                  </p>
                </div>
                <div className="project-outcome">
                  🚀 Delivered a staffing-focused ERP experience for workflow,
                  records, and operations visibility
                </div>
                <div className="tech-tags" style={{ marginBottom: "var(--s3)" }}>
                  <span className="tag">Next.js</span>
                  <span className="tag">shadcn/ui</span>
                  <span className="tag">React</span>
                  <span className="tag">Supabase</span>
                  <span className="tag">TypeScript</span>
                </div>
                <div className="project-links">
                  <a href="#contact" className="project-link">
                    Hire for ERP Work →
                  </a>
                  <a href="mailto:yogesh@yogeshbuilds.in" className="project-link muted">
                    Contact →
                  </a>
                </div>
              </div>
            </div>

            <div className="project-card reveal reveal-delay-3">
              <div
                className="project-image"
                style={{ background: "linear-gradient(135deg,#D4EBE0,#EEEAE0)" }}
              >
                <div className="mock-browser">
                  <div className="mock-browser-bar">
                    <span className="mock-dot" style={{ background: "#FF6B6B" }} />
                    <span className="mock-dot" style={{ background: "#FFD93D" }} />
                    <span className="mock-dot" style={{ background: "#6BCB77" }} />
                    <div className="mock-url" />
                  </div>
                  <div className="mock-content">
                    <div className="mock-line medium" />
                    <div className="mock-line" style={{ width: "75%" }} />
                    <div className="mock-line short" />
                    <div className="mock-line medium" />
                  </div>
                </div>
              </div>
              <div className="project-body">
                <div className="project-meta">
                  <span className="project-type">Internship · MoviCloud</span>
                  <span className="project-year">2025</span>
                </div>
                <div className="project-summary">
                  <div className="project-title">Patient Management System (PMS)</div>
                  <p className="project-desc">
                    Built PMS for patient and report management with OCR-assisted
                    document workflows and AI-assisted data handling.
                    Implemented FastAPI and Tesseract services to process scanned
                    files and extract structured data.
                  </p>
                </div>
                <div className="project-outcome">
                  🚀 Improved reporting and patient data workflows through
                  service-based processing and AI API integrations
                </div>
                <div className="tech-tags" style={{ marginBottom: "var(--s3)" }}>
                  <span className="tag">Python</span>
                  <span className="tag">FastAPI</span>
                  <span className="tag">Tesseract</span>
                  <span className="tag">Laravel (PHP)</span>
                  <span className="tag">MongoDB</span>
                  <span className="tag">Redis</span>
                  <span className="tag">Gemini API</span>
                </div>
                <div className="project-links">
                  <a href="#contact" className="project-link">
                    Hire for PMS Work →
                  </a>
                  <a href="mailto:yogesh@yogeshbuilds.in" className="project-link muted">
                    Contact →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="process">
        <div className="container">
          <div className="section-header reveal">
            <div>
              <div className="section-index mono">03 / PROCESS</div>
              <div className="heading-lg">How I work</div>
            </div>
          </div>

          <div
            className="process-steps"
            style={{
              border: "1px solid var(--border)",
              borderRadius: "3px",
              overflow: "hidden",
            }}
          >
            <div className="process-step reveal reveal-delay-1">
              <div className="step-num">Step 01</div>
              <div className="step-title">Scope & Align</div>
              <p className="step-desc">
                I start with a 20-min discovery call to understand your goals,
                constraints, and timeline. Then I send a clear proposal - no
                ambiguity, no surprises.
              </p>
            </div>
            <div className="process-step reveal reveal-delay-2">
              <div className="step-num">Step 02</div>
              <div className="step-title">Build & Communicate</div>
              <p className="step-desc">
                Weekly async updates, shared staging environment from day one.
                You always know what&apos;s happening without having to ask.
              </p>
            </div>
            <div className="process-step reveal reveal-delay-3">
              <div className="step-num">Step 03</div>
              <div className="step-title">Ship & Hand Off</div>
              <p className="step-desc">
                Clean repo, documented codebase, deployment handled. You receive
                something you can actually maintain - not a black box.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="about">
        <div className="container">
          <div className="section-header reveal">
            <div>
              <div
                className="section-index mono"
                style={{ color: "rgba(247,246,242,0.3)" }}
              >
                04 / ABOUT
              </div>
              <div className="heading-lg" style={{ color: "var(--bg)" }}>
                The person
                <br />
                behind the code
              </div>
            </div>
          </div>

          <div className="about-grid">
            <div className="reveal">
              <div className="about-quote">
                I believe <em>great software</em> is built from strong backend
                logic and clear day-to-day communication.
              </div>
              <p className="body-lg" style={{ marginBottom: "var(--s4)" }}>
                I&apos;m Yogesh, a Software Engineer in Chennai with hands-on
                experience delivering production systems in consulting and
                startup environments. I focus on backend reliability, workflow
                automation, and practical full-stack execution.
              </p>
              <ul className="values-list">
                <li>
                  <span className="v-label">{"//"} Speed</span>
                  Fast doesn&apos;t mean sloppy. I ship quickly because I scope
                  tightly.
                </li>
                <li>
                  <span className="v-label">{"//"} Ownership</span>
                  I treat your project like it&apos;s mine. No task is &quot;not
                  my job.&quot;
                </li>
                <li>
                  <span className="v-label">{"//"} Code Quality</span>
                  Future-you (or your next dev) will thank me. Clean,
                  documented code every time.
                </li>
                <li>
                  <span className="v-label">{"//"} Communication</span>
                  I over-communicate by default. You&apos;ll never be left
                  wondering.
                </li>
              </ul>
            </div>

            <div className="about-sidebar reveal reveal-delay-2">
              <div className="sidebar-label">Core Stack</div>
              <div className="stack-grid">
                <span className="stack-item">JavaScript</span>
                <span className="stack-item">TypeScript</span>
                <span className="stack-item">React</span>
                <span className="stack-item">Next.js</span>
                <span className="stack-item">HTML</span>
                <span className="stack-item">CSS</span>
                <span className="stack-item">Laravel (PHP)</span>
                <span className="stack-item">Node.js</span>
                <span className="stack-item">MySQL</span>
                <span className="stack-item">MariaDB</span>
                <span className="stack-item">REST API development</span>
                <span className="stack-item">MVC architecture</span>
                <span className="stack-item">SQL query optimization</span>
                <span className="stack-item">Schema design</span>
                <span className="stack-item">Indexing</span>
                <span className="stack-item">FTP deployment</span>
                <span className="stack-item">Environment configuration</span>
                <span className="stack-item">Git</span>
                <span className="stack-item">Debugging</span>
                <span className="stack-item">API integration</span>
              </div>

              <div className="sidebar-label" style={{ marginTop: "var(--s4)" }}>
                Currently
              </div>
              <p
                style={{
                  fontSize: "0.82rem",
                  color: "rgba(247,246,242,0.5)",
                  lineHeight: 1.65,
                }}
              >
                Currently working as a Full Stack Developer Consultant at
                Vocman India, Chennai, building and maintaining
                workflow-focused web systems.
              </p>

              <a
                href="#contact"
                className="btn-primary"
                style={{
                  marginTop: "var(--s3)",
                  width: "100%",
                  justifyContent: "center",
                  background: "var(--accent)",
                }}
              >
                Work With Me →
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="contact">
        <div className="container">
          <div className="contact-grid">
            <div className="reveal">
              <div className="section-index mono">05 / CONTACT</div>
              <div className="contact-heading">
                Let&apos;s build
                <br />
                something <span className="italic">great.</span>
              </div>
              <p className="body-lg">
                Tell me about your project. I&apos;ll respond with a clear plan
                based on scope, constraints, and delivery timeline.
              </p>
              <p className="contact-note">
                Chennai, Tamil Nadu · +91 74486 24928 · I reply within 24 hours.
              </p>
            </div>

            <div className="reveal reveal-delay-2">
              <form className="contact-form" onSubmit={handleContactSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Jane Smith"
                    value={formData.name}
                    onChange={handleFieldChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="jane@yourcompany.com"
                    value={formData.email}
                    onChange={handleFieldChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="project-type">Project Type</label>
                  <select
                    id="project-type"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleFieldChange}
                  >
                    <option value="">Select one...</option>
                    <option>Frontend Development</option>
                    <option>Backend / API Engineering</option>
                    <option>Full-Stack Application</option>
                    <option>ERP Module</option>
                    <option>Complaint Automation System</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="project-details">Tell me about your project</label>
                  <textarea
                    id="project-details"
                    name="message"
                    placeholder="What are you building? What's your timeline and budget range?"
                    value={formData.message}
                    onChange={handleFieldChange}
                    required
                  />
                </div>
                <div className="form-submit">
                  <button type="submit" className="btn-primary" disabled={formStatus === "submitting"}>
                    Send Message
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      width="14"
                      height="14"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
                {statusMessage && (
                  <p className={`form-status ${formStatus === "error" ? "error" : "success"}`}>
                    {statusMessage}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="container footer-inner">
          <div className="footer-logo">
            <span>{"//"}</span> yogeshbuilds.in
          </div>
          <div>Yogesh · Software Engineer · Chennai · 2026</div>
          <div className="footer-links">
            <a href="mailto:yogesh@yogeshbuilds.in">Email</a>
            <a href="https://linkedin.com/in/yogesh-xcode" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href="tel:+917448624928">Call</a>
          </div>
        </div>
      </footer>
    </>
  );
}
