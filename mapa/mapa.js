function mapa(){
        const frutas = new Map();
 
        frutas.set("maçã", 1.68)
        frutas.set("uva", 1.67)
        frutas.set("banana", 1.69)
        let Frutas = ["banana", "maçã", "uva"]
        let valor = frutas.get("banana");
        let valor1 = frutas.get("maçã");
        let valor2 = frutas.get("uva");
        console.log(Frutas)
        console.log(valor )
          console.log(valor1 )
            console.log(valor2 )
 
}
mapa();