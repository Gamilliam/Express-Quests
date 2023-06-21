const argon2 = require("argon2");

const hashPassword = async (req, res, next) => {
    argon2
    .hash(req.body.password, {
        type: argon2.argon2id,
        memoryCost: 2 ** 16,
        hashLength: 50,
        secret: Buffer.from('mysecret'),
        timeCost: 5,
        // default parallelism is 4 so minimum config is okay
    })
    .then((hashPassword) => {
        console.log(hashedPassword);
        delete req.body.password;
        next();
    })
    .catch((err) => {
        console.error(err);
        res.sendStatus(500);
    });
};

module.exports = {
    hashPassword,
};