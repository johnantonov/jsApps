document.addEventListener('DOMContentLoaded', (async function() {
    title = document.createElement('h1')
    title.classList.add('mb-5', 'mt-5')
    title.textContent = 'Список дел' 
    title.style.textAlign = 'center'
    input = document.createElement('input')
    input.classList.add('form-control', 'mb-3')
    btn = document.createElement('button')
    btn.classList.add('btn', 'btn-outline-warning', 'mb-5')
    btn.textContent = 'Создать дело'
    btn.style.width = '30%'
    btn.style.fontSize = '20px'
    btn.style.alignSelf = 'center'

    lists = document.createElement('div')
    lists.classList.add('d-flex', 'justify-content-between')

    doList = document.createElement('ul')
    doneList = document.createElement('ul')
    doList.style.marginRight = '10px'

    doCap = document.createElement('li')
    doCap.innerHTML = '<h3 class="display-6 mb-5"><b>Дела</b></h3>'
    doCap.style.marginLeft = '50%'
    doList.append(doCap)
    doneCap = document.createElement('li')
    doneCap.innerHTML = '<h3 class="display-6 mb-5"><b>Завершенные дела</b></h3>'
    doneList.append(doneCap)

    lists.append(doList, doneList)

    document.body.classList.add('d-flex', 'flex-column')
    document.body.append(title, input, btn, lists)
    

    async function updateAfter() {
        const response = await fetch ('http://localhost:3000/api/todos')
        const todoStorageList = await response.json()
        console.log(todoStorageList)
        todoStorageList.forEach(todoItem => updateList(todoItem))
    }
    updateAfter()

    function updateList({name, done, id}) {
        doElem = document.createElement('li')
        doElem.classList.add(`classRemove${id}`)
        doElemText = document.createElement('p')
        doElemText.textContent = name
        doElem.classList.add('display-6', 'mb-3', 'd-flex', 'flex-column')
        doneBtn = document.createElement('button')
        doneBtn.classList.add('mb-1', 'btn', 'btn-outline-success', 'btn-lg')
        doneBtn.textContent = 'Завершить'
        doneBtn.id = `${id}`
        delBtn = document.createElement('button')
        delBtn.classList.add('btn', 'btn-outline-danger', 'btn-lg')
        delBtn.textContent = 'Удалить'
        delBtn.id = `${id*2}`

        if (done) {
            doElem.append(doElemText, delBtn)
            doneList.append(doElem)
        } else {
            doElem.append(doElemText, doneBtn, delBtn)
            doList.append(doElem)
        }

        doneBtn.addEventListener('click', (e) => {
            e.preventDefault()
            fetch(`http://localhost:3000/api/todos/${e.target.id}`, {
                method: 'PATCH', 
                body: JSON.stringify({done: true})
            })
            // document.querySelector(e.target.id).remove()
            doneElem = document.querySelector(`.classRemove${e.target.id}`)
            doneList.append(doneElem)
            document.getElementById(e.target.id).remove()
        })

        delBtn.addEventListener('click', (e) => {
            e.preventDefault()
            fetch(`http://localhost:3000/api/todos/${e.target.id/2}`, {
                method: 'DELETE', 
            })
            document.querySelector(`.classRemove${e.target.id/2}`).remove()
        })
    }






    btn.addEventListener('click', async e => {
        e.preventDefault();

        if (!input.value) {
            return
        }

        console.log(input.value)
        const response = await fetch ('http://localhost:3000/api/todos', {
            method: 'POST', 
            body: JSON.stringify({
                name: input.value,
                owner: 'John'
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        })

        const todoItem = await response.json()
        updateList(todoItem)

        input.value = ''
    })


    


}))