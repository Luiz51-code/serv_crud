// const express = require("express") // antigo
import express from "express" // atual

const app = express()
app.use(express.json())

let proximoId = 3

let LISTARALUNOS = [
    {
        id: 1,
        nome: "Vitor"
    },
    {
        id: 2,
        nome: "Felipe"
    },
]

// rota principal
app.get("/", (req, res) => {
    res.status(200).json({
        msg: "BOM DIA"
    })
})

// LISTAR ALUNO
app.get("/alunos", (req, res) => {
    res.status(200).json(LISTARALUNOS)
})

// BUSCAR ALUNO POR ID
app.get("/alunos/:id", (req, res) => {
    const idParametro = Number(req.params.id)
    const aluno = LISTARALUNOS.find(a => a.id === idParametro)

    if (!aluno) {
        return res.status(404).json({ msg: "Aluno nao Encontrado" })
    }

    res.status(200).json(aluno)
})

// ALTERAR ALUNO
app.put("/alunos/:id", (req, res) => {
    const idParametro = Number(req.params.id)
    const indiceAluno = LISTARALUNOS.findIndex(a => a.id === idParametro)
    const { nome } = req.body

    if (indiceAluno === -1) {
        return res.status(404).json({ msg: "Aluno nao Encontrado" })
    }

    if (!nome) {
        return res.status(400).json({ msg: "O Nome é obrigatório!" })
    }

    LISTARALUNOS[indiceAluno].nome = nome

    res.status(200).json({
        msg: "Alteração feita com sucesso!",
        aluno: LISTARALUNOS[indiceAluno]
    })
})

// DELETAR ALUNO
app.delete("/alunos/:id", (req, res) => {
    const idParametro = Number(req.params.id)
     if (!req.params.id || isNaN(idParametro)) {
        return res.status(400).json({ msg: "Digite um id válido para excluir!" })
    }
    //condição ? valor_verdadeiro:valor_falso
    const alunoIndex = LISTARALUNOS.findIndex(a => a.id === idParametro)

    if (alunoIndex === -1) {
        return res.status(404).json({ msg: "Aluno nao Encontrado" })
    }

    LISTARALUNOS.splice(alunoIndex, 1)

    res.status(200).json({ msg: "Aluno excluido com sucesso!" })
})

// ADICIONAR ALUNO
app.post("/alunos", (req, res) => {
    const { nome } = req.body

    if (!nome) {
        return res.status(400).json({ msg: "Por gentileza complete o nome!" })
    }

    const aluno = {
        id: proximoId,
        nome
    }

    LISTARALUNOS.push(aluno)
    proximoId++

    res.status(201).json({
        msg: "Aluno cadastrado com sucesso!",
        aluno
    })
})

app.listen(5000, () => {
    console.log("Server Rodando!")
})
