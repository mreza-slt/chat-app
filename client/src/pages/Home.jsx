import { Button, Col, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuthDispatch } from "../context/auth";

const Home = () => {
  const dispatch = useAuthDispatch();
  const history = useNavigate();

  const logOutHandler = () => {
    dispatch({ type: "LOGOUT" });
    history("/login");
  };

  return (
    <Col className="bg-white d-flex justify-content-around">
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
  );
};

export default Home;
