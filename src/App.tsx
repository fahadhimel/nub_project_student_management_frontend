import { useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

interface Student {
  name: string;
}

function App() {
  const [student, setStudent] = useState<Student>({
    name: "",
  });

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStudent({
      ...student,
      name: event.target.value,
    });
  };
  return (
    <>
      <div
        className=""
        style={{
          backgroundImage: `url(bg.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100vw",
          height: "100vh",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#52463885",
            padding: "100px 200px",
            width: "1000px",
          }}
        >
          <div style={{ background: "red", width: "600px", height: "" }}>
            <Form>
              <Row>
                <Col>
                  <input
                    id="name"
                    placeholder="name"
                    value={student.name}
                    onChange={handleNameChange}
                  />
                </Col>
                <Col>
                  <Form.Control placeholder="Last name" />
                </Col>
              </Row>
            </Form>
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
          <div style={{ background: "red", width: "1000px" }}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Username</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
