import restify from 'restify'
import im from 'is-master'
import routes from './routes'

process.on('unhandledRejection', error => console.error('unhandledRejection error: ', error))

const app = restify.createServer()

if (process.env.NODE_ENV !== 'test') {
  im.start()
}

app.get(
  /\/dist\/(.*)?.*/,
  restify.plugins.serveStatic({
    directory: './dist',
    appendRequestPath: false
  })
)

app.use(restify.plugins.acceptParser(app.acceptable))
app.use(restify.plugins.queryParser({ mapParams: true }))
app.use(restify.plugins.bodyParser({ mapParams: false }))
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  return next()
})

routes(app)

if (process.env.APIPORT) {
  app.listen(process.env.APIPORT, err => {
    if (err) {
      console.error(err)
    }
    console.info('----\n==> 🌎  API is running on port %s', process.env.APIPORT)
    console.info(
      '==> 💻  Send requests to http://localhost:%s',
      process.env.APIPORT
    )
  })
} else {
  console.error(
    '==>     ERROR: No APIPORT environment variable has been specified'
  )
}

export default app
