const btnMenuPrincipal = document.querySelector('#btn_menuPrincipal')
const menuPrincipal = document.querySelector('#menuPrincipal')
const todosMenusPrincipais = [...document.querySelectorAll('.btn_menuItem')]

const config = './config.txt'

fetch(config)
.then(res => res.json())
.then( res => {
    console.log(res)
    sessionStorage.setItem('servidor', res.servidor)
    sessionStorage.setItem('versao', res.versao)
})

btnMenuPrincipal.addEventListener('click', (event) => {
    menuPrincipal.classList.toggle('ocultar')
})

todosMenusPrincipais.forEach(e => {
    e.addEventListener('click', (evt) => {
        menuPrincipal.classList.add('ocultar')
    })
})