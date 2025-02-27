export default function SatisfactionGuarantee() {
    return(
        <section className="relative w-full h-[500px] md:h-[600px] bg-cover bg-center flex items-center justify-center text-white text-center px-6"        
          style={{ backgroundImage: "url('/assets/kenny-eliason-kdwahpWYfQo-unsplash.jpg')" }}>
        
            {/* Overlay para mejorar la visibilidad del texto */}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

            {/* Contenido */}
            <div className="relative z-10 max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-bold">100% Guaranteed!</h2>
            <p className="text-lg md:text-xl mt-4">
                Your satisfaction is 100% guaranteed at MCJ's Cleaning Service. If you are not happy 
                with any area we’ve cleaned, simply call within 24 hours and we will come back out 
                and re-clean it free of charge.
            </p>
            </div>

            {/* Imagen opcional (Equipo de limpieza) 
            <div className="absolute bottom-[-50px] md:bottom-[-80px] left-1/2 transform -translate-x-1/2">
            <img src="URL_DE_TU_IMAGEN_DEL_EQUIPO" alt="Cleaning Team" className="w-64 md:w-80 rounded-lg shadow-lg" />
            </div>*/}
      </section>
    );
}