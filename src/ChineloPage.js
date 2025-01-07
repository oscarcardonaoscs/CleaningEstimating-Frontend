import React from "react";

const ChineloPage = () => {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", lineHeight: 1.6 }}>
      {/* Header */}
      <header
        style={{
          backgroundColor: "#004d40",
          color: "white",
          padding: "1rem 0",
          textAlign: "center",
        }}
      >
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center">
          Discover the Chinelo Tradition
        </h1>
      </header>

      {/* Body */}
      <main
        style={{
          textAlign: "justify",
          padding: "1rem",
          maxWidth: "800px",
          margin: "0 auto",
        }}
        className="sm:px-6 lg:px-8"
      >
        <p className="text-sm sm:text-base lg:text-lg">
          Thank you for trusting and supporting us! To show our appreciation, we
          are delighted to share a small token of our gratitude: a miniature
          Chinelo magnet.
        </p>

        <section
          style={{ textAlign: "justify", marginBottom: "1.5rem" }}
          className="mb-6 sm:mb-8 lg:mb-12"
        >
          <h2
            className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4"
            style={{ color: "#164e63" }}
          >
            What is a Chinelo?
          </h2>
          <p className="text-sm sm:text-base lg:text-lg">
            The Chinelo is a traditional Mexican figure that holds deep cultural
            significance, especially in the state of Morelos, where we are from.
          </p>
          <p className="text-sm sm:text-base lg:text-lg">
            Known for its colorful costumes, the Chinelo’s origin dates back to
            the 19th century when locals playfully mocked the European elite
            during festive occasions. With their elaborate embroidery, tall hats
            adorned with plumes, and distinctive bearded masks, Chinelos have
            become a symbol of cultural pride and joy.
          </p>
        </section>

        <section
          style={{ textAlign: "justify", marginBottom: "1.5rem" }}
          className="mb-6 sm:mb-8 lg:mb-12"
        >
          <h2
            className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4"
            style={{ color: "#164e63" }}
          >
            The Costume and its Meaning
          </h2>
          <p className="text-sm sm:text-base lg:text-lg">
            The Chinelo’s costume features intricate designs that reflect the
            creativity and spirit of the community. The tall feathered hat and
            bearded mask represent a playful caricature of Europeans,
            highlighting the resilience and humor of Mexican traditions.
          </p>
        </section>

        <section
          style={{ textAlign: "justify", marginBottom: "1.5rem" }}
          className="mb-6 sm:mb-8 lg:mb-12"
        >
          <h2
            className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4"
            style={{ color: "#164e63" }}
          >
            Experience the Chinelo
          </h2>
          <p className="text-sm sm:text-base lg:text-lg">
            Watch the Chinelo dance in action and feel the energy of Mexican
            celebrations. Here’s a glimpse of this vibrant tradition:
          </p>
          <img
            src="https://zihrena.net/wp-content/uploads/ChinelosSanJuanDoctores201101.jpg"
            alt="Chinelo dancer in traditional costume"
            style={{ marginBottom: "1rem", borderRadius: "8px" }}
            className="w-full h-auto"
          />
          <p className="text-sm sm:text-base lg:text-lg">
            The Chinelo dance is performed during Carnival (prior to Ash
            Wednesday) in both Tlayacapan and Tepoztlán and at the Tepozteco
            Festival on September 7 and 8. The Chinelos, dressed in colorful
            attire with bearded masks and elaborately decorated headgear, dance
            (or rather bounce) through the town accompanied by drums and other
            instruments and followed by fellow revelers and townspeople.
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "1rem 0",
            }}
            className="w-full"
          >
            <iframe
              className="w-full sm:w-3/4 lg:w-1/2"
              style={{ aspectRatio: "16/9" }}
              src="https://www.youtube.com/embed/DlILowfLUiQ"
              title="Chinelo Dance"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </section>
        <section style={{ textAlign: "justify", marginBottom: "1.5rem" }}>
          <p className="text-sm sm:text-base lg:text-lg">
            We hope this gift brings a little piece of our culture into your
            home, reminding you of how much we value your trust and partnership.
            <br />
            Warm regards, <br />
            <i>Alma & Oscar </i>
            <br />
            MCJ’s Cleaning Service.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: "#004d40",
          color: "white",
          textAlign: "center",
          padding: "1rem",
        }}
        className="text-sm sm:text-base lg:text-lg"
      >
        <p>
          &copy; {new Date().getFullYear()} MCJ’s Cleaning Service. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
};

export default ChineloPage;
