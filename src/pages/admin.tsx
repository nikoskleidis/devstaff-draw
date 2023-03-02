import Admin from '../components/Admin';
import RequireAuth from '../components/RequireAuth';

const AdminPage = () => (
  <RequireAuth>
    <Admin />
  </RequireAuth>
);

export default AdminPage;
