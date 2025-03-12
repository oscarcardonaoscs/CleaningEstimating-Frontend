import React, { useState, useEffect } from "react";

const ReferralPage = ({ referralCode }) => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    // Generar la URL única para cada cliente
    setImageUrl(`https://mcjscleaningservice.com/download/${referralCode}`);
  }, [referralCode]);

  return (
    <div>
      <h1>Referral Page</h1>
      <p>Share your referral code:</p>
      <h3>{referralCode}</h3>
      <a href={imageUrl} download>
        <button>Download Your Image</button>
      </a>
    </div>
  );
};

export default ReferralPage;
