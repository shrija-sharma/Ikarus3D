import express from "express";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 5000;

// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Ensure models directory exists
const MODELS_DIR = path.join(__dirname, "public", "models");
if (!fs.existsSync(MODELS_DIR)) {
  fs.mkdirSync(MODELS_DIR, { recursive: true });
}

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: MODELS_DIR,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

// Get all models
app.get("/models", (req, res) => {
  fs.readdir(MODELS_DIR, (err, files) => {
    if (err) return res.status(500).json({ error: "Failed to read models" });
    res.json(files.map((file) => ({ name: file, path: `/models/${file}` })));
  });
});

// Upload model
app.post("/upload", upload.single("model"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  res.json({ message: "Model uploaded successfully", path: `/models/${req.file.filename}` });
});

// Delete model
app.delete("/models/:name", (req, res) => {
  const modelPath = path.join(MODELS_DIR, req.params.name);
  if (!fs.existsSync(modelPath)) return res.status(404).json({ error: "Model not found" });

  fs.unlink(modelPath, (err) => {
    if (err) return res.status(500).json({ error: "Failed to delete model" });
    res.json({ message: "Model deleted successfully" });
  });
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
