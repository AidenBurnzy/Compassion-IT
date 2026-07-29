"use client";

import { useEffect, useState } from "react";
import type { NgfSiteContent } from "@/lib/ngf";

type FormState = {
  name: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
};

const initialState: FormState = { name: "", email: "", phone: "", topic: "", message: "" };

type Props = {
  content?: NgfSiteContent;
};

export function ContactForm({ content = {} }: Props) {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const labels = {
    name: content["contactForm.labels.name"] || "Name",
    email: content["contactForm.labels.email"] || "Email",
    phone: content["contactForm.labels.phone"] || "Phone (optional)",
    topic: content["contactForm.labels.topic"] || "How can we help?",
    message: content["contactForm.labels.message"] || "Details",
  };
  const submitIdle = content["contactForm.submit"] || "Send Message";
  const submitSending = content["contactForm.sending"] || "Sending...";
  const successMsg = content["contactForm.successMsg"] || "Thank you for reaching out. We've received your message and will respond within one business day.";

  const topicOptions = [
    { value: "", label: content["contactForm.options.topic.placeholder"] || "Select one" },
    { value: "business-continuity", label: content["contactForm.options.topic.0"] || "Business Continuity Planning" },
    { value: "vcio-leadership", label: content["contactForm.options.topic.1"] || "vCIO & Strategic IT Leadership" },
    { value: "vendor-project-management", label: content["contactForm.options.topic.2"] || "Vendor and Project Management" },
    { value: "remote-monitoring", label: content["contactForm.options.topic.3"] || "Remote Monitoring and Patch Management" },
    { value: "cybersecurity-assessment", label: content["contactForm.options.topic.4"] || "Cybersecurity Assessment" },
    { value: "breakfix", label: content["contactForm.options.topic.5"] || "Break/Fix support" },
    { value: "other", label: content["contactForm.options.topic.6"] || "Something else" },
  ];

  // Pre-select the topic dropdown when arriving from a service page's CTA
  // (e.g. /contact?topic=cybersecurity-assessment). Deliberately reads
  // window.location.search directly instead of next/navigation's
  // useSearchParams() to avoid requiring a Suspense boundary for static
  // generation of this page.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const topic = new URLSearchParams(window.location.search).get("topic");
    if (topic && topicOptions.some((opt) => opt.value === topic)) {
      setForm((p) => ({ ...p, topic }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message || "There was a problem submitting your request.");
      }

      setStatus("success");
      setMessage(successMsg);
      setForm(initialState);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  };

  const lbl = (key: string, label: string, text: string) => (
    <span data-ngf-field={`contactForm.labels.${key}`} data-ngf-label={label} data-ngf-type="text" data-ngf-section="ContactForm">
      {text}
    </span>
  );

  return (
    <form onSubmit={onSubmit} className="card-soft grid gap-4 text-left" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-white">
          {lbl("name", "Name Label", labels.name)}
          <input
            required
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            className="w-full min-w-0 rounded-xl border border-white/15 bg-black px-4 py-3 text-white outline-none ring-brand transition focus:ring-2"
            type="text"
            name="name"
            autoComplete="name"
          />
        </label>

        <label className="grid gap-2 text-sm font-medium text-white">
          {lbl("email", "Email Label", labels.email)}
          <input
            required
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            className="w-full min-w-0 rounded-xl border border-white/15 bg-black px-4 py-3 text-white outline-none ring-brand transition focus:ring-2"
            type="email"
            name="email"
            autoComplete="email"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-white">
          {lbl("phone", "Phone Label", labels.phone)}
          <input
            value={form.phone}
            onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
            className="w-full min-w-0 rounded-xl border border-white/15 bg-black px-4 py-3 text-white outline-none ring-brand transition focus:ring-2"
            type="tel"
            name="phone"
            autoComplete="tel"
          />
        </label>

        <label className="grid gap-2 text-sm font-medium text-white">
          {lbl("topic", "Topic Label", labels.topic)}
          <select
            value={form.topic}
            onChange={(e) => setForm((p) => ({ ...p, topic: e.target.value }))}
            className="w-full min-w-0 rounded-xl border border-white/15 bg-black px-4 py-3 text-white outline-none ring-brand transition focus:ring-2"
            name="topic"
          >
            {topicOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="grid gap-2 text-sm font-medium text-white">
        {lbl("message", "Message Label", labels.message)}
        <textarea
          value={form.message}
          onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
          className="w-full min-w-0 min-h-32 rounded-xl border border-white/15 bg-black px-4 py-3 text-white outline-none ring-brand transition focus:ring-2"
          name="message"
          placeholder="Briefly describe your need"
        />
      </label>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" className="btn-brand disabled:cursor-not-allowed disabled:opacity-70" disabled={status === "submitting"}>
          <span
            data-ngf-field={status === "submitting" ? "contactForm.sending" : "contactForm.submit"}
            data-ngf-label={status === "submitting" ? "Sending Text" : "Submit Button Text"}
            data-ngf-type="text"
            data-ngf-section="ContactForm"
          >
            {status === "submitting" ? submitSending : submitIdle}
          </span>
        </button>
        <p className={`text-sm ${status === "error" ? "text-red-400" : "text-white/70"}`}>{message}</p>
      </div>

      {/* Hidden option-config fields — editable from portal sidebar via "Show all fields" */}
      <div className="sr-only" aria-hidden="true">
        <span data-ngf-field="contactForm.options.topic.0" data-ngf-label="Topic Option 1" data-ngf-type="text" data-ngf-section="ContactForm">{topicOptions[1].label}</span>
        <span data-ngf-field="contactForm.options.topic.1" data-ngf-label="Topic Option 2" data-ngf-type="text" data-ngf-section="ContactForm">{topicOptions[2].label}</span>
        <span data-ngf-field="contactForm.options.topic.2" data-ngf-label="Topic Option 3" data-ngf-type="text" data-ngf-section="ContactForm">{topicOptions[3].label}</span>
        <span data-ngf-field="contactForm.options.topic.3" data-ngf-label="Topic Option 4" data-ngf-type="text" data-ngf-section="ContactForm">{topicOptions[4].label}</span>
        <span data-ngf-field="contactForm.options.topic.4" data-ngf-label="Topic Option 5" data-ngf-type="text" data-ngf-section="ContactForm">{topicOptions[5].label}</span>
        <span data-ngf-field="contactForm.options.topic.5" data-ngf-label="Topic Option 6" data-ngf-type="text" data-ngf-section="ContactForm">{topicOptions[6].label}</span>
        <span data-ngf-field="contactForm.options.topic.6" data-ngf-label="Topic Option 7" data-ngf-type="text" data-ngf-section="ContactForm">{topicOptions[7].label}</span>
      </div>
    </form>
  );
}
