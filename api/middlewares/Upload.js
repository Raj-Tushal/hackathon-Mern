import multer from "multer";

// Configure memory storage
const storage = multer.memoryStorage();

// Create multer instance
const upload = multer({ 
  storage, 
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit (adjust as needed)
  fileFilter: (req, file, cb) => {
    // Accept only specific file types, e.g., images
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  },
});

module.exports = upload;
