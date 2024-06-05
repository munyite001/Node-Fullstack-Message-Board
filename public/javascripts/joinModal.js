//  Join Modal 
const joinModal = document.querySelector('.join-modal-overlay')

console.log(joinModal)

//  Open the join modal
document.querySelector('.join-btn').addEventListener('click', () => {
    joinModal.classList.add("show-modal")
})

//  Close the message modal
document.querySelector('.close-join-modal').addEventListener('click', () => {
    joinModal.classList.remove("show-modal")
})