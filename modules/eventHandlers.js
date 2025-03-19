import { renderComments } from './renderFunctions.js'
import { escapeHtml } from './functionShielding.js'
import { comments, updateComments } from './massifs.js'
import { getComments, postComment } from './api.js'

// Обработчик события нажатия на лайк
function handleLikeClick(event) {
    const commentsList = document.querySelector('.comments')
    if (event.target.classList.contains('like-button')) {
        const commentElement = event.target.closest('.comment')
        const commentIndex = Array.from(commentsList.children).indexOf(
            commentElement,
        )
        const comment = comments[commentIndex]

        comment.isLiked = !comment.isLiked
        comment.likes += comment.isLiked ? 1 : -1

        renderComments()
    }
}

// Обработчик события нажатия на комментарий для цитирования
function handleCommentClick(event) {
    const commentInput = document.querySelector('.add-form-text')
    const commentsList = document.querySelector('.comments')
    if (
        event.target.classList.contains('comment-text') ||
        event.target.classList.contains('comment-header') ||
        event.target.classList.contains('comment-body')
    ) {
        const commentElement = event.target.closest('.comment')
        const commentIndex = Array.from(commentsList.children).indexOf(
            commentElement,
        )
        const comment = comments[commentIndex]

        commentInput.value = `> ${escapeHtml(comment.name)}: ${escapeHtml(comment.text)}\\\\n`
        commentInput.focus()
    }
}

// Обработчик события нажатия на кнопку "Добавить"
function handleAddButtonClick() {
    const nameInput = document.querySelector('.add-form-name')
    const commentInput = document.querySelector('.add-form-text')
    const addButton = document.querySelector('.add-form-button')

    const name = escapeHtml(nameInput.value.trim())
    const text = escapeHtml(commentInput.value.trim())

    if (name && text) {
        // Отключаем кнопку и меняем её текст
        addButton.disabled = true
        addButton.textContent = 'Отправка...'

        postComment(name, text)
            .then(() => {
                return getComments()
            })
            .then((result) => {
                updateComments(result)
                renderComments()
                // Очищаем форму только в случае успешной отправки
                nameInput.value = ''
                commentInput.value = ''
            })
            .catch((error) => {
                console.error('Ошибка:', error)

                // Показываем пользователю сообщение об ошибке
                if (error.message === 'Failed to fetch') {
                    alert(
                        'Проблемы с интернетом. Проверьте подключение и попробуйте снова.',
                    )
                } else if (error.message === 'Неверный запрос') {
                    alert(
                        'Ошибка: Неверные данные. Проверьте введенные имя и комментарий.',
                    )
                } else {
                    alert(
                        'Произошла ошибка сервера. Пожалуйста, попробуйте позже.',
                    )
                }
            })
            .finally(() => {
                // Включаем кнопку обратно и возвращаем исходный текст
                addButton.disabled = false
                addButton.textContent = 'Написать'
            })
    } else {
        alert('Пожалуйста, заполните все поля.')
    }
}
// Добавляем обработчики событий
export function addEventHandlers() {
    const addButton = document.querySelector('.add-form-button')
    const commentsList = document.querySelector('.comments')
    commentsList.addEventListener('click', handleLikeClick)
    commentsList.addEventListener('click', handleCommentClick)
    addButton.addEventListener('click', handleAddButtonClick)
}
