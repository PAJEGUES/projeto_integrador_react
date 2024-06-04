'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react';
import "./style1.css"


export default function Marketing(){

    const routerLogin = useRouter();

    const[UsuariosCadastrados, setUsuariosCadastrados] = useState([]);
    const[GuardasPatrulha, setGuardasPatrulha] = useState([]);
    
 

    // /api/get_nightguard

    function BuscaUsuarios(){
        axios.get("/api/get_administrators",{headers:"Content-Type:application/json"})
        .then(function(response){
          setUsuariosCadastrados(response.data.length);
        })
        .catch(function(error){
            console.error("erro")
        });
    }
 
    useEffect(()=>{
       BuscaUsuarios();
    }, []); 





    function BuscaGuardas(){
      axios.get("/api/get_nightguard",{headers:"Content-Type:application/json"})
      .then(function(response){
        setGuardasPatrulha(response.data.length);
      })
      .catch(function(error){
          console.error("erro")
      });
  }

  useEffect(()=>{
        BuscaUsuarios();
        BuscaGuardas();

  }, []); 


    return(
        <section className='hero'>
    <nav>
      <div className="logo">Safe<span>House.</span></div>
      
      <ul className="nav__list">
        <li className="nav__item"><a class="nav__link" href="#">Home</a></li>
        <li className="nav__item"><a class="nav__link" href="login.html">Login</a></li>
        <li className="nav__item"><a class="nav__link" href="#">Contato</a></li>
        <li className="nav__item"><a class="nav__link" href="#">Sobre nós</a></li>
        <a  href="#" className="btn btn-1">Pagina Inicial</a>
      </ul>
    </nav>

    <div className="content">
      <h1>Next Tecnologic</h1>
      <p>Somos uma empresa de soluções corporativas web conectando sua segurança. O mundo esta cada vez mais digital e nós temos as melhores soluções, ferramentas e estratégias. Venha para Next Tecnologic e não apenas conquiste seus clientes e sim proteja- os.  </p>

      <a  href="#" className="btn btn-2">Missão</a>
      <a  href="#" className="btn btn-2">Valores</a>
      
      
      <div className='txtCadastrados'>

      <h2>Temos {UsuariosCadastrados} usuários cadastrados e {GuardasPatrulha} guardas em patrulha</h2>

      </div>
      
      

     

      
    </div>
  </section>
    )
}