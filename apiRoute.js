const express = require("express")
const bodyParser = require("body-parser")
const dbConnection = require("./db")

const app = express()
const port = 3000

app.use(bodyParser.json())

app.post('/api/submit-form', async (req, res) => {
    const formData = req.body

    const mandatoryFields = ['contact.name', 'contact.email', 'contact.phone', 'preference.immobile', 'preference.location', 'preference.price']
    const missingFields = mandatoryFields.filter(field => !getFieldValue(formData, field))
    
    
    if (missingFields.length > 0) {
        return res.status(400).json({ error: `Os campos ${missingFields.join(', ')} são obrigatórios.` })
    }

    const existContact = await checkExistingContact(formData.contact)
    if (existContact) {
        return res.status(400).json({ error: "Este contato já foi registrado." })
    }

    const values = mandatoryFields.map(field => getFieldValue(formData, field))

    const sqlQuery = `INSERT INTO formAnswer (Nome, Email, Telefone, Imovel, Localizacao, Preco) VALUES (?, ?, ?, ?, ?, ?)`

    dbConnection.query(sqlQuery, values, (err, result) => {
        if (err) {
            console.error("Erro ao inserir dados no banco de dados:", err)
            res.status(500).json({ error: 'Houve um problema interno. Tente novamente mais tarde.' })
        } else {
            console.log('Dados inseridos com sucesso no banco de dados')
            res.json({ message: 'Formulário enviado com sucesso' })
        }
    })
})

async function checkExistingContact(contact) {
    const sqlQuery = 'SELECT * FROM formAnswer WHERE Nome = ? AND Email = ? AND Telefone = ?'
    const values = [contact.name, contact.email, contact.phone]

    return new Promise((resolve, reject) => {
        dbConnection.query(sqlQuery, values, (err, results) => {
            if (err) {
                reject(err)
            } else {
                resolve(results.length ?? 0)
            }
        })
    }) 
}

function getFieldValue(obj, fieldPath) {
    return fieldPath.split('.').reduce((acc, curr) => acc[curr], obj)
}

app.listen(port, () => {
    console.log(`Servidor está rodando em http://localhost:${port}`)
})
