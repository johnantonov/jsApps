let modalIsOpen = null

function loadCss() {
  if(modalIsOpen) return
  modalIsOpen = new Promise(r => {
    let link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = './css.css'
    link.id = 'modalCss'
    link.addEventListener('load', () => {
      r()
    })
    document.head.append(link)
  })
  return modalIsOpen
}

async function confirm(text = 'Закрыть модальное окно?') {
  await loadCss()

  return new Promise(r => {
    let modalBg = document.createElement('div')
    let modalOpen = document.createElement('div')
    let p = document.createElement('p')
    let btnYes = document.createElement('button')
    let btnNo = document.createElement('button')

    modalBg.classList.add('modal-bg')
    modalOpen.classList.add('modal-open')

    modalBg.append(modalOpen)
    modalOpen.append(p, btnYes, btnNo)

    p.textContent = text
    btnYes.textContent = 'Да'
    btnNo.textContent = 'Нет'

    btnYes.addEventListener('click', () => {
      r()
      modalBg.remove()
    })

    document.body.append(modalBg)
  })
  // let modalBg = document.createElement('div')
  //   let modalOpen = document.createElement('div')
  //   let p = document.createElement('p')
  //   let btnYes = document.createElement('button')
  //   let btnNo = document.createElement('button')

  //   modalBg.classList.add('modal-bg')
  //   modalOpen.classList.add('modal-open')

  //   modalBg.append(modalOpen)
  //   modalOpen.append(p, btnYes, btnNo)

  //   p.textContent = text
  //   btnYes.textContent = 'Да'
  //   btnNo.textContent = 'Нет'

  //   btnYes.addEventListener('click', () => {
  //     modalBg.remove()
  //   })

  //   document.body.append(modalBg)
}

document.getElementById('openModal').addEventListener('click', () => {
  confirm()
  
})

