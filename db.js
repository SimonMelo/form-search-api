const mysql = require("mysql")

const dbConfig = {
  host: "",
  user: "",
  port: '',
  password: "",
  database: "",
}

const connection = mysql.createConnection(dbConfig)

connection.connect((err) => {
  if (err) {
    console.error(`Erro ao conectar ao banco de dados: ${err}`);
  } else {
    console.log("Conexão bem-sucedida com o banco de dados MySQL")
  }
})

module.exports = connection
