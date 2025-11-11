import CallToAction from "../components/CallToAction";
import ComoFunciona from "../components/ComoFunciona";
import Depoimentos from "../components/Depoimentos";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Impacto from "../components/Impacto";


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
