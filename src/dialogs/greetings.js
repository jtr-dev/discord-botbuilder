const responses = [
    "Hey, how's it going",
    "Hello! Hope you're having a good day!",
]

module.exports = function (session){
    session.send(`${responses[Math.floor(Math.random() * responses.length)]}`)
}