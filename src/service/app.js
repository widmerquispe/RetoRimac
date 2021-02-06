//consumir apis externas aws

const fetch = require("node-fetch");
const response = require("../common/response")
const ObjectMapper = require('object-mapper');
const listamapper = require("../mapper/personmapper")
const db = require("../db/dynamodb")

module.exports.getAllPerson = async (event) => {
var result ;
var listadepersonas;
    await fetch('https://swapi.py4e.com/api/people').then(
        (response) => {
            return(response.json())
        }
    ).then( (data) => {
        console.log(data);
        listadepersonas = data.results.map((persona)=>{
            return ObjectMapper(persona,listamapper);
        });
        result = response(201,listadepersonas);
    }   )
return result;
};

module.exports.getPersonByID = async (event) => {

    var result ;
var listadepersonas;
    await fetch(`https://swapi.py4e.com/api/people/${event.pathParameters.id}`).then(
        (response) => {
            return(response.json())
        }
    ).then( (data) => {
        console.log(data);
        listadepersonas = ObjectMapper(data,listamapper);
        result = response(201,listadepersonas);
    }   )
return result;

};

module.exports.createPerson = async event => {
    var reqBody = JSON.parse(event.body);
    return db.getPutID(reqBody);
  }

  module.exports.listPerson = async event => {
    return db.listPerson();
  }