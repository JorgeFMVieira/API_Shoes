// import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { AuthDTO } from '../Models/Auth/AuthDTO';
// import { AuthService } from '../services/AuthService';
// import CheckRoutes from './Routes/CheckRoutes';

// function Signup() {

//     const Navigate = useNavigate();
//     const [username, setusername] = useState<string>("");
//     const [email, setEmail] = useState<string>("");
//     const [password, setPassword] = useState<string>("");
//     const service: AuthService = new AuthService();

//     const Criar = async () => {
        
//         const Register: AuthDTO = {
//             username: username,
//             email: email,
//             password: password
//         }
//         if(Register.username === "" || Register.email === "" || Register.password === ""){
//             toast.error("Preencha os campos em falta!");
//         }

//         var response = await service.Register(Register); 

//         if (response.Success === true) { 
//             console.log("adada");
//             toast.success("Registo efetuado com sucesso!");
//             Navigate("/Login");
//         }
//         else {
//           console.log(response);
//         }
        
//     }   

//     return (
//         <div>
//             <div>
//                 <CheckRoutes />
//             </div>
//             <div className="container-sm border p-5 shadow rounded-3 bg-light mt-5" style={{ maxWidth: '500px' }}>

//                 <h3 className="text-center">Criar Conta</h3>

//                 <div className="form-group pt-3">

//                     <input type="text" className="form-control sm" onChange={(e) => setusername(e.target.value)} placeholder="Nome de utilizador" />
//                 </div>

//                 <div className="form-group pt-3">

//                     <input type="email" className="form-control sm" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
//                 </div>

//                 <div className="form-group pt-3">

//                     <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
//                 </div>

//                 <div className='pt-4 text-right'>
//                     <button type="submit" className="btn btn-primary btn-block mx-auto float-end" onClick={Criar}>Criar Conta</button>
//                     <p className="forgot-password text-right">
//                         Esqueceu-se da <Link to="/ForgotPassword">password?</Link>
//                     </p>
//                     <p className="forgot-password text-right">
//                         já tem conta? <Link to="/Login">Inicie Sessão!</Link>
//                     </p>
//                 </div>

//             </div>
//         </div>
//     )
// }

// export default Signup
import React from 'react'

function Signup() {
  return (
    <div>Signup</div>
  )
}

export default Signup