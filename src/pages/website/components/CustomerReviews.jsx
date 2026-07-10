import { motion } from "framer-motion";
import "./CustomerReviews.css";

const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/place/MCJ's+Cleaning+Service/@34.7079478,-86.8867823,11z/data=!3m1!4b1!4m6!3m5!1s0x8770d0dbc5f7d1c1:0x3c59563c0f3f4b04!8m2!3d34.7077765!4d-86.721975!16s%2Fg%2F11zgflydmh";

const googleReviewStats = {
  rating: 5.0,
  reviewsCount: 10,
  updatedAt: "July 2026",
};

const customerReviews = [
  {
    id: 1,
    name: "Jennifer Chaney",
    initial: "J",
    rating: 5,
    date: "July 9, 2026",
    text: "We've been using MCJ's Cleaning Service for nearly 3 years across two properties. They are top notch—trustworthy, attentive to detail, and genuinely committed to customer satisfaction.",
  },
  {
    id: 2,
    name: "Brooke Bush",
    initial: "B",
    rating: 5,
    date: "July 8, 2026",
    text: "From the moment we connected with MCJ, they were professional, friendly, and incredibly thorough. They paid attention to every detail, and our home has never looked or smelled so clean.",
  },
  {
    id: 3,
    name: "Elizabeth",
    initial: "E",
    rating: 5,
    date: "July 8, 2026",
    text: "MCJ is punctual, professional, thorough, and easy to communicate with. They are flexible, accommodating, and provide an exceptional level of service.",
  },
];

const renderStars = (rating) => {
  return "★".repeat(rating);
};

const CustomerReviews = () => {
  return (
    <section
      className="customer-reviews-section"
      aria-labelledby="customer-reviews-title"
    >
      <div className="customer-reviews-container">
        <motion.div
          className="customer-reviews-header"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <span className="customer-reviews-eyebrow">
            Trusted by Local Families
          </span>

          <h2 id="customer-reviews-title">
            Real feedback from families who trust us with their homes.
          </h2>

          <div className="google-rating-summary">
            <div className="google-rating-main">
              <div
                className="google-rating-stars"
                aria-label={`${googleReviewStats.rating} out of 5 stars`}
              >
                {renderStars(5)}
              </div>

              <div className="google-rating-score">
                {googleReviewStats.rating.toFixed(1)}
              </div>
            </div>

            <div className="google-rating-details">
              <strong>Google Reviews</strong>

              <span>
                Based on {googleReviewStats.reviewsCount} customer reviews as of{" "}
                {googleReviewStats.updatedAt}.
              </span>
            </div>
          </div>

          <p className="customer-reviews-intro">
            We are grateful for every family who trusts MCJ&apos;s Cleaning
            Service with their home. Your feedback means a lot to our small
            family-owned business and motivates us to keep providing careful,
            consistent, and dependable cleaning service.
          </p>
        </motion.div>

        <div className="customer-reviews-grid">
          {customerReviews.map((review, index) => (
            <motion.article
              className="customer-review-card"
              key={review.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: index * 0.12,
              }}
            >
              <div className="customer-review-card-top">
                <div className="customer-review-avatar" aria-hidden="true">
                  {review.initial}
                </div>

                <div className="customer-review-customer">
                  <h3>{review.name}</h3>

                  <div
                    className="customer-review-customer-stars"
                    aria-label={`${review.rating} out of 5 stars`}
                  >
                    {renderStars(review.rating)}
                  </div>
                </div>
              </div>

              <p className="customer-review-text">{review.text}</p>

              <div className="customer-review-footer">
                <span>{review.date}</span>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          className="customer-reviews-actions"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="customer-reviews-btn customer-reviews-btn-outline"
          >
            Read Our Reviews on Google
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CustomerReviews;
