const loginForm = document.getElementById('login-form')
const errorBox = document.getElementById('login-error')
const successBox = document.getElementById('login-success')
const submitButton = document.getElementById('login-submit')

const showError = (message) => {
    successBox.classList.remove('show')
    errorBox.textContent = message
    errorBox.classList.add('show')
}

const showSuccess = (message) => {
    errorBox.classList.remove('show')
    successBox.textContent = message
    successBox.classList.add('show')
}

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault()

    const email = document.getElementById('input-email').value.trim()
    const senha = document.getElementById('input-pass').value

    if (!email || !senha) {
        showError('Preencha email e senha.')
        return
    }

    submitButton.disabled = true
    submitButton.textContent = 'Entrando...'

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha })
        })

        const data = await response.json()

        if (!response.ok) {
            showError(data.message || 'Email ou senha inválidos.')
            return
        }

        showSuccess(`Bem-vindo(a), ${data.usuario.nome}!`)
    } catch (error) {
        showError('Erro ao conectar com o servidor. Tente novamente.')
    } finally {
        submitButton.disabled = false
        submitButton.textContent = 'Logar'
    }
})
