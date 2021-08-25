const express = require('express')
const route = express.Router()
const UserModel = require('../models/User')
const bcrypt = require('bcryptjs')

route.get("/", function (req, res) {
    res.send('<h1> Bem vindo ao api :3 </h1>')
})

route.post('/user', (req, res) => {
    const { email, nick_name, name, password } = req.body
    let salt = bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(password, salt)
    UserModel.create({
        email, nick_name, name, password: hash
    }).then(() => {
        console.log('criado com sucesso')
        res.status(201).json(req.body)
    }).catch(e => {
        console.log(e.message)
        res.status(400).json({ error: e.errors.map(err => err.message) })
    })
})

module.exports = route