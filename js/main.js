class Task {
    constructor(name, difficulty, priority) {
        this.name = name;
        this.difficulty = difficulty;
        this.priority = priority;
    };
};

let tasks = [];

//Identifing user
const indentifyUser = () => {
    if (localStorage.userName == null) {
        document.getElementById("userArea").innerHTML = `
        <form>
            <div>No estás registrado</div>
            <p>Por favor ingresá tu nombre</p>
            <input type="text" class="form-control mb-3" id="userName">
            <button onclick="addUser()" class="btn btn-primary mb-3">Registrarme</button>
        </form>
        `;
    } else {
        greetUser();
    }
}
indentifyUser();

const addUser = () => {
    let userName = document.getElementById("userName").value;
    const userNameCapitalized = userName.charAt(0).toUpperCase() + userName.slice(1)
    localStorage.setItem("userName", userNameCapitalized);
}

//Greeting user according sistem date
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

//Displaying random phrase
randomPhrase = () => {
    phrase = phrases[Math.floor(Math.random() * phrases.length)];
    document.getElementById("phrase").innerHTML = phrase;
}
randomPhrase()

//Task Printer
const tasksPrinter = (tasksPrint) => {
    let acumulator = ``;
    tasksPrint.forEach(task =>
        acumulator +=
        `
            <div id="${task.name}" class="card-body mb-4 col-4 taskCard ${task.difficulty}">
                <h2 class="card-title h4">${task.name}</h2>
                <div class="card-text">Dificultad: ${task.difficulty}</div> 
                <p class="card-text">Prioridad: ${task.priority}</p>
                <button id="deleteButton" onclick="deleteTask('${task.name}')" class="btn btn-primary">Borrar</button>
            </div>
        `
        //TODO: validar que el usuario escriba un nombre 
    )
    document.getElementById("taskList").innerHTML = acumulator;
    $(`.taskCard`).fadeIn(500);
}


//Checking localStorage for saved user tasks
const checkStorageTasks = () => {
    let storagedTasks = JSON.parse(localStorage.getItem("userTasks"));
    if (storagedTasks == null) {
        document.getElementById("taskList").innerHTML = `
        <div class="card noTaskCard mx-auto">Aún no se han añadido tareas</div>
        `;
    } else {
        tasksPrinter(storagedTasks);
        document.getElementById("taskCounter").innerHTML = storagedTasks.length;
    }
}
checkStorageTasks()

//Adding tasks
const addTask = () => {
    let tasks = JSON.parse(localStorage.getItem("userTasks"));
    let name = document.getElementById("name").value;
    let difficulty = document.getElementById("difficulty").value;
    let priority = document.getElementById("priority").value;
    if (tasks == null) {
        tasks = [{ name: name, difficulty: difficulty, priority: priority }]
    } else {
        tasks.push(new Task(name, difficulty, priority));
    }
    tasks.sort(function (a, b) {
        return (b.priority - a.priority)
    });
    tasksPrinter(tasks);
    let storagedTasks = JSON.stringify(tasks);
    localStorage.setItem("userTasks", storagedTasks);
    document.getElementById("taskCounter").innerHTML = tasks.length;
}

//Deleting tasks
const deleteTask = (deleted) => {
    let tasks = JSON.parse(localStorage.getItem("userTasks"));
    const index = tasks.findIndex(task => task.name === deleted);
    if (index > -1) {
        tasks.splice(index, 1);
    };
    const deletedTask = document.getElementById(deleted);
    deletedTask.parentNode.removeChild(deletedTask);
    $('#taskCounter').html(tasks.length);
    let storagedTasks = JSON.stringify(tasks);
    localStorage.setItem("userTasks", storagedTasks);
}

//TODO: agregar botón de limpiar formulario de tarea nueva. 
//TODO: cambiar número de prioridad por un botón que suba o baje la tarea en el listado, este botón va a cambiar la posición de la tarea en el array de tareas.

//Task finder
const searchTerm = () => {
    let tasks = JSON.parse(localStorage.getItem("userTasks"));
    let term = $('#search').val();
    if (term == "") {
        tasksPrinter(tasks);
    } else {
        const foundTask = tasks.filter(task => task.name == term);
        tasksPrinter(foundTask);
    }
    //TODO: hacer que el buscador encuentre resultados similares
}

//jQuery effects
$("#userArea").slideDown(1000)
$("#phrase").fadeToggle(1000)

//Displaying date using API
$.getJSON("http://worldtimeapi.org/api/ip", function (res) {
    let unix_timestamp = res.unixtime;
    let a = new Date(unix_timestamp * 1000);
    let months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octtubre', 'Noviembre', 'Diciembre'];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let time = `${date} de ${month} de ${year}`;
    document.getElementById("date").innerHTML = time
});

//Filters
const filterDifficulty = () => {
    let tasks = JSON.parse(localStorage.getItem("userTasks"));
    let option = document.getElementById("difficultyFilter").value;
    switch (option) {
        case "0": 
            tasksPrinter(tasks)
            break;
        case "1": 
            let easyTasks = tasks.filter(task => task.difficulty == "Fácil");
            tasksPrinter(easyTasks)
            break;
        case "2":
            let normalTasks = tasks.filter(task => task.difficulty == "Normal");
            tasksPrinter(normalTasks)
            break;
        case "3":
            let hardTasks = tasks.filter(task => task.difficulty == "Difícil");
            tasksPrinter(hardTasks)
            break;
    }
    
}

//Displaying information
const showInfo = () => {
    document.getElementById("information").innerHTML = `
    <div id="info"class="container">
        <h3>¡Gracias por utilizar MisTareas!</h3>
        <p>MisTareas es una aplicación web desarrollada como proyecto final.</p>
        <div>Podés ver el codigo libremente en <a href="https://github.com/gabolope/javascript-coderhouse">GitHub</a></div>
        <p>Seguime en mis redes:</p>
        <div class="container row">
            <div class="col-2 mx-auto">
                <a href="https://github.com/gabolope/"><img src="media/icons/github.svg" alt="GitHub"></a>
            </div>
            <div class="col-2 mx-auto">
                <a href="https://www.linkedin.com/in/gabriel-alejandro-l%C3%B3pez-14190720a/"><img src="media/icons/linkedin.svg" alt="Linkedin"></a>
            </div>
        </div>
        <a href="#!"><img id="close" onclick="closeInfo()" src="media/icons/x.svg" alt="Close"></a>
    </div>
    `
}
const closeInfo = () => {
    document.getElementById("information").innerHTML = ``;
}