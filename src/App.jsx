import { useState, useEffect } from "react";
import JSConfetti from "js-confetti";
import mixpanel from "./lib/mixpanel";

export default function App() {
  const jsConfetti = new JSConfetti();

  // 0: portada / 1: titulo grande / 2: frases / 3: pregunta / 4: final
  const [step, setStep] = useState(0);

  // frases (5)
  const phrases = [
    "Hoy me dio por hacer algo simple… pero con cariño.",
    "Sonará un poco cursi pero mi vida simplemente sonríe cuando tú apareces 😄",
    "Solo quería sacarte una sonrisa aunque sea chiquita.",
    "No te asustes, solo creo que mi Maps se dañó porque todos mis caminos terminan buscándote 🫶",
    "En resumen: tú eres mi norte, aunque yo a veces ande un poco al sur."
  ];
  const [phraseIndex, setPhraseIndex] = useState(0);

  // lógica del NO que huye (igual estilo del repo)
  const noMessages = [
    "Di que sí pues 😅",
    "Piénsalo de nuevo 🤭",
    "Oe no seas mala 🙈",
    "Confía… es un detallito 🥹",
    "Ya pues… una vez 🫶",
    "No te me escapes 😆",
    "Dale, que está bonito 😌",
  ];

  const [randomNoText, setRandomNoText] = useState(noMessages[0]);
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });
  const [position, setPosition] = useState("relative");

  useEffect(() => {
    mixpanel.track("Pagina Cargada");
  }, []);

  const moveNoButton = () => {
    mixpanel.track("Boton No Hover");
    const randX = Math.random() * 70;
    const randY = Math.random() * 80;
    const index = Math.floor(Math.random() * noMessages.length);
    setRandomNoText(noMessages[index]);
    setPosition("absolute");
    setButtonPosition({ top: randY, left: randX });
    document.title = noMessages[index];
  };

  const goNextPhrase = () => {
    if (phraseIndex < phrases.length - 1) {
      setPhraseIndex((p) => p + 1);
    } else {
      setStep(3); // pasa a la pregunta final
    }
  };

  const onYes = () => {
    mixpanel.track("Boton Si Clickeado");
    setStep(4);
    jsConfetti.addConfetti({
      emojis: ["😍", "🥰", "❤️", "✨", "😘"],
      emojiSize: 70,
      confettiNumber: 200,
    });
    document.title = "Sabía que dirías que sí ❤️";
  };

  return (
    <main
      className="w-screen h-screen flex items-center justify-center bg-center bg-cover bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1400&q=60')",
      }}
    >
      {/* STEP 0: Portada */}
      {step === 0 && (
        <div className="p-6 text-center max-w-xl">
          <h1 className="text-3xl md:text-5xl font-bold">
            Hola Karla Janeth Catute Gómez De Floreano 🤣🤣🤣
          </h1>
          <p className="mt-4 text-lg md:text-xl opacity-90">
            Dale click y descubre 👇
          </p>

          <button
            onClick={() => {
              mixpanel.track("Click Portada");
              setStep(1);
            }}
            className="mt-6 px-6 py-3 rounded-md text-xl font-bold bg-white/90 hover:bg-white"
          >
            Dale click y descubre
          </button>
        </div>
      )}

      {/* STEP 1: Texto grande */}
      {step === 1 && (
        <div className="p-6 text-center max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold">
            Pensé en ti y quise hacer algo bonito, yo no soy bonito pero me haces sentir cosas bonitas.
          </h1>

          <button
            onClick={() => {
              mixpanel.track("Click Titulo Grande");
              setStep(2);
              setPhraseIndex(0);
            }}
            className="mt-8 px-6 py-3 rounded-md text-xl font-bold bg-white/90 hover:bg-white"
          >
            Siguiente
          </button>
        </div>
      )}

      {/* STEP 2: 5 Frases */}
      {step === 2 && (
        <div className="p-6 text-center max-w-2xl">
          <h2 className="text-2xl md:text-4xl font-bold">
            {phrases[phraseIndex]}
          </h2>

          <button
            onClick={() => {
              mixpanel.track("Click Frase Siguiente");
              goNextPhrase();
            }}
            className="mt-8 px-6 py-3 rounded-md text-xl font-bold bg-white/90 hover:bg-white"
          >
            {phraseIndex < phrases.length - 1 ? "Siguiente" : "Ir a la pregunta 😏"}
          </button>
        </div>
      )}

      {/* STEP 3: Pregunta final + SI/NO */}
      {step === 3 && (
        <div className="p-6 text-center w-full">
          <h1 className="font-bold text-4xl md:text-6xl text-center">
            ¿y si este 14 nos convertimos en "esa cosa rara pero linda" sin ponerle etiqueta?
            <br />
            Tú decides cómo llamarlo: ¿"mi crush favorito", "pareja en modo beta" o "tú y yo contra el mundo"? 😉
            <br />
            ¿Qué dices?
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-5 items-center justify-center max-w-xl mx-auto">
            <button
              onClick={onYes}
              className="bg-green-500 text-white font-bold p-3 rounded-md text-xl"
            >
              Sí
            </button>

            <button
              className="bg-red-500 text-white min-w-48 font-bold p-3 rounded-md text-xl"
              onMouseOver={moveNoButton}
              onClick={moveNoButton}
              style={{
                position,
                top: `${buttonPosition.top}%`,
                left: `${buttonPosition.left}%`,
              }}
            >
              {randomNoText}
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Final */}
      {step === 4 && (
        <div className="p-6 text-center max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold">
            Sabía que dirías que sí ❤️
          </h1>
          <p className="mt-4 text-lg md:text-xl opacity-90">
            Te mereces cosas bonitas, así de simple.
          </p>
        </div>
      )}
    </main>
  );
}
