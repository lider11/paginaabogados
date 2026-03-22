import { useEffect, useMemo, useRef, useState } from 'react';
import { FUNNEL_EVENTS, trackFunnelEvent } from '../utils/analytics';

const steps = [
  {
    id: 'perfil',
    question: '¡Hola! 👋 ¿Para quién necesitas apoyo legal?',
    options: ['Empresa', 'Familia']
  },
  {
    id: 'necesidad',
    question: 'Perfecto. ¿Qué quieres resolver primero?',
    options: ['Prevención legal', 'Urgencia legal', 'Revisión contractual', 'Protección patrimonial']
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

export default function WhatsAppFunnelChatbot({ whatsappLink, leadForm, onLeadFormChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  const launcherRef = useRef(null);
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);

  const step = steps[stepIndex];
  const isCompleted = stepIndex >= steps.length;

  useEffect(() => {
    if (!isOpen) {
      launcherRef.current?.focus();
      return;
    }

    setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 0);
  }, [isOpen]);

  const whatsappMessage = useMemo(() => {
    if (!isCompleted) return '';

    return [
      'Hola, vengo del chatbot de Lexiuridicus y quiero una asesoría.',
      '',
      `Perfil: ${leadForm.perfil ?? 'Sin definir'}`,
      `Objetivo principal: ${leadForm.necesidad ?? 'Sin definir'}`,
      `Urgencia: ${leadForm.urgencia ?? 'Sin definir'}`,
      `Ciudad: ${leadForm.ciudad || 'No especificada'}`,
      '',
      '¿Podemos agendar el diagnóstico legal inicial?'
    ].join('\n');
  }, [isCompleted, leadForm]);

  const handleAnswer = (value) => {
    if (!step) return;

    trackFunnelEvent(FUNNEL_EVENTS.QUALIFY, {
      qualify_source: 'chatbot',
      qualify_field: step.id,
      qualify_value: value
    });

    onLeadFormChange({ [step.id]: value });
    setStepIndex((prev) => prev + 1);
  };

  const resetFunnel = () => {
    setStepIndex(0);
  };

  const handleDialogKeyDown = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      setIsOpen(false);
      return;
    }

    if (event.key !== 'Tab') return;

    const focusable = dialogRef.current?.querySelectorAll(
      'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );

    if (!focusable || focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
      return;
    }

    if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <>
      {isOpen && (
        <section
          id="wa-chatbot"
          ref={dialogRef}
          className="wa-chatbot"
          role="dialog"
          aria-modal="false"
          aria-live="polite"
          aria-label="Chat de orientación legal"
          onKeyDown={handleDialogKeyDown}
        >
          <header className="wa-chatbot__header">
            <div>
              <p className="wa-chatbot__title">Asistente de orientación</p>
              <p className="wa-chatbot__subtitle">Responde 3 preguntas y te llevamos a WhatsApp</p>
              <p className="wa-chatbot__sla">SLA: respondemos en menos de 30 min hábil.</p>
            </div>
            <button
              ref={closeButtonRef}
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
                <p className="wa-chatbot__question">¡Listo! Ya tenemos tu perfil y necesidad en un solo lead.</p>
                <a
                  href={buildWhatsappUrl(whatsappLink, whatsappMessage)}
                  className="wa-chatbot__cta"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => {
                    trackFunnelEvent(FUNNEL_EVENTS.WHATSAPP_CLICK, {
                      channel: 'whatsapp',
                      source: 'chatbot'
                    });
                    trackFunnelEvent(FUNNEL_EVENTS.SUBMIT_INTENT, {
                      channel: 'whatsapp',
                      source: 'chatbot',
                      perfil: leadForm.perfil || 'Sin definir',
                      urgencia: leadForm.urgencia || 'Sin definir'
                    });
                    trackFunnelEvent(FUNNEL_EVENTS.BOOKED, {
                      booking_source: 'chatbot_whatsapp_click'
                    });
                  }}
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
        ref={launcherRef}
        type="button"
        className="wa-chatbot__launcher"
        onClick={() => {
          setIsOpen((prev) => !prev);
          trackFunnelEvent(FUNNEL_EVENTS.START, {
            start_source: 'chatbot_launcher'
          });
        }}
        aria-expanded={isOpen}
        aria-controls="wa-chatbot"
      >
        {isOpen ? 'Cerrar chat' : 'Asesoría por WhatsApp'}
      </button>
    </>
  );
}
