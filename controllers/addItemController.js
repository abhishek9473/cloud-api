const Item = require("../schema/Item");

module.exports = async (req, res) => {
  try {
    // assume here a user id avilable
    // decode id is assigned in request when token are varified in auth middleware
    const userId = req.decodeId;

    // Create a new file instance
    // we recive only file url and type as string and actual file are uplaoded in clould and file url we get
    const newItem = new Item({
      createdBy: userId,
      folderId: req.body.folderId,
      url: req.body.fileUrl,
      type: req.body.fileType,
    });

    // Save the new item to the database
    const savedItem = await newItem.save();

    res.send({
      status: true,
      entity: "new file added",
    });
  } catch (err) {
    res.send({
      status: false,
      entity: err.message,
    });
  }
};
