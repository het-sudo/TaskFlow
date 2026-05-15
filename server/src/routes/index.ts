import { Router } from "express"
import { IRoute } from "./route.interface.js"
import { authRoute } from "../modules/auth/routes.js"

const rootRouter: Router = Router()

const moduleRoutes: IRoute[] = [authRoute]

moduleRoutes.forEach((route) => {
  rootRouter.use(route.path, route.router)
})

export default rootRouter
