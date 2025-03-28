const express = require("express");
const cors = require("cors");
const { PORT } = require("./config/config");
const weatherRoutes = require("./routes/weatherRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", weatherRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
