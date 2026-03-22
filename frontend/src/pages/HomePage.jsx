import { Helmet } from 'react-helmet-async';
import Hero from '../components/Hero';
import RoutesSection from '../components/RoutesSection';
import ServicesSection from '../components/ServicesSection';
import Methodology from '../components/Methodology';
import SocialProof from '../components/SocialProof';
import TrustEvidence from '../components/TrustEvidence';

export default function HomePage({ diagnosticOffer, onRouteSelect, services, loading, error }) {
  return (
    <>
      <Helmet>
        <title>Lexiuridicus - Firma Legal Estratégica</title>
        <meta name="description" content="Decisiones jurídicas claras para empresas y familias. Diagnóstico legal inicial y planes accionables con enfoque preventivo." />
        <link rel="canonical" href="https://lexiuridicus.site/" />
        <meta property="og:title" content="Lexiuridicus - Firma Legal Estratégica" />
        <meta property="og:description" content="Diagnóstico legal inicial y hoja de ruta priorizada para empresas y familias." />
        <meta property="og:url" content="https://lexiuridicus.site/" />
      </Helmet>
      
      <Hero diagnosticOffer={diagnosticOffer} />
      <RoutesSection onRouteSelect={onRouteSelect} />
      <ServicesSection services={services} loading={loading} error={error} />
      <Methodology />
      <SocialProof />
      <TrustEvidence />
    </>
  );
}
