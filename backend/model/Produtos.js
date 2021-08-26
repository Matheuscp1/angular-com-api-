const Sequelize = require('sequelize')
const connection = require('../database/connection')
const UserModel = require('../model/User')
const Produtos = connection.define('produtos', {
    desc: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    valor: {
        type: Sequelize.DOUBLE(10,2),
        allowNull: false,
    },
    obs: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    aprovado: {
        type: Sequelize.STRING,
        allowNull: true,
    },

    solicitante: {
        type: Sequelize.STRING,
        allowNull: true,
    },


    user_id: {
        type: Sequelize.INTEGER,
        references: {
            model: UserModel, 
            key: 'id'
        }
    }
})



Produtos.sync({ force: false }).then(() => {
    console.log('Tabela criada')
}).catch(erro => { console.log('Erro na criação da tabela: ', erro) })

module.exports = Produtos