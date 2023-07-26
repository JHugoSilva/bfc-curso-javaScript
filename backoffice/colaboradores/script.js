const dadosGrid = document.querySelector('#dadosGrid')
const btn_add = document.querySelector('#btn_add')
const novoColaborador = document.querySelector('#novoColaborador')
const btn_fecharPopup = document.querySelector('#btn_fecharPopup')
const btn_gravarPopup = document.querySelector('#btn_gravarPopup')
const btn_cancelarPopup = document.querySelector('#btn_cancelarPopup')
const telefones = document.querySelector('#telefones')
const f_nome = document.querySelector('#f_nome')

const c_nome = document.querySelector('#c_nome')
const f_tipo = document.querySelector('#f_tipo')
const f_status = document.querySelector('#f_status')

const f_foto = document.querySelector('#f_foto')
const img_foto = document.querySelector('#img_foto')

//n = Novo Colaborador | e = Editar Colaborador

let modoJanela = "n"

const endPoint = `./todos.php`

const criarCxTelefone = (fone, id, tipo) => {
    const divTel = document.createElement('div')
    divTel.setAttribute('class', 'tel')

    const numTel = document.createElement('div')
    if (tipo == 'n') {
        numTel.setAttribute('class', 'numTel novoTel')
    } else {
        numTel.setAttribute('class', 'numTel editarTel')
    }
    numTel.innerHTML = fone
    divTel.appendChild(numTel)

    const delTel = document.createElement('img')
    delTel.setAttribute('src', '../../imgs/delete_.svg')
    delTel.setAttribute('class', 'delTel')
    delTel.setAttribute('data-id', id)
    delTel.addEventListener('click', (evt) => {
        if (id !== null) {
            const objTel = evt.target
            const idTel = objTel.dataset.id
            fetch('telefones.php?id='+idTel,{method: 'DELETE'})
            .then(res=>{
                if (res.status == 200) {
                    evt.target.parentNode.remove()
                }
            })
        } else {
            evt.target.parentNode.remove()
        }
    })
    divTel.appendChild(delTel)

    telefones.appendChild(divTel)
}

const todosColaboradores = () => {
    fetch(endPoint,{method:'GET'})
    .then(res => res.json())
    .then(res => {
        dadosGrid.innerHTML = ""
        res.dados.forEach(e=>{
            const divLinha = document.createElement('div')
            divLinha.setAttribute('class', 'linhaGrid')
    
            const divC1 = document.createElement('div')
            divC1.setAttribute('class', 'colunaLinhaGrid c1')
            divC1.innerHTML = e.id
            divLinha.appendChild(divC1)
    
            const divC2 = document.createElement('div')
            divC2.setAttribute('class', 'colunaLinhaGrid c2')
            divC2.innerHTML = e.nome
            divLinha.appendChild(divC2)
    
            const divC3 = document.createElement('div')
            divC3.setAttribute('class', 'colunaLinhaGrid c3')
            divC3.innerHTML = e.tipo
            divLinha.appendChild(divC3)
    
            const divC4 = document.createElement('div')
            divC4.setAttribute('class', 'colunaLinhaGrid c4')
            divC4.innerHTML = e.status
            divLinha.appendChild(divC4)
    
            const divC5 = document.createElement('div')
            divC5.setAttribute('class', 'colunaLinhaGrid c5')
            divLinha.appendChild(divC5)
    
            const img_status = document.createElement('img')
            if (e.status == "A") {
                img_status.setAttribute('src', '../../imgs/on.svg')
            } else {
                img_status.setAttribute('src', '../../imgs/off.svg')
            }
            img_status.setAttribute('class', 'icone_op')
            img_status.setAttribute('data-idcolab', e.id)
            img_status.addEventListener('click',(evt)=>{
                const idcolab = evt.target.dataset.idcolab
                const endStatus = `status.php?id=${idcolab}/I`
                if (evt.target.getAttribute('src') == '../../imgs/on.svg') {
                    fetch(endStatus)
                    .then(res => {
                        if (res.status == 200) {
                            evt.target.setAttribute('src', '../../imgs/off.svg')
                            evt.target.parentNode.parentNode.childNodes[3].innerHTML = "I"
                        }
                    })
                } else {
                    const endStatus = `status.php?id=${idcolab}/A`
                    fetch(endStatus)
                    .then(res => {
                        if (res.status == 200) {
                            evt.target.setAttribute('src', '../../imgs/on.svg')
                            evt.target.parentNode.parentNode.childNodes[3].innerHTML = "A"
                        }
                    })
                }
            })
            divC5.appendChild(img_status)
    
            const img_edit = document.createElement('img')
            img_edit.setAttribute('src', '../../imgs/edit_.svg')
            img_edit.setAttribute('class', 'icone_op')
            img_edit.addEventListener("click", (evt) => {
                modoJanela = "e"
                const id = evt.target.parentNode.parentNode.firstChild.innerHTML
                document.getElementById('tituloPopup').innerHTML = "Editar Colaborador"
                fetch(endPoint+'?id='+id,{method:'GET'})
                .then(res => res.json())
                .then(res => {
                    btn_gravarPopup.setAttribute('data-idcolab', id)
                    c_nome.value = res.dados[0].nome
                    f_tipo.value = res.dados[0].tipo
                    f_status.value = res.dados[0].status
                    img_foto.src = res.dados[0].foto
                })
                fetch('telefones.php?id='+id,{method:'GET'})
                .then(res => res.json())
                .then(res => {
                   telefones.innerHTML = ""
                   res.dados.forEach(el => {
                    criarCxTelefone(el.numero, el.id, "e")
                   })
                })
                novoColaborador.classList.remove('ocultarPopup')
            })
            divC5.appendChild(img_edit)
    
            const img_remove = document.createElement('img')
            img_remove.setAttribute('src', '../../imgs/delete_.svg')
            img_remove.setAttribute('class', 'icone_op')
            divC5.appendChild(img_remove)
    
            dadosGrid.appendChild(divLinha)
        })
    })
}
todosColaboradores()

fetch('./tipos.php',{method:'GET'})
    .then(res => res.json())
    .then(res => {
        f_tipo.innerHTML = ""
        res.dados.forEach(e => {
            const opt = document.createElement("option")
            opt.setAttribute("value", e.tipo)
            opt.innerHTML = e.descricao
            f_tipo.appendChild(opt)
        })
})

btn_add.addEventListener('click', (evt) => {
    modoJanela = "n"
    document.getElementById('tituloPopup').innerHTML = "Adicionar Colaborador"
    novoColaborador.classList.remove('ocultarPopup')
    c_nome.value = "";
    f_tipo.value = "";
    f_status.value = "";
    f_foto.value = ""
    img_foto.setAttribute('src', '#')
    telefones.innerHTML = ""
})

btn_fecharPopup.addEventListener('click', (evt) => {
    novoColaborador.classList.add('ocultarPopup')
})

btn_gravarPopup.addEventListener('click', (evt) => {
    const tels = [...document.querySelectorAll('.novoTel')] //FONE
    let numTels = []
    tels.forEach(t => {
        numTels.push(t.innerHTML)
    })
    const dados = {
        id: evt.target.dataset.idcolab, 
        nome: c_nome.value,
        tipo: f_tipo.value,
        status: f_status.value,
        numTelefone: numTels,
        f_foto: img_foto.getAttribute('src')
    }

    let type =  modoJanela == "n" ? 'POST' : 'PUT'
    const headers = {
        method: type,
        body:JSON.stringify(dados),
    }
   
    fetch(endPoint, headers)
    .then(res=>{
        if (res.status == '200') {
            if (modoJanela == "n") {
                alert("Novo usuário gravado")
                c_nome.value = "";
                f_tipo.value = "";
                f_status.value = "";
                f_foto.value = ""
                img_foto.setAttribute('src', '#')
                telefones.innerHTML = ""
                todosColaboradores()
            } else {
                alert("Novo usuário editado")
            }
        } else {
            console.log('Erro ao gravar colaborador.')
        }
    })
    // novoColaborador.classList.add('ocultarPopup')
})

btn_cancelarPopup.addEventListener('click', (evt) => {
    novoColaborador.classList.add('ocultarPopup')
})

f_nome.addEventListener('keyup',(evt) => {
    if (evt.key == "Enter") {
        if (evt.target.value.length >= 8) {
            criarCxTelefone(evt.target.value, "-1", "n")
            evt.target.value = ""
        } else {
            alert('Número de telefone inválido')
        }
    }
})

const convert_imagem_b64 = (localDestino, arquivoimg) => {
    const obj = arquivoimg
    const reader = new FileReader()
    reader.addEventListener('load',(evt)=>{
        localDestino.src = reader.result
    })
    if (obj) {
        reader.readAsDataURL(obj)
    }
}

f_foto.addEventListener('change', (evt) => {
    convert_imagem_b64(img_foto, evt.target.files[0])
})