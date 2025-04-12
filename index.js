import { renderApp } from './modules/renderApp.js'

export let user = JSON.parse(localStorage.getItem('user')) || null
export const setUser = (newUser) => {
    user = newUser
    if (newUser) {
        localStorage.setItem('user', JSON.stringify(newUser))
    } else {
        localStorage.removeItem('user')
    }
}

renderApp()
