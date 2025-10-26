import { Header } from '@/components/Header';
import {
  Background,
  HeroSection,
  ServicesSection,
} from '@/components/Home';
import { PageContainer } from '@/Layout/PageContainer';

function Home() {
  return (
    <div className="min-h-screen w-full relative">
      <Background />

      <PageContainer className="relative z-10">
        <Header
          className="bg-[#04040B]"
          brandClassName="font-bold text-2xl"
          links={[
            {
              to: '/login',
              label: 'Login',
              className: 'text-md hover:text-indigo-400 transition font-bold',
            },
          ]}
        />
        <HeroSection />
        <ServicesSection />
      </PageContainer>
    </div>
  );
}

export default Home;
