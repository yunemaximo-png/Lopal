function ternario(){
    let dia;
    let data = new Date().getDay();

    dia = data == 0? "domingo":
          data == 1? "segunda-Feira":
          data == 2? "terça-Feira":
          data == 3? "quarta-Feira":
          data == 4? "quinta-Feira":
          data == 5? "sexta-Feira":
          "sábado";

    document.getElementById("demo").innerHTML = "Hoje é " + dia;          

}