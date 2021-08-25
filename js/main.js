class Task {
    constructor(name, date, difficulty, priority) {
        this.name = name;
        this.date = date;
        this.difficulty = difficulty;
        this.priority = priority;
    };
};

const tasks = [];

let addTask = () => {
    let taskQuestion = prompt("¿Desea agregar una tarea? si/no");
    while (taskQuestion == "si") {
        let name = prompt("¿Cuál es el nombre de la tarea?");
        let date = prompt("¿Cuál es la fecha de la tarea?");
        let difficulty = prompt("Cuál es la dificultad de la tarea? facil/normal/dificil");
        let priority = parseInt(prompt("¿Cuál es la prioridad de la tarea? 1/10"));
        tasks.push(new Task(name, date, difficulty, priority));
        taskQuestion = prompt("¿Desea agregar otra tarea? si/no");
    };
    tasks.sort(function (a, b) {
        return (b.priority - a.priority)
    });
    tasks.forEach(element =>
        document.write(`
        <div class="${element.difficulty}Card">
            <h3> ${element.name}<h3>
            <h4>Fecha: ${element.date}</h4>
            <h4>Dificultad: ${element.difficulty}<h4>
            <h4>Prioridad: ${element.priority}<h4>
        </div>
        `
        )
    )
}

addTask();




