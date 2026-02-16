import { Link } from "react-router-dom";
import {
  Building2,
  Users,
  BarChart3,
  Shield,
  Zap,
  Globe,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
} from "lucide-react";
import { useState } from "react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <HowItWorksSection />
      <FeaturesSection />
      <PricingSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

const Navbar = () => (
  <nav className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
    <div className="container mx-auto flex h-16 items-center justify-between px-4">
      <Link to="/" className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <GraduationCap className="h-5 w-5 text-primary-foreground" />
        </div>
        <span className="text-lg font-bold text-foreground">TPOBridge</span>
      </Link>
      <div className="hidden items-center gap-8 md:flex">
        <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
        <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
        <a href="#faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">FAQ</a>
        <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</a>
      </div>
      <div className="flex items-center gap-3">
        <Link
          to="/login"
          className="hidden text-sm font-medium text-muted-foreground hover:text-foreground transition-colors sm:block"
        >
          Sign In
        </Link>
        <Link
          to="/login"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Start Trial
        </Link>
      </div>
    </div>
  </nav>
);

const HeroSection = () => (
  <section className="relative overflow-hidden py-20 lg:py-32">
    <div className="container mx-auto px-4 text-center">
      <div className="mx-auto max-w-3xl animate-fade-in">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-card px-4 py-1.5 text-sm text-muted-foreground">
          <Zap className="h-3.5 w-3.5 text-primary" />
          Built for College Placement Offices
        </div>
        <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Placement Office{" "}
          <span className="text-primary">Operating System</span>
        </h1>
        <p className="mb-10 text-lg text-muted-foreground sm:text-xl max-w-2xl mx-auto">
          Streamline your entire placement workflow — from recruiter outreach to
          offer tracking. One platform for TPOs, students, and recruiters.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Start Free Trial
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-lg border bg-card px-6 py-3 text-sm font-semibold text-foreground hover:bg-accent transition-colors"
          >
            Book a Demo
          </a>
        </div>
      </div>
      <div className="mx-auto mt-16 max-w-4xl animate-fade-in" style={{ animationDelay: "0.2s" }}>
        <div className="rounded-xl border bg-card p-2 shadow-card">
          <div className="rounded-lg bg-muted/50 p-8 text-center text-muted-foreground">
            <BarChart3 className="mx-auto mb-3 h-16 w-16 text-primary/30" />
            <p className="text-sm">Dashboard Preview</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ProblemSection = () => (
  <section className="border-t bg-card py-20">
    <div className="container mx-auto px-4">
      <div className="mx-auto max-w-3xl text-center mb-12">
        <h2 className="mb-4 text-3xl font-bold text-foreground">
          Placement Offices Deserve Better Tools
        </h2>
        <p className="text-muted-foreground text-lg">
          Most placement cells still rely on spreadsheets, WhatsApp groups, and
          manual coordination. This leads to missed opportunities and frustrated
          stakeholders.
        </p>
      </div>
      <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
        {[
          {
            title: "Scattered Data",
            desc: "Student records, company contacts, and drive details spread across dozens of files.",
          },
          {
            title: "Manual Follow-ups",
            desc: "Hours wasted chasing recruiters, sending reminders, and collecting applications manually.",
          },
          {
            title: "No Visibility",
            desc: "Leadership has no real-time view of placement progress, making reporting a nightmare.",
          },
        ].map((item) => (
          <div key={item.title} className="rounded-xl border bg-background p-6">
            <div className="mb-3 h-2 w-10 rounded-full bg-destructive/20" />
            <h3 className="mb-2 font-semibold text-foreground">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const HowItWorksSection = () => (
  <section className="border-t py-20">
    <div className="container mx-auto px-4">
      <div className="mx-auto max-w-3xl text-center mb-12">
        <h2 className="mb-4 text-3xl font-bold text-foreground">
          How TPOBridge Works
        </h2>
        <p className="text-muted-foreground text-lg">
          Get your placement office running efficiently in three simple steps.
        </p>
      </div>
      <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
        {[
          {
            step: "01",
            title: "Set Up Your Office",
            desc: "Add your team, configure departments, and import student data in minutes.",
            icon: Building2,
          },
          {
            step: "02",
            title: "Manage Recruiters & Drives",
            desc: "Track company outreach, schedule drives, and manage applications — all in one place.",
            icon: Users,
          },
          {
            step: "03",
            title: "Track & Report",
            desc: "Real-time dashboards and automated reports for leadership and compliance.",
            icon: BarChart3,
          },
        ].map((item) => (
          <div key={item.step} className="text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
              <item.icon className="h-7 w-7 text-primary" />
            </div>
            <div className="mb-2 text-xs font-semibold text-primary uppercase tracking-wider">
              Step {item.step}
            </div>
            <h3 className="mb-2 font-semibold text-foreground">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const FeaturesSection = () => (
  <section id="features" className="border-t bg-card py-20">
    <div className="container mx-auto px-4">
      <div className="mx-auto max-w-3xl text-center mb-12">
        <h2 className="mb-4 text-3xl font-bold text-foreground">
          Everything Your Placement Office Needs
        </h2>
        <p className="text-muted-foreground text-lg">
          Purpose-built features for managing end-to-end campus placements.
        </p>
      </div>
      <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { icon: Users, title: "Recruiter CRM", desc: "Manage company contacts, track outreach status, and nurture relationships." },
          { icon: Globe, title: "Inbound & Outbound", desc: "Handle incoming recruiter interest and automate outbound campaigns." },
          { icon: BarChart3, title: "Drive Manager", desc: "Schedule, manage, and track placement drives from start to finish." },
          { icon: Shield, title: "Role-Based Access", desc: "TPO, Admin, Owner, and Student roles with granular permissions." },
          { icon: Zap, title: "Real-Time Reports", desc: "Live dashboards with placement stats, offer tracking, and trends." },
          { icon: Building2, title: "Admin Feed", desc: "Activity feed for team coordination and audit trail." },
        ].map((feature) => (
          <div
            key={feature.title}
            className="group rounded-xl border bg-background p-6 transition-shadow hover:shadow-card-hover"
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/15">
              <feature.icon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="mb-2 font-semibold text-foreground">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const PricingSection = () => (
  <section id="pricing" className="border-t py-20">
    <div className="container mx-auto px-4">
      <div className="mx-auto max-w-3xl text-center mb-12">
        <h2 className="mb-4 text-3xl font-bold text-foreground">
          Simple, Transparent Pricing
        </h2>
        <p className="text-muted-foreground text-lg">
          Plans that scale with your institution. No hidden fees.
        </p>
      </div>
      <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
        {[
          {
            name: "Starter",
            price: "Free",
            desc: "For small colleges getting started",
            features: ["Up to 500 students", "1 Admin user", "Basic reporting", "Email support"],
            cta: "Get Started",
            highlighted: false,
          },
          {
            name: "Professional",
            price: "₹15,000",
            period: "/year",
            desc: "For active placement offices",
            features: ["Unlimited students", "5 Admin users", "Advanced analytics", "Recruiter CRM", "Priority support"],
            cta: "Start Trial",
            highlighted: true,
          },
          {
            name: "Enterprise",
            price: "Custom",
            desc: "For universities & large institutions",
            features: ["Multi-campus support", "Unlimited admins", "Custom integrations", "Dedicated account manager", "SLA guarantee"],
            cta: "Contact Sales",
            highlighted: false,
          },
        ].map((plan) => (
          <div
            key={plan.name}
            className={`rounded-xl border p-6 ${
              plan.highlighted
                ? "border-primary bg-card ring-1 ring-primary/20 relative"
                : "bg-card"
            }`}
          >
            {plan.highlighted && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-xs font-medium text-primary-foreground">
                Most Popular
              </div>
            )}
            <h3 className="mb-1 font-semibold text-foreground">{plan.name}</h3>
            <p className="mb-4 text-sm text-muted-foreground">{plan.desc}</p>
            <div className="mb-6">
              <span className="text-3xl font-bold text-foreground">{plan.price}</span>
              {plan.period && (
                <span className="text-sm text-muted-foreground">{plan.period}</span>
              )}
            </div>
            <ul className="mb-6 space-y-2.5">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <button
              className={`w-full rounded-lg py-2.5 text-sm font-medium transition-colors ${
                plan.highlighted
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "border bg-background text-foreground hover:bg-accent"
              }`}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqs = [
    { q: "How long does onboarding take?", a: "Most institutions are up and running within a day. We provide guided setup and data import tools." },
    { q: "Can students access the platform?", a: "Yes. Students get their own portal to view drives, apply for positions, and track their application status." },
    { q: "Is our data secure?", a: "Absolutely. We use enterprise-grade encryption, regular backups, and comply with data protection standards." },
    { q: "Can we customize the workflow?", a: "Yes. Drive stages, approval flows, and notification rules are fully configurable." },
    { q: "Do you offer migration support?", a: "Yes. Our team will help you migrate existing data from spreadsheets or other systems at no extra cost." },
  ];

  return (
    <section id="faq" className="border-t bg-card py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h2 className="mb-4 text-3xl font-bold text-foreground">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="mx-auto max-w-2xl space-y-2">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-lg border bg-background">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between p-4 text-left text-sm font-medium text-foreground"
              >
                {faq.q}
                <ChevronDown
                  className={`h-4 w-4 text-muted-foreground transition-transform ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === i && (
                <div className="border-t px-4 pb-4 pt-3 text-sm text-muted-foreground">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => (
  <section id="contact" className="border-t py-20">
    <div className="container mx-auto px-4">
      <div className="mx-auto max-w-4xl">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-3xl font-bold text-foreground">
              Get in Touch
            </h2>
            <p className="mb-8 text-muted-foreground">
              Ready to modernize your placement office? Let's talk about how
              TPOBridge can help your institution.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                hello@tpobridge.com
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                +91 98765 43210
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                Pune, Maharashtra, India
              </div>
            </div>
          </div>
          <div className="rounded-xl border bg-card p-6">
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full rounded-lg border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="you@college.edu"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full rounded-lg border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  placeholder="Tell us about your institution..."
                />
              </div>
              <button className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="border-t bg-card py-10">
    <div className="container mx-auto px-4">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
            <GraduationCap className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-semibold text-foreground">TPOBridge</span>
        </div>
        <p className="text-sm text-muted-foreground">
          © 2026 TPOBridge. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default LandingPage;
