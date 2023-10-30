import dynamic from 'next/dynamic';

const DynamicEncryptComponent = dynamic(
  () => import('@/reUsableComponents/EncryptComponent'),
  {
    ssr: false, // Set to false to skip SSR
  }
);

function HomePage() {
  return (
    <div>
      <h1>Encryption Example</h1>

      <DynamicEncryptComponent />
    </div>
  );
}

export default HomePage;
