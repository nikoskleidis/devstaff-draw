import Draw from '../components/Draw';
import RequireAuth from '../components/RequireAuth';

const DrawPage = () => (
  <RequireAuth>
    <Draw />
  </RequireAuth>
);

export default DrawPage;
