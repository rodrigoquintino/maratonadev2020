// 'const' é uma variável constante
// {} são para criar objetos no JS
// Terminal: 'node server.js' roda o script
// Terminal: CTRL + C pára o servidor
// Terminal: iniciar o servidor: node server.js
// Servidor auto: npm install nodemon
// Instalar o POSTGRES em https://www.postgresql.org/
// POSTGRES é um gerenciador de BD
// Instalar o POSTBIRD (semelhante ao SQL) mas para projetos menores
// POSTBIRD: https://www.electronjs.org/apps/postbird
// Terminal: npm install pg para instalar o POSTGRES
// Se der erro em instalações, reiniciar o VS

//const cor = "branco"
//const tamanho = 2.5
//function verificarSeOCopoEstaSujo(sujo) {
//    return `o copo: ${sujo}`   
//}
//const copo = {
//    cor,
//    tamanho,
//    verificarSeOCopoEstaSujo
//}
//console.log(copo.verificarSeOCopoEstaSujo("está sujo"))

// A variável express recebe o pacote "express" instalado
// A variável server recebe a funçao "express()" do pacote "express" instalado
// configurar o servidor
const express = require("express")
const server = express()

// Terminal: npm install nunjucks
// Pacote que permite interagir com o HTML
// Configurando a template engine
// "./" é a raiz da pasta do projeto
// Terminal: npm install nunjucks permite
// instalar essa engine que permite comunicação com o HTML

// configurar o servidor para apresentar arquivos públicos
server.use(express.static('public'))

// habilitar body do formulário
// middleware: algo entre o servidor e o frontend
server.use(express.urlencoded({extended: true}))

// configurar a conexão com o BD
const Pool = require('pg').Pool
// new cria um novo objeto, como se fosse uma função, ao invés de usar {}
const db = new Pool ({
    user: 'postgres',
    password: '123',
    host:'localhost',
    port: 5432,
    database: 'doe',
})

const nunjucks = require("nunjucks")
nunjucks.configure("./", {
    express: server,
    noCache: true,  
})

// Arrray / vetor / coleção
//const estante = [
//    {marca: "coca-cola"},
//    "Diego",
//    "Cleiton"
//]

// Lista de doadores
// Arrray / vetor / coleção
//const donors = [
//    {
//        name: "Diego Fernandes",
//        blood: "AB+" 
//    },
//    {
//        name: "Cleiton Souza",
//        blood: "B+" 
//    },
//    {
//        name: "Robson Marques",
//        blood: "O+" 
//    },
//    {
//        name: "Mayk Brito",
//        blood: "A-" 
//    }
//]

// Repasse "/" e ação function
// Configurar apresentação da página
// npm start para iniciar o servidor
server.get("/", function(req, res){
    // return res.send("ok, cheguei aqui com nodemon.")
    // return res.render("index.html", {donors: "Qualquer valor"})
    //const donors = []
    
    db.query("SELECT * FROM donors", function(err, result) {
        if (err) return res.send("Erro de banco de dados.")
        
        // ";" é opcional ao final da linha do JS
        const donors = result.rows
        return res.render('index.html', {donors})
    })
})

server.post ("/", function(req, res) {
// guardar dados inseridos no formulário
 const name = req.body.name
 const email = req.body.email
 const blood = req.body.blood

    // Se name igual vazio 
    // OU email igual vazio 
    // OU sangue igual vazio
    if (name == "" || email == "" || blood == "") {
        return res.send("Todos os campos são obrigatórios.")
    }

    // colocar valor dentro da variável/array
    //donors.push({
    //  name: name, 
    //  blood: blood,
    //})

    // coloca valores dentro do BD
    const query = 
        `INSERT INTO donors ("name","email","blood") 
        VALUES ($1, $2, $3)`
    
    const values = [name, email, blood]

    db.query(query, values, function(err) {
        //fluxo de erro
        if (err) return res.send("Erro no banco de dados.")
        
        // fluxo ideal
        return res.redirect("/")        
    })    

})
// Criando/iniciando o servidor
// Atalho: npm start (no terminal) porque 
// configuramos assim no 'start' do package.json
// e 'nodemon server.js' no 'start' para monitorar/reinicializar
// automaticamente o servidor sempre que houver uma atualização nos arquivos
// CTRL + S reinicializa o servidor também, se aberto no terminal

// Ligar o servidor e permitir acesso à porta 3000
server.listen(3000, function(){
    console.log("iniciei o servidor.")
})