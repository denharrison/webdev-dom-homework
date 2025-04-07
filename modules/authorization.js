const authUrl = 'https://wedev-api.sky.pro/api/user'

export const register = (login, name, password) => {
    return fetch(authUrl, {
        method: 'POST',
        body: JSON.stringify({ login, name, password }),
    }).then((response) => {
        if (!response.ok) {
            if (response.status === 400) {
                return response.json().then((errorData) => {
                    throw new Error(
                        errorData.error || 'Такой пользователь уже существует',
                    )
                })
            }
            throw new Error('Ошибка сервера')
        }
        return response.json()
    })
}

export const loginUser = (login, password) => {
    return fetch(authUrl + '/login', {
        method: 'POST',
        body: JSON.stringify({ login, password }),
    }).then((response) => {
        if (!response.ok) {
            if (response.status === 400) {
                return response.json().then((errorData) => {
                    throw new Error(
                        errorData.error || 'Неправильный логин или пароль',
                    )
                })
            }
            throw new Error('Ошибка сервера')
        }
        return response.json()
    })
}
