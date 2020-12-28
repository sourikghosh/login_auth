import redis from 'redis'

const client = redis.createClient({
    host: process.env.R_HOST,
    port: +process.env.R_PORT!,
    password: process.env.R_PASSWORD
})

client.on('connect', () => {
    console.log('Client connected to redis...')
})

client.on('ready', () => {
    console.log('Client connected to redis and ready to use...')
})

client.on('error', (err) => {
    console.log(err.message)
})

client.on('end', () => {
    console.log('Client disconnected from redis')
})

export default client