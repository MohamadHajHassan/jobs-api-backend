const register = (req, res) => {
    res.send("user registered!");
};
const login = (req, res) => {
    res.send("user logged in!");
};

module.exports = {
    register,
    login,
};
