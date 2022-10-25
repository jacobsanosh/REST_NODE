const mongoose = require('mongoose');
let wiki_table;

exports.connect = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect('mongodb://localhost:27017/sanosh')
        const WIKI_SCHEMA = new mongoose.Schema({
            title: {
                type: String,
                required: true
            },
            content: {
                type: String,
                required: true
            }
        })
        wiki_table = new mongoose.model('wiki_table', WIKI_SCHEMA)
        console.log("connecting to db")
        resolve(wiki_table)
    })
}

exports.find_all = () => {
    return new Promise((resolve, reject) => {
        wiki_table.find({}, (err, data) => {
            if (err) {
                reject(new Error("error on fetching"))
            } else {
                resolve(data)
            }
        })
    })
}

exports.save = (data) => {
    return new Promise((resolve, reject) => {
        const save_data = new wiki_table({ title: data.title, content: data.content })
        save_data.save((err) => {
            reject(new Error("error on saving"));
        });
        resolve(save_data);
    })
}

exports.delete_all = () => {
    return new Promise((resolve, reject) => {
        wiki_table.deleteMany({}, (err) => {
            if (err) {
                reject(new Error("error on deleting"))
            } else {
                resolve("deleted all")
            }
        })
    })
}

exports.find_one = (data) => {
    return new Promise((resolve, reject) => {
        wiki_table.findOne({ title: data }, (err, res) => {
            if (err) {
                reject(new Error("oops no item found"))
            } else {
                resolve(res)
            }
        })
    })
}

exports.update_One = (params, data) => {
    return new Promise((resolve, reject) => {
        wiki_table.findOneAndUpdate({ title: params }, { $set: data }, (err) => {
            if (err) {
                reject("error on updating")
            } else {
                resolve("updated")
            }
        })
    })
}

exports.delete_one = (data) => {
    return new Promise((resolve, reject) => {
        wiki_table.deleteOne({ title: data }, (err) => {
            if (err) {
                reject(new Error("error on deleteing"))
            } else {
                resolve("deleted successfully")
            }
        })
    })
}