document.addEventListener('DOMContentLoaded', function () {
  ;[].forEach.call(document.querySelectorAll('.tel'), function (input) {
    let keyCode

    function mask(event) {
      event.keyCode && (keyCode = event.keyCode)
      let pos = this.selectionStart
      if (pos < 3) event.preventDefault()
      let matrix = '+7 (___) ___ ____',
        i = 0,
        def = matrix.replace(/\D/g, ''),
        val = this.value.replace(/\D/g, ''),
        new_value = matrix.replace(/[_\d]/g, function (a) {
          return i < val.length ? val.charAt(i++) || def.charAt(i) : a
        })
      i = new_value.indexOf('_')
      if (i != -1) {
        i < 5 && (i = 3)
        new_value = new_value.slice(0, i)
      }
      let reg = matrix
        .substr(0, this.value.length)
        .replace(/_+/g, function (a) {
          return '\\d{1,' + a.length + '}'
        })
        .replace(/[+()]/g, '\\$&')
      reg = new RegExp('^' + reg + '$')
      if (
        !reg.test(this.value) ||
        this.value.length < 5 ||
        (keyCode > 47 && keyCode < 58)
      )
        this.value = new_value
      if (event.type == 'blur' && this.value.length < 5) this.value = ''
    }

    input.addEventListener('input', mask, false)
    input.addEventListener('focus', mask, false)
    input.addEventListener('blur', mask, false)
    input.addEventListener('keydown', mask, false)

    input.addEventListener('click', () => {
      if (input.setSelectionRange) {
        const length = input.value.length * 2
        setTimeout(() => {
          input.setSelectionRange(length, length)
        }, 1)
      }
    })
  })
})

const form = document.querySelector('#form') // Выбираем объект формы
form.addEventListener('submit', (e) => {
  // Отлавливаем событие нажатие на кнопку отправить
  e.preventDefault()

  let formElements = form.elements // Помещаем в переменую все элементы формы
  let l = 0
  let s = 0

  for (let i = 0; i < formElements.length; i++) {
    let elementClass = formElements[i].classList.value // Читаем классы у элементов

    if (elementClass.indexOf('validate') + 1) {
      // Оставляем элементы которые имеют класс validate'

      s++

      if (formElements[i].parentElement.querySelector('.helper-text')) {
        formElements[i].parentElement.classList.remove('error')
        formElements[i].parentElement.querySelector('.helper-text').remove()
      }
      if (
        formElements[i].type === 'checkbox' &&
        formElements[i].checked === false
      ) {
        // Проверяем заполнено ли поле checkbox
        formElements[i].parentElement.classList.add('error') // Добавляем родителю класс error
        formElements[i].parentElement.insertAdjacentHTML(
          'afterbegin',
          '<span>&nbsp;</span>'
        )
        formElements[i].parentElement.insertAdjacentHTML(
          'beforeend',
          '<span class="helper-text helper-checked">Вы должны согласится с условиями политики сайта, чтобы отправить форму</span>'
        )
      } else if (formElements[i].value === '') {
        // Проверяем заполнено поле input
        formElements[i].parentElement.classList.add('error') // Добавляем родителю класс error
        formElements[i].parentElement.insertAdjacentHTML(
          'beforeend',
          '<span class="helper-text">Это поле обязательно для заполнения</span>'
        )
      } else {
        l++
      }
    }
  }

  let name = formElements.name.value
  let tel = formElements.message.value
  let hostname = window.location.hostname
  let message = formElements.tel.value

  if (l === s) {
    form.style.display = 'none'
    form.insertAdjacentHTML(
      'beforebegin',
      '<div class="preloader-wrapper big active"><div class="spinner-layer spinner-blue-only"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div></div>'
    )

    fetch(
      'https://api.telegram.org/bot1834273371:AAHGdWu4-XT872rmGx6P3fxCXRhrByCY_RI/sendMessage?chat_id=-521722614&text=Сообщение с сайта: ' +
        hostname +
        ', от пользователя: ' +
        name +
        ', тел: ' +
        tel +
        ', событие: ' +
        message
    )
      .then((response) => {
        if (response.status >= 400) {
          return Promise.reject()
        }
        return response.json()
      })
      .then((i) => {
        if (i.ok) {
          document.querySelector('.preloader-wrapper').remove()
          form.insertAdjacentHTML(
            'beforebegin',
            '<div class="sending">Спасибо, ваше сообщение отправлено!</div>'
          )
          setTimeout(resetForm, 1000)
        }
      })
      .catch(() => console.log('ошибка'))
  }

  function resetForm() {
    const popupClose = document.querySelector('.popup__close')
    popupClose.parentNode.parentNode.classList.remove('popup-open')
    popupClose.remove()
    document.querySelector('.sending').remove()
    form.removeAttribute('style')
    form.reset() // Очищаем поля формы
  }
})
