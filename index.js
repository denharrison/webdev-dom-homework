import { renderComments } from './modules/renderFunctions.js'
import { updateComments } from './modules/massifs.js'
import { getComments } from './modules/api.js'
// Первоначальный рендер комментариев
getComments().then((result) => {
    updateComments(result)
    renderComments()
})
