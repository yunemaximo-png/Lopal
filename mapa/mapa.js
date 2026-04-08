function mapa(){
        const frutas = new Map();
 
        frutas.set("maçã", 16.8)
        frutas.set("uva", 16.7)
        frutas.set("banana", 16.9)
        let Frutas = ["banana", "maçã", "uva"]
        let valor = frutas.get("banana");
        let valor1 = frutas.get("maçã");
        let valor2 = frutas.get("uva");
        console.log(Frutas)
        console.log(valor )
          console.log(valor1 )
            console.log(valor2 )

        //size é um a propriedade qe armazena o tamanho do mapa
        console.log(frutas.size);

        //o método has() retorna verdadeiramente o falso para uma determinada chave
        console.log(frutas.has('banana'));
        frutas.forEach((valor, chave) => console.log(`${chave} = R${valor},00`));

        //O método keys() retorna uma coleção com as chaves do mapa
        //A estrutura de repetição for of itera sobre os valores de uma coleção
        for(const x of frutas.keys()){
          console.log(x);
        }
        
        //vales() é um método que retorna uma coleção contendo todos valores de um mapa
        for(const x of frutas.values()){
          console.log(x);
        }
}
mapa();