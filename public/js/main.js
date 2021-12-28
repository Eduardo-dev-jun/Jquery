var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");


$(function(){                   //document.ready
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    $("#botao-reiniciar").click(reiniciaJogo);
    inicializaMarcadores();
    $(".botao-remover").click(removeLinha)
    atualizaPlacar();
    $("#usuarios").selectize({               //estiliza o select usando o plugin selectize
        create: true,
        sortField: 'text'
    })
    $('.tooltip').tooltipster({             //cria um balão de texto sobre o botão com classo tooltip usando o plugin tooltipster
        trigger: "custom"     // 'cancela' o balão para que ele possa ser emplementado somente dps de clicar no botão
                             // a ativação do tooltip esta em sincronizaPlacar no placar.js
    });
    $(".reinicia").tooltipster()      //cria um balão de texto para o botão (o texto esta no corpo do botão em "title")
    $("#botao-placar").tooltipster()  //cria um balão de texto para o botão (o texto esta no corpo do botão em "title")
    $("#botao-frase").tooltipster()  //cria um balão de texto para o botão (o texto esta no corpo do botão em "title")
    $("#botao-frase-id").tooltipster()   //cria um balão de texto para o botão (o texto esta no corpo do botão em "title")
});

function atualizaTempoInicial(tempo){ 
    tempoInicial = tempo  
    $("#tempo-digitacao").text(tempo)
}

function atualizaTamanhoFrase(){
    var frase = $(".frase").text();
    var numPalavras = frase.split(" ").length;
    var tamanhoFrase = $("#tamanho-frase");
    tamanhoFrase.text(numPalavras);
}


function inicializaContadores(){
    campo.on("input", function(){                           // input = escuta a cada digitação
    var conteudo = campo.val()                              // val() = value
    var qtdPalavras = conteudo.split(/\S+/).length -1;      //(/\S+/) server para selecionar cada parte que tenha " " sem contar com o " "

        $(".contador-palavras").text(qtdPalavras)
        var qtdCaracteres = conteudo.length;
        $(".contador-caracteres").text(qtdCaracteres)
    })
}

function inicializaCronometro(){
    campo.one("focus", function(){             // focus = escuta sempre que o campo for ativo, no caso, quando selecionar o text area para digitar
        var tempoRestante = $("#tempo-digitacao").text();
        $("#botao-reiniciar").attr("disabled", true)
        var cronometroID = setInterval(function(){   //setIntever = executa uma função a cada tempo definido(no caso 1000 milisegundos = 1 seg)
            tempoRestante--;                                
            $("#tempo-digitacao").text(tempoRestante)
            
            if(tempoRestante < 1){
                clearInterval(cronometroID)             //para a função, impedindo que o cromometro fique negativo
                finalizaJogo();
            }
        },1000) // definição de tempo
    });
}

function finalizaJogo(){
    campo.attr("disabled",true);            //coloca o disabled no text area
    $("#botao-reiniciar").attr("disabled", false);
    campo.toggleClass("campo-desativado")
    inserePlacar();
}

function inicializaMarcadores(){
    campo.on("input", function(){
        var frase = $(".frase").text()
        var digitado = campo.val();
        var comparavel = frase.substr(0,digitado.length)

        if(digitado == comparavel){
            campo.addClass("borda-verde")
            campo.removeClass("borda-vermelha")
        }else{
            campo.addClass("borda-vermelha")
            campo.removeClass("borda-verde")
        }
    })
    }

function reiniciaJogo(){
    campo.attr("disabled", false);          // tira o disable da text araea
    campo.val("");
    $(".contador-palavras").text("0");
    $(".contador-caracteres").text("0");
    $("#tempo-digitacao").text(tempoInicial)
    inicializaCronometro();
    campo.toggleClass("campo-desativado")
    campo.removeClass("borda-vermelha")
    campo.removeClass("borda-verde")
};

