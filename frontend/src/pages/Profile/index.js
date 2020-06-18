import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './style.css';

import logo from '../../assets/logo.png';


export default function Profile() {
    const [product, setProduct] = useState([]);
  
    const history = useHistory();
  
    const storeId = localStorage.getItem('storeId');
    const storeName = localStorage.getItem('storeName');
  
    useEffect(() => {
      api.get('profile', {
        headers: {
          Authorization: storeId,
        }
      }).then(response => {
        setProduct(response.data);
      })
    }, [storeId]);

    async function handleDeleteProduct(id){
        try {
            await api.delete(`product/${id}`, {
                headers: {
                    Authorization: storeId,
                }
            });
            setProduct(product.filter(product => product.id !== id));
        } catch (error) {
            alert('Error ao deletar produto, tente novamente')
        }
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    return (

        <div className="profile-container">
            <header>
                <img src= {logo} alt="Logo"></img>
                <span>Bem vinda, {storeName}</span>

                <Link className="button" to="/product/new">Cadastrar novo produto</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#006600"/>
                </button>
            </header>

            <h1>Produtos cadastrados</h1>
            <ul>
               {product.map(product => (
                    <li key={product.id}>
                        <strong>Produto:</strong>
                        <p>{product.title}</p>

                        <strong>Descricao</strong>
                        <p>{product.description}</p>

                        <strong>Preço</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.value)}</p>

                    <button onClick={() => handleDeleteProduct(product.id)} type="button"> 
                        <FiTrash2 size={20} color="#41414d" />
                    </button>
                </li>
               ))}

            </ul>
        </div>
    );
}