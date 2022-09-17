import contacts from "./data.js";
import emojis from "./emoji.js";

class Message {
  constructor(message, sent) {
    this.message = message;
    this.sent = sent;
    this.hide = false;
    this.status = "Online";
    this.isRead = false;
    this.date = new Date();
  }
}

const app = new Vue({
  el: "#app",
  data: {
    darkmode: false,
    contacts,
    activeContact: {},
    userInput: "ciaioo",
    researchBarValue: "",
    researchResult: [],
    emojis,
    emojiKeyboard: false,
  },
  mounted() {
    setTimeout(() => {
       document.querySelector('.loader').classList.add('hide')
    }, 1000);
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.darkmode = !this.darkmode;
      document.body.classList.toggle('darkMode')
      document.getElementById('chat-view').classList.toggle('chatDark')
    }

    this.activeContact = this.contacts[0];
    this.researchResult = [...contacts];
  },
  methods: {    
    toggleDarkMode() {
      document.body.classList.toggle('darkMode')
      document.getElementById('chat-view').classList.toggle('chatDark')

    },

    getAnyOfLastMessage(contact, key) {
      let value = ""
      let index = this.getLastMessageIndex(contact);
      if (index !== undefined)
        value = contact.messages[index][key]
      
      return value
    },
    
    getLastMessage(contact) {
      let message = this.getAnyOfLastMessage(contact, 'message')
      
      if (message.length >= 30) {
        message = message.substring(0, 30);
        message += "...";
      }
      return message;
    },

    getLastMessageIndex(contact) {
      let messages = contact.messages
      let index = undefined;
      for (let i = messages.length - 1; i >= 0; i--) {
        if (!index && !messages[i].hide) {
          index = i
        }
      }

      return index;
    },

    getMessageHour: (message) => {
      const date = new Date(message.date);
      return `${date.getHours()}:${date.getMinutes()}`;
    },


    getLastMessageHour(contact) {
      let hour = ""
      let index = this.getLastMessageIndex(contact)
      
      if(index)
        hour = this.getMessageHour(contact.messages[index])
      
      return hour
      

    },


    sendMessage() {
      if (this.userInput) {
        const message = new Message(this.userInput, true);
        this.activeContact.messages.push(message);
        this.userInput = "";
        this.emojiKeyboard = false;
        this.scrollToBottom();
        this.getReply(this.activeContact);
      }
    },
    getReply(contact) {
      const randReply = [
        "ok😅",
        "va bene😋",
        "ottimo👍",
        "non vedo l'ora😍",
        "certo! 🤗",
        "grazie 1000! 😅",
      ];
      const randomNumber = Math.floor(Math.random() * (randReply.length - 1));

      setTimeout(() => {
        const replier = contact;
        replier.status = "Sta scrivendo...";
        replier.messages[replier.messages.length - 1].isRead = true;
        setTimeout(() => {
          const message = new Message(randReply[randomNumber], false);
          contact.messages.push(message);
          this.scrollToBottom();
          contact.status = "Online";
        }, 2000);
      }, 1000);
    },

    makeResearch() {
      this.researchBarValue = this.researchBarValue.trimStart();
      if (this.researchBarValue === "") {
        this.researchResult = [...contacts];
        return false;
      }
      const researched = [];

      this.contacts.forEach((value, index, array) => {
        let { name } = value;
        const fullnames = name.split(" ");
        let check = false;

        fullnames.forEach((fullnames) => {
          fullnames = fullnames.toLowerCase();
          const researchString = this.researchBarValue.toLowerCase();
          name = name.toLowerCase();
          if (
            fullnames.startsWith(researchString, 0) ||
            (name.startsWith(researchString) && !check)
          ) {
            check = true;
            researched.push(value);
          }
        });
      });

      this.researchResult = [...researched];
    },

    scrollToBottom() {
      const messages = document.querySelector(".messages");
     
      messages.scrollTop += messages.scrollHeight - messages.offsetHeight + 100;

    },
  },
});
