const express = require('express')
const route = express.Router()
const UserModel = require('../model/User')
const ProdutosModel = require('../model/Produtos')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authMiddleware = require('../middleware/auth.middleware')
route.get("/", function (req, res) {
    res.send('<h1> Bem vindo ao api :3 </h1>')
})


route.get('/user/:email?', (req, res) => {
   let email = req.params.email
    if (email) {
        UserModel.findOne({
            where: {
                email
            },
            raw: true
        }).then(user => {
           
            res.status(200).json(!!user)
        }).catch((e) =>{
            
        })
    } else {
            res.status(404).json({ error: "Email não existe"})
    }

})

route.get('/produtos/:id?', authMiddleware.auth, (req, res) => {
    let user_id = req.loggedUser.id
    let id = req.params.id
    console.log(id)
    if (id) {
        ProdutosModel.findOne({
            where: {
                id
            },
            raw: true
        }).then(produto => {
           
            res.status(200).json(produto)
        }).catch((e) =>{
            
        })
    }else{
        ProdutosModel.findAll({
            where: {
                user_id
            },
            raw: true
        }).then(produtos => {
            console.log(produtos)
            res.status(200).json(produtos)
        }).catch(e => {
            console.log(e)
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

route.post('/produtos', authMiddleware.auth, (req, res) => {
 let {valor,desc,solicitante} = req.body.novoProduto
 let user_id = req.loggedUser.id

 valor = valor.substring(3).replaceAll(".", "").replace(",",'.')
  ProdutosModel.create({
    valor, desc, solicitante, user_id
    }).then(() => {
        console.log('criado com sucesso')
        res.status(201).json(req.body)
    }).catch(e => {
        console.log(e)
        res.status(400).json({ error: e.message })
    })
})

route.put('/produtos/:id', authMiddleware.auth, (req, res) => {
    id = req.params.id
    if (id) {
        if (isNaN(id)) {
            res.status(400).send('Isso não é um numero' + id)
        } else {
            id = parseInt(id)
            ProdutosModel.update(
                req.body,
                { where: { id }},
            ).then(() => {
                res.json('Produto atualizado').status(200)
            }).catch(e => {
                console.log(e)
                res.status(400).json({ error: e.message })
            })
        }
    } else {
        res.status(400).json({ error: 'Id é obrigatorio' })
    }
})
module.exports = route
