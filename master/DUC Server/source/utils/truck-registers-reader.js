'use strict'
var fs = require('fs');
var parse = require('csv-parse');
var _ = require("lodash");
var moment = require("moment");
var deferred = require('deferred')

//Obtiene el resultado consecutivo de llamar a readRegistersFile generateCollection
function getTruckRegisters(filepath) {
    var def = deferred();
    readRegistersFile(filepath)
        .then(function (result) {
            console.log("generating collection");
            var collection = generateCollection(result);
            console.log("collection generated");
            if (collection !== undefined) {
                def.resolve(collection);
            } else {
                def.reject(new Error("Imposible leer la coleccion"));
            }
        }, function (err) {
            def.reject(err);
        });
    return def.promise;
}

//Lee asincronicamente el archivo csv de registro de camiones ubicado en 'filepath'
function readRegistersFile(filepath) {
    var def = deferred();
    var result;
    var parser = parse({
        delimiter: ';'
    }, function (err, data) {
        if (err) {
            def.reject(new Error("Imposible leer el archivo -parser result"));
        } else {
            def.resolve(data);

        }
    });
    parser.on('error', function (err) {
        def.reject(new Error("Imposible leer el archivo - parser"));
    });

    setTimeout(function () {
        var rs = fs.createReadStream(filepath);
        rs.on('error', function () {
            def.reject(new Error("Imposible leer el archivo - stream"));

        });
        rs.pipe(parser);

    }, 0);

    return def.promise;
}

/**
 * Crea dos colecciones en un arreglo: una indexada por 'truck' y otra por 'operator1' donde cada elemento es un registro de datos de camion, donde se incluye nombre de camion, conductor, posicion, hora, entre otros
 */
function generateCollection(data) {
    const numOfRegistersPerLine = 16;
    const truckColumnName = "truck";
    const operatorColumnName = "operator1";
    const positionToInsert_coord16 = 2;
    var result = [];
    var normalRegisterSize = 9; //cantdidad de registros por linea mas el truck
    var columns = _.head(data);
    var dataRaw = _.slice(data, 1);
    var resultGroupedBy16 = [];
    var columnNames = _.slice(columns, 1, 10);
    var lastColumnNames = _.map(columnNames, _.clone);;
    lastColumnNames.splice(positionToInsert_coord16, 0, "coord16");

    _.forEach(dataRaw, function (row) {
        //por cada fila del archivo a excepcion del header
        var firstColumn = _.head(row); //columna truck
        var registerColumns = _.slice(row, 1); //columnas para primer registro de fila

        //ultimo registro tiene un campo extra
        for (var i = 0; i < numOfRegistersPerLine; i++) {
            var registerData, register;
            if (i == numOfRegistersPerLine - 1) {
                registerData = _.slice(registerColumns, (i * normalRegisterSize));
                register = _.zipObject(lastColumnNames, registerData);
            } else {
                registerData = _.slice(registerColumns, (i * normalRegisterSize), (i + 1) * normalRegisterSize);
                register = _.zipObject(columnNames, registerData);
            }
            register.truck = firstColumn;
            result.push(register);
        }

        //resultGroupedBy16.push(_.zipObject(columns, value));
    });
    return [_.groupBy(result, truckColumnName), _.groupBy(result, operatorColumnName)];
}

function getClosestRegisterByTruck(collection, truck, time) {
    if (_.has(collection, truck)) {
        var closestDuration;
        var closestRegister;
        _.forEach(collection[truck], function (value) {

            if (_.has(value, 'hora1')) {
                var registerTime = moment(value.hora1, 'YYYY-MM-DD HH:mm:ss');
                var diff = moment.duration(time.diff(registerTime));

                if (moment.isDuration(closestDuration)) {
                    if (Math.abs(diff.asSeconds()) < Math.abs(closestDuration.asSeconds())) {
                        closestDuration = diff;
                        closestRegister = value;
                    }

                } else {
                    closestDuration = diff;
                    closestRegister = value;
                }
            }
        })
        if (moment.isDuration(closestDuration) && closestRegister.hora1 !== undefined) {
            console.log("Diff:", Math.abs(closestDuration.asSeconds()));
            return closestRegister;
        } else console.log('Error buscando registro');
    } else
        console.log('Coleccion no tiene truck');
}

module.exports.getTruckRegisters = getTruckRegisters;
module.exports.getClosestRegisterByTruck = getClosestRegisterByTruck;