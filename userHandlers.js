const database = require("./db");

// -----------------------------------------------------------------------
// GET (read)
const getUsers = (req, res) => {
    database
        .query("select * from users")
        .then(([users]) => {
            res.json(users);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Error retrieving data from database");
        });
};

const getUserById = (req, res) => {
    const id = parseInt(req.params.id);
    database
        .query("SELECT * from users WHERE id = ?", [id])
        .then(([users]) => {
            if (users[0] != null) {
                res.json(users[0]);
            } else {
                res.status(404).send("Not Found");
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Error retrieving data from database");
        });
};

// -----------------------------------------------------------------------
// POST (create)
const postUser = (req, res) => {
    const { firstname, lastname, email, city, language } = req.body;
    database
        .query(`INSERT INTO users (firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)`
            , [firstname, lastname, email, city, language])
        .then(([result]) => {
            res.location(`/api/users/${result.insertId}`).sendStatus(201);
        })
        .catch((err) => {
            res.status(500).send("Error inserting user into database");
        });
}

// -----------------------------------------------------------------------
// PUT (update)
const putUser = (req, res) => {
    const id = parseInt(req.params.id);
    const { firstname, lastname, email, city, language } = req.body;
    database
        .query("UPDATE users SET firstname = ?, lastname = ?, email = ?, city = ?, language = ? WHERE id = ?", [firstname, lastname, email, city, language, id]
        )
        .then(([result]) => {
            res.location(`/api/users/${result.insertId}`).sendStatus(201);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Error updating the user");
        });
};

// -----------------------------------------------------------------------
// DELETE (delete)
const deleteUser =(req, res) => {
    const id = parseInt(req.params.id);

    database
    .query('DELETE FROM users WHERE id = ?', [id])
    .then(([result]) => {
        if (result.affectedRows === 0) {
            res.status(404).send("Not found")
        } else {
            res.status(204);
        }
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send("Error while deleting user: " + err.message)
    });
}

module.exports = {
    getUsers,
    getUserById,
    postUser,
    putUser,
    deleteUser,
};
