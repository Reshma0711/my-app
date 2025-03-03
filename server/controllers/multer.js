const File = require("../model/multer");
exports.postData = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }
    console.log("request...", req);

    // Map through the uploaded files and prepare file metadata for each
    const filesData = req.files.map((file) => ({
      filename: file.filename,
      originalName: file.originalname,
      path: file.path,
      mimetype: file.mimetype,
      size: file.size,
    }));

    // Save the file metadata for all files in one go
    const savedFiles = await File.insertMany(filesData);

    res.status(201).json({
      message: "Files uploaded successfully",
      files: savedFiles,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};



exports.getData = async (req, res) => {
    try {
        const response = await File.find();
        console.log(response)

        if (!response || response.length === 0) {
            return res.status(400).json({
                message: "Data not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Files retrieved successfully",
            Files: response
        });

    } catch (err) {
        res.status(500).json({
            message: err.message,
            success: false
        });
    }
};

