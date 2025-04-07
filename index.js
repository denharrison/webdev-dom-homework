import { renderApp } from './modules/renderApp.js'

export let user = null
export const setUser = (value) => {
    user = value
}

// Проверяем, был ли уже выполнен первый запуск
if (!localStorage.getItem('isInitialLoad')) {
    document.getElementById('loading-message').style.display = 'block'
    localStorage.setItem('isInitialLoad', 'true')
}
renderApp()
