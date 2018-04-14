const mongoose = require('mongoose');
const http = require("https");
const qs = require("querystring");
const axios = require('axios')

module.exports = {
    findAllProvince: (req, res) => {
        var options = {
            "method": "GET",
            "hostname": "api.rajaongkir.com",
            "port": null,
            "path": "/starter/province",
            "headers": {
              "key": process.env.RAJAONGKIRKEY
            }
        };
          
        var request = http.request(options, function (response) {
            var chunks = [];
          
            response.on("data", function (chunk) {
              chunks.push(chunk);
            });
          
            response.on("end", function () {
                var data = JSON.parse(Buffer.concat(chunks));
                const status = data.rajaongkir.status.code;
                const message = data.rajaongkir.status.description;
                res.status(status).send({
                    message,
                    data
                })
            });
        });
        request.end();
    },
    findAllCity: (req, res) => {
        const province_id = req.params.province_id
        var options = {
            "method": "GET",
            "hostname": "api.rajaongkir.com",
            "port": null,
            "path": `/starter/city?province=${province_id}`,
            "headers": {
                "key": process.env.RAJAONGKIRKEY
            }
        };

        var request = http.request(options, function (response) {
            var chunks = [];

            response.on("data", function (chunk) {
                chunks.push(chunk);
            });

            response.on("end", function () {
                var data = JSON.parse(Buffer.concat(chunks));
                const status = data.rajaongkir.status.code;
                const message = data.rajaongkir.status.description;
                res.status(status).send({
                    message,
                    data
                })
            });
        });

        request.end();
    },
    getOngkir: (req, res) => {
        const {destination, weight, courier} = req.body
        axios.post('https://api.rajaongkir.com/starter/cost', {
            origin: 153, destination, weight, courier 
        }, {
            headers: {
                key: process.env.RAJAONGKIRKEY
            }
        })
        .then(function (response) {
            let costs = response.data.rajaongkir.results[0].costs
            console.log("costs-- ", costs)
            res.status(200).send({
                data: costs
            })
        })
        .catch(function (error) {
            console.log(error);
        });

    }
};