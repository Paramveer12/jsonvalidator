const Ajv = require("ajv").default
const ajv = new Ajv()
var express = require('express');
var app = express();
var fs = require("fs");


const userSchema = {

    type : 'object',
    properties: {
        name: {
            type: 'string',
            default: 'John', 
            enum: ['John', 'roshan', 'Doe']
        },
        phone: {
            type: 'number'
        },
        cart: {
            type : 'array',
            items: { 
                type:'object',
                properties: {
                    id: {
                        type: 'string'
                    },
                    count: {
                        type:'number'
                        }
                    
                }
        }
            
            },
        address: {
            type : 'object',
            properties: {
                contactName: {
                    type:'string'
                },
                detailAddress: {
                    type : 'object',
                    properties: {
                        line1: {
                            type: 'string'
                        },
                        line2: {
                            type:'string'
                        },
                        line3: {
                            type:'string'
                        }
                    }
                },
                pin: {
                type:'number'
                },
                country: {
                type:'string'
                }
            }
        }
}};
var server = app.listen(3000, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
 })



app.get("/url", (req, res, next) => {
    var rdata = {}
        fs.readFile( __dirname + "/" + "user.json", 'utf8', function (err, data) {
            data = JSON.parse( data );
            console.log(data)
            const validate = ajv.compile(userSchema)
           
            const valid = validate(data)
            if (!valid){
                rdata = {valid : valid,  error: validate.errors};
            }
            else{
                rdata = {valid : valid, error: 'None'}
            }
            console.log(rdata)
            res.json(rdata)
        });
    
      
 });

