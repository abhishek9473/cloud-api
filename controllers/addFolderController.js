const Folder = require("../schema/Folder");

module.exports = async (req, res) => {
  try {
    // assume here a user id avilable 
    // decode id is assigned in request when token are varified in auth middleware
    const userId = req.decodeId || "undefine";

    // Create a new folder instance
    const newFolder = new Folder({
      createdBy: userId,
      name: req.body.name,
    });

    // Save the new user to the database
    const savedFolder = await newFolder.save();

    res.send({
      status: true,
      entity: "new folder added",
    });
  } catch (err) {
    res.send({
      status: false,
      entity: err.message,
    });
  }
};
