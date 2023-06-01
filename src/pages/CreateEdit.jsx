import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useState } from "react";
import { Select, Input } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import moment from "moment/moment";
import { getDataById } from "../features/part/partSlice";
import { editePartListData } from "../features/part/partSlice";

function CreateEdit() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const partId = useSelector((state) => state.part.partId);
  const tanggal = moment(partId.Tanggal).format("MM/MM/YYYY");

  useEffect(() => {
    dispatch(getDataById(id, tanggal));
  }, []);

  useEffect(() => {
    setNewLine(partId.Line);
    setNewMachine(partId.Mesin);
    setNewJob(partId.Pekerjaan);
    setNewJobDetail(partId.Detail);
    setNewDate(tanggal);
    setNewQuantity(partId.Quantity);
    setNewUnit(partId.Unit);
    setNewPIC(partId.Pic);
    setNewStartTime(partId.Tawal);
    setNewFinishTime(partId.Tahir);
  }, [partId]);

  const [dataList, setDataList] = useState({});
  const [newLine, setNewLine] = useState("");
  const [newMachine, setNewMachine] = useState("");
  const [newJob, setNewJob] = useState("");
  const [newJobDetail, setNewJobDetail] = useState("");
  const [newDate, setNewDate] = useState();
  const [newQuantity, setNewQuantity] = useState();
  const [newUnit, setNewUnit] = useState("");
  const [newPIC, setNewPIC] = useState("");
  const [newStartTime, setNewStartTime] = useState();
  const [newFinishTime, setNewFinishTime] = useState();

  if (newStartTime && newFinishTime) {
    var hm = newStartTime;
    var a = hm.split(":");
    var minutes = +a[0] * 60 + +a[1];

    var hm2 = newFinishTime;
    var a2 = hm2.split(":");
    var minutes2 = +a2[0] * 60 + +a2[1];
    var totalMinuites = minutes2 - minutes;
  } else {
    var totalMinuites = 0;
  }

  const editData = () => {
    let tempData = {
      Mesin: newMachine,
      Line: newLine,
      Pekerjaan: newJob,
      Detail: newJobDetail,
      Tanggal: newDate,
      Quantity: newQuantity,
      Unit: newUnit,
      Pic: newPIC,
      Tawal: newStartTime,
      Tahir: newFinishTime,
      Total: totalMinuites,
    };
    setDataList((dataList, { ...tempData }));
    dispatch(editePartListData(tempData, id));
    alert("Data berhasil edit");
    navigate("/Maintenance");
  };

  const lineHendeler = (event) => {
    setNewLine(event.target.value);
  };
  const machineHendeler = (event) => {
    setNewMachine(event.target.value);
  };
  const jobHendeler = (event) => {
    setNewJob(event.target.value);
  };
  const jobDetailHendeler = (event) => {
    setNewJobDetail(event.target.value);
  };
  const dateHendeler = (event) => {
    setNewDate(event.target.value);
  };
  const quantityHendeler = (event) => {
    setNewQuantity(event.target.value);
  };
  const unitHendeler = (event) => {
    setNewUnit(event.target.value);
  };
  const PICHendeler = (event) => {
    setNewPIC(event.target.value);
  };
  const startTimeHendeler = (even) => {
    setNewStartTime(even.target.value);
  };
  const finishTimeHendeler = (even) => {
    setNewFinishTime(even.target.value);
  };
  return (
    <div>
      <div className="ml-60 mr-60">
        <div className="space-y-20 ">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900 mt-10">
              EDITE DATA MAINTENANCE {id}
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Line Area
                </label>
                <div className="mt-2">
                  <Select
                    placeholder="Select Line"
                    id="line"
                    onChange={lineHendeler}
                    value={newLine}
                  >
                    <option value="Line1">Line 1</option>
                    <option value="Line2">Line 2</option>
                    <option value="Line3">Line 3</option>
                    <option value="Line4">Line 4</option>
                  </Select>
                </div>
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Machine
                </label>
                <div className="mt-2">
                  <Select
                    placeholder="Select Machine"
                    onChange={machineHendeler}
                    value={newMachine}
                  >
                    <option value="PMA">PMA</option>
                    <option value="FBD">FBD</option>
                    <option value="EPH">EPH</option>
                    <option value="FinalMixing">Final MIxing</option>
                    <option value="Fette">Fette</option>
                    <option value="Coating">Coating</option>
                    <option value="Striping">Striping</option>
                    <option value="CM1">CM1</option>
                    <option value="Cm2">CM2</option>
                    <option value="CM3">CM3</option>
                    <option value="CM4">CM4</option>
                    <option value="CM5">CM5</option>
                    <option value="CC1">CC1</option>
                    <option value="CC2">CC2</option>
                  </Select>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="Pekerjaan"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Pekerjaan
                </label>
                <div className="mt-2">
                  <input
                    onChange={jobHendeler}
                    id="Pekerjaan"
                    name="Pekerjaan"
                    type="Pekerjaan"
                    value={newJob}
                    autoComplete="Pekerjaan"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Detail Pekerjaan
                </label>
                <div className="mt-2">
                  <textarea
                    onChange={jobDetailHendeler}
                    value={newJobDetail}
                    id="Detail"
                    name="Detail"
                    autoComplete="Detail"
                    rows={3}
                    className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Tanggal ({tanggal})
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  <Input
                    defaultValue={newDate}
                    value={newDate}
                    onChange={dateHendeler}
                    placeholder={newDate}
                    size="md"
                    type="date"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="Pekerjaan"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Sparepart Name
                </label>
                <div className="mt-2">
                  <input
                    id="Pekerjaan"
                    name="Pekerjaan"
                    type="Pekerjaan"
                    autoComplete="Pekerjaan"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="Pekerjaan"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Quantity
                </label>
                <div className="mt-2">
                  <Input
                    onChange={quantityHendeler}
                    value={newQuantity}
                    size="md"
                    type="number"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Unit
                </label>
                <div className="mt-2">
                  <Select
                    onChange={unitHendeler}
                    placeholder="Select Unit"
                    value={newUnit}
                  >
                    <option value="Pcs">Pcs</option>
                    <option value="Rol">Rol</option>
                    <option value="Meter">Meter</option>
                    <option value="Cm">Cm</option>
                    <option value="Box">Box</option>
                    <option value="Lot">Lot</option>
                    <option value="Pack">Pack</option>
                  </Select>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  PIC
                </label>
                <div className="mt-2">
                  <Select
                    onChange={PICHendeler}
                    placeholder="Select PIC"
                    value={newPIC}
                  >
                    <option value="SGO">Sugino</option>
                    <option value="MKF">Khaerul</option>
                    <option value="RAO">Renaldo</option>
                    <option value="CKA">Chandra</option>
                    <option value="RDP">Ricy</option>
                    <option value="ARF">Arief</option>
                  </Select>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Awal Pengerjaan
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  <Input
                    value={newStartTime}
                    onChange={startTimeHendeler}
                    placeholder="Select Date and Time"
                    size="md"
                    type="time"
                  />
                </div>
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Akhir Pengerjaan
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  <Input
                    value={newFinishTime}
                    onChange={finishTimeHendeler}
                    placeholder="Select Date and Time"
                    size="md"
                    type="time"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
            onClick={() => navigate("/Maintenance")}
          >
            Cancel
          </button>
          <button
            onClick={() => editData()}
            className="rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateEdit;
