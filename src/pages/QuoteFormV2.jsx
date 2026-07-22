import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Switch from "@mui/material/Switch";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import BASE_URL from "../config.js";

const ESTIMATOR_STEPS = [
  { number: 1, label: "Contact" },
  { number: 2, label: "Home Details" },
  { number: 3, label: "Service Type" },
  { number: 4, label: "Schedule" },
];

const TIME_WINDOWS = [
  { id: "morning", label: "Morning", time: "8:00 AM – 11:00 AM" },
  { id: "midday", label: "Midday", time: "11:00 AM – 2:00 PM" },
  { id: "afternoon", label: "Afternoon", time: "2:00 PM – 5:00 PM" },
];

const REGULAR_CLEANING_INCLUDES = [
  "Bathrooms cleaned",
  "Dusting of surfaces",
  "Kitchen cleaned",
  "Vacuuming and mopping floors",
];

const TOTAL_CLEANING_EXTRA_INCLUDES = [
  "Baseboards, and windows sills",
  "Blinds dusting",
  "Interior windows",
  "Doors, door knobs, switch plates, and outlet covers cleaned",
  "Ceiling fans and light fixtures dusted",
  "Removal of cobwebs throughout the home",
];

const DEEP_CLEANING_INCLUDES = [
  "Full bathrooms",
  "Dusting all surfaces",
  "Kitchen cleaning",
  "Vacuuming and mopping floors",
  "Baseboards, blinds, window sills, and ceiling fans",
  "Switch plates, outlet plates, and door knobs",
  "Interior windows",
  "Deep cleaning of surfaces",
  "Under furniture when accessible",
  "Sofas under cushions and pillows",
  "Light fixtures and vents",
  "Small stains on walls, doors, and baseboards",
];

const initialFormData = {
  name: "",
  phone: "",
  email: "",
  size: "",
  bedrooms: 3,
  bathrooms: 2,
  homeCondition: "",
};

const initialContactErrors = {
  name: "",
  phone: "",
  email: "",
  contact: "",
};

const initialHomeErrors = {
  size: "",
};

const initialScheduleErrors = {
  streetAddress: "",
  city: "",
  state: "",
  zipCode: "",
  preferredDate: "",
  timeWindows: "",
  submit: "",
};

const formatCurrency = (amount) => {
  const numericAmount = Number(amount);

  if (!Number.isFinite(numericAmount)) return "$0";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(numericAmount);
};

const getEstimatePrice = (estimate, possibleKeys) => {
  for (const key of possibleKeys) {
    const value = Number(estimate?.[key]);

    if (Number.isFinite(value) && value > 0) {
      return value;
    }
  }

  return null;
};

const formatEstimatePrice = (amount) => {
  return Number.isFinite(amount) ? formatCurrency(amount) : "—";
};

const fetchPricingOptions = async (formData) => {
  const response = await fetch(`${BASE_URL}/pricing-v2/estimate-options`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      house_size: Number(formData.size),
      bedrooms: Number(formData.bedrooms),
      bathrooms: Number(formData.bathrooms),

      // Por ahora mantenemos "maintained" para evitar que el estimator
      // incremente automáticamente el precio solo por elegir Deep.
      condition: "maintained",

      heavy_pet_hair: false,
      additional_kitchen: false,
      finished_basement_sqft: 0,
    }),
  });

  if (!response.ok) {
    let message = "We could not calculate your estimate.";

    try {
      const errorBody = await response.json();
      message = errorBody?.detail || message;
    } catch {
      // Keep the default error message if the response is not JSON.
    }

    throw new Error(message);
  }

  return response.json();
};

