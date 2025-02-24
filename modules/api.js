const url = 'https://wedev-api.sky.pro/api/v1/den-harrison/comments'
export const getComments = () => {
    return fetch(url)
        .then((response) => {
            return response.json()
        })
        .then((data) => data.comments)
}
export const postComment = (name, text) => {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify({ text, name }),
    })
}
