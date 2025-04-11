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

    getComments()
        .then((result) => {
            updateComments(result)
            renderComments()
            document.getElementById('loading-message').style.display = 'none'
            renderForm()
        })
        .catch((error) => {
            document.getElementById('loading-message').textContent =
                'Не удалось загрузить комментарии. Попробуйте позже.'
            console.error(error)
        })
}
