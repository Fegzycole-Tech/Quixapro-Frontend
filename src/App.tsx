import { useRoutes } from 'react-router';
import { routes } from '@/routes';
import { Toaster } from '@/components/ui';

function App() {
  return (
    <>
      {useRoutes(routes)}
      <Toaster />
    </>
  );
}

export default App;
