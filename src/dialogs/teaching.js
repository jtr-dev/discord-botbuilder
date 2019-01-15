const responses = [
    "I'm here to help, try typing !ty help"
]

module.exports = function (session) {
    session.send(`${responses[Math.floor(Math.random() * responses.length)]}`)
}