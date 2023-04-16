


document.addEventListener('DOMContentLoaded', () => {
  let time = 0
  let form = document.createElement('form')
  let select = document.createElement('select')
  let option8 = document.createElement('option')
  let option12 = document.createElement('option')
  let option16 = document.createElement('option')
  let option32 = document.createElement('option')
  let option48 = document.createElement('option')
  let option56 = document.createElement('option')
  let startBtn = document.createElement('button')
  startBtn.classList.add('btn')
  startBtn.textContent = "Запустить игру"
  let head = document.querySelector('.head')
  let timer = document.createElement('p')
  let game = document.querySelector('.game')
  timer.style.fontSize = '32px'
  timer.textContent = `У вас осталось: ${time} секунд`
  head.append(timer)
  
  form.textContent = 'Выберите количество карт'
  option8.textContent = 8
  option12.textContent = 12
  option16.textContent = 16
  option32.textContent = 32
  option48.textContent = 48
  option56.textContent = 56
  
  select.append( option8, option12, option16, option32, option48, option56)
  form.append(select, startBtn)
  head.prepend(form)

  let win = false

  function createCard() {
    newCard = document.createElement('div')
    cardFront = document.createElement('div')
    cardBack = document.createElement('div')
    newCard.classList.add('card')
    cardFront.classList.add('card__face', 'card__face_front')
    cardBack.classList.add('card__face', 'card__face_back')
    newCard.append(cardFront, cardBack)
    game.append(newCard)

    newCard.addEventListener('click', (e) => {
      if (document.querySelector('.is-flipped') == e.currentTarget) {
        e.currentTarget.classList.remove('is-flipped')
        return
      }
      if (document.querySelector('.is-flipped')) {
        if (document.querySelector('.is-flipped').textContent != e.currentTarget.textContent) {
           document.querySelector('.is-flipped').classList.remove('is-flipped')
           e.currentTarget.classList.add('is-flipped')
        } else { 
          e.currentTarget.classList.add('is-flipped')
          document.querySelectorAll('.is-flipped').forEach((e) => {
            setInterval(() => {
              e.textContent = 9999
              e.classList.remove('.card')
              e.remove()
              if (!document.querySelector('.card') && win == false) {
                confirm('Вы выиграли!')
                win = true
                startBtn.disabled = false
                time = 0
              }
            }, 500)
          }) 
        }
      } else {
        e.currentTarget.classList.toggle('is-flipped')
      }
    })
  }
  
  startBtn.addEventListener('click', (e) => {
    e.preventDefault()
    win == false
    let nums = [];
    let indexes = [];
    let randoms = [];
    
    for (;nums.length < select.value;) {
      let x = Math.round(Math.random()*100)
      nums.push(x,x)
    }
    for (;indexes.length < select.value;) {
      let x = Math.round(Math.random()*100)
      if (x < select.value && !indexes.includes(x)) {
        indexes.push(x)
      }
    }
    for (i = 0; i < select.value; ++i) {
      randoms[indexes[i]] = nums[i] 
    }

    for (let i = 0; i < select.value; i++) { 
      createCard()
      newCard.id = [i]
      cardBack.textContent = randoms[i]
    }
    startBtn.disabled = 'disabled'
    time = 60
    timer.textContent = `У вас осталось: ${time} секунд`
    timeGame = setInterval(() => {
      if (time != 0) {
          --time
          timer.textContent = `У вас осталось: ${time} секунд`
      } else if (time == 0 && win == true) {
        clearInterval(timeGame)
        timer.textContent = `У вас осталось: 0 секунд`
      } else {
          clearInterval(timeGame)
          alert(`К сожалению, время вышло!`)
          document.querySelectorAll('.card').forEach((el) => {
            el.remove()
          })
          startBtn.disabled = false
      }
    }, 1000)
  })
  
}) 