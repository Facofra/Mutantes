window.addEventListener('load',()=>{
    let tamanio =  document.querySelector('#tamanioGrilla')
    let grilla = document.querySelector('#grilla')
    let mutante=  document.querySelector('.mutante')
    let encontradas = document.querySelector('.cantidadEncontradas')
    let numeroTamanio =4;

    let adn = Array(numeroTamanio);
    for (let i = 0; i < numeroTamanio; i++) {
        adn[i]= Array(numeroTamanio)
    }
    
    
// ========================================== todo esto es parte de la funcion mutante ==========================================
    let contadorTotal=0;
    function horizontal(adn,i,j,contadorHorizontal){
        
        if (adn[j][i]!=undefined && adn[j][i] == adn[j][i+1] && contadorHorizontal[0]!=3) {
            contadorHorizontal[0]++
        }else{
            contadorHorizontal[0]=0;
        }

        if (contadorHorizontal[0] ==3) {
            contadorTotal++;
        }
    }


    function diagonalesDecrecientes(adn, i,j,contadorDecrecientesInf,contadorDecrecientesSup){

        //Inferior y principal
        if (adn[i+j][i]!= undefined && adn[i+j][i] == adn[i+1+j][i+1] && contadorDecrecientesInf[0]!=3) {
            contadorDecrecientesInf[0]++;
        }else{
            contadorDecrecientesInf[0]=0;
        }

        if ( contadorDecrecientesInf[0] == 3) {
            contadorTotal++
        }

        //superior a principal
        if (adn[i][i+j]!= undefined && j != 0 && adn[i][i+j] == adn[i+1][i+1+j] && contadorDecrecientesSup[0]!=3 ) {
            contadorDecrecientesSup[0]++;
        }else{
            contadorDecrecientesSup[0]=0;
        }
        
        if ( contadorDecrecientesSup[0] == 3) {
            contadorTotal++
        }
    }

    function diagonalesCrecientes(adn, i,j,contadorCrecientesInf,contadorCrecientesSup){

        //secundaria e inferior
        if (adn[i+j][adn.length-1-i]!= undefined && adn[i+j][adn.length-1-i] == adn[i+j+1][adn.length-2-i] && contadorCrecientesInf[0]!=3) {
            contadorCrecientesInf[0]++;
        }else{
            contadorCrecientesInf[0]=0;
        }

        if (contadorCrecientesInf[0]  == 3) {
            contadorTotal++;
        }

        //superior a secundaria
        if (adn[i][adn.length-1-i-j]!= undefined && j!=0 && adn[i][adn.length-1-i-j] == adn[i+1][adn.length-2-i-j]  && contadorCrecientesSup[0]!=3 ) {
            contadorCrecientesSup[0]++;
        }else{
            contadorCrecientesSup[0]=0;
        }

        if (contadorCrecientesSup[0]  == 3) {
            contadorTotal++;
        }

    }

    function vertical(adn,i,j,contadorVertical){

        if (adn[i][j]!= undefined && adn[i][j] == adn[i+1][j]  && contadorVertical[0]!=3) {
            contadorVertical[0]++
        }else{
            contadorVertical[0]=0;
        }

        if (contadorVertical[0] ==3) {
            contadorTotal++;
        }
    }

    function isMutant(adn){
        
        
        let contadorDecrecientesInf=[0];
        let contadorDecrecientesSup=[0];
        
        let contadorCrecientesInf=[0];
        let contadorCrecientesSup=[0];
        
        let contadorVertical = [0];
        let contadorHorizontal = [0];
        
        //recorrer matriz, con j cambiando valores de inicio
        for (let j = 0; j < adn.length; j++) {
            
            contadorDecrecientesInf[0]=0;
            contadorDecrecientesSup[0]=0;
            
            contadorCrecientesInf[0]=0;
            contadorCrecientesSup[0]=0;
            
            contadorVertical[0]=0;
            contadorHorizontal[0]=0;
            
            for (let i = 0; i < adn.length-1; i++) {
                if (i<adn.length-1-j) {
                    diagonalesDecrecientes(adn, i,j,contadorDecrecientesInf,contadorDecrecientesSup);
                    diagonalesCrecientes(adn, i,j,contadorCrecientesInf,contadorCrecientesSup);
                }
                vertical(adn,i,j,contadorVertical);
                horizontal(adn,i,j,contadorHorizontal)
                
            }
        }
       
    }

    
    function llamadaIsMutant() {
        isMutant(adn);
        encontradas.innerHTML = contadorTotal;
        if (contadorTotal > 1) {
            mutante.style.display = 'unset'
        }
        else{
            mutante.style.display = 'none'
        }
        contadorTotal=0;
    }
// ======================================================= fin seccion mutante======================================================

    grilla.style.gridTemplateColumns= `repeat(${numeroTamanio}, auto)`;
    grilla.style.gridTemplateRows= `repeat(${numeroTamanio}, auto)`;

    
    for (let i = 0; i < 16; i++) {
        let celda= document.createElement('div')
        celda.classList.add('celda'+i, 'celda')        

        grilla.appendChild(celda)

    }

    let pincel="";

    let botonRojo= document.querySelector('.colorRojo')
    let botonVerde= document.querySelector('.colorVerde')
    let botonNaranja= document.querySelector('.colorNaranja')
    let botonAzul= document.querySelector('.colorAzul')
    let botonBorrar= document.querySelector('.borrar')
    
    botonRojo.addEventListener('click',function(){
        pincel="rojo"
        this.style.border = "2px yellow solid"

        botonVerde.style.border ="none"
        botonNaranja.style.border ="none"
        botonAzul.style.border ="none"
        botonBorrar.style.border ="1px solid black"
        
    })
    
    botonVerde.addEventListener('click',function(){
        pincel="verde"
        this.style.border = "2px yellow solid"

        botonRojo.style.border ="none"
        botonNaranja.style.border ="none"
        botonAzul.style.border ="none"
        botonBorrar.style.border ="1px solid black"
        
    })
    
    botonNaranja.addEventListener('click',function(){
        pincel="naranja"
        this.style.border = "2px yellow solid"

        botonRojo.style.border ="none"
        botonVerde.style.border ="none"
        botonAzul.style.border ="none"
        botonBorrar.style.border ="1px solid black"
        
    })
    
    botonAzul.addEventListener('click',function(){
        pincel="azul"
        this.style.border = "2px yellow solid"

        botonRojo.style.border ="none"
        botonVerde.style.border ="none"
        botonNaranja.style.border ="none"
        botonBorrar.style.border ="1px solid black"
        
    })
    
    botonBorrar.addEventListener('click',function(){
        pincel="gris"
        this.style.border = "2px yellow solid"

        botonRojo.style.border ="none"
        botonVerde.style.border ="none"
        botonNaranja.style.border ="none"
        botonAzul.style.border ="none"
    })

    document.querySelector('.reset').addEventListener('click',()=>{
        celdas.forEach((celdita,i) => {
            celdita.style.backgroundColor = "grey";
            celdita.innerHTML="";
            adn[Math.floor(i/numeroTamanio)][i%numeroTamanio] = undefined
        });
        llamadaIsMutant()
    })

    let celdas = document.querySelectorAll('.celda')

    tamanio.addEventListener('input',()=>{

        numeroTamanio= tamanio.valueAsNumber

        if (numeroTamanio < 4) {
            numeroTamanio=4;
        } else if (numeroTamanio > 16) {
            numeroTamanio = 16;
        }

        grilla.style.gridTemplateColumns= `repeat(${numeroTamanio}, auto)`;
        grilla.style.gridTemplateRows= `repeat(${numeroTamanio}, auto)`;

        grilla.innerHTML=""

        for (let i = 0; i < numeroTamanio*numeroTamanio; i++) {
            let celda= document.createElement('div')
            celda.classList.add('celda'+i, 'celda')        
    
            grilla.appendChild(celda)
    
        }
        celdas = document.querySelectorAll('.celda')
        
        adn = Array(numeroTamanio);
        for (let i = 0; i < numeroTamanio; i++) {
            adn[i]= Array(numeroTamanio)
        }
        llamadaIsMutant()
    })

    tamanio.addEventListener('keydown',e=>{
        if (e.keyCode>=37 && e.keyCode <=40 || e.keyCode >= 48 && e.keyCode <=57 || e.keyCode==8) {
            
        } else{
            e.preventDefault()

        }
    })
    
    window.addEventListener('change',()=>{

        celdas.forEach((celdita,i) => {
            celdita.addEventListener('click',function(){
                switch (pincel) {
                    case "rojo":
                        celdita.style.backgroundColor = "rgb(183, 18, 52)"
                        celdita.innerHTML = "<span> T </span>"
                        adn[Math.floor(i/numeroTamanio)][i%numeroTamanio] = "T"
                        llamadaIsMutant()
                        break;
    
                    case "verde":
                        celdita.style.backgroundColor = "rgb(0, 155, 72)"
                        celdita.innerHTML = "<span> A </span>"
                        adn[Math.floor(i/numeroTamanio)][i%numeroTamanio] = "A"

                        llamadaIsMutant()
                        break;
    
                    case "naranja":
                        celdita.style.backgroundColor = "rgb(230, 113, 51)"
                        celdita.innerHTML = "<span> C </span>"
                        adn[Math.floor(i/numeroTamanio)][i%numeroTamanio] = "C"

                        llamadaIsMutant()
                        break;
    
                    case "azul":
                        celdita.style.backgroundColor = "rgb(0, 70, 173)"
                        celdita.innerHTML = "<span> G </span>"
                        adn[Math.floor(i/numeroTamanio)][i%numeroTamanio] = "G"

                        llamadaIsMutant()
                        break;
    
                    case "gris":
                        celdita.style.backgroundColor = "grey"
                        celdita.innerHTML = ""
                        adn[Math.floor(i/numeroTamanio)][i%numeroTamanio] = undefined
                        llamadaIsMutant()
                        break;
    
                    default:
                        break;
                }
            })
        });
    })
    
    celdas.forEach((celdita,i) => {
        celdita.addEventListener('click',function(){
            switch (pincel) {
                case "rojo":
                    celdita.style.backgroundColor = "rgb(183, 18, 52)"
                    celdita.innerHTML = "<span> T </span>"
                    adn[Math.floor(i/numeroTamanio)][i%numeroTamanio] = "T"
                    llamadaIsMutant()
                    break;

                case "verde":
                    celdita.style.backgroundColor = "rgb(0, 155, 72)"
                    celdita.innerHTML = "<span> A </span>"
                    adn[Math.floor(i/numeroTamanio)][i%numeroTamanio] = "A"
                    llamadaIsMutant()
                    break;

                case "naranja":
                    celdita.style.backgroundColor = "rgb(230, 113, 51)"
                    celdita.innerHTML = "<span> C </span>"
                    adn[Math.floor(i/numeroTamanio)][i%numeroTamanio] = "C"
                    llamadaIsMutant()
                    break;

                case "azul":
                    celdita.style.backgroundColor = "rgb(0, 70, 173)"
                    celdita.innerHTML = "<span> G </span>"
                    adn[Math.floor(i/numeroTamanio)][i%numeroTamanio] = "G"
                    llamadaIsMutant()
                    break;

                case "gris":
                    celdita.style.backgroundColor = "grey"
                    celdita.innerHTML = ""
                    adn[Math.floor(i/numeroTamanio)][i%numeroTamanio] = undefined
                    llamadaIsMutant()
                    break;

                default:
                    break;
            }
        })
    });

    document.addEventListener('keydown',e=>{
        if (e.keyCode == 32) {
            llamadaIsMutant()
        }
    })
    
})
