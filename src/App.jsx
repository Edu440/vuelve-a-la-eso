import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import './App.css';
import { motion } from 'framer-motion';
import { EyeOff } from 'lucide-react';

const preguntas = [
  { pregunta: "¿Cómo se llama el proceso por el cual las plantas se alimentan?", opciones: ["Fotosíntesis", "Precipitación", "Digestión", "Absorción"], correcta: 0 },
  { pregunta: "¿En qué videojuego aparece el personaje Link?", opciones: ["Final Fantasy", "Zelda", "Genshin Impact", "Dark Souls"], correcta: 1 },
  { pregunta: "¿Qué color no está en un cubo de Rubik original?", opciones: ["Blanco", "Verde", "Rosa", "Naranja"], correcta: 2 },
  { pregunta: "¿Cuál es el país más grande del mundo?", opciones: ["China", "Rusia", "Canadá", "EE. UU."], correcta: 1 },
  { pregunta: "¿Qué día se celebra Halloween?", opciones: ["30 de octubre", "31 de octubre", "1 de noviembre", "15 de octubre"], correcta: 1 },
  { pregunta: "¿Qué órgano produce la insulina?", opciones: ["Hígado", "Riñon", "Páncreas", "Intestino"], correcta: 2 },
  { pregunta: "¿Qué animal es el más rápido?", opciones: ["Leopardo", "Guepardo", "Águila", "Antílope"], correcta: 1 },
  { pregunta: "¿Cuál es la capital de Ecuador?", opciones: ["Cuenca", "Guayaquil", "Quito", "Machala"], correcta: 2 },
  { pregunta: "¿Cuántos elementos hay en la Tabla Periódica?", opciones: ["120", "119", "118", "121"], correcta: 2 },
  { pregunta: "¿Cuál es el país con menos habitantes del mundo?", opciones: ["Mónaco", "Nauru", "Tuvalu", "La ciudad del Vaticano"], correcta: 3 },
  { pregunta: "¿En qué ciudad de España está la Giralda?", opciones: ["Sevilla", "Galicia", "Lugo", "Asturias"], correcta: 0 },
  { pregunta: "¿Cuál es el río más largo del mundo?", opciones: ["Nilo", "Amazonas", "Yangtsé", "Misisipi"], correcta: 1 },
  { pregunta: "¿Cuántos hijos tiene Kratos, el personaje principal de la serie de videojuegos God of War?", opciones: ["1", "2", "3", "4"], correcta: 1 },
  { pregunta: "¿Qué país inventó el sushi?", opciones: ["China", "Japón", "Corea", "Tailandia"], correcta: 0 },
  { pregunta: "¿Quién pintó el grito?", opciones: ["Ernst Ludwig Kirchner", "Edvard Munch", "Christian Wilhelm Allers", "George William Russell"], correcta: 1 },
];

function App() {
  const [indice, setIndice] = useState(0);
  const [seleccionada, setSeleccionada] = useState(null);
  const [confirmada, setConfirmada] = useState(false);
  const [respondidas, setRespondidas] = useState([]);
  const [mostrarOpciones, setMostrarOpciones] = useState(false);
  const [visibles, setVisibles] = useState([false, false, false, false]);
  const [participanteConectado, setParticipanteConectado] = useState(false);
  const [preguntaRevelada, setPreguntaRevelada] = useState(false);
  const [ojoPulsado, setOjoPulsado] = useState(false);
  const [comodinUsado, setComodinUsado] = useState(false);
  const [comodinLlamadaUsado, setComodinLlamadaUsado] = useState(false);
const [mostrarLlamada, setMostrarLlamada] = useState(false);
const [contador, setContador] = useState(60);
const [llamadaActiva, setLlamadaActiva] = useState(false);
const [comodinRerollUsado, setComodinRerollUsado] = useState(false);
const [preguntaResetKey, setPreguntaResetKey] = useState(0);
const [preguntasUsadas, setPreguntasUsadas] = useState(new Set());
const [animandoPregunta, setAnimandoPregunta] = useState(false);
const [mostrarRuleta, setMostrarRuleta] = useState(false);
const [girandoRuleta, setGirandoRuleta] = useState(false);
const [resultadoRuleta, setResultadoRuleta] = useState(null);
const [comodinRuletaUsado, setComodinRuletaUsado] = useState(false);
const seccionesRuleta = [1, 2, 0, 1, 2, 1, 0, 2, 1, 2, 3, 1, 2, 1, 0, 2];
const [anguloRuleta, setAnguloRuleta] = useState(0);
const [rotacionRuleta, setRotacionRuleta] = useState(0);
const [indiceGanador, setIndiceGanador] = useState(null);
const [ruletaGirada, setRuletaGirada] = useState(false);
const [cantidadManual, setCantidadManual] = useState(null);
const [mostrarRevivir, setMostrarRevivir] = useState(false);
const localVideo = useRef(null);
const remoteVideo = useRef(null);
const [musicaMuteada, setMusicaMuteada] = useState(false);
const [rerollRevivido, setRerollRevivido] = useState(false);

const [mostrarConfirmacion5050, setMostrarConfirmacion5050] = useState(false);
const [eliminandoRespuestas, setEliminandoRespuestas] = useState([]);

  const [preguntaActual, setPreguntaActual] = useState(preguntas[indice]);
  const letras = ['A', 'B', 'C', 'D'];

  useEffect(() => {
    setVisibles([false, false, false, false]);
    setConfirmada(false);
    setMostrarOpciones(false);
    setSeleccionada(null);

    if (indice === 0) {
      setPreguntaRevelada(ojoPulsado);
    } else {
      setPreguntaRevelada(true);
    }
  }, [indice]);

const [usuarioInteractivo, setUsuarioInteractivo] = useState(false);

const handleMostrarPregunta = () => {

  setMostrarPregunta(true);
};

const preguntaPersonalizadaReroll = {
  pregunta: "¿Cuál es el color que representa la esperanza?",
  opciones: ["Azul", "Amarillo", "Verde", "Blanco"],
  correcta: 2,
};

useEffect(() => {
  const iniciarWebcams = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });

      setTimeout(() => {
        const propia = document.getElementById('webcam-propia');
        const participante = document.getElementById('webcam-participante');
        if (propia) propia.srcObject = stream;
        if (participante) participante.srcObject = stream;
        setParticipanteConectado(true);
      }, 500);
    } catch (err) {
      console.error('Error al acceder a la webcam:', err);
    }
  };
  iniciarWebcams();
}, []);

const peerConnection = new RTCPeerConnection();

navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
  if (localVideo.current) {
    localVideo.current.srcObject = stream;
  }

  stream.getTracks().forEach(track => {
    peerConnection.addTrack(track, stream);
  });
});

peerConnection.ontrack = (event) => {
  remoteVideo.srcObject = event.streams[0];
};

const pc = useRef(null);
const ws = useRef(null);

