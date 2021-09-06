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
        <div id="${name}" class="${difficulty}Card">
            <h3> ${name}<h3>
            <h4>Fecha: ${date}</h4>
            <h4>Dificultad: ${difficulty}<h4> 
            <h4>Prioridad: ${priority}<h4>
            <button onclick="deleteTask('${name}')">Borrar</button>
        </div>
    `;
    document.getElementById("taskList").innerHTML = acumulator;
    document.getElementById("taskCounter").innerHTML = tasks.length;
    console.log(tasks)
}

let deleteTask = (deleted) => {
    const index = tasks.indexOf(item => item.name === deleted);
    console.log(deleted);
    console.log(index);
    if (index > -1) {
        tasks.splice(index, 1);
    } 
    const deletedTask = document.getElementById(deleted);
    deletedTask.parentNode.removeChild(deletedTask);
    document.getElementById("taskCounter").innerHTML = tasks.length;
    console.log(tasks)
}

//TODO: agregar un contador de número de tareas totales. al lado un número de tareas importantes.
//TODO: hacer que se imprima la dificultad en español. 
//TODO: agregar un botón de eliminar tarea en la card.
//TODO: agregar botón de limpiar formulario de tarea nueva. 
//TODO: cambiar número de prioridad por un botón que suba o baje la tarea en el listado, este botón va a cambiar la posición de la tarea en el array de tareas.



