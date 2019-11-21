import React, { useState } from 'react';
import logo from '../assets/logo.svg'
import './login.css'
import api from '../services/api'

export default function Login({ history }) {
    const [username, setUsername] = useState('')

    async function handleSubmit(e) {
        e.preventDefault();

        const response = await api.post('/dev', {
            username
        })

        const { _id } = response.data

        //todo componente herda  history para redirecionar navegação
        history.push(`/main/${_id}`)
    }

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <img src={logo} alt="Tindev" />
                <input
                    placeholder='Digite seu Usuário'
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <button type="submit">Enviar</button>
            </form>
        </div>
    )
}