useEffect(() => {
  ws.current = new WebSocket('ws://localhost:3001');
  ws.current.onmessage = async ({ data }) => {
    const msg = JSON.parse(data);
    if (msg.type === 'offer') {
      await pc.current.setRemoteDescription(msg);
      const ans = await pc.current.createAnswer();
      await pc.current.setLocalDescription(ans);
      ws.current.send(JSON.stringify(pc.current.localDescription));
    } else if (msg.type === 'candidate') {
      await pc.current.addIceCandidate(msg.candidate);
    }
  };

  pc.current = new RTCPeerConnection();

  pc.current.onicecandidate = ({ candidate }) => {
    if (candidate) ws.current.send(JSON.stringify({ type: 'candidate', candidate }));
  };

  pc.current.ontrack = (e) => {
    const participante = document.getElementById('webcam-participante');
    participante.srcObject = e.streams[0];
  };
}, []);

  useEffect(() => {
  if (llamadaActiva && contador > 0) {
    const timer = setTimeout(() => setContador((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }
}, [llamadaActiva, contador]);

useEffect(() => {
  if (musicRef.current) musicRef.current.volume = musicaMuteada ? 0 : 0.4;
  if (sonidoAcierto.current) sonidoAcierto.current.volume = 1;
  if (sonidoFallo.current) sonidoFallo.current.volume = 1;
}, [musicaMuteada]);

useEffect(() => {
  setPreguntaActual(preguntas[indice]);
  setVisibles([false, false, false, false]);
  setConfirmada(false);
  setSeleccionada(null);
  setMostrarOpciones(false);

if (indice === 0) {
    setPreguntaRevelada(ojoPulsado);
  } else {
    setPreguntaRevelada(true);
  }
}, [indice]);

  const fadeText = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const manejarConfirmar = () => {
  if (seleccionada !== null) {
    setConfirmada(true);
    setRespondidas((prev) => [...prev, indice]);

if (seleccionada === preguntaActual.correcta) {
  sonidoAcierto.current?.play();
  musicRef.current?.pause();
} else {
  sonidoFallo.current?.play();
  musicRef.current?.pause();
}

    if (seleccionada === preguntaActual.correcta) {
      confetti({ particleCount: 100, spread: 90, origin: { y: 0.6 } });

      if (indice === 7) {
        setMostrarRevivir(true);
      }
    }
  }
};

const musicRef = useRef(null);
const sonidoAcierto = useRef(null);
const sonidoFallo = useRef(null);

useEffect(() => {
  if (!usuarioInteractivo || !musicRef.current) return;

  musicRef.current.pause();
  musicRef.current.src = `/musica/musica${(indice % 5) + 1}.mp3`;
  musicRef.current.currentTime = 0;
  musicRef.current
    .play()
    .catch((err) => console.warn("Error al reproducir música:", err));
}, [indice, usuarioInteractivo]);

  const manejarSiguiente = () => {
    setIndice((prev) => Math.min(prev + 1, preguntas.length - 1));
  };
  const revelarRespuestas = () => {
    setMostrarOpciones(true);
    preguntaActual.opciones.forEach((_, i) => {
      setTimeout(() => {
        setVisibles((prev) => {
          const newVisibles = [...prev];
          newVisibles[i] = true;
          return newVisibles;
        });
      }, i * 2000);
    });
  };

const preguntasFaciles = [
  { pregunta: "¿Qué cicatriz común tenemos todos los seres humanos?", opciones: ["El ombligo", "El ano", "La raja del culo", "El brazo"], correcta: 0 },
];

const preguntasMedias = [
  { pregunta: "¿Cómo se denomina el resultado de la multiplicación?", opciones: ["Multiplicador", "Resultado", "Producto", "Factor"], correcta: 2 },
];

const preguntasDificiles = [
  { pregunta: "¿Qué significa FIFA?", opciones: ["Federación Internacional de Fútbol Asociación", "Fútbol Internacional de Federación Asociación", "Fútbol intermedio de Formación Asociada", "Fútbol I Formación Asociada"], correcta: 0 },
];

const obtenerPreguntaAleatoria = (nivel) => {
  const banco = nivel === 'facil' ? preguntasFaciles : nivel === 'media' ? preguntasMedias : preguntasDificiles;
  const disponibles = banco.filter((_, idx) => !preguntasUsadas.has(nivel + '-' + idx));
  if (disponibles.length === 0) return null;
  const index = Math.floor(Math.random() * disponibles.length);
  const clave = nivel + '-' + banco.indexOf(disponibles[index]);
  setPreguntasUsadas(prev => new Set(prev).add(clave));
  return disponibles[index];
};

const eliminarRespuestasPorRuleta = (cantidadRaw) => {
  const cantidad = Number(cantidadRaw);

  if (cantidad === 0) {
    return;
  }

  const incorrectas = [0, 1, 2, 3].filter(i => i !== preguntaActual.correcta);
  const aEliminar = incorrectas
    .sort(() => Math.random() - 0.5)
    .slice(0, cantidad);

  setEliminandoRespuestas(aEliminar);

  setTimeout(() => {
    const nuevosVisibles = [...visibles];
    aEliminar.forEach(i => nuevosVisibles[i] = false);
    setVisibles(nuevosVisibles);
    setEliminandoRespuestas([]);
  }, 2000);
};

const usarReroll = () => {
  if (comodinRerollUsado) return;

  setAnimandoPregunta(true);

  setTimeout(() => {
    if (rerollRevivido) {
      setPreguntaActual(preguntaPersonalizadaReroll);
      setRerollRevivido(false);
    } else {
      const nivel = indice < 5 ? 'facil' : indice < 10 ? 'media' : 'dificil';
      const nuevaPregunta = obtenerPreguntaAleatoria(nivel);
      if (nuevaPregunta) {
        setPreguntaActual(nuevaPregunta);
      }
    }

    setSeleccionada(null);
    setConfirmada(false);
    setMostrarOpciones(false);
    setVisibles([false, false, false, false]);
    setComodinRerollUsado(true);
    setAnimandoPregunta(false);
  }, 500);
};

const girarRuleta = () => {
  if (girandoRuleta) return;

  setGirandoRuleta(true);

  const totalSectores = seccionesRuleta.length;
  const anguloSector = 360 / totalSectores;

  const desplazamiento = anguloSector / 2;
  const vueltas = 5;

  const aleatorio = Math.floor(Math.random() * totalSectores);
  setIndiceGanador(aleatorio);

  const anguloFinal = 360 * vueltas + (aleatorio * anguloSector) + desplazamiento;
  setAnguloRuleta(anguloFinal);

  setTimeout(() => {
    setGirandoRuleta(false);
    setRuletaGirada(true);

    const cantidad = seccionesRuleta[aleatorio];
    if (cantidad === 0) return;

    if (preguntaActual && visibles) {
      const respuestasIncorrectas = preguntaActual.opciones
        .map((_, idx) => idx)
        .filter((i) => i !== preguntaActual.correcta && visibles[i]);

      const aEliminar = shuffleArray(respuestasIncorrectas).slice(0, cantidad);
      setEliminandoRespuestas(aEliminar);

      setTimeout(() => {
        const nuevasVisibles = [...visibles];
        aEliminar.forEach((i) => (nuevasVisibles[i] = false));
        setVisibles(nuevasVisibles);
        setEliminandoRespuestas([]);
        setComodinRuletaUsado(true);
      }, 2000);
    }
  }, 5000);
};

const aplicar5050 = () => {
    const incorrectas = [0, 1, 2, 3].filter(i => i !== preguntaActual.correcta);
    const aleatoria = incorrectas[Math.floor(Math.random() * incorrectas.length)];
    const visibles5050 = [false, false, false, false];
    visibles5050[preguntaActual.correcta] = true;
    visibles5050[aleatoria] = true;
    setVisibles(visibles5050);
  };

  const aplicar5050Animado = () => {
  const incorrectas = [0, 1, 2, 3].filter(i => i !== preguntaActual.correcta);
  const aleatoria = incorrectas[Math.floor(Math.random() * incorrectas.length)];

  const nuevasEliminadas = [0, 1, 2, 3].filter(i => i !== preguntaActual.correcta && i !== aleatoria);
  setEliminandoRespuestas(nuevasEliminadas);

  setTimeout(() => {
    const nuevosVisibles = [false, false, false, false];
    nuevosVisibles[preguntaActual.correcta] = true;
    nuevosVisibles[aleatoria] = true;
    setVisibles(nuevosVisibles);
    setEliminandoRespuestas([]);
  }, 2000);
};

  const getColorClase = (i) => {
    if (respondidas.includes(i)) return 'gray';
    if (i < 5) return 'green';
    if (i < 10) return 'orange';
    return 'red';
  };

  if (!usuarioInteractivo) {
  return (
    <div className="pantalla-inicial" style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: '#000',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999
    }}>
      <h1 style={{ marginBottom: '20px' }}>¡Vuelve a la ESO!</h1>
      <button
        onClick={() => setUsuarioInteractivo(true)}
        style={{
          padding: '15px 30px',
          fontSize: '1.2rem',
          borderRadius: '8px',
          backgroundColor: '#2196f3',
          color: 'white',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        Empezar juego
      </button>
    </div>
  );
}

  return (
    <div className="main-container">
      <div className="webcams">
        <video id="webcam-propia" autoPlay playsInline muted />
        {participanteConectado ? (
          <video ref={remoteVideo} id="webcam-participante" autoPlay playsInline muted />
        ) : (
          <div className="participante-placeholder">Esperando al participante...</div>
        )}
        <audio ref={musicRef} loop>
  <source src="/musica/musica1.mp3" type="audio/mpeg" />
  Tu navegador no soporta audio HTML5.
</audio>
<audio ref={sonidoAcierto} src="/acierto.mp3" />
<audio ref={sonidoFallo} src="/fallo.mp3" />

<button
  onClick={() => setMusicaMuteada(prev => !prev)}
  style={{
    position: 'fixed',
    bottom: '20px',
    left: '20px',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: 'black',
    color: 'white',
    fontSize: '24px',
    border: '2px solid white',
    cursor: 'pointer',
    zIndex: 9999
  }}
  title={musicaMuteada ? 'Activar música' : 'Silenciar música'}
>
  {musicaMuteada ? '🔇' : '🔊'}
</button>
      </div>

<motion.h1
  className="titulo-esquina"
  initial={{ scale: 1 }}
  animate={{ scale: [1, 1.05, 1] }}
  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
>
  ¡Vuelve a la ESO!
</motion.h1>

      <div className="circle-bar">
        {preguntas.map((_, i) => (
          <div key={i} className="circle-wrapper">
            {i === 7 && <div className={`halo-aureola ${indice === 7 ? 'grande' : ''}`} />}
            <div className={`circle ${getColorClase(i)} ${i === indice ? 'active' : ''}`}>
              {i + 1}
            </div>
          </div>
        ))}
      </div>

      {mostrarLlamada && (
  <div className="llamada-overlay">
    <div className="llamada-contenedor">
      <h2 className={`cuenta ${contador <= 10 ? 'parpadeo-rojo' : ''}`}>{contador}s</h2>
      {!llamadaActiva && (
        <button
          className="iniciar-llamada"
          onClick={() => {
            setLlamadaActiva(true);
            setComodinLlamadaUsado(true);
          }}
        >
          Iniciar
        </button>
      )}
      <button
        className="cerrar-llamada"
        onClick={() => {
          setMostrarLlamada(false);
          setContador(60);
          setLlamadaActiva(false);
        }}
      >
        ✖
      </button>
    </div>
  </div>
)}

<button
  className={`comodin-button ${comodinUsado ? 'usado' : ''}`}
  title="Comodín 50/50"
  onClick={() => {
    if (!comodinUsado) {
      aplicar5050Animado();
      setComodinUsado(true);
    }
  }}
  disabled={comodinUsado}
>
  50/50
</button>

<button
  className={`comodin-button ${comodinLlamadaUsado ? 'usado' : ''}`}
  style={{ right: '100px' }}
  title="Comodín Llamada"
  onClick={() => {
    if (!comodinLlamadaUsado) {
      setMostrarLlamada(true);
    }
  }}
  disabled={comodinLlamadaUsado}
>
  📞
</button>

<button
  className={`comodin-button ${comodinRerollUsado ? 'usado' : ''}`}
  style={{ right: '180px' }}
  onClick={usarReroll}
  disabled={comodinRerollUsado}
  title="Comodín: Cambiar pregunta"
>
  🎲
</button>

<button
  className={`comodin-button ${comodinRuletaUsado ? 'usado' : ''}`}
  style={{ right: '260px' }}
  title="Comodín Ruleta"
  onClick={() => {
    if (!comodinRuletaUsado) {
      setMostrarRuleta(true);
    }
  }}
  disabled={comodinRuletaUsado}
>
  🎡
</button>

{mostrarRuleta && (
  <div
    className="ruleta-overlay"
    style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0,0,0,0.4)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 999
    }}
  >
    <div style={{ position: 'relative', width: '450px', height: '450px' }}>
      {/* Flecha arriba */}
      <div
        style={{
          position: 'absolute',
          top: '-40px',
          left: '50%',
          transform: 'translateX(-50%) rotate(180deg)',
          fontSize: '35px',
          color: 'white'
        }}
      >
        ▲
      </div>

      {/* Ruleta SVG */}
      <svg
        className={`ruleta-svg ${girandoRuleta ? 'girando' : ''}`}
        viewBox="0 0 200 200"
        style={{
          width: '100%',
          height: '100%',
          transform: `rotate(${anguloRuleta}deg)`,
          transition: girandoRuleta ? 'transform 5s ease-out' : 'none'
        }}
      >
        <g transform="translate(100,100)">
          {seccionesRuleta.map((num, i) => {
            const total = seccionesRuleta.length;
            const angle = 360 / total;
            const startAngle = angle * i;
            const endAngle = startAngle + angle;

            const x1 = 100 * Math.cos((Math.PI / 180) * startAngle);
            const y1 = 100 * Math.sin((Math.PI / 180) * startAngle);
            const x2 = 100 * Math.cos((Math.PI / 180) * endAngle);
            const y2 = 100 * Math.sin((Math.PI / 180) * endAngle);

            const largeArcFlag = angle > 180 ? 1 : 0;

            const color =
              num === 0
                ? '#f44336'
                : num === 1
                ? '#4caf50'
                : num === 2
                ? '#ff9800'
                : '#ffd700';

            const textAngle = startAngle + angle / 2;
            const textX = 70 * Math.cos((Math.PI / 180) * textAngle);
            const textY = 70 * Math.sin((Math.PI / 180) * textAngle);

            return (
              <g key={i}>
                <path
                  d={`M0,0 L${x1},${y1} A100,100 0 ${largeArcFlag},1 ${x2},${y2} Z`}
                  fill={color}
                  stroke="#000"
                  strokeWidth="1"
                  className={i === indiceGanador ? 'ganador-parpadeo' : ''}
                />
                <text
  x={textX}
  y={textY}
  fontSize="16"
  textAnchor="middle"
  dominantBaseline="middle"
  fill="#000"
  transform={`rotate(${textAngle + 90}, ${textX}, ${textY})`}
>
  {num}
</text>
              </g>
            );
          })}
        </g>
      </svg>

      {/* Botón Girar / Cerrar */}
      {!ruletaGirada ? (
        <button
          onClick={girarRuleta}
          disabled={girandoRuleta}
          style={{
            position: 'absolute',
            bottom: '-60px',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '10px 30px',
            fontSize: '18px',
            borderRadius: '8px',
            backgroundColor: '#2196f3',
            color: 'white',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Girar
        </button>
      ) : (
        <button
          onClick={() => {
            setMostrarRuleta(false);
            setRuletaGirada(false);
          }}
          style={{
            position: 'absolute',
            bottom: '-60px',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '10px 30px',
            fontSize: '18px',
            borderRadius: '8px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Cerrar
        </button>
      )}
    </div>
  </div>
)}

{mostrarRevivir && (
  <div className="revivir-overlay">
    <div className="revivir-contenedor">
      <h3>Elige un comodín para revivir</h3>
      <div className="revivir-botones">
        {comodinUsado && (
          <button
            onClick={() => {
              setComodinUsado(false);
              setMostrarRevivir(false);
            }}
          >
            50/50
          </button>
        )}
        {comodinLlamadaUsado && (
          <button
            onClick={() => {
              setComodinLlamadaUsado(false);
              setMostrarRevivir(false);
            }}
          >
            📞
          </button>
        )}
        {comodinRerollUsado && (
  <button
    onClick={() => {
      setComodinRerollUsado(false);
      setRerollRevivido(true);
      setAnimandoPregunta(false);
      setMostrarRevivir(false);
    }}
  >
    🎲
  </button>
)}
        {comodinRuletaUsado && (
          <button
            onClick={() => {
              setComodinRuletaUsado(false);
              setMostrarRevivir(false);
            }}
          >
            🎡
          </button>
        )}
      </div>
    </div>
  </div>
)}

      <div className="question-wrapper">
        <div className={`question-container ${indice === 7 ? 'halo-wrapper' : ''}`}>
          {indice === 0 && !preguntaRevelada ? (
            <button
              className="reveal-button"
              onClick={() => {
                setPreguntaRevelada(true);
                setOjoPulsado(true);
              }}
            >
              <EyeOff size={30} />
            </button>
          ) : (
            preguntaRevelada && (
              <motion.span key={indice} initial="hidden" animate="visible" variants={fadeText}>
                {preguntaActual.pregunta}
              </motion.span>
            )
          )}
        </div>
      </div>

      <div className="options">
        {preguntaActual.opciones.map((opcion, i) => {
          let clase = 'option-button';
          if (eliminandoRespuestas.includes(i)) {
  clase += ' fade-out';
}
          if (confirmada) {
            if (i === preguntaActual.correcta) clase += ' correct';
            else if (i === seleccionada && i !== preguntaActual.correcta) clase += ' incorrect';
            else clase += ' disabled';
          } else if (seleccionada === i) {
            clase += ' selected';
          }

          return (
            <button
              key={i}
              className={clase}
              disabled={!visibles[i] || confirmada}
              onClick={() =>
  setSeleccionada((prev) => (prev === i ? null : i))
}
            >
  <motion.span
  initial="hidden"
  animate={visibles[i] ? 'visible' : 'hidden'}
  variants={fadeText}
  className={eliminandoRespuestas.includes(i) ? 'fade-out-text' : ''}
>
  {visibles[i] ? `${letras[i]}: ${opcion}` : ''}
</motion.span>
            </button>
          );
        })}
      </div>

      {!mostrarOpciones && (
        <button className="control-button confirmar" onClick={revelarRespuestas}>
          Mostrar respuestas
        </button>
      )}
      {mostrarOpciones && !confirmada && (
        <button className="control-button confirmar" onClick={manejarConfirmar} disabled={seleccionada === null}>
          Confirmar
        </button>
      )}
      {confirmada && indice < preguntas.length - 1 && (
        <button className="control-button siguiente" onClick={manejarSiguiente}>
          Siguiente
        </button>
      )}
      {confirmada && indice === preguntas.length - 1 && (
        <p style={{ marginTop: '30px', fontSize: '1.4rem' }}>¡Has llegado al final del juego!</p>
      )}
    </div>
  );
}
function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

export default App;
