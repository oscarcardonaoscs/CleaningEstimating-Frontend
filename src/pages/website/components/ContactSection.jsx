import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export default function ContactSection() {
  const recaptchaRef = useRef();
  const [formSubmitted, setFormSubmitted] = useState(false); // Estado para manejar la visibilidad del formulario

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Obtener el token de reCAPTCHA
    const token = await recaptchaRef.current.executeAsync();
    if (!token) {
      alert("CAPTCHA validation failed. Please try again.");
      return;
    }

    // Obtener los datos del formulario
    const formData = {
      nombre: e.target.elements.nombre.value,
      correo: e.target.elements.correo.value,
      mensaje: e.target.elements.mensaje.value,
    };

    try {
      // Enviar los datos al backend
      const response = await fetch("http://localhost:8000/send_email_endpoint/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setFormSubmitted(true); // Ocultar el formulario y mostrar mensaje de éxito
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while sending the email. Please try again.");
    }
  };

  return (
    <section className="bg-[#E3F2F9] text-gray-800 py-16 px-6 text-center">
      <h2 className="text-3xl font-bold">Contact Us</h2>
      <div className="w-16 h-1 bg-red-500 mx-auto my-2"></div>
      <p className="text-description max-w-2xl mx-auto mt-4">
        Proudly serving Huntsville, Madison, Owens Cross Roads, Athens and more in Alabama.
      </p>
      <p className="text-description max-w-2xl mx-auto mt-4 px-6">
        We appreciate your interest in MCJ's Cleaning Service. Reach out to us through any of the following channels:
      </p>

      {/* Información de Contacto */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 mt-8">
        <div className="flex items-center gap-4">
          <img src="/assets/ring-phone.png" alt="Phone Icon" className="w-8 h-8" />
          <p className="text-lg font-semibold">551-227-0373</p>
        </div>
        <div className="flex items-center gap-4">
          <img src="/assets/email.png" alt="Email Icon" className="w-8 h-8" />
          <p className="text-lg font-semibold">mcjs.cleaning@gmail.com</p>
        </div>
      </div>

      {/* Mostrar mensaje de éxito si el formulario fue enviado */}
      {formSubmitted ? (
        <div className="max-w-lg mx-auto mt-8 bg-white p-6 shadow-lg rounded-lg text-green-700 text-xl font-semibold">
          Thank you! The form was submitted successfully.
        </div>
      ) : (
        // Formulario de Contacto
        <form className="max-w-lg mx-auto mt-8 bg-white p-6 shadow-lg rounded-lg" onSubmit={handleSubmit}>
          <div className="mb-4 text-left">
            <label className="text-description block font-semibold">Your Name</label>
            <input type="text" name="nombre" placeholder="Your Name" className="w-full p-3 border rounded" required />
          </div>

          <div className="mb-4 text-left">
            <label className="text-description block font-semibold">Email</label>
            <input type="email" name="correo" placeholder="Your Email" className="w-full p-3 border rounded" required />
          </div>

          <div className="mb-4 text-left">
            <label className="text-description block font-semibold">Phone number</label>
            <input type="tel" name="telefono" placeholder="Your Phone" className="w-full p-3 border rounded" required/>
          </div>

          <div className="mb-4 text-left">
            <label className="text-description block font-semibold">Message</label>
            <textarea placeholder="Your Message" name="mensaje" className="w-full p-3 border rounded h-28 " required></textarea>
          </div>

          {/* reCAPTCHA v3 (Invisible) */}
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey="6Lcds-EqAAAAAGiXv8o-fzqH34JbdGS5UMvTpoG9"
            size="invisible"
          />

          <button type="submit" className="w-full bg-emerald-900 text-white py-3 rounded-lg hover:bg-emerald-500 transition">
            Send
          </button>
        </form>
      )}
    </section>
  );
}
