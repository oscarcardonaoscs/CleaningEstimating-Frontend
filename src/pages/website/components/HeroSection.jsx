export default function HeroSection() {
    return (
      <div className="relative w-full h-screen">
        {/* Imagen de fondo */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://09e1b66bd0.clvaw-cdnwnd.com/daabb8365b794fcd4608fbbe82456997/200000026-8de768de7a/053A9648.jpeg?ph=09e1b66bd0')",
            WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 70%, rgba(0,0,0,0))",
            maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 70%, rgba(0,0,0,0))",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
  
        {/* Contenedor del texto */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <div className="border-2 border-white p-6 md:p-10 bg-black bg-opacity-50 ">
            <h1 className="text-4xl md:text-5xl font-bold">MCJ's Cleaning Service</h1>
            <p className="text-xl md:text-2xl mt-2">"Experience the Difference"</p>
          </div>
        </div>
      </div>
    );
  }
  