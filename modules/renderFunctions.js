// Функция для рендера комментариев
import { comments } from './massifs.js'
import { commentsList } from '../index.js'
import { escapeHtml } from './functionShielding.js'

export function renderComments() {
    commentsList.innerHTML = '' // Очищаем список комментариев

    comments.forEach((comment) => {
        const commentHtml = `
    <li class="comment" data-likes='${JSON.stringify(comment.likes)}'>
     <div class="comment-header">
      <div>${escapeHtml(comment.name)}</div>
      <div>${comment.date}</div>
     </div>
     <div class="comment-body">
      <div class="comment-text">${escapeHtml(comment.text)}</div>
     </div>
     <div class="comment-footer">
      <div class="likes">
       <span class="likes-counter">${comment.likes.count}</span>
       <button class="like-button ${comment.likes.active ? '-active-like' : ''}">
       </button>
      </div>
     </div>
    </li>
   `
        commentsList.insertAdjacentHTML('beforeend', commentHtml)
    })
}
