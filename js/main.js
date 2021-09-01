class Task {
    constructor(name, date, difficulty, priority) {
        this.name = name;
        this.date = date;
        this.difficulty = difficulty;
        this.priority = priority;
    };
};

const tasks = [];

let acumulator = ``;

let addTask = () => {
    let name = document.getElementById("name").value;
    let date = document.getElementById("date").value;
    let difficulty = document.getElementById("difficulty").value;
    let priority = document.getElementById("priority").value;
    tasks.push(new Task(name, date, difficulty, priority));
    tasks.sort(function (a, b) {
        return (b.priority - a.priority)
    });
    acumulator += `
    <div class="${difficulty}Card">
        <h3> ${name}<h3>
        <h4>Fecha: ${date}</h4>
        <h4>Dificultad: ${difficulty}<h4> 
        <h4>Prioridad: ${priority}<h4>
    </div>
    `
    document.getElementById("taskList").innerHTML = acumulator; 
}

//TODO: agregar un contador de número de tareas totales. al lado un número de tareas importantes.
//TODO: hacer que se imprima la dificultad en español. 
//TODO: agregar un botón de eliminar tarea en la card.
//TODO: agregar botón de limpiar formulario de tarea nueva. 
//TODO: cambiar número de prioridad por un botón que suba o baje la tarea en el listado, este botón va a cambiar la posición de la tarea en el array de tareas.



