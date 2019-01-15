const responses = [
    "I'm here to help, try typing !ty help"
]

export const teaching = [
    (session) => {
        session.send(`${responses[Math.floor(Math.random() * responses.length)]}`)
    }
]