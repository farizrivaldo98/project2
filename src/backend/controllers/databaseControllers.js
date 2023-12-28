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
    data_format_0-lag(data_format_0,1) over (order by tgl) as nilai 
    from parammachine_saka.\`${area}\` WHERE
    date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}') as c WHERE NOT (nilai <=0)
    `;

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
        data_format_0-lag(data_format_0,1) over (order by tgl) as nilai
        from parammachine_saka.\`${area}\` WHERE
        month(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}') as c WHERE NOT (nilai <=0)`;

    db.query(queryGet,(err, result) => {
      return response.status(200).send(result);
    });
  },
  PowerSankey : async (request, response) => {
    const {start, finish} = request.query;
    const queryGet = 
    `select MVMDP as "MVMDP",
    lvmdp1 as  "LVMDP1",
    lvmdp2 as  "LVMDP2",
    SP16 as  "SolarPanel16",
    SP712 as  "SolarPanel712",
    utility as  "SDP1Utility",
    utilitylt2 as  "PPLP1UtilityLt2",
    chiller as  "PP1Chiller",
    utilitylt1 as  "PPLP1UtilityLt1",
    genset as "PP1Genset",
    boilerPW as  "PP1BoilerPW",
    kompressor as  "PP1Kompressor",
    HWP as  "PP1HWP",
    pump as  "PP1PUMPS",
    lift as  "PP1Lift",
    ac11 as  "PP1AC1.1",
    ac12 as  "PP1AC1.2",
    ac13 as  "PP1AC1.3",
    ac23 as  "PP1AC2.3",
    produksi1 as  "SDP1Produksi",
    produksi2 as  "SDP2Produksi",
    hydrant as  "PP2Hydrant.",
    puyer as  "PP2Puyer",
    fatigon as  "PP2Fatigon",
    mixagrib as  "PP2Mixagrib",
    lablt2 as  "PP2LabLt2",
    fasilitas as  "PP2Fasilitas",
    packwh as  "PP2PackWH",
    pro11 as  "LP2PRO11",
    pro12 as  "LP2PRO12",
    pro13 as  "LP2PRO13",
    pro23 as  "LP2PRO23",
    pro31 as  "LP2PRO31",
    pro41 as  "LP2PRO41",
    wh11 as  "LP2WH11",
    mezz11 as  "PPLP2Mezz11",
    posjaga1 as  "PPLP.1PosJaga1",
    PosJaga2 as  "PPLP.1PosJaga2",
    workshop as  "PPLP.1Workshop",
    koperasi as  "PPLP.1Koperasi",
    gcpgenset as  "GCPGenset",
    sdpgenset as  "SDPGenset",
    wwtp as  "PP1WWTP",
    dumpwater as  "PP1DumpWater",
    officelt1 as  "PP1OfficeLt.1",
    pumpitutama as  "PP1PumpitUtama",
    chiller1 as  "PPChiller1",
    chiller2 as  "PPChiller2",
    chiller3 as  "PPChiller3"
    from
      (SELECT sum(kwh1) as MVMDP from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl1,
      data_format_0-lag(data_format_0,1) over (order by tgl1) as kwh1 
      from parammachine_saka.\`cMT-Gedung-UTY_MVMDP_data\` WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}') as table1
      where kwh1>0) as total1, 

      (SELECT sum(kwh2) as lvmdp1 from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl2,
      data_format_0-lag(data_format_0,1) over (order by tgl2) as kwh2
      from parammachine_saka.\`cMT-Gedung-UTY_LVMDP1_data\` WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' ) as table2
      where kwh2>0) as total2, 

      (SELECT sum(kwh3) as lvmdp2 from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl3,
      data_format_0-lag(data_format_0,1) over (order by tgl3) as kwh3
      from parammachine_saka.\`cMT-Gedung-UTY_LVMDP2_data\` WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' ) as table3
      where kwh3>0) as total3,

      (SELECT sum(kwh4) as SP16 from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl4,
      data_format_0-lag(data_format_0,1) over (order by tgl4) as kwh4
      from parammachine_saka.\`cMT-Gedung-UTY_Inverter1-6_SP_data\` WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' ) as table4
      where kwh4>0) as total4, 
      
      (SELECT sum(kwh5) as SP712 from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl5,
      data_format_0-lag(data_format_0,1) over (order by tgl5) as kwh5
      from parammachine_saka.\`cMT-Gedung-UTY_Inverter7-12_SP_data\` WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' ) as table5
      where kwh5>0) as total5, 

      (SELECT sum(kwh6) as utility from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl6,
      data_format_0-lag(data_format_0,1) over (order by tgl6) as kwh6
      from parammachine_saka.\`cMT-Gedung-UTY_SDP.1-Utility_data\` WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' ) as table6
      where kwh6>0) as total6, 

      (SELECT sum(kwh7) as utilitylt2 from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl7,
      data_format_0-lag(data_format_0,1) over (order by tgl7) as kwh7
      from parammachine_saka.\`cMT-Gedung-UTY_PPLP.1-UTY_Lt.2_data\` WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' ) as table7
      where kwh7>0) as total7, 

      (SELECT sum(kwh8) as chiller from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl8,
      data_format_0-lag(data_format_0,1) over (order by tgl8) as kwh8
      from parammachine_saka.\`cMT-Gedung-UTY_PP.1-Chiller_data\` WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' ) as table8
      where kwh8>0) as total8, 

      (SELECT sum(kwh9) as utilitylt1 from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl9,
      data_format_0-lag(data_format_0,1) over (order by tgl9) as kwh9
      from parammachine_saka.\`cMT-Gedung-UTY_PPLP.1-UTY_Lt.1_data\` WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' ) as table9
      where kwh9>0) as total9, 

      (SELECT sum(kwh10) as genset from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl10,
      data_format_0-lag(data_format_0,1) over (order by tgl10) as kwh10
      from parammachine_saka.\`cMT-Gedung-UTY_PP.1-Genset_data\` WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' ) as table10
      where kwh10>0) as total10, 

      (SELECT sum(kwh11) as boilerPW from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl11,
      data_format_0-lag(data_format_0,1) over (order by tgl11) as kwh11
      from parammachine_saka.\`cMT-Gedung-UTY_PP.1-Boiler&PW_data\` WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' ) as table11
      where kwh11>0) as total11, 

      (SELECT sum(kwh12) as kompressor from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl12,
      data_format_0-lag(data_format_0,1) over (order by tgl12) as kwh12
      from parammachine_saka.\`cMT-Gedung-UTY_PP.1-Kompressor_data\` WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' ) as table12
      where kwh12>0) as total12, 

      (SELECT sum(kwh13) as HWP from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl13,
      data_format_0-lag(data_format_0,1) over (order by tgl13) as kwh13
      from parammachine_saka.\`cMT-Gedung-UTY_PP.1-HWP_data\` WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' ) as table13
      where kwh13>0) as total13, 

      (SELECT sum(kwh14) as pump from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl14,
      data_format_0-lag(data_format_0,1) over (order by tgl14) as kwh14
      from parammachine_saka.\`cMT-Gedung-UTY_PP.1-PUMPS_data\` WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' ) as table14
      where kwh14>0) as total14, 

      (SELECT sum(kwh15) as lift from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl15,
      data_format_0-lag(data_format_0,1) over (order by tgl15) as kwh15
      from parammachine_saka.\`cMT-Gedung-UTY_PP.1-Lift_data\` WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' ) as table15
      where kwh15>0) as total15, 

      (SELECT sum(kwh16) as ac11 from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl16,
      data_format_0-lag(data_format_0,1) over (order by tgl16) as kwh16
      from parammachine_saka.\`cMT-Gedung-UTY_PP.1-AC1.1_data\` WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' ) as table16
      where kwh16>0) as total16, 

      (SELECT sum(kwh17) as ac12 from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl17,
      data_format_0-lag(data_format_0,1) over (order by tgl17) as kwh17
      from parammachine_saka.\`cMT-Gedung-UTY_PP.1-AC1.2_data\` WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' ) as table17
      where kwh17>0) as total17, 

      (SELECT sum(kwh18) as ac13 from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl18,
      data_format_0-lag(data_format_0,1) over (order by tgl18) as kwh18
      from parammachine_saka.\`cMT-Gedung-UTY_PP.1-AC1.3_data\` WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' ) as table18
      where kwh18>0) as total18, 

      (SELECT sum(kwh19) as ac23 from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl19,
      data_format_0-lag(data_format_0,1) over (order by tgl19) as kwh19
      from parammachine_saka.\`cMT-Gedung-UTY_PP.1-AC2.3_data\` WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' ) as table19
      where kwh19>0) as total19, 

      (SELECT sum(kwh20) as produksi1 from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl20,
      data_format_0-lag(data_format_0,1) over (order by tgl20) as kwh20
      from parammachine_saka.\`cMT-Gedung-UTY_SDP.1-Produksi_data\` WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' ) as table20
      where kwh20>0) as total20, 

      (SELECT sum(kwh21) as produksi2 from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl21,
      data_format_0-lag(data_format_0,1) over (order by tgl21) as kwh21
      from parammachine_saka.\`cMT-Gedung-UTY_SDP.2-Produksi_data\` WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' ) as table21
      where kwh21>0) as total21, 

      (SELECT sum(kwh22) as hydrant from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl22,
      data_format_0-lag(data_format_0,1) over (order by tgl22) as kwh22
      from parammachine_saka.\`cMT-Gedung-UTY_PP.2-Hydrant_data\` WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' ) as table22
      where kwh22>0) as total22, 

      (SELECT sum(kwh23) as fatigon from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl23,
      data_format_0-lag(data_format_0,1) over (order by tgl23) as kwh23
      from parammachine_saka.\`cMT-Gedung-UTY_PP.2-Fatigon_data\` WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' ) as table23
      where kwh23>0) as total23, 

      (SELECT sum(kwh24) as puyer from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl24,
      data_format_0-lag(data_format_0,1) over (order by tgl24) as kwh24
      from parammachine_saka.\`cMT-Gedung-UTY_PP.2-Puyer_data\` WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' ) as table24
      where kwh24>0) as total24, 

      (SELECT sum(kwh25) as mixagrib from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl25,
      data_format_0-lag(data_format_0,1) over (order by tgl25) as kwh25
      from parammachine_saka.\`cMT-Gedung-UTY_PP.2-Mixagrib_data\` WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' ) as table25
      where kwh25>0) as total25, 

      (SELECT sum(kwh26) as lablt2 from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl26,
      data_format_0-lag(data_format_0,1) over (order by tgl26) as kwh26
      from parammachine_saka.\`cMT-Gedung-UTY_PP.2-LabLt.2_data\` WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' ) as table26
      where kwh26>0) as total26, 

      (SELECT sum(kwh27) as fasilitas from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl27,
      data_format_0-lag(data_format_0,1) over (order by tgl27) as kwh27
      from parammachine_saka.\`cMT-Gedung-UTY_PP.2-Fasilitas_data\` WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' ) as table27
      where kwh27>0) as total27, 

      (SELECT sum(kwh28) as packwh from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl28,
      data_format_0-lag(data_format_0,1) over (order by tgl28) as kwh28
      from parammachine_saka.\`cMT-Gedung-UTY_PP.2-PackWH_data\` WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' ) as table28
      where kwh28>0) as total28, 

      (SELECT sum(kwh29) as pro11 from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl29,
      data_format_0-lag(data_format_0,1) over (order by tgl29) as kwh29
      from parammachine_saka.\`cMT-Gedung-UTY_LP.2-PRO1.1_data\` WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' ) as table29
      where kwh29>0) as total29, 

      (SELECT sum(kwh30) as pro12 from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl30,
      data_format_0-lag(data_format_0,1) over (order by tgl30) as kwh30
      from parammachine_saka.\`cMT-Gedung-UTY_LP.2-PRO1.2_data\` WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' ) as table30
      where kwh30>0) as total30, 

      (SELECT sum(kwh31) as pro13 from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl31,
      data_format_0-lag(data_format_0,1) over (order by tgl31) as kwh31
      from parammachine_saka.\`cMT-Gedung-UTY_LP.2-PRO1.3_data\` WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' ) as table31
      where kwh31>0) as total31, 

      (SELECT sum(kwh32) as pro23 from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl32,
      data_format_0-lag(data_format_0,1) over (order by tgl32) as kwh32
      from parammachine_saka.\`cMT-Gedung-UTY_LP.2-PRO2.3_data\` WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' ) as table32
      where kwh32>0) as total32, 

      (SELECT sum(kwh33) as pro31 from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl33,
      data_format_0-lag(data_format_0,1) over (order by tgl33) as kwh33
      from parammachine_saka.\`cMT-Gedung-UTY_LP.2-PRO3.1_data\` WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' ) as table33
      where kwh33>0) as total33, 

      (SELECT sum(kwh34) as pro41 from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl34,
      data_format_0-lag(data_format_0,1) over (order by tgl34) as kwh34
      from parammachine_saka.\`cMT-Gedung-UTY_LP.2-PRO4.1_data\` WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' ) as table34
      where kwh34>0) as total34, 

      (SELECT sum(kwh35) as wh11 from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl35,
      data_format_0-lag(data_format_0,1) over (order by tgl35) as kwh35
      from parammachine_saka.\`cMT-Gedung-UTY_LP.2WH1.1_data\` WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' ) as table35
      where kwh35>0) as total35, 

      (SELECT sum(kwh36) as mezz11 from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl36,
      data_format_0-lag(data_format_0,1) over (order by tgl36) as kwh36
      from parammachine_saka.\`cMT-Gedung-UTY_LP.2MEZZ1.1_data\` WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' ) as table36
      where kwh36>0) as total36, 

      (SELECT sum(kwh37) as posjaga1 from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl37,
      data_format_0-lag(data_format_0,1) over (order by tgl37) as kwh37
      from parammachine_saka.\`cMT-Gedung-UTY_PPLP.2-PosJaga1_data\` WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' ) as table37
      where kwh37>0) as total37, 

      (SELECT sum(kwh38) as PosJaga2 from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl38,
      data_format_0-lag(data_format_0,1) over (order by tgl38) as kwh38
      from parammachine_saka.\`cMT-Gedung-UTY_PPLP.2-PosJaga2_data\` WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' ) as table38
      where kwh38>0) as total38, 

      (SELECT sum(kwh39) as workshop from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl39,
      data_format_0-lag(data_format_0,1) over (order by tgl39) as kwh39
      from parammachine_saka.\`cMT-Gedung-UTY_PPLP.2-Workshop_data\` WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' ) as table39
      where kwh39>0) as total39, 

      (SELECT sum(kwh40) as koperasi from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl40,
      data_format_0-lag(data_format_0,1) over (order by tgl40) as kwh40
      from parammachine_saka.\`cMT-Gedung-UTY_PPLP.2-Koperasi_data\` WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' ) as table40
      where kwh40>0) as total40, 

      (SELECT sum(kwh41) as gcpgenset from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl41,
      data_format_0-lag(data_format_0,1) over (order by tgl41) as kwh41
      from parammachine_saka.\`cMT-Gedung-UTY_GCP_Genset_data\` WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' ) as table41
      where kwh41>0) as total41, 

      (SELECT sum(kwh42) as sdpgenset from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl42,
      data_format_0-lag(data_format_0,1) over (order by tgl42) as kwh42
      from parammachine_saka.\`cMT-Gedung-UTY_SDP_Genset_data\` WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' ) as table42
      where kwh42>0) as total42, 

      (SELECT sum(kwh43) as wwtp from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl43,
      data_format_0-lag(data_format_0,1) over (order by tgl43) as kwh43
      from parammachine_saka.\`cMT-Gedung-UTY_PP.1WWTP_data\` WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' ) as table43
      where kwh43>0) as total43, 

      (SELECT sum(kwh44) as dumpwater from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl44,
      data_format_0-lag(data_format_0,1) over (order by tgl44) as kwh44
      from parammachine_saka.\`cMT-Gedung-UTY_PP.2DumbWaiter_data\` WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' ) as table44
      where kwh44>0) as total44, 

      (SELECT sum(kwh45) as officelt1 from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl45,
      data_format_0-lag(data_format_0,1) over (order by tgl45) as kwh45
      from parammachine_saka.\`cMT-Gedung-UTY_PPLP.2OfficeLt1_data\` WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' ) as table45
      where kwh45>0) as total45, 

      (SELECT sum(kwh46) as pumpitutama from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl46,
      data_format_0-lag(data_format_0,1) over (order by tgl46) as kwh46
      from parammachine_saka.\`cMT-Gedung-UTY_PP.2Pumpit_data\` WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' ) as table46
      where kwh46>0) as total46, 

      (SELECT sum(kwh47) as chiller1 from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl47,
      data_format_0-lag(data_format_0,1) over (order by tgl47) as kwh47
      from parammachine_saka.\`cMT-Gedung-UTY_Chiller1_data\` WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' ) as table47
      where kwh47>0) as total47, 

      (SELECT sum(kwh48) as chiller2 from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl48,
      data_format_0-lag(data_format_0,1) over (order by tgl48 ) as kwh48
      from parammachine_saka.\`cMT-Gedung-UTY_Chiller2_data\` WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' ) as table48
      where kwh48>0) as total48, 

      (SELECT sum(kwh49) as chiller3 from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) - INTERVAL 24 HOUR, '%Y-%m-%d') AS tgl49,
      data_format_0-lag(data_format_0,1) over (order by tgl49) as kwh49
      from parammachine_saka.\`cMT-Gedung-UTY_Chiller3_data\` WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' ) as table49
      where kwh49>0) as total49
    `;

    db.query(queryGet,(err, result) => {
      return response.status(200).send(result);
    });
  },
};
