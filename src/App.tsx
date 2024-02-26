import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

interface Student {
  name: string;
  nub_id: string;
  email: string;
  phone_number: string;
}

interface GetStudent {
  created_at: Date;
  created_by: any;
  deleted_at: any;
  deleted_by: any;
  email: string;
  id: string;
  name: string;
  nub_id: string;
  phone_number: string;
  photo: any;
  status: number;
  updated_at: Date;
  updated_by: any;
}

function App() {
  const [viewModal, setviewModal] = useState(false);
  const [edit, setedit] = useState("");
  const [viewModalData, setviewModalData] = useState<GetStudent>();
  const [student, setStudent] = useState<Student>({
    name: "",
    nub_id: "",
    email: "",
    phone_number: "",
  });

  const [getStudentData, setgetStudentData] = useState<GetStudent[]>([]);

  const handleChange = (e: any) => {
    setStudent((prevStudent) => ({
      ...prevStudent,
      [e.target.name]: e.target.value,
    }));
  };
  // get user data
  const fetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8008/student");
      console.log("Initial data from server:", response.data);
      setgetStudentData(response.data);
    } catch (error) {
      console.error("Error fetching initial data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  // student create function
  const handleClick = async (e: any) => {
    try {
      if (
        !student.name ||
        !student.nub_id ||
        !student.email ||
        !student.phone_number
      ) {
        alert("null value not allow");
      } else {
        if (!edit) {
          const response = await axios.post(
            "http://127.0.0.1:8008/student",
            student
          );
          if (response.data?.status == 1) {
            alert("student added");
            fetchData();
            setStudent({ name: "", nub_id: "", email: "", phone_number: "" });
          }
        } else {
          const response = await axios.put(
            `http://127.0.0.1:8008/student/${edit}`,
            student
          );
          if (response.data.affected == 1) {
            alert("student updated");
            fetchData();
            setStudent({ name: "", nub_id: "", email: "", phone_number: "" });
          }
        }
      }
    } catch (error) {
      console.error("Error making POST request:", error);
    }
  };

  // student edit function
  const handleEdit = (data: any) => {
    setedit(data.id);
    setStudent({
      name: data.name,
      nub_id: data.nub_id,
      email: data.email,
      phone_number: data.phone_number,
    });
  };

  //student view details function
  const handleViewClick = (data: any) => {
    setviewModalData(data);
    setviewModal(true);
  };
  const handleViewCloseBtn = () => {
    setviewModal(false);
  };

  // student delete function
  const handleDelete = async (id: string) => {
    try {
      if (!id) alert("null id");
      const condition = confirm("are you sure ?");
      if (condition) {
        const response = await axios.delete(
          `http://127.0.0.1:8008/student/${id}`
        );
        if (response.data.affected == 1) {
          alert("student deleted");
          fetchData();
        }
      }
    } catch (error) {
      console.error("Error making DELETE request:", error);
    }
  };

  return (
    <>
      <div
        className=""
        style={{
          //backgroundImage: `url(bg.jpg)`,
          //backgroundSize: "cover",
          //backgroundPosition: "center",
          //background:'#5215',
          width: "98vw",
          height: "98vh",
        }}
      >
        <div
          style={{
            background: "#85469321",
            padding: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "0 100px",
          }}
        >
          <div
            className="container"
            style={{ height: "50vh", width: "50vw", background: "#4511" }}
          >
            <div className="row">
              <div>
                <img
                  id="imgs"
                  src="bg.jpg"
                  alt="images"
                  height={105}
                  width={110}
                  style={{
                    borderRadius: "50%",
                  }}
                />
              </div>
              <div>
                <label
                  htmlFor="file"
                  className="file"
                  style={{
                    padding: "7px 20px",
                    background: "#5236",
                    marginTop: "10px",
                    borderRadius: "5px",
                    textAlign: "center",
                    color: "#fff",
                    fontWeight: "600",
                  }}
                >
                  Upload Images
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  required
                  name="name"
                  value={student.name}
                  onChange={handleChange}
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="nub_id"
                  required
                  name="nub_id"
                  value={student.nub_id}
                  onChange={handleChange}
                />
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="email"
                  required
                  name="email"
                  value={student.email}
                  onChange={handleChange}
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Phone number"
                  required={true}
                  name="phone_number"
                  value={student.phone_number}
                  onChange={handleChange}
                />
              </div>
            </div>
            <br />
            <div className="row">
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={handleClick}
              >
                {edit ? "Edit" : "Save"}
              </button>
            </div>
          </div>
        </div>

        <br />
        <div
          style={{
            background: "#85469321",
            padding: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "0 100px",
          }}
        >
          <div style={{ width: "1000px" }}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>SL</th>
                  <th> Name</th>
                  <th>NUB ID</th>
                  <th>email</th>
                  <th>phone number</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {getStudentData &&
                  getStudentData.map((data, index) => {
                    return (
                      <tr key={data.id}>
                        <td>{index + 1}</td>
                        <td>{data.name}</td>
                        <td>{data.nub_id}</td>
                        <td>{data.email}</td>
                        <td>{data.phone_number}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => handleViewClick(data)}
                          >
                            view<i className="bi bi-pen"></i>
                          </button>
                          <button
                            type="button"
                            className="btn btn-info"
                            style={{ margin: "0 5px" }}
                            onClick={() => handleEdit(data)}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger"
                            id="delete"
                            onClick={() => handleDelete(data.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </div>
        </div>
        {viewModal ? (
          <div
            className=""
            style={{
              width: "100vw",
              height: "100vh",
              background: "#60606152",
              position: "fixed",
              zIndex: "100",
              display: "flex",
              alignItems: "center",
              top: 0,
              left: 0,
            }}
          >
            <div
              style={{
                height: "70vh",
                width: "70vw",
                background: "#fff",
                margin: "0 auto",
                alignItems: "center",
                borderRadius: "10px",
                boxShadow: "0 0 50px #0025",
                opacity: 1,
                padding: "30px 50px",
                display: "block",
              }}
            >
              <button
                type="button"
                className="btn btn-danger btn-sm"
                style={{ float: "right" }}
                onClick={() => handleViewCloseBtn()}
              >
                Close
              </button>
              <div>
                <img
                  id="imgs"
                  src="bg.jpg"
                  alt="images"
                  height={105}
                  width={110}
                  style={{
                    borderRadius: "50%",
                  }}
                />
              </div>
              <div style={{ height: "100%", width: "100%" }}>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-around",

                    fontSize: "20px",
                  }}
                >
                  <span>Name:</span>
                  <span>{viewModalData && viewModalData.name}</span>
                </div>
                <br />
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-around",
                  }}
                >
                  <span>NUB ID:</span>
                  <span>{viewModalData && viewModalData.nub_id}</span>
                </div>
                <br />
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-around",
                  }}
                >
                  <span>Email:</span>
                  <span>{viewModalData && viewModalData.email}</span>
                </div>
                <br />
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-around",
                  }}
                >
                  <span>Phone Number:</span>
                  <span>{viewModalData && viewModalData.phone_number}</span>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default App;
