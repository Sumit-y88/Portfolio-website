import express from "express";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";

const app = express();
const PORT = 5000;

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());

app.get("/download-resume", (req, res) => {
  const filePath = path.join(__dirname, "public", "SUMIT_YADAV.pdf");

  res.setHeader("Content-Disposition", "attachment; filename=SUMIT_YADAV.pdf");
  res.setHeader("Content-Type", "application/pdf");

  res.sendFile(filePath, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("File download failed");
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
