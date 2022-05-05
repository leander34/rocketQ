const express = require('express')
const route = require('./route')
const path = require('path')
const app = express()

//
app.set('view engine', 'ejs')

// falando para o express...codigo para usar css?????
app.use(express.static('public'))

// configurando ocaminho das views que estao sendo usadas
app.set('views', path.join(__dirname, 'views'))

//codigo para enviar o corpo da requisição (precisa disso para passar senhas por exemplo, já que elas nao vão na url)
//falando para usar isso dai
app.use(express.urlencoded({ extended: true }))

//codigo para usar as rotas de um modulo separado
app.use(route)

app.listen(3000, () => console.log('rodando'))
