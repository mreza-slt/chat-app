import { useEffect, useState } from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuthDispatch, useAuthState } from "../context/auth";
import { gql, useQuery, useLazyQuery } from "@apollo/client";

const GET_USERS = gql`
  query getUsers {
    getUsers {
      username
      email
      createdAt
      imageUrl
      latestMessage {
        uuid
        createdAt
        content
        from
        to
      }
    }
  }
`;

const GET_MESSAGES = gql`
  query getMessages($from: String!) {
    getMessages(from: $from) {
      uuid
      from
      to
      content
      createdAt
    }
  }
`;

const Home = () => {
  const [selectedUser, setSelectedUser] = useState();

  const { error, data, loading } = useQuery(GET_USERS);

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
    history("/login");
  };

  const [getMessages, { loading: messagesLoading, data: messagesData }] =
    useLazyQuery(GET_MESSAGES);

  useEffect(() => {
    if (selectedUser) {
      getMessages({ variables: { from: selectedUser } });
    }
  }, [selectedUser]);

  if (messagesData) console.log(messagesData.getMessages);
  let usersMarkup;

  if (!data || loading) {
    usersMarkup = <p>loading...</p>;
  } else if (data.getUsers.length === 0) {
    usersMarkup = <p>no users have joned</p>;
  } else if (data.getUsers.length > 0) {
    usersMarkup = data.getUsers.map((user) => (
      <div
        className="d-flex p-3"
        key={user.username}
        onClick={() => setSelectedUser(user.username)}
      >
        <Image
          className=""
          src={user.imageUrl}
          roundedCircle
          style={{ width: 50, height: 50, objectFit: "cover" }}
        />
        <div className="ms-4">
          <p className="text-success">{user.username}</p>
          <p className="font-weight-light">
            {user.latestMessage
              ? user.latestMessage.content
              : "you are now connected!"}
          </p>
        </div>
      </div>
    ));
  }

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
          <Col lg={4} className="bg-secondary px-0">
            {usersMarkup}
          </Col>
          <Col lg={8}>
            {messagesData && messagesData.getMessages.length > 0 ? (
              messagesData.getMessages.map((message) => (
                <p key={message.uuid}>{message.content}</p>
              ))
            ) : (
              <p>Messages</p>
            )}
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Home;
