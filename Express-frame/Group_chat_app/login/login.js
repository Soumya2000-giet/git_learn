const Express = require('express');
const router = Express.Router();
router.use(Express.urlencoded({ extended: true }))
router.get('/login', (req, res, next) => {
    try {
        res.send(`
            <form action="/" method="POST" onsubmit="localStorage.setItem('username', document.getElementById('username').value)">
                <input id="username" type="text" name="username" placeholder="Enter username">
                <button type="submit">Add</button>
            </form>
        `);
    } catch (error) {
        console.error(error);
    }
});

module.exports = router;
