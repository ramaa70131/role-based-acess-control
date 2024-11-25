import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import { setCookie } from "../utils/common";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useUser();
  //state to manage password visibility
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState(false);

  const [isLoading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);

  // const Users = [
  //   {
  //     _id: "66ad0dcf9096ea44d465bdd1",
  //     firstname: "Web ",
  //     lastname: "Crafters",
  //     email: "webcrafters@gmail.com",
  //     role: "admin",
  //     mobile: "9876543210",
  //     token:
  //       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YWQwZGNmOTA5NmVhNDRkNDY1YmRkMSIsImlhdCI6MTcyMjc2NzA5MiwiZXhwIjoxNzIyODUzNDkyfQ.mMQy9N4Npg0TnkDhZPCNNSAUJnFFIg6z0pfrj4zVaxM",
  //   },
  //   {
  //     _id: "66ad0e199096ea44d465bdd7",
  //     firstname: "Lucky",
  //     lastname: "Rawat",
  //     email: "lucky@gmail.com",
  //     role: "user",
  //     mobile: "9876543211",
  //     token:
  //       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YWQwZTE5OTA5NmVhNDRkNDY1YmRkNyIsImlhdCI6MTcyMjc2NzExNywiZXhwIjoxNzIyODUzNTE3fQ.N63zOmC58ZUTqHQP1v_vt-n56vdU2VE8lrBkMiJL0tQ",
  //   },
  // ];

  useEffect(() => {
    if (userInfo) navigate("/dashboard");
  }, [userInfo]);

  //State to hold form data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  //Fuction to handle change in form fields
  const handleChange = (event) => {
    const { name, value } = event.target;
    // update formdata state with new values
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //fuction to handle form submission
  const handleSubmit = (event) => {
    setError(false);
    setLoading(true);
    const form = event.currentTarget;
    event.preventDefault();
    //check if the form is valid
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setLoading(false)
    } else {
      //here handle form submission (send data to a server)
      //with API 
      axios
        .post("http://localhost:5000/api/user/login", formData)
        .then((res) => {
          setLoading(false);
          if (res.status === 200) {
            setCookie("_USER_AUTH_", JSON.stringify(res.data));
            setUserInfo(res.data);
            navigate("/dashboard");
          }
        });
  
        //witbout Api 
      // setTimeout(() => {
        
      //   let checkUser = Users.filter(
      //     (user) => user.email === formData.email.trim()
      //   );
      //   if (checkUser.length) {
      //     setCookie("_USER_AUTH_", JSON.stringify(checkUser[0]));
      //     setUserInfo(checkUser[0]);
      //     navigate("/dashboard");
      //   } else {
      //     setError(true);
      //     setLoading(false)
      //   }
      // }, 2000);
    }
    //update validation state
 
    setValidated(true);
  };

  return (
    <div className="login-section align-content-center">
      <Container>
        <Row className="justify-content-center">
          <Col xl={4} lg={5} md={7} xs={12}>
            <div className="login-box rounded p-4 shadow-sm bg-light">
              <h3 className="mb-4"> Sign In </h3>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    name="email"
                    placeholder="Enter email"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid email.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                  className="mb-3 position-relative"
                  controlId="formBasicPassword"
                >
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    name="password"
                    placeholder="Password"
                    required
                  />

                  <Form.Control.Feedback type="invalid">
                    Please provide a valid password.
                  </Form.Control.Feedback>
                  <span
                    className="position-absolute top-50 end-0 me-2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "hide" : "show"}
                  </span>
                </Form.Group>
                {error ? <p className="text-danger">User email or password is incorrect</p> : ""}


                <Button variant="primary" type="submit" disabled={isLoading}>
                  {isLoading ? "loading..." : "Submit"}
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
