'use strict'
export const nameInput = document.querySelector('.add-form-name')
export const commentInput = document.querySelector('.add-form-text')
export const addButton = document.querySelector('.add-form-button')
export const commentsList = document.querySelector('.comments')
import { renderComments } from './modules/renderFunctions.js'

// Первоначальный рендер комментариев
renderComments()
