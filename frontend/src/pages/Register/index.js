import React, { useState } from 'react';

import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './style.css';

import logo from '../../assets/logo.png';

export default function Register(){

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();

    async function handleRegister(e){

        e.preventDefault();

        const data = {
            name,
            email, 
            whatsapp,
            city,
            uf,
        };
        
        api.post('store', data)

        try {
            const response = await api.post('store', data);
            alert(`Seu ID de acesso: ${response.data.id}`);
            history.push('/');
        } catch (err) {
            alert('Error ao cadastrar, tente novamente');
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src= {logo} alt="Logo"></img>

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e colabore para um mundo mais sustentavel</p>
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#006600" />
                        Já tenho cadastro
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input placeholder="Nome da Loja" value={name} onChange={e => setName(e.target.value)}/>

                    <input type="email" placeholder="e-mail" value={email} onChange={e => setEmail(e.target.value)} />
                    
                    <input placeholder="whatsapp" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} />

                    <div className="input-group">
                        <input placeholder="cidade" value={city} onChange={e => setCity(e.target.value)} />

                        <input placeholder="UF" value={uf} onChange={e => setUf(e.target.value)} style={{ width: 80 }} />
                    </div>
                    
                    <button className="button" type="submit">Cadastrar</button>

                </form>
            </div>
        </div>
    );
}