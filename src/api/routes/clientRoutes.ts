import { Router } from 'express'
const routes = Router()

routes.get('/', async (req, res) => { res.redirect('/login') })
routes.get('/signup', async (req, res) => { res.render('signup') })
routes.get('/login', async (req, res) => { res.render('login') })
routes.get('/dashboard', async (req, res) => { res.render('dashboard', { User: "default" }) })
routes.get('/err', async (req, res) => { res.render('error', { status: '404', msg: 'not found' }) })

export default routes