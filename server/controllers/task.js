const Task = require("../model/task");

exports.getAll = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    let {
      page = 1,
      pageSize = 10,
      sortBy = "createdAt",
      sortOrder = "desc",
      title = "",
      type = "",
      status = "",
      priority = "",
    } = req.query;
    
    // Convert to proper types
    page = parseInt(page);
    pageSize = parseInt(pageSize);
    sortOrder = sortOrder.toLowerCase() === "asc" ? 1 : -1;

    // Validate page and pageSize
    if (isNaN(page) || page < 1) page = 1;
    if (isNaN(pageSize) || pageSize < 1) pageSize = 10;
  
    const query = {};
  
    if (title) query.title = { $regex: title, $options: "i" };
    if (type) query.type = type;
    if (status) query.status = status;
    if (priority) query.priority = priority;

    const skip = (page - 1) * pageSize;

    const tasks = await Task.find(query)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(pageSize);

    const totalCount = await Task.countDocuments(query);

    res.status(200).json({
      success: true,
      message: "Tasks fetched successfully",
      data: tasks,
      pagination: {
        totalCount,
        page,
        pageSize,
        totalPages: Math.ceil(totalCount / pageSize),
      },
    });
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};
