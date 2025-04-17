import { user, setUser } from '../index.js'
import { addEventHandlers } from './eventHandlers.js'
import { renderLogin } from './renderLogin.js'
import { renderApp } from './renderApp.js'

export const renderForm = () => {
    const formContainer = document.querySelector('.form')
    if (!formContainer) return

    formContainer.innerHTML = `
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
            !user?.token
                ? `<p class="auth-message">
                      <a id="auth-link" href="#">Авторизуйтесь</a> пожалуйста
                   </p>`
                : ''
        }
    `

    // Обработчик выхода
    document.querySelector('.logout-button')?.addEventListener('click', () => {
        setUser(null)
        renderApp() // Полный перерендер приложения
    })

    // Обработчик ссылки авторизации
    document.getElementById('auth-link')?.addEventListener('click', (e) => {
        e.preventDefault()
        renderLogin()
    })

    addEventHandlers()
}
