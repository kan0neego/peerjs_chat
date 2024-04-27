export default function Preview({ textSize, srcAvatar, name }: Props) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          flex: "1 1 90%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          overflow: "hidden",
          padding: "10px",
        }}
      >
        <div
          style={{
            borderRadius: "50%",
            color: "black",
            backgroundColor: "white",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {srcAvatar ? (
            <img
              style={{ width: "100%", height: "100%" }}
              width={256}
              height={256}
              src="https://api.test.fiveplas.ru/storage/932535f4-7c3c-4eec-825d-168939804d58"
              alt="Avatar of user"
            />
          ) : (
            <svg
              style={{ width: "100%", height: "100%" }}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="256"
              height="256"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
      </div>
      <div
        style={{
          width: "100%",
          height: "100%",
          flex: "1 1 10%",
          boxSizing: "border-box",
          padding: "8px 5px",
          textAlign: "center",
        }}
      >
        <span style={{ fontSize: textSize && "1rem", fontWeight: "bold", color: "white" }}>
          {name}
        </span>
      </div>
    </div>
  );
}

type Props = {
  textSize?: number | string;
  srcAvatar: string;
  name: string;
};
