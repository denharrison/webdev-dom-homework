import { user } from '../index.js'
import { addEventHandlers } from './eventHandlers.js'
import { renderLogin } from './renderLogin.js'

export const renderForm = () => {
    const container = document.querySelector('.form')
    container.innerHTML = ` ${
        user
            ? ` <div class="add-form">
<input
    type="text"
    class="add-form-name"
    placeholder="Введите ваше имя"
    value="${user.name}"
    readonly
/>
<textarea
    type="textarea"
    class="add-form-text"
    placeholder="Введите ваш комментарий"
    rows="4"
></textarea>
<div class="add-form-row">
    <button class="add-form-button">Написать</button>
</div>
</div> `
            : `<p> 
    <a id="auth-link" href="#">Авторизуйтесь</a>
    пожалуйста
</p>`
    }

    `
    if (user) {
        addEventHandlers()
    } else {
        const link = document.getElementById('auth-link')
        link.addEventListener('click', renderLogin)
    }
}
