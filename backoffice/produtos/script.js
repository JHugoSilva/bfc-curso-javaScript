const btnMenuPrincipal = document.querySelector('#btn_menuPrincipal')
const menuPrincipal = document.querySelector('#menuPrincipal')
const todosMenusPrincipais = [...document.querySelectorAll('.btn_menuItem')]

btnMenuPrincipal.addEventListener('click', (event) => {
    menuPrincipal.classList.toggle('ocultar')
})

todosMenusPrincipais.forEach(e => {
    e.addEventListener('click', (evt) => {
        menuPrincipal.classList.add('ocultar')
    })
})