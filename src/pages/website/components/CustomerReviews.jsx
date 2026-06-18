import React from "react";

const reviews = [
  {
    id: 1,
    name: "Sarah L.",
    location: "Huntsville, AL",
    text: "MCJ’s team was on time, professional, and extremely detailed. The kitchen and bathrooms looked brand new.",
  },
  {
    id: 2,
    name: "Michael B.",
    location: "Madison, AL",
    text: "Great communication and consistent quality. We love walking into a fresh home after every cleaning.",
  },
  {
    id: 3,
    name: "Alyssa R.",
    location: "Owens Cross Roads, AL",
    text: "We booked a deep clean and they exceeded expectations. Very thorough and respectful of our space.",
  },
];

function getInitials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export default function CustomerReviews() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 text-center">
        {/* Header */}
        <div className="mb-12">
          <h4 className="text-sm font-semibold tracking-widest text-yellow-600 uppercase mb-3">
            Not yet convinced?
          </h4>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Read Customer Reviews
          </h2>
          <div className="mt-4 h-1 w-20 bg-yellow-500 mx-auto rounded-full" />
        </div>

        {/* Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-3 border border-gray-200">
          {reviews.map((r, index) => (
            <div
              key={r.id}
              className={`p-8 ${
                index < reviews.length - 1 ? "md:border-r border-gray-200" : ""
              } border-b md:border-b-0 border-gray-200`}
            >
              {/* Avatar */}
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-yellow-500 text-white flex items-center justify-center text-xl font-bold">
                  {getInitials(r.name)}
                </div>
              </div>

              {/* Review text */}
              <p className="text-gray-600 leading-relaxed mb-6">“{r.text}”</p>

              {/* Name */}
              <h5 className="font-semibold text-gray-900">{r.name}</h5>
              <span className="text-xs uppercase tracking-wide text-gray-500">
                {r.location}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10">
          <a
            href="https://g.page/r/your-google-profile"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 rounded-xl bg-gray-900 text-white font-semibold hover:bg-gray-800 transition"
          >
            Read more on Google
          </a>
        </div>
      </div>
    </section>
  );
}
