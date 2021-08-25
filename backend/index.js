const express = require('express')
const app = express()



app.listen(8080, (erro) => {
    if (erro) {
        console.log(erro)
    } else {
        console.log("Servidor iniciado na porta 8080")
    }
})