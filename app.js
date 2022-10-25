const express = require('express')
const bdparse = require('body-parser')
const app = express()
const port = 3000;
const db = require(__dirname + '/database.js')
app.use(bdparse.urlencoded({ extended: true }))
db.connect().then((data) => {

    app.route('/')
        .get((req, res) => {
            //get code here
            db.find_all().then((data) => {
                // console.log(data)
                res.send(data)
            }).catch((err) => {
                console.log("error", err)
            })
        })
        .post((req, res) => {
            //post code here
            let data = {
                title: req.body.title,
                content: req.body.content
            }
            db.save(data).then((data) => {
                console.log("stored")
                res.send("added bro")
            }).catch((err) => {
                res.send("404 error")
                console.log(err)
            })

        })
        .delete((req, res) => {
            db.delete_all().then((data) => {
                console.log(data)
                res.send(data)
            }).catch((err) => {
                console.log(err)
            })
        })
        //adding params
    app.route('/:data')
        .get((req, res) => {
            // console.log(req.params.data)
            db.find_one(req.params.data).then((result) => {
                res.send(result)
            }).catch((err) => {
                console.log(err)
            })
        })
        .put((req, res) => {
            console.log(req.params.data, req.body)
            db.update_One(req.params.data, req.body).then((data) => {
                res.send(data)
            }).catch((err) => {
                console.log(err)
            })
        })
        .patch((req, res) => {
            db.update_One(req.params.data, req.body).then((data) => {
                    res.send(data)
                })
                .catch((err) => {
                    res.send(err)
                })
        })
        .delete((req, res) => {
            db.delete_one(req.params.data).then((data) => {
                    res.send(data)
                })
                .catch((err) => {
                    res.send(err)
                })
        })
    app.listen(port, () => {
        console.log('started at port 3000')
    })


    // app.get('/', (req, res) => {
    //     //get code here
    //     db.find_all().then((data) => {
    //         // console.log(data)
    //         res.send(data)
    //     }).catch((err) => {
    //         console.log("error", err)
    //     })
    // })

    // app.post('/', (req, res) => {
    //     //post code here
    //     let data = {
    //         title: req.body.title,
    //         content: req.body.content
    //     }
    //     db.save(data).then((data) => {
    //         console.log("stored")
    //         res.send("added bro")
    //     }).catch((err) => {
    //         res.send("404 error")
    //         console.log(err)
    //     })

    // })
    // app.delete('/', (req, res) => {
    //     db.delete_all().then((data) => {
    //         console.log(data)
    //         res.send(data)
    //     }).catch((err) => {
    //         console.log(err)
    //     })
    // })
    // app.listen(port, () => {
    //     console.log('started at port 3000')
    // })

}).catch((err) => {
    console.log("error on connection", err)
})