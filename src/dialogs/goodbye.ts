const responses = [
    "Later",
    "See ya dude",
    "Goodbye",
    "Au revoir :)"
]

export const goodbye = [
    (session) => {
        session.send(`${responses[Math.floor(Math.random() * responses.length)]}`)
    }
]