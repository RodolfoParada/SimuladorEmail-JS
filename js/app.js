document.addEventListener('DOMContentLoaded', function(){

const datosFormulario = {
    email: '',
    asunto: '',
    mensaje: '',
} 



// seleccionar los elementos de la interfaz 
const inputEmail = document.querySelector('#email');
const inputAsunto = document.querySelector('#asunto');
const inputMensaje = document.querySelector('#mensaje');
// const inputCC = document.querySelector('#cc');
const inputFormulario = document.querySelector('#formulario');
const btnSubmit = document.querySelector('#formulario button[type="submit"]');
const btnReset = document.querySelector('#formulario button[type="reset"]');
const spinner = document.querySelector('#spinner');

inputEmail.addEventListener('input', validar);
inputAsunto.addEventListener('input',validar);
inputMensaje.addEventListener('input', validar);
// inputCC.addEventListener('input', validar); 

inputFormulario.addEventListener('submit', enviarDatos);

btnReset.addEventListener('click', function(e){
    
    e.preventDefault(); 
    resetFormulario()
     
})

function enviarDatos(e){
    e.preventDefault();
    spinner.classList.add('flex');
    spinner.classList.remove('hidden');

    //resetFormulario()

    setTimeout(() => {
        spinner.classList.remove('flex');
        spinner.classList.add('hidden');
        resetFormulario()

        // Crear una alerta
        const alertaExito = document.createElement('P');
        alertaExito.classList.add('bg-green-500','text-white','p-2', 'text-center', 'rounded-lg', 'mt-10',
            'font-bold', 'text-sm', 'uppercase'); 
        alertaExito.textContent = 'Mensaje enviado correctamente';  
       
        inputFormulario.appendChild(alertaExito);    
        setTimeout(() =>{
       // alertaExito.remove(); 

        },4000)
    
    }, 3000); 

}

  
//trim quita los espacios en blanco
function validar(e){
   


    
    if(e.target.value.trim() === '' ){
        mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
        datosFormulario[e.target.name] = ''; 
        comprobarDatos()
        return; 
    }
      
    if(e.target.id === 'email'  && !validarEmail(e.target.value)){
        mostrarAlerta(`El ${e.target.id} no es valido`, e.target.parentElement);
        datosFormulario[e.target.name] = ''; 
        comprobarDatos()
        return; 
    }; 

    


    limpiarAlerta(e.target.parentElement); 

    // Asignar los valores 
    datosFormulario[e.target.name] = e.target.value.trim().toLowerCase(); 
    console.log(datosFormulario)

    //Comprobar el objeto de datos
    comprobarDatos(); 
   

  
}

// function alertaCC(mensaje, referencia){
//    const mensajeCC = document.createElement('P')
//    mensajeCC.textContent = mensaje;
//    mensajeCC.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');
   
//    referencia.appendChild(mensajeCC); 
// }


function mostrarAlerta(mensaje, referencia){
   
   limpiarAlerta(referencia);

    // Generar alerta en HTML
    const error = document.createElement('P'); 
    error.textContent = mensaje; 
    error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');

    //Inyectar el error al formulario
    referencia.appendChild(error)
   
}

function limpiarAlerta(referencia){
   const alerta = referencia.querySelector('.bg-red-600');
   if(alerta){
    alerta.remove(); 
   }

}
function validarEmail(email){
    const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/; 
    const resultado = regex.test(email); 
    return resultado; 
   
}


function comprobarDatos(){
    // toma los valores y lo asigna a un arreglo
    if(Object.values(datosFormulario).includes('')){
        btnSubmit.classList.add('opacity-50'); 
        btnSubmit.disabled = true; 
        return; 
    }else{
        btnSubmit.classList.remove('opacity-50'); 
        btnSubmit.disabled = false; 
    };
}

function resetFormulario(){
    //reiniciar
    datosFormulario.email = '';
    datosFormulario.asunto = '';
    datosFormulario.mensaje = '';

   
   inputFormulario.reset(); 
   comprobarDatos();
   
}

})

/** 
 *  Reto: 
 * añade un campo extra llamado CC; para añadir un destinatario extra.
 * Este campo no es obligatorio; pero en caso de tener información debes validar que sea
   un email válido.
 *
*/


/* 
mkt@empresa.com
*/