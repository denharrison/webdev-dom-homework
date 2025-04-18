import { renderComments } from './renderFunctions.js'
import { escapeHtml } from './functionShielding.js'
import { comments, updateComments } from './massifs.js'
import { getComments, postComment } from './api.js'
import { user, setUser } from '../index.js'
import { renderForm } from './renderForm.js'

// Обработчик события нажатия на лайк
function handleLikeClick(event) {
    if (!event.target.classList.contains('like-button')) return

    const commentsList = document.querySelector('.comments')
    const commentElement = event.target.closest('.comment')
    const commentIndex = Array.from(commentsList.children).indexOf(
        commentElement,
    )

    if (commentIndex === -1) return

    const updatedComments = [...comments]
    updatedComments[commentIndex] = {
        ...updatedComments[commentIndex],
        isLiked: !updatedComments[commentIndex].isLiked,
        likes:
            updatedComments[commentIndex].likes +
            (updatedComments[commentIndex].isLiked ? -1 : 1),
    }

    updateComments(updatedComments)
    renderComments()
}

// Обработчик события нажатия на комментарий для цитирования
function handleCommentClick(event) {
    const isCommentClick =
        event.target.classList.contains('comment-text') ||
        event.target.classList.contains('comment-header') ||
        event.target.classList.contains('comment-body')
    if (!isCommentClick) return

    const commentInput = document.querySelector('.add-form-text')
    const commentElement = event.target.closest('.comment')
    const commentIndex = Array.from(
        document.querySelector('.comments').children,
    ).indexOf(commentElement)

    if (commentIndex === -1) return

    const comment = comments[commentIndex]
    commentInput.value = `> ${escapeHtml(comment.name)}: ${escapeHtml(comment.text)}\n\n`
    commentInput.focus()
}

// Обработчик события нажатия на кнопку "Добавить"
async function handleAddButtonClick() {
    const nameInput = document.querySelector('.add-form-name')
    const commentInput = document.querySelector('.add-form-text')
    const addButton = document.querySelector('.add-form-button')

    const name = escapeHtml(nameInput.value.trim())
    const text = escapeHtml(commentInput.value.trim())

    if (!name || !text) {
        alert('Пожалуйста, заполните все поля.')
        return
    }

    try {
        // Блокируем кнопку на время отправки
        addButton.disabled = true
        addButton.textContent = 'Отправка...'

        // Для гостей сохраняем имя
        if (!user?.token) {
            setUser({ name })
        }

        // Отправляем комментарий
        await postComment(name, text, user?.token || null)

        // Обновляем список комментариев
        const freshComments = await getComments()
        updateComments(freshComments)
        renderComments()

        // Очищаем только поле комментария
        commentInput.value = ''
    } catch (error) {
        console.error('Ошибка:', error)
        handlePostError(error)
    } finally {
        // Восстанавливаем кнопку
        addButton.disabled = false
        addButton.textContent = 'Написать'
    }
}

// Обработка ошибок при отправке
function handlePostError(error) {
    if (error.message === 'Failed to fetch') {
        alert(
            'Проблемы с интернетом. Проверьте подключение и попробуйте снова.',
        )
    } else if (error.message.includes('Валидация не пройдена')) {
        alert(error.message)
    } else if (error.message === 'Ошибка сервера') {
        alert('Произошла ошибка сервера. Пожалуйста, попробуйте позже.')
    } else {
        alert('Не удалось отправить комментарий: ' + error.message)
    }
}

// Добавляем обработчики событий
export function addEventHandlers() {
    document.querySelector('.comments')?.addEventListener('click', (e) => {
        handleLikeClick(e)
        handleCommentClick(e)
    })

    document
        .querySelector('.add-form-button')
        ?.addEventListener('click', handleAddButtonClick)

    // Обработчик для кнопки выхода, если есть
    document.querySelector('.logout-button')?.addEventListener('click', () => {
        setUser(null)
        renderForm()
    })
}
