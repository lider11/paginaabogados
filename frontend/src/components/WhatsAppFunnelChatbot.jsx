import { useMemo, useState } from 'react';

const steps = [
  {
    id: 'perfil',
    question: '¡Hola! 👋 ¿Para quién necesitas apoyo legal?',
    options: ['Empresa', 'Emprendedor/a', 'Familia']
  },
  {
    id: 'objetivo',
    question: 'Perfecto. ¿Qué quieres resolver primero?',
    options: ['Prevenir riesgos legales', 'Resolver un problema actual', 'Ordenar documentos y contratos']
  },
  {
    id: 'urgencia',
    question: '¿Qué tan urgente es para ti?',
    options: ['Hoy', 'Esta semana', 'Este mes']
  }
];

function buildWhatsappUrl(baseLink, message) {
  const hasQuery = baseLink.includes('?');
  const separator = hasQuery ? '&' : '?';
  return `${baseLink}${separator}text=${encodeURIComponent(message)}`;
}

export default function WhatsAppFunnelChatbot({ whatsappLink }) {
  const [isOpen, setIsOpen] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const step = steps[stepIndex];
  const isCompleted = stepIndex >= steps.length;

  const whatsappMessage = useMemo(() => {
    if (!isCompleted) return '';

    return [
      'Hola, vengo del chatbot de Lexiuridicus y quiero una asesoría.',
      '',
      `Perfil: ${answers.perfil ?? 'Sin definir'}`,
      `Objetivo principal: ${answers.objetivo ?? 'Sin definir'}`,
      `Urgencia: ${answers.urgencia ?? 'Sin definir'}`,
      '',
      '¿Podemos agendar el diagnóstico legal inicial?'
    ].join('\n');
  }, [answers, isCompleted]);

  const handleAnswer = (value) => {
    if (!step) return;

    setAnswers((prev) => ({ ...prev, [step.id]: value }));
    setStepIndex((prev) => prev + 1);
  };

  const resetFunnel = () => {
    setAnswers({});
    setStepIndex(0);
  };

  return (
    <>
      {isOpen && (
        <section id="wa-chatbot" className="wa-chatbot" aria-live="polite" aria-label="Chat de orientación legal">
          <header className="wa-chatbot__header">
            <div>
              <p className="wa-chatbot__title">Asistente de orientación</p>
              <p className="wa-chatbot__subtitle">Responde 3 preguntas y te llevamos a WhatsApp</p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="wa-chatbot__close"
              aria-label="Cerrar chat"
            >
              ×
            </button>
          </header>

          <div className="wa-chatbot__body">
            {!isCompleted ? (
              <>
                <p className="wa-chatbot__question">{step.question}</p>
                <div className="wa-chatbot__options">
                  {step.options.map((option) => (
                    <button
                      type="button"
                      key={option}
                      className="wa-chatbot__option"
                      onClick={() => handleAnswer(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                <p className="wa-chatbot__progress">Paso {stepIndex + 1} de {steps.length}</p>
              </>
            ) : (
              <div className="wa-chatbot__result">
                <p className="wa-chatbot__question">¡Listo! Ya tengo lo necesario para orientarte mejor.</p>
                <a
                  href={buildWhatsappUrl(whatsappLink, whatsappMessage)}
                  className="wa-chatbot__cta"
                  target="_blank"
                  rel="noreferrer"
                >
                  Continuar en WhatsApp
                </a>
                <button type="button" className="wa-chatbot__restart" onClick={resetFunnel}>
                  Volver a empezar
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      <button
        type="button"
        className="wa-chatbot__launcher"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls="wa-chatbot"
      >
        {isOpen ? 'Cerrar chat' : 'Asesoría por WhatsApp'}
      </button>
    </>
  );
}
