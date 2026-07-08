import { useEffect, useMemo, useRef, useState } from "react";
import { Mail, Send } from "lucide-react";
import { Button } from "../ui/Button";
import { SectionTitle } from "../ui/SectionTitle";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const NAME_REGEX = /^[a-zA-Z\s]{2,50}$/;
const MESSAGE_MAX_LENGTH = 1000;
const RATE_LIMIT_KEY = "portfolio-contact-submit-times";
const COOLDOWN_KEY = "portfolio-contact-cooldown-until";
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const COOLDOWN_MS = 60 * 1000;
const MIN_SUBMIT_TIME_MS = 3000;

const initialValues = {
  name: "",
  email: "",
  message: "",
  website: "",
};

const getSubmitTimes = () => {
  try {
    const parsed = JSON.parse(localStorage.getItem(RATE_LIMIT_KEY) || "[]");
    return Array.isArray(parsed) ? parsed.filter(Number.isFinite) : [];
  } catch {
    return [];
  }
};

const getCooldownUntil = () => {
  const storedValue = Number(localStorage.getItem(COOLDOWN_KEY));
  return Number.isFinite(storedValue) ? storedValue : 0;
};

const validateName = (value) => {
  const trimmedValue = value.trim();
  return NAME_REGEX.test(trimmedValue) ? "" : "Name must be 2–50 letters only";
};

const validateEmail = (value) =>
  EMAIL_REGEX.test(value.trim()) ? "" : "Please enter a valid email address";

const validateMessage = (value) => {
  const length = value.trim().length;
  return length >= 20 && value.length <= MESSAGE_MAX_LENGTH
    ? ""
    : "Message must be between 20 and 1000 characters";
};

const getFieldState = (error, value, shouldShowError) => {
  if (shouldShowError && error) {
    return "border-red-500 focus:border-red-500 focus:ring-red-500/20";
  }

  if (value && !error) {
    return "border-emerald-500 focus:border-emerald-500 focus:ring-emerald-500/20";
  }

  return "border-slate-200/80 focus:border-blue-500 focus:ring-blue-500/20 dark:border-white/10 dark:focus:border-cyan-300";
};

const ErrorMessage = ({ id, message }) => (
  <div
    id={id}
    className={`contact-error min-h-5 text-sm font-medium text-red-600 dark:text-red-400 ${message ? "contact-error--visible" : ""}`}
    aria-live="polite"
  >
    {message}
  </div>
);

