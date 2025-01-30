import { commentsList } from './index.js'
import { renderComments } from './renderFunction.js'
import { escapeHtml } from './functionShielding.js'
import { commentInput } from './index.js'
import { comments } from './massifs.js'
import { addButton } from './index.js'
import { getCurrentDateTime } from './dateFunctions.js'
import { nameInput } from './index.js'

// Обработчик события нажатия на лайк
commentsList.addEventListener('click', (event) => {
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
})

// Обработчик события нажатия на комментарий для цитирования
commentsList.addEventListener('click', (event) => {
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

        commentInput.value = `> ${escapeHtml(comment.name)}: ${escapeHtml(
            comment.text,
        )}\\n`
        commentInput.focus()
    }
})

// Обработчик события нажатия на кнопку "Добавить"
addButton.addEventListener('click', () => {
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
})
