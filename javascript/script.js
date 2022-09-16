import contacts from "./data.js";

class Message {
  constructor(message, sent) {
    this.message = message;
    this.sent = sent;
    this.status = "Online";
    this.isRead = false;
    this.date = new Date();
  }
}

const app = new Vue({
  el: "#app",
  data: {
    contacts,
    activeContact: 0,
    userInput: "",
    researchBarValue: "",
    researchResult: [],
  },
  mounted() {
    this.activeContact = this.contacts[0];
    this.researchResult = [...contacts];
  },
  methods: {
    getLastMessage(contact) {
      let message = "";
      message = contact.messages[contact.messages.length - 1].message;
      if (message.length >= 60) {
        message = message.substring(0, 60);
        message += "...";
      }

      return message;
    },

    getMessageHour: (message) => {
      const date = new Date(message.date);
      return `${date.getHours()}:${date.getMinutes()}`;
    },
    getSelected(index) {
      return this.activeContact === index ? "selected" : "";
    },

    makeResearch() {
      this.researchBarValue = this.researchBarValue.trimStart()
      if (this.researchBarValue === "") {
        this.researchResult = [...contacts]
        return false
      }
      const researched = [];

      this.contacts.forEach((value, index, array) => {
        let { name } = value;
        const fullnames = name.split(" ");
        let check = false;

        fullnames.forEach((fullnames) => {
          fullnames = fullnames.toLowerCase();
          const researchString = this.researchBarValue.toLowerCase();
          name = name.toLowerCase()
          if (fullnames.startsWith(researchString, 0)|| name.startsWith(researchString) && !check) {
            check = true
            researched.push(value);
          }

        });


      });

      this.researchResult = [...researched];
    },
    sendMessage() {
      const message = new Message(this.userInput, true);
      this.contacts[this.activeContact].messages.push(message);
      this.userInput = "";
      this.scrollToBottom();
      this.getReply(this.activeContact);
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
        const replier = this.contacts[contact];
        replier.status = "Sta scrivendo...";
        replier.messages[replier.messages.length - 1].isRead = true;
        setTimeout(() => {
          const message = new Message(randReply[randomNumber], false);
          this.contacts[contact].messages.push(message);
          this.scrollToBottom();
          this.contacts[contact].status = "Online";
        }, 3000);
      }, 1000);
    },
    scrollToBottom() {
      const messages = document.querySelector(".messages");
      console.log(messages.scrollHeight, messages.scrollTop, messages.offsetHeight);
      messages.scrollTop += messages.scrollHeight - messages.offsetHeight + 100;
      console.log(messages.scrollHeight, messages.scrollTop);
    },
  },
});
