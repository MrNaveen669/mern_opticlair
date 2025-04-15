// const express = require("express");
// const { connection } = require("./Configs/db");
// const { userRouter } = require("./routes/user.routes");
// const { productRouter } = require("./routes/product.routes");
// const { cartRouter } = require("./routes/cart.routes");
// require("dotenv").config();
// const cors = require("cors");

// const app = express();
// app.use(
//   cors({
//     origin: "*",
//   })
// );

// app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Welcome Home Page");
// });

// app.use("/user", userRouter);
// app.use("/product", productRouter);
// app.use("/cart", cartRouter);

// app.listen(process.env.port, async () => {
//   try {
//     await connection;
//     console.log("Connected to the DB");
//   } catch (err) {
//     console.log("Trouble connecting to the DB");
//     console.log(err);
//   }
//   console.log(`Running at ${process.env.port} Port`);
// });
const express = require("express");
const { connection } = require("./Configs/db");
const { userRouter } = require("./routes/user.routes");
const { productRouter } = require("./routes/product.routes");
const { cartRouter } = require("./routes/cart.routes");
const wishlistRoutes = require('./routes/wishlist.routes');
 
const { sampleProductRouter } = require("./routes/sampleProduct.routes"); // Import sample product route
// const { logger } = require("./middlewares/logger");

require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
// app.use(logger); // Use logger middleware

// commented this part, since integrating a message with react causes file type mismatch (or sorts, I'm new to this)

// app.get("/", (req, res) => {
//     res.send("Welcome Home Page");
// });

// for serving the static files  (Although path needs to be checked.)
app.use(express.static(path.join(__dirname, "../frontend/build")));

// added path catch for all unrouted routes
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

app.use("/user", userRouter);
// app.use("/product", productRouter);
app.use("/cart", cartRouter);
app.use("/sampleproduct", sampleProductRouter);
app.use('/wishlist', wishlistRoutes);
 // Add route

app.listen(process.env.PORT, async () => {
    try {
        await connection;
        console.log("Connected to the DB");
    } catch (err) {
        console.log("Trouble connecting to the DB", err);
    }
    console.log(`Running at ${process.env.PORT} Port`);
});
