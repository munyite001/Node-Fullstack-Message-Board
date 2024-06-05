const { body } = require("express-validator");

//  Message Modal 
const messageModal = document.querySelector('.message-modal-overlay')

//  Open the message modal
document.querySelector('.message-btn').addEventListener('click', () => {
    messageModal.classList.add("show-modal")
})

//  Close the message modal
document.querySelector('.close-message-modal').addEventListener('click', () => {
    messageModal.classList.remove("show-modal")
})