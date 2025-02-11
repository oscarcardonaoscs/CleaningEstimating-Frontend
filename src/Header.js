import logo from "./Logo_MCJ_transparent.png";

function Header() {
  return (
    <header
      className="bg-[#00B5D9] p-4 text-white text-center flex items-center justify-between"
      style={{
        backgroundImage:
          "url('https://duyn491kcolsw.cloudfront.net/files/0k/0kn/0knbtk.jpg?ph=09e1b66bd0')",
        backgroundPosition: "center center",
        backgroundAttachment: "scroll",
        height: "80px",
      }}
    >
      <a
        href="https://www.mcjscleaningservice-hsv.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={logo}
          alt="MCJ's Cleaning Service Logo"
          className="w-24 h-24 object-contain"
        />
      </a>

      <h1 className="text-2xl font-semibold font-sans text-black">
        MCJ's Cleaning Service
      </h1>
    </header>
  );
}

export default Header;
