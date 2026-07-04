const express = require('express')
const bcrypt = require('bcryptjs')
const pool = require('../config/db')

const router = express.Router()

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

router.post('/register', async (req, res) => {
    const { nome, email, senha, confirmarSenha } = req.body || {}

    if (!nome || !email || !senha || !confirmarSenha) {
        return res.status(400).json({ message: 'Preencha todos os campos.' })
    }

    if (!EMAIL_REGEX.test(email)) {
        return res.status(400).json({ message: 'Informe um email válido.' })
    }

    if (senha.length < 6) {
        return res.status(400).json({ message: 'A senha precisa ter pelo menos 6 caracteres.' })
    }

    if (senha !== confirmarSenha) {
        return res.status(400).json({ message: 'As senhas não coincidem.' })
    }

    try {
        const senhaHash = await bcrypt.hash(senha, 10)

        const [result] = await pool.query(
            'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
            [nome, email, senhaHash]
        )

        return res.status(201).json({
            message: 'Cadastro realizado com sucesso.',
            usuario: { id: result.insertId, nome, email }
        })
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ message: 'Este email já está cadastrado.' })
        }

        console.error('Erro ao cadastrar usuário:', error)
        return res.status(500).json({ message: 'Erro interno ao cadastrar. Tente novamente mais tarde.' })
    }
})

router.post('/login', async (req, res) => {
    const { email, senha } = req.body || {}

    if (!email || !senha) {
        return res.status(400).json({ message: 'Preencha email e senha.' })
    }

    try {
        const [rows] = await pool.query(
            'SELECT id, nome, email, senha FROM usuarios WHERE email = ? LIMIT 1',
            [email]
        )

        const usuario = rows[0]

        if (!usuario) {
            return res.status(401).json({ message: 'Email ou senha inválidos.' })
        }

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha)

        if (!senhaCorreta) {
            return res.status(401).json({ message: 'Email ou senha inválidos.' })
        }

        return res.json({
            message: 'Login realizado com sucesso.',
            usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email }
        })
    } catch (error) {
        console.error('Erro ao fazer login:', error)
        return res.status(500).json({ message: 'Erro interno ao fazer login. Tente novamente mais tarde.' })
    }
})

module.exports = router
