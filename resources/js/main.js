let section = document.querySelectorAll('section')
let navLinks = document.querySelectorAll('header nav a')

window.onscroll = () => {
  section.forEach((sec) => {
    let top = window.scrollY
    let offset = sec.offsetTop - 150
    let height = sec.offsetHeight
    let id = sec.getAttribute('id')

    if (top >= offset && top < offset + height) {
      navLinks.forEach((links) => {
        links.classList.remove('active')
        document
          .querySelector(`header nav a[href*=${id}]`)
          .classList.add('active')
      })
    }
  })
}

//Hide the id in the url after a link click
const hashHandler = () => {
  const location = window.location.hash.split('#')[1]
  window.history.pushState({}, 'Page Title', '/' + location)
}

//listen to changes in the window's hash
window.addEventListener('hashchange', hashHandler, false)
