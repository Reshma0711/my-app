const express = require("express");
const app = express();
const { dbConnect } = require("./db/dbconnect");
dbConnect();
const dotenv = require("dotenv");
const { postData, getData } = require("./controllers/multer");
dotenv.config();
const cors = require("cors");
const port = process.env.PORT;

const userRouter = require("./routes/user");
const productRouter = require("../server/routes/products");
const cartRouter = require("../server/routes/cart");
const { createOrder, verifyCapture } = require("./controllers/order");


app.use(express.json());
app.use(cors());

const multer = require("multer");
const fs = require("fs");
const { verifyToken } = require("./middlewares/authmiddleware");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = "uploads/"; // Use relative path
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.array("files"), postData);
// in the above array what we give the name we should give
//  same name while uploading through form data

app.use("/uploads", express.static("uploads"));
// If I dont give this line image is not displayed on the screen
//Without this, the browser cannot access images stored in the backend.

app.get("/gallery", getData);

app.use("/", userRouter);

app.use("/", productRouter);

app.use("/cart", cartRouter);

app.post("/create-order",verifyToken, createOrder);

app.post("/verify-capture", verifyCapture);

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
