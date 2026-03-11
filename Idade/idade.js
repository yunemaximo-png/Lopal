function idade(){
    let idade;
    do{
        idade = parseInt(prompt("Informe sua idade (valores de 5 a 150): "));
    } while ( idade < 5 || idade > 150 || idade != idade ); // ou Number.isNaN(idade)
    alert("Idade validada.");
}