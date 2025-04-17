import { setUser } from '../index.js'
import { loginUser } from './authorization.js'
import { renderApp } from './renderApp.js'

export const renderLogin = () => {
    const container = document.querySelector('.container')
    if (!container) return

    container.innerHTML = `
        <div class="login-container">
            <button class="back-button">← Назад</button>
            <form class="login-form">
                <h3>Авторизоваться</h3>
                <input id="login-input" type="text" placeholder="Логин" required />
                <input id="password-input" type="password" placeholder="Пароль" required>
                <button id="login-button" type="submit">Вход</button>
                <div id="login-error" class="error-message"></div>
            </form>
        </div>
    `

    const loginInput = document.getElementById('login-input')
    const passwordInput = document.getElementById('password-input')
    const loginButton = document.getElementById('login-button')
    const errorElement = document.getElementById('login-error')
    const backButton = document.querySelector('.back-button')

    // Обработчик отправки формы
    document
        .querySelector('.login-form')
        ?.addEventListener('submit', async (e) => {
            e.preventDefault()

            if (!loginInput.value.trim() || !passwordInput.value.trim()) {
                errorElement.textContent = 'Заполните все поля'
                return
            }

            loginButton.disabled = true
            errorElement.textContent = ''

            try {
                const data = await loginUser(
                    loginInput.value,
                    passwordInput.value,
                )
                setUser(data.user)
                renderApp()
            } catch (error) {
                errorElement.textContent = error.message || 'Ошибка авторизации'
                console.error('Ошибка входа:', error)
            } finally {
                loginButton.disabled = false
            }
        })

    // Обработчик кнопки "Назад"
    backButton?.addEventListener('click', () => {
        renderApp()
    })
}
