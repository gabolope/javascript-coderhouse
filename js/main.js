class Task {
    constructor(name, date, difficulty, priority) {
        this.name = name;
        this.date = date;
        this.difficulty = difficulty;
        this.priority = priority;
    };
};

const tasks = [];

//Identificador de usuario
let indentifyUser = () => {
    if (localStorage.userName == null) {
        let name = prompt("Ingrese su nombre de usuario");
        localStorage.setItem("userName", name);
        console.log(localStorage.userName)
    } else {
        document.getElementById("userGreeting").innerHTML = `Buen día ${localStorage.userName}`;
    }
}
indentifyUser();

//Saludador de usuario según hora del día
function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
function greetUser() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    // var s = today.getSeconds();
    m = checkTime(m);
    // s = checkTime(s);
    document.getElementById('ct').innerHTML = h + ":" + m;
    t = setTimeout(function () {
        greetUser()
    }, 500);
    if (h >= 5 && h < 13) {
        document.getElementById("userGreeting").innerHTML = `Buen día ${localStorage.userName}`;
    }else if(h >= 13 && h <=18) {
        document.getElementById("userGreeting").innerHTML = `Buenas tardes ${localStorage.userName}`;
    }else {
        document.getElementById("userGreeting").innerHTML = `Buenas noches ${localStorage.userName}`;
    }
}
greetUser();

//Selector de frases aleatorias
randomPhrase = () => {
    phrase = phrases[Math.floor(Math.random() * phrases.length)];
    document.getElementById("phrase").innerHTML = phrase;
}
randomPhrase()

//Agregador y mostrador de tareas
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
            <div id="${task.name}" class="card-body mb-4 col-4 taskCard">
                <div class="small text-muted">Fecha: ${task.date}</div> 
                <h2 class="card-title h4">${task.name}</h2>
                <p class="card-text">Dificultad: ${task.difficulty}</p> 
                <p class="card-text">Prioridad: ${task.priority}</p>
                <button id="deleteButton" onclick="deleteTask('${task.name}')" class="btn btn-primary">Borrar</button>
            </div>
        `
        //TODO: validar que el usuario escriba un nombre  
        //TODO: cambiar el nombre de la dificultad a español para mostrarlo al usuario, y cambiar el color de la fuente según la dificultad
        
    )
    document.getElementById("taskList").innerHTML = acumulator;
    document.getElementById("taskCounter").innerHTML = tasks.length;
    $(`.taskCard`).fadeIn(500)

}

//Borrador de tareas
let deleteTask = (deleted) => {
    const index = tasks.findIndex(task => task.name === deleted)
    if (index > -1) {
        tasks.splice(index, 1);
    }
    /* $('#deleteButton').click(() => { $(`#${deleted}`).slideUp('slow')}) */
    const deletedTask = document.getElementById(deleted);
    deletedTask.parentNode.removeChild(deletedTask);
    $('#taskCounter').html(tasks.length);
    document.getElementById("taskCounter").innerText = tasks.length
}

//TODO: agregar botón de limpiar formulario de tarea nueva. 
//TODO: cambiar número de prioridad por un botón que suba o baje la tarea en el listado, este botón va a cambiar la posición de la tarea en el array de tareas.


//Buscador de tareas (jQuery)
let searchTerm = () => {
    let term = $('#search').val();
    const foundTask = tasks.filter(task => task.name == term);
    let acumulator = ``;
    foundTask.forEach(task =>
        acumulator +=
        `
            <div id="${task.name}" class="card-body mb-4 col-4 taskCard">
                <div class="small text-muted">Fecha: ${task.date}</div> 
                <h2 class="card-title h4">${task.name}</h2>
                <p class="card-text">Dificultad: ${task.difficulty}</p> 
                <p class="card-text">Prioridad: ${task.priority}</p>
                <button onclick="deleteTask('${task.name}')" class="btn btn-primary">Borrar</button>
            </div>
        `
    )
    $('#search').change($('#taskList').html(acumulator)) //TODO: hacer que al borrar lo buscado vuelvan a aparecer todas las tareas
}

//TODO: hacer una función que imprima las tarjetas para no tener codigo repetido

//Efectos con jQuery

$("#phrase").fadeToggle(1000)
