document.addEventListener('click', (event) => {
  if (event.target.classList.contains('popup-show')) {
    event.preventDefault()
    const popupOpen = document.getElementById(
      event.target.getAttribute('data-popup')
    )

    const dataContent = event.target.getAttribute('data-content')
    document.querySelector('#tel').value = dataContent

    const popupChild = popupOpen.querySelector('.popup')
    popupChild.insertAdjacentHTML(
      'afterbegin',
      '<a class="popup__close" href="#"></a>'
    )
    popupOpen.classList.add('popup-open')
  } else if (event.target.classList.contains('popup__close')) {
    event.preventDefault()
    const parent = event.target.parentElement
    const popupOpen = parent.parentElement
    const popupClose = popupOpen.querySelector('.popup__close')

    popupOpen.classList.remove('popup-open')

    popupClose.remove()

    // if (popupClose.parentNode) {
    //     popupClose.parentNode.removeChild(popupClose);
    // }
  }
})
