import { Request, Response, Router } from "express";
import productController from "@/controllers/product.controller";

const routes = Router()

routes.post("/api/products", productController.create);
routes.get("/api/products", productController.findAll);
routes.get("/api/products/:id", productController.findById);
routes.put("/api/products/:id", productController.update);
routes.delete("/api/products/:id", productController.delete);


routes.get("*", (_: Request, response: Response) => {
  response.status(404).send({
    error: "Not Found"
  })
})

export default routes
