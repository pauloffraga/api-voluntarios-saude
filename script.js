const API = "http://localhost:3000/profissionais";

const form = document.getElementById("formProfissional");
const lista = document.getElementById("listaProfissionais");

// CARREGAR PROFISSIONAIS
async function carregarProfissionais() {

    const resposta = await fetch(API);
    const profissionais = await resposta.json();

    lista.innerHTML = "";

    profissionais.forEach(p => {

        const item = document.createElement("li");

        item.innerHTML = `
        <strong>${p.nome}</strong> - ${p.profissao}<br>
        Email: ${p.email}<br>
        Telefone: ${p.telefone}<br>
        Mensagem: ${p.mensagem || "Sem mensagem"}
        `;

        lista.appendChild(item);
    });

}

// CADASTRAR PROFISSIONAL
form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const novoProfissional = {
        nome: document.getElementById("nome").value,
        email: document.getElementById("email").value,
        telefone: document.getElementById("telefone").value,
        profissao: document.getElementById("profissao").value,
        mensagem: document.getElementById("mensagem").value
    };

    await fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(novoProfissional)
    });

    form.reset();

    carregarProfissionais();

});

// carregar quando abrir a página
carregarProfissionais();