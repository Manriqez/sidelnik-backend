const { API_URL } = require('../config')

const genericCrud = (model) => ({
    async get({ params: { id }, }, res) {
        try {
            const item = await model.findById(id)
            return res.status(200).send(item)
        } catch (error) {
            return res.status(400).send(new Error(error))
        }
    },
    async getAll(_, res) {
        try {
            const items = await model.find()
            return res.status(200).send(items)
        } catch (error) {
            return res.status(400).send(new Error(error))
        }
    },
    async create({ body }, res) {
        try {
            const item = new model(body)
            const newItem = await item.save()
            return res.status(200).send(newItem)
        } catch (error) {
            return res.status(400).send(new Error(error))
        }
    },
    async update({ params: { id }, body}, res) {
        try {
            const item = await model.findByIdAndUpdate(id, body, { new: true })
            return res.status(200).send(item)
        } catch (error) {
            return res.status(400).send(new Error(error))
        }
    },
    async getById(req, res) {
        try {
            const items = await model.find({"_id": { $in: req.body }})
            return res.status(200).send(items)
        } catch (error) {
            return res.status(400).send(new Error(error))
        }
    },
    async delete({ params: { id }}, res) {
        try {
            await model.findByIdAndDelete(id)
            return res.status(200).send({message: 'Успешно удалено'})
        } catch (error) {
            return res.status(400).send(new Error(error))
        }
    }
})

module.exports = genericCrud
