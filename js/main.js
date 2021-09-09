class Task {
    constructor(name, date, difficulty, priority) {
        this.name = name;
        this.date = date;
        this.difficulty = difficulty;
        this.priority = priority;
    };
};

const tasks = [];

let indentifyUser = () => {
    if (localStorage.userName == null){
        let name = prompt("Ingrese su nombre de usuario");
        localStorage.setItem("userName", name);
        console.log(localStorage.userName)
    }else{
        document.getElementById("userGreeting").innerHTML = `Buen día ${localStorage.userName}`;
    }
}

indentifyUser();

let greetUser = () => {
    document.getElementById("userGreeting").innerHTML = `Buen día ${localStorage.userName}`;
}

greetUser();

let addTask = () => {
    let name = document.getElementById("name").value;
    let date = document.getElementById("date").value;
    let difficulty = document.getElementById("difficulty").value;
    let priority = document.getElementById("priority").value;
    tasks.push(new Task(name, date, difficulty, priority));
    tasks.sort(function (a, b) {
        return (b.priority - a.priority)
    });
    console.log(tasks);
    let acumulator = ``;
    tasks.forEach(task =>
        acumulator += 
        `
            <div id="${task.name}" class="card-body mb-4 col-3">
                <div class="small text-muted">Fecha: ${task.date}</div> 
                <h2 class="card-title h4">${task.name}</h2>
                <p class="card-text">Dificultad: ${task.difficulty}</p> 
                <p class="card-text">Prioridad: ${task.priority}</p>
                <button onclick="deleteTask('${task.name}')" class="btn btn-primary">Borrar</button>
            </div>

        `
        //TODO: validar que el usuario escriba un nombre  
        //TODO: cambiar el nombre de la dificultad a español para mostrarlo al usuario, y cambiar el color de la fuente según la dificultad
        )
    document.getElementById("taskList").innerHTML = acumulator;
    document.getElementById("taskCounter").innerHTML = tasks.length;
    }

let deleteTask = (deleted) => {
    const index = tasks.findIndex(task => task.name === deleted)
    console.log(index)
    if (index > -1) {
        tasks.splice(index, 1);
    }
    console.log(tasks)
    const deletedTask = document.getElementById(deleted);
    deletedTask.parentNode.removeChild(deletedTask);
    document.getElementById("taskCounter").innerText = tasks.length;
}


//TODO: agregar botón de limpiar formulario de tarea nueva. 
//TODO: cambiar número de prioridad por un botón que suba o baje la tarea en el listado, este botón va a cambiar la posición de la tarea en el array de tareas.



