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
        document.getElementById("userArea").innerHTML = `
        <form>
            <div>Usted no se encuentra registrado</div>
            <p>Por favor ingrese su nombre</p>
            <input type="text" class="form-control mb-3" id="userName">
            <button onclick="addUser()" class="btn btn-primary mb-3">Registrarme</button>
        </form>
        `;
    } else {
        greetUser();
    }
}
indentifyUser();

let addUser = () => {
    let userName = document.getElementById("userName").value;
    console.log(userName);
    localStorage.setItem("userName", userName);
}

//Saludadador según horario del día (fecha tomada de sistema del usuario)
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
    m = checkTime(m);
    document.getElementById('time').innerHTML = h + ":" + m;
    t = setTimeout(function () {
        greetUser()
    }, 500);
    if (h >= 5 && h < 13) {
        document.getElementById("userGreeting").innerHTML = `Buen día ${localStorage.userName}`;
    } else if (h >= 13 && h <= 18) {
        document.getElementById("userGreeting").innerHTML = `Buenas tardes ${localStorage.userName}`;
    } else {
        document.getElementById("userGreeting").innerHTML = `Buenas noches ${localStorage.userName}`;
    }
}

//Selector de frases aleatorias
randomPhrase = () => {
    phrase = phrases[Math.floor(Math.random() * phrases.length)];
    document.getElementById("phrase").innerHTML = phrase;
}
randomPhrase()

//Impresor de tareas
let tasksPrinter = (tasksPrint) => {
    let acumulator = ``;
    tasksPrint.forEach(task =>
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
    $(`.taskCard`).fadeIn(500);
}

//Agregador de tareas
let addTask = () => {
    let name = document.getElementById("name").value;
    let date = document.getElementById("date").value;
    let difficulty = document.getElementById("difficulty").value;
    let priority = document.getElementById("priority").value;
    tasks.push(new Task(name, date, difficulty, priority));
    tasks.sort(function (a, b) {
        return (b.priority - a.priority)
    });
    tasksPrinter(tasks);
    document.getElementById("taskCounter").innerHTML = tasks.length;
}

//Borrador de tareas
let deleteTask = (deleted) => {
    const index = tasks.findIndex(task => task.name === deleted)
    if (index > -1) {
        tasks.splice(index, 1);
    }
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
    console.log(term)
    const foundTask = tasks.filter(task => task.name == term);
    console.log(foundTask)
    tasksPrinter(foundTask);
    //TODO: hacer que el buscador encuentre resultados similares
    //TODO: hacer que al borrar la búsqueda se vuelvan a mostrar todas las tareas 
}

//Efectos con jQuery
$("#userArea").slideDown(1000)
$("#phrase").fadeToggle(1000)

//Utilizando API para obtener fecha según IP de usuario
$.getJSON("http://worldtimeapi.org/api/ip", function (res) {
    let unix_timestamp = res.unixtime;
    let a = new Date(unix_timestamp * 1000);
    let months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octtubre', 'Noviembre', 'Diciembre'];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let time = `${date} de ${month} de ${year}`;
    document.getElementById("date").innerHTML = time
})