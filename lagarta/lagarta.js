async function lagarta(){
    let lagarta1 = "( )( )( )( )(oo)";
    let lagarta2 = "()()()()(oo)"
    let espaco = "   ";

    function sleep(ms){
        return new Promise( resolve => setTimeout(resolve, ms));
    }

    for(let i = 0; i < 20; i++){
        lagarta2 = espaco + lagarta2
        lagarta1 = espaco + lagarta1
        
        if ( i % 2 ===0 ){
            console.log(lagarta1)
        } else {
            console.log(lagarta2)
        }

        await sleep (500)
        console.clear() 
    }
       
}
