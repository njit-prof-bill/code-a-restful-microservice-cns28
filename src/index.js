const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// **************************************************************
// Put your implementation here
// If necessary to add imports, please do so in the section above

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// POST
let users = []
let id_unq = 1
app.post('/users', (req, res) => {
    const {name, email} = req.body
    if (!name || !email) {
        return res.status(400).send({error: 'Name/email required'});
    }
    const new_user = {id: id_unq++, name, email};
    users.push(new_user);
    res.status(201).json(new_user);
});

// GET
app.get('/users/:id', (req, res) => {
    const user_id = parseInt(req.params.id)
    const user = users.find(u => u.id === user_id);

    if (!user) {
        return res.status(404).send({ error: 'User not found' });
    }
    res.json(user);
});

// PUT
app.put('/users/:id', (req, res) => {
    const user_id = parseInt(req.params.id);
    const { name, email } = req.body;
    const user = users.find(u => u.id === user_id);

    if (!user) {
        return res.status(404).send({ error: 'User not found' });
    }

    if (!name || !email) {
        return res.status(400).send({ error: 'Name/email required' });
    }
    user.name = name;
    user.email = email;

    res.json(user);
});

// DELETE
app.delete('/users/:id', (req, res) => {
    const user_id = parseInt(req.params.id);
    const user_index = users.findIndex(u => u.id === user_id);

    if (user_index === -1) {
        return res.status(404).send({ error: 'User not found' });
    }

    users.splice(user_index, 1);

    res.status(204).send();
});

// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing