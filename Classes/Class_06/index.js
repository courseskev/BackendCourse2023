import { log } from 'console'
import http from 'http'
const server = http.createServer()
server.listen(8080, ()=>{
    console.log("Listennig 8080 port");
})