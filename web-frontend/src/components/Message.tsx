type MyProps = {
    message: string;
};

const Message = ({ message }: MyProps) => {
    if (message === "") {
        return null;
    }

    return (
        <div>
            <span className="message">{message}</span>
        </div>
    );
};

export default Message;
