import React, { useEffect, useState } from 'react';
import io from 'socket.io-client'
import logo from '../assets/logo.svg'
import deslike from '../assets/deslike.svg'
import like from '../assets/like.svg'
import './main.css'
import api from '../services/api'
import { Link } from 'react-router-dom'
//match tem todos os parametros enviados para a rota
export default function ({ match }) {
    const [users, setUsers] = useState([])

    useEffect(() => {
        async function loadUsers() {
            const response = await api.get('/devs', {
                headers: {
                    user: match.params.id
                }
            })
            setUsers(response.data)
        }
        loadUsers()
    }, [match.params.id])

    useEffect(() => {
        const socket = io('http://localhost:3333', {
            query: { user: match.params.id }
        })
    }, [match.params.id])

    async function handleLike(id) {
        await api.post(`/devs/${id}/likes`, null, {
            headers: { user: match.params.id }
        })
        setUsers(users.filter(user => user._id !== id))
    }

    async function handleDesLike(id) {
        await api.post(`/devs/${id}/deslikes`, null, {
            headers: { user: match.params.id }
        })
        setUsers(users.filter(user => user._id !== id))
    }
    return (
        <div className="main-container">
            <Link to='/'>
                <img src={logo} alt="Tindev" />
            </Link>
            {users.length > 0 ? (
                <ul>

                    {users.map((user) =>
                        <li key={user._id}>
                            <img src={user.avatar} alt={user.name} />
                            <footer>
                                <strong>
                                    {user.name}
                                </strong>
                                <p>
                                    {user.bio}
                                </p>
                            </footer>
                            <div className="buttons">
                                <button type="button" onClick={() => handleDesLike(user._id)}>
                                    <img src={deslike} alt="deslike" />

                                </button>

                                <button type="button" onClick={() => handleLike(user._id)}>

                                    <img src={like} alt="like" />
                                </button>
                            </div>
                        </li>
                    )}

                </ul>
            ) : (<div className="empty"> Acabou :( </div>)}

        </div>
    )
}