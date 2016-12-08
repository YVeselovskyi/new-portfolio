'use strict';

const chatButton = document.getElementById('contact-chat');
const chatWindow = document.getElementsByClassName('main-chat-window')[0];
const chatBox = document.getElementsByClassName('chat-box')[0];
const sendButton = document.getElementById('send-to-bot');
const typingIndicator = document.getElementsByClassName('typing-indicator')[0];
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

class Chat{
    constructor(){
        this.sentMessages = 0;
    }
    startChat(){
        chatWindow.classList.remove('hidden');
        chatWindow.classList.add('show-chat');
        this.sendMessage('Hello, what is your name?');
    }
    sendMessage(answer){
        let botAnswer = document.createElement('div');
        botAnswer.className = 'bot-message fadein';
        botAnswer.innerHTML = answer;
        if(this.sentMessages == 1){
            botAnswer.innerHTML = `Great! Nice to meet you, ${answer}! <br> Leave me your e-mail, please!`;
        } else if(this.sentMessages == 2){
            if(validateEmail(answer)){
                botAnswer.innerHTML = `Thank you! I will contact you as soon as I can!`;
            } else {
                botAnswer.innerHTML = `Hey, leave me valid e-mail please ! :)`;
                this.sentMessages--;
            }
        }
        this.sentMessages++;
        chatBox.appendChild(botAnswer);
    }

    receiveMessage(message){
        let userMessage = document.createElement('div');
        userMessage.className = 'user-message user-fadein';
        userMessage.innerHTML = message;
        chatBox.appendChild(userMessage);
        this.sendMessage(message);
    }
}

const MainChat = new Chat();

chatButton.addEventListener('click' , function () {
    MainChat.startChat();
});

sendButton.addEventListener('click' , function () {
    let userMessage = document.getElementById('user-message').value;
    MainChat.receiveMessage(userMessage);
});