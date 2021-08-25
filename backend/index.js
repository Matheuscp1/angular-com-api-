const express = require('express')
const app = express()
const sequelize = require('./database/connection')
const UserModel = require('./model/User')
const cors = require('cors')
sequelize.authenticate().then(() => {
    console.log('Conexão estabelicida.')
}).catch((error) => {

    console.error('Erro na conexão:', error);
})


app.listen(8080, (erro) => {
    if (erro) {
        console.log(erro)
    } else {
        console.log("Servidor iniciado na porta 8080")
    }
})