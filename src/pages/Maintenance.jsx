import React, { useEffect } from "react";
import moment from "moment/moment";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  ButtonGroup,
  Stack,
  Input,
  Select,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import App from "./PareetoLine";
import Pareto from "./ParetoData";
import { useSelector, useDispatch } from "react-redux";
import { fetchPart } from "../features/part/partSlice";
import { deletePartListData } from "../features/part/partSlice";

function Maintenance() {
  const dispatch = useDispatch();

  const partValue = useSelector((state) => state.part.partValue);

  useEffect(() => {
    dispatch(fetchPart());
  }, []);

  const navigate = useNavigate();

  const deleteData = (id) => {
    dispatch(deletePartListData(id));
  };

  const renderPartList = () => {
    return partValue.map((partdata) => {
      return (
        <Tr>
          <Td>{partdata.Mesin}</Td>
          <Td>{partdata.Line}</Td>
          <Td>{partdata.Pekerjaan}</Td>
          <Td>{moment(partdata.Tanggal).format("dddd,D MM YYYY")}</Td>
          <Td>{partdata.Quantity}</Td>
          <Td>{partdata.Unit}</Td>
          <Td>{partdata.Pic}</Td>
          <Td>{partdata.Tawal}</Td>
          <Td>{partdata.Tahir}</Td>
          <Td>{partdata.Total}</Td>
          <Td>
            <Button
              colorScheme="green"
              onClick={() => {
                navigate(`/createedite/${partdata.id}`);
              }}
            >
              Edit
            </Button>
            <Button colorScheme="red" onClick={() => deleteData(partdata.id)}>
              Delet
            </Button>
          </Td>
        </Tr>
      );
    });
  };

  return (
    <div>
      <div>
        <h1 class="text-center text-4xl antialiased hover:subpixel-antialiased; p-8">
          PARETO MACHINE BREAKDOWN
        </h1>
        <App />
        <Pareto />
      </div>

      <Stack
        className="flex flex-row justify-center   "
        direction="row"
        spacing={4}
        align="center"
      >
        <div>
          <h2>MACHINE</h2>
          <Select placeholder="Select Line">
            <option value="all">All</option>
            <option value="line1">Line 1</option>
            <option value="line2">Line 2</option>
            <option value="line3">Line 3</option>
            <option value="line4">Line 4</option>
          </Select>
        </div>
        <div>
          <h2>START TIME</h2>
          <Input placeholder="Select Date and Time" size="md" type="date" />
        </div>
        <div>
          <h2>FINISH TIME</h2>
          <Input placeholder="Select Date and Time" size="md" type="date" />
        </div>
        <div>
          <br />
          <Button colorScheme="gray">Submit</Button>
        </div>
        <div>
          <br />
          <Button
            className="w-40"
            colorScheme="blue"
            onClick={() => {
              navigate(`/createnew`);
            }}
          >
            Create New
          </Button>
        </div>
      </Stack>
      <br />
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              <Th>Mesin</Th>
              <Th>Line</Th>
              <Th>Pekerjaan</Th>
              <Th>Tanggal</Th>
              <Th>Quantity</Th>
              <Th>Unit</Th>
              <Th>Pic</Th>
              <Th>Awal Pengerjaan</Th>
              <Th>Ahir Pengerjaan</Th>
              <Th>Total</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>{renderPartList()}</Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Maintenance;
