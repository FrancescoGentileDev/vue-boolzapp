import contacts from './data.js';

const app = new Vue({
    el: "#app",
    data: {
        contacts,
        activeContact: 0
    },
    methods: {
        getMessageHour: (message) => {
            const date = new Date(message.date);
            return `${date.getHours()}:${date.getMinutes()}`
        }
    },
})