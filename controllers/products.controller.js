const { Op } = require("sequelize");
const db = require("../sequelize/models/index.js");

exports.getProductCategories = async (req, res) => {
  try {
    const response = await db.product_category.findAll({ where: { category_id: null } });
    if (response) {
      const sendData = [];
      for (const object of response) {
        const top_obj = {
          key: object.id,
          label: object.category_name,
          children: [],
        };
        const sub_response = await db.product_category.findAll({ where: { category_id: object.id } });
        if (sub_response) {
          for (const obj of sub_response) {
            const sub_obj = {
              key: obj.id,
              label: obj.category_name,
              children: [],
            };
            const sub_response_level = await db.product_category.findAll({ where: { category_id: obj.id } });
            if (sub_response_level) {
              for (const val of sub_response_level) {
                sub_obj.children.push({
                  key: val.id,
                  label: val.category_name,
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
    console.log(error);
    res.status(200).send({ status: "error", message: error });
  }
};

exports.getProductSuppliers = async (req, res) => {
  try {
    const response = await db.suppliers.findAll({ attributes: ["supplier_name", "id"] });
    res.send({ status: "success", data: response });
  } catch (error) {
    console.log(error);
    res.status(200).send({ status: "error", message: error });
  }
};

exports.saveProduct = async ({ body: data }, res) => {
  try {
    let response;
    let insert_data = { ...data };
    insert_data.container_type_id = data.container_type;
    insert_data.loading_port_id = data.loading_port;
    delete insert_data.category;
    delete insert_data.supplier;
    delete insert_data.container_type;
    delete insert_data.loading_port;
    delete insert_data.id;
    if (typeof data.id == "string") {
      const response = await db.products.create(insert_data);
      await db.product_category_map.create({ product_id: response.id, category_id: Object.keys(data.category)[0] });
      insert_data = [];
      for (const id of data.supplier) {
        insert_data.push({ product_id: response.id, supplier_id: id });
      }
      await db.product_supplier_map.bulkCreate(insert_data);
    } else {
      response = await db.products.update(insert_data, { where: { id: data.id } });
      await db.product_category_map.update({ category_id: Object.keys(data.category)[0] }, { where: { product_id: data.id } });
      await db.product_supplier_map.destroy({ where: { product_id: data.id } });
      insert_data = [];
      for (const id of data.supplier) {
        insert_data.push({ product_id: data.id, supplier_id: id });
      }
      await db.product_supplier_map.bulkCreate(insert_data);
    }
    res.send({ status: "success", data: response });
  } catch (error) {
    console.log(error);
    res.status(200).send({ status: "error", message: error });
  }
};

exports.saveProductFromCSV = async ({ body: data }, res) => {
  try {
    for await (const object of data) {
      const category = await db.product_category.findOne({
        attributes: ["id"],
        where: db.sequelize.where(db.sequelize.fn("lower", db.sequelize.col("category_name")), object.category),
      });
      const supplier = await db.suppliers.findOne({
        attributes: ["id"],
        where: db.sequelize.where(db.sequelize.fn("lower", db.sequelize.col("supplier_name")), object.supplier),
      });
      const container_type = await db.container_types.findOne({
        attributes: ["id"],
        where: db.sequelize.where(db.sequelize.fn("lower", db.sequelize.col("type_name")), object.container_type),
      });
      const loading_port = await db.loading_port.findOne({
        attributes: ["id"],
        where: db.sequelize.where(db.sequelize.fn("lower", db.sequelize.col("port_name")), object.loading_port),
      });
      const country = await db.countries.findOne({
        attributes: ["id"],
        where: db.sequelize.where(db.sequelize.fn("lower", db.sequelize.col("name")), object.origin),
      });
      const currency = await db.currencies.findOne({
        attributes: ["id"],
        where: db.sequelize.where(db.sequelize.fn("lower", db.sequelize.col("name")), object.currency),
      });
      if (category && supplier && container_type && loading_port && country && currency) {
        delete object.category;
        delete object.supplier;
        delete object.container_type;
        delete object.loading_port;
        object.container_type_id = container_type.id;
        object.loading_port_id = loading_port.id;
        object.origin = country.id;
        object.currency_id = currency.id;
        const response = await db.products.create(object);
        await db.product_category_map.create({ product_id: response.id, category_id: category.id });
        await db.product_supplier_map.create({ product_id: response.id, supplier_id: supplier.id });
      }
    }
    res.send({ status: "success", message: "Product successfully added" });
  } catch (error) {
    console.log(error);
    res.status(200).send({ status: "error", message: error });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const response = await db.products.findAll({
      attributes: {
        include: [
          [db.sequelize.col("product_category_maps.product_category.category_name"), "category"],
          [db.sequelize.col("product_supplier_maps.supplier.supplier_name"), "supplier"],
          [db.sequelize.col("container_type.type_name"), "container_type"],
          [db.sequelize.col("loading_port.port_name"), "loading_port"],
          [db.sequelize.col("country.name"), "origin"],
          [db.sequelize.col("currency.name"), "currency"],
        ],
      },
      raw: true,
      include: [
        {
          model: db.product_category_map,
          attributes: [],
          include: [
            {
              model: db.product_category,
              attributes: [],
            },
          ],
        },
        {
          model: db.product_supplier_map,
          attributes: [],
          include: [
            {
              model: db.suppliers,
              attributes: [],
            },
          ],
        },
        {
          model: db.container_types,
          attributes: [],
        },
        {
          model: db.loading_port,
          attributes: [],
        },
        {
          model: db.countries,
          attributes: [],
        },
        {
          model: db.currencies,
          attributes: [],
        },
      ],
    });
    const sendData = [];
    let tempID,
      obj = {};
    for (const object of response) {
      if (object.id == tempID) {
        obj.supplier.push(object.supplier);
      } else {
        if (Object.keys(obj).length > 0) sendData.push(obj);
        tempID = object.id;
        obj = { ...object };
        obj.supplier = [object.supplier];
      }
    }
    if (Object.keys(obj).length > 0) sendData.push(obj);
    res.send({ status: "success", data: sendData });
  } catch (error) {
    console.log(error);
    res.status(200).send({ status: "error", message: error });
  }
};

exports.getProductForEdit = async ({ body: data }, res) => {
  try {
    const response = await db.products.findOne({ where: { id: data.id } });
    const category = await db.product_category_map.findOne({ attributes: ["category_id"], where: { product_id: data.id } });
    const supplier = await db.product_supplier_map.findAll({ attributes: ["supplier_id"], where: { product_id: data.id } });
    response.dataValues.category = {};
    response.dataValues.category[category.category_id] = true;
    response.dataValues.supplier = supplier.map((item) => item.supplier_id);
    res.send({ status: "success", data: response });
  } catch (error) {
    console.log(error);
    res.status(200).send({ status: "error", message: error });
  }
};

exports.deleteProduct = async ({ body: data }, res) => {
  try {
    const response = await db.products.destroy({ where: { id: data.id } });
    res.send({ status: "success", data: response });
  } catch (error) {
    console.log(error);
    res.status(200).send({ status: "error", message: error });
  }
};
