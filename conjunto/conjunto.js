function conjunto(){
        const letras = new Set();
        letras.add("Y");
        letras.add("U");
        letras.add("N");
        letras.add("E");
        letras.add("M");
        console.log(letras.has("A"))

        //delete() é método para remover um elemento do conjunto
        letras.delete("N");
        console.log(letras);
 
        //Como no conjunto a chave é igual ao valor, 
        for (const x of letras.valeus()){
                console.log(x);
        }

        for (const x of letras.keys()){
                console.log(x);
        }
   
}
conjunto();