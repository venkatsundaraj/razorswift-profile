import { useRouter } from 'next/navigation';

function index() {
  const router = useRouter();
  router.push('/blogs/aspirants');
  return <div></div>;
}

export default index;
