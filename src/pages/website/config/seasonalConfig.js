const seasonalCampaigns = [
  {
    id: "thanksgiving",
    start: "11-01",
    end: "11-25",
    message:
      "🍂 Thanksgiving is almost here! Make your home guest-ready for the holidays.",
    backgroundColor: "#FFF3E3",
    textColor: "#78461F",
    section: {
      eyebrow: "🍂 THANKSGIVING SEASON",
      title: "A Cleaner Home. More Time for What Matters.",
      description:
        "Hosting family or guests this Thanksgiving? Let us take care of the cleaning so you can focus on making memories.",
      image: "/assets/seasons/thanksgiving.webp",
      imageAlt: "Beautifully prepared Thanksgiving dining room",
    },
  },
  {
    id: "thanksgiving-day",
    start: "11-26",
    end: "11-26",
    message: "🦃 Happy Thanksgiving from MCJ's Cleaning Service!",
    backgroundColor: "#FFF3E3",
    textColor: "#78461F",
  },
  {
    id: "christmas",
    start: "12-01",
    end: "12-25",
    message: "🎄 Make your home merry, bright, and holiday-ready!",
    backgroundColor: "#EAF3EA",
    textColor: "#28543A",
    section: {
      eyebrow: "🎄 CHRISTMAS SEASON",
      title: "A Fresh Home for the Most Wonderful Time of the Year.",
      description:
        "Enjoy the holiday season with family and friends while we help keep your home clean, fresh, and welcoming.",
      image: "/assets/seasons/christmas.webp",
      imageAlt: "Elegant Christmas decorations in a clean living room",
    },
  },
];

export function getActiveSeason(date = new Date()) {
  const monthDay = [
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");

  return (
    seasonalCampaigns.find(
      (campaign) => monthDay >= campaign.start && monthDay <= campaign.end,
    ) ?? null
  );
}
