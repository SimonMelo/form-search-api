const mysql = require("mysql")

const dbConfig = {
  host: "127.0.0.1",
  user: "Mysql",
  port: '3306',
  password: "C4$4M3l0",
  database: "formSearchImmobile",
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
