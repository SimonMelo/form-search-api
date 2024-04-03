const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/submit-form', (req, res) => {
    const formData = req.body;

    const mandatoryFields = ['contact.name', 'contact.email', 'contact.phone', 'preference.immobile', 'preference.location', 'preference.price'];
    const missingFields = mandatoryFields.filter(field => !getFieldValue(formData, field));
    
    if (missingFields.length > 0) {
        return res.status(400).json({ error: `Os campos ${missingFields.join(', ')} são obrigatórios.` });
    }

    console.log('Dados recebidos:', formData);
    res.json({ message: 'Formulário enviado com sucesso' });
});

function getFieldValue(obj, fieldPath) {
    return fieldPath.split('.').reduce((acc, curr) => acc[curr], obj);
}

app.listen(port, () => {
    console.log(`Servidor está rodando em http://localhost:${port}`);
});