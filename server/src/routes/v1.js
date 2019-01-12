import express from "express"
import bodyParser from "body-parser"
import ArticlesHandler from "../handlers/ArticlesHandler"

const router = express.Router()

// Middleware
router.use(bodyParser.json())

/*
 * Routes
 */

router.route("/articles")
  .get(ArticlesHandler.onGet)

export default router
