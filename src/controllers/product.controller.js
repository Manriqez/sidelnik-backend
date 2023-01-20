const categoryModel = require("../models/Category.js")
const productModel = require("../models/Product.js")

class productContoller {
    async get({ params: { id }, }, res) {
        try {
            const item = await productModel.findById(id)
            return res.status(200).send(item)
        } catch (error) {
            return res.status(400).send(new Error(error))
        }
    }
    async getAll(_, res) {
        try {
            const items = await productModel.find()
            return res.status(200).send(items)
        } catch (error) {
            return res.status(400).send(new Error(error))
        }
    }
    async create({ body }, res) {
        try {
            const item = new productModel(body)
            const newItem = await item.save()
            await categoryModel.findByIdAndUpdate(newItem.category, { $push: { products: newItem._id} });
            return res.status(200).send(newItem)
        } catch (error) {
            return res.status(400).send(new Error(error))
        }
    }
    async update({ params: { id }, body}, res) {
        try {
            const item = await productModel.findByIdAndUpdate(id, body, { new: true })
            return res.status(200).send(item)
        } catch (error) {
            return res.status(400).send(new Error(error))
        }
    }
    async getById(req, res) {
        try {
            const items = await productModel.find({"_id": { $in: req.body }})
            console.log('get by id', items)
            return res.status(200).send(items)
        } catch (error) {
            return res.status(400).send(new Error(error))
        }
    }
    async delete({ params: { id }}, res) {
        try {
            let item = await productModel.findByIdAndDelete(id)
            await categoryModel.findByIdAndUpdate(item.category, { $pull: { products: id} })
            return res.status(200).send({message: 'Продукт удалён'})
        } catch (error) {
            return res.status(400).send(new Error(error))
        }
    }
}

module.exports = new productContoller()
