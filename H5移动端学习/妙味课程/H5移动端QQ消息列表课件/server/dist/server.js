"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const users_1 = require("./users");
const message_1 = require("./message");
const app = express();
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});
app.get('/', (req, res) => {
    let n = req.query.n || 20;
    n = Number(n);
    let newMessage = message_1.default.sort(() => {
        return Math.random() - 0.5;
    }).filter((data, index) => {
        if (index < n) {
            return true;
        }
    });
    let newUsers = users_1.default.sort(() => {
        return Math.random() - 0.5;
    }).filter((user, index) => {
        if (index < n) {
            return true;
        }
    }).map((user, index) => {
        return {
            username: user,
            avatar: 'img/avatar/avatar' + (Math.round(Math.random() * 7)) + '.jpg',
            new_message: newMessage[index],
            message_number: Math.floor(Math.random() * 100),
            date_time: Date.now() - (Math.random() * 10000000000),
        };
    }).sort((a, b) => {
        return b.date_time - a.date_time;
    });
    res.send(JSON.stringify(newUsers));
});
app.listen(8888);
//# sourceMappingURL=server.js.map