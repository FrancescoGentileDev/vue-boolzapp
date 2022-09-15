import contacts from './data.js';

const app = new Vue({
    el: "#app",
    data: {
        contacts,
        activeContact: 0
    },
    methods: {
    },
})