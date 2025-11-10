import CallToAction from "../components/callToAction";
import ComoFunciona from "../components/comoFunciona";
import Depoimentos from "../components/depoimentos";
import Footer from "../components/footer";
import Header from "../components/header";
import Hero from "../components/hero";
import Impacto from "../components/impacto";


export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-white">
      {/* Cabeçalho */}
      <Header />

      {/* Seção principal */}
      <Hero />

      {/* Como Funciona */}
      <ComoFunciona />

      {/* Impacto */}
      <Impacto />

      {/* Depoimentos */}
      <Depoimentos />

      {/* Chamada para ação */}
      <CallToAction />

      {/* Rodapé */}
      <Footer />
    </main>
  );
}
