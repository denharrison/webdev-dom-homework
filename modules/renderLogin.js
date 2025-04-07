import { setUser } from '../index.js'
import { loginUser } from './authorization.js'
import { renderApp } from './renderApp.js'

export const renderLogin = () => {
    const container = document.querySelector('.container')
    container.innerHTML = ` <div>
    <form>
        <h3>Авторизоваться</h3>
        <input id="login-input" type="text" />
        <input id="password-input" type="password">
        <button id="login-button"> Вход </button>
    </form>
</div>
    `
    const loginInput = document.getElementById('login-input')
    const passwordInput = document.getElementById('password-input')
    const loginButton = document.getElementById('login-button')
    loginButton.addEventListener('click', (event) => {
        event.preventDefault()
        if (!loginInput.value.trim() || !passwordInput.value.trim()) {
            alert('Заполни ПОЛЕ ВСЁ')
            return
        }
        loginUser(loginInput.value, passwordInput.value).then((data) => {
            setUser(data.user)
            renderApp()
        })
    })
}
