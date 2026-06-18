import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import BASE_URL from "../config.js";

const deepCleaningIncludes = [
  "Full bathrooms",
  "Dusting all surfaces",
  "Kitchen cleaning",
  "Vacuuming & mopping floors",
  "Baseboards, blinds, window sills, ceiling fans",
  "Switch plates, outlet plates, and door knobs",
  "Interior windows",
  "Deep cleaning of surfaces",
  "Under furniture",
  "Sofas under cushions and pillows",
  "Light fixtures and vents",
  "Small stains on walls, doors, and baseboards",
];

const regularCleaningIncludes = [
  "Bathrooms",
  "Dusting surfaces",
  "Kitchen cleaning",
  "Vacuuming & mopping floors",
];

const totalCleaningExtraIncludes = [
  "Baseboards, blinds, ceiling fans, window sills",
  "Switch plates, outlet plates, and door knobs",
  "Interior windows",
];

const formatCurrency = (amount) => {
  const numericAmount = Number(amount);

  if (!Number.isFinite(numericAmount)) return "$0";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(numericAmount);
};

const fetchEstimate = async (cleaningType, formData) => {
  const response = await fetch(`${BASE_URL}/calculate-estimate-tab/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      house_size: Number(formData.size),
      cleaning_type: cleaningType,
    }),
  });

  if (!response.ok) {
    throw new Error(`Error calculating ${cleaningType} estimate`);
  }

  return response.json();
};

const DeepCleaningResult = ({ quote, estimate, onBack, onRequestEstimate }) => {
  const estimatedPrice = Number(estimate?.estimated_price ?? 0);

  const homeSummary = [
    quote.size ? `${Number(quote.size).toLocaleString("en-US")} sqft` : null,
    quote.bedrooms ? `${quote.bedrooms} bedrooms` : null,
    quote.bathrooms ? `${quote.bathrooms} bathrooms` : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <>
      <Helmet>
        <title>Deep Cleaning Estimate | MCJ&apos;s Cleaning Service</title>
      </Helmet>

      <div className="h-full bg-[#eef3f8] px-4 py-6">
        <div className="mx-auto max-w-5xl">
          <h1 className="mb-6 text-center text-3xl font-bold text-[#1f4b8f] md:text-4xl">
            Cleaning Quote Calculator
          </h1>

          <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-5 shadow-md md:p-7">
            <div className="mb-5 rounded-2xl border border-blue-100 bg-blue-50 p-5">
              <p className="mb-2 inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-[#1f4b8f]">
                Recommended for Your Home
              </p>

              <h2 className="text-3xl font-bold text-slate-900">
                Deep Cleaning
              </h2>

              <p className="mt-3 text-base leading-relaxed text-slate-700">
                Based on the current condition of your home, we recommend a Deep
                Cleaning for the first visit. This service is designed for homes
                that need more intensive attention and a stronger reset before
                moving into a recurring service.
              </p>

              {homeSummary && (
                <p className="mt-3 text-sm font-medium text-slate-600">
                  Home details: {homeSummary}
                </p>
              )}
            </div>

            <div className="mb-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center">
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Estimated Price
              </p>
              <p className="mt-1 text-4xl font-bold text-[#1f4b8f]">
                {formatCurrency(estimatedPrice)}
              </p>
            </div>

            <section>
              <h3 className="mb-4 text-2xl font-semibold text-slate-800">
                What&apos;s included
              </h3>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {deepCleaningIncludes.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-3"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-700">
                      ✓
                    </span>
                    <p className="text-sm font-medium text-slate-700">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            <div className="mt-7 flex justify-center">
              <button
                type="button"
                onClick={() =>
                  onRequestEstimate({
                    ...quote,
                    cleaningType: "Deep",
                    frequency: "",
                    serviceType: "Deep Cleaning",
                    estimatedPrice,
                    estimate,
                  })
                }
                className="w-full rounded-xl bg-[#2450c3] px-6 py-3 text-base font-semibold text-white shadow-md transition hover:bg-[#1d43a5] md:w-auto md:min-w-[280px]"
              >
                Request This Estimate
              </button>
            </div>

            <button
              type="button"
              onClick={onBack}
              className="mt-5 text-sm font-semibold text-slate-500 transition hover:text-slate-800"
            >
              ← Back to edit information
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const MaintenanceCleaningResult = ({
  quote,
  regularEstimate,
  totalEstimate,
  onBack,
  onChooseService,
}) => {
  const regularPrice = Number(regularEstimate?.estimated_price ?? 0);
  const totalPrice = Number(totalEstimate?.estimated_price ?? 0);

  const homeSummary = [
    quote.size ? `${Number(quote.size).toLocaleString("en-US")} sqft` : null,
    quote.bedrooms ? `${quote.bedrooms} bedrooms` : null,
    quote.bathrooms ? `${quote.bathrooms} bathrooms` : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <>
      <Helmet>
        <title>
          Maintenance Cleaning Estimate | MCJ&apos;s Cleaning Service
        </title>
      </Helmet>

      <div className="h-full bg-[#eef3f8] px-4 py-6">
        <div className="mx-auto max-w-5xl">
          <h1 className="mb-6 text-center text-3xl font-bold text-[#1f4b8f] md:text-4xl">
            Cleaning Quote Calculator
          </h1>

          <div className="mx-auto max-w-5xl rounded-2xl border border-slate-200 bg-white p-5 shadow-md md:p-7">
            <div className="mb-6 text-center">
              <p className="mb-2 inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-[#1f4b8f]">
                Compare Your Maintenance Cleaning Options
              </p>

              <h2 className="text-3xl font-bold text-slate-900">
                Your home may qualify for either of these maintenance services.
              </h2>

              <p className="mx-auto mt-3 max-w-3xl text-base leading-relaxed text-slate-700">
                Both leave your home looking and feeling clean — the main
                difference is the level of detail included.
              </p>

              {homeSummary && (
                <p className="mt-3 text-sm font-medium text-slate-600">
                  Home details: {homeSummary}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <article className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4">
                  <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                    Option A
                  </p>

                  <h3 className="mt-1 text-2xl font-bold text-slate-900">
                    Regular Cleaning
                  </h3>

                  <p className="mt-2 text-sm font-medium text-slate-600">
                    Best for: lighter maintenance visits
                  </p>
                </div>

                <div className="mb-5 rounded-2xl bg-slate-50 p-4 text-center">
                  <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                    Estimated Price
                  </p>
                  <p className="mt-1 text-3xl font-bold text-[#1f4b8f]">
                    {formatCurrency(regularPrice)}
                  </p>
                </div>

                <div className="mb-6">
                  <h4 className="mb-3 text-lg font-semibold text-slate-800">
                    Includes:
                  </h4>

                  <div className="space-y-3">
                    {regularCleaningIncludes.map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-700">
                          ✓
                        </span>
                        <p className="text-sm font-medium text-slate-700">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    onChooseService({
                      ...quote,
                      cleaningType: "Regular",
                      frequency: "",
                      serviceType: "Regular Cleaning",
                      estimatedPrice: regularPrice,
                      estimate: regularEstimate,
                    })
                  }
                  className="mt-auto rounded-xl bg-[#2450c3] px-6 py-3 text-base font-semibold text-white shadow-md transition hover:bg-[#1d43a5]"
                >
                  Choose Regular Cleaning
                </button>
              </article>

              <article className="flex flex-col rounded-2xl border border-blue-200 bg-blue-50/30 p-5 shadow-sm">
                <div className="mb-4">
                  <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                    Option B
                  </p>

                  <h3 className="mt-1 text-2xl font-bold text-slate-900">
                    Total Cleaning
                  </h3>

                  <p className="mt-2 text-sm font-medium text-slate-600">
                    Best for: more complete maintenance cleaning
                  </p>
                </div>

                <div className="mb-5 rounded-2xl bg-white p-4 text-center">
                  <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                    Estimated Price
                  </p>
                  <p className="mt-1 text-3xl font-bold text-[#1f4b8f]">
                    {formatCurrency(totalPrice)}
                  </p>
                </div>

                <div className="mb-6">
                  <h4 className="mb-3 text-lg font-semibold text-slate-800">
                    Includes everything in Regular, plus:
                  </h4>

                  <div className="space-y-3">
                    {totalCleaningExtraIncludes.map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-700">
                          ✓
                        </span>
                        <p className="text-sm font-medium text-slate-700">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    onChooseService({
                      ...quote,
                      cleaningType: "Total",
                      frequency: "",
                      serviceType: "Total Cleaning",
                      estimatedPrice: totalPrice,
                      estimate: totalEstimate,
                    })
                  }
                  className="mt-auto rounded-xl bg-[#2450c3] px-6 py-3 text-base font-semibold text-white shadow-md transition hover:bg-[#1d43a5]"
                >
                  Choose Total Cleaning
                </button>
              </article>
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center">
              <p className="text-sm font-medium text-slate-700">
                You can alternate between Regular and Total Cleaning as needed.
              </p>
            </div>

            <button
              type="button"
              onClick={onBack}
              className="mt-5 text-sm font-semibold text-slate-500 transition hover:text-slate-800"
            >
              ← Back to edit information
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const QuoteFormV2 = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    size: "",
    bedrooms: "",
    bathrooms: "",
    homeCondition: "",
  });

  const [quoteResult, setQuoteResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [errors, setErrors] = useState({
    name: "",
    size: "",
    phone: "",
    email: "",
    contact: "",
    homeCondition: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
      contact: "",
    }));

    setSubmitError("");
  };

  const validateForm = () => {
    let hasErrors = false;

    const newErrors = {
      name: "",
      size: "",
      phone: "",
      email: "",
      contact: "",
      homeCondition: "",
    };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      hasErrors = true;
    }

    if (!formData.size.trim()) {
      newErrors.size = "House size is required";
      hasErrors = true;
    } else if (!/^\d+$/.test(formData.size) || Number(formData.size) <= 0) {
      newErrors.size = "House size must be a valid integer greater than 0";
      hasErrors = true;
    }

    const cleanedPhone = formData.phone.replace(/[\s()-]/g, "");
    const phoneRegex = /^\d{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const isPhoneValid = formData.phone ? phoneRegex.test(cleanedPhone) : false;

    const isEmailValid = formData.email
      ? emailRegex.test(formData.email)
      : false;

    if (formData.phone && !isPhoneValid) {
      newErrors.phone = "Phone number must be 10 digits";
      hasErrors = true;
    }

    if (formData.email && !isEmailValid) {
      newErrors.email = "Invalid email format";
      hasErrors = true;
    }

    if (!isPhoneValid && !isEmailValid) {
      newErrors.contact = "At least one contact method is required";
      hasErrors = true;
    }

    if (!formData.homeCondition) {
      newErrors.homeCondition = "Please select your home's current condition";
      hasErrors = true;
    }

    setErrors(newErrors);
    return !hasErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const cleanedFormData = {
      ...formData,
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      size: formData.size.trim(),
      bedrooms: formData.bedrooms.trim(),
      bathrooms: formData.bathrooms.trim(),
    };

    setLoading(true);
    setSubmitError("");

    try {
      if (cleanedFormData.homeCondition === "not_cleaned_recently") {
        const deepEstimate = await fetchEstimate("Deep", cleanedFormData);

        setQuoteResult({
          type: "deep",
          formData: {
            ...cleanedFormData,
            cleaningType: "Deep",
            frequency: "",
          },
          deepEstimate,
        });

        return;
      }

      if (cleanedFormData.homeCondition === "maintained_regularly") {
        const [regularEstimate, totalEstimate] = await Promise.all([
          fetchEstimate("Regular", cleanedFormData),
          fetchEstimate("Total", cleanedFormData),
        ]);

        setQuoteResult({
          type: "maintenance",
          formData: cleanedFormData,
          regularEstimate,
          totalEstimate,
        });
      }
    } catch (error) {
      console.error("Error calculating estimate:", error);
      setSubmitError("We could not calculate your estimate. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRequestEstimate = (estimateData) => {
    console.log("Estimate requested:", estimateData);

    // Próximo paso:
    // Aquí podemos conectar con la pantalla de dirección,
    // enviar inquiry, guardar lead, o navegar a confirmation.
  };

  const handleChooseMaintenanceService = (estimateData) => {
    console.log("Maintenance service selected:", estimateData);

    // Próximo paso:
    // Aquí podemos conectar con la pantalla de dirección,
    // enviar inquiry, guardar lead, o navegar a confirmation.
  };

  if (quoteResult?.type === "deep") {
    return (
      <DeepCleaningResult
        quote={quoteResult.formData}
        estimate={quoteResult.deepEstimate}
        onBack={() => setQuoteResult(null)}
        onRequestEstimate={handleRequestEstimate}
      />
    );
  }

  if (quoteResult?.type === "maintenance") {
    return (
      <MaintenanceCleaningResult
        quote={quoteResult.formData}
        regularEstimate={quoteResult.regularEstimate}
        totalEstimate={quoteResult.totalEstimate}
        onBack={() => setQuoteResult(null)}
        onChooseService={handleChooseMaintenanceService}
      />
    );
  }

  const conditionCardBase =
    "rounded-xl border p-4 transition-all duration-200 cursor-pointer shadow-sm";

  const inputBase =
    "w-full rounded-lg border border-slate-300 bg-[#eef3f8] px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200";

  return (
    <>
      <Helmet>
        <title>
          Cleaning Quote Calculator V2 | MCJ&apos;s Cleaning Service
        </title>
      </Helmet>

      <div className="h-full bg-[#eef3f8] px-4 py-6">
        <div className="mx-auto max-w-5xl">
          <h1 className="mb-6 text-center text-3xl font-bold text-[#1f4b8f] md:text-4xl">
            Cleaning Quote Calculator
          </h1>

          <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-5 shadow-md md:p-6">
            <form onSubmit={handleSubmit} className="space-y-7">
              <section>
                <div className="mb-3 flex items-center gap-2">
                  <h2 className="text-2xl font-semibold text-slate-800">
                    Contact Information
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`${inputBase} ${
                        errors.name ? "border-red-500 ring-1 ring-red-200" : ""
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                      Phone
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`${inputBase} ${
                        errors.phone || errors.contact
                          ? "border-red-500 ring-1 ring-red-200"
                          : ""
                      }`}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`${inputBase} ${
                        errors.email || errors.contact
                          ? "border-red-500 ring-1 ring-red-200"
                          : ""
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {errors.contact && (
                  <p className="mt-2 text-xs text-red-500">{errors.contact}</p>
                )}
              </section>

              <section>
                <div className="mb-3 flex items-center gap-2">
                  <span className="text-xl">🏠</span>
                  <h2 className="text-2xl font-semibold text-slate-800">
                    Tell Us About Your Home
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                      House Size (sqft)
                    </label>
                    <input
                      type="text"
                      name="size"
                      value={formData.size}
                      onChange={handleChange}
                      className={`${inputBase} ${
                        errors.size ? "border-red-500 ring-1 ring-red-200" : ""
                      }`}
                    />
                    {errors.size && (
                      <p className="mt-1 text-xs text-red-500">{errors.size}</p>
                    )}
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                      Bedrooms{" "}
                      <span className="text-slate-400">(optional)</span>
                    </label>
                    <input
                      type="text"
                      name="bedrooms"
                      value={formData.bedrooms}
                      onChange={handleChange}
                      className={inputBase}
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                      Bathrooms{" "}
                      <span className="text-slate-400">(optional)</span>
                    </label>
                    <input
                      type="text"
                      name="bathrooms"
                      value={formData.bathrooms}
                      onChange={handleChange}
                      className={inputBase}
                    />
                  </div>
                </div>
              </section>

              <section>
                <div className="mb-3 flex items-center gap-2">
                  <span className="text-xl">🧹</span>
                  <h2 className="text-2xl font-semibold text-slate-800">
                    Current Condition
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <label
                    className={`${conditionCardBase} ${
                      formData.homeCondition === "not_cleaned_recently"
                        ? "border-blue-600 bg-blue-50 ring-2 ring-blue-200"
                        : "border-slate-300 bg-white hover:border-slate-400"
                    }`}
                  >
                    <input
                      type="radio"
                      name="homeCondition"
                      value="not_cleaned_recently"
                      checked={
                        formData.homeCondition === "not_cleaned_recently"
                      }
                      onChange={handleChange}
                      className="sr-only"
                    />

                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center">
                        <img
                          src="/assets/broom.png"
                          alt="Broom icon"
                          className="h-10 w-10 object-contain"
                        />
                      </div>

                      <div>
                        <p className="text-base font-semibold leading-snug text-slate-800">
                          My home has NOT been professionally cleaned recently
                        </p>
                        <p className="mt-1 text-sm text-slate-600">
                          Recommended: Deep Cleaning
                        </p>
                      </div>
                    </div>
                  </label>

                  <label
                    className={`${conditionCardBase} ${
                      formData.homeCondition === "maintained_regularly"
                        ? "border-blue-600 bg-blue-50 ring-2 ring-blue-200"
                        : "border-slate-300 bg-white hover:border-slate-400"
                    }`}
                  >
                    <input
                      type="radio"
                      name="homeCondition"
                      value="maintained_regularly"
                      checked={
                        formData.homeCondition === "maintained_regularly"
                      }
                      onChange={handleChange}
                      className="sr-only"
                    />

                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center">
                        <img
                          src="/assets/household-accessory.png"
                          alt="Maintained home icon"
                          className="h-10 w-10 object-contain"
                        />
                      </div>

                      <div>
                        <p className="text-base font-semibold leading-snug text-slate-800">
                          My home is already maintained
                        </p>
                        <p className="mt-1 text-sm text-slate-600">
                          Compare: Regular Cleaning and Total Cleaning
                        </p>
                      </div>
                    </div>
                  </label>
                </div>

                {errors.homeCondition && (
                  <p className="mt-2 text-xs text-red-500">
                    {errors.homeCondition}
                  </p>
                )}
              </section>

              {submitError && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-3">
                  <p className="text-sm font-medium text-red-600">
                    {submitError}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-[#2450c3] px-6 py-3 text-base font-semibold text-white shadow-md transition hover:bg-[#1d43a5] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Calculating..." : "Get My Estimate"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuoteFormV2;
