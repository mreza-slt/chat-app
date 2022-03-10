import { gql, useQuery } from "@apollo/client";
import { Col, Image } from "react-bootstrap";
import { useMessageDispatch, useMessageState } from "../../context/messages";
import classNames from "classnames";

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

const Users = () => {
  const dispatch = useMessageDispatch();

  const { users } = useMessageState();
  const selectedUser = users?.find((u) => u.selected === true)?.username;

  const { loading } = useQuery(GET_USERS, {
    onCompleted: (data) =>
      dispatch({ type: "SET_USERS", payload: data.getUsers }),
    onError: (err) => console.log(err),
  });

  let usersMarkup;

  if (!users || loading) {
    usersMarkup = <p>loading...</p>;
  } else if (users.length === 0) {
    usersMarkup = <p>no users have joned</p>;
  } else if (users.length > 0) {
    usersMarkup = users.map((user) => {
      const selected = selectedUser === user.username;
      return (
        <div
          role="button"
          className={classNames("user-div d-flex p-3", {
            "bg-white": selected,
          })}
          key={user.username}
          onClick={() =>
            dispatch({ type: "SET_SELECTED_USER", payload: user.username })
          }
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
      );
    });
  }

  return (
    <Col lg={4} className="bg-secondary px-0">
      {usersMarkup}
    </Col>
  );
};

export default Users;
