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