const db = require("../sequelize/models/index.js");

exports.saveProductCategory = async ({ body: data }, res) => {
  try {
    data.id = data.key;
    data.category_id = typeof data.category_id == "string" ? null : data.category_id;
    delete data.key;
    await db.product_category.bulkCreate([data], { updateOnDuplicate: ["category_name", "category_id", "updated_id"] });
    res.send({ status: "success", message: "Category saved successfully" });
  } catch (error) {
    res.status(200).send({ status: "error", message: error });
  }
};

exports.getProductCategory = async (req, res) => {
  try {
    const response = await db.product_category.findAll({ where: { category_id: null } });
    if (response) {
      const sendData = [];
      for (const object of response) {
        const top_obj = {
          key: object.id,
          data: { category_name: object.category_name },
          children: [],
          level: 1,
          category_id: object.category_id,
        };
        const sub_response = await db.product_category.findAll({ where: { category_id: object.id } });
        if (sub_response) {
          for (const obj of sub_response) {
            const sub_obj = {
              key: obj.id,
              data: { category_name: obj.category_name },
              children: [],
              level: 2,
              category_id: obj.category_id,
            };
            const sub_response_level = await db.product_category.findAll({ where: { category_id: obj.id } });
            if (sub_response_level) {
              for (const val of sub_response_level) {
                sub_obj.children.push({
                  key: val.id,
                  data: { category_name: val.category_name },
                  category_id: val.category_id,
                });
              }
            }
            top_obj.children.push(sub_obj);
          }
        }
        sendData.push(top_obj);
      }
      res.send({ status: "success", data: sendData });
    } else res.send({ status: "success", data: [] });
  } catch (error) {
    res.status(200).send({ status: "error", message: error });
  }
};

exports.deleteProductCategory = async ({ body: data }, res) => {
  try {
    const response = await db.product_category.destroy({ where: { id: data.id } });
    res.send({ status: "success", data: response });
  } catch (error) {
    res.status(200).send({ status: "error", message: error });
  }
};
