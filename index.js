import { renderComments } from './modules/renderFunctions.js'
import { updateComments } from './modules/massifs.js'
import { getComments } from './modules/api.js'

// Проверяем, был ли уже выполнен первый запуск
if (!localStorage.getItem('isInitialLoad')) {
    document.getElementById('loading-message').style.display = 'block'
    localStorage.setItem('isInitialLoad', 'true')
}

// Первоначальный рендер комментариев
getComments().then((result) => {
    updateComments(result)
    renderComments()
    document.getElementById('loading-message').style.display = 'none'
})
