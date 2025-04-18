import { comments } from './massifs.js'
import { escapeHtml } from './functionShielding.js'
import { formatDate } from './functionShielding.js'

export function renderComments() {
    const commentsList = document.querySelector('.comments')
    commentsList.innerHTML = '' // Очищаем список комментариев

    comments.forEach((comment) => {
        const commentHtml = `
            <li class="comment" data-likes='${JSON.stringify(comment.likes)}'>
                <div class="comment-header">
                    <div>${escapeHtml(comment.author.name)}</div>
                   <div>${formatDate(comment.date)}</div>
                </div>
                <div class="comment-body">
                    <div class="comment-text">${escapeHtml(comment.text)}</div>
                </div>
                <div class="comment-footer">
                    <div class="likes">
                        <span class="likes-counter">${comment.likes}</span>
                        <button class="like-button ${comment.isLiked ? '-active-like' : ''}">
                        </button>
                    </div>
                </div>
            </li>
        `
        commentsList.insertAdjacentHTML('beforeend', commentHtml)
    })
}
