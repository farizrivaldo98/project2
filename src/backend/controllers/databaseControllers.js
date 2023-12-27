const { db2, db, query } = require("../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("../helpers/nodemailers");
const { request, response } = require("express");
const { log } = require("util");

module.exports = {
  fetchOee: async (request, response) => {
    let fetchQuerry =
      " SELECT`data_index` as 'id', `time@timestamp` as 'time',COALESCE(`data_format_0`, 0) AS 'avability',  COALESCE(`data_format_1`, 0) AS 'performance',  COALESCE(`data_format_2`, 0) AS 'quality',  COALESCE(`data_format_3`, 0) AS 'oee',  COALESCE(`data_format_4`, 0) AS 'output',  COALESCE(`data_format_5`, 0) AS 'runTime',  COALESCE(`data_format_6`, 0) AS 'stopTime',COALESCE(`data_format_7`, 0) AS 'idleTime' FROM " +
      " " +
      "`" +
      request.query.machine +
      "`" +
      "where `time@timestamp` between" +
      " " +
      request.query.start +
      " " +
      "and" +
      " " +
      request.query.finish;

    db.query(fetchQuerry, (err, result) => {
      return response.status(200).send(result);
    });
  },

  fetchVariableOee: async (request, response) => {
    let fetchQuerry =
      "SELECT AVG(`data_format_0`) as Ava, AVG(`data_format_1`) as Per,  AVG(`data_format_2`) as Qua, AVG(`data_format_3`) AS  oee   FROM " +
      " " +
      "`" +
      request.query.machine +
      "`" +
      " " +
      " where `time@timestamp` between" +
      " " +
      request.query.start +
      " " +
      "and" +
      " " +
      request.query.finish;

    db.query(fetchQuerry, (err, result) => {
      return response.status(200).send(result);
    });
  },

  fetchDataHardness: async (request, response) => {
    const { nobatch } = request.body;
    let fetchQuerry = `SELECT  id as x , hardness AS y FROM instrument WHERE nobatch= ${db2.escape(
      nobatch
    )} ORDER BY id DESC `;
    db2.query(fetchQuerry, (err, result) => {
      return response.status(200).send(result);
    });
  },
  fetchDataTickness: async (request, response) => {
    const { nobatch } = request.body;
    let fetchQuerry = `SELECT  id as x , thickness AS y FROM instrument WHERE nobatch= ${db2.escape(
      nobatch
    )} ORDER BY id DESC `;
    db2.query(fetchQuerry, (err, result) => {
      return response.status(200).send(result);
    });
  },
  fetchDataDiameter: async (request, response) => {
    const { nobatch } = request.body;
    let fetchQuerry = `SELECT  id as x , diameter AS y FROM instrument WHERE nobatch= ${db2.escape(
      nobatch
    )} `;
    db2.query(fetchQuerry, (err, result) => {
      return response.status(200).send(result);
    });
  },

  fetchDataInstrument: async (request, response) => {
    let fetchQuerry = `select * from instrument ORDER BY id DESC`;
    db2.query(fetchQuerry, (err, result) => {
      return response.status(200).send(result);
    });
  },

  fetchDataLine1: async (request, response) => {
    const date = request.query.date;

    let fetchquerry = `SELECT Mesin , SUM(total)AS Line1 FROM part WHERE MONTH(tanggal) = ${date} AND Line='Line1' GROUP BY Mesin`;
    db.query(fetchquerry, (err, result) => {
      return response.status(200).send(result);
    });
  },
  fetchDataLine2: async (request, response) => {
    const date = request.query.date;

    let fetchquerry = `SELECT Mesin , SUM(total)AS Line2 FROM part WHERE MONTH(tanggal) = ${date} AND Line='Line2' GROUP BY Mesin`;
    db.query(fetchquerry, (err, result) => {
      return response.status(200).send(result);
    });
  },
  fetchDataLine3: async (request, response) => {
    const date = request.query.date;
    let fetchquerry = `SELECT Mesin , SUM(total)AS Line3 FROM part WHERE MONTH(tanggal) = ${date} AND Line='Line3' GROUP BY Mesin`;
    db.query(fetchquerry, (err, result) => {
      return response.status(200).send(result);
    });
  },
  fetchDataLine4: async (request, response) => {
    let fetchquerry =
      "SELECT Mesin , SUM(total)AS Line4 FROM part WHERE MONTH(tanggal) = 4 AND WHERE Line='Line4' GROUP BY Mesin";
    db.query(fetchquerry, (err, result) => {
      return response.status(200).send(result);
    });
  },
  fetchDataPareto: async (request, response) => {
    const date = request.query.date;

    let fatchquerry = `SELECT Line, SUM(total) AS y FROM parammachine_saka.part WHERE MONTH(tanggal) = ${date} GROUP BY Line ORDER BY Line ASC;`;
    db.query(fatchquerry, (err, result) => {
      return response.status(200).send(result);
    });
  },

  getData: async (request, response) => {
    const date = request.query.date;

    var fatchquerry = `SELECT * FROM parammachine_saka.part WHERE MONTH(tanggal) = ${date};`;

    db.query(fatchquerry, (err, result) => {
      return response.status(200).send(result);
    });
  },

  fetchEdit: async (request, response) => {
    var fatchquerry = `SELECT * FROM parammachine_saka.part`;

    db.query(fatchquerry, (err, result) => {
      return response.status(200).send(result);
    });
  },

  //==========================================DATA INPUT =================================================

  addData: async (request, response) => {
    const {
      Mesin,
      Line,
      Pekerjaan,
      Detail,
      Tanggal,
      Quantity,
      Unit,
      Pic,
      Tawal,
      Tahir,
      Total,
    } = request.body;
    let postQuery = `INSERT INTO part VALUES (null, ${db.escape(
      Mesin
    )}, ${db.escape(Line)}, ${db.escape(Pekerjaan)}, ${db.escape(
      Detail
    )}, ${db.escape(Tanggal)}, ${db.escape(Quantity)}, ${db.escape(
      Unit
    )}, ${db.escape(Pic)}, ${db.escape(Tawal)}, ${db.escape(
      Tahir
    )}, ${db.escape(Total)})`;
    db.query(postQuery, (err, result) => {
      if (err) {
        return response.status(400).send(err.message);
      } else {
        let fatchquerry = "SELECT * FROM part";
        db.query(fatchquerry, (err, result) => {
          return response.status(200).send(result);
        });
      }
    });
  },

  editData: async (request, response) => {
    let dataUpdate = [];
    let idParams = request.params.id;
    for (let prop in request.body) {
      dataUpdate.push(`${prop} = ${db.escape(request.body[prop])}`);
    }
    let updateQuery = `UPDATE part set ${dataUpdate} where id = ${db.escape(
      idParams
    )}`;

    db.query(updateQuery, (err, result) => {
      if (err) response.status(500).send(err);
      response.status(200).send(result);
    });
  },

  deletData: async (request, response) => {
    let idParams = request.params.id;
    let deleteQuery = `DELETE FROM part WHERE id = ${db.escape(idParams)}`;
    db.query(deleteQuery, (err, result) => {
      if (err) {
        return response.status(400).send(err.message);
      } else {
        return response
          .status(200)
          .send({ isSucess: true, message: "Succes delete data" });
      }
    });
  },

  lineData: async (request, response) => {
    let queryData = "SELECT * FROM parammachine_saka.line_db";

    db2.query(queryData, (err, result) => {
      return response.status(200).send(result);
    });
  },

  procesData: async (request, response) => {
    let data = request.query.line_name;

    let queryData = `SELECT * FROM parammachine_saka.proces_db where line_name = ${db.escape(
      data
    )} `;
    db2.query(queryData, (err, result) => {
      return response.status(200).send(result);
    });
  },

  machineData: async (request, response) => {
    let data = request.query.line_name;
    let data2 = request.query.proces_name;

    let queryData = `SELECT * FROM parammachine_saka.machine_db where line_name = ${db.escape(
      data
    )} AND proces_name = ${db.escape(data2)}`;
    db2.query(queryData, (err, result) => {
      return response.status(200).send(result);
    });
  },

  locationData: async (request, response) => {
    let data = request.query.line_name;
    let data2 = request.query.proces_name;
    let data3 = request.query.machine_name;
    let queryData = `SELECT * FROM parammachine_saka.location_db where line_name = ${db.escape(
      data
    )} AND proces_name = ${db.escape(data2)} AND machine_name = ${db.escape(
      data3
    )} `;
    db2.query(queryData, (err, result) => {
      return response.status(200).send(result);
    });
  },

  //=====================================(Login & Register)===============================================================================

  register: async (req, res) => {
    const { username, email, name, password } = req.body;

    let getEmailQuery = `SELECT * FROM users WHERE email=${db.escape(email)}`;
    let isEmailExist = await query(getEmailQuery);
    if (isEmailExist.length > 0) {
      return res.status(400).send({ message: "Email has been used" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const defaultImage =
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
    let addUserQuery = `INSERT INTO users VALUES (null, ${db.escape(
      username
    )}, ${db.escape(email)}, ${db.escape(hashPassword)}, ${db.escape(
      name
    )}, false,1,null)`;
    let addUserResult = await query(addUserQuery);

    let mail = {
      from: `Admin <khaerul.fariz98@gmail.com>`,
      to: `${email}`,
      subject: `Acount Verification`,
      html: `<a href="http://10.126.15.124:3000/" > Verification Click here</a>`,
    };

    let response = await nodemailer.sendMail(mail);

    return res
      .status(200)
      .send({ data: addUserResult, message: "Register success" });
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(req.body);
      const isEmailExist = await query(
        `SELECT * FROM users WHERE email = ${db.escape(email)}`
      );

      if (isEmailExist.length == 0) {
        return res.status(400).send({ message: "email & password infailid1" });
      }

      const isValid = await bcrypt.compare(password, isEmailExist[0].password);

      if (!isValid) {
        return res.status(400).send({ message: "email & password infailid2" });
      }

      let payload = {
        name: isEmailExist[0].name,
        id: isEmailExist[0].id_users,
        isAdmin: isEmailExist[0].isAdmin,
        level: isEmailExist[0].level,
        imagePath: isEmailExist[0].imagePath,
      };
      const token = jwt.sign(payload, "khaerul", { expiresIn: "1h" });
      // const token = jwt.sign(payload, "khaerul");
      //const token = jwt.sign(payload, "khaerul", { expiresIn: 600 }); // 5 menit

      console.log(token);
      delete isEmailExist[0].password;
      return res.status(200).send({
        token,
        message: "email & password sucess",
        data: isEmailExist[0],
      });
    } catch (error) {
      res.status(error.status || 500).send(error);
      console.log(error);
    }
  },
  fetchAlluser: async (req, res) => {
    try {
      const users = await query(`SELECT * FROM users`);
      return res.status(200).send(users);
    } catch (error) {
      res.status(error.statusCode || 500).send(error);
    }
  },

  checkLogin: async (req, res) => {
    try {
      const users = await query(
        `SELECT * FROM users WHERE id_users = ${db.escape(req.user.id)}`
      );
      return res.status(200).send({
        data: {
          name: users[0].name,
          id: users[0].id_users,
          isAdmin: users[0].isAdmin,
          level: users[0].level,
          imagePath: users[0].imagePath,
        },
      });
    } catch (error) {
      res.status(error.statusCode || 500).send(error);
    }
  },

  updateUsers: async (request, response) => {
    let idParams = request.params.id;
    let levelParams = request.body.level;

    let updateQuery = `UPDATE parammachine_saka.users set level = ${db.escape(
      levelParams
    )} where id_users  = ${db.escape(idParams)}`;

    db.query(updateQuery, (err, result) => {
      if (err) {
        return response.status(400).send(err.message);
      } else {
        return response
          .status(200)
          .send({ isSucess: true, message: "Succes update data" });
      }
    });
  },

  editUsers: (request, response) => {
    let idParams = request.params.id;
    let updateQuery = `UPDATE parammachine_saka.users set level = NULL where id_users  = ${db.escape(
      idParams
    )}`;
    db.query(updateQuery, (err, result) => {
      if (err) {
        return response.status(400).send(err.message);
      } else {
        return response
          .status(200)
          .send({ isSucess: true, message: "Succes update data" });
      }
    });
  },

  deleteUseers: async (request, response) => {
    let idParams = request.params.id;
    let query = `DELETE FROM parammachine_saka.users WHERE id_users = ${db.escape(
      idParams
    )}`;

    db.query(query, (err, result) => {
      if (err) {
        return response.status(400).send(err.message);
      } else {
        return response
          .status(200)
          .send({ isSucess: true, message: "Succes delete data" });
      }
    });
  },

  //=========================UTILITY=============================================

  fetchEMSn14: async (request, response) => {
    let fetchQuerry =
      "SELECT * FROM parammachine_saka.`cMT-PowerMeterMezzanine_R._N14_& _N14_data`;";
    db2.query(fetchQuerry, (err, result) => {
      return response.status(200).send(result);
    });
  },

  //========================OPE=================================================

  fetchOPE: async (request, response) => {
    const date = request.query.date;
    let query =
      "SELECT AVG(data_format_0) AS Ava, AVG(data_format_1) AS Per, AVG(data_format_2) AS Qua, AVG(data_format_3) AS OEE FROM ( SELECT *      FROM parammachine_saka.`mezanine.tengah_Cm1_data`      UNION ALL      SELECT *      FROM parammachine_saka.`mezanine.tengah_Cm2_data`      UNION ALL      SELECT *      FROM parammachine_saka.`mezanine.tengah_Cm3_data`      UNION ALL      SELECT *      FROM parammachine_saka.`mezanine.tengah_Cm4_data`      UNION ALL      SELECT *      FROM parammachine_saka.`mezanine.tengah_Cm5_data`    ) AS subquery WHERE MONTH(FROM_UNIXTIME(`time@timestamp`)) = " +
      date;
    db2.query(query, (err, result) => {
      return response.status(200).send(result);
    });
  },

  fetchAvaLine: async (request, response) => {
    const date = request.query.date;
    let query =
      "SELECT AVG(data_format_0) AS Ava1 FROM ( SELECT *  FROM parammachine_saka.`mezanine.tengah_Cm1_data`      UNION ALL      SELECT *      FROM parammachine_saka.`mezanine.tengah_Cm2_data`      UNION ALL      SELECT *      FROM parammachine_saka.`mezanine.tengah_Cm3_data`      UNION ALL      SELECT *      FROM parammachine_saka.`mezanine.tengah_Cm4_data`      UNION ALL      SELECT *      FROM parammachine_saka.`mezanine.tengah_Cm5_data`    ) AS subquery WHERE MONTH(FROM_UNIXTIME(`time@timestamp`)) = " +
      date;
    db2.query(query, (err, result) => {
      return response.status(200).send(result);
    });
  },

  fetchAvaMachine: async (request, response) => {
    const date = request.query.date;
    let query =
      "SELECT CAST(FORMAT(AVG(data_format_0),2) AS CHAR) AS indexLabel, 'Avability CM1' AS label, AVG(data_format_0) AS y FROM parammachine_saka.`mezanine.tengah_Cm1_data` WHERE MONTH(FROM_UNIXTIME(`time@timestamp`)) = " +
      `${db.escape(date)}` +
      " UNION ALL SELECT CAST(FORMAT(AVG(data_format_0),2) AS CHAR) AS indexLabel, 'Avability CM2' AS label, AVG(data_format_0) AS y FROM parammachine_saka.`mezanine.tengah_Cm2_data` WHERE MONTH(FROM_UNIXTIME(`time@timestamp`)) = " +
      `${db.escape(date)}` +
      " UNION ALL SELECT CAST(FORMAT(AVG(data_format_0),2) AS CHAR) AS indexLabel, 'Avability CM3' AS label, AVG(data_format_0) AS y FROM parammachine_saka.`mezanine.tengah_Cm3_data` WHERE MONTH(FROM_UNIXTIME(`time@timestamp`)) = " +
      `${db.escape(date)}` +
      " UNION ALL SELECT CAST(FORMAT(AVG(data_format_0),2) AS CHAR) AS indexLabel, 'Avability CM4' AS label, AVG(data_format_0) AS y FROM parammachine_saka.`mezanine.tengah_Cm4_data` WHERE MONTH(FROM_UNIXTIME(`time@timestamp`)) = " +
      `${db.escape(date)}` +
      " UNION ALL SELECT CAST(FORMAT(AVG(data_format_0),2) AS CHAR) AS indexLabel, 'Avability CM5' AS label, AVG(data_format_0) AS y FROM parammachine_saka.`mezanine.tengah_Cm5_data` WHERE MONTH(FROM_UNIXTIME(`time@timestamp`)) = " +
      `${db.escape(date)}` +
      // " UNION ALL SELECT CAST(FORMAT(AVG(data_format_0),2) AS CHAR) AS indexLabel, 'Avability HM1' AS label, AVG(data_format_0) AS y FROM parammachine_saka.`mezanine.tengah_HM1_data` WHERE MONTH(FROM_UNIXTIME(`time@timestamp`)) = " +
      // `${db.escape(date)}` +
      " ORDER BY y DESC;";

    db2.query(query, (err, result) => {
      return response.status(200).send(result);
    });
  },

  //=================Maintenance Report ==============================================================
  reportMTC: async (request, response) => {
    const {
      line,
      proces,
      machine,
      location,
      pic,
      tanggal,
      start,
      finish,
      total,
      sparepart,
      quantity,
      unit,
      PMjob,
      PMactual,
      safety,
      quality,
      status,
      detail,
      breakdown,
    } = request.body;

    let queryData = `INSERT INTO parammachine_saka.mtc_report VALUES (null, 
      ${db.escape(line)}, ${db.escape(proces)}, ${db.escape(
      machine
    )}, ${db.escape(location)},
      ${db.escape(pic)}, ${db.escape(tanggal)}, ${db.escape(
      start
    )}, ${db.escape(finish)}, 
      ${db.escape(total)}, ${db.escape(sparepart)}, ${db.escape(
      quantity
    )}, ${db.escape(unit)},
      ${db.escape(PMjob)}, ${db.escape(PMactual)}, ${db.escape(
      safety
    )}, ${db.escape(quality)},
      ${db.escape(status)}, ${db.escape(detail)} ,${db.escape(breakdown)}
      )`;

    db.query(queryData, (err, result) => {
      if (err) {
        return response.status(400).send(err.message);
      } else {
        let fatchquerry = "SELECT * FROM parammachine_saka.mtc_report";
        db.query(fatchquerry, (err, result) => {
          return response
            .status(200)
            .send({ message: "data successfully added" });
        });
      }
    });
  },

  reportPRD: async (request, response) => {
    const {
      datetime,
      outputCM1,
      outputCM2,
      outputCM3,
      outputCM4,
      outputCM5,
      afkirCM1,
      afkirCM2,
      afkirCM3,
      afkirCM4,
      afkirCM5,
      percentageCm1,
      percentageCm2,
      percentageCm3,
      percentageCm4,
      percentageCm5,
      totalBox,
      totalMB,
      information,
    } = request.body;

    let queryData = `INSERT INTO parammachine_saka.prod_report VALUES (null,${db.escape(
      datetime
    )},${db.escape(outputCM1)}, ${db.escape(outputCM2)},${db.escape(
      outputCM3
    )},${db.escape(outputCM4)}, ${db.escape(outputCM5)},${db.escape(
      afkirCM1
    )}, ${db.escape(afkirCM2)}, ${db.escape(afkirCM3)},${db.escape(
      afkirCM4
    )}, ${db.escape(afkirCM5)}, ${db.escape(percentageCm1)},${db.escape(
      percentageCm2
    )},${db.escape(percentageCm3)},${db.escape(percentageCm4)},${db.escape(
      percentageCm5
    )}, ${db.escape(totalBox)},${db.escape(totalMB)},${db.escape(
      information
    )})`;

    db.query(queryData, (err, result) => {
      if (err) {
        return response.status(400).send(err.message);
      } else {
        let fatchquerry = "SELECT * FROM parammachine_saka.mtc_report";
        db.query(fatchquerry, (err, result) => {
          return response
            .status(200)
            .send({ message: "data successfully added" });
        });
      }
    });
  },

  lastUpdatePRD: async (request, response) => {
    let queryData =
      "SELECT datetime FROM parammachine_saka.prod_report ORDER BY id DESC LIMIT 1;";
    db.query(queryData, (err, result) => {
      return response.status(200).send(result);
    });
  },

  lastUpdateMTC: async (request, response) => {
    let queryData =
      "SELECT tanggal FROM parammachine_saka.mtc_report ORDER BY tanggal DESC LIMIT 1;";
    db.query(queryData, (err, result) => {
      return response.status(200).send(result);
    });
  },

  //=========================POWER MANAGEMENT============================================================

  getPowerData: async (request, response) => {
    const { area, start, finish } = request.query;
    
    const cleanString = area.replace(/(cMT-Gedung-UTY_|_data)/g,'')

    let queryData =
      "SELECT label,  x,  y  FROM ( SELECT (@counter := @counter + 1) AS x, label, y FROM ( SELECT p1.date AS label, p1.id AS x, p2.`" +
      cleanString +
      "` - p1.`" +
      cleanString +
      "` AS y  FROM  parammachine_saka.power_data p1 JOIN  parammachine_saka.power_data p2 ON p2.date = ( SELECT MIN(date)   FROM parammachine_saka.power_data WHERE date > p1.date  ) UNION ALL  SELECT DATE_FORMAT(FROM_UNIXTIME(p1.`time@timestamp`), '%Y-%m-%d') AS label, p1.data_index AS x, p2.`data_format_0` - p1.`data_format_0` AS y  FROM   parammachine_saka.`" +
      area +
      "` p1 JOIN              parammachine_saka.`" +
      area +
      "` p2 ON DATE_FORMAT(FROM_UNIXTIME(p2.`time@timestamp`), '%Y-%m-%d') = ( SELECT MIN(DATE_FORMAT(FROM_UNIXTIME(`time@timestamp`), '%Y-%m-%d'))  FROM parammachine_saka.`" +
      area +
      "` WHERE DATE_FORMAT(FROM_UNIXTIME(`time@timestamp`), '%Y-%m-%d') > DATE_FORMAT(FROM_UNIXTIME(p1.`time@timestamp`), '%Y-%m-%d')              )      ) AS subquery      CROSS JOIN (SELECT @counter := 0) AS counter_init  ) AS result  HAVING      label >= '" +
      start +
      "'      AND label <= '" +
      finish +
      "'";



    db.query(queryData, (err, result) => {
      return response.status(200).send(result);
    });
  },

  getPowerMonthly: async (request, response) => {
    const { area, start, finish } = request.query;
    const cleanString = area.replace(/(cMT-Gedung-UTY_|_data)/g,'')

    let queryData =
      " SELECT      DATE_FORMAT(label, '%b') AS label, MONTH(label) AS x,     SUM(y) AS y  FROM (      SELECT          p1.date AS label,          p1.id AS x,          p2.`" +
      cleanString +
      "` - p1.`" +
      cleanString +
      "` AS y      FROM          parammachine_saka.power_data p1      JOIN          parammachine_saka.power_data p2 ON p2.date = (              SELECT MIN(date)              FROM parammachine_saka.power_data              WHERE date > p1.date          )      UNION ALL      SELECT          DATE_FORMAT(FROM_UNIXTIME(p1.`time@timestamp`), '%Y-%m-%d') AS label,          p1.data_index AS x,          p2.`data_format_0` - p1.`data_format_0` AS y      FROM          parammachine_saka.`" +
      area +
      "` p1      JOIN          parammachine_saka.`" +
      area +
      "` p2          ON DATE_FORMAT(FROM_UNIXTIME(p2.`time@timestamp`), '%Y-%m-%d') = (              SELECT MIN(DATE_FORMAT(FROM_UNIXTIME(`time@timestamp`), '%Y-%m-%d'))              FROM parammachine_saka.`" +
      area +
      "`              WHERE DATE_FORMAT(FROM_UNIXTIME(`time@timestamp`), '%Y-%m-%d') > DATE_FORMAT(FROM_UNIXTIME(p1.`time@timestamp`), '%Y-%m-%d')          )  ) AS subquery  WHERE      MONTH(label) >= " +
      start +
      "      AND MONTH(label) <= " +
      finish +
      "  GROUP BY      MONTH(label)  ORDER BY      MONTH(label);  ";
      console.log(queryData);
    db.query(queryData, (err, result) => {
      return response.status(200).send(result);
    });
  },

  getPowerSec: async (request, response) => {
    const { area, start, finish } = request.query;

    let queryData =
      "SELECT (`data_index`) AS id, FROM_UNIXTIME(`time@timestamp`) AS datetime, (`data_format_6`) as freq, (`data_format_0`) as PtoP,  (`data_format_3`) as PtoN,(`data_format_7`) as Crnt FROM parammachine_saka.`" +
      area +
      "`where `time@timestamp` between " +
      start +
      " AND " +
      finish +
      ";";

    db.query(queryData, (err, result) => {
      return response.status(200).send(result);
    });
  },

  getAvgPower: async (request, response) => {
    const { area, start, finish } = request.query;

    let queryData =
      "SELECT avg(`data_format_0`) AS RR, avg(`data_format_1`) as SS, avg(`data_format_2`) as TT, avg(`data_format_3`) as RN, avg(`data_format_4`) as SN, avg(`data_format_5`) as TN FROM parammachine_saka.`" +
      area +
      "` where `time@timestamp` between " +
      start +
      " AND " +
      finish +
      " ;";

    db.query(queryData, (err, result) => {
      return response.status(200).send(result);
    });
  },

  getRangeSet: async (request, response) => {
    let queryData = "SELECT * FROM power_setpoint";
    db.query(queryData, (err, result) => {
      return response.status(200).send(result);
    });
  },
  //===============================CHILLER COMPRESOR==================================================================

  getChillerData: async (request, response) => {
    const { chiller, kompresor, start, finish } = request.query;

    let queryData = `
    SELECT 
    DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`)- INTERVAL 7 HOUR, '%Y-%m-%d %H:%i:%s') AS time,
    s.data_format_0 AS 'Status Chiller',
    COALESCE(a.data_format_0, 'No Alarm') AS 'Alarm Chiller',
    COALESCE(p.data_format_0, 'No Setpoint') AS 'Active Setpoint',
    e.data_format_0 AS 'EvapLWT',
    ewt.data_format_0 AS 'EvapEWT',
    c.data_format_0 AS 'Unit Capacity',
    d.data_format_0 AS 'Status Kompresor',
    f.data_format_0 AS 'Unit Capacity',
    g.data_format_0 AS 'Evap Presure',
    h.data_format_0 AS "Cond Presure",
    i.data_format_0 AS "Evap sat Temperature",
    j.data_format_0 AS "Cond sat Temperature",
    k.data_format_0 AS "Suction Temperature",
    l.data_format_0 AS "Discharge Temperature",
    m.data_format_0 AS "Evap Approach",
    n.data_format_0 AS "Cond Approach",
    o.data_format_0 AS "Oil Presure",
    q.data_format_0 AS "EXV Position",
    r.data_format_0 AS "Run Hour Kompressor",
    t.data_format_0 AS "Ampere Kompressor",
    u.data_format_0 AS "No of Start"
  FROM 
    parammachine_saka.\`CMT-Chiller_Status_${chiller}_data\` AS s
  LEFT JOIN 
    parammachine_saka.\`CMT-Chiller_Alarm_${chiller}_data\` AS a
  ON 
    DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(a.\`time@timestamp\`), '%Y-%m-%d %H:%i')
  LEFT JOIN 
    parammachine_saka.\`CMT-Chiller_ActiSetpoint_${chiller}_data\` AS p
  ON 
    DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(p.\`time@timestamp\`), '%Y-%m-%d %H:%i')
  LEFT JOIN 
    parammachine_saka.\`CMT-Chiller_EvapLWT_${chiller}_data\` AS e
  ON 
    DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(e.\`time@timestamp\`), '%Y-%m-%d %H:%i')
  LEFT JOIN 
    parammachine_saka.\`CMT-Chiller_EvapEWT_${chiller}_data\` AS ewt
  ON 
    DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(ewt.\`time@timestamp\`), '%Y-%m-%d %H:%i')
  LEFT JOIN 
    parammachine_saka.\`CMT-Chiller_UnitCapacity_${chiller}_data\` AS c
  ON   
    DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(c.\`time@timestamp\`), '%Y-%m-%d %H:%i')
  LEFT JOIN
    parammachine_saka.\`CMT-Chiller_Status_${kompresor}_${chiller}_data\` AS d
  ON
    DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d %H:%i')
  LEFT JOIN 
    parammachine_saka.\`CMT-Chiller_Capacity_${kompresor}_${chiller}_data\` AS f
  ON
    DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(f.\`time@timestamp\`), '%Y-%m-%d %H:%i')
  LEFT JOIN
    parammachine_saka.\`CMT-Chiller_EvapPress_${kompresor}_${chiller}_data\` AS g
  ON
    DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(g.\`time@timestamp\`), '%Y-%m-%d %H:%i')
  LEFT JOIN
    parammachine_saka.\`CMT-Chiller_CondPress_${kompresor}_${chiller}_data\` AS h
  ON
    DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(h.\`time@timestamp\`), '%Y-%m-%d %H:%i')
  LEFT JOIN
    parammachine_saka.\`CMT-Chiller_EvapSatTe_${kompresor}_${chiller}_data\` AS i
  ON
    DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(i.\`time@timestamp\`), '%Y-%m-%d %H:%i')
  LEFT JOIN
    parammachine_saka.\`CMT-Chiller_ConSatTem_${kompresor}_${chiller}_data\` AS j
  ON
    DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(j.\`time@timestamp\`), '%Y-%m-%d %H:%i')
  LEFT JOIN
    parammachine_saka.\`CMT-Chiller_SuctiTemp_${kompresor}_${chiller}_data\`AS k
  ON
    DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(k.\`time@timestamp\`), '%Y-%m-%d %H:%i')
  LEFT JOIN
    parammachine_saka.\`CMT-Chiller_DischTemp_${kompresor}_${chiller}_data\`AS l
  ON
    DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(l.\`time@timestamp\`), '%Y-%m-%d %H:%i')
  LEFT JOIN
    parammachine_saka.\`CMT-Chiller_EvapAppro_${kompresor}_${chiller}_data\`AS m
  ON
    DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(m.\`time@timestamp\`), '%Y-%m-%d %H:%i')
  LEFT JOIN
    parammachine_saka.\`CMT-Chiller_CondAppro_${kompresor}_${chiller}_data\`AS n
  ON
    DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(n.\`time@timestamp\`), '%Y-%m-%d %H:%i')
  LEFT JOIN
    parammachine_saka.\`CMT-Chiller_OilPresDf_${kompresor}_${chiller}_data\`AS o
  ON
    DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(o.\`time@timestamp\`), '%Y-%m-%d %H:%i')
  LEFT JOIN
    parammachine_saka.\`CMT-Chiller_EXVPositi_${kompresor}_${chiller}_data\`AS q
  ON
    DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(q.\`time@timestamp\`), '%Y-%m-%d %H:%i')
  LEFT JOIN
    parammachine_saka.\`CMT-Chiller_RunHour_${kompresor}_${chiller}_data\`AS r
  ON
    DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(r.\`time@timestamp\`), '%Y-%m-%d %H:%i')
  LEFT JOIN
    parammachine_saka.\`CMT-Chiller_Ampere_${kompresor}_${chiller}_data\`AS t
  ON
    DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(t.\`time@timestamp\`), '%Y-%m-%d %H:%i')
  LEFT JOIN
    parammachine_saka.\`CMT-Chiller_No.Start_${kompresor}_${chiller}_data\`AS u
  ON
    DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(u.\`time@timestamp\`), '%Y-%m-%d %H:%i')
  WHERE 
    DATE(FROM_UNIXTIME(s.\`time@timestamp\`)- INTERVAL 7 HOUR) BETWEEN '${start}' AND '${finish}';
`;


console.log(queryData);
    db.query(queryData, (err, result) => {
      return response.status(200).send(result);
    });
  },

  getGraphChiller: async (request) => {
    const { area, chiller, kompresor, start, finish } = request.query;

    const queryData = `
    SELECT
        DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`)- INTERVAL 7 HOUR, '%Y-%m-%d %H:%i:%s') AS label,
        data_index AS x,
        data_format_0 AS y
    FROM
        parammachine_saka.\`CMT-Chiller_${area}_${kompresor}_${chiller}_data\`
    WHERE
        FROM_UNIXTIME(\`time@timestamp\`) >= '${start}'
        AND FROM_UNIXTIME(\`time@timestamp\`) <= '${finish}'
    ORDER BY
        \`time@timestamp\`;
  `;
    db.query(queryData, (err, result) => {
      return response.status(200).send(result);
    });
  },

  //=====================EMS Backend====================================

  getTableEMS: async (request, response) => {
    const queryData = `SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE (TABLE_NAME LIKE '%cMT-PMWorkshop%' OR TABLE_NAME LIKE '_data') AND TABLE_NAME NOT LIKE '%_data_format' AND TABLE_NAME NOT LIKE '%_data_section';`;

    db.query(queryData, (err, result) => {
      return response.status(200).send(result);
    });
  },

  getTempChart: async (request, response) => {
    const { area, start, finish, format } = request.query;
    const queryData = `
      SELECT
        DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 7 HOUR, '%Y-%m-%d %H:%i:%s') AS label,
        data_index AS x,
        data_format_${format} AS y
      FROM \`${area}\`
      WHERE
      DATE(FROM_UNIXTIME(\`time@timestamp\`)- INTERVAL 7 HOUR) BETWEEN '${start}' AND '${finish}'
  ORDER BY
      \`time@timestamp\`;
    `;

    db.query(queryData, (err, result) => {
      if (err) {
        console.error("Error executing query:", err);
        return response.status(500).send("Internal Server Error");
      }

      // Mengonversi data y ke tipe data angka pecahan (float)
      const parsedResult = result.map((entry) => ({
        ...entry,
        y: parseFloat(entry.y) / 10,
      }));

      return response.status(200).send(parsedResult);
    });
  },

  getAllDataEMS: async (request, response) => {
    const { area, start, finish } = request.query;
    const queryData = `SELECT
    data_index AS id,
    DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 7 HOUR, '%Y-%m-%d %H:%i:%s') AS date,
    ROUND(data_format_0/10, 2) AS temp,
    ROUND(data_format_1/10, 2) AS RH,
    ROUND(data_format_2/10, 2) AS DP
    FROM \`${area}\`
    WHERE
      DATE(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 7 HOUR) BETWEEN '${start}' AND '${finish}'
    ORDER BY
      \`time@timestamp\``;

    db.query(queryData, (err, result) => {
      return response.status(200).send(result);
    });
  },

  // Water Management Backend
  waterSystem : async (request, response) => {
    const {area, start, finish} = request.query;
    const queryGet = `SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS label,
      data_index AS x,
      data_format_0 AS y
      FROM \`${area}\`
      WHERE
        DATE(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR) BETWEEN '${start}' AND '${finish}'
      ORDER BY
      \`time@timestamp\``;

    db.query(queryGet,(err, result) => {
      return response.status(200).send(result);
    });
  },

  waterSankey : async (request, response) => {
    const {start, finish} = request.query;
    const queryGet = 
    `SELECT 
    SUM(a.data_format_0) AS "Pdam",
    SUM(b.data_format_0) AS "Domestik",
    SUM(c.data_format_0) AS "Softwater",
    SUM(d.data_format_0) AS "Boiler",
    SUM(e.data_format_0) AS "InletPretreatment",
    SUM(f.data_format_0) AS "OutletPretreatment",
    SUM(g.data_format_0) AS "RejectOsmotron",
    SUM(h.data_format_0) AS "Chiller",
    SUM(i.data_format_0) AS "Taman",
    SUM(j.data_format_0) AS "WWTPBiologi",
    SUM(k.data_format_0) AS "WWTPKimia",
    SUM(l.data_format_0) AS "WWTPOutlet",
    SUM(m.data_format_0) AS "Cip",
    SUM(n.data_format_0) AS "Hotwater",
    SUM(o.data_format_0) AS "Lab",
    SUM(p.data_format_0) AS "AtasLabQC",
    SUM(q.data_format_0) AS "AtasToiletLt2",
    SUM(r.data_format_0) AS "Workshop",
    SUM(s.data_format_0) AS "AirMancur"
    FROM parammachine_saka.\`cMT-BWT_PDAM_Sehari_data\` AS a
    LEFT JOIN
    parammachine_saka.\`cMT-BWT_Dom_sehari_data\` AS b on
    DATE_FORMAT(FROM_UNIXTIME(a.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(b.\`time@timestamp\`), '%Y-%m-%d')      
    LEFT JOIN
    parammachine_saka.\`cMT-BWT_Softwater_sehari_data\` AS c on
    DATE_FORMAT(FROM_UNIXTIME(a.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(c.\`time@timestamp\`), '%Y-%m-%d')      
    LEFT JOIN
    parammachine_saka.\`cMT-BWT_Boiler_sehari_data\` AS d on
    DATE_FORMAT(FROM_UNIXTIME(a.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d')      
    LEFT JOIN
    parammachine_saka.\`cMT-BWT_Inlet_Sehari_data\` AS e on
    DATE_FORMAT(FROM_UNIXTIME(a.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(e.\`time@timestamp\`), '%Y-%m-%d')      
    LEFT JOIN
    parammachine_saka.\`cMT-BWT_Outlet_sehari_data\` AS f on
    DATE_FORMAT(FROM_UNIXTIME(a.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(f.\`time@timestamp\`), '%Y-%m-%d')      
    LEFT JOIN
    parammachine_saka.\`cMT-BWT_RO_sehari_data\` AS g on
    DATE_FORMAT(FROM_UNIXTIME(a.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(g.\`time@timestamp\`), '%Y-%m-%d')      
    LEFT JOIN
    parammachine_saka.\`cMT-BWT_Chiller_sehari_data\` AS h on
    DATE_FORMAT(FROM_UNIXTIME(a.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(h.\`time@timestamp\`), '%Y-%m-%d')      
    LEFT JOIN
    parammachine_saka.\`cMT-BWT_Taman_sehari_data\` AS i on
    DATE_FORMAT(FROM_UNIXTIME(a.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(i.\`time@timestamp\`), '%Y-%m-%d')      
    LEFT JOIN
    parammachine_saka.\`cMT-BWT_WWTP_Biologi_1d_data\` AS j on
    DATE_FORMAT(FROM_UNIXTIME(a.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(j.\`time@timestamp\`), '%Y-%m-%d')      
    LEFT JOIN
    parammachine_saka.\`cMT-BWT_WWTP_Kimia_1d_data\` AS k on
    DATE_FORMAT(FROM_UNIXTIME(a.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(k.\`time@timestamp\`), '%Y-%m-%d')      
    LEFT JOIN
    parammachine_saka.\`cMT-BWT_WWTP_Outlet_1d_data\` AS l on
    DATE_FORMAT(FROM_UNIXTIME(a.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(l.\`time@timestamp\`), '%Y-%m-%d')      
    LEFT JOIN
    parammachine_saka.\`cMT-BWT_CIP_Sehari_data\` AS m on
    DATE_FORMAT(FROM_UNIXTIME(a.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(m.\`time@timestamp\`), '%Y-%m-%d')      
    LEFT JOIN
    parammachine_saka.\`cMT-BWT_Hotwater_Sehari_data\` AS n on
    DATE_FORMAT(FROM_UNIXTIME(a.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(n.\`time@timestamp\`), '%Y-%m-%d')      
    LEFT JOIN
    parammachine_saka.\`cMT-BWT_Lab_Sehari_data\` AS o on
    DATE_FORMAT(FROM_UNIXTIME(a.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(o.\`time@timestamp\`), '%Y-%m-%d')      
    LEFT JOIN
    parammachine_saka.\`cMT-BWT_Atas QC_Sehari_data\` AS p on
    DATE_FORMAT(FROM_UNIXTIME(a.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(p.\`time@timestamp\`), '%Y-%m-%d')      
    LEFT JOIN
    parammachine_saka.\`cMT-BWT_AtsToilet_Sehari_data\` AS q on
    DATE_FORMAT(FROM_UNIXTIME(a.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(q.\`time@timestamp\`), '%Y-%m-%d')      
    LEFT JOIN
    parammachine_saka.\`cMT-BWT_Workshop_Sehari_data\` AS r on
    DATE_FORMAT(FROM_UNIXTIME(a.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(r.\`time@timestamp\`), '%Y-%m-%d')      
    LEFT JOIN
    parammachine_saka.\`cMT-BWT_AirMancur_Sehari_data\` AS s on
    DATE_FORMAT(FROM_UNIXTIME(a.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d')
    WHERE 
    DATE(FROM_UNIXTIME(a.\`time@timestamp\`)- INTERVAL 24 HOUR) BETWEEN '${start}' AND '${finish}'`;
      
    db.query(queryGet,(err, result) => {
    return response.status(200).send(result);
    });
      
  },

  // Power Management 2 Backend
  PowerDaily : async (request, response) => {
    const {area, start, finish} = request.query;
    const queryGet = `SELECT nom as x,
    tgl as label,
    nilai as y from (SELECT
    data_index as nom, 
    DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl,
    data_format_0-lag(data_format_0,1) over (order by data_index) as nilai 
    from parammachine_saka.\`${area}\` WHERE
    date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' and not (data_format_0 =0)) as c
    where not (nilai <= 0)`;

    db.query(queryGet,(err, result) => {
      return response.status(200).send(result);
    });
  },

  PowerMonthly : async (request, response) => {
    const {area, start, finish} = request.query;
    const queryGet = `select nilai as y, 
    tgl as label,
    nom as x
    from(
    SELECT
        data_index as nom, 
        DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl,
        data_format_0-lag(data_format_0,1) over (order by data_index) as nilai
        from parammachine_saka.\`${area}\` WHERE
        month(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' and not (data_format_0 =0)) as c where not (nilai <=0)`;

    db.query(queryGet,(err, result) => {
      return response.status(200).send(result);
    });
  },
  PowerSankey : async (request, response) => {
    const {start, finish} = request.query;
    const queryGet = 
    `select sum(kwh1) as "MVMDP",
    sum(kwh2) as  "LVMDP1",
    sum(kwh3) as  "LVMDP2",
    sum(kwh4) as  "SolarPanel16",
    sum(kwh5) as  "SolarPanel712",
    sum(kwh6) as  "SDP1Utility",
    sum(kwh7) as  "PPLP1UtilityLt2",
    sum(kwh8) as  "PP1Chiller",
    sum(kwh9) as  "PPLP1UtilityLt1",
    sum(kwh10) as "PP1Genset",
    sum(kwh11) as  "PP1BoilerPW",
    sum(kwh12) as  "PP1Kompressor",
    sum(kwh13) as  "PP1HWP",
    sum(kwh14) as  "PP1PUMPS",
    sum(kwh15) as  "PP1Lift",
    sum(kwh16) as  "PP1AC11",
    sum(kwh17) as  "PP1AC12",
    sum(kwh18) as  "PP1AC13",
    sum(kwh19) as  "PP1AC23",
    sum(kwh20) as  "SDP1Produksi",
    sum(kwh21) as  "SDP2Produksi",
    sum(kwh22) as  "PP2Hydrant.",
    sum(kwh23) as  "PP2Puyer",
    sum(kwh24) as  "PP2Fatigon",
    sum(kwh25) as  "PP2Mixagrib",
    sum(kwh26) as  "PP2LabLt2",
    sum(kwh27) as  "PP2Fasilitas",
    sum(kwh28) as  "PP2PackWH",
    sum(kwh29) as  "LP2PRO11",
    sum(kwh30) as  "LP2PRO12",
    sum(kwh31) as  "LP2PRO13",
    sum(kwh32) as  "LP2PRO23",
    sum(kwh33) as  "LP2PRO31",
    sum(kwh34) as  "LP2PRO41",
    sum(kwh35) as  "LP2WH11",
    sum(kwh36) as  "PPLP2Mezz11",
    sum(kwh37) as  "PPLP1PosJaga1",
    sum(kwh38) as  "PPLP1PosJaga2",
    sum(kwh39) as  "PPLP1Workshop",
    sum(kwh40) as  "PPLP1Koperasi",
    sum(kwh41) as  "GCPGenset",
    sum(kwh42) as  "SDPGenset",
    sum(kwh43) as  "PP1WWTP",
    sum(kwh44) as  "PP1DumpWater",
    sum(kwh45) as  "PP1OfficeLt1",
    sum(kwh46) as  "PP1PumpitUtama",
    sum(kwh47) as  "PPChiller1",
    sum(kwh48) as  "PPChiller2",
    sum(kwh49) as  "PPChiller3"
    from
    (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl1,
        data_format_0-lag(data_format_0,1) over (order by data_index) as kwh1 
        from parammachine_saka.\`cMT-Gedung-UTY_MVMDP_data\` WHERE
        date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' and not (data_format_0 =0)) as table1
    left join (select
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl2,
      data_format_0-lag(data_format_0,1) over (order by data_index) as kwh2
      from parammachine_saka.\`cMT-Gedung-UTY_LVMDP1_data\` WHERE
        date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' and not (data_format_0 =0)) as table2
    on tgl1 = tgl2
    left join (select
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl3,
      data_format_0-lag(data_format_0,1) over (order by data_index) as kwh3
      from parammachine_saka.\`cMT-Gedung-UTY_LVMDP2_data\` WHERE
        date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' and not (data_format_0 =0)) as table3
    on tgl1 = tgl3
    left join (select
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl4,
      data_format_0-lag(data_format_0,1) over (order by data_index) as kwh4
      from parammachine_saka.\`cMT-Gedung-UTY_Inverter1-6_SP_data\` WHERE
        date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' and not (data_format_0 =0)) as table4
    on tgl1 = tgl4
    left join (select
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl5,
      data_format_0-lag(data_format_0,1) over (order by data_index) as kwh5
      from parammachine_saka.\`cMT-Gedung-UTY_Inverter7-12_SP_data\` WHERE
        date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' and not (data_format_0 =0)) as table5
    on tgl1 = tgl5
    left join (select
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl6,
      data_format_0-lag(data_format_0,1) over (order by data_index) as kwh6
      from parammachine_saka.\`cMT-Gedung-UTY_SDP.1-Utility_data\` WHERE
        date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' and not (data_format_0 =0)) as table6
    on tgl1 = tgl6
    left join (select
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl7,
      data_format_0-lag(data_format_0,1) over (order by data_index) as kwh7
      from parammachine_saka.\`cMT-Gedung-UTY_PPLP.1-UTY_Lt.2_data\` WHERE
        date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' and not (data_format_0 =0)) as table7
    on tgl1 = tgl7
    left join (select
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl8,
      data_format_0-lag(data_format_0,1) over (order by data_index) as kwh8
      from parammachine_saka.\`cMT-Gedung-UTY_PP.1-Chiller_data\` WHERE
        date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' and not (data_format_0 =0)) as table8
    on tgl1 = tgl8
    left join (select
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl9,
      data_format_0-lag(data_format_0,1) over (order by data_index) as kwh9
      from parammachine_saka.\`cMT-Gedung-UTY_PPLP.1-UTY_Lt.1_data\` WHERE
        date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' and not (data_format_0 =0)) as table9
    on tgl1 = tgl9
    left join (select
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl10,
      data_format_0-lag(data_format_0,1) over (order by data_index) as kwh10
      from parammachine_saka.\`cMT-Gedung-UTY_PP.1-Genset_data\` WHERE
        date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' and not (data_format_0 =0)) as table10
    on tgl1 = tgl10
    left join (select
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl11,
      data_format_0-lag(data_format_0,1) over (order by data_index) as kwh11
      from parammachine_saka.\`cMT-Gedung-UTY_PP.1-Boiler&PW_data\` WHERE
        date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' and not (data_format_0 =0)) as table11
    on tgl1 = tgl11
    left join (select
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl12,
      data_format_0-lag(data_format_0,1) over (order by data_index) as kwh12
      from parammachine_saka.\`cMT-Gedung-UTY_PP.1-Kompressor_data\` WHERE
        date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' and not (data_format_0 =0)) as table12
    on tgl1 = tgl12
    left join (select
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl13,
      data_format_0-lag(data_format_0,1) over (order by data_index) as kwh13
      from parammachine_saka.\`cMT-Gedung-UTY_PP.1-HWP_data\` WHERE
        date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' and not (data_format_0 =0)) as table13
    on tgl1 = tgl13
    left join (select
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl14,
      data_format_0-lag(data_format_0,1) over (order by data_index) as kwh14
      from parammachine_saka.\`cMT-Gedung-UTY_PP.1-PUMPS_data\` WHERE
        date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' and not (data_format_0 =0)) as table14
    on tgl1 = tgl14
    left join (select
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl15,
      data_format_0-lag(data_format_0,1) over (order by data_index) as kwh15
      from parammachine_saka.\`cMT-Gedung-UTY_PP.1-Lift_data\` WHERE
        date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' and not (data_format_0 =0)) as table15
    on tgl1 = tgl15
    left join (select
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl16,
      data_format_0-lag(data_format_0,1) over (order by data_index) as kwh16
      from parammachine_saka.\`cMT-Gedung-UTY_PP.1-AC1.1_data\` WHERE
        date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' and not (data_format_0 =0)) as table16
    on tgl1 = tgl16
    left join (select
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl17,
      data_format_0-lag(data_format_0,1) over (order by data_index) as kwh17
      from parammachine_saka.\`cMT-Gedung-UTY_PP.1-AC1.2_data\` WHERE
        date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' and not (data_format_0 =0)) as table17
    on tgl1 = tgl17
    left join (select
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl18,
      data_format_0-lag(data_format_0,1) over (order by data_index) as kwh18
      from parammachine_saka.\`cMT-Gedung-UTY_PP.1-AC1.3_data\` WHERE
        date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' and not (data_format_0 =0)) as table18
    on tgl1 = tgl18
    left join (select
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl19,
      data_format_0-lag(data_format_0,1) over (order by data_index) as kwh19
      from parammachine_saka.\`cMT-Gedung-UTY_PP.1-AC2.3_data\` WHERE
        date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' and not (data_format_0 =0)) as table19
    on tgl1 = tgl19
    left join (select
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl20,
      data_format_0-lag(data_format_0,1) over (order by data_index) as kwh20
      from parammachine_saka.\`cMT-Gedung-UTY_SDP.1-Produksi_data\` WHERE
        date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' and not (data_format_0 =0)) as table20
    on tgl1 = tgl20
    left join (select
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl21,
      data_format_0-lag(data_format_0,1) over (order by data_index) as kwh21
      from parammachine_saka.\`cMT-Gedung-UTY_SDP.2-Produksi_data\` WHERE
        date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' and not (data_format_0 =0)) as table21
    on tgl1 = tgl21
    left join (select
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl22,
      data_format_0-lag(data_format_0,1) over (order by data_index) as kwh22
      from parammachine_saka.\`cMT-Gedung-UTY_PP.2-Hydrant_data\` WHERE
        date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' and not (data_format_0 =0)) as table22
    on tgl1 = tgl22
    left join (select
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl23,
      data_format_0-lag(data_format_0,1) over (order by data_index) as kwh23
      from parammachine_saka.\`cMT-Gedung-UTY_PP.2-Fatigon_data\` WHERE
        date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' and not (data_format_0 =0)) as table23
    on tgl1 = tgl23
    left join (select
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl24,
      data_format_0-lag(data_format_0,1) over (order by data_index) as kwh24
      from parammachine_saka.\`cMT-Gedung-UTY_PP.2-Puyer_data\` WHERE
        date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' and not (data_format_0 =0)) as table24
    on tgl1 = tgl24
    left join (select
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl25,
      data_format_0-lag(data_format_0,1) over (order by data_index) as kwh25
      from parammachine_saka.\`cMT-Gedung-UTY_PP.2-Mixagrib_data\` WHERE
        date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' and not (data_format_0 =0)) as table25
    on tgl1 = tgl25
    left join (select
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl26,
      data_format_0-lag(data_format_0,1) over (order by data_index) as kwh26
      from parammachine_saka.\`cMT-Gedung-UTY_PP.2-LabLt.2_data\` WHERE
        date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' and not (data_format_0 =0)) as table26
    on tgl1 = tgl26
    left join (select
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl27,
      data_format_0-lag(data_format_0,1) over (order by data_index) as kwh27
      from parammachine_saka.\`cMT-Gedung-UTY_PP.2-Fasilitas_data\` WHERE
        date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' and not (data_format_0 =0)) as table27
    on tgl1 = tgl27
    left join (select
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl28,
      data_format_0-lag(data_format_0,1) over (order by data_index) as kwh28
      from parammachine_saka.\`cMT-Gedung-UTY_PP.2-PackWH_data\` WHERE
        date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' and not (data_format_0 =0)) as table28
    on tgl1 = tgl28
    left join (select
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl29,
      data_format_0-lag(data_format_0,1) over (order by data_index) as kwh29
      from parammachine_saka.\`cMT-Gedung-UTY_LP.2-PRO1.1_data\` WHERE
        date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' and not (data_format_0 =0)) as table29
    on tgl1 = tgl29
    left join (select
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl30,
      data_format_0-lag(data_format_0,1) over (order by data_index) as kwh30
      from parammachine_saka.\`cMT-Gedung-UTY_LP.2-PRO1.2_data\` WHERE
        date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' and not (data_format_0 =0)) as table30
    on tgl1 = tgl30
    left join (select
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl31,
      data_format_0-lag(data_format_0,1) over (order by data_index) as kwh31
      from parammachine_saka.\`cMT-Gedung-UTY_LP.2-PRO1.3_data\` WHERE
        date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' and not (data_format_0 =0)) as table31
    on tgl1 = tgl31
    left join (select
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl32,
      data_format_0-lag(data_format_0,1) over (order by data_index) as kwh32
      from parammachine_saka.\`cMT-Gedung-UTY_LP.2-PRO2.3_data\` WHERE
        date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' and not (data_format_0 =0)) as table32
    on tgl1 = tgl32
    left join (select
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl33,
      data_format_0-lag(data_format_0,1) over (order by data_index) as kwh33
      from parammachine_saka.\`cMT-Gedung-UTY_LP.2-PRO3.1_data\` WHERE
        date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' and not (data_format_0 =0)) as table33
    on tgl1 = tgl33
    left join (select
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl34,
      data_format_0-lag(data_format_0,1) over (order by data_index) as kwh34
      from parammachine_saka.\`cMT-Gedung-UTY_LP.2-PRO4.1_data\` WHERE
        date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' and not (data_format_0 =0)) as table34
    on tgl1 = tgl34
    left join (select
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl35,
      data_format_0-lag(data_format_0,1) over (order by data_index) as kwh35
      from parammachine_saka.\`cMT-Gedung-UTY_LP.2WH1.1_data\` WHERE
        date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' and not (data_format_0 =0)) as table35
    on tgl1 = tgl35
    left join (select
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl36,
      data_format_0-lag(data_format_0,1) over (order by data_index) as kwh36
      from parammachine_saka.\`cMT-Gedung-UTY_LP.2MEZZ1.1_data\` WHERE
        date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' and not (data_format_0 =0)) as table36
    on tgl1 = tgl36
    left join (select
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl37,
      data_format_0-lag(data_format_0,1) over (order by data_index) as kwh37
      from parammachine_saka.\`cMT-Gedung-UTY_PPLP.2-PosJaga1_data\` WHERE
        date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' and not (data_format_0 =0)) as table37
    on tgl1 = tgl37
    left join (select
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl38,
      data_format_0-lag(data_format_0,1) over (order by data_index) as kwh38
      from parammachine_saka.\`cMT-Gedung-UTY_PPLP.2-PosJaga2_data\` WHERE
        date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' and not (data_format_0 =0)) as table38
    on tgl1 = tgl38
    left join (select
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl39,
      data_format_0-lag(data_format_0,1) over (order by data_index) as kwh39
      from parammachine_saka.\`cMT-Gedung-UTY_PPLP.2-Workshop_data\` WHERE
        date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' and not (data_format_0 =0)) as table39
    on tgl1 = tgl39
    left join (select
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl40,
      data_format_0-lag(data_format_0,1) over (order by data_index) as kwh40
      from parammachine_saka.\`cMT-Gedung-UTY_PPLP.2-Koperasi_data\` WHERE
        date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' and not (data_format_0 =0)) as table40
    on tgl1 = tgl40
    left join (select
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl41,
      data_format_0-lag(data_format_0,1) over (order by data_index) as kwh41
      from parammachine_saka.\`cMT-Gedung-UTY_GCP_Genset_data\` WHERE
        date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' and not (data_format_0 =0)) as table41
    on tgl1 = tgl41
    left join (select
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl42,
      data_format_0-lag(data_format_0,1) over (order by data_index) as kwh42
      from parammachine_saka.\`cMT-Gedung-UTY_SDP_Genset_data\` WHERE
        date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' and not (data_format_0 =0)) as table42
    on tgl1 = tgl42
    left join (select
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl43,
      data_format_0-lag(data_format_0,1) over (order by data_index) as kwh43
      from parammachine_saka.\`cMT-Gedung-UTY_PP.1WWTP_data\` WHERE
        date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' and not (data_format_0 =0)) as table43
    on tgl1 = tgl43
    left join (select
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl44,
      data_format_0-lag(data_format_0,1) over (order by data_index) as kwh44
      from parammachine_saka.\`cMT-Gedung-UTY_PP.2DumbWaiter_data\` WHERE
        date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' and not (data_format_0 =0)) as table44
    on tgl1 = tgl44
    left join (select
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl45,
      data_format_0-lag(data_format_0,1) over (order by data_index) as kwh45
      from parammachine_saka.\`cMT-Gedung-UTY_PPLP.2OfficeLt1_data\` WHERE
        date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' and not (data_format_0 =0)) as table45
    on tgl1 = tgl45
    left join (select
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl46,
      data_format_0-lag(data_format_0,1) over (order by data_index) as kwh46
      from parammachine_saka.\`cMT-Gedung-UTY_PP.2Pumpit_data\` WHERE
        date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' and not (data_format_0 =0)) as table46
    on tgl1 = tgl46
    left join (select
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl47,
      data_format_0-lag(data_format_0,1) over (order by data_index) as kwh47
      from parammachine_saka.\`cMT-Gedung-UTY_Chiller1_data\` WHERE
        date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' and not (data_format_0 =0)) as table47
    on tgl1 = tgl47
    left join (select
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl48,
      data_format_0-lag(data_format_0,1) over (order by data_index) as kwh48
      from parammachine_saka.\`cMT-Gedung-UTY_Chiller2_data\` WHERE
        date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' and not (data_format_0 =0)) as table48
    on tgl1 = tgl48
    left join (select
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl49,
      data_format_0-lag(data_format_0,1) over (order by data_index) as kwh49
      from parammachine_saka.\`cMT-Gedung-UTY_Chiller3_data\` WHERE
        date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' and not (data_format_0 =0)) as table49
    on tgl1 = tgl49`;

    db.query(queryGet,(err, result) => {
      return response.status(200).send(result);
    });
  },
};
