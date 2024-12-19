import authRoute from "./routes/authRoute.js"
import categoryRoute from "./routes/categoryRoute.js"
import productRoute from "./routes/productRoute.js"
import cors from "cors"
import express, {json} from "express"
import morgan from "morgan";

const app = express();

app.use(json());
app.use(morgan('dev'));
app.use(cors());
app.use("/api/v1/auth",authRoute)
app.use("/api/v1/category",categoryRoute)
app.use("/api/v1/product",productRoute)

export default app;