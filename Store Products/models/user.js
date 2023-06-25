let users = [];

module.exports = {
    User: (email, pass) => ({
        id: new Date().getTime(), token: '', email: email, password: pass
    }),

    getByEmail: (email) => users.find(user => user.email === email),
    getById: (id) => users.find(user => user.id === id),
    create: (user) => users.push(user),
    setToken: (id, token) => users.forEach(it => {if(it.id === id) it.token = token})
}