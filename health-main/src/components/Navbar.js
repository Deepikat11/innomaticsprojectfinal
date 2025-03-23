import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="font-bold">DoctorApp</h1>
      <div className="flex gap-4">
        {user?.role === 'patient' && (
          <>
            <Link to="/doctors">Doctors</Link>
            <Link to="/my-appointments">My Appointments</Link>
          </>
        )}
        {user?.role === 'doctor' && (
          <>
            <Link to="/manage-slots">Manage Slots</Link>
            <Link to="/doctor-appointments">Appointments</Link>
          </>
        )}
        {user?.role === 'admin' && (
          <>
            <Link to="/approve-doctors">Approve Doctors</Link>
            <Link to="/manage-users">Users</Link>
          </>
        )}
        {user ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <Link to="/patientlogin">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
