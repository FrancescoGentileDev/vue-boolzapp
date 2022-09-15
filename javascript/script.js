import contacts from './data.js';


class Message {
    constructor(message, sent) {
        this.message = message;
        this.sent = sent;
        this.date = new Date()
    }
}

const app = new Vue({
    el: "#app",
    data: {
        contacts,
        activeContact: 0,
        userInput: "",
    },
    methods: {
        getMessageHour: (message) => {
            const date = new Date(message.date);
            return `${date.getHours()}:${date.getMinutes()}`
        },
        getSelected(index) {
           return (this.activeContact === index) ? "selected" : ""
        },

        sendMessage() {
            const message = new Message(this.userInput, true);
            this.contacts[this.activeContact].messages.push(message)
            this.userInput = ""
            this.getReply(this.activeContact)
        },
        getReply(contact) {

            const randReply = ["ok😅", "va bene😋", 'ottimo👍', "non vedo l'ora😍", 'certo! 🤗', 'grazie 1000! 😅']
            const randomNumber = Math.floor(Math.random() * (randReply.length - 1))
            setTimeout(() => {
            const message = new Message(randReply[randomNumber], false);
            this.contacts[contact].messages.push(message)
            }, 2000);
        },
    },
})