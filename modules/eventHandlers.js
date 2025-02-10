import { renderComments } from './renderFunctions.js'
import { escapeHtml } from './functionShielding.js'
import { comments } from './massifs.js'
import { getCurrentDateTime } from './dateFunctions.js'

// Обработчик события нажатия на лайк
function handleLikeClick(event) {
    const commentsList = document.querySelector('.comments')
    if (event.target.classList.contains('like-button')) {
        const commentElement = event.target.closest('.comment')
        const commentIndex = Array.from(commentsList.children).indexOf(
            commentElement,
        )
        const comment = comments[commentIndex]

        comment.likes.active = !comment.likes.active
        comment.likes.count += comment.likes.active ? 1 : -1

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
    const name = escapeHtml(nameInput.value.trim())
    const text = escapeHtml(commentInput.value.trim())

    if (name && text) {
        const newComment = {
            name: name,
            date: getCurrentDateTime(),
            text: text,
            likes: { count: 0, active: false },
        }

        comments.push(newComment)
        renderComments()

        nameInput.value = ''
        commentInput.value = ''
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
