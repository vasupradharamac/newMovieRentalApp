const app=require('./app')


// running a http server like this helps to make other connections
// socket-io for ex....easier to do
const http=require('http')

const PORT=process.env.PORT||5000

const server=http.createServer(app)

async function startServer(){
    server.listen(PORT,()=>{
        console.log(`Listening on port ${PORT}`)
    })
}
startServer()

