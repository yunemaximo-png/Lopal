function meuswitch(){

    let dia;
    let data = new Date().getDay();

    switch(data){
        case 0:
            dia = "domingo";
            break;
        case 2:
        case 3:
        case 4:
            dia = "o meio da semana";
            break;    
        case 6:
            dia = "sábado";
            break;
        default:
            dia = "segunda ou sexta";
    }

    document.getElementById("demo").innerHTML = "Hoje é " + dia;

}