document.addEventListener('DOMContentLoaded', (function (){
    if(!localStorage.getItem('ToDoStorage')) {
        localStorage.setItem('ToDoStorage', JSON.stringify([]))
    }
    if(!localStorage.getItem('DoneStorage')) {
        localStorage.setItem('DoneStorage', JSON.stringify([]))
    }
    document.body.style.background = '#949693'
    let app = document.querySelector('.app')
    app.classList.add('d-flex', 'flex-wrap', 'justify-content-between')

    
    let title = document.createElement('h1')
    title.textContent = "Список моих дел"
    title.style.textAlign = 'center'
    title.classList.add('mb-5', 'col-12')
    app.append(title)

    let formCreate = document.createElement('form')
    formCreate.classList.add('input-group', 'mb-5')
    app.append(formCreate)

    let input = document.createElement('input')
    input.textContent = "Список моих дел"
    input.classList.add('form-control') 
    formCreate.append(input)

    let buttonCreate = document.createElement('input')
    buttonCreate.textContent = "Создать дело"
    buttonCreate.type = 'submit'
    buttonCreate.classList.add('btn', 'btn-primary', 'btn-lg')
    formCreate.append(buttonCreate)

    let doList = document.createElement('div', 'col-6') 
    doList.style.maxWidth = '45%'
    let doListTitle = document.createElement('h2')
    doListTitle.textContent = 'Дела'
    doListTitle.style.marginLeft = '30%'
    doListTitle.style.marginBottom = '50px'
    let doUl = document.createElement('ul')
    doList.append(doListTitle)
    doList.append(doUl)
    app.append(doList)

    let doneList = document.createElement('div', 'col-6') 
    doneList.style.maxWidth = '45%'
    let doneListTitle = document.createElement('h2')
    doneListTitle.textContent = 'Завершенные дела'
    doneListTitle.style.marginRight = '30%'
    doneListTitle.style.marginBottom = '50px'
    let doneUl = document.createElement('ul')
    doneList.append(doneListTitle)
    doneList.append(doneUl)
    app.append(doneList)

    createToDoItem()

    function createToDoItem() {
        storage = JSON.parse(localStorage.getItem('ToDoStorage'))
        for (let i = 0; i < storage.length; ++i) {
            doLi = document.createElement('li')
            doLi.id = `doLi${i}`
            doLi.style.marginBottom = '30px'
            doLi.style.overflowWrap = 'break-word'
            doLi.style.maxWidth = '500px'
            doLi.style.padding = '5px'
            doLi.style.border = '3px solid #564345'
    
            doLiText = document.createElement('p')
            doLiText.textContent = storage[i]
            doLiText.style.fontSize = '25px'
            doLiText.style.marginBottom = '10px'
    
            let btnDone = document.createElement('button')
            btnDone.classList.add('btn', 'btn-success', 'btn-lg')
            btnDone.id = `btnDone${i}`
            btnDone.style.marginBottom = '5%'
            btnDone.textContent = 'Завершить'
    
            let btnDel = document.createElement('button')
            btnDel.classList.add('btn', 'btn-danger', 'btn-lg')
            btnDel.id = `btnDel${i}`
            btnDel.style.margin = '0 5% 5% 0'
            btnDel.textContent = 'Удалить'
    
    
            doLi.append(doLiText, btnDel, btnDone)
            doUl.append(doLi)

    
            btnDel.addEventListener('click', function(e) {
                document.getElementById(`doLi${e.target.id[e.target.id.length-1]}`).remove()
                // storage = JSON.parse(localStorage.getItem('ToDoStorage'))
                // storage.splice([e.target.id[e.target.id.length-1]], 1)
                // localStorage.setItem('ToDoStorage', JSON.stringify(storage))

            })
    
            btnDone.addEventListener('click', function(e) {
                doneUl.append(document.getElementById(`doLi${e.target.id[e.target.id.length-1]}`))
                document.getElementById(`btnDone${e.target.id[e.target.id.length-1]}`).remove() 
            })

            //     doneStorage = JSON.parse(localStorage.getItem('DoneStorage'))
            //     doneStorage.push([storage][e.target.id[e.target.id.length-1]])
            //     localStorage.setItem('DoneStorage', JSON.stringify(doneStorage))

            //     storage = JSON.parse(localStorage.getItem('ToDoStorage'))
            //     storage.splice([e.target.id[e.target.id.length-1]], 1)
            //     localStorage.setItem('ToDoStorage', JSON.stringify(storage))

                
                
            // })
        }
    }

    buttonCreate.addEventListener('click', function() {
        if (input.value === '') {
            return
        }
        storage = JSON.parse(localStorage.getItem('ToDoStorage'))
        storage.push(input.value)
        localStorage.setItem('ToDoStorage', JSON.stringify(storage))
        createToDoItem()

        input.value = ''
    })
    

    

}))