export const ContactSection = () => {
  const formStartedAt = useRef(Date.now());
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [shake, setShake] = useState(false);
  const [cooldownUntil, setCooldownUntil] = useState(0);
  const [now, setNow] = useState(Date.now());

  const errors = useMemo(
    () => ({
      name: validateName(values.name),
      email: validateEmail(values.email),
      message: validateMessage(values.message),
    }),
    [values.email, values.message, values.name],
  );

  const isValid = !errors.name && !errors.email && !errors.message;
  const cooldownRemaining = Math.max(0, Math.ceil((cooldownUntil - now) / 1000));
  const isCoolingDown = cooldownRemaining > 0;
  const canSubmit = isValid && !isCoolingDown;
  const messageCount = values.message.length;

  useEffect(() => {
    setCooldownUntil(getCooldownUntil());
  }, []);

  useEffect(() => {
    if (!isCoolingDown) {
      return undefined;
    }

    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, [isCoolingDown]);

  const showBlockedShake = () => {
    setShake(false);
    window.requestAnimationFrame(() => setShake(true));
    window.setTimeout(() => setShake(false), 450);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    setTouched((currentTouched) => ({
      ...currentTouched,
      [name]: true,
    }));
  };

  const shouldShowError = (field) =>
    Boolean(submitted || touched[field] || (field === "email" && values.email));

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    setTouched({ name: true, email: true, message: true });

    const filledTooFast = Date.now() - formStartedAt.current < MIN_SUBMIT_TIME_MS;
    const isHoneypotFilled = values.website.trim().length > 0;

    if (isHoneypotFilled || filledTooFast) {
      showBlockedShake();
      return;
    }

    const recentSubmits = getSubmitTimes().filter(
      (timestamp) => Date.now() - timestamp < RATE_LIMIT_WINDOW_MS,
    );

    if (recentSubmits.length >= 2 || !isValid || isCoolingDown) {
      showBlockedShake();
      return;
    }

    const sentAt = Date.now();
    const updatedSubmits = [...recentSubmits, sentAt];
    const nextCooldownUntil = sentAt + COOLDOWN_MS;

    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(updatedSubmits));
    localStorage.setItem(COOLDOWN_KEY, String(nextCooldownUntil));
    setCooldownUntil(nextCooldownUntil);
    setNow(sentAt);

    const subject = encodeURIComponent(`Portfolio inquiry from ${values.name.trim()}`);
    const body = encodeURIComponent(
      `Hi Sumit,\n\n${values.message.trim()}\n\nFrom: ${values.name.trim()}\nEmail: ${values.email.trim()}`,
    );

    window.location.href = `mailto:sumit.yadav.0287@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="section-blend relative scroll-mt-28 overflow-hidden px-6 py-24">
      {/* Removed heavy blur orbs for performance */}

      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="Contact"
          title="Tell me what you want to build."
          description="Share the essentials and I will get back to you from my inbox."
        />

        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-[1.5rem] border border-slate-200/80 bg-white p-7 shadow-[0_24px_70px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-slate-900/90">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20 dark:bg-cyan-300 dark:text-slate-950">
              <Mail className="h-5 w-5" aria-hidden="true" />
            </div>
            <h3 className="mt-6 text-2xl font-black tracking-tight text-slate-950 dark:text-white">
              Prefer direct email?
            </h3>
            <a
              href="mailto:sumit.yadav.0287@gmail.com"
              className="mt-4 block text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700 dark:text-cyan-300 dark:hover:text-cyan-200"
            >
              sumit.yadav.0287@gmail.com
            </a>
            <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
              This form validates your details in the browser before opening a secure email draft.
            </p>
          </div>

          <form
            className={`contact-form rounded-[1.5rem] border border-slate-200/80 bg-white/80 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur md:p-8 dark:border-white/10 dark:bg-white/5 ${shake ? "contact-form--shake" : ""}`}
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="hidden" aria-hidden="true">
              <label htmlFor="contact-website">Website</label>
              <input
                id="contact-website"
                name="website"
                type="text"
                value={values.website}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div className="grid gap-5">
              <div data-contact-field>
                <label htmlFor="contact-name" className="text-sm font-bold text-slate-900 dark:text-white">
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  maxLength={50}
                  aria-invalid={shouldShowError("name") && Boolean(errors.name)}
                  aria-describedby="contact-name-error"
                  className={`mt-2 w-full rounded-2xl border bg-white px-4 py-3 text-slate-950 outline-none transition-all duration-300 focus:ring-4 dark:bg-slate-950/70 dark:text-white ${getFieldState(errors.name, values.name, shouldShowError("name"))}`}
                />
                <ErrorMessage id="contact-name-error" message={shouldShowError("name") ? errors.name : ""} />
              </div>

              <div data-contact-field>
                <label htmlFor="contact-email" className="text-sm font-bold text-slate-900 dark:text-white">
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={shouldShowError("email") && Boolean(errors.email)}
                  aria-describedby="contact-email-error"
                  className={`mt-2 w-full rounded-2xl border bg-white px-4 py-3 text-slate-950 outline-none transition-all duration-300 focus:ring-4 dark:bg-slate-950/70 dark:text-white ${getFieldState(errors.email, values.email, shouldShowError("email"))}`}
                />
                <ErrorMessage id="contact-email-error" message={shouldShowError("email") ? errors.email : ""} />
              </div>

              <div data-contact-field>
                <label htmlFor="contact-message" className="text-sm font-bold text-slate-900 dark:text-white">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={values.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  maxLength={MESSAGE_MAX_LENGTH}
                  rows={7}
                  aria-invalid={shouldShowError("message") && Boolean(errors.message)}
                  aria-describedby="contact-message-error contact-message-counter"
                  className={`mt-2 w-full resize-y rounded-2xl border bg-white px-4 py-3 text-slate-950 outline-none transition-all duration-300 focus:ring-4 dark:bg-slate-950/70 dark:text-white ${getFieldState(errors.message, values.message, shouldShowError("message"))}`}
                />
                <div className="mt-1 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <ErrorMessage id="contact-message-error" message={shouldShowError("message") ? errors.message : ""} />
                  <p
                    id="contact-message-counter"
                    className={`text-sm font-semibold ${messageCount > MESSAGE_MAX_LENGTH ? "text-red-600 dark:text-red-400" : "text-slate-500 dark:text-slate-400"}`}
                  >
                    {messageCount} / {MESSAGE_MAX_LENGTH}
                  </p>
                </div>
              </div>

              {isCoolingDown && (
                <p className="contact-error contact-error--visible text-sm font-semibold text-slate-600 dark:text-slate-300" aria-live="polite">
                  You can send another message in {cooldownRemaining}s...
                </p>
              )}

              <Button
                type="submit"
                disabled={!canSubmit}
                className="mt-1 w-full disabled:pointer-events-none disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-45"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
                {isCoolingDown ? `Wait ${cooldownRemaining}s` : "Send message"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
