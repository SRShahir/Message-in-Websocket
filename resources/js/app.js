require('./bootstrap');
const  axios = require('axios');

const form = document.getElementById('form');
const inputMessage = document.getElementById('input-message');
const listMessages = document.getElementById('list-messages');
form.addEventListener('submit', function (SubmitEvent) {
    e.preventDefault();
    const userInput = inputMessage.value;

    axios.post('/chat-messages', {
        message: userInput
    })

});
const channel = Echo.channel('public.chat.1');


channel.subscribed(() => {
    console.log('subscribedd! test');
})
    .listen('list-message', (event) => {
        console.log(event);
        const message = event.message;

    const li = document.createElement('li');
    li.innerText = message;
    listMessages.appendChild(li);
});
