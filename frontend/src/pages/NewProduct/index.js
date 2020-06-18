import React, { useState } from 'react';
import logo from '../../assets/logo.png';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';
import './style.css';

export default function NewProduct(){

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const history = useHistory();

    const storeId = localStorage.getItem('storeId');

    async function handleNewProduct(e) {
        e.preventDefault();
    
        const data = {
          title,
          description,
          value,
        };
    
        try {
          await api.post('product', data, {
            headers: {
              Authorization: storeId,
            }
          })
    
          history.push('/profile');
        } catch (err) {
          alert('Erro ao cadastrar produto, tente novamente!');
        }
      }
    

    return ( 
    <div className="new-product">
        <div className="content">
            <section>
                <img src= {logo} alt="Logo"></img>

                <h1>Cadastro novo produto</h1>
                <p>Descreva seu produto sustentável e continue colaborando para um mundo melhor!</p>
                <Link className="back-link" to="/">
                    <FiArrowLeft size={16} color="#006600" />
                    Voltar para o início
                </Link>
            </section>

        <form onSubmit={handleNewProduct}>
            <input placeholder="Nome do produto" value={title} onChange={e => setTitle(e.target.value)} />

            <textarea placeholder="Descriçao" value={description} onChange={e => setDescription(e.target.value)} />

            <input placeholder="Valor em R$" value={value} onChange={e => setValue(e.target.value)}/>
            
            <button className="button" type="submit">Cadastrar</button>

        </form>
        </div>
    </div>
  )
}