import Modal from './modal.js'

const modal = Modal()

const modalTitle = document.querySelector('.modal h2')
const modalDescrition = document.querySelector('.modal p')
const modalButton = document.querySelector('.modal button')

//quando o botão 'marcar como lida' for clicado, a modal abrirá
const checkButtons = document.querySelectorAll('.actions a.check')
checkButtons.forEach(button => button.addEventListener('click', handleClick))

//quando o botão 'excluir' for clicado, a modal abrirá

const deleteButtons = document.querySelectorAll('.actions a.delete')

deleteButtons.forEach(button =>
  button.addEventListener('click', event => handleClick(event, false))
)

function handleClick(event, check = true) {
  event.preventDefault()
  const text = check ? 'Marcar como lida' : 'Excluir'
  const slug = check ? 'check' : 'delete'
  const roomId = document.querySelector('#room-id').dataset.id
  const question = event.target.dataset.id

  const form = document.querySelector('.modal form')
  form.setAttribute('action', `/question/${roomId}/${question}/${slug}`)

  modalTitle.innerHTML = `${text} esta pergunta`
  modalDescrition.innerHTML = `Tem certeza que deseja ${text.toLowerCase()} esta pergunta?`
  modalButton.innerHTML = `Sim, ${text.toLowerCase()}`
  check ? modalButton.classList.remove('red') : modalButton.classList.add('red')

  modal.open()
}
