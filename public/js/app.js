let htmlFormElement = document.querySelector('form');
const weatherForm = htmlFormElement;
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

//messageOne.textContent = 'from javascript';

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;
    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent = data.error;
                messageTwo.textContent = '';
            }
            else    {
                messageOne.textContent = data[0].location;
                messageTwo.textContent = data[0].forecast;

            }
        })
    })
})