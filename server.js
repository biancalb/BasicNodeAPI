// Importa o módulo do Express Framework
const express = require ('express')

// Inicializa um objeto de aplicação Express
const app = express ()

//processa body em formato json
app.use(express.json())

const lista_produtos = {
    produtos: [
        { id: 1, descricao: "Arroz parboilizado 5Kg", valor: 25.00, marca: "Tio João"  },
        { id: 2, descricao: "Maionese 250gr", valor: 7.20, marca: "Helmans"  },
        { id: 3, descricao: "Iogurte Natural 200ml", valor: 2.50, marca: "Itambé"  },
        { id: 4, descricao: "Batata Maior Palha 300gr", valor: 15.20, marca: "Chipps"  },
        { id: 5, descricao: "Nescau 400gr", valor: 8.00, marca: "Nestlé"  },
    ]
}

app.post ('/produtos', function (req, res) {
    const  produto  = req.body;
    lista_produtos.produtos.push(produto);

    return res.json(lista_produtos.produtos);
})

//GET lista
app.get ('/produtos', function (req, res) {
    return res.json(lista_produtos.produtos);
})

//GET
app.get ('/produtos/:id', function (req, res) {
    const { id } = req.params;
    const p = lista_produtos.produtos.find( x => x.id == id);
    if(p == null){
        res.status(404).send('Recurso não encontrado')
    } else {
        return res.json(p);
    }
})

app.put ('/produtos/:id', function (req, res) {
    const { id } = req.params;
    const produto = req.body;
    const i = lista_produtos.produtos.findIndex(x => x.id == id);
    if(i == -1){
        res.status(404).send('Recurso não encontrado')
    } else {
        lista_produtos.produtos[i] = produto;
        return res.json(lista_produtos.produtos);
    }
})

app.delete ('/produtos/:id', function (req, res) {
    const { id } = req.params;
    
    lista_produtos.produtos = lista_produtos.produtos.filter(x => x.id != id);
    return res.json(lista_produtos.produtos);
})

app.use(function(req, res, next){
    res.status(404).send('Recurso não encontrado')
})

// Inicializa o servidor HTTP na porta 3000
app.listen (3000, function () {
    console.log ('Servidor rodando na porta 3000')
})