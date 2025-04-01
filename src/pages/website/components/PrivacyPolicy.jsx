import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4">Last updated: [Fecha de actualización]</p>

      <h2 className="text-xl font-semibold mt-4">1. Information We Collect</h2>
      <p>
        We may collect personal information such as name, phone number, and
        email when you request a cleaning estimate or contact us. We also
        collect website usage data through cookies and Google Analytics.
      </p>

      <h2 className="text-xl font-semibold mt-4">
        2. How We Use Your Information
      </h2>
      <p>
        We use your data to provide cleaning services, respond to inquiries,
        improve our website, and send promotional materials (only with consent).
      </p>

      <h2 className="text-xl font-semibold mt-4">
        3. Sharing Your Information
      </h2>
      <p>
        We do not sell or rent your personal information. However, we may share
        data with service providers or comply with legal requirements.
      </p>

      <h2 className="text-xl font-semibold mt-4">4. Data Security</h2>
      <p>
        We take security measures to protect your information, but we cannot
        guarantee absolute security online.
      </p>

      <h2 className="text-xl font-semibold mt-4">5. Your Rights and Choices</h2>
      <p>
        You can request access, correction, or deletion of your data. You can
        also opt out of marketing emails at any time.
      </p>

      <h2 className="text-xl font-semibold mt-4">6. Contact Us</h2>
      <p>If you have any questions about this Privacy Policy, contact us at:</p>
      <ul className="list-disc ml-6">
        <li>Email: mcjs.cleaning@gmail.com</li>
        <li>
          Website:{" "}
          <a href="https://mcjscleaningservice.com" className="text-blue-600">
            mcjscleaningservice.com
          </a>
        </li>
      </ul>
    </div>
  );
};

export default PrivacyPolicy;
