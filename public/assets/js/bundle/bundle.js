/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var chatButton = document.getElementById('contact-chat');
	var chatWindow = document.getElementsByClassName('main-chat-window')[0];
	var chatBox = document.getElementsByClassName('chat-box')[0];
	var sendButton = document.getElementById('send-to-bot');
	var typingIndicator = document.getElementsByClassName('typing-indicator')[0];
	var userInputField = document.getElementById('user-message');

	function validateEmail(email) {
	    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test(email);
	}

	var xhr = new XMLHttpRequest();

	var dataToSend = {};

	var Chat = function () {
	    function Chat() {
	        _classCallCheck(this, Chat);

	        this.sentMessages = 0;
	    }

	    _createClass(Chat, [{
	        key: 'startChat',
	        value: function startChat() {
	            chatWindow.classList.remove('hidden');
	            chatWindow.classList.add('show-chat');
	            this.sendMessage('Hello, what is your name?');
	        }
	    }, {
	        key: 'sendMessage',
	        value: function sendMessage(answer) {
	            var botAnswer = document.createElement('div');
	            botAnswer.className = 'bot-message fadein';
	            botAnswer.innerHTML = answer;
	            if (this.sentMessages == 1) {
	                botAnswer.innerHTML = 'Great! Nice to meet you, ' + answer + '! <br> Leave me your e-mail, please!';
	                dataToSend.name = answer;
	            } else if (this.sentMessages == 2) {
	                if (validateEmail(answer)) {

	                    dataToSend.email = answer;

	                    var data = JSON.stringify(dataToSend);

	                    xhr.onreadystatechange = function () {
	                        if (xhr.readyState == 4 && xhr.status == 200) {
	                            botAnswer.innerHTML = 'Thank you! I will contact you as soon as I can!';
	                        }
	                    };

	                    xhr.open('POST', '/send-message', true);
	                    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

	                    xhr.send(data);
	                } else {
	                    botAnswer.innerHTML = 'Hey, leave me valid e-mail please ! :)';
	                    this.sentMessages--;
	                }
	            } else if (this.sentMessages > 2) {
	                botAnswer.innerHTML = 'Good luck! Maybe later I will tell you some jokes 😅';
	            }
	            chatWindow.scrollTop = chatWindow.scrollHeight;
	            this.sentMessages++;
	            chatBox.appendChild(botAnswer);
	        }
	    }, {
	        key: 'receiveMessage',
	        value: function receiveMessage(message) {
	            var userMessage = document.createElement('div');
	            userMessage.className = 'user-message user-fadein';
	            userMessage.innerHTML = message;
	            chatBox.appendChild(userMessage);
	            userInputField.value = '';
	            this.sendMessage(message);
	        }
	    }]);

	    return Chat;
	}();

	var MainChat = new Chat();

	chatButton.addEventListener('click', function () {
	    chatButton.style.display = 'none';
	    MainChat.startChat();
	});

	sendButton.addEventListener('click', function () {
	    MainChat.receiveMessage(userInputField.value);
	});

	userInputField.addEventListener('keyup', function (e) {
	    if (e.keyCode == 13) {
	        var userMessage = document.getElementById('user-message').value;
	        MainChat.receiveMessage(userInputField.value);
	    }
	});

/***/ }
/******/ ]);