const sendAppointmentRequest = async (requestData) => {
  const recurringPricing = requestData.pricing
    ? [
        `First visit: ${formatCurrency(requestData.pricing.firstVisit)}`,
        `Bi-weekly: ${formatEstimatePrice(requestData.pricing.biWeekly)}`,
        `Monthly: ${formatEstimatePrice(requestData.pricing.monthly)}`,
      ].join("\n")
    : `First visit: ${formatCurrency(requestData.estimatedPrice)}`;

  const availability = requestData.scheduling.isFlexible
    ? "Flexible / First available"
    : [
        `Preferred date: ${requestData.scheduling.preferredDate}`,
        `Preferred time windows: ${requestData.scheduling.preferredTimeWindows
          .map((window) => `${window.label} (${window.time})`)
          .join(", ")}`,
      ].join("\n");

  const fullAddress = [
    requestData.serviceAddress?.streetAddress,
    requestData.serviceAddress?.addressLine2,
    requestData.serviceAddress
      ? `${requestData.serviceAddress.city}, ${requestData.serviceAddress.state} ${requestData.serviceAddress.zipCode}`
      : null,
  ]
    .filter(Boolean)
    .join(", ");

  const message = [
    "NEW CLEANING APPOINTMENT REQUEST",
    "",
    `Name: ${requestData.name}`,
    `Phone: ${requestData.phone || "Not provided"}`,
    `Email: ${requestData.email || "Not provided"}`,
    "",
    `Service address: ${fullAddress || "Not provided"}`,
    "",
    `Home size: ${Number(requestData.size).toLocaleString("en-US")} sqft`,
    `Bedrooms: ${requestData.bedrooms}`,
    `Bathrooms: ${requestData.bathrooms}`,
    `Home condition: ${
      requestData.homeCondition === "not_cleaned_recently"
        ? "Not professionally cleaned recently"
        : "Already maintained"
    }`,
    "",
    `Selected service: ${requestData.serviceType}`,
    recurringPricing,
    "",
    "Availability:",
    availability,
    "",
    `Comments: ${requestData.scheduling.comments || "None"}`,
  ].join("\n");

  const response = await fetch(`${BASE_URL}/send_email_endpoint/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre: requestData.name,
      correo: requestData.email || "Not provided",
      mensaje: message,
    }),
  });

  if (!response.ok) {
    throw new Error("We could not send your appointment request.");
  }

  return response.json();
};

const IconBase = ({ children, className = "h-5 w-5" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {children}
  </svg>
);

const CalculatorIcon = ({ className }) => (
  <IconBase className={className}>
    <rect x="5" y="3" width="14" height="18" rx="2" />
    <path d="M8 7h8" />
    <path d="M8 11h1M12 11h1M16 11h.01M8 15h1M12 15h1M16 15h.01M8 18h1M12 18h1M16 18h.01" />
  </IconBase>
);

const UserIcon = ({ className }) => (
  <IconBase className={className}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4.5 21a7.5 7.5 0 0 1 15 0" />
  </IconBase>
);

const PhoneIcon = ({ className }) => (
  <IconBase className={className}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.34 1.78.66 2.62a2 2 0 0 1-.45 2.11L8.05 9.72a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.84.32 1.72.54 2.62.66A2 2 0 0 1 22 16.92Z" />
  </IconBase>
);

const MailIcon = ({ className }) => (
  <IconBase className={className}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </IconBase>
);

const HomeIcon = ({ className }) => (
  <IconBase className={className}>
    <path d="m3 11 9-8 9 8" />
    <path d="M5 10v10h14V10" />
    <path d="M9 20v-6h6v6" />
  </IconBase>
);

const BedIcon = ({ className }) => (
  <IconBase className={className}>
    <path d="M2 17v-6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v6" />
    <path d="M2 14h20M5 9V6h5a2 2 0 0 1 2 2v1M2 20v-3M22 20v-3" />
  </IconBase>
);

const BathIcon = ({ className }) => (
  <IconBase className={className}>
    <path d="M4 13h16v2a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5v-2Z" />
    <path d="M6 13V5a2 2 0 0 1 4 0" />
    <path d="M3 13h18M7 20l-1 2M17 20l1 2" />
  </IconBase>
);

const SparklesIcon = ({ className }) => (
  <IconBase className={className}>
    <path d="m12 3 1.25 3.75L17 8l-3.75 1.25L12 13l-1.25-3.75L7 8l3.75-1.25L12 3Z" />
    <path d="m19 14 .75 2.25L22 17l-2.25.75L19 20l-.75-2.25L16 17l2.25-.75L19 14Z" />
    <path d="m5 13 .75 2.25L8 16l-2.25.75L5 19l-.75-2.25L2 16l2.25-.75L5 13Z" />
  </IconBase>
);

const CheckIcon = ({ className }) => (
  <IconBase className={className}>
    <path d="m5 12 4 4L19 6" />
  </IconBase>
);

const CheckCircleIcon = ({ className }) => (
  <IconBase className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="m8 12 2.5 2.5L16 9" />
  </IconBase>
);

const InfoIcon = ({ className }) => (
  <IconBase className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v5M12 8h.01" />
  </IconBase>
);

const ArrowRightIcon = ({ className }) => (
  <IconBase className={className}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </IconBase>
);

const ArrowLeftIcon = ({ className }) => (
  <IconBase className={className}>
    <path d="M19 12H5M11 18l-6-6 6-6" />
  </IconBase>
);

const CalendarIcon = ({ className }) => (
  <IconBase className={className}>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M16 3v4M8 3v4M3 10h18" />
  </IconBase>
);

const StarIcon = ({ className }) => (
  <IconBase className={className}>
    <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3l-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3Z" />
  </IconBase>
);

const BroomIcon = ({ className }) => (
  <IconBase className={className}>
    <path d="m14 4 6-2 2 2-2 6" />
    <path d="M19 5 9.5 14.5" />
    <path d="m4 14 6 6" />
    <path d="M3 15c-1 2-1 4 0 6 2 1 4 1 6 0l3-3-6-6-3 3Z" />
  </IconBase>
);

const MapPinIcon = ({ className }) => (
  <IconBase className={className}>
    <path d="M12 21s6-5.33 6-11a6 6 0 1 0-12 0c0 5.67 6 11 6 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </IconBase>
);

const ClockIcon = ({ className }) => (
  <IconBase className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </IconBase>
);

const EstimatorHeader = () => (
  <div className="mb-9 text-center">
    <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#e3eeeb] px-4 py-1.5 text-sm font-medium text-[#176c5b]">
      <CalculatorIcon className="h-4 w-4" />
      Free Instant Quote
    </div>

    <h1
      className="text-3xl font-bold tracking-tight text-[#172126] md:text-4xl"
      style={{ fontFamily: "Lexend, sans-serif" }}
    >
      Get Your Cleaning Estimate
    </h1>

    <p className="mx-auto mt-3 max-w-lg text-base leading-relaxed text-[#66757b] md:text-lg">
      Answer a few quick questions and get an instant price estimate
    </p>
  </div>
);

const ProgressSteps = ({ currentStep }) => {
  const progressWidth = `${(currentStep / ESTIMATOR_STEPS.length) * 100}%`;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between gap-2">
        {ESTIMATOR_STEPS.map((step) => {
          const isComplete = step.number < currentStep;
          const isCurrent = step.number === currentStep;

          return (
            <div key={step.number} className="flex min-w-0 items-center gap-2">
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-all duration-300 ${
                  isComplete || isCurrent
                    ? "bg-[#21715f] text-white shadow-md"
                    : "bg-[#edf2f0] text-[#718078]"
                } ${isCurrent ? "ring-4 ring-[#21715f]/15" : ""}`}
                aria-current={isCurrent ? "step" : undefined}
              >
                {isComplete ? (
                  <CheckCircleIcon className="h-4 w-4" />
                ) : (
                  step.number
                )}
              </div>

              <span className="hidden truncate text-xs font-medium text-[#66757b] sm:inline">
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-[#e8eeeb]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#21715f] to-[#f4bd06] transition-all duration-500 ease-out"
          style={{ width: progressWidth }}
        />
      </div>
    </div>
  );
};

const EstimatorCard = ({ children, className = "" }) => (
  <div
    className={`relative overflow-hidden rounded-2xl border border-[#e2e9e6] bg-white p-5 shadow-xl md:p-8 ${className}`}
  >
    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#21715f] to-[#f4bd06]" />
    {children}
  </div>
);

const SectionTitle = ({ icon, title, subtitle }) => (
  <div className="mb-6 flex items-center gap-3">
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e5efec] text-[#21715f]">
      {icon}
    </div>
    <div>
      <h2
        className="text-lg font-semibold text-[#172126]"
        style={{ fontFamily: "Lexend, sans-serif" }}
      >
        {title}
      </h2>
      <p className="text-sm text-[#6a787d]">{subtitle}</p>
    </div>
  </div>
);

const FieldError = ({ children }) => {
  if (!children) return null;

  return (
    <p className="mt-1.5 text-xs font-medium text-red-600" role="alert">
      {children}
    </p>
  );
};

const FormLabel = ({ htmlFor, icon, children }) => (
  <label
    htmlFor={htmlFor}
    className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-[#28363a]"
  >
    {icon}
    {children}
  </label>
);

const primaryButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-[#21715f] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#195c4d] focus:outline-none focus:ring-4 focus:ring-[#21715f]/20 disabled:cursor-not-allowed disabled:opacity-40";

const secondaryButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-[#66757b] transition hover:bg-[#edf3f1] hover:text-[#172126] focus:outline-none focus:ring-4 focus:ring-[#21715f]/10";

const inputClass =
  "h-12 w-full rounded-xl border border-[#dce5e2] bg-[#f7faf9] px-4 text-sm text-[#172126] outline-none transition placeholder:text-[#9aa6a2] focus:border-[#21715f] focus:bg-white focus:ring-4 focus:ring-[#21715f]/10";

const ContactStep = ({ formData, errors, onFieldChange, onContinue }) => (
  <EstimatorCard>
    <SectionTitle
      icon={<UserIcon className="h-5 w-5" />}
      title="Contact Information"
      subtitle="How can we reach you?"
    />

    <form onSubmit={onContinue} noValidate>
      <div className="space-y-4">
        <div>
          <FormLabel
            htmlFor="name"
            icon={<UserIcon className="h-3.5 w-3.5 text-[#7a8985]" />}
          >
            Full Name
          </FormLabel>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            value={formData.name}
            onChange={onFieldChange}
            className={`${inputClass} ${
              errors.name ? "border-red-400 focus:border-red-500" : ""
            }`}
          />
          <FieldError>{errors.name}</FieldError>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <FormLabel
              htmlFor="phone"
              icon={<PhoneIcon className="h-3.5 w-3.5 text-[#7a8985]" />}
            >
              Phone Number
            </FormLabel>
            <input
              id="phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="(256) 555-1234"
              value={formData.phone}
              onChange={onFieldChange}
              className={`${inputClass} ${
                errors.phone || errors.contact
                  ? "border-red-400 focus:border-red-500"
                  : ""
              }`}
            />
            <FieldError>{errors.phone}</FieldError>
          </div>

          <div>
            <FormLabel
              htmlFor="email"
              icon={<MailIcon className="h-3.5 w-3.5 text-[#7a8985]" />}
            >
              Email Address
            </FormLabel>
            <input
              id="email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="you@email.com"
              value={formData.email}
              onChange={onFieldChange}
              className={`${inputClass} ${
                errors.email || errors.contact
                  ? "border-red-400 focus:border-red-500"
                  : ""
              }`}
            />
            <FieldError>{errors.email}</FieldError>
          </div>
        </div>

        <FieldError>{errors.contact}</FieldError>
      </div>

      <div className="mt-8 flex justify-end border-t border-[#e5ebe8] pt-6">
        <button type="submit" className={primaryButtonClass}>
          Continue
          <ArrowRightIcon className="h-4 w-4" />
        </button>
      </div>
    </form>
  </EstimatorCard>
);

const CounterField = ({
  label,
  value,
  min,
  max,
  icon,
  onDecrease,
  onIncrease,
}) => (
  <div>
    <div className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-[#28363a]">
      {icon}
      <span>{label}</span>
    </div>

    <div className="flex h-12 items-center justify-between rounded-xl border border-[#dce5e2] bg-[#f7faf9] px-2">
      <button
        type="button"
        onClick={onDecrease}
        disabled={value <= min}
        aria-label={`Decrease ${label.toLowerCase()}`}
        className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e9efed] text-xl font-semibold text-[#263539] transition hover:bg-[#dce7e3] disabled:cursor-not-allowed disabled:opacity-35"
      >
        −
      </button>

      <span className="min-w-8 text-center text-lg font-bold text-[#172126]">
        {value}
      </span>

      <button
        type="button"
        onClick={onIncrease}
        disabled={value >= max}
        aria-label={`Increase ${label.toLowerCase()}`}
        className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e9efed] text-xl font-semibold text-[#263539] transition hover:bg-[#dce7e3] disabled:cursor-not-allowed disabled:opacity-35"
      >
        +
      </button>
    </div>
  </div>
);

const HomeDetailsStep = ({
  formData,
  errors,
  onFieldChange,
  onCounterChange,
  onBack,
  onContinue,
}) => (
  <EstimatorCard>
    <SectionTitle
      icon={<HomeIcon className="h-5 w-5" />}
      title="Tell Us About Your Home"
      subtitle="Help us estimate the right price"
    />

    <form onSubmit={onContinue} noValidate>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div>
          <FormLabel htmlFor="size">House Size (sqft)</FormLabel>
          <input
            id="size"
            name="size"
            type="number"
            inputMode="numeric"
            min="1000"
            max="6000"
            step="1"
            placeholder="e.g. 2000"
            value={formData.size}
            onChange={onFieldChange}
            className={`${inputClass} ${
              errors.size ? "border-red-400 focus:border-red-500" : ""
            }`}
          />
          <FieldError>{errors.size}</FieldError>
          {!errors.size && (
            <p className="mt-1.5 text-xs text-[#7d8a87]">
              Enter the approximate finished square footage.
            </p>
          )}
        </div>

        <CounterField
          label="Bedrooms"
          value={formData.bedrooms}
          min={0}
          max={10}
          icon={<BedIcon className="h-3.5 w-3.5 text-[#7a8985]" />}
          onDecrease={() =>
            onCounterChange("bedrooms", Math.max(0, formData.bedrooms - 1))
          }
          onIncrease={() =>
            onCounterChange("bedrooms", Math.min(10, formData.bedrooms + 1))
          }
        />

        <CounterField
          label="Bathrooms"
          value={formData.bathrooms}
          min={0}
          max={10}
          icon={<BathIcon className="h-3.5 w-3.5 text-[#7a8985]" />}
          onDecrease={() =>
            onCounterChange("bathrooms", Math.max(0, formData.bathrooms - 0.5))
          }
          onIncrease={() =>
            onCounterChange("bathrooms", Math.min(10, formData.bathrooms + 0.5))
          }
        />
      </div>

      <div className="mt-8 flex items-center justify-between border-t border-[#e5ebe8] pt-6">
        <button type="button" onClick={onBack} className={secondaryButtonClass}>
          <ArrowLeftIcon className="h-4 w-4" />
          Back
        </button>

        <button type="submit" className={primaryButtonClass}>
          Continue
          <ArrowRightIcon className="h-4 w-4" />
        </button>
      </div>
    </form>
  </EstimatorCard>
);

const ConditionChoice = ({
  selected,
  title,
  description,
  badge,
  badgeTone,
  icon,
  onSelect,
}) => (
  <button
    type="button"
    onClick={onSelect}
    className={`group rounded-2xl border-2 p-5 text-left transition-all duration-200 ${
      selected
        ? "border-[#21715f] bg-[#f1f8f5] shadow-md ring-4 ring-[#21715f]/10"
        : "border-[#dfe7e4] bg-white hover:-translate-y-0.5 hover:border-[#21715f]/45 hover:shadow-md"
    }`}
    aria-pressed={selected}
  >
    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-[#e7f0ed] text-[#21715f]">
      {icon}
    </div>

    <h3
      className="text-base font-semibold leading-snug text-[#172126]"
      style={{ fontFamily: "Lexend, sans-serif" }}
    >
      {title}
    </h3>

    <p className="mt-2 text-sm leading-relaxed text-[#66757b]">{description}</p>

    <span
      className={`mt-4 inline-flex rounded-md px-2 py-1 text-xs font-medium ${
        badgeTone === "accent"
          ? "bg-[#fff4cf] text-[#9a6d00]"
          : "bg-[#e1f0eb] text-[#176c5b]"
      }`}
    >
      {badge}
    </span>
  </button>
);

const ServiceTypeStep = ({
  formData,
  loading,
  error,
  onConditionChange,
  onBack,
  onCalculate,
}) => (
  <EstimatorCard>
    <SectionTitle
      icon={<SparklesIcon className="h-5 w-5" />}
      title="Type of Cleaning"
      subtitle="What best describes your home?"
    />

    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <ConditionChoice
        selected={formData.homeCondition === "not_cleaned_recently"}
        title="My home has NOT been professionally cleaned recently"
        description="Choose this option when the home needs a more detailed first-time reset."
        badge="Recommended: Deep Cleaning"
        badgeTone="primary"
        icon={<BroomIcon className="h-6 w-6" />}
        onSelect={() => onConditionChange("not_cleaned_recently")}
      />

      <ConditionChoice
        selected={formData.homeCondition === "maintained_regularly"}
        title="My home is already maintained"
        description="Compare our Regular and Total maintenance cleaning options."
        badge="Compare Regular and Total"
        badgeTone="accent"
        icon={<SparklesIcon className="h-6 w-6" />}
        onSelect={() => onConditionChange("maintained_regularly")}
      />
    </div>

    {error && (
      <div
        className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
        role="alert"
      >
        {error}
      </div>
    )}

    <div className="mt-8 flex items-center justify-between border-t border-[#e5ebe8] pt-6">
      <button type="button" onClick={onBack} className={secondaryButtonClass}>
        <ArrowLeftIcon className="h-4 w-4" />
        Back
      </button>

      <button
        type="button"
        onClick={onCalculate}
        disabled={!formData.homeCondition || loading}
        className={primaryButtonClass}
      >
        {loading ? "Calculating..." : "Get My Estimate"}
        {!loading && <ArrowRightIcon className="h-4 w-4" />}
      </button>
    </div>
  </EstimatorCard>
);

const HomeSummary = ({ formData }) => {
  const summary = [
    formData.size
      ? `${Number(formData.size).toLocaleString("en-US")} sqft`
      : null,
    `${formData.bedrooms} bedrooms`,
    `${formData.bathrooms} bathrooms`,
  ]
    .filter(Boolean)
    .join(" · ");

  return <p className="mt-2 text-sm text-[#6a787d]">{summary}</p>;
};

const IncludedItem = ({ children, accent = false }) => (
  <li className="flex items-start gap-2 text-sm text-[#66757b]">
    <CheckIcon
      className={`mt-0.5 h-4 w-4 shrink-0 ${
        accent ? "text-[#c28b00]" : "text-[#21715f]"
      }`}
    />
    <span>{children}</span>
  </li>
);

const PricingRows = ({ firstVisit, biWeekly, monthly }) => {
  const rows = [
    { label: "First visit", value: firstVisit, first: true },
    { label: "Bi-weekly", value: biWeekly },
    { label: "Monthly", value: monthly },
  ];

  return (
    <div>
      <p className="mb-1 text-center text-[10px] font-semibold uppercase tracking-[0.1em] text-[#7b8986]">
        Recurring pricing comparison
      </p>

      <div className="divide-y divide-[#e7ecea] border-y border-[#e7ecea]">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between gap-4 py-2.5"
          >
            <span
              className={`text-sm ${
                row.first ? "font-medium text-[#354346]" : "text-[#66757b]"
              }`}
            >
              {row.label}
            </span>
            <span className="text-sm font-bold text-[#172126]">
              {formatEstimatePrice(row.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const InitialVisitNotice = () => (
  <div className="mt-4 flex items-start gap-2 rounded-xl bg-[#dce9fb] px-3 py-3 text-[#31506e]">
    <InfoIcon className="mt-0.5 h-4 w-4 shrink-0" />
    <p className="text-xs leading-relaxed">
      Initial service may be higher — the first visit usually takes extra time
      to bring the home to standard.
    </p>
  </div>
);

const MaintenancePlanCard = ({
  type,
  subtitle,
  pricing,
  features,
  mostComplete,
  onSelect,
}) => (
  <article
    className={`relative flex flex-col rounded-2xl border-2 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-lg ${
      mostComplete ? "border-[#74a9ff] shadow-sm" : "border-[#dfe7e4] shadow-sm"
    }`}
  >
    {mostComplete && (
      <span className="absolute -top-3 left-4 inline-flex items-center gap-1 rounded-full border border-[#c8dcff] bg-[#edf4ff] px-3 py-1 text-xs font-semibold text-[#2459a6]">
        <StarIcon className="h-3.5 w-3.5" />
        Most complete
      </span>
    )}

    <div className={mostComplete ? "mt-1" : ""}>
      <div className="flex items-center gap-2 text-[#21715f]">
        {type === "Regular Cleaning" ? (
          <HomeIcon className="h-5 w-5" />
        ) : (
          <SparklesIcon className="h-5 w-5" />
        )}
        <h3
          className="text-base font-semibold text-[#172126]"
          style={{ fontFamily: "Lexend, sans-serif" }}
        >
          {type}
        </h3>
      </div>
      <p className="mt-1 text-sm text-[#66757b]">{subtitle}</p>
    </div>

    <div className="mt-4">
      <PricingRows
        firstVisit={pricing.firstVisit}
        biWeekly={pricing.biWeekly}
        monthly={pricing.monthly}
      />
    </div>

    <InitialVisitNotice />

    <div className="mb-6 mt-5">
      <p className="mb-3 text-xs font-semibold text-[#354346]">
        {type === "Regular Cleaning"
          ? "Includes"
          : "Everything in Regular, plus"}
      </p>
      <ul className="space-y-2">
        {features.map((feature) => (
          <IncludedItem key={feature} accent={mostComplete}>
            {feature}
          </IncludedItem>
        ))}
      </ul>
    </div>

    <button
      type="button"
      onClick={onSelect}
      className="mt-auto w-full rounded-xl border border-[#cfd9d5] bg-white px-4 py-2.5 text-sm font-semibold text-[#263539] transition hover:border-[#21715f] hover:bg-[#f1f8f5] hover:text-[#176c5b] focus:outline-none focus:ring-4 focus:ring-[#21715f]/10"
    >
      Choose {type.toLowerCase()}
    </button>
  </article>
);

const MaintenanceResult = ({
  formData,
  regularEstimate,
  totalEstimate,
  onBack,
  onSelectService,
}) => {
  const regularPricing = {
    firstVisit: getEstimatePrice(regularEstimate, [
      "first_visit_price",
      "regular_first_time",
      "estimated_price",
    ]),
    biWeekly: getEstimatePrice(regularEstimate, [
      "bi_weekly_price",
      "biweekly_price",
      "regular_bi_weekly",
    ]),
    monthly: getEstimatePrice(regularEstimate, [
      "monthly_price",
      "regular_monthly",
    ]),
  };

  const totalPricing = {
    firstVisit: getEstimatePrice(totalEstimate, [
      "first_visit_price",
      "total_first_time",
      "estimated_price",
    ]),
    biWeekly: getEstimatePrice(totalEstimate, [
      "bi_weekly_price",
      "biweekly_price",
      "total_bi_weekly",
    ]),
    monthly: getEstimatePrice(totalEstimate, [
      "monthly_price",
      "total_monthly",
    ]),
  };

  const chooseService = ({ cleaningType, serviceType, pricing, estimate }) => {
    onSelectService({
      ...formData,
      cleaningType,
      serviceType,
      estimatedPrice: pricing.firstVisit || 0,
      pricing,
      estimate,
    });
  };

  return (
    <EstimatorCard>
      <div className="mb-7 text-center">
        <span className="inline-flex rounded-full bg-[#e3eeeb] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#176c5b]">
          Compare Your Maintenance Cleaning Options
        </span>
        <h2
          className="mx-auto mt-3 max-w-2xl text-xl font-bold text-[#172126] md:text-2xl"
          style={{ fontFamily: "Lexend, sans-serif" }}
        >
          Your home may qualify for either of these maintenance services
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-[#66757b]">
          Both leave your home looking and feeling clean — the main difference
          is the level of detail included.
        </p>
        <HomeSummary formData={formData} />
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <MaintenancePlanCard
          type="Regular Cleaning"
          subtitle="Best for lighter maintenance visits"
          pricing={regularPricing}
          features={REGULAR_CLEANING_INCLUDES}
          onSelect={() =>
            chooseService({
              cleaningType: "Regular",
              serviceType: "Regular Cleaning",
              pricing: regularPricing,
              estimate: regularEstimate,
            })
          }
        />

        <MaintenancePlanCard
          type="Total Cleaning"
          subtitle="Best for more complete maintenance"
          pricing={totalPricing}
          features={TOTAL_CLEANING_EXTRA_INCLUDES}
          mostComplete
          onSelect={() =>
            chooseService({
              cleaningType: "Total",
              serviceType: "Total Cleaning",
              pricing: totalPricing,
              estimate: totalEstimate,
            })
          }
        />
      </div>

      <div className="mt-6 flex items-start gap-3 rounded-xl border border-[#cfe0f7] bg-[#eef5ff] p-4 text-[#31506e]">
        <InfoIcon className="mt-0.5 h-5 w-5 shrink-0" />
        <p className="text-sm leading-6">
          You can{" "}
          <span className="font-semibold text-[#203f5d]">alternate</span>{" "}
          between{" "}
          <span className="font-semibold text-[#203f5d]">Regular Cleaning</span>{" "}
          and{" "}
          <span className="font-semibold text-[#203f5d]">Total Cleaning</span>{" "}
          based on your home’s needs. Choose Regular for most visits and
          schedule a Total Cleaning whenever your home needs more detailed
          maintenance.
        </p>
      </div>

      <div className="mt-6 border-t border-[#e5ebe8] pt-5">
        <button type="button" onClick={onBack} className={secondaryButtonClass}>
          <ArrowLeftIcon className="h-4 w-4" />
          Back to edit information
        </button>
      </div>
    </EstimatorCard>
  );
};

const DeepCleaningResult = ({
  formData,
  estimate,
  onBack,
  onSelectService,
}) => {
  const estimatedPrice = getEstimatePrice(estimate, [
    "first_visit_price",
    "deep_clean",
    "estimated_price",
  ]);

  return (
    <EstimatorCard>
      <div className="mb-7 text-center">
        <span className="inline-flex rounded-full bg-[#e3eeeb] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#176c5b]">
          Deep Cleaning Estimate
        </span>
        <h2
          className="mt-3 text-2xl font-bold text-[#172126] md:text-3xl"
          style={{ fontFamily: "Lexend, sans-serif" }}
        >
          Your Deep Cleaning Quote
        </h2>
        <HomeSummary formData={formData} />
      </div>

      <div className="rounded-2xl border border-[#dce9e5] bg-gradient-to-br from-[#f0f7f4] to-[#fff9e8] p-7 text-center">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#66757b]">
          Estimated First-Visit Price
        </p>
        <p
          className="mt-2 text-5xl font-bold text-[#21715f]"
          style={{ fontFamily: "Lexend, sans-serif" }}
        >
          {formatEstimatePrice(estimatedPrice)}
        </p>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[#66757b]">
          Designed for homes that need more intensive attention and a stronger
          reset before moving into a recurring maintenance service.
        </p>
      </div>

      <div className="mt-6">
        <h3
          className="text-lg font-semibold text-[#172126]"
          style={{ fontFamily: "Lexend, sans-serif" }}
        >
          What&apos;s included
        </h3>
        <ul className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
          {DEEP_CLEANING_INCLUDES.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 rounded-xl border border-[#e1e8e5] bg-[#fafcfb] p-3 text-sm text-[#5f6e72]"
            >
              <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#21715f]" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex items-start gap-3 rounded-xl border border-[#cfe0f7] bg-[#eef5ff] p-4 text-[#31506e]">
        <InfoIcon className="mt-0.5 h-5 w-5 shrink-0" />
        <p className="text-sm leading-relaxed">
          After the first Deep Cleaning, you may transition to a Regular or
          Total maintenance plan at a lower recurring price.
        </p>
      </div>

      <div className="mt-7 flex flex-col-reverse items-stretch justify-between gap-3 border-t border-[#e5ebe8] pt-6 sm:flex-row sm:items-center">
        <button type="button" onClick={onBack} className={secondaryButtonClass}>
          <ArrowLeftIcon className="h-4 w-4" />
          Back to edit information
        </button>

        <button
          type="button"
          onClick={() =>
            onSelectService({
              ...formData,
              cleaningType: "Deep",
              serviceType: "Deep Cleaning",
              estimatedPrice: estimatedPrice || 0,
              pricing: {
                firstVisit: estimatedPrice,
                biWeekly: null,
                monthly: null,
              },
              estimate,
            })
          }
          className={primaryButtonClass}
        >
          Continue to Schedule
          <ArrowRightIcon className="h-4 w-4" />
        </button>
      </div>
    </EstimatorCard>
  );
};

const ScheduleStep = ({ selectedService, onBack, onSubmitted }) => {
  const [isFlexible, setIsFlexible] = useState(true);
  const [preferredDate, setPreferredDate] = useState("");
  const [selectedTimeWindows, setSelectedTimeWindows] = useState([]);
  const [comments, setComments] = useState("");
  const [errors, setErrors] = useState(initialScheduleErrors);
  const [submitting, setSubmitting] = useState(false);

  const [serviceAddress, setServiceAddress] = useState({
    streetAddress: "",
    addressLine2: "",
    city: "",
    state: "AL",
    zipCode: "",
  });

  const selectedPrice = Number(selectedService?.estimatedPrice || 0);

  const toggleTimeWindow = (timeWindowId) => {
    setSelectedTimeWindows((current) =>
      current.includes(timeWindowId)
        ? current.filter((id) => id !== timeWindowId)
        : [...current, timeWindowId],
    );

    setErrors((current) => ({ ...current, timeWindows: "", submit: "" }));
  };

  const handleAddressChange = (event) => {
    const { name, value } = event.target;

    setServiceAddress((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
      submit: "",
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = {
      ...initialScheduleErrors,
    };

    if (!serviceAddress.streetAddress.trim()) {
      nextErrors.streetAddress = "Street address is required.";
    }

    if (!serviceAddress.city.trim()) {
      nextErrors.city = "City is required.";
    }

    if (!serviceAddress.state.trim()) {
      nextErrors.state = "State is required.";
    }

    if (!/^\d{5}(-\d{4})?$/.test(serviceAddress.zipCode.trim())) {
      nextErrors.zipCode = "Enter a valid ZIP Code.";
    }

    if (!isFlexible && !preferredDate) {
      nextErrors.preferredDate = "Please select a preferred date.";
    }

    if (!isFlexible && selectedTimeWindows.length === 0) {
      nextErrors.timeWindows = "Please select at least one time window.";
    }

    setErrors(nextErrors);

    if (
      nextErrors.streetAddress ||
      nextErrors.city ||
      nextErrors.state ||
      nextErrors.zipCode ||
      nextErrors.preferredDate ||
      nextErrors.timeWindows
    ) {
      return;
    }

    const preferredTimeWindows = TIME_WINDOWS.filter((window) =>
      selectedTimeWindows.includes(window.id),
    );

    const requestData = {
      ...selectedService,

      serviceAddress: {
        streetAddress: serviceAddress.streetAddress.trim(),
        addressLine2: serviceAddress.addressLine2.trim(),
        city: serviceAddress.city.trim(),
        state: serviceAddress.state.trim(),
        zipCode: serviceAddress.zipCode.trim(),
      },

      scheduling: {
        isFlexible,
        preferredDate: isFlexible ? "" : preferredDate,
        preferredTimeWindows: isFlexible ? [] : preferredTimeWindows,
        comments: comments.trim(),
      },
    };

    setSubmitting(true);

    try {
      await sendAppointmentRequest(requestData);
      onSubmitted(requestData);
    } catch (error) {
      console.error("Error sending appointment request:", error);
      setErrors((current) => ({
        ...current,
        submit:
          error.message ||
          "We could not submit your request. Please try again.",
      }));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <EstimatorCard>
      <div className="mb-7 text-center">
        <span className="inline-flex rounded-full bg-[#e3eeeb] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#176c5b]">
          Final Step
        </span>
        <h2
          className="mt-3 text-2xl font-bold text-[#172126] md:text-3xl"
          style={{ fontFamily: "Lexend, sans-serif" }}
        >
          Service Address &amp; Availability
        </h2>
        <div className="mt-3 flex flex-col items-center justify-center gap-1 sm:flex-row sm:gap-3">
          <p className="text-base font-bold text-[#172126]">
            {selectedService.serviceType} Selected —{" "}
            {formatCurrency(selectedPrice)}
          </p>
          <button
            type="button"
            onClick={onBack}
            className="text-sm font-semibold text-[#21715f] underline underline-offset-2 transition hover:text-[#195c4d]"
          >
            Change Plan
          </button>
        </div>
        <p className="mt-1 text-xs text-[#6a787d]">
          This is the estimated first-visit price for the selected service.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <section className="rounded-2xl border border-[#e2e9e6] bg-[#fcfefd] p-5">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e5efec] text-[#21715f]">
              <MapPinIcon className="h-5 w-5" />
            </div>
            <div>
              <h3
                className="text-lg font-semibold text-[#172126]"
                style={{ fontFamily: "Lexend, sans-serif" }}
              >
                Where Would You Like the Service?
              </h3>
              <p className="text-sm text-[#66757b]">
                Please enter the address of the home to be cleaned.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <FormLabel htmlFor="streetAddress">Street Address *</FormLabel>
              <input
                id="streetAddress"
                name="streetAddress"
                type="text"
                autoComplete="address-line1"
                placeholder="123 Main Street"
                value={serviceAddress.streetAddress}
                onChange={handleAddressChange}
                className={`${inputClass} ${
                  errors.streetAddress
                    ? "border-red-400 focus:border-red-500"
                    : ""
                }`}
              />
              <FieldError>{errors.streetAddress}</FieldError>
            </div>

            <div>
              <FormLabel htmlFor="addressLine2">
                Apt / Unit / Suite (optional)
              </FormLabel>
              <input
                id="addressLine2"
                name="addressLine2"
                type="text"
                autoComplete="address-line2"
                placeholder="Apt 4B, Unit 201, etc."
                value={serviceAddress.addressLine2}
                onChange={handleAddressChange}
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <FormLabel htmlFor="city">City *</FormLabel>
                <input
                  id="city"
                  name="city"
                  type="text"
                  autoComplete="address-level2"
                  placeholder="Madison"
                  value={serviceAddress.city}
                  onChange={handleAddressChange}
                  className={`${inputClass} ${
                    errors.city ? "border-red-400 focus:border-red-500" : ""
                  }`}
                />
                <FieldError>{errors.city}</FieldError>
              </div>

              <div>
                <FormLabel htmlFor="state">State *</FormLabel>
                <select
                  id="state"
                  name="state"
                  value={serviceAddress.state}
                  onChange={handleAddressChange}
                  className={`${inputClass} ${
                    errors.state ? "border-red-400 focus:border-red-500" : ""
                  }`}
                >
                  <option value="AL">Alabama (AL)</option>
                </select>
                <FieldError>{errors.state}</FieldError>
              </div>
            </div>

            <div>
              <FormLabel htmlFor="zipCode">ZIP Code *</FormLabel>
              <input
                id="zipCode"
                name="zipCode"
                type="text"
                inputMode="numeric"
                autoComplete="postal-code"
                placeholder="35758"
                value={serviceAddress.zipCode}
                onChange={handleAddressChange}
                className={`${inputClass} ${
                  errors.zipCode ? "border-red-400 focus:border-red-500" : ""
                }`}
              />
              <FieldError>{errors.zipCode}</FieldError>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-[#e2e9e6] bg-[#fcfefd] p-5">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e5efec] text-[#21715f]">
              <ClockIcon className="h-5 w-5" />
            </div>
            <div>
              <h3
                className="text-lg font-semibold text-[#172126]"
                style={{ fontFamily: "Lexend, sans-serif" }}
              >
                When Are You Available?
              </h3>
              <p className="text-sm text-[#66757b]">
                Choose the option that works best for you.
              </p>
            </div>
          </div>

          <div className="rounded-xl bg-[#f0f5f3] p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-[#263539]">
                  I&apos;m Flexible / First Available
                </p>
                <p className="mt-1 text-xs leading-relaxed text-[#71807c]">
                  Choose this option when you are open to any day and time for
                  faster availability.
                </p>
              </div>

              <Switch
                checked={isFlexible}
                onChange={(event) => {
                  const checked = event.target.checked;

                  setIsFlexible(checked);

                  if (checked) {
                    setPreferredDate("");
                    setSelectedTimeWindows([]);
                  }

                  setErrors((current) => ({
                    ...current,
                    preferredDate: "",
                    timeWindows: "",
                    submit: "",
                  }));
                }}
                inputProps={{
                  "aria-label": "I'm flexible / first available",
                }}
                sx={{
                  width: 54,
                  height: 32,
                  padding: 0,
                  "& .MuiSwitch-switchBase": {
                    padding: "4px",
                    transitionDuration: "200ms",
                    "&.Mui-checked": {
                      transform: "translateX(22px)",
                      color: "#ffffff",
                      "& + .MuiSwitch-track": {
                        backgroundColor: "#20725f",
                        opacity: 1,
                        border: 0,
                      },
                    },
                  },
                  "& .MuiSwitch-thumb": {
                    width: 24,
                    height: 24,
                    boxShadow: "0 2px 6px rgba(15, 23, 42, 0.18)",
                  },
                  "& .MuiSwitch-track": {
                    borderRadius: 999,
                    backgroundColor: "#dce5e2",
                    opacity: 1,
                    transition: "background-color 200ms",
                  },
                }}
              />
            </div>
          </div>

          {!isFlexible && (
            <div className="mt-5 space-y-4">
              <div>
                <FormLabel htmlFor="preferredDate">Preferred Day</FormLabel>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={preferredDate ? dayjs(preferredDate) : null}
                    minDate={dayjs().startOf("day")}
                    disabled={isFlexible}
                    onChange={(selectedDate) => {
                      setPreferredDate(
                        selectedDate && selectedDate.isValid()
                          ? selectedDate.format("YYYY-MM-DD")
                          : "",
                      );

                      setErrors((current) => ({
                        ...current,
                        preferredDate: "",
                        submit: "",
                      }));
                    }}
                    slotProps={{
                      textField: {
                        id: "preferredDate",
                        fullWidth: true,
                        placeholder: "Select your preferred day",
                        error: Boolean(errors.preferredDate),
                        size: "small",
                        sx: {
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                            backgroundColor: "#ffffff",
                            minHeight: "46px",
                            fontFamily: "inherit",
                          },
                          "& .MuiOutlinedInput-input": {
                            padding: "11px 14px",
                            fontFamily: "inherit",
                            fontSize: "0.95rem",
                          },
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: errors.preferredDate
                              ? "#f87171"
                              : "#dce5e2",
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: errors.preferredDate
                              ? "#f87171"
                              : "#20725f",
                          },
                          "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#20725f",
                            borderWidth: "1px",
                          },
                        },
                      },
                      openPickerButton: {
                        sx: {
                          color: "#20725f",
                        },
                      },
                    }}
                  />
                </LocalizationProvider>

                <FieldError>{errors.preferredDate}</FieldError>
              </div>

              <div>
                <p className="mb-2 text-sm font-medium text-[#28363a]">
                  Preferred Time Window(s)
                </p>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                  {TIME_WINDOWS.map((window) => {
                    const isSelected = selectedTimeWindows.includes(window.id);

                    return (
                      <button
                        key={window.id}
                        type="button"
                        onClick={() => toggleTimeWindow(window.id)}
                        className={`rounded-xl border p-3 text-center transition ${
                          isSelected
                            ? "border-[#21715f] bg-[#f0f8f5] shadow-sm ring-2 ring-[#21715f]/10"
                            : "border-[#dce5e2] bg-white hover:border-[#21715f]/45"
                        }`}
                        aria-pressed={isSelected}
                      >
                        <p className="text-xs font-semibold text-[#263539]">
                          {window.label}
                        </p>
                        <p className="mt-1 text-[11px] text-[#74827f]">
                          {window.time}
                        </p>
                      </button>
                    );
                  })}
                </div>
                <FieldError>{errors.timeWindows}</FieldError>
              </div>
            </div>
          )}

          <section className="mt-7 border-t border-[#e5ebe8] pt-6">
            <h3
              className="text-lg font-semibold text-[#172126]"
              style={{ fontFamily: "Lexend, sans-serif" }}
            >
              Comments &amp; Instructions
            </h3>
            <p className="mt-1 text-sm text-[#66757b]">
              Any special instructions or scheduling constraints? (Optional)
            </p>
            <textarea
              rows={4}
              value={comments}
              onChange={(event) => {
                setComments(event.target.value);
                setErrors((current) => ({ ...current, submit: "" }));
              }}
              placeholder="e.g., Only Wednesdays, after 3 PM, pet details, access instructions..."
              className="mt-3 min-h-[110px] w-full resize-y rounded-xl border border-[#dce5e2] bg-[#f7faf9] px-4 py-3 text-sm text-[#172126] outline-none transition placeholder:text-[#9aa6a2] focus:border-[#21715f] focus:bg-white focus:ring-4 focus:ring-[#21715f]/10"
            />
          </section>
        </section>

        <div className="mt-7 flex items-start gap-3 rounded-xl border border-[#cfe0f7] bg-[#eef5ff] p-4 text-[#31506e]">
          <InfoIcon className="mt-0.5 h-5 w-5 shrink-0" />
          <p className="text-xs leading-relaxed">
            <strong>Important Note:</strong> Requested dates and times are
            subject to availability. Our team will review current logistics and
            contact you by phone, text, or email within 24 hours to confirm the
            exact appointment time. Your estimated service price of{" "}
            <strong>{formatCurrency(selectedPrice)}</strong> will remain
            associated with this request.
          </p>
        </div>

        {errors.submit && (
          <div
            className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
            role="alert"
          >
            {errors.submit}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className={`${primaryButtonClass} mt-6 w-full py-3.5 text-base`}
        >
          <CalendarIcon className="h-5 w-5" />
          {submitting ? "Sending Request..." : "Request Cleaning Appointment"}
        </button>

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={onBack}
            className={secondaryButtonClass}
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back to edit plan options
          </button>
        </div>
      </form>
    </EstimatorCard>
  );
};

const SuccessStep = ({ requestData, onStartOver }) => {
  const fullAddress = [
    requestData.serviceAddress?.streetAddress,
    requestData.serviceAddress?.addressLine2,
    requestData.serviceAddress
      ? `${requestData.serviceAddress.city}, ${requestData.serviceAddress.state} ${requestData.serviceAddress.zipCode}`
      : null,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <EstimatorCard className="text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#e3f1ec] text-[#21715f]">
        <CheckCircleIcon className="h-9 w-9" />
      </div>

      <h2
        className="mt-5 text-2xl font-bold text-[#172126] md:text-3xl"
        style={{ fontFamily: "Lexend, sans-serif" }}
      >
        Your Request Has Been Sent
      </h2>

      <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-[#66757b]">
        Thank you, {requestData.name}. We received your request for a{" "}
        <strong>{requestData.serviceType}</strong> and will contact you by
        phone, text, or email within 24 hours to confirm availability.
      </p>

      <div className="mx-auto mt-6 max-w-md rounded-2xl border border-[#e1e8e5] bg-[#f7faf9] p-5 text-left">
        <div className="flex items-center justify-between gap-4 border-b border-[#e2e9e6] pb-3">
          <span className="text-sm text-[#66757b]">Estimated first visit</span>
          <span className="text-lg font-bold text-[#21715f]">
            {formatCurrency(requestData.estimatedPrice)}
          </span>
        </div>

        <div className="mt-3 flex items-start justify-between gap-4">
          <span className="text-sm text-[#66757b]">Service address</span>
          <span className="text-right text-sm font-semibold text-[#354346]">
            {fullAddress || "Provided in request"}
          </span>
        </div>

        <div className="mt-3 flex items-start justify-between gap-4">
          <span className="text-sm text-[#66757b]">Availability</span>
          <span className="text-right text-sm font-semibold text-[#354346]">
            {requestData.scheduling.isFlexible
              ? "Flexible / First available"
              : requestData.scheduling.preferredDate}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={onStartOver}
        className={`${primaryButtonClass} mt-7`}
      >
        Start Another Estimate
      </button>
    </EstimatorCard>
  );
};

const QuoteFormV2 = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(initialFormData);
  const [contactErrors, setContactErrors] = useState(initialContactErrors);
  const [homeErrors, setHomeErrors] = useState(initialHomeErrors);
  const [quoteResult, setQuoteResult] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [submittedRequest, setSubmittedRequest] = useState(null);
  const [loading, setLoading] = useState(false);
  const [estimateError, setEstimateError] = useState("");

  const pageTitle = useMemo(() => {
    if (submittedRequest) {
      return "Request Received | MCJ's Cleaning Service";
    }

    if (currentStep === 4) {
      return "Schedule Your Cleaning | MCJ's Cleaning Service";
    }

    return "Cleaning Estimate | MCJ's Cleaning Service";
  }, [currentStep, submittedRequest]);

  const handleFieldChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setContactErrors((current) => ({
      ...current,
      [name]: "",
      contact: "",
    }));

    setHomeErrors((current) => ({
      ...current,
      [name]: "",
    }));

    setEstimateError("");
  };

  const handleCounterChange = (field, value) => {
    setFormData((current) => ({ ...current, [field]: value }));
    setEstimateError("");
  };

  const validateContact = () => {
    const nextErrors = { ...initialContactErrors };
    const cleanedPhone = formData.phone.replace(/\D/g, "");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) {
      nextErrors.name = "Full name is required.";
    }

    if (formData.phone && cleanedPhone.length !== 10) {
      nextErrors.phone = "Phone number must contain 10 digits.";
    }

    if (formData.email && !emailRegex.test(formData.email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }

    const hasValidPhone = cleanedPhone.length === 10;
    const hasValidEmail = emailRegex.test(formData.email.trim());

    if (!hasValidPhone && !hasValidEmail) {
      nextErrors.contact =
        "Please provide at least one valid contact method: phone or email.";
    }

    setContactErrors(nextErrors);

    return !Object.values(nextErrors).some(Boolean);
  };

  const validateHome = () => {
    const nextErrors = { ...initialHomeErrors };
    const size = Number(formData.size);

    if (!formData.size) {
      nextErrors.size = "House size is required.";
    } else if (!Number.isInteger(size) || size <= 0) {
      nextErrors.size = "Enter a valid whole number greater than 0.";
    } else if (size < 1000 || size > 6000) {
      nextErrors.size =
        "Online estimates are currently available for homes from 1,000 to 6,000 sqft.";
    }

    setHomeErrors(nextErrors);

    return !Object.values(nextErrors).some(Boolean);
  };

  const handleContactContinue = (event) => {
    event.preventDefault();

    if (!validateContact()) return;

    setFormData((current) => ({
      ...current,
      name: current.name.trim(),
      phone: current.phone.trim(),
      email: current.email.trim(),
    }));

    setCurrentStep(2);
  };

  const handleHomeContinue = (event) => {
    event.preventDefault();

    if (!validateHome()) return;

    setCurrentStep(3);
  };

  const handleConditionChange = (condition) => {
    setFormData((current) => ({
      ...current,
      homeCondition: condition,
    }));
    setQuoteResult(null);
    setSelectedService(null);
    setEstimateError("");
  };

  const handleCalculateEstimate = async () => {
    if (!formData.homeCondition) {
      setEstimateError(
        "Please select the option that best describes your home.",
      );
      return;
    }

    setLoading(true);
    setEstimateError("");

    try {
      const pricingOptions = await fetchPricingOptions(formData);

      if (formData.homeCondition === "not_cleaned_recently") {
        setQuoteResult({
          type: "deep",
          deepEstimate: {
            estimated_price: pricingOptions.deep.one_time,
            first_visit_price: pricingOptions.deep.one_time,
            deep_clean: pricingOptions.deep.one_time,
            pricingData: pricingOptions,
          },
        });
      } else {
        setQuoteResult({
          type: "maintenance",
          regularEstimate: {
            first_visit_price: pricingOptions.regular.first_visit,
            weekly_price: pricingOptions.regular.weekly,
            bi_weekly_price: pricingOptions.regular.bi_weekly,
            monthly_price: pricingOptions.regular.monthly,
            estimated_price: pricingOptions.regular.first_visit,
            pricingData: pricingOptions,
          },
          totalEstimate: {
            first_visit_price: pricingOptions.total.first_visit,
            weekly_price: pricingOptions.total.weekly,
            bi_weekly_price: pricingOptions.total.bi_weekly,
            monthly_price: pricingOptions.total.monthly,
            estimated_price: pricingOptions.total.first_visit,
            pricingData: pricingOptions,
          },
        });
      }
    } catch (error) {
      console.error("Error calculating estimate:", error);
      setEstimateError(
        error.message ||
          "We could not calculate your estimate. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSelectService = (service) => {
    setSelectedService(service);
    setCurrentStep(4);
  };

  const handleBackFromSchedule = () => {
    setSelectedService(null);
    setCurrentStep(3);
  };

  const handleStartOver = () => {
    setCurrentStep(1);
    setFormData(initialFormData);
    setContactErrors(initialContactErrors);
    setHomeErrors(initialHomeErrors);
    setQuoteResult(null);
    setSelectedService(null);
    setSubmittedRequest(null);
    setEstimateError("");
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStep, quoteResult, submittedRequest]);

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta
          name="description"
          content="Get an instant residential cleaning estimate from MCJ's Cleaning Service."
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;600;700&family=Source+Sans+3:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      <section
        id="estimator"
        className="bg-gradient-to-b from-[#f4f8f6] to-[#fbfdfc] px-4 py-12 md:py-16"
        style={{ fontFamily: "'Source Sans 3', sans-serif" }}
      >
        <div className="mx-auto max-w-3xl">
          <EstimatorHeader />

          {!submittedRequest && <ProgressSteps currentStep={currentStep} />}

          {submittedRequest ? (
            <SuccessStep
              requestData={submittedRequest}
              onStartOver={handleStartOver}
            />
          ) : currentStep === 1 ? (
            <ContactStep
              formData={formData}
              errors={contactErrors}
              onFieldChange={handleFieldChange}
              onContinue={handleContactContinue}
            />
          ) : currentStep === 2 ? (
            <HomeDetailsStep
              formData={formData}
              errors={homeErrors}
              onFieldChange={handleFieldChange}
              onCounterChange={handleCounterChange}
              onBack={() => setCurrentStep(1)}
              onContinue={handleHomeContinue}
            />
          ) : currentStep === 3 && !quoteResult ? (
            <ServiceTypeStep
              formData={formData}
              loading={loading}
              error={estimateError}
              onConditionChange={handleConditionChange}
              onBack={() => setCurrentStep(2)}
              onCalculate={handleCalculateEstimate}
            />
          ) : currentStep === 3 && quoteResult?.type === "maintenance" ? (
            <MaintenanceResult
              formData={formData}
              regularEstimate={quoteResult.regularEstimate}
              totalEstimate={quoteResult.totalEstimate}
              onBack={() => setQuoteResult(null)}
              onSelectService={handleSelectService}
            />
          ) : currentStep === 3 && quoteResult?.type === "deep" ? (
            <DeepCleaningResult
              formData={formData}
              estimate={quoteResult.deepEstimate}
              onBack={() => setQuoteResult(null)}
              onSelectService={handleSelectService}
            />
          ) : currentStep === 4 && selectedService ? (
            <ScheduleStep
              selectedService={selectedService}
              onBack={handleBackFromSchedule}
              onSubmitted={setSubmittedRequest}
            />
          ) : null}
        </div>
      </section>
    </>
  );
};

export default QuoteFormV2;
