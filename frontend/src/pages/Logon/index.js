import React, { useState } from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link,useHistory } from 'react-router-dom';

import api from '../../services/api'
import './styles.css';

import logoImg from "../../assets/logo.svg"
import heroesImg from '../../assets/heroes.png';

function Logon(){
    const [id, setId] = useState('');
    const history = useHistory();
    
    //Funcão que faz a requisição de logon no backend
    async function handleLogin(e){
        e.preventDefault();

        try{
            const response = await api.post('sessions', { id });
            /*
             * Armazena os dados de logon localmente no browser
             * Esse dados não possui data de expiração e não são excluidos ao fechar o browser
            */
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            //Em caso de sucesso, envia o usuario para a tela principal 
            history.push('/profile')
        }catch(err){
            alert('Falha no login, tente novamente')
        }
    }
    return(
       <div className="logon-container">
           <section className="form">
                <img src={logoImg} alt="Be the hero" />
                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>
                    <input 
                        placeholder="Sua iD"
                        value={id}
                        onChange={e => setId(e.target.value)} />
                    <button type="submit" className="button">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

            <img src={heroesImg} alt="Heroes" />
       </div>
    );
}

export default Logon;