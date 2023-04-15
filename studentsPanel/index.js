document.addEventListener('DOMContentLoaded', () => {
  //СОЗДАЕМ ЛОКАЛЬНОЕ ХРАНИЛИЩЕ
  
  if (!localStorage.getItem('students')) {
    localStorage.setItem('students', JSON.stringify([]))
  }
  
  // ФУНКЦИЯ ОБНОВЛЕНИЯ СПИСКА 
  
  function createList(students) {
    for (let i = 0; i < students.length; ++i) {
      let newItem = document.createElement('tr')
      newItem.id = i
      let itemName = document.createElement('th')
      itemName.textContent = students[i].name
      let itemFamily = document.createElement('th')
      itemFamily.textContent = students[i].family
      let itemSurname = document.createElement('th')
      itemSurname.textContent = students[i].surname
      let itemBirth = document.createElement('th')
      let bd = new Date(students[i].age)
      let today = new Date()
      let studentAge = today.getFullYear() - bd.getFullYear()  
      if (today.getMonth() < bd.getMonth() || (today.getMonth() === bd.getMonth() && today.getDate() < birthdate.getDate())) {
        studentAge--;
      }
      itemBirth.textContent = studentAge;
      let itemEnter = document.createElement('th')
      itemEnter.textContent = students[i].enter

      let itemFac = document.createElement('th')
      let del = document.createElement('button')
      del.classList.add('waves-effect', 'pink', 'darken-1', 'btn', 'right')
      del.textContent = 'Удалить'
      itemFac.textContent = students[i].faculty
      itemFac.append(del)
      
      newItem.append(itemName, itemFamily, itemSurname, itemBirth, itemEnter, itemFac)
      table.append(newItem) 

      newItem.addEventListener('click', (e) => {
        e.preventDefault() 
        if (e.target.textContent == 'Удалить' && confirm('Удалить студента из списка?')) {
          students = JSON.parse(localStorage.getItem('students'))
          students.splice(e.currentTarget.id, 1) 
          localStorage.setItem('students', JSON.stringify(students))
          newItem.remove()
          window.location.reload()
        }

      })
    }
  }

  
  // ФОРМА ДОБАВЛЕНИЯ СТУДЕНТА
  
  let form = document.createElement('form');
  form.classList.add('row');

  studentName = document.createElement('input');
  studentName.classList.add('col', 's12', 'l3', 'm5');
  studentName.type = "text"
  studentName.placeholder = "Имя студента"

  family = document.createElement('input');
  family.classList.add('col', 's12', 'l3', 'offset-l1', 'offset-m1', 'm5');
  family.type = "text"
  family.placeholder = "Фамилия студента"

  surname = document.createElement('input');
  surname.classList.add('col', 's12', 'l3', 'offset-l1', 'm5');
  surname.type = "text"
  surname.placeholder = "Отчество студента"

  let birthWrapper = document.createElement('div')
  birthWrapper.classList.add('col', 's12', 'l3', 'offset-l1','m5');
  birthWrapper.style.padding = '0'
  birthday = document.createElement('input');
  birthday.min = "1965-01-01"
  birthday.max = "2010-01-01"
  birthday.style.width = '50%'
  birthday.type = "date"
  let birthdayText = document.createElement('span')
  birthdayText.textContent = 'Дата рождения:'
  birthdayText.style.marginRight = '38px'
  birthdayText.style.fontSize = '15px' 
  birthWrapper.style.borderBottom = '1px solid #9e9e9e' 
  birthday.style.borderBottom = 'none' 
  birthWrapper.append(birthdayText, birthday)

  let enteredWrapper = document.createElement('div')
  enteredWrapper.classList.add('col', 's12', 'l3', 'offset-l1', 'offset-m1', 'm5');
  enteredWrapper.style.borderBottom = '1px solid #9e9e9e' 
  enteredWrapper.style.marginBottom = '10vh'
  enteredWrapper.style.padding = '0'
  enteredDate = document.createElement('input');
  enteredDate.min = "2008-01-01"
  enteredDate.max = "2024-01-01"
  enteredDate.style.width = '50%'
  enteredDate.type = "date"
  let enteredDateText = document.createElement('span')
  enteredDateText.textContent = 'Дата поступления:'
  enteredDateText.style.marginRight = '20px'
  enteredDateText.style.fontSize = '15px' 
  enteredDate.style.borderBottom = 'none' 
  enteredWrapper.append(enteredDateText, enteredDate)
 
  faculty = document.createElement('input');
  faculty.classList.add('col', 's12', 'l3', 'offset-m1', 'm5');
  faculty.type = "text"
  faculty.placeholder = "Факультет"
 

  addStudentBtn = document.createElement('button')
  addStudentBtn.classList.add('btn', 'waves-effect', 'waves-light', 'col', 's8', 'offset-s2', 'm6', 'offset-m3', 'l6', 'offset-l3')
  addStudentBtn.type = 'submit';
  addStudentBtn.style.marginBottom = '2vh'
  addStudentBtn.textContent = 'Добавить студента'

  // ФИЛЬТРОВАТЬ

  filterName = document.createElement('input')
  filterName.classList.add( 'col', 's4', )
  filterName.type = 'text';
  filterName.placeholder = 'Фильтр по фамилии'
  
  filterAge = document.createElement('input')
  filterAge.classList.add( 'col', 's3', 'offset-s1')
  filterAge.type = 'text';
  filterAge.placeholder = 'Фильтр по возрасту'

  filterFac = document.createElement('input')
  filterFac.classList.add( 'col', 's3', 'offset-s1')
  filterFac.type = 'text';
  filterFac.placeholder = 'Фильтр по факультету'

  filterName.addEventListener('input', () => {
    document.querySelectorAll('tr').forEach(e => {
      if (!e.textContent.toLowerCase().startsWith(filterName.value.toLowerCase())) {
        e.style.display = 'none' 
      } else {
        e.style.display = 'table-row'
      }
    })
  })

  filterAge.addEventListener('input', () => {
    document.querySelectorAll('tr').forEach(e => {
      if (e.innerHTML.includes(`<th>${filterAge.value}</th>`)) {
        e.style.display = 'table-row'
      } else {
         e.style.display = 'none' 
        }
        if (filterAge.value == '') {
          e.style.display = 'table-row'
      }
    })
  })
  
  filterFac.addEventListener('input', () => {
    document.querySelectorAll('tr').forEach(e => {
      if (!e.textContent.toLowerCase().includes(filterFac.value.toLowerCase())) {
        e.style.display = 'none' 
      } else {
        e.style.display = 'table-row'
      }
    })
  })

  // добавляем все в форму

  form.append(studentName, family, surname, faculty, birthWrapper, enteredWrapper, addStudentBtn, filterName, filterAge, filterFac)
  document.body.append(form)

  // ТАБИЛЦА СТУДЕНТОВ
    //  заголовок
      let table = document.createElement('table')
      let thead = document.createElement('thead')
      let tr = document.createElement('tr')
      let thName = document.createElement('th')
      thName.classList.add('hoverable')
      thName.textContent = 'Имя'
      let thFamily = document.createElement('th')
      thFamily.classList.add('hoverable')
      thFamily.textContent = 'Фамилия'
      let thSurname = document.createElement('th')
      thSurname.classList.add('hoverable')
      thSurname.textContent = 'Отчество'
      let thBirthday = document.createElement('th')
      thBirthday.classList.add('hoverable')
      thBirthday.textContent = 'Возраст'
      let thEntered = document.createElement('th')
      thEntered.classList.add('hoverable')
      thEntered.textContent = 'Дата поступления'
      let thFac = document.createElement('th')
      thFac.classList.add('hoverable')
      thFac.textContent = 'Факультет'
      let tbody = document.createElement('tbody')
      tr.append( thName,thFamily,thSurname,thBirthday,thEntered,thFac)
      thead.append(tr)
      table.append(thead, tbody)
      
      document.body.append(table)


  // ДОБАВЛЯЕМ НОВОГО СТУДЕНТА НАЖАТИЕМ НА КНОПКУ

  addStudentBtn.addEventListener('click', (e) => {
    function removeEv() {
      this.value = ''
      this.classList.remove('error')
      this.removeEventListener('focus', removeEv)
    }
    
    e.preventDefault()
    // ВАЛИДАЦИЯ
    if (studentName.value == '' ||
    family.value == '' ||
    surname.value == '' ||
    birthday.value == '' ||
    enteredDate.value == '' ||
    faculty.value == '') {
      if (studentName.value == '') {
        studentName.value = 'Введите имя'
        studentName.classList.add('error')
        studentName.addEventListener('focus', removeEv)
      }
      if (family.value == '') {
        family.value = 'Введите фамилию'
        family.classList.add('error')
        family.addEventListener('focus', removeEv)
      }
      if (surname.value == '') {
        surname.value = 'Введите отчество'
        surname.classList.add('error')
        surname.addEventListener('focus', removeEv)
      }
      if (faculty.value == '') {
        faculty.value = 'Укажите факультет'
        faculty.classList.add('error')
        faculty.addEventListener('focus', removeEv)
      }
      if (birthday.value == '') {
        birthday.classList.add('error')
        birthday.addEventListener('click', () => {
          birthday.classList.remove('error')
        })
      }
      if (enteredDate.value == '') {
        enteredDate.classList.add('error')
        enteredDate.addEventListener('click', () => {
          enteredDate.classList.remove('error')
        })
      }
      return
    }

    window.location.reload()

    students = JSON.parse(localStorage.getItem('students'))
    students.push({
      name: studentName.value,
      family: family.value,
      surname: surname.value,
      age: birthday.value,
      enter: enteredDate.value,
      faculty: faculty.value
    })
    localStorage.setItem('students', JSON.stringify(students))

    let newItem = document.createElement('tr')
    let itemName = document.createElement('th')
    itemName.textContent = studentName.value
    let itemFamily = document.createElement('th')
    itemFamily.textContent = family.value
    let itemSurname = document.createElement('th')
    itemSurname.textContent = surname.value
    let itemBirth = document.createElement('th')
    let bd = new Date(birthday.value)
    let today = new Date()
    let studentAge = today.getFullYear() - bd.getFullYear()  
    if (today.getMonth() < bd.getMonth() || (today.getMonth() === bd.getMonth() && today.getDate() < birthdate.getDate())) {
      studentAge--;
    }
    itemBirth.textContent = studentAge;
    let itemEnter = document.createElement('th')
    itemEnter.textContent = enteredDate.value

    let itemFac = document.createElement('th')
    let del = document.createElement('button')
    del.classList.add('waves-effect', 'pink', 'darken-1', 'btn', 'right')
    del.textContent = 'Удалить'
    itemFac.textContent = faculty.value
    itemFac.append(del)

    
    newItem.append(itemName, itemFamily, itemSurname, itemBirth, itemEnter, itemFac)
    table.append(newItem) 

    
    newItem.addEventListener('click', (e) => {
      e.preventDefault() 
      if (e.target.textContent == 'Удалить' && confirm('Удалить студента из списка?')) {
        students = JSON.parse(localStorage.getItem('students'))
        students.splice(e.currentTarget.id, 1) 
        localStorage.setItem('students', JSON.stringify(students))
        newItem.remove()
        window.location.reload()
      }
    })
    
    studentName.value = ''
    studentName.classList.remove('error')
    family.value = ''
    family.classList.remove('error')
    surname.value = ''
    surname.classList.remove('error')
    birthday.value = ''
    birthday.classList.remove('error')
    enteredDate.value = ''
    enteredDate.classList.remove('error')
    faculty.value = ''


  })

  createList(JSON.parse(localStorage.getItem('students')))
  

  // СОРТИРОВКА

    thName.addEventListener('click', () => {
      students = JSON.parse(localStorage.getItem('students'))
      students.sort(function (a, b) {
        return a.name.localeCompare(b.name, "ru", { sensitivity: "base"});
      })
      localStorage.setItem('students', JSON.stringify(students))
      createList(students)
      for (let i = 0; i < students.length; i++) {
        document.getElementById(i).remove()
      }
    })
    thFamily.addEventListener('click', () => {
      students = JSON.parse(localStorage.getItem('students'))
      students.sort(function (a, b) {
        return a.family.localeCompare(b.family, "ru", { sensitivity: "base"});
      })
      localStorage.setItem('students', JSON.stringify(students))
      createList(students)
      for (let i = 0; i < students.length; i++) {
        document.getElementById(i).remove()
      }
    })
    thSurname.addEventListener('click', () => {
      students = JSON.parse(localStorage.getItem('students'))
      students.sort(function (a, b) {
        return a.surname.localeCompare(b.surname, "ru", { sensitivity: "base"});
      })
      localStorage.setItem('students', JSON.stringify(students))
      createList(students)
      for (let i = 0; i < students.length; i++) {
        document.getElementById(i).remove()
      }
    })
    thFac.addEventListener('click', () => {
      students = JSON.parse(localStorage.getItem('students'))
      students.sort(function (a, b) {
        return a.faculty.localeCompare(b.faculty, "ru", { sensitivity: "base"});
      })
      localStorage.setItem('students', JSON.stringify(students))
      createList(students)
      for (let i = 0; i < students.length; i++) {
        document.getElementById(i).remove()
      }
    })
    thBirthday.addEventListener('click', () => {
      students = JSON.parse(localStorage.getItem('students'))
      students.sort(function (a, b) {
        const aTime = a.age instanceof Date ? a.age.getTime() : Date.parse(a.age);
        const bTime = b.age instanceof Date ? b.age.getTime() : Date.parse(b.age);
        return bTime - aTime;
      })
      localStorage.setItem('students', JSON.stringify(students))
      for (let i = 0; i < students.length; i++) {
        console.log(students[i].age)
      }
      createList(students)
      for (let i = 0; i < students.length; i++) {
        document.getElementById(i).remove()
      }
    })
    thEntered.addEventListener('click', () => {
      students = JSON.parse(localStorage.getItem('students'))
      students.sort(function (a, b) {
        const aTime = a.enter instanceof Date ? a.enter.getTime() : Date.parse(a.enter);
        const bTime = b.enter instanceof Date ? b.enter.getTime() : Date.parse(b.enter);
        return aTime - bTime;
      })
      localStorage.setItem('students', JSON.stringify(students))
      for (let i = 0; i < students.length; i++) {
        console.log(students[i].age)
      }
      createList(students)
      for (let i = 0; i < students.length; i++) {
        document.getElementById(i).remove()
      }
    })

})