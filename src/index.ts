import { app } from "./app"
import { register } from "./endpoints/register"
import { getProductById } from "./endpoints/getProductById"
import { getProductByName } from "./endpoints/getProductByName"
import { getProductByTag } from "./endpoints/getProductByTag"

app.post("/register", register)
app.get("/product/id/:id", getProductById)
app.get("/product/name/:name", getProductByName)
app.get("/product/tag/:tag", getProductByTag)