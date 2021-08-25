const express = require('express')
const app = express()
const sequelize = require('./database/connection')

const cors = require('cors')
const route = require('./router/router')
sequelize.authenticate().then(() => {
    console.log('Conexão estabelicida.')
}).catch((error) => {

    console.error('Erro na conexão:', error);
})
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(route)
app.listen(8080, (erro) => {
    if (erro) {
        console.log(erro)
    } else {
        console.log("Servidor iniciado na porta 8080")
    }
})