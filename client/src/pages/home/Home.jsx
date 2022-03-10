import { useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuthDispatch, useAuthState } from "../../context/auth";
import Users from "./Users";
import Messages from "./Messages";

const Home = () => {
  const dispatch = useAuthDispatch();
  const history = useNavigate();

  const { user } = useAuthState();

  useEffect(() => {
    if (!user) {
      history("/login");
    }
  }, [user]);

  const logOutHandler = () => {
    dispatch({ type: "LOGOUT" });
    window.location.href = "/login";
  };

  return (
    <>
      <Col className="bg-white d-flex justify-content-around mb-1">
        <Link to="/login">
          <Button className="text-decoration-none" variant="link">
            Login
          </Button>
        </Link>
        <Link to="/register">
          <Button className="text-decoration-none" variant="link">
            Register
          </Button>
        </Link>
        <Button
          className="text-decoration-none"
          onClick={logOutHandler}
          variant="link"
        >
          LogOut
        </Button>
      </Col>
      <Col className="bg-white">
        <Row className="gx-0">
          <Users />
          <Messages />
        </Row>
      </Col>
    </>
  );
};

export default Home;
