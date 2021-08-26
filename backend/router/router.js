const express = require('express')
const route = express.Router()
const UserModel = require('../model/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
route.get("/", function (req, res) {
    res.send('<h1> Bem vindo ao api :3 </h1>')
})


route.get('/user/:email?', (req, res) => {
    email = req.params.email
    if (email) {
        UserModel.findOne({
            where: {
                email
            },
            raw: true
        }).then(user => {
           
            res.status(200).json(!!user)
        })
    } else {
        UserModel.findAll({
            raw: true, order: [
                ['id', 'desc']
            ]
        }
        ).then(users => {
            users.forEach(user => {
                delete user.password
            })
            res.status(200).json(users)
        }).catch(e => {
            console.log(e)
            res.status(400).json({ error: e.message })
        })
    }

})


route.post('/auth', (req, res) => {
    let { password, email } = req.body
    UserModel.findOne({
        where: {
            email
        },   
        raw: true 
    }, ).then(user => {
        if (!user) {
            res.status(404).json({ error: 'usuario não encontrado' })
        } else {
            let compare = bcrypt.compareSync(password, user.password)
            if (compare) {
                delete user.password
                jwt.sign({ id: user.id, email: user.email, name: user.name }, 'testeJWT', { expiresIn: '2h' }, (err, token) => {
                    if (err) {
                        res.status(401).json(err)
                    } else {
                      
                        res.set('Access-Control-Expose-Headers', '*')
                        res.set('x-access-token', token)
                        return res.status(200).json({user,token}); 
                        
                    }
                })
            } else {
                res.send('usuario não encontrado').status(404)
            }
        }
    }).catch(e => {
        console.log(e)
        res.status(400).json({ error: e.message })
    })
})


route.post('/user', (req, res) => {
    const { email, name, password } = req.body
    let salt = bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(password, salt)
    UserModel.create({
        email, name, password: hash
    }).then(() => {
        console.log('criado com sucesso')
        res.status(201).json(req.body)
    }).catch(e => {
        console.log(e)
        res.status(400).json({ error: e.message })
    })
})

module.exports = route