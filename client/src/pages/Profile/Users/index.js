import { message, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../../redux/loadersSlice";
import moment from "moment";
import { DeleteUser, GetAllUsers, SearchUser } from "../../../apicalls/users";
import Button from "../../../components/Button";
import IssuedBooks from "./IssuedBooks";

function Users({ role }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showIssuedBooks, setShowIssuedBooks] = useState(false);
  const [users, setUsers] = React.useState([]);
  const dispatch = useDispatch();
  const getUsers = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllUsers(role);
      dispatch(HideLoading());
      if (response.success) {
        setUsers(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const handleSearch = async () => {
    try {
      dispatch(ShowLoading());
      const response = await SearchUser(role, searchTerm);
      dispatch(HideLoading());
      if (response.success) {
        setUsers(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (createdAt) => moment(createdAt).format("DD-MM-YYYY hh:mm A"),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (actions, record) => (
        <div>
          <i
            class="ri-delete-bin-5-line"
            style={{ paddingRight: "20px" }}
            onClick={() => {
              DeleteUser(record._id);
              handleSearch();
            }}
          ></i>
          <Button
            title="Books"
            variant="outlined"
            onClick={() => {
              setSelectedUser(record);
              setShowIssuedBooks(true);
            }}
          />
        </div>
      ),
    },
  ];
  return (
    <div>
      <div className="flex ">
        <input
          style={{
            border: "solid 1px",
            borderRadius: "10px",
            borderTopRightRadius: "0px",
            borderBottomRightRadius: "0px",
            marginBottom: "30px",
            width: "100%",
            height: "40px",
            borderRight: "none",
          }}
          type="text"
          label="search"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          placeholder="search user by id, name, phoneNo."
        ></input>
        <button
          style={{
            background: "green",
            color: "white",
            cursor: "pointer",
            width: "100px",
            height: "41.5px",
            borderTopRightRadius: "10px",
            borderBottomRightRadius: "10px",
            borderLeft: "none",
            border: "1px",
          }}
          type="submit"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <Table dataSource={users} columns={columns} />

      {showIssuedBooks && (
        <IssuedBooks
          showIssuedBooks={showIssuedBooks}
          setShowIssuedBooks={setShowIssuedBooks}
          selectedUser={selectedUser}
        />
      )}
    </div>
  );
}

export default Users;
