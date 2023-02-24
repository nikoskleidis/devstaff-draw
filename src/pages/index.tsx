import Link from 'next/link';

const Home = () => {
  return (
    <main>
      <h1>Home</h1>
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
    </main>
  );
};

export default Home;
