const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const dbConnection = require("./db")

const app = express()
const port = 3000

app.use(cors())
app.use(bodyParser.json())

app.post('/api/submit-form', (req, res) => {
    const formData = req.body

    const sqlQuery = `INSERT INTO formAnswer (Nome, Email, Telefone, Imovel, Localizacao, LocalizacaoOth, Preco, Conheceu, Horario, Opcional) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    const values = [
        formData.contact.name,
        formData.contact.email,
        formData.contact.phone,
        formData.preference.immobile,
        formData.preference.location,
        formData.preference.locationOther,
        formData.preference.price,
        formData.extra.metImmobile,
        formData.extra.time,
        formData.extra.addInfo,
      ]

    dbConnection.query(sqlQuery, values, (err, result) => {
        if (err) {
            console.error(`Erro ao inserir dados no banco de dados: ${err}`)
            res.status(500).json({ error: 'Erro ao salvar os dados do formulário no banco de dados' })
        } else {
            console.log('Dados inseridos com sucesso no banco de dados')
            res.json({ message: 'Formulário enviado e salvo no banco de dados com sucesso' })
        }
    } )
})

app.listen(port, () => {
    console.log(`Servidor está rodando em http://localhost:${port}`)
})