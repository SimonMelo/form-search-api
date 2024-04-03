const express = require("express")
const bodyParser = require("body-parser")
const cors = require('cors')

const app = express()
const port = 3000

let submittedFormData = []

app.use(cors())
app.use(bodyParser.json())

app.post('/api/submit-form', (req, res) => {
    const formData = req.body

    const mandatoryFields = ['contact.name', 'contact.email', 'contact.phone', 'preference.immobile', 'preference.location', 'preference.price']
    const missingFields = mandatoryFields.filter(field => !getFieldValue(formData, field))
    
    if (missingFields.length > 0) {
        return res.status(400).json({ error: `Os campos ${missingFields.join(', ')} são obrigatórios.` })
    }

    const formEntry = {
        contact: {
            name: formData.contact.name,
            email: formData.contact.email,
            phone: formData.contact.phone
        },
        preference: {
            immobile: formData.preference.immobile,
            location: formData.preference.location,
            price: formData.preference.price
        },
        extra: {
            metImmobile: formData.extra.metImmobile,
            time: formData.extra.time,
            addInfo: formData.extra.addInfo
          }
        
    }

    submittedFormData.push(formEntry)

    console.log('Dados recebidos:', formEntry)
    res.json({ message: 'Formulário enviado com sucesso' })
})

app.get('/api/get-form-data', (req, res) => {
    res.json(submittedFormData)
})

function getFieldValue(obj, fieldPath) {
    return fieldPath.split('.').reduce((acc, curr) => acc[curr], obj)
}

app.listen(port, () => {
    console.log(`Servidor está rodando em http://localhost:${port}`)
})
