import React, { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../config/configAxios' 

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            api.defaults.headers.Authorization = `Bearer ${token}`
            
        }
    }, [])

    const login = async (email, password) => {
        const response = await fetch('http://localhost:3000/api/auth/login', { email, password })
        const { token, user } = await response.json()
        localStorage.setItem('token', token)
        api.defaults.headers.Authorization = `Bearer ${token}`
        setUser(user)
        navigate('/')
    }
    
    const register = async (form) => {
        const response = await fetch('http://localhost:3000/api/auth/register', form)
        const { token, user } = await response.json()
        localStorage.setItem('token', token)
        api.defaults.headers.Authorization = `Bearer ${token}`
        setUser(user)
        navigate('/')
    }

    const logout = () => {
        localStorage.removeItem('token')
        setUser(null)
        delete api.defaults.headers.Authorization
        navigate('/login') 
    }

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider