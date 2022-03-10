import { gql, useLazyQuery } from "@apollo/client";
import { Fragment, useEffect } from "react";
import { Col } from "react-bootstrap";
import { useMessageDispatch, useMessageState } from "../../context/messages";
import Message from "./Message";

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

const Messages = () => {
  const { users } = useMessageState();
  const dispatch = useMessageDispatch();

  const [getMessages, { loading: messagesLoading, data: messagesData }] =
    useLazyQuery(GET_MESSAGES);

  const selectedUser = users?.find((u) => u.selected === true);
  const messages = selectedUser?.messages;

  useEffect(() => {
    if (selectedUser && !selectedUser.messages) {
      getMessages({ variables: { from: selectedUser.username } });
    }
  }, [selectedUser]);

  useEffect(() => {
    if (messagesData) {
      dispatch({
        type: "SET_USERS_MESSAGES",
        payload: {
          username: selectedUser.username,
          messages: messagesData.getMessages,
        },
      });
    }
  }, [messagesData]);

  let selectedChatMarkup;
  if (!messages && !messagesLoading) {
    selectedChatMarkup = <p>select a frend!</p>;
  } else if (messagesLoading) {
    selectedChatMarkup = <p>Loading...!</p>;
  } else if (messages.length > 0) {
    selectedChatMarkup = messages.map((message) => (
      <Message message={message} />
    ));
  } else if (messages.length === 0) {
    selectedChatMarkup = <p>you are not connected! send your first message!</p>;
  }

  return (
    <Col lg={8} className="messages-box d-flex flex-column">
      {selectedChatMarkup}
    </Col>
  );
};

export default Messages;
