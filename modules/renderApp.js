import { getComments } from './api.js'
import { updateComments } from './massifs.js'
import { renderForm } from './renderForm.js'
import { renderComments } from './renderFunctions.js'
import { user } from '../index.js'

export const renderApp = () => {
    const container = document.querySelector('.container')
    if (!container) return

    container.innerHTML = `
        ${
            user?.token
                ? `
            <div id="loading-message" class="loading-message">Загрузка комментариев...</div>
            <ul class="comments"></ul>
        `
                : ''
        }
        <div class="form"></div>
    `

    if (user?.token) {
        const loadingMessage = document.getElementById('loading-message')

        getComments()
            .then((result) => {
                updateComments(result)
                renderComments()
                if (loadingMessage) {
                    loadingMessage.style.display = 'none'
                }
            })
            .catch((error) => {
                if (loadingMessage) {
                    loadingMessage.textContent =
                        'Не удалось загрузить комментарии. Попробуйте позже.'
                }
                console.error('Ошибка загрузки комментариев:', error)
            })
    }

    renderForm()
}
