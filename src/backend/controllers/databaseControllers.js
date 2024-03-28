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

      console.log(queryData);

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
        let fatchquerry = "SELECT * FROM parammachine_saka.prod_report";
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
    console.log(queryData);


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
    parammachine_saka.\`CMT-Chiller_R-Status${chiller}_data\` AS s
  LEFT JOIN 
    parammachine_saka.\`CMT-Chiller_R-Alarm${chiller}_data\` AS a
  ON 
    DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(a.\`time@timestamp\`), '%Y-%m-%d %H:%i')
LEFT JOIN 
    parammachine_saka.\`CMT-Chiller_R-ActiSetpoi${chiller}_data\` AS p
  ON 
    DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(p.\`time@timestamp\`), '%Y-%m-%d %H:%i')
  LEFT JOIN 
    parammachine_saka.\`CMT-Chiller_R-EvapLWT${chiller}_data\` AS e
  ON 
    DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(e.\`time@timestamp\`), '%Y-%m-%d %H:%i')
  LEFT JOIN 
    parammachine_saka.\`CMT-Chiller_R-EvapEWT${chiller}_data\` AS ewt
  ON 
    DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(ewt.\`time@timestamp\`), '%Y-%m-%d %H:%i')
  LEFT JOIN 
    parammachine_saka.\`CMT-Chiller_R-UnitCap${chiller}_data\` AS c
  ON   
    DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(c.\`time@timestamp\`), '%Y-%m-%d %H:%i')
  LEFT JOIN
    parammachine_saka.\`CMT-Chiller_R-Status${kompresor}${chiller}_data\` AS d
  ON
    DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d %H:%i')
  LEFT JOIN 
    parammachine_saka.\`CMT-Chiller_R-Capacity${kompresor}${chiller}_data\` AS f
  ON
    DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(f.\`time@timestamp\`), '%Y-%m-%d %H:%i')
  LEFT JOIN
    parammachine_saka.\`CMT-Chiller_R-EvapPress${kompresor}${chiller}_data\` AS g
  ON
    DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(g.\`time@timestamp\`), '%Y-%m-%d %H:%i')
  LEFT JOIN
    parammachine_saka.\`CMT-Chiller_R-CondPress${kompresor}${chiller}_data\` AS h
  ON
    DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(h.\`time@timestamp\`), '%Y-%m-%d %H:%i')
  LEFT JOIN
    parammachine_saka.\`CMT-Chiller_R-EvapSatTe${kompresor}${chiller}_data\` AS i
  ON
    DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(i.\`time@timestamp\`), '%Y-%m-%d %H:%i')
  LEFT JOIN
    parammachine_saka.\`CMT-Chiller_R-ConSatTem${kompresor}${chiller}_data\` AS j
  ON
    DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(j.\`time@timestamp\`), '%Y-%m-%d %H:%i')
  LEFT JOIN
    parammachine_saka.\`CMT-Chiller_R-SuctiTemp${kompresor}${chiller}_data\`AS k
  ON
    DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(k.\`time@timestamp\`), '%Y-%m-%d %H:%i')
  LEFT JOIN
    parammachine_saka.\`CMT-Chiller_R-DischTemp${kompresor}${chiller}_data\`AS l
  ON
    DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(l.\`time@timestamp\`), '%Y-%m-%d %H:%i')
  LEFT JOIN
    parammachine_saka.\`CMT-Chiller_R-EvapAppro${kompresor}${chiller}_data\`AS m
  ON
    DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(m.\`time@timestamp\`), '%Y-%m-%d %H:%i')
  LEFT JOIN
    parammachine_saka.\`CMT-Chiller_R-CondAppro${kompresor}${chiller}_data\`AS n
  ON
    DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(n.\`time@timestamp\`), '%Y-%m-%d %H:%i')
  LEFT JOIN
    parammachine_saka.\`CMT-Chiller_R-OilPresDf${kompresor}${chiller}_data\`AS o
  ON
    DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(o.\`time@timestamp\`), '%Y-%m-%d %H:%i')
  LEFT JOIN
    parammachine_saka.\`CMT-Chiller_R-EXVPositi${kompresor}${chiller}_data\`AS q
  ON
    DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(q.\`time@timestamp\`), '%Y-%m-%d %H:%i')
  LEFT JOIN
    parammachine_saka.\`CMT-Chiller_R-RunHour${kompresor}${chiller}_data\`AS r
  ON
    DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(r.\`time@timestamp\`), '%Y-%m-%d %H:%i')
  LEFT JOIN
    parammachine_saka.\`CMT-Chiller_R-Ampere${kompresor}${chiller}_data\`AS t
  ON
    DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(t.\`time@timestamp\`), '%Y-%m-%d %H:%i')
  LEFT JOIN
    parammachine_saka.\`CMT-Chiller_R-No.Start${kompresor}${chiller}_data\`AS u
  ON
    DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(u.\`time@timestamp\`), '%Y-%m-%d %H:%i')
     WHERE 
    DATE(FROM_UNIXTIME(s.\`time@timestamp\`)- INTERVAL 7 HOUR) BETWEEN '${start}' AND '${finish}'
    group by s.data_index
    order by DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i');
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
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`), '%Y-%m-%d') AS label,
      data_index AS x,
      data_format_0 AS y
      FROM \`${area}\`
      WHERE
        DATE(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}'
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
    a AS "Pdam",
    b AS "Domestik",
    c AS "Softwater",
    d AS "Boiler",
    e AS "InletPretreatment",
    f AS "OutletPretreatment",
    g AS "RejectOsmotron",
    h AS "Chiller",
    i AS "Taman",
    j AS "WWTPBiologi",
    k AS "WWTPKimia",
    l AS "WWTPOutlet",
    m AS "Cip",
    n AS "Hotwater",
    o AS "Lab",
    p AS "AtasLabQC",
    q AS "AtasToiletLt2",
    r AS "Workshop",
    s AS "AirMancur"
    FROM 
    (SELECT SUM(data_format_0) as a 
    from parammachine_saka.\`cMT-BWT_PDAM_Sehari_data\` WHERE
    date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' ) as sum1,
    (SELECT SUM(data_format_0) as b 
    from parammachine_saka.\`cMT-BWT_Dom_sehari_data\` WHERE
    date(FROM_UNIXTIME(\`time@timestamp\`) ) BETWEEN '${start}' AND '${finish}' ) as sum2,
    (SELECT SUM(data_format_0) as c 
    from parammachine_saka.\`cMT-BWT_Softwater_sehari_data\` WHERE
    date(FROM_UNIXTIME(\`time@timestamp\`) ) BETWEEN '${start}' AND '${finish}' ) as sum3,
    (SELECT SUM(data_format_0) as d 
    from parammachine_saka.\`cMT-BWT_Boiler_sehari_data\` WHERE
    date(FROM_UNIXTIME(\`time@timestamp\`) ) BETWEEN '${start}' AND '${finish}' ) as sum4,
    (SELECT SUM(data_format_0) as e 
    from parammachine_saka.\`cMT-BWT_Inlet_Sehari_data\` WHERE
    date(FROM_UNIXTIME(\`time@timestamp\`) ) BETWEEN '${start}' AND '${finish}' ) as sum5,
    (SELECT SUM(data_format_0) as f 
    from parammachine_saka.\`cMT-BWT_Outlet_sehari_data\` WHERE
    date(FROM_UNIXTIME(\`time@timestamp\`) ) BETWEEN '${start}' AND '${finish}' ) as sum6,
    (SELECT SUM(data_format_0) as g 
    from parammachine_saka.\`cMT-BWT_RO_sehari_data\` WHERE
    date(FROM_UNIXTIME(\`time@timestamp\`) ) BETWEEN '${start}' AND '${finish}' ) as sum7,
    (SELECT SUM(data_format_0) as h 
    from parammachine_saka.\`cMT-BWT_Chiller_sehari_data\` WHERE
    date(FROM_UNIXTIME(\`time@timestamp\`) ) BETWEEN '${start}' AND '${finish}' ) as sum8,
    (SELECT SUM(data_format_0) as i 
    from parammachine_saka.\`cMT-BWT_Taman_sehari_data\` WHERE
    date(FROM_UNIXTIME(\`time@timestamp\`) ) BETWEEN '${start}' AND '${finish}' ) as sum9,
    (SELECT SUM(data_format_0) as j 
    from parammachine_saka.\`cMT-BWT_WWTP_Biologi_1d_data\` WHERE
    date(FROM_UNIXTIME(\`time@timestamp\`) ) BETWEEN '${start}' AND '${finish}' ) as sum10,
    (SELECT SUM(data_format_0) as k 
    from parammachine_saka.\`cMT-BWT_WWTP_Kimia_1d_data\` WHERE
    date(FROM_UNIXTIME(\`time@timestamp\`) ) BETWEEN '${start}' AND '${finish}' ) as sum11,
    (SELECT SUM(data_format_0) as l 
    from parammachine_saka.\`cMT-BWT_WWTP_Outlet_1d_data\` WHERE
    date(FROM_UNIXTIME(\`time@timestamp\`) ) BETWEEN '${start}' AND '${finish}' ) as sum12,
    (SELECT SUM(data_format_0) as m 
    from parammachine_saka.\`cMT-BWT_CIP_Sehari_data\` WHERE
    date(FROM_UNIXTIME(\`time@timestamp\`) ) BETWEEN '${start}' AND '${finish}' ) as sum13,
    (SELECT SUM(data_format_0) as n 
    from parammachine_saka.\`cMT-BWT_Hotwater_Sehari_data\` WHERE
    date(FROM_UNIXTIME(\`time@timestamp\`) ) BETWEEN '${start}' AND '${finish}' ) as sum14,
    (SELECT SUM(data_format_0) as o 
    from parammachine_saka.\`cMT-BWT_Lab_Sehari_data\` WHERE
    date(FROM_UNIXTIME(\`time@timestamp\`) ) BETWEEN '${start}' AND '${finish}' ) as sum15,
    (SELECT SUM(data_format_0) as p 
    from parammachine_saka.\`cMT-BWT_Atas QC_Sehari_data\` WHERE
    date(FROM_UNIXTIME(\`time@timestamp\`) ) BETWEEN '${start}' AND '${finish}' ) as sum16,
    (SELECT SUM(data_format_0) as q 
    from parammachine_saka.\`cMT-BWT_AtsToilet_Sehari_data\` WHERE
    date(FROM_UNIXTIME(\`time@timestamp\`) ) BETWEEN '${start}' AND '${finish}' ) as sum17,
    (SELECT SUM(data_format_0) as r 
    from parammachine_saka.\`cMT-BWT_Workshop_Sehari_data\` WHERE
    date(FROM_UNIXTIME(\`time@timestamp\`) ) BETWEEN '${start}' AND '${finish}' ) as sum18,
    (SELECT SUM(data_format_0) as s 
    from parammachine_saka.\`cMT-BWT_AirMancur_Sehari_data\` WHERE
    date(FROM_UNIXTIME(\`time@timestamp\`) ) BETWEEN '${start}' AND '${finish}' ) as sum19`;
      
    db.query(queryGet,(err, result) => {
    return response.status(200).send(result);
    });
      
  },

  // Export Data Water Consumption Daily Backend
  ExportWaterConsumptionDaily : async (request, response) => {
    const {start, finish} = request.query;
    const queryGet = `SELECT 
    DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%d-%m-%Y') AS Tanggal,
    round(d.data_format_0,2) as Domestik,
    round(c.data_format_0,2) as Chiller,
    round(s.data_format_0,2) as Softwater,
    round(b.data_format_0,2) as Boiler,
    round(ip.data_format_0,2) as Inlet_Pretreatment,
    round(op.data_format_0,2) as Outlet_Pretreatment,
    round(ro.data_format_0,2) as Reject_Osmotron,
    round(t.data_format_0,2) as Taman,
    round(iwk.data_format_0,2) as Inlet_WWTP_Kimia,
    round(iwb.data_format_0,2) as Inlet_WWTP_Biologi,
    round(ow.data_format_0,2) as Outlet_WWTP,
    round(cip.data_format_0,2) as CIP,
    round(h.data_format_0,2) as Hotwater,
    round(l.data_format_0,2) as Lab,
    round(atl.data_format_0,2) as Atas_Toilet_Lt2,
    round(atlq.data_format_0,2) as Atas_Lab_QC,
    round(w.data_format_0,2) as Workshop,
    round(am.data_format_0,2) as Air_Mancur
    FROM parammachine_saka.\`cMT-BWT_Dom_sehari_data\` as d
    left join parammachine_saka.\`cMT-BWT_Chiller_sehari_data\` as c on 
    DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(c.\`time@timestamp\`), '%Y-%m-%d')
    left join parammachine_saka.\`cMT-BWT_Softwater_sehari_data\` as s on 
    DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d')
    left join parammachine_saka.\`cMT-BWT_Boiler_sehari_data\` as b on 
    DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(b.\`time@timestamp\`), '%Y-%m-%d')
    left join parammachine_saka.\`cMT-BWT_Inlet_Sehari_data\` as ip on 
    DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(ip.\`time@timestamp\`), '%Y-%m-%d')
    left join parammachine_saka.\`cMT-BWT_Outlet_sehari_data\` as op on 
    DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(op.\`time@timestamp\`), '%Y-%m-%d')
    left join parammachine_saka.\`cMT-BWT_RO_sehari_data\` as ro on 
    DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(ro.\`time@timestamp\`), '%Y-%m-%d')
    left join parammachine_saka.\`cMT-BWT_Taman_sehari_data\` as t on 
    DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(t.\`time@timestamp\`), '%Y-%m-%d')
    left join parammachine_saka.\`cMT-BWT_WWTP_Kimia_1d_data\` as iwk on 
    DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(iwk.\`time@timestamp\`), '%Y-%m-%d')
    left join parammachine_saka.\`cMT-BWT_WWTP_Biologi_1d_data\` as iwb on 
    DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(iwb.\`time@timestamp\`), '%Y-%m-%d')
    left join parammachine_saka.\`cMT-BWT_WWTP_Outlet_1d_data\` as ow on 
    DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(ow.\`time@timestamp\`), '%Y-%m-%d')
    left join parammachine_saka.\`cMT-BWT_CIP_Sehari_data\` as cip on 
    DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(cip.\`time@timestamp\`), '%Y-%m-%d')
    left join parammachine_saka.\`cMT-BWT_Hotwater_Sehari_data\` as h on 
    DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(h.\`time@timestamp\`), '%Y-%m-%d')
    left join parammachine_saka.\`cMT-BWT_Lab_Sehari_data\` as l on 
    DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(l.\`time@timestamp\`), '%Y-%m-%d')
    left join parammachine_saka.\`cMT-BWT_AtsToilet_Sehari_data\` as atl on 
    DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(atl.\`time@timestamp\`), '%Y-%m-%d')
    left join parammachine_saka.\`cMT-BWT_Atas QC_Sehari_data\` as atlq on 
    DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(atlq.\`time@timestamp\`), '%Y-%m-%d')
    left join parammachine_saka.\`cMT-BWT_Workshop_Sehari_data\` as w on 
    DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(w.\`time@timestamp\`), '%Y-%m-%d')
    left join parammachine_saka.\`cMT-BWT_AirMancur_Sehari_data\` as am on 
    DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(am.\`time@timestamp\`), '%Y-%m-%d')
    where  date(FROM_UNIXTIME(d.\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' 
    order by date(FROM_UNIXTIME(d.\`time@timestamp\`));`;

    db.query(queryGet,(err, result) => {
      return response.status(200).send(result);
    });
  },

  // Export Data Water Totalizer Daily Backend
  ExportWaterTotalizerDaily : async (request, response) => {
    const {start, finish} = request.query;
    const queryGet = `SELECT 
    DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%d-%m-%Y') AS Tanggal,
    round(d.data_format_0,2) as Domestik,
    round(c.data_format_0,2) as Chiller,
    round(s.data_format_0,2) as Softwater,
    round(b.data_format_0,2) as Boiler,
    round(ip.data_format_0,2) as Inlet_Pretreatment,
    round(op.data_format_0,2) as Outlet_Pretreatment,
    round(ro.data_format_0,2) as Reject_Osmotron,
    round(t.data_format_0,2) as Taman,
    round(iwk.data_format_0,2) as Inlet_WWTP_Kimia,
    round(iwb.data_format_0,2) as Inlet_WWTP_Biologi,
    round(ow.data_format_0,2) as Outlet_WWTP,
    round(cip.data_format_0,2) as CIP,
    round(h.data_format_0,2) as Hotwater,
    round(l.data_format_0,2) as Lab,
    round(atl.data_format_0,2) as Atas_Toilet_Lt2,
    round(atlq.data_format_0,2) as Atas_Lab_QC,
    round(w.data_format_0,2) as Workshop,
    round(am.data_format_0,2) as Air_Mancur
    FROM parammachine_saka.\`cMT-BWT_Met_Domestik_data\` as d
    left join parammachine_saka.\`cMT-BWT_Met_Chiller_data\` as c on 
    DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(c.\`time@timestamp\`), '%Y-%m-%d')
    left join parammachine_saka.\`cMT-BWT_Met_Softwater_data\` as s on 
    DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d')
    left join parammachine_saka.\`cMT-BWT_Met_Boiler_data\` as b on 
    DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(b.\`time@timestamp\`), '%Y-%m-%d')
    left join parammachine_saka.\`cMT-BWT_Met_Inlet_Pt_data\` as ip on 
    DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(ip.\`time@timestamp\`), '%Y-%m-%d')
    left join parammachine_saka.\`cMT-BWT_Met_Outlet_Pt_data\` as op on 
    DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(op.\`time@timestamp\`), '%Y-%m-%d')
    left join parammachine_saka.\`cMT-BWT_Met_RO_data\` as ro on 
    DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(ro.\`time@timestamp\`), '%Y-%m-%d')
    left join parammachine_saka.\`cMT-BWT_Met_Taman_data\` as t on 
    DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(t.\`time@timestamp\`), '%Y-%m-%d')
    left join parammachine_saka.\`cMT-BWT_WWTP_Kimia_data\` as iwk on 
    DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(iwk.\`time@timestamp\`), '%Y-%m-%d')
    left join parammachine_saka.\`cMT-BWT_WWTP_Biologi_data\` as iwb on 
    DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(iwb.\`time@timestamp\`), '%Y-%m-%d')
    left join parammachine_saka.\`cMT-BWT_WWTP_Outlet_data\` as ow on 
    DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(ow.\`time@timestamp\`), '%Y-%m-%d')
    left join parammachine_saka.\`cMT-BWT_Met_CIP_data\` as cip on 
    DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(cip.\`time@timestamp\`), '%Y-%m-%d')
    left join parammachine_saka.\`cMT-BWT_Met_Hotwater_data\` as h on 
    DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(h.\`time@timestamp\`), '%Y-%m-%d')
    left join parammachine_saka.\`cMT-BWT_Met_Lab_data\` as l on 
    DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(l.\`time@timestamp\`), '%Y-%m-%d')
    left join parammachine_saka.\`cMT-BWT_Met_Atas Toilet2_data\` as atl on 
    DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(atl.\`time@timestamp\`), '%Y-%m-%d')
    left join parammachine_saka.\`cMT-BWT_Met_Atas Lab QC_data\` as atlq on 
    DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(atlq.\`time@timestamp\`), '%Y-%m-%d')
    left join parammachine_saka.\`cMT-BWT_Met_Workshop_data\` as w on 
    DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(w.\`time@timestamp\`), '%Y-%m-%d')
    left join parammachine_saka.\`cMT-BWT_Met_Air Mancur_data\` as am on 
    DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(am.\`time@timestamp\`), '%Y-%m-%d')
    where  date(FROM_UNIXTIME(d.\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}'`;

    db.query(queryGet,(err, result) => {
      return response.status(200).send(result);
    });
  },

  // Export Data Water Consumption Daily Backend
  ExportWaterConsumptionMonthly : async (request, response) => {
    const {start, finish} = request.query;
    const queryGet = `SELECT 
    DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%m-%Y') AS Bulan,
    sum(round(d.data_format_0,2)) as Domestik,
    sum(round(c.data_format_0,2)) as Chiller,
    sum(round(s.data_format_0,2)) as Softwater,
    sum(round(b.data_format_0,2)) as Boiler,
    sum(round(ip.data_format_0,2)) as Inlet_Pretreatment,
    sum(round(op.data_format_0,2)) as Outlet_Pretreatment,
    sum(round(ro.data_format_0,2)) as Reject_Osmotron,
    sum(round(t.data_format_0,2)) as Taman,
    sum(round(iwk.data_format_0,2)) as Inlet_WWTP_Kimia,
    sum(round(iwb.data_format_0,2)) as Inlet_WWTP_Biologi,
    sum(round(ow.data_format_0,2)) as Outlet_WWTP,
    sum(round(cip.data_format_0,2)) as CIP,
    sum(round(h.data_format_0,2)) as Hotwater,
    sum(round(l.data_format_0,2)) as Lab,
    sum(round(atl.data_format_0,2)) as Atas_Toilet_Lt2,
    sum(round(atlq.data_format_0,2)) as Atas_Lab_QC,
    sum(round(w.data_format_0,2)) as Workshop,
    sum(round(am.data_format_0,2)) as Air_Mancur
    FROM parammachine_saka.\`cMT-BWT_Dom_sehari_data\` as d
    left join parammachine_saka.\`cMT-BWT_Chiller_sehari_data\` as c on 
    DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(c.\`time@timestamp\`), '%Y-%m-%d')
    left join parammachine_saka.\`cMT-BWT_Softwater_sehari_data\` as s on 
    DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d')
    left join parammachine_saka.\`cMT-BWT_Boiler_sehari_data\` as b on 
    DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(b.\`time@timestamp\`), '%Y-%m-%d')
    left join parammachine_saka.\`cMT-BWT_Inlet_Sehari_data\` as ip on 
    DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(ip.\`time@timestamp\`), '%Y-%m-%d')
    left join parammachine_saka.\`cMT-BWT_Outlet_sehari_data\` as op on 
    DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(op.\`time@timestamp\`), '%Y-%m-%d')
    left join parammachine_saka.\`cMT-BWT_RO_sehari_data\` as ro on 
    DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(ro.\`time@timestamp\`), '%Y-%m-%d')
    left join parammachine_saka.\`cMT-BWT_Taman_sehari_data\` as t on 
    DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(t.\`time@timestamp\`), '%Y-%m-%d')
    left join parammachine_saka.\`cMT-BWT_WWTP_Kimia_1d_data\` as iwk on 
    DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(iwk.\`time@timestamp\`), '%Y-%m-%d')
    left join parammachine_saka.\`cMT-BWT_WWTP_Biologi_1d_data\` as iwb on 
    DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(iwb.\`time@timestamp\`), '%Y-%m-%d')
    left join parammachine_saka.\`cMT-BWT_WWTP_Outlet_1d_data\` as ow on 
    DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(ow.\`time@timestamp\`), '%Y-%m-%d')
    left join parammachine_saka.\`cMT-BWT_CIP_Sehari_data\` as cip on 
    DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(cip.\`time@timestamp\`), '%Y-%m-%d')
    left join parammachine_saka.\`cMT-BWT_Hotwater_Sehari_data\` as h on 
    DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(h.\`time@timestamp\`), '%Y-%m-%d')
    left join parammachine_saka.\`cMT-BWT_Lab_Sehari_data\` as l on 
    DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(l.\`time@timestamp\`), '%Y-%m-%d')
    left join parammachine_saka.\`cMT-BWT_AtsToilet_Sehari_data\` as atl on 
    DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(atl.\`time@timestamp\`), '%Y-%m-%d')
    left join parammachine_saka.\`cMT-BWT_Atas QC_Sehari_data\` as atlq on 
    DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(atlq.\`time@timestamp\`), '%Y-%m-%d')
    left join parammachine_saka.\`cMT-BWT_Workshop_Sehari_data\` as w on 
    DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(w.\`time@timestamp\`), '%Y-%m-%d')
    left join parammachine_saka.\`cMT-BWT_AirMancur_Sehari_data\` as am on 
    DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(am.\`time@timestamp\`), '%Y-%m-%d')
    where  DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m') BETWEEN '${start}' AND '${finish}' 
    GROUP BY YEAR(date(FROM_UNIXTIME(d.\`time@timestamp\`))), 
    MONTH(date(FROM_UNIXTIME(d.\`time@timestamp\`)))`;

    db.query(queryGet,(err, result) => {
      return response.status(200).send(result);
    });
  },

   // Export Data Water Totalizer Monthly Backend
   ExportWaterTotalizerMonthly : async (request, response) => {
    const {start, finish} = request.query;
    const queryGet = `SELECT 
    DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%m-%Y') AS Bulan,
    round(d.data_format_0,2) as Domestik,
    round(c.data_format_0,2) as Chiller,
    round(s.data_format_0,2) as Softwater,
    round(b.data_format_0,2) as Boiler,
    round(ip.data_format_0,2) as Inlet_Pretreatment,
    round(op.data_format_0,2) as Outlet_Pretreatment,
    round(ro.data_format_0,2) as Reject_Osmotron,
    round(t.data_format_0,2) as Taman,
    round(iwk.data_format_0,2) as Inlet_WWTP_Kimia,
    round(iwb.data_format_0,2) as Inlet_WWTP_Biologi,
    round(ow.data_format_0,2) as Outlet_WWTP,
    round(cip.data_format_0,2) as CIP,
    round(h.data_format_0,2) as Hotwater,
    round(l.data_format_0,2) as Lab,
    round(atl.data_format_0,2) as Atas_Toilet_Lt2,
    round(atlq.data_format_0,2) as Atas_Lab_QC,
    round(w.data_format_0,2) as Workshop,
    round(am.data_format_0,2) as Air_Mancur
    FROM (Select
      max(DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%d-%m-%Y')) as Tgld,
      d.data_index as id
      FROM parammachine_saka.\`cMT-BWT_Met_Domestik_data\` as d 
      GROUP BY YEAR(date(FROM_UNIXTIME(d.\`time@timestamp\`))), 
      MONTH(date(FROM_UNIXTIME(d.\`time@timestamp\`)))) as tgl,
    parammachine_saka.\`cMT-BWT_Met_Domestik_data\` as d
    left join parammachine_saka.\`cMT-BWT_Met_Chiller_data\` as c on 
    DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(c.\`time@timestamp\`), '%Y-%m-%d')
    left join parammachine_saka.\`cMT-BWT_Met_Softwater_data\` as s on 
    DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d')
    left join parammachine_saka.\`cMT-BWT_Met_Boiler_data\` as b on 
    DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(b.\`time@timestamp\`), '%Y-%m-%d')
    left join parammachine_saka.\`cMT-BWT_Met_Inlet_Pt_data\` as ip on 
    DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(ip.\`time@timestamp\`), '%Y-%m-%d')
    left join parammachine_saka.\`cMT-BWT_Met_Outlet_Pt_data\` as op on 
    DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(op.\`time@timestamp\`), '%Y-%m-%d')
    left join parammachine_saka.\`cMT-BWT_Met_RO_data\` as ro on 
    DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(ro.\`time@timestamp\`), '%Y-%m-%d')
    left join parammachine_saka.\`cMT-BWT_Met_Taman_data\` as t on 
    DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(t.\`time@timestamp\`), '%Y-%m-%d')
    left join parammachine_saka.\`cMT-BWT_WWTP_Kimia_data\` as iwk on 
    DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(iwk.\`time@timestamp\`), '%Y-%m-%d')
    left join parammachine_saka.\`cMT-BWT_WWTP_Biologi_data\` as iwb on 
    DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(iwb.\`time@timestamp\`), '%Y-%m-%d')
    left join parammachine_saka.\`cMT-BWT_WWTP_Outlet_data\` as ow on 
    DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(ow.\`time@timestamp\`), '%Y-%m-%d')
    left join parammachine_saka.\`cMT-BWT_Met_CIP_data\` as cip on 
    DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(cip.\`time@timestamp\`), '%Y-%m-%d')
    left join parammachine_saka.\`cMT-BWT_Met_Hotwater_data\` as h on 
    DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(h.\`time@timestamp\`), '%Y-%m-%d')
    left join parammachine_saka.\`cMT-BWT_Met_Lab_data\` as l on 
    DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(l.\`time@timestamp\`), '%Y-%m-%d')
    left join parammachine_saka.\`cMT-BWT_Met_Atas Toilet2_data\` as atl on 
    DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(atl.\`time@timestamp\`), '%Y-%m-%d')
    left join parammachine_saka.\`cMT-BWT_Met_Atas Lab QC_data\` as atlq on 
    DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(atlq.\`time@timestamp\`), '%Y-%m-%d')
    left join parammachine_saka.\`cMT-BWT_Met_Workshop_data\` as w on 
    DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(w.\`time@timestamp\`), '%Y-%m-%d')
    left join parammachine_saka.\`cMT-BWT_Met_Air Mancur_data\` as am on 
    DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(am.\`time@timestamp\`), '%Y-%m-%d')
    where DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%d-%m-%Y') = Tgld and
    DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m') BETWEEN '${start}' AND '${finish}'`;

    db.query(queryGet,(err, result) => {
      return response.status(200).send(result);
    });
  },

    // Export Data Water Consumption Yearly Backend
    ExportWaterConsumptionYearly : async (request, response) => {
      const {start, finish} = request.query;
      const queryGet = `SELECT 
      DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y') AS Tahun,
      sum(round(d.data_format_0,2)) as Domestik,
      sum(round(c.data_format_0,2)) as Chiller,
      sum(round(s.data_format_0,2)) as Softwater,
      sum(round(b.data_format_0,2)) as Boiler,
      sum(round(ip.data_format_0,2)) as Inlet_Pretreatment,
      sum(round(op.data_format_0,2)) as Outlet_Pretreatment,
      sum(round(ro.data_format_0,2)) as Reject_Osmotron,
      sum(round(t.data_format_0,2)) as Taman,
      sum(round(iwk.data_format_0,2)) as Inlet_WWTP_Kimia,
      sum(round(iwb.data_format_0,2)) as Inlet_WWTP_Biologi,
      sum(round(ow.data_format_0,2)) as Outlet_WWTP,
      sum(round(cip.data_format_0,2)) as CIP,
      sum(round(h.data_format_0,2)) as Hotwater,
      sum(round(l.data_format_0,2)) as Lab,
      sum(round(atl.data_format_0,2)) as Atas_Toilet_Lt2,
      sum(round(atlq.data_format_0,2)) as Atas_Lab_QC,
      sum(round(w.data_format_0,2)) as Workshop,
      sum(round(am.data_format_0,2)) as Air_Mancur
      FROM parammachine_saka.\`cMT-BWT_Dom_sehari_data\` as d
      left join parammachine_saka.\`cMT-BWT_Chiller_sehari_data\` as c on 
      DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(c.\`time@timestamp\`), '%Y-%m-%d')
      left join parammachine_saka.\`cMT-BWT_Softwater_sehari_data\` as s on 
      DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d')
      left join parammachine_saka.\`cMT-BWT_Boiler_sehari_data\` as b on 
      DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(b.\`time@timestamp\`), '%Y-%m-%d')
      left join parammachine_saka.\`cMT-BWT_Inlet_Sehari_data\` as ip on 
      DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(ip.\`time@timestamp\`), '%Y-%m-%d')
      left join parammachine_saka.\`cMT-BWT_Outlet_sehari_data\` as op on 
      DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(op.\`time@timestamp\`), '%Y-%m-%d')
      left join parammachine_saka.\`cMT-BWT_RO_sehari_data\` as ro on 
      DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(ro.\`time@timestamp\`), '%Y-%m-%d')
      left join parammachine_saka.\`cMT-BWT_Taman_sehari_data\` as t on 
      DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(t.\`time@timestamp\`), '%Y-%m-%d')
      left join parammachine_saka.\`cMT-BWT_WWTP_Kimia_1d_data\` as iwk on 
      DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(iwk.\`time@timestamp\`), '%Y-%m-%d')
      left join parammachine_saka.\`cMT-BWT_WWTP_Biologi_1d_data\` as iwb on 
      DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(iwb.\`time@timestamp\`), '%Y-%m-%d')
      left join parammachine_saka.\`cMT-BWT_WWTP_Outlet_1d_data\` as ow on 
      DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(ow.\`time@timestamp\`), '%Y-%m-%d')
      left join parammachine_saka.\`cMT-BWT_CIP_Sehari_data\` as cip on 
      DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(cip.\`time@timestamp\`), '%Y-%m-%d')
      left join parammachine_saka.\`cMT-BWT_Hotwater_Sehari_data\` as h on 
      DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(h.\`time@timestamp\`), '%Y-%m-%d')
      left join parammachine_saka.\`cMT-BWT_Lab_Sehari_data\` as l on 
      DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(l.\`time@timestamp\`), '%Y-%m-%d')
      left join parammachine_saka.\`cMT-BWT_AtsToilet_Sehari_data\` as atl on 
      DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(atl.\`time@timestamp\`), '%Y-%m-%d')
      left join parammachine_saka.\`cMT-BWT_Atas QC_Sehari_data\` as atlq on 
      DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(atlq.\`time@timestamp\`), '%Y-%m-%d')
      left join parammachine_saka.\`cMT-BWT_Workshop_Sehari_data\` as w on 
      DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(w.\`time@timestamp\`), '%Y-%m-%d')
      left join parammachine_saka.\`cMT-BWT_AirMancur_Sehari_data\` as am on 
      DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(am.\`time@timestamp\`), '%Y-%m-%d')
      where  DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y') BETWEEN '${start}' AND '${finish}' 
      GROUP BY YEAR(date(FROM_UNIXTIME(d.\`time@timestamp\`)))`;
  
      db.query(queryGet,(err, result) => {
        return response.status(200).send(result);
      });
    },
  
     // Export Data Water Totalizer Yearly Backend
     ExportWaterTotalizerYearly : async (request, response) => {
      const {start, finish} = request.query;
      const queryGet = `SELECT 
      DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y') AS Tahun,
      round(d.data_format_0,2) as Domestik,
      round(c.data_format_0,2) as Chiller,
      round(s.data_format_0,2) as Softwater,
      round(b.data_format_0,2) as Boiler,
      round(ip.data_format_0,2) as Inlet_Pretreatment,
      round(op.data_format_0,2) as Outlet_Pretreatment,
      round(ro.data_format_0,2) as Reject_Osmotron,
      round(t.data_format_0,2) as Taman,
      round(iwk.data_format_0,2) as Inlet_WWTP_Kimia,
      round(iwb.data_format_0,2) as Inlet_WWTP_Biologi,
      round(ow.data_format_0,2) as Outlet_WWTP,
      round(cip.data_format_0,2) as CIP,
      round(h.data_format_0,2) as Hotwater,
      round(l.data_format_0,2) as Lab,
      round(atl.data_format_0,2) as Atas_Toilet_Lt2,
      round(atlq.data_format_0,2) as Atas_Lab_QC,
      round(w.data_format_0,2) as Workshop,
      round(am.data_format_0,2) as Air_Mancur
      FROM (Select
        max(DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%d-%m-%Y')) as Tgld,
        d.data_index as id
        FROM parammachine_saka.\`cMT-BWT_Met_Domestik_data\` as d 
        GROUP BY YEAR(date(FROM_UNIXTIME(d.\`time@timestamp\`)))) as tgl,
      parammachine_saka.\`cMT-BWT_Met_Domestik_data\` as d
      left join parammachine_saka.\`cMT-BWT_Met_Chiller_data\` as c on 
      DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(c.\`time@timestamp\`), '%Y-%m-%d')
      left join parammachine_saka.\`cMT-BWT_Met_Softwater_data\` as s on 
      DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d')
      left join parammachine_saka.\`cMT-BWT_Met_Boiler_data\` as b on 
      DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(b.\`time@timestamp\`), '%Y-%m-%d')
      left join parammachine_saka.\`cMT-BWT_Met_Inlet_Pt_data\` as ip on 
      DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(ip.\`time@timestamp\`), '%Y-%m-%d')
      left join parammachine_saka.\`cMT-BWT_Met_Outlet_Pt_data\` as op on 
      DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(op.\`time@timestamp\`), '%Y-%m-%d')
      left join parammachine_saka.\`cMT-BWT_Met_RO_data\` as ro on 
      DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(ro.\`time@timestamp\`), '%Y-%m-%d')
      left join parammachine_saka.\`cMT-BWT_Met_Taman_data\` as t on 
      DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(t.\`time@timestamp\`), '%Y-%m-%d')
      left join parammachine_saka.\`cMT-BWT_WWTP_Kimia_data\` as iwk on 
      DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(iwk.\`time@timestamp\`), '%Y-%m-%d')
      left join parammachine_saka.\`cMT-BWT_WWTP_Biologi_data\` as iwb on 
      DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(iwb.\`time@timestamp\`), '%Y-%m-%d')
      left join parammachine_saka.\`cMT-BWT_WWTP_Outlet_data\` as ow on 
      DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(ow.\`time@timestamp\`), '%Y-%m-%d')
      left join parammachine_saka.\`cMT-BWT_Met_CIP_data\` as cip on 
      DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(cip.\`time@timestamp\`), '%Y-%m-%d')
      left join parammachine_saka.\`cMT-BWT_Met_Hotwater_data\` as h on 
      DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(h.\`time@timestamp\`), '%Y-%m-%d')
      left join parammachine_saka.\`cMT-BWT_Met_Lab_data\` as l on 
      DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(l.\`time@timestamp\`), '%Y-%m-%d')
      left join parammachine_saka.\`cMT-BWT_Met_Atas Toilet2_data\` as atl on 
      DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(atl.\`time@timestamp\`), '%Y-%m-%d')
      left join parammachine_saka.\`cMT-BWT_Met_Atas Lab QC_data\` as atlq on 
      DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(atlq.\`time@timestamp\`), '%Y-%m-%d')
      left join parammachine_saka.\`cMT-BWT_Met_Workshop_data\` as w on 
      DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(w.\`time@timestamp\`), '%Y-%m-%d')
      left join parammachine_saka.\`cMT-BWT_Met_Air Mancur_data\` as am on 
      DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d') = DATE_FORMAT(FROM_UNIXTIME(am.\`time@timestamp\`), '%Y-%m-%d')
      where DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%d-%m-%Y') = Tgld and
      DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y') BETWEEN '${start}' AND '${finish}'`;
  
      db.query(queryGet,(err, result) => {
        return response.status(200).send(result);
      });
    },

  // Power Management 2 Backend
  PowerDaily : async (request, response) => {
    const {area, start, finish} = request.query;
    const queryGet = `SELECT
    s1.data_index as x,
    DATE_FORMAT(FROM_UNIXTIME(s1.\`time@timestamp\`) , '%Y-%m-%d') AS label,
    s1.data_format_0 -
      (select s2.data_format_0 as previous from
      parammachine_saka.\`${area}\` as s2
      where s2.data_index < s1.data_index and s2.data_format_0 > 0 order by s2.data_index  desc limit 1) as y
    From parammachine_saka.\`${area}\` as s1 
    WHERE date(FROM_UNIXTIME(s1.\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' and s1.data_format_0 > 0
    `;

    db.query(queryGet,(err, result) => {
      return response.status(200).send(result);
    });
  },

  PowerMonthly : async (request, response) => {
    const {area, start, finish} = request.query;
    const queryGet = `SELECT
    s1.\`time@timestamp\`*1000 as x,
    DATE_FORMAT(FROM_UNIXTIME(s1.\`time@timestamp\`) , '%Y-%m') AS label,
    sum(s1.data_format_0 -
      (select s2.data_format_0 as previous from
      parammachine_saka.\`${area}\` as s2
      where s2.data_index < s1.data_index and s2.data_format_0 > 0 order by s2.data_index  desc limit 1)) as y
    From parammachine_saka.\`${area}\` as s1 
    where  DATE_FORMAT(FROM_UNIXTIME(s1.\`time@timestamp\`), '%Y-%m') BETWEEN '${start}' AND '${finish}' and s1.data_format_0 > 0
    GROUP BY YEAR(date(FROM_UNIXTIME(s1.\`time@timestamp\`))), 
    MONTH(date(FROM_UNIXTIME(s1.\`time@timestamp\`)))`;

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
    ac11 as  "PP1AC11",
    ac12 as  "PP1AC12",
    ac13 as  "PP1AC13",
    ac23 as  "PP1AC23",
    produksi1 as  "SDP1Produksi",
    produksi2 as  "SDP2Produksi",
    hydrant as  "PP2Hydrant",
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
    posjaga1 as  "PPLP1PosJaga1",
    PosJaga2 as  "PPLP1PosJaga2",
    koperasi as  "PPLP1Koperasi",
    gcpgenset as  "GCPGenset",
    sdpgenset as  "SDPGenset",
    chiller1 as  "PPChiller1",
    chiller2 as  "PPChiller2",
    chiller3 as  "PPChiller3"
    from
      (SELECT sum(kwh1) as MVMDP from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) , '%Y-%m-%d') AS tgl1,
      data_format_0-(select s2.data_format_0 as previous from
		parammachine_saka.\`cMT-Gedung-UTY_MVMDP_data\` as s2
		where s2.data_index < l1.data_index and s2.data_format_0 order by s2.data_index  desc limit 1) as kwh1 
      from parammachine_saka.\`cMT-Gedung-UTY_MVMDP_data\` as l1 WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}'AND data_format_0>0)  as table1
      where kwh1>0) as total1, 

      (SELECT sum(kwh2) as lvmdp1 from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) , '%Y-%m-%d') AS tgl2,
      data_format_0-(select s2.data_format_0 as previous from
		parammachine_saka.\`cMT-Gedung-UTY_LVMDP1_data\` as s2
		where s2.data_index < l2.data_index and s2.data_format_0 order by s2.data_index  desc limit 1) as kwh2
      from parammachine_saka.\`cMT-Gedung-UTY_LVMDP1_data\` as l2 WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' AND data_format_0>0)  as table2
      where kwh2>0) as total2, 

      (SELECT sum(kwh3) as lvmdp2 from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) , '%Y-%m-%d') AS tgl3,
      data_format_0-(select s2.data_format_0 as previous from
		parammachine_saka.\`cMT-Gedung-UTY_LVMDP2_data\` as s2
		where s2.data_index < l3.data_index and s2.data_format_0 order by s2.data_index  desc limit 1) as kwh3
      from parammachine_saka.\`cMT-Gedung-UTY_LVMDP2_data\` as l3 WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' AND data_format_0>0)  as table3
      where kwh3>0) as total3,

      (SELECT sum(kwh4) as SP16 from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) , '%Y-%m-%d') AS tgl4,
      data_format_0-(select s2.data_format_0 as previous from
		parammachine_saka.\`cMT-Gedung-UTY_Inverter1-6_SP_data\` as s2
		where s2.data_index < l4.data_index and s2.data_format_0 order by s2.data_index  desc limit 1) as kwh4
      from parammachine_saka.\`cMT-Gedung-UTY_Inverter1-6_SP_data\` as l4 WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' AND data_format_0>0)  as table4
      where kwh4>0) as total4, 
      
      (SELECT sum(kwh5) as SP712 from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) , '%Y-%m-%d') AS tgl5,
      data_format_0-(select s2.data_format_0 as previous from
		parammachine_saka.\`cMT-Gedung-UTY_Inverter7-12_SP_data\` as s2
		where s2.data_index < l5.data_index and s2.data_format_0 order by s2.data_index  desc limit 1) as kwh5
      from parammachine_saka.\`cMT-Gedung-UTY_Inverter7-12_SP_data\` as l5 WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' AND data_format_0>0)  as table5
      where kwh5>0) as total5, 

      (SELECT sum(kwh6) as utility from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) , '%Y-%m-%d') AS tgl6,
      data_format_0-(select s2.data_format_0 as previous from
		parammachine_saka.\`cMT-Gedung-UTY_SDP.1-Utility_data\` as s2
		where s2.data_index < l6.data_index and s2.data_format_0 order by s2.data_index  desc limit 1) as kwh6
      from parammachine_saka.\`cMT-Gedung-UTY_SDP.1-Utility_data\` as l6 WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' AND data_format_0>0)  as table6
      where kwh6>0) as total6, 

      (SELECT sum(kwh7) as utilitylt2 from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) , '%Y-%m-%d') AS tgl7,
      data_format_0-(select s2.data_format_0 as previous from
		parammachine_saka.\`cMT-Gedung-UTY_PPLP.1-UTY_Lt.2_data\` as s2
		where s2.data_index < l7.data_index and s2.data_format_0 order by s2.data_index  desc limit 1) as kwh7
      from parammachine_saka.\`cMT-Gedung-UTY_PPLP.1-UTY_Lt.2_data\` as l7 WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' AND data_format_0>0)  as table7
      where kwh7>0) as total7, 

      (SELECT sum(kwh8) as chiller from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) , '%Y-%m-%d') AS tgl8,
      data_format_0-(select s2.data_format_0 as previous from
		parammachine_saka.\`cMT-Gedung-UTY_PP.1-Chiller_data\` as s2
		where s2.data_index < l8.data_index and s2.data_format_0 order by s2.data_index  desc limit 1) as kwh8
      from parammachine_saka.\`cMT-Gedung-UTY_PP.1-Chiller_data\` as l8 WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' AND data_format_0>0)  as table8
      where kwh8>0) as total8, 

      (SELECT sum(kwh9) as utilitylt1 from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) , '%Y-%m-%d') AS tgl9,
      data_format_0-(select s2.data_format_0 as previous from
		parammachine_saka.\`cMT-Gedung-UTY_PPLP.1-UTY_Lt.1_data\` as s2
		where s2.data_index < l9.data_index and s2.data_format_0 order by s2.data_index  desc limit 1) as kwh9
      from parammachine_saka.\`cMT-Gedung-UTY_PPLP.1-UTY_Lt.1_data\` as l9 WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' AND data_format_0>0)  as table9
      where kwh9>0) as total9, 

      (SELECT sum(kwh10) as genset from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) , '%Y-%m-%d') AS tgl10,
      data_format_0-(select s2.data_format_0 as previous from
		parammachine_saka.\`cMT-Gedung-UTY_PP.1-Genset_data\` as s2
		where s2.data_index < l10.data_index and s2.data_format_0 order by s2.data_index  desc limit 1) as kwh10
      from parammachine_saka.\`cMT-Gedung-UTY_PP.1-Genset_data\` as l10 WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' AND data_format_0>0)  as table10
      where kwh10>0) as total10, 

      (SELECT sum(kwh11) as boilerPW from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) , '%Y-%m-%d') AS tgl11,
      data_format_0-(select s2.data_format_0 as previous from
		parammachine_saka.\`cMT-Gedung-UTY_PP.1-Boiler&PW_data\` as s2
		where s2.data_index < l11.data_index and s2.data_format_0 order by s2.data_index  desc limit 1) as kwh11
      from parammachine_saka.\`cMT-Gedung-UTY_PP.1-Boiler&PW_data\` as l11 WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' AND data_format_0>0)  as table11
      where kwh11>0) as total11, 

      (SELECT sum(kwh12) as kompressor from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) , '%Y-%m-%d') AS tgl12,
      data_format_0-(select s2.data_format_0 as previous from
		parammachine_saka.\`cMT-Gedung-UTY_PP.1-Kompressor_data\` as s2
		where s2.data_index < l12.data_index and s2.data_format_0 order by s2.data_index  desc limit 1) as kwh12
      from parammachine_saka.\`cMT-Gedung-UTY_PP.1-Kompressor_data\` as l12 WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' AND data_format_0>0)  as table12
      where kwh12>0) as total12, 

      (SELECT sum(kwh13) as HWP from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) , '%Y-%m-%d') AS tgl13,
      data_format_0-(select s2.data_format_0 as previous from
		parammachine_saka.\`cMT-Gedung-UTY_PP.1-HWP_data\` as s2
		where s2.data_index < l13.data_index and s2.data_format_0 order by s2.data_index  desc limit 1) as kwh13
      from parammachine_saka.\`cMT-Gedung-UTY_PP.1-HWP_data\` as l13 WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' AND data_format_0>0)  as table13
      where kwh13>0) as total13, 

      (SELECT sum(kwh14) as pump from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) , '%Y-%m-%d') AS tgl14,
      data_format_0-(select s2.data_format_0 as previous from
		parammachine_saka.\`cMT-Gedung-UTY_PP.1-PUMPS_data\` as s2
		where s2.data_index < l14.data_index and s2.data_format_0 order by s2.data_index  desc limit 1) as kwh14
      from parammachine_saka.\`cMT-Gedung-UTY_PP.1-PUMPS_data\` as l14 WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' AND data_format_0>0)  as table14
      where kwh14>0) as total14, 

      (SELECT sum(kwh15) as lift from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) , '%Y-%m-%d') AS tgl15,
      data_format_0-(select s2.data_format_0 as previous from
		parammachine_saka.\`cMT-Gedung-UTY_PP.1-Lift_data\` as s2
		where s2.data_index < l15.data_index and s2.data_format_0 order by s2.data_index  desc limit 1) as kwh15
      from parammachine_saka.\`cMT-Gedung-UTY_PP.1-Lift_data\` as l15 WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' AND data_format_0>0)  as table15
      where kwh15>0) as total15, 

      (SELECT sum(kwh16) as ac11 from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) , '%Y-%m-%d') AS tgl16,
      data_format_0-(select s2.data_format_0 as previous from
		parammachine_saka.\`cMT-Gedung-UTY_PP.1-AC1.1_data\` as s2
		where s2.data_index < l16.data_index and s2.data_format_0 order by s2.data_index  desc limit 1) as kwh16
      from parammachine_saka.\`cMT-Gedung-UTY_PP.1-AC1.1_data\` as l16 WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' AND data_format_0>0)  as table16
      where kwh16>0) as total16, 

      (SELECT sum(kwh17) as ac12 from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) , '%Y-%m-%d') AS tgl17,
      data_format_0-(select s2.data_format_0 as previous from
		parammachine_saka.\`cMT-Gedung-UTY_PP.1-AC1.2_data\` as s2
		where s2.data_index < l17.data_index and s2.data_format_0 order by s2.data_index  desc limit 1) as kwh17
      from parammachine_saka.\`cMT-Gedung-UTY_PP.1-AC1.2_data\` as l17 WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' AND data_format_0>0)  as table17
      where kwh17>0) as total17, 

      (SELECT sum(kwh18) as ac13 from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) , '%Y-%m-%d') AS tgl18,
      data_format_0-(select s2.data_format_0 as previous from
		parammachine_saka.\`cMT-Gedung-UTY_PP.1-AC1.3_data\` as s2
		where s2.data_index < l18.data_index and s2.data_format_0 order by s2.data_index  desc limit 1) as kwh18
      from parammachine_saka.\`cMT-Gedung-UTY_PP.1-AC1.3_data\` as l18 WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' AND data_format_0>0)  as table18
      where kwh18>0) as total18, 

      (SELECT sum(kwh19) as ac23 from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) , '%Y-%m-%d') AS tgl19,
      data_format_0-(select s2.data_format_0 as previous from
		parammachine_saka.\`cMT-Gedung-UTY_PP.1-AC2.3_data\` as s2
		where s2.data_index < l19.data_index and s2.data_format_0 order by s2.data_index  desc limit 1) as kwh19
      from parammachine_saka.\`cMT-Gedung-UTY_PP.1-AC2.3_data\` as l19 WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' AND data_format_0>0)  as table19
      where kwh19>0) as total19, 

      (SELECT sum(kwh20) as produksi1 from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) , '%Y-%m-%d') AS tgl20,
      data_format_0-(select s2.data_format_0 as previous from
		parammachine_saka.\`cMT-Gedung-UTY_SDP.1-Produksi_data\` as s2
		where s2.data_index < l20.data_index and s2.data_format_0 order by s2.data_index  desc limit 1) as kwh20
      from parammachine_saka.\`cMT-Gedung-UTY_SDP.1-Produksi_data\` as l20 WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' AND data_format_0>0)  as table20
      where kwh20>0) as total20, 

      (SELECT sum(kwh21) as produksi2 from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) , '%Y-%m-%d') AS tgl21,
      data_format_0-(select s2.data_format_0 as previous from
		parammachine_saka.\`cMT-Gedung-UTY_SDP.2-Produksi_data\` as s2
		where s2.data_index < l21.data_index and s2.data_format_0 order by s2.data_index  desc limit 1) as kwh21
      from parammachine_saka.\`cMT-Gedung-UTY_SDP.2-Produksi_data\` as l21 WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' AND data_format_0>0)  as table21
      where kwh21>0) as total21, 

      (SELECT sum(kwh22) as hydrant from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) , '%Y-%m-%d') AS tgl22,
      data_format_0-(select s2.data_format_0 as previous from
		parammachine_saka.\`cMT-Gedung-UTY_PP.2-Hydrant_data\` as s2
		where s2.data_index < l22.data_index and s2.data_format_0 order by s2.data_index  desc limit 1) as kwh22
      from parammachine_saka.\`cMT-Gedung-UTY_PP.2-Hydrant_data\` as l22 WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' AND data_format_0>0)  as table22
      where kwh22>0) as total22, 

      (SELECT sum(kwh23) as fatigon from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) , '%Y-%m-%d') AS tgl23,
      data_format_0-(select s2.data_format_0 as previous from
		parammachine_saka.\`cMT-Gedung-UTY_PP.2-Fatigon_data\` as s2
		where s2.data_index < l23.data_index and s2.data_format_0 order by s2.data_index  desc limit 1) as kwh23
      from parammachine_saka.\`cMT-Gedung-UTY_PP.2-Fatigon_data\` as l23 WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' AND data_format_0>0)  as table23
      where kwh23>0) as total23, 

      (SELECT sum(kwh24) as puyer from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) , '%Y-%m-%d') AS tgl24,
      data_format_0-(select s2.data_format_0 as previous from
		parammachine_saka.\`cMT-Gedung-UTY_PP.2-Puyer_data\` as s2
		where s2.data_index < l24.data_index and s2.data_format_0 order by s2.data_index  desc limit 1) as kwh24
      from parammachine_saka.\`cMT-Gedung-UTY_PP.2-Puyer_data\` as l24 WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' AND data_format_0>0)  as table24
      where kwh24>0) as total24, 

      (SELECT sum(kwh25) as mixagrib from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) , '%Y-%m-%d') AS tgl25,
      data_format_0-(select s2.data_format_0 as previous from
		parammachine_saka.\`cMT-Gedung-UTY_PP.2-Mixagrib_data\` as s2
		where s2.data_index < l25.data_index and s2.data_format_0 order by s2.data_index  desc limit 1) as kwh25
      from parammachine_saka.\`cMT-Gedung-UTY_PP.2-Mixagrib_data\` as l25 WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' AND data_format_0>0)  as table25
      where kwh25>0) as total25, 

      (SELECT sum(kwh26) as lablt2 from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) , '%Y-%m-%d') AS tgl26,
      data_format_0-(select s2.data_format_0 as previous from
		parammachine_saka.\`cMT-Gedung-UTY_PP.2-LabLt.2_data\` as s2
		where s2.data_index < l26.data_index and s2.data_format_0 order by s2.data_index  desc limit 1) as kwh26
      from parammachine_saka.\`cMT-Gedung-UTY_PP.2-LabLt.2_data\` as l26 WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' AND data_format_0>0)  as table26
      where kwh26>0) as total26, 

      (SELECT sum(kwh27) as fasilitas from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) , '%Y-%m-%d') AS tgl27,
      data_format_0-(select s2.data_format_0 as previous from
		parammachine_saka.\`cMT-Gedung-UTY_PP.2-Fasilitas_data\` as s2
		where s2.data_index < l27.data_index and s2.data_format_0 order by s2.data_index  desc limit 1) as kwh27
      from parammachine_saka.\`cMT-Gedung-UTY_PP.2-Fasilitas_data\` as l27 WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' AND data_format_0>0)  as table27
      where kwh27>0) as total27, 

      (SELECT sum(kwh28) as packwh from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) , '%Y-%m-%d') AS tgl28,
      data_format_0-(select s2.data_format_0 as previous from
		parammachine_saka.\`cMT-Gedung-UTY_PP.2-PackWH_data\` as s2
		where s2.data_index < l28.data_index and s2.data_format_0 order by s2.data_index  desc limit 1) as kwh28
      from parammachine_saka.\`cMT-Gedung-UTY_PP.2-PackWH_data\` as l28 WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' AND data_format_0>0)  as table28
      where kwh28>0) as total28, 

      (SELECT sum(kwh29) as pro11 from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) , '%Y-%m-%d') AS tgl29,
      data_format_0-(select s2.data_format_0 as previous from
		parammachine_saka.\`cMT-Gedung-UTY_LP.2-PRO1.1_data\` as s2
		where s2.data_index < l29.data_index and s2.data_format_0 order by s2.data_index  desc limit 1) as kwh29
      from parammachine_saka.\`cMT-Gedung-UTY_LP.2-PRO1.1_data\` as l29 WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' AND data_format_0>0)  as table29
      where kwh29>0) as total29, 

      (SELECT sum(kwh30) as pro12 from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) , '%Y-%m-%d') AS tgl30,
      data_format_0-(select s2.data_format_0 as previous from
		parammachine_saka.\`cMT-Gedung-UTY_LP.2-PRO1.2_data\` as s2
		where s2.data_index < l30.data_index and s2.data_format_0 order by s2.data_index  desc limit 1) as kwh30
      from parammachine_saka.\`cMT-Gedung-UTY_LP.2-PRO1.2_data\` as l30 WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' AND data_format_0>0)  as table30
      where kwh30>0) as total30, 

      (SELECT sum(kwh31) as pro13 from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) , '%Y-%m-%d') AS tgl31,
      data_format_0-(select s2.data_format_0 as previous from
		parammachine_saka.\`cMT-Gedung-UTY_LP.2-PRO1.3_data\` as s2
		where s2.data_index < l31.data_index and s2.data_format_0 order by s2.data_index  desc limit 1) as kwh31
      from parammachine_saka.\`cMT-Gedung-UTY_LP.2-PRO1.3_data\` as l31 WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' AND data_format_0>0)  as table31
      where kwh31>0) as total31, 

      (SELECT sum(kwh32) as pro23 from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) , '%Y-%m-%d') AS tgl32,
      data_format_0-(select s2.data_format_0 as previous from
		parammachine_saka.\`cMT-Gedung-UTY_LP.2-PRO2.3_data\` as s2
		where s2.data_index < l32.data_index and s2.data_format_0 order by s2.data_index  desc limit 1) as kwh32
      from parammachine_saka.\`cMT-Gedung-UTY_LP.2-PRO2.3_data\` as l32 WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' AND data_format_0>0)  as table32
      where kwh32>0) as total32, 

      (SELECT sum(kwh33) as pro31 from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) , '%Y-%m-%d') AS tgl33,
      data_format_0-(select s2.data_format_0 as previous from
		parammachine_saka.\`cMT-Gedung-UTY_LP.2-PRO3.1_data\` as s2
		where s2.data_index < l33.data_index and s2.data_format_0 order by s2.data_index  desc limit 1) as kwh33
      from parammachine_saka.\`cMT-Gedung-UTY_LP.2-PRO3.1_data\` as l33 WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' AND data_format_0>0)  as table33
      where kwh33>0) as total33, 

      (SELECT sum(kwh34) as pro41 from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) , '%Y-%m-%d') AS tgl34,
      data_format_0-(select s2.data_format_0 as previous from
		parammachine_saka.\`cMT-Gedung-UTY_LP.2-PRO4.1_data\` as s2
		where s2.data_index < l34.data_index and s2.data_format_0 order by s2.data_index  desc limit 1) as kwh34
      from parammachine_saka.\`cMT-Gedung-UTY_LP.2-PRO4.1_data\` as l34 WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' AND data_format_0>0)  as table34
      where kwh34>0) as total34, 

      (SELECT sum(kwh35) as wh11 from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) , '%Y-%m-%d') AS tgl35,
      data_format_0-(select s2.data_format_0 as previous from
		parammachine_saka.\`cMT-Gedung-UTY_LP.2WH1.1_data\` as s2
		where s2.data_index < l35.data_index and s2.data_format_0 order by s2.data_index  desc limit 1) as kwh35
      from parammachine_saka.\`cMT-Gedung-UTY_LP.2WH1.1_data\` as l35 WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' AND data_format_0>0)  as table35
      where kwh35>0) as total35, 

      (SELECT sum(kwh36) as mezz11 from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) , '%Y-%m-%d') AS tgl36,
      data_format_0-(select s2.data_format_0 as previous from
		parammachine_saka.\`cMT-Gedung-UTY_LP.2MEZZ1.1_data\` as s2
		where s2.data_index < l36.data_index and s2.data_format_0 order by s2.data_index  desc limit 1) as kwh36
      from parammachine_saka.\`cMT-Gedung-UTY_LP.2MEZZ1.1_data\` as l36 WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' AND data_format_0>0)  as table36
      where kwh36>0) as total36, 

      (SELECT sum(kwh37) as posjaga1 from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) , '%Y-%m-%d') AS tgl37,
      data_format_0-(select s2.data_format_0 as previous from
		parammachine_saka.\`cMT-Gedung-UTY_PPLP.2-PosJaga1_data\` as s2
		where s2.data_index < l37.data_index and s2.data_format_0 order by s2.data_index  desc limit 1) as kwh37
      from parammachine_saka.\`cMT-Gedung-UTY_PPLP.2-PosJaga1_data\` as l37 WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' AND data_format_0>0)  as table37
      where kwh37>0) as total37, 

      (SELECT sum(kwh38) as PosJaga2 from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) , '%Y-%m-%d') AS tgl38,
      data_format_0-(select s2.data_format_0 as previous from
		parammachine_saka.\`cMT-Gedung-UTY_PPLP.2-PosJaga2_data\` as s2
		where s2.data_index < l38.data_index and s2.data_format_0 order by s2.data_index  desc limit 1) as kwh38
      from parammachine_saka.\`cMT-Gedung-UTY_PPLP.2-PosJaga2_data\` as l38 WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' AND data_format_0>0)  as table38
      where kwh38>0) as total38, 



      (SELECT sum(kwh40) as koperasi from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) , '%Y-%m-%d') AS tgl40,
      data_format_0-(select s2.data_format_0 as previous from
		parammachine_saka.\`cMT-Gedung-UTY_PPLP.2-Koperasi_data\` as s2
		where s2.data_index < l40.data_index and s2.data_format_0 order by s2.data_index  desc limit 1) as kwh40
      from parammachine_saka.\`cMT-Gedung-UTY_PPLP.2-Koperasi_data\` as l40 WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' AND data_format_0>0)  as table40
      where kwh40>0) as total40, 

      (SELECT sum(kwh41) as gcpgenset from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) , '%Y-%m-%d') AS tgl41,
      data_format_0-(select s2.data_format_0 as previous from
		parammachine_saka.\`cMT-Gedung-UTY_GCP_Genset_data\` as s2
		where s2.data_index < l41.data_index and s2.data_format_0 order by s2.data_index  desc limit 1) as kwh41
      from parammachine_saka.\`cMT-Gedung-UTY_GCP_Genset_data\` as l41 WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' AND data_format_0>0)  as table41
      where kwh41>0) as total41, 

      (SELECT sum(kwh42) as sdpgenset from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) , '%Y-%m-%d') AS tgl42,
      data_format_0-(select s2.data_format_0 as previous from
		parammachine_saka.\`cMT-Gedung-UTY_SDP_Genset_data\` as s2
		where s2.data_index < l42.data_index and s2.data_format_0 order by s2.data_index  desc limit 1) as kwh42
      from parammachine_saka.\`cMT-Gedung-UTY_SDP_Genset_data\` as l42 WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' AND data_format_0>0)  as table42
      where kwh42>0) as total42, 

      (SELECT sum(kwh47) as chiller1 from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) , '%Y-%m-%d') AS tgl47,
      data_format_0-(select s2.data_format_0 as previous from
		parammachine_saka.\`cMT-Gedung-UTY_Chiller1_data\` as s2
		where s2.data_index < l47.data_index and s2.data_format_0 order by s2.data_index  desc limit 1) as kwh47
      from parammachine_saka.\`cMT-Gedung-UTY_Chiller1_data\` as l47 WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' AND data_format_0>0)  as table47
      where kwh47>0) as total47, 

      (SELECT sum(kwh48) as chiller2 from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) , '%Y-%m-%d') AS tgl48,
      data_format_0-(select s2.data_format_0 as previous from
		parammachine_saka.\`cMT-Gedung-UTY_Chiller2_data\` as s2
		where s2.data_index < l48.data_index and s2.data_format_0 order by s2.data_index  desc limit 1) as kwh48
      from parammachine_saka.\`cMT-Gedung-UTY_Chiller2_data\` as l48 WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' AND data_format_0>0)  as table48
      where kwh48>0) as total48, 

      (SELECT sum(kwh49) as chiller3 from (SELECT
      DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`) , '%Y-%m-%d') AS tgl49,
      data_format_0-(select s2.data_format_0 as previous from
		parammachine_saka.\`cMT-Gedung-UTY_Chiller3_data\` as s2
		where s2.data_index < l49.data_index and s2.data_format_0 order by s2.data_index  desc limit 1) as kwh49
      from parammachine_saka.\`cMT-Gedung-UTY_Chiller3_data\` as l49 WHERE
      date(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}' AND data_format_0>0)  as table49
      where kwh49>0) as total49
    `;

    db.query(queryGet,(err, result) => {
      return response.status(200).send(result);
    });
  },
    // Purified Water Backend
    PurifiedWater : async (request, response) => {
      const {area, start, finish} = request.query;
      const queryGet = `SELECT
        DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`), '%Y-%m-%d %H:%i') AS label,
        data_index AS x,
        round(data_format_0,2) AS y
        FROM \`${area}\`
        WHERE
          DATE(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}'
        ORDER BY
        \`time@timestamp\``;
  
      db.query(queryGet,(err, result) => {
        return response.status(200).send(result);
      });
    },
    // Chiller Chart Backend
  ChillerGraph : async (request, response) => {
    const {area, start, finish, chiller, komp} = request.query;
    const queryGet = `SELECT
    DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`)+ INTERVAL 5 HOUR, '%Y-%m-%d %H:%i') AS label,
    \`time@timestamp\`*1000 AS x,
    data_format_0 AS y
    FROM parammachine_saka.\`CMT-Chiller_${area}${komp}${chiller}_data\`
    WHERE
    DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`)+ INTERVAL 5 HOUR, '%Y-%m-%d') BETWEEN '${start}' AND '${finish}'
    ORDER BY
    \`time@timestamp\``;

    db.query(queryGet,(err, result) => {
      return response.status(200).send(result);
    });
  },

  // Chiller Status Backend
  ChillerStatus : async (request, response) => {
    const {start, finish, chiller, komp} = request.query;
    const queryGet = `SELECT
    DATE_FORMAT(FROM_UNIXTIME(a.\`time@timestamp\`)+ INTERVAL 5 HOUR, '%Y-%m-%d %H:%i:%s') AS time,
      case
      when a.data_format_0 = 0 then "OFF"
      when a.data_format_0 = 1 then "ON"
      end AS 'Alarm_Chiller',
      case
      when a1.data_format_0 = 0 then "OFF"
      when a1.data_format_0 = 1 then "ON"
      end as "Status_Chiller",
       case
      when f.data_format_0 = 0 then "OFF"
          when f.data_format_0 = 1 then "ON"
    end as "Fan_Kondensor",
      case
      when d.data_format_0 = 0 then "OFF"
          when d.data_format_0 = 1 then "ON"
    end AS 'Status_Kompresor'
  From
      parammachine_saka.\`CMT-Chiller_R-AlarmCH${chiller}_data\` AS a
  LEFT JOIN
      parammachine_saka.\`CMT-Chiller_R-StatusCH${chiller}_data\` AS a1
    ON
      DATE_FORMAT(FROM_UNIXTIME(a.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(a1.\`time@timestamp\`), '%Y-%m-%d %H:%i')
  LEFT JOIN
      parammachine_saka.\`CMT-Chiller_H-StatFanKondCH${chiller}_data\` AS f
    ON
      DATE_FORMAT(FROM_UNIXTIME(a.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(f.\`time@timestamp\`), '%Y-%m-%d %H:%i')
  LEFT JOIN
      parammachine_saka.\`CMT-Chiller_R-Status${komp}${chiller}_data\` AS d
    ON
      DATE_FORMAT(FROM_UNIXTIME(a.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(d.\`time@timestamp\`), '%Y-%m-%d %H:%i')
  WHERE 
  DATE_FORMAT(FROM_UNIXTIME(a.\`time@timestamp\`)+ INTERVAL 5 HOUR, '%Y-%m-%d') BETWEEN '${start}' AND '${finish}'
      group by a.data_index
      order by DATE_FORMAT(FROM_UNIXTIME(a.\`time@timestamp\`), '%Y-%m-%d %H:%i:%s');`

    db.query(queryGet,(err, result) => {
      return response.status(200).send(result);
    });
  },

    // Chiller Status Backend
    ChillerKondisi : async (request, response) => {
      const {start, finish, chiller, komp, oliats} = request.query;
      const queryGet = `SELECT
      DATE_FORMAT(FROM_UNIXTIME(a.\`time@timestamp\`)+ INTERVAL 5 HOUR, '%Y-%m-%d %H:%i:%s') AS time,
      case
        when b.data_format_0 = 0 then "Kotor"
        when b.data_format_0 = 1 then "Bersih"
        end as "Bodi_Chiller",
        case
        when c.data_format_0 = 0 then "Kotor"
        when c.data_format_0 = 1 then "Bersih"
      end as "KisiKisi_Kondensor",
         case
        when y.data_format_0 = 4 then "0%"
            when y.data_format_0 = 0 then "25%"
            when y.data_format_0 = 1 then "50%"
            when y.data_format_0 = 2 then "75%"
            when y.data_format_0 = 3 then "100%"
      end AS "Lvl_Oil_Sight_Glass_Atas",
        case
        when z.data_format_0 = 4 then "0%"
            when z.data_format_0 = 0 then "25%"
            when z.data_format_0 = 1 then "50%"
            when z.data_format_0 = 2 then "75%"
            when z.data_format_0 = 3 then "100%"
      end AS "Lvl_Oil_Sight_Glass_Bawah",
        case
         when aa.data_format_0 = 0 then "Clear"
         when aa.data_format_0 = 1 then "Buble"
      end AS "Jalur_Sight_Glass_EXP_Valve"
    From
      parammachine_saka.\`CMT-Chiller_R-AlarmCH${chiller}_data\` AS a
    LEFT JOIN
       parammachine_saka.\`CMT-Chiller_H-BodiChillerCH${chiller}_data\` AS b
     ON 
        DATE_FORMAT(FROM_UNIXTIME(a.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(b.\`time@timestamp\`), '%Y-%m-%d %H:%i')
    LEFT JOIN
        parammachine_saka.\`CMT-Chiller_H-KisiKondenCH${chiller}_data\` AS c
    ON
        DATE_FORMAT(FROM_UNIXTIME(a.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(c.\`time@timestamp\`), '%Y-%m-%d %H:%i')
    LEFT JOIN
        parammachine_saka.\`CMT-Chiller_H-${oliats}Ats${komp}${chiller}_data\`AS y
    ON
        DATE_FORMAT(FROM_UNIXTIME(a.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(y.\`time@timestamp\`), '%Y-%m-%d %H:%i')
    LEFT JOIN
        parammachine_saka.\`CMT-Chiller_H-OliGlsBwh${komp}${chiller}_data\`AS z
    ON
        DATE_FORMAT(FROM_UNIXTIME(a.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(z.\`time@timestamp\`), '%Y-%m-%d %H:%i')
    LEFT JOIN
        parammachine_saka.\`CMT-Chiller_H-GlsExpVlv${komp}${chiller}_data\`AS aa
    ON
        DATE_FORMAT(FROM_UNIXTIME(a.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(aa.\`time@timestamp\`), '%Y-%m-%d %H:%i')
    WHERE 
    DATE_FORMAT(FROM_UNIXTIME(a.\`time@timestamp\`)+ INTERVAL 5 HOUR, '%Y-%m-%d') BETWEEN '${start}' AND '${finish}'
        group by a.data_index
        order by DATE_FORMAT(FROM_UNIXTIME(a.\`time@timestamp\`), '%Y-%m-%d %H:%i:%s');`
  
      db.query(queryGet,(err, result) => {
        return response.status(200).send(result);
      });
    },

    // Chiller Nama Backend
    ChillerNama : async (request, response) => {
      const {start, finish, chiller, komp} = request.query;
      const queryGet = `SELECT
      DATE_FORMAT(FROM_UNIXTIME(a.\`time@timestamp\`)+ INTERVAL 5 HOUR, '%Y-%m-%d %H:%i:%s') AS time,
      case
        when s.data_format_0 = 0 then "Andi"
        when s.data_format_0 = 1 then "Toni"
        when s.data_format_0 = 2 then "Nur Quraisin"
        when s.data_format_0 = 3 then "Jimmy"
        end AS "Operator",
        case
        when b13.data_format_0 = 0 then "Nur Ngaeni"
        when b13.data_format_0 = 1 then "Syahrul"
        when b13.data_format_0 = 2 then "Yudi"
        end AS "Engineer",
        case
        when b14.data_format_0 = 0 then "Ujang"
        when b14.data_format_0 = 1 then "Natan"
        end AS "Utility_SPV"
      FROM 
        parammachine_saka.\`CMT-Chiller_R-AlarmCH${chiller}_data\` AS a
    LEFT JOIN 
        parammachine_saka.\`CMT-Chiller_H-NamaOperCH${chiller}_data\` AS s
      ON 
        DATE_FORMAT(FROM_UNIXTIME(a.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i')
        LEFT JOIN
        parammachine_saka.\`CMT-Chiller_H-NamaTekCH${chiller}_data\` AS b13
      ON
        DATE_FORMAT(FROM_UNIXTIME(a.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(b13.\`time@timestamp\`), '%Y-%m-%d %H:%i')
    LEFT JOIN
        parammachine_saka.\`CMT-Chiller_H-NamaSpvCH${chiller}_data\` AS b14
      ON
        DATE_FORMAT(FROM_UNIXTIME(a.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(b14.\`time@timestamp\`), '%Y-%m-%d %H:%i')
        WHERE 
        DATE_FORMAT(FROM_UNIXTIME(a.\`time@timestamp\`)+ INTERVAL 5 HOUR, '%Y-%m-%d') BETWEEN '${start}' AND '${finish}'
        group by a.data_index
        order by DATE_FORMAT(FROM_UNIXTIME(a.\`time@timestamp\`), '%Y-%m-%d %H:%i:%s');`
  
      db.query(queryGet,(err, result) => {
        return response.status(200).send(result);
      });
    },

        // Chiller Data 1 Backend
        ChillerData1 : async (request, response) => {
          const {start, finish, chiller, komp} = request.query;
          const queryGet = `select
          DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`)+ INTERVAL 5 HOUR, '%Y-%m-%d %H:%i:%s') AS time,
          a1.data_format_0 AS "Active_Setpoint",
          a2.data_format_0  AS "Evap_LWT",
          a3.data_format_0  AS "Evap_EWT",
          a4.data_format_0  AS "Unit_Capacity_Full",
          a5.data_format_0  AS "Outdoor_Temperature"  
          FROM 
            parammachine_saka.\`CMT-Chiller_R-AlarmCH${chiller}_data\` AS s
          LEFT JOIN 
                  parammachine_saka.\`CMT-Chiller_R-ActiSetpoiCH${chiller}_data\` AS a1
                ON 
                  DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(a1.\`time@timestamp\`), '%Y-%m-%d %H:%i')
          LEFT JOIN 
                  parammachine_saka.\`CMT-Chiller_R-EvapLWTCH${chiller}_data\` AS a2
                ON 
                  DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(a2.\`time@timestamp\`), '%Y-%m-%d %H:%i')
          LEFT JOIN 
                  parammachine_saka.\`CMT-Chiller_R-EvapEWTCH${chiller}_data\` AS a3
                ON 
                  DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(a3.\`time@timestamp\`), '%Y-%m-%d %H:%i')
          LEFT JOIN 
                  parammachine_saka.\`CMT-Chiller_R-UnitCapCH${chiller}_data\` AS a4
                ON 
                  DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(a4.\`time@timestamp\`), '%Y-%m-%d %H:%i')
          LEFT JOIN 
                  parammachine_saka.\`CMT-Chiller_R-OutTempCH${chiller}_data\` AS a5
                ON 
                  DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(a4.\`time@timestamp\`), '%Y-%m-%d %H:%i')
          WHERE 
          DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`)+ INTERVAL 5 HOUR, '%Y-%m-%d') BETWEEN '${start}' AND '${finish}'
              group by s.data_index
              order by DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i:%s');`
      
          db.query(queryGet,(err, result) => {
            return response.status(200).send(result);
          });
        },

        // Chiller Data 2 Backend
        ChillerData2 : async (request, response) => {
          const {start, finish, chiller, komp} = request.query;
          const queryGet = `select
          DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`)+ INTERVAL 5 HOUR, '%Y-%m-%d %H:%i:%s') AS time,
          a1.data_format_0 AS "Unit_Capacity_Kompresor",
          a2.data_format_0  AS "Evap_Pressure_Kompresor",
          a3.data_format_0  AS "Cond_Pressure_Kompresor",
          a4.data_format_0  AS "Evap_Sat_Temperature_Kompresor",
          a5.data_format_0  AS "Cond_Sat_Temperature_Kompresor"  
          FROM 
            parammachine_saka.\`CMT-Chiller_R-AlarmCH${chiller}_data\` AS s
          LEFT JOIN 
                  parammachine_saka.\`CMT-Chiller_R-Capacity${komp}${chiller}_data\` AS a1
                ON 
                  DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(a1.\`time@timestamp\`), '%Y-%m-%d %H:%i')
          LEFT JOIN 
                  parammachine_saka.\`CMT-Chiller_R-EvapPress${komp}${chiller}_data\` AS a2
                ON 
                  DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(a2.\`time@timestamp\`), '%Y-%m-%d %H:%i')
          LEFT JOIN 
                  parammachine_saka.\`CMT-Chiller_R-CondPress${komp}${chiller}_data\` AS a3
                ON 
                  DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(a3.\`time@timestamp\`), '%Y-%m-%d %H:%i')
          LEFT JOIN 
                  parammachine_saka.\`CMT-Chiller_R-EvapSatTe${komp}${chiller}_data\` AS a4
                ON 
                  DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(a4.\`time@timestamp\`), '%Y-%m-%d %H:%i')
          LEFT JOIN 
                  parammachine_saka.\`CMT-Chiller_R-ConSatTem${komp}${chiller}_data\` AS a5
                ON 
                  DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(a5.\`time@timestamp\`), '%Y-%m-%d %H:%i')
          WHERE 
          DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`)+ INTERVAL 5 HOUR, '%Y-%m-%d') BETWEEN '${start}' AND '${finish}'
              group by s.data_index
              order by DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i:%s');`
      
          db.query(queryGet,(err, result) => {
            return response.status(200).send(result);
          });
        },


        // Chiller Data 3 Backend
        ChillerData3 : async (request, response) => {
          const {start, finish, chiller, komp} = request.query;
          const queryGet = `select
          DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`)+ INTERVAL 5 HOUR, '%Y-%m-%d %H:%i:%s') AS time,
          a1.data_format_0 AS "Suction_Temperature_Kompresor",
          a2.data_format_0  AS "Discharge_Temperature_Kompresor",
          a3.data_format_0  AS "Suction_SH_Kompresor",
          a4.data_format_0  AS "Discharge_SH_Kompresor" 
          FROM 
            parammachine_saka.\`CMT-Chiller_R-AlarmCH${chiller}_data\` AS s
          LEFT JOIN 
                  parammachine_saka.\`CMT-Chiller_R-SuctiTemp${komp}${chiller}_data\` AS a1
                ON 
                  DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(a1.\`time@timestamp\`), '%Y-%m-%d %H:%i')
          LEFT JOIN 
                  parammachine_saka.\`CMT-Chiller_R-DischTemp${komp}${chiller}_data\` AS a2
                ON 
                  DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(a2.\`time@timestamp\`), '%Y-%m-%d %H:%i')
          LEFT JOIN 
                  parammachine_saka.\`CMT-Chiller_R-SuctionSH${komp}${chiller}_data\` AS a3
                ON 
                  DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(a3.\`time@timestamp\`), '%Y-%m-%d %H:%i')
          LEFT JOIN 
                  parammachine_saka.\`CMT-Chiller_R-DischarSH${komp}${chiller}_data\` AS a4
                ON 
                  DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(a4.\`time@timestamp\`), '%Y-%m-%d %H:%i')
          WHERE 
          DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`)+ INTERVAL 5 HOUR, '%Y-%m-%d') BETWEEN '${start}' AND '${finish}'
              group by s.data_index
              order by DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i:%s');`
      
          db.query(queryGet,(err, result) => {
            return response.status(200).send(result);
          });
        },
  
        // Chiller Data 4 Backend
        ChillerData4 : async (request, response) => {
          const {start, finish, chiller, komp} = request.query;
          const queryGet = `select
          DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`)+ INTERVAL 5 HOUR, '%Y-%m-%d %H:%i:%s') AS time,
          a1.data_format_0 AS "Evap_Approach_Kompresor",
          a2.data_format_0  AS "Evap_Design_Approach_Kompresor",
          a3.data_format_0  AS "Cond_Approach_Kompresor",
          a4.data_format_0  AS "Oil_Pressure_Kompresor",
          a5.data_format_0  AS "Oil_Pressure_Differential_Kompresor"  
          FROM 
            parammachine_saka.\`CMT-Chiller_R-AlarmCH${chiller}_data\` AS s
          LEFT JOIN 
                  parammachine_saka.\`CMT-Chiller_R-EvapAppro${komp}${chiller}_data\` AS a1
                ON 
                  DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(a1.\`time@timestamp\`), '%Y-%m-%d %H:%i')
          LEFT JOIN 
                  parammachine_saka.\`CMT-Chiller_R-EvaDsgApp${komp}${chiller}_data\` AS a2
                ON 
                  DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(a2.\`time@timestamp\`), '%Y-%m-%d %H:%i')
          LEFT JOIN 
                  parammachine_saka.\`CMT-Chiller_R-CondAppro${komp}${chiller}_data\` AS a3
                ON 
                  DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(a3.\`time@timestamp\`), '%Y-%m-%d %H:%i')
          LEFT JOIN 
                  parammachine_saka.\`CMT-Chiller_R-OilPress${komp}${chiller}_data\` AS a4
                ON 
                  DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(a4.\`time@timestamp\`), '%Y-%m-%d %H:%i')
          LEFT JOIN 
                  parammachine_saka.\`CMT-Chiller_R-OilPresDf${komp}${chiller}_data\` AS a5
                ON 
                  DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(a5.\`time@timestamp\`), '%Y-%m-%d %H:%i')
          WHERE 
          DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`)+ INTERVAL 5 HOUR, '%Y-%m-%d') BETWEEN '${start}' AND '${finish}'
              group by s.data_index
              order by DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i:%s');`

          db.query(queryGet,(err, result) => {
            return response.status(200).send(result);
          });
        },

      // Chiller Data 5 Backend
      ChillerData5 : async (request, response) => {
        const {start, finish, chiller, komp, fan} = request.query;
        const queryGet = `select
        DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`)+ INTERVAL 5 HOUR, '%Y-%m-%d %H:%i:%s') AS time,
        a1.data_format_0 AS "EXV_Position_Kompresor",
        a2.data_format_0  AS "Run_Hour_Kompressor",
        a3.data_format_0  AS "Ampere_Kompressor",
        a4.data_format_0  AS "No_Of_Start_Kompresor",
        a5.data_format_0  AS "Total_Fan_ON_Kompresor"  
        FROM 
          parammachine_saka.\`CMT-Chiller_R-AlarmCH${chiller}_data\` AS s
        LEFT JOIN 
                parammachine_saka.\`CMT-Chiller_R-EXVPositi${komp}2_data\` AS a1
              ON 
                DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(a1.\`time@timestamp\`), '%Y-%m-%d %H:%i')
        LEFT JOIN 
                parammachine_saka.\`CMT-Chiller_R-RunHour${komp}${chiller}_data\` AS a2
              ON 
                DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(a2.\`time@timestamp\`), '%Y-%m-%d %H:%i')
        LEFT JOIN 
                parammachine_saka.\`CMT-Chiller_R-Ampere${komp}${chiller}_data\` AS a3
              ON 
                DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(a3.\`time@timestamp\`), '%Y-%m-%d %H:%i')
        LEFT JOIN 
                parammachine_saka.\`CMT-Chiller_R-No.Start${komp}${chiller}_data\` AS a4
              ON 
                DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(a4.\`time@timestamp\`), '%Y-%m-%d %H:%i')
        LEFT JOIN 
                parammachine_saka.\`CMT-Chiller_H-FanOut${fan}${komp}${chiller}_data\` AS a5
              ON 
                DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(a5.\`time@timestamp\`), '%Y-%m-%d %H:%i')
        WHERE 
        DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`)+ INTERVAL 5 HOUR, '%Y-%m-%d') BETWEEN '${start}' AND '${finish}'
            group by s.data_index
            order by DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i:%s');`

        db.query(queryGet,(err, result) => {
          return response.status(200).send(result);
        });
      },
      // Chiller Data 6 Backend
      ChillerData6 : async (request, response) => {
        const {start, finish, chiller, komp} = request.query;
        const queryGet = `select
        DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`)+ INTERVAL 5 HOUR, '%Y-%m-%d %H:%i:%s') AS time,
        a1.data_format_0 AS "Tekanan_Return_Chiller",
        round(a2.data_format_0,2)  AS "Tekanan_Supply_Chiller",
        round(a3.data_format_0,2)  AS "Inlet_Softwater",
        a4.data_format_0  AS "Pompa_CHWS_1",
        round(a5.data_format_0,2)  AS "Suhu_sebelum_Pompa_Supply"  
        FROM 
          parammachine_saka.\`CMT-Chiller_R-AlarmCH${chiller}_data\` AS s
         LEFT JOIN 
                parammachine_saka.\`CMT-Chiller_H-TknReturnCH${chiller}_data\` AS a1
              ON 
                DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(a1.\`time@timestamp\`), '%Y-%m-%d %H:%i')
         LEFT JOIN 
                parammachine_saka.\`CMT-Chiller_H-TknSupplyCH${chiller}_data\` AS a2
              ON 
                DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(a2.\`time@timestamp\`), '%Y-%m-%d %H:%i')
         LEFT JOIN 
                parammachine_saka.\`CMT-Chiller_H-InletSoftCH${chiller}_data\` AS a3
              ON 
                DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(a3.\`time@timestamp\`), '%Y-%m-%d %H:%i')
         LEFT JOIN 
                parammachine_saka.\`CMT-Chiller_O-StatONPS${chiller}_data\` AS a4
              ON 
                DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(a4.\`time@timestamp\`), '%Y-%m-%d %H:%i')
         LEFT JOIN 
                parammachine_saka.\`CMT-Chiller_H-ShuSebPmSupCH${chiller}_data\` AS a5
              ON 
                DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(a5.\`time@timestamp\`), '%Y-%m-%d %H:%i')
        WHERE 
        DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`)+ INTERVAL 5 HOUR, '%Y-%m-%d') BETWEEN '${start}' AND '${finish}'
            group by s.data_index
            order by DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i:%s');`

        db.query(queryGet,(err, result) => {
          return response.status(200).send(result);
        });
      },
      // Chiller Data 7 Backend
      ChillerData7 : async (request, response) => {
        const {start, finish, chiller, komp} = request.query;
        const queryGet = `select
        DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`)+ INTERVAL 5 HOUR, '%Y-%m-%d %H:%i:%s') AS time,
        round(a1.data_format_0,2) AS "Suhu_sesudah_Pompa_Supply",
        round(a2.data_format_0,2)  AS "Tekanan_Sebelum_Pompa_Supply",
        round(a3.data_format_0,2)  AS "Tekanan_Sesudah_Pompa_Supply",
        round(a4.data_format_0,2)  AS "Pompa_CHWR_1",
        round(a5.data_format_0,2)  AS "Suhu_sebelum_Pompa_Return"  
        FROM 
          parammachine_saka.\`CMT-Chiller_R-AlarmCH${chiller}_data\` AS s
        LEFT JOIN 
                parammachine_saka.\`CMT-Chiller_H-ShuSesPmSupCH${chiller}_data\` AS a1
              ON 
                DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(a1.\`time@timestamp\`), '%Y-%m-%d %H:%i')
        LEFT JOIN 
                parammachine_saka.\`CMT-Chiller_H-PreSebPmSupCH${chiller}_data\` AS a2
              ON 
                DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(a2.\`time@timestamp\`), '%Y-%m-%d %H:%i')
        LEFT JOIN 
                parammachine_saka.\`CMT-Chiller_H-PreSesPomSpCH${chiller}_data\` AS a3
              ON 
                DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(a3.\`time@timestamp\`), '%Y-%m-%d %H:%i')
        LEFT JOIN 
                parammachine_saka.\`CMT-Chiller_O-StatONPR${chiller}_data\` AS a4
              ON 
                DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(a4.\`time@timestamp\`), '%Y-%m-%d %H:%i')
        LEFT JOIN 
                parammachine_saka.\`CMT-Chiller_H-SuhSbPomRetCH${chiller}_data\` AS a5
              ON 
                DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(a5.\`time@timestamp\`), '%Y-%m-%d %H:%i')
        WHERE 
        DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`)+ INTERVAL 5 HOUR, '%Y-%m-%d') BETWEEN '${start}' AND '${finish}'
            group by s.data_index
            order by DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i:%s');`

        db.query(queryGet,(err, result) => {
          return response.status(200).send(result);
        });
      },

      // Chiller Data 8 Backend
      ChillerData8 : async (request, response) => {
        const {start, finish, chiller, komp} = request.query;
        const queryGet = `select
        DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`)+ INTERVAL 5 HOUR, '%Y-%m-%d %H:%i:%s') AS time,
        round(a1.data_format_0,2) AS "Suhu_sesudah_Pompa_Return",
        round(a2.data_format_0,2)  AS "Tekanan_Sebelum_Pompa_Return",
        round(a3.data_format_0,2)  AS "Tekanan_Sesudah_Pompa_Return",
        round(a4.data_format_0,2)  AS "Tegangan_RS",
        round(a5.data_format_0,2)  AS "Tegangan_ST"  
        FROM 
          parammachine_saka.\`CMT-Chiller_R-AlarmCH${chiller}_data\` AS s
        LEFT JOIN 
                parammachine_saka.\`CMT-Chiller_H-SuhSesPmRetCH${chiller}_data\` AS a1
              ON 
                DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(a1.\`time@timestamp\`), '%Y-%m-%d %H:%i')
        LEFT JOIN 
                parammachine_saka.\`CMT-Chiller_H-PreSebPomRtCH${chiller}_data\` AS a2
              ON 
                DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(a2.\`time@timestamp\`), '%Y-%m-%d %H:%i')
        LEFT JOIN 
                parammachine_saka.\`CMT-Chiller_H-PrSesPomRetCH${chiller}_data\` AS a3
              ON 
                DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(a3.\`time@timestamp\`), '%Y-%m-%d %H:%i')
        LEFT JOIN 
                parammachine_saka.\`CMT-Chiller_RP-TegR-SCH${chiller}_data\` AS a4
              ON 
                DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(a4.\`time@timestamp\`), '%Y-%m-%d %H:%i')
        LEFT JOIN 
                parammachine_saka.\`CMT-Chiller_RP-TegS-TCH${chiller}_data\` AS a5
              ON 
                DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(a5.\`time@timestamp\`), '%Y-%m-%d %H:%i')
        WHERE 
        DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`)+ INTERVAL 5 HOUR, '%Y-%m-%d') BETWEEN '${start}' AND '${finish}'
            group by s.data_index
            order by DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i:%s');`

        db.query(queryGet,(err, result) => {
          return response.status(200).send(result);
        });
      },

      // Chiller Data 9 Backend
      ChillerData9 : async (request, response) => {
        const {start, finish, chiller, komp} = request.query;
        const queryGet = `select
        DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`)+ INTERVAL 5 HOUR, '%Y-%m-%d %H:%i:%s') AS time,
        round(a1.data_format_0,2) AS "Tegangan_TR",
        round(a2.data_format_0,2)  AS "Ampere_RS",
        round(a3.data_format_0,2)  AS "Ampere_ST",
        round(a4.data_format_0,2)  AS "Ampere_TR",
        round(a5.data_format_0,2)  AS "Grounding_Ampere"  
        FROM 
          parammachine_saka.\`CMT-Chiller_R-AlarmCH${chiller}_data\` AS s
        LEFT JOIN 
                parammachine_saka.\`CMT-Chiller_RP-TegT-RCH${chiller}_data\` AS a1
              ON 
                DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(a1.\`time@timestamp\`), '%Y-%m-%d %H:%i')
        LEFT JOIN 
                parammachine_saka.\`CMT-Chiller_RP-AmpR-SCH${chiller}_data\` AS a2
              ON 
                DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(a2.\`time@timestamp\`), '%Y-%m-%d %H:%i')
        LEFT JOIN 
                parammachine_saka.\`CMT-Chiller_RP-AmpS-TCH${chiller}_data\` AS a3
              ON 
                DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(a3.\`time@timestamp\`), '%Y-%m-%d %H:%i')
        LEFT JOIN 
                parammachine_saka.\`CMT-Chiller_RP-AmpT-RCH${chiller}_data\` AS a4
              ON 
                DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(a4.\`time@timestamp\`), '%Y-%m-%d %H:%i')
        LEFT JOIN 
                parammachine_saka.\`CMT-Chiller_H-GroundAmperCH${chiller}_data\` AS a5
              ON 
                DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i') = DATE_FORMAT(FROM_UNIXTIME(a5.\`time@timestamp\`), '%Y-%m-%d %H:%i')
        WHERE 
        DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`)+ INTERVAL 5 HOUR, '%Y-%m-%d') BETWEEN '${start}' AND '${finish}'
            group by s.data_index
            order by DATE_FORMAT(FROM_UNIXTIME(s.\`time@timestamp\`), '%Y-%m-%d %H:%i:%s');`

        db.query(queryGet,(err, result) => {
          return response.status(200).send(result);
        });
      },

        // Building RND Suhu Backend
        BuildingRNDSuhu : async (request, response) => {
          const {area, start, finish} = request.query;
          const queryGet = `SELECT
          DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`)+ INTERVAL 4 HOUR, '%Y-%m-%d %H:%i') AS label,
          \`time@timestamp\`*1000  AS x,
          round(data_format_0,2) AS y
          FROM parammachine_saka.\`${area}\`
          WHERE
            DATE(FROM_UNIXTIME(\`time@timestamp\`)) BETWEEN '${start}' AND '${finish}'
          ORDER BY
          \`time@timestamp\``;
          
          db.query(queryGet,(err, result) => {
            return response.status(200).send(result);
          });
        },

        // Building RND Suhu Backend
        BuildingRNDDP : async (request, response) => {
          const {area, start, finish} = request.query;
          const queryGet = `SELECT
          DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`)+ INTERVAL 4 HOUR, '%Y-%m-%d %H:%i') AS label,
          \`time@timestamp\`*1000  AS x,
          round(data_format_2/10,2) AS y
          FROM parammachine_saka.\`${area}\`
          WHERE
          DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`)+ INTERVAL 4 HOUR, '%Y-%m-%d') BETWEEN '${start}' AND '${finish}'
          ORDER BY
          \`time@timestamp\``;
          
          db.query(queryGet,(err, result) => {
            return response.status(200).send(result);
          });
        },

        // Building RND Suhu Backend
        BuildingRNDRH : async (request, response) => {
          const {area, start, finish} = request.query;
          const queryGet = `SELECT
          DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`)+ INTERVAL 4 HOUR, '%Y-%m-%d %H:%i') AS label,
          \`time@timestamp\`*1000  AS x,
          round(data_format_1,2) AS y
          FROM parammachine_saka.\`${area}\`
          WHERE
          DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`)+ INTERVAL 4 HOUR, '%Y-%m-%d') BETWEEN '${start}' AND '${finish}'
          ORDER BY
          \`time@timestamp\``;
          
          db.query(queryGet,(err, result) => {
            return response.status(200).send(result);
          });
        },

        // Building RND Suhu Backend
        BuildingRNDAll : async (request, response) => {
          const {area, start, finish} = request.query;
          const queryGet = `SELECT
          DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`)+ INTERVAL 4 HOUR, '%Y-%m-%d %H:%i') AS tgl,
          round(data_format_0,2) AS temp,
          round(data_format_1,2) AS RH,
          round(data_format_2/10,2) AS DP
          FROM parammachine_saka.\`${area}\`
          WHERE
          DATE_FORMAT(FROM_UNIXTIME(\`time@timestamp\`)+ INTERVAL 4 HOUR, '%Y-%m-%d') BETWEEN '${start}' AND '${finish}'
          ORDER BY
          \`time@timestamp\``;
          
          db.query(queryGet,(err, result) => {
            return response.status(200).send(result);
          });
        },
};
