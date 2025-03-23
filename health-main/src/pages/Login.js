// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const Login = () => {
//   const { login } = useAuth();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = (e) => {
//     e.preventDefault();
//     // Dummy data for now
//     const dummyUser = {
//       email,
//       role: email.includes('admin') ? 'admin' : email.includes('doctor') ? 'doctor' : 'patient',
//     };
//     login(dummyUser);
//     navigate('/');
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-xl mb-4">Login</h2>
//       <form onSubmit={handleLogin}>
//         <input 
//           type="email" 
//           placeholder="Email" 
//           className="border p-2 w-full mb-2" 
//           onChange={(e) => setEmail(e.target.value)} 
//         />
//         <input 
//           type="password" 
//           placeholder="Password" 
//           className="border p-2 w-full mb-2" 
//           onChange={(e) => setPassword(e.target.value)} 
//         />
//         <button className="bg-blue-500 text-white px-4 py-2">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;
