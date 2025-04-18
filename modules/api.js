const url = 'https://wedev-api.sky.pro/api/v2/den-tok/comments'

export const getComments = () => {
    return fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Ошибка при загрузке комментариев')
            }
            return response.json()
        })
        .then((data) => data.comments)
        .catch((error) => {
            alert(`Ошибка загрузки комментариев: ${error.message}`)
            throw error // Пробрасываем дальше, если нужно
        })
}

export const postComment = (name, text, token) => {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify({ text, name }),
        headers: {
            Authorization: 'Bearer ' + token,
        },
    })
        .then((response) => {
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
        .catch((error) => {
            alert(`Ошибка отправки комментария: ${error.message}`)
            throw error
        })
}
