import { user, setUser } from '../index.js'
import { addEventHandlers } from './eventHandlers.js'
import { renderLogin } from './renderLogin.js'

export const renderForm = () => {
    const container = document.querySelector('.form')
    container.innerHTML = `
        <div class="add-form">
            <input
                type="text"
                class="add-form-name"
                placeholder="Введите ваше имя"
                value="${user?.name || ''}"
                ${user?.token ? 'readonly' : ''}
            />
            <textarea
                class="add-form-text"
                placeholder="Введите ваш комментарий"
                rows="4"
            ></textarea>
            <div class="add-form-row">
                <button class="add-form-button">Написать</button>
                ${user?.token ? '<button class="logout-button">Выйти</button>' : ''}
            </div>
        </div>
        ${
            !user
                ? `
        <p class="auth-message">
            <a id="auth-link" href="#">Авторизуйтесь</a> пожалуйста
        </p>
        `
                : ''
        }
    `

    if (user?.token) {
        document
            .querySelector('.logout-button')
            .addEventListener('click', () => {
                setUser(null)
                renderForm()
            })
    } else if (!user) {
        document
            .getElementById('auth-link')
            ?.addEventListener('click', renderLogin)
    }

    addEventHandlers()
}
