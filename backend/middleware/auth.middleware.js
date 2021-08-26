const jwt = require('jsonwebtoken')

module.exports = {
    auth:
        function auth(req, res, next) {
            const authToken = req.headers['x-access-token']
            if (authToken) {
                const token = authToken
                if (token) {
                    jwt.verify(token, 'testeJWT', (err, data) => {
                        if (err) {
                            res.status(401).json({ error: 'Token inválido' })
                            console.log(err)
                        } else {
                            req.loggedUser = {
                                email: data.email,
                                id: data.id
                            }
                            next()
                        }
                    })
                } else {
                    res.status(401).json({ error: "Token vazio" })
                    console.log('Token vazio')
                }

            } else {
                res.status(401).json({ error: 'Sem cabeçalho de token' })
                console.log('Sem cabeçalho de token')
            }
        }
}