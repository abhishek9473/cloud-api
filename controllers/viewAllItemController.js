const Item = require("../schema/Item");

module.exports = async (req, res) => {
  try {
    // assume here a user id avilable
    // decode id is assigned in request when token are varified in auth middleware
    const userId = req.decodeId;

    const allItems = await Item.find({ createdBy: userId }).select("-user");

    res.send({
      status: true,
      entity: allItems,
    });
  } catch (err) {
    res.send({
      status: false,
      entity: err.message,
    });
  }
};
