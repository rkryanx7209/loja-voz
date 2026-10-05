const robo = new(window.SpeechRecognition || window.webkitSpeechRecognition)();
robo.lang="pt-BR";

function ouvir(){
    document.getElementById("resposta").innerHTML = "Ouvindo...";
    robo.start();
}

robo.onresult = function(evento){
    const fala = evento.results[0][0].transcript.toLowerCase();

    const tela = document.getElementById("resposta");
   
    if(fala.includes("claro") || fala.includes("luz")|| fala.includes("branco") || fala.includes("dia")){
        document.body.classList.add("claro");
        tela.innerHTML = "Tema claro ativado.";
    }else if(fala.includes("escuro") || fala.includes("preto")|| fala.includes("noite")){
        document.body.classList.remove("claro");
        tela.innerHTML = "Tema escuro ativado.";
    }else if(fala.includes("frete") || fala.includes("entrega")){
        tela.innerHTML = "Frete gratis nas compras acima de R$ 150,00.";
    }else if(fala.includes("desconto")){
        tela.innerHTML = "Desconto de 10% aplicado ao seu próximo pedido.";
    }else{
        tela.innerHTML = `comando "${fala}" não reconhecido.`;
    }
}

  