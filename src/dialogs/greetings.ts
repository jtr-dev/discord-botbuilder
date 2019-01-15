const responses = [
    "Hey, how's it going",
    "Hello! Hope you're having a good day!",
]

export const greetings = [
    (session) => {
        session.send(`${responses[Math.floor(Math.random() * responses.length)]}`)
    }
]