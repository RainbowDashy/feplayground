const formElem = document.querySelector("form")
const clearElem = document.getElementById("clear")
const board = document.getElementsByClassName("tasksBoard")[0]
const ul = board.firstElementChild

formElem.addEventListener("submit", (e) => {
    e.preventDefault()
    new FormData(formElem)
    document.querySelector("form").reset()
})

formElem.addEventListener("formdata", (e) => {
    let data = e.formData
    board.style["display"] = "block"

    for (let v of data.values()) {
        let li = document.createElement("li")
        
        let span = document.createElement("span")
        span.appendChild(document.createTextNode(v))

        let checkbox = document.createElement("input")
        checkbox["type"] = "checkbox"
        checkbox.addEventListener("change", (e) => {
            let text = e.target.nextSibling
            if (e.target.checked) {
                text.style["text-decoration-line"] = "line-through"
                text.style["color"] = "red"
            } else {
                text.style["text-decoration-line"] = "none"
                text.style["color"] = "black"
            }
        })

        let clr = document.createElement("a")
        clr.appendChild(document.createTextNode("x"))
        clr.className = "delete"
        clr.addEventListener("click", (e) => {
            ul.removeChild(e.target.parentNode)
            if (ul.firstElementChild == null)
                clearBoard()
        })

        li.appendChild(clr)
        li.appendChild(checkbox)
        li.appendChild(span)        
        ul.appendChild(li)
    }
})

function clearBoard() {
    board.style["display"] = "none"
    ul.innerHTML = ""
}

clearElem.addEventListener("click", clearBoard)
