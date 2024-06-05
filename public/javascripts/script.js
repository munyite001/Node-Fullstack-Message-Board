const inputs = document.querySelectorAll(".form-container .input-box input")

//  move the input labels topside, if the input value has content
inputs.forEach((input) => {
    input.addEventListener('input', (e) => {
    const label = e.currentTarget.parentElement.querySelector('span')
    if (input.value != '')
    {
        label.classList.add('active');
    }
    else
    {
        label.classList.remove('active');
    }
    })
})


//  move the input labels topside when the page reloads
window.addEventListener('load', () => {
    inputs.forEach((input) => {
        const label = input.parentElement.querySelector('span')
        if (input.value != '')
        {
            label.classList.add('active');
        }
        else
        {
            label.classList.remove('active');
        }
    })
})


// // Dynamically load the messages
// document.addEventListener('DOMContentLoaded', function() {
//     fetch("/app/messages")
//     .then(response => response.json())
//     .then(messages => {
//         const messageContainer = document.querySelector(".message-container")
//         messages.forEach((message) => {
//             const messageElement = document.createElement('div');
//             messageElement.classList.add('message');
//             messageElement.innerHTML = `
//             <p>${message.message}</p>
//             <small>Posted by ${message.author.username} on ${new Date(message.timestamp).toLocaleString()}</small>
//         `;
//         messageContainer.appendChild(messageElement);
//         })
//     })
//     .catch((err) => console.log(`Error fetching messages: ${err}`))
// })
