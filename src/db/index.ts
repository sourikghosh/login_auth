// //for client checkout
// ; (async () => {
//     const client = await pool.connect()
//     try {
//         const res = await client.query('select * from registration')
//         console.log(res.rows[0])
//     }
//     finally {
//         // Make sure to release the client before any error handling,
//         // just in case the error handling itself throws an error.
//         client.release()
//     }
// })()
//     .catch(err => console.log(err.stack))
// //single query recommended
// ; (async () => {
//     const { rows } = await pool.query('SELECT * FROM registration')
//     console.log('user:', rows[0])
// })().catch(err =>
//     setImmediate(() => {
//         console.log(err)
//     })
// )

