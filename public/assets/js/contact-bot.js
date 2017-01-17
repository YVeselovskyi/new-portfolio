'use strict';

const chatButton = document.getElementById('contact-chat');
const chatWindow = document.getElementsByClassName('main-chat-window')[0];
const chatBox = document.getElementsByClassName('chat-box')[0];
const sendButton = document.getElementById('send-to-bot');
const typingIndicator = document.getElementsByClassName('typing-indicator')[0];
const userInputField = document.getElementById('user-message');

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

const xhr = new XMLHttpRequest();

let dataToSend = {};

class Chat {
    constructor() {
        this.sentMessages = 0;
    }
    startChat() {
        chatWindow.classList.remove('hidden');
        chatWindow.classList.add('show-chat');
        this.sendMessage('Hello, what is your name?');
    }
    sendMessage(answer) {
        let botAnswer = document.createElement('div');
        botAnswer.className = 'bot-message fadein';
        botAnswer.innerHTML = answer;
        if (this.sentMessages == 1) {
            botAnswer.innerHTML = `Great! Nice to meet you, ${answer}! <br> Leave me your e-mail, please!`;
            dataToSend.name = answer;
        } else if (this.sentMessages == 2) {
            if (validateEmail(answer)) {

                dataToSend.email = answer;

                let data = JSON.stringify(dataToSend);

                xhr.onreadystatechange = function() {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        botAnswer.innerHTML = `Thank you! I will contact you as soon as I can!`;
                    }
                };

                xhr.open('POST', '/send-message', true);
                xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

                xhr.send(data);

            } else {
                botAnswer.innerHTML = `Hey, leave me valid e-mail please ! :)`;
                this.sentMessages--;
            }
        } else if (this.sentMessages > 2) {
            botAnswer.innerHTML = 'Good luck! Maybe later I will tell you some jokes 😅';
        }
        this.sentMessages++;
        chatBox.appendChild(botAnswer);
    }

    receiveMessage(message) {
        let userMessage = document.createElement('div');
        userMessage.className = 'user-message user-fadein';
        userMessage.innerHTML = message;
        chatBox.appendChild(userMessage);
        userInputField.value = '';
        this.sendMessage(message);
    }
}

const MainChat = new Chat();

chatButton.addEventListener('click', function() {
    chatButton.style.display = 'none';
    MainChat.startChat();
});

sendButton.addEventListener('click', function() {
    MainChat.receiveMessage(userInputField.value);
});


userInputField.addEventListener('keyup', function(e) {
    if (e.keyCode == 13) {
        let userMessage = document.getElementById('user-message').value;
        MainChat.receiveMessage(userInputField.value);
    }
})
