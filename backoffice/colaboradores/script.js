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

const endPoint = `./todos.php`

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
        divC5.innerHTML = 'Ações'
        divLinha.appendChild(divC5)

        dadosGrid.appendChild(divLinha)
    })
})

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
    novoColaborador.classList.remove('ocultarPopup')
})

btn_fecharPopup.addEventListener('click', (evt) => {
    novoColaborador.classList.add('ocultarPopup')
})

btn_gravarPopup.addEventListener('click', (evt) => {
    const tels = [...document.querySelectorAll('.numTel')]
    let numTels = []
    tels.forEach(t => {
        numTels.push(t.innerHTML)
    })

    const dados = {
        nome: c_nome.value,
        tipo: f_tipo.value,
        status: f_status.value,
        numTelefone: numTels,
        f_foto: img_foto.getAttribute('src')
    }

    const headers = {
        method:'POST',
        body:JSON.stringify(dados),
    }
   
    fetch(endPoint, headers)
    .then(res=>{
        if (res.status == '200') {
            alert("Novo usuário gravado")
            c_nome.value = "";
            f_tipo.value = "";
            f_status.value = "";
            telefones.innerHTML = "" //202-5:00

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
            const divTel = document.createElement('div')
            divTel.setAttribute('class', 'tel')
    
            const numTel = document.createElement('div')
            numTel.setAttribute('class', 'numTel')
            numTel.innerHTML = evt.target.value
            divTel.appendChild(numTel)
    
            const delTel = document.createElement('img')
            delTel.setAttribute('src', '../../imgs/delete_.svg')
            delTel.setAttribute('class', 'delTel')
            delTel.addEventListener('click', (evt) => {
                console.log(evt.target)
            })
            divTel.appendChild(delTel)
    
            telefones.appendChild(divTel)
    
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