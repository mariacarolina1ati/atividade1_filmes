import express from "express";
import cors from "cors";
import mysql from "mysql2"

const app = express()
app.use(express.json())
app.use(cors())

const database = mysql.createPool({
    host: "benserverplex.ddns.net",
    user: "alunos",
    password: "senhaAlunos",
    database: "alunos_filmes_03MA"
})

app.get("/", (request,response) => {
    response.json({ message:"Backend funfano" })
})

app.post("/adicionar-filme", (request, response) => {
    const { titulo, genero,duracao,classificacao } = request.body

    const insertCommand = `INSERT INTO 
    filmes_MariaCarolina_Joao(titulo, genero,duracao,classificacao) 
    VALUES(?,?,?,?)`
    
    database.query(insertCommand,[titulo, genero,duracao,classificacao], (err) => {
        if (err) {
            console.log(err)
            response.json({ message: "Erro ao criar filme" })
            return
        }

        response.json({ message: "Filme criado com sucesso!" })
    })
})

app.put("/editar-filme/:id", (request, response) => {
    const id = request.params.id
    const { titulo, genero,duracao,classificacao } = request.body

    const editCommand = `
    UPDATE filmes_MariaCarolina_Joao
    SET
        titulo = ?,
        genero = ?,
        duracao = ?,
        classificacao = ?
    WHERE id = ?;
    `
    
    database.query(editCommand,[titulo, genero,duracao,classificacao, id], (err) => {
        if (err) {
            console.log(err)
            response.json({ message: "Erro ao editar filme" })
            return
        }

        response.json({ message: "Filme editado com sucesso!" })
    })
})

app.delete("/deletar-filme/:id", (request, response) => {
    const id = request.params.id //MUDAAAR DPSSSS

    const deleteCommand = `
    DELETE FROM filmes_MariaCarolina_Joao
    WHERE id = ?
    `
    
    database.query(deleteCommand,[id], (err) => {
        if (err) {
            console.log(err)
            return
        }

        response.json({ message: "Filme deletado com sucesso!" })
    })
})

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000")
})