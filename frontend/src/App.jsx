import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import ContactForm from './components/ContactForm';
import Toast from './components/Toast';
import HomePage from './pages/HomePage';
import RutaPage from './pages/RutaPage';

const API_URL = '/api/services';
const whatsappLink = 'https://wa.me/573000000000';
const email = 'contacto@lexiuridicus.site';
const diagnosticOffer = 'Diagnóstico legal inicial (30 min) + hoja de ruta priorizada en 48h';

const fallbackServices = [
  {
    id: 'fallback-1',
    title: 'Tradición de Acciones',
    description: 'Asesoría integral para estructurar y formalizar la transferencia de acciones con seguridad jurídica y cumplimiento normativo.'
  },
  {
    id: 'fallback-2',
    title: 'Patrimonio de Familia',
    description: 'Protección legal del patrimonio familiar mediante figuras jurídicas adecuadas y acompañamiento en cada etapa del proceso.'
  },
  {
    id: 'fallback-3',
    title: 'Gobierno Corporativo',
    description: 'Diseño e implementación de prácticas de gobierno corporativo para fortalecer la transparencia, el control y la toma de decisiones.'
  },
  {
    id: 'fallback-4',
    title: 'Imagen Empresarial',
    description: 'Soporte legal estratégico para la construcción y protección de la imagen empresarial frente a clientes, aliados y mercado.'
  }
];

function App() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [toastMessage, setToastMessage] = useState(null);
  const navigate = useNavigate();

  const [leadForm, setLeadForm] = useState({
    perfil: 'Empresa',
    necesidad: 'Prevención legal',
    urgencia: 'Esta semana',
    ciudad: ''
  });

  useEffect(() => {
    const saved = sessionStorage.getItem('lexiuridicus_leadForm');
    if (saved) {
      try {
        setLeadForm(JSON.parse(saved));
      } catch (e) {
        // ignora el error
      }
    }

    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error('No fue posible cargar los servicios.');
        return res.json();
      })
      .then((data) => {
        setServices(data);
        setLoading(false);
      })
      .catch(() => {
        setServices(fallbackServices);
        setError('Mostramos nuestro catálogo base mientras restablecemos la conexión.');
        setLoading(false);
      });
  }, []);

  const updateLeadForm = (newData) => {
    setLeadForm((prev) => {
      const updated = { ...prev, ...newData };
      sessionStorage.setItem('lexiuridicus_leadForm', JSON.stringify(updated));
      return updated;
    });
  };

  const handleRouteSelect = (e, route) => {
    e.preventDefault();
    
    const isEmpresa = route.id === 'empresa';
    updateLeadForm({
      perfil: isEmpresa ? 'Empresa' : 'Familia',
      necesidad: isEmpresa ? 'Prevención legal' : 'Protección patrimonial'
    });

    setToastMessage(`Ruta ${route.title.replace('Ruta ', '')} aplicada. Deslizando al formulario...`);
    setTimeout(() => setToastMessage(null), 3000);

    if (window.gtag) {
      window.gtag('event', 'select_route', { route_name: route.title });
    }

    // Go to home and scroll to contact
    navigate('/', { replace: true });
    setTimeout(() => {
      const contactSection = document.getElementById('contacto');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen flex flex-col font-sans">
      <Header whatsappLink={whatsappLink} />
      
      <div className="flex-grow">
        <Routes>
          <Route 
            path="/" 
            element={
              <HomePage 
                diagnosticOffer={diagnosticOffer}
                onRouteSelect={handleRouteSelect}
                services={services}
                loading={loading}
                error={error}
              />
            } 
          />
          <Route 
            path="/rutas/:slug" 
            element={<RutaPage onRouteSelect={handleRouteSelect} />} 
          />
        </Routes>
      </div>

      <ContactForm 
        leadForm={leadForm}
        onLeadFormChange={updateLeadForm}
        diagnosticOffer={diagnosticOffer}
        whatsappLink={whatsappLink}
        email={email}
      />

      <Toast message={toastMessage} />
    </div>
  );
}

export default App;
