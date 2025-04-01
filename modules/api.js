const url = 'https://wedev-api.sky.pro/api/v1/den-harrison/comments'

export const getComments = () => {
    return fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Ошибка при загрузке комментариев')
            }
            return response.json()
        })
        .then((data) => data.comments)
}

export const postComment = (name, text) => {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify({ text, name }),
    }).then((response) => {
        if (!response.ok) {
            if (response.status === 400) {
                return response.json().then((errorData) => {
                    throw new Error(
                        errorData.error ||
                            'Валидация не пройдена: имя и комментарий должны быть длиннее 3 символов',
                    )
                })
            }
            throw new Error('Ошибка сервера')
        }
        return response.json()
    })
}
