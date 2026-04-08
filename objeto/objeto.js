const pessoa = {
    nome: "Yune",
    sobrenome: "Máximo",
    idade: 16,
    time: "Santos",
    altura: "163cm",
    nomeCompleto: function () { return this.nome + " " + this.sobrenome},
    meuObjeto: function() {return this},//retorna o próprio objeto

};

console.log(pessoa.nomeCompleto() + " tem " +
    pessoa.idade + "anos e torce para o " + pessoa.time
);

const pessoasStringficada = JSON.stringify(pessoa)
console.log (pessoasStringficada)

const pessoaParseada = JSON.parse(pessoaStringificada);

console.log( pessoaParseada.nome + " " +  
pessoaParseada.sobrenome + " tem " +  pessoa.idade +  " anos e mede " + pessoa.altura);