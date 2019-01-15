const responses = [
    "You're Welcome!",
    "Glad to help",
]

export const gracias = [
    (session) => {
        session.send(`${responses[Math.floor(Math.random() * responses.length)]}`)
    }
]