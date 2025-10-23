import { Background, Header, HeroSection, ServicesSection } from '../../components/Home';
import { PageContainer } from '../../components/Layout';

function Home() {
  return (
    <div className="min-h-screen w-full relative">
      <Background />

      <PageContainer className="relative z-10">
        <Header />
        <HeroSection />
        <ServicesSection />
      </PageContainer>
    </div>
  );
}

export default Home;
