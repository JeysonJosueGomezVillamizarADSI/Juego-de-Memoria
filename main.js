//Inicializar variables

let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 40;
let timerInicial = 40
let tiempoRegresivoId = null;

let winAudio = new Audio('./Sonidos/win.wav');
let loseAudio = new Audio('./Sonidos/lose.wav');
let clickAudio = new Audio('./Sonidos/click.wav');
let rightAudio = new Audio('./Sonidos/right.wav');
let wrongAudio = new Audio('./Sonidos/wrong.wav');
//Apuntando a documento html
let mostrarMovimientos = document.getElementById('movimientos')
let mostrarAciertos = document.getElementById('aciertos')
let mostrarTiempo = document.getElementById('t-restante')
//Generacion Numeros aleatorios
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros = numeros.sort (()=>{return Math.random()-0.5});
console.log (numeros);

//Funciones
function contarTiempo(){
    tiempoRegresivoId = setInterval(()=>{
        timer--;
        mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
        if(timer==0){
            clearInterval (tiempoRegresivoId)
            bloquearTarjetas(numeros);
            loseAudio.play();
            mostrarTiempo.innerHTML= `Perdiste 😔 suerte para la proxima`
        }
    },1000)
}

function bloquearTarjetas(numeros){
    for (let i=0; i<=15;i++){
        let tarjetaBloqueada= document.getElementById(i);
        tarjetaBloqueada.innerHTML =`<img src="./Imagenes/${numeros[i]}.png" alt="">`;;
        tarjetaBloqueada.disabled = true;
    }
}

//Funcion principal
function destapar(id){
if(temporizador== false){
    contarTiempo();
    temporizador=true;
}
tarjetasDestapadas++;
console.log(tarjetasDestapadas);

if(tarjetasDestapadas == 1){
    //Mostrar el primer numero
tarjeta1 =document.getElementById(id);
primerResultado = numeros[id];
tarjeta1.innerHTML = `<img src="./Imagenes/${primerResultado}.png" alt="">`;
clickAudio.play();
//Deshabilitar primero boton
tarjeta1.disabled = true;
}else if(tarjetasDestapadas==2){
    //Mostrar segundo numero
    tarjeta2=document.getElementById(id);
    segundoResultado = numeros[id];
    tarjeta2.innerHTML=`<img src="./Imagenes/${segundoResultado}.png" alt="">`;;
    //Deshabilitar segundo boton
    tarjeta2.disabled=true;

    //Incrementar movimientos
    movimientos++
    
    mostrarMovimientos.innerHTML= `Movimientos 😲: ${movimientos}`;
    if(primerResultado == segundoResultado){
        //Encerar contador tarjetas destapadas
        tarjetasDestapadas= 0;

        //Aumentar aciertos
        aciertos++;
        mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`
        mostrarAciertos.innerHTML = `Aciertos 😎: ${aciertos}`
        rightAudio.play();
        if(aciertos==8){
            winAudio.play();
            clearInterval(tiempoRegresivoId);
            mostrarTiempo.innerHTML= `Ganaste 🎉🤩 sólo demoraste ${timerInicial - timer} segundos`
        }
    }else{
        wrongAudio.play();
        //Mootrar momentaneamente valores y volver a tapar
        setTimeout(()=>{
            tarjeta1.innerHTML = ' ';
            tarjeta2.innerHTML = ' ';
            tarjeta1.disabled = false;
            tarjeta2.disabled = false;
            tarjetasDestapadas = 0;
        },800);
    }
}
}