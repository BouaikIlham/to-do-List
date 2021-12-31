const list = document.querySelector('.list')
const addButton = document.querySelector('.fa-plus-circle')
const clear = document.querySelector('.fa-sync-alt')
const input = document.getElementById('input')
const date = document.querySelector(".date")

setInterval(() => {
    let today = new Date()
    date.innerHTML = today.toUTCString()
}, 1000)


addButton.addEventListener("click", (e) => {
    if(input.value) {
        createTodo(input.value)
    }
    input.value = ""
})

const showTodo = (todo) => {
    const li = document.createElement('li')
    li.classList.add('item')
    const p = document.createElement("p")
    p.textContent = todo.value
    p.setAttribute("data-id", todo.id)
    const iconCircle = document.createElement('i')
    if(todo.completed) {
        iconCircle.classList.add('far', "fa-check-circle", "check")
        p.classList.add('completed')
    } else {{
        iconCircle.classList.add('far', "fa-circle", "check")
    }}
    
    const iconDelete = document.createElement('i')
    iconDelete.classList.add('fas', "fa-trash-alt")
    li.appendChild(iconCircle)
    li.appendChild(p)
    li.appendChild(iconDelete)
    list.appendChild(li)
}

const createTodo = (value) => {
    let newTodo = {
        value: value,
        completed: false,
        id: id++
    }
    showTodo(newTodo)


    // Save LocalStorage
    todos.push(newTodo)
    localStorage.setItem('todos', JSON.stringify(todos))
}

list.addEventListener("click", (e) => {
    const target = e.target
    if(target.classList.contains("check")) {
        target.classList.toggle("fa-circle")
        target.classList.toggle("fa-check-circle")
        let p = target.nextElementSibling
        p.classList.toggle('completed')


        // update in localstorage
        let id = Number(p.getAttribute("data-id"))
        todos.map((todo) => {
            if(todo.id === id) {
                todo.completed = !todo.completed
            }
        })
        localStorage.setItem('todos', JSON.stringify(todos))

    } else if(target.classList.contains("fa-trash-alt")) {
        let p = target.previousElementSibling
        let id = Number(p.getAttribute("data-id"))
        todos = todos.filter((todo) => {
           return id !== todo.id
        })
        localStorage.setItem('todos', JSON.stringify(todos))

        target.parentElement.outerHTML = ""
    }
})


clear.addEventListener('click', () => {
    localStorage.removeItem("todos")
    location.reload()
})

// todos = ["bymilk", "hdedi", "jhfehez"]

let todos = localStorage.getItem('todos') ? localStorage.getItem('todos') : []
let id = 1

if(todos) {
    todos = JSON.parse(todos)
    todos.forEach(todo => {
        showTodo(todo)
    });
    id = todos.length + 1
}
