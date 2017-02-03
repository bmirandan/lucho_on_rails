'use strict'
var models;
var schedule = require("node-schedule");
var _ = require("lodash");
var moment = require("moment");
var mailer = require("./mailer");
const DATE_FORMAT = "YYYY-MM-DD";
//daily
function daily() {
	processReportsByFrecuency("day");
}
//weekly


function weekly() {
	processReportsByFrecuency("week");
}
//monthly


function monthly() {
	processReportsByFrecuency("monthly");
}

function processReportsByFrecuency(reportFrecuency) {
	console.log("processReportsByFrecuency ->" + reportFrecuency);
	var subtractCriteria = reportFrecuency + "s";

	models.recipient.findAll({
		where: {
			reportFrecuency: reportFrecuency
		}
	}).then(function (recipients) {
		_.forEach(recipients, function (r) {
			var reportDate = moment().subtract(1, subtractCriteria).format(DATE_FORMAT);
			//creacion de reporte
			models.report.create({
				recipientId: r.id,
				reportDate: reportDate,
				reportFrecuency: reportFrecuency
			}).then(function (report) {
				//cuando todo está listo envia correo
				sendEmail(r, report);

			});
		});

	});
}

function getReportFrecuencyLabel(reportFrecuency) {
	switch (reportFrecuency) {

	case 'day':
		return "Diario";
	case 'week':
		return "Semanal";
	case 'month':
		return "Mensual";
	}
}

function sendEmail(recipient, report) {
	var content = "Sr(a): " + recipient.name + "</br> Se ha generado su reporte "+getReportFrecuencyLabel(report.reportFrecuency)+". Para acceder a este, puede pinchar aqui: "+"http://duc.dmh.codelco.cl/index.html#/index/minor?rid="+report.id+"</br></br>Atentamente, Equipo DUC."
	mailer.send(recipient.email, "Reporte DUC", content, function(err) {
		if(err)
			console.log("Fallo envío de reporte a "+ recipient.email+", id:"+report.id);
		else
			console.log("Reporte enviado con éxito a "+ recipient.email+", id:"+report.id);
	});
}

//recibe como parámetro los modelos de sequelize. Este módulo no se hace cargo de la inicialización y sincronizacion de sequelize.
function initReporting(extModels) {
	models = extModels;
	//todos los dias a las 5:55 am
	schedule.scheduleJob({
		hour: 5,
		minute: 55
	}, daily);
	//todos los lunes a las 6:05 am
	schedule.scheduleJob({
		hour: 6,
		minute: 5,
		dayOfWeek: 1
	}, weekly);
	//todos los primeros días de cada mes a las 6:15 am
	schedule.scheduleJob("0 15 6 1 * *", monthly);
	
	console.log("Report - Scheduled daily, weekly and monthly jobs");

}

module.exports.init = initReporting;