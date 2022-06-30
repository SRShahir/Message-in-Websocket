require('./bootstrap');
const axios = require('axios');

const form = document.getElementById('form');
const inputMessage = document.getElementById('input-message');
const listMessages = document.getElementById('list-messages');
form.addEventListener('submit', function (SubmitEvent) {
    e.preventDefault();
    const userInput = inputMessage.value;

    axios.post('chat-messages', {
        message: userInput
    })

});

function getCookies(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts.pop().split(';').shift();
    }
}

function request( options) {
    const csrfToken = getCookies('XSRF_TOKEN');
    return fetch({
        headers: {
            'content-type': 'application/json',
            'accept': 'application/json',
            'X-XSRF-TOKEN': decodeURIComponent(csrfToken),
        },
        credentials: 'include',
        ...options,
    })
}

function logout() {
    return request('logout', {
        method: 'POST',
    });
}

function login() {
    return request('login', {
        method: 'POST',
        body: JSON.stringify({
            email: 'shreya@example.com',
            password: 'password'
        })
    })
}
fetch('/sanctum/csrf-cookie', {
    headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
    },
    credentials: 'include'
}).then(() => logout())
    .then(() => {
        return login();
    }).then(() => {

        const channel = Echo.private('private.chat.1');


        channel.subscribed(() => {
            console.log('subscribedd!');
        })
            .listen('chat-message', (event) => {
                console.log(event);
                const message = event.message;
                const li = document.createElement('li');
                li.innerText = message;
                listMessages.append(li);
            });

    })


