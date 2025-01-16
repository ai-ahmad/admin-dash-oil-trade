require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const cors = require("cors");
const path = require("path");





const ProductRouter = require("./routes/ProductRouter");
const AdminRouter = require("./routes/AdminRouter");
const NewsRouter = require("./routes/NewsRouter");
const ZayavkaRouter = require("./routes/ZayavkaRouter");
const BannerRouter = require("./routes/BannerRouter");
const OtzivRouter = require("./routes/OtzivRouter");
const CategoryRouter = require('./routes/CategoryRouter');
const AnnonsRouter = require('./routes/AnnosRouter');
const CursRouter = require('./routes/CursRouter');
const ZakazRouter = require('./routes/ZakazRouter');
const AboutRouter = require('./routes/AboutRouter');
const ContactRouter = require('./routes/ContactRouter');
const DastavkaRouter = require('./routes/DastavkaRouter');
const NewsCategoryRouter = require('./routes/NewsCategoryRouter');
const app = express();


// Connect to MongoDB
connectDB();
// Middleware setup
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));



// Route Setup
app.use('/api/v1/card', ProductRouter);
app.use('/api/v1/zayavka', ZayavkaRouter);
app.use('/api/v1/news-category', NewsCategoryRouter);
app.use('/api/v1/banner', BannerRouter);
app.use('/api/v1/admin', AdminRouter);
app.use('/api/v1/news', NewsRouter);
app.use('/api/v1/otziv', OtzivRouter);
app.use('/api/v1/category', CategoryRouter);
app.use('/api/v1/curs', CursRouter);
app.use('/api/v1/annons', AnnonsRouter);
app.use('/api/v1/about', AboutRouter);
app.use('/api/v1/contact', ContactRouter);
app.use('/api/v1/zakaz', ZakazRouter);
app.use('/api/v1/dastavka', DastavkaRouter);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
