const fs = require('fs');
const process = require('process');
const comando = process.argv[2]; 
const tareas = JSON.parse(fs.readFileSync('./tareas.json', 'utf-8'));

module.exports = {
    
    leerJson : () => JSON.parse(fs.readFileSync('./tareas.json', 'utf-8')),
    
    escribirJson : function(){
                fs.writeFileSync('./tareas.json', JSON.stringify(tareas), 'utf-8') 
    },

    listarTareas : function(){   //listar tareas usando forEach
        tareas.forEach(tarea => {
        console.log(tarea);
        })
    },
    leerPorEstado : function(filtro){ 
        let filtrarPorEstado = tareas.filter(tarea => tarea.estado === filtro);
        console.log(filtrarPorEstado);
    },
    
    guardarTarea : function(){
        
        switch (comando){
            
            case 'listar':
                return this.listarTareas();
                break;
            
                case 'crear':
                let titulo = process.argv[3];
                let estado = 'pendiente';
                let nuevaTarea = {titulo, estado};
                tareas.push(nuevaTarea); //agrego una nueva tarea
                this.escribirJson(); //sobreescribo el archivo Json, usando el stringify
                this.listarTareas();
                break;
            
                case 'filtrar':
                let filtro = process.argv[3]  
            this.leerPorEstado(filtro);    // aplico el filtro en las tareas
                return filtro;    
                break;
            default:
                console.log('¿Qué querés hacer?'); // respuesta en caso que no coloque ninguna accion
                break;
        }
    
        
        //tareas.push(nuevaTarea); // agrego una nueva tarea
        //this.escribirJson()  // stringifico mis tareas modificadas y las guardo en tareas.json
    }

    

}