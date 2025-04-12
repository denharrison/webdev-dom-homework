import { getComments } from './api.js'
import { updateComments } from './massifs.js'
import { renderForm } from './renderForm.js'
import { renderComments } from './renderFunctions.js'

export const renderApp = () => {
    const container = document.querySelector('.container')
    container.innerHTML = `
        <div id="loading-message" class="loading-message">Загрузка комментариев...</div>
        <ul class="comments"></ul> 
        <div class="form"></div>
    `

    // Переносим проверку первого запуска после создания элемента
    const loadingMessage = document.getElementById('loading-message')
    if (!localStorage.getItem('isInitialLoad')) {
        loadingMessage.style.display = 'block'
        localStorage.setItem('isInitialLoad', 'true')
    } else {
        loadingMessage.style.display = 'none' // Скрываем, если не первый запуск
    }

    getComments()
        .then((result) => {
            updateComments(result)
            renderComments()
            loadingMessage.style.display = 'none'
            renderForm()
        })
        .catch((error) => {
            loadingMessage.textContent =
                'Не удалось загрузить комментарии. Попробуйте позже.'
            console.error(error)
        })
}
