const cadastroForm = document.getElementById('cadastro-form')
const errorBox = document.getElementById('cadastro-error')
const successBox = document.getElementById('cadastro-success')
const submitButton = document.getElementById('cadastro-submit')

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

cadastroForm.addEventListener('submit', async (event) => {
    event.preventDefault()

    const nome = document.getElementById('input-nome').value.trim()
    const email = document.getElementById('input-email').value.trim()
    const senha = document.getElementById('input-pass').value
    const confirmarSenha = document.getElementById('input-pass-confirm').value

    if (!nome || !email || !senha || !confirmarSenha) {
        showError('Preencha todos os campos.')
        return
    }

    if (senha.length < 6) {
        showError('A senha precisa ter pelo menos 6 caracteres.')
        return
    }

    if (senha !== confirmarSenha) {
        showError('As senhas não coincidem.')
        return
    }

    submitButton.disabled = true
    submitButton.textContent = 'Cadastrando...'

    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, email, senha, confirmarSenha })
        })

        const data = await response.json()

        if (!response.ok) {
            showError(data.message || 'Não foi possível concluir o cadastro.')
            return
        }

        showSuccess('Conta criada com sucesso! Redirecionando para o login...')
        cadastroForm.reset()
        setTimeout(() => {
            window.location.href = 'index.html'
        }, 1500)
    } catch (error) {
        showError('Erro ao conectar com o servidor. Tente novamente.')
    } finally {
        submitButton.disabled = false
        submitButton.textContent = 'Cadastrar'
    }
})
