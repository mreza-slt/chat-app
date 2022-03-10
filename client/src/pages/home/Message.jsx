import { useAuthState } from "../../context/auth";
import classNames from "classnames";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import moment from "moment";
import { Fragment } from "react";

const Message = ({ message }) => {
  const { user } = useAuthState();

  const send = message.from === user.username;
  const received = !send;

  return (
    <OverlayTrigger
      key={message.uuid}
      placement={send ? "left" : "right"}
      overlay={
        <Tooltip>
          {moment(message.createdAt).format("MMM DD,YYYY @ h:mm a")}
        </Tooltip>
      }
    >
      <div
        className={classNames("d-flex my-3 mx-2", {
          "ms-auto": send,
          "me-auto": received,
        })}
      >
        <div
          className={classNames("py-2 px-3 rounded-pill", {
            "bg-primary": send,
            "bg-secondary": received,
          })}
        >
          <p
            className={classNames({
              "text-white": send,
            })}
          >
            {message.content}
          </p>
        </div>
      </div>
    </OverlayTrigger>
  );
};

export default Message;
