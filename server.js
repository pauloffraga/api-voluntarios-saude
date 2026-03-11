const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let profissionais = [
{
    nome: "Helryapewrya Fraga",
    email: "helryapewrya@email.com",
    telefone: "81999999999",
    profissao: "Médico",
    mensagem: "Estou aqui para participar de ações sociais"
  }
];

app.get('/profissionais', (req, res) => {
  res.json(profissionais);
  });
  
function validarDados(dados) {

    if (!dados.nome || dados.nome.length < 3) {
        return "O nome deve conter pelo menos 3 caracteres.";
    }

    const emailValido = /\S+@\S+\.\S+/;
    if (!emailValido.test(dados.email)) {
      return "Email inválido";
    }
  
    const telefoneValido = /^\d{10,11}$/;
    if (!telefoneValido.test(dados.telefone)) {
      return "Telefone deve ter 10 ou 11 números";
    }
  
    if (dados.mensagem && dados.mensagem.length > 500) {
      return "Mensagem deve ter no máximo 500 caracteres";
    }
  
    return null;
  }

  app.post("/profissionais", (req, res) => {

    const erro = validarDados(req.body);
  
    if (erro) {
      return res.status(400).json({ erro });
    }
  
    const novoProfissional = {
        id: profissionais.length + 1,
      nome: req.body.nome,
      email: req.body.email,
      telefone: req.body.telefone,
      profissao: req.body.profissao,
      mensagem: req.body.mensagem
    };
  
    profissionais.push(novoProfissional);
  
    res.status(201).json({
      mensagem: "Profissional cadastrado com sucesso",
      dados: novoProfissional
    });
  
  });

  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });