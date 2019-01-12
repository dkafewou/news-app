import express from "express"
import http from "http"
import socketIO from "socket.io"
import cors from "cors"
import v1 from "./routes/v1"
import { UnauthorizedError } from "./errors"
import { onError } from "./handlers/JSONErrorHandler"
import Config from "./helpers/Config"

const PORT = Config.shared.requireProduction("PORT", "8080")
const CORS_HOST = Config.shared.requireProduction("CORS_HOST", "http://localhost:9090")

// Verify config
Config.shared.verify()

const app = express()

// Set up CORS
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || (origin === CORS_HOST)) {
      callback(null, true)
    } else {
      callback(new UnauthorizedError("Not allowed by CORS"))
    }
  }
}
app.use(cors(corsOptions))
app.options("*", cors(corsOptions))

// Set up router
app.use("/v1", v1)

// Handle error
app.use(onError)

const server = http.createServer(app)
const io = socketIO(server)

// Listen and serve
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
