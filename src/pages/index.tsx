import Link from 'next/link';
import Layout from '@/src/components/Layout';

const Home = () => {
  return (
    <Layout>
      <ul>
        <li>
          <Link href="/draw">Draw</Link>
        </li>
        <li>
          <Link href="/listing">Listing</Link>
        </li>
        <li>
          <Link href="/participate">Participate</Link>
        </li>
      </ul>
    </Layout>
  );
};

export default Home;
