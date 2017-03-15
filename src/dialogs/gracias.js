
const responses = [
    "You're Welcome!",
    "Glad to help",
]

module.exports = function (session){
    session.send(`${responses[Math.floor(Math.random() * responses.length)]}`)
}