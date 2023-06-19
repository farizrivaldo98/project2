import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  Select,
} from "@chakra-ui/react";



function Admin() {
  const [userData, setUserData] = useState([]);
  const [levelSelect, setLevelSelect] = useState();

  const fetchUser = async () => {
    let response = await axios.get("http://10.126.15.124:8002/part/alluser");
    setUserData(response.data);
  };

  const updateUser = async (id, data) => {
    let dataUser = { level: data };
    let response = await axios.patch(
      `http://10.126.15.124:8002/part/userupdate/${id}`,
      dataUser
    );
    if (response) {
      alert(response.data.message);
    }
    fetchUser();
  };

  const deleteUser = async (id) => {
    let response = await axios.delete(
      `http://10.126.15.124:8002/part/userdelete/${id}`
    );
    if (response) {
      alert(response.data.message);
    }
    fetchUser();
  };

  const editUser = async (id) => {
    let response = await axios.patch(
      `http://10.126.15.124:8002/part/useredit/${id}`
    );

    fetchUser();
  };

  const selectHendeler = (e) => {
    setLevelSelect(e.target.value);
  };
  const editHendeler = (id) => {
    editUser(id);
  };

  const updateHendeler = (id) => {
    updateUser(id, levelSelect);
    // console.log(`No id : ${id}, value: ${levelSelect}`);
  };
  const deleteHendeler = (id) => {
    deleteUser(id);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const renderUserList = () => {
    return userData.map((users) => {
      return (
        <Tr>
          <Td>{users.id_users}</Td>
          <Td>{users.username}</Td>
          <Td>{users.name}</Td>
          <Td>{users.email}</Td>
          <Td>{users.password}</Td>
          <Td>
            {users.level === null ? (
              <Select placeholder="Select level" onChange={selectHendeler}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </Select>
            ) : (
              users.level
            )}
          </Td>
          <Td>{users.isAdmin}</Td>
          <Td>
            {users.level === null ? (
              <Button
                colorScheme="blue"
                onClick={() => {
                  updateHendeler(users.id_users);
                }}
              >
                Update
              </Button>
            ) : (
              <Button
                colorScheme="green"
                onClick={() => {
                  editHendeler(users.id_users);
                }}
              >
                Edit
              </Button>
            )}
            <Button
              colorScheme="red"
              onClick={() => deleteHendeler(users.id_users)}
            >
              Delet
            </Button>
          </Td>
        </Tr>
      );
    });
  };

  return (
    <>
      <h1 className="text-center text-3xl font-bold mt-8">Users Tabel</h1>
      <div className="pb-12 border-solid border-4 mt-4 m-28 ">
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>id</Th>
                <Th>Initial Name</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Password (* hashing by Bcrypt)</Th>
                <Th>level</Th>
                <Th>Super Admin</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>{renderUserList()}</Tbody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export default Admin;
