import Head from 'next/head';
import Draw from '../components/Draw';
import RequireAuth from '../components/RequireAuth';

const DrawPage = () => (
  <>
    <Head>
      <title>Draw</title>
    </Head>

    <RequireAuth>
      <Draw />
    </RequireAuth>
  </>
);

export default DrawPage;
