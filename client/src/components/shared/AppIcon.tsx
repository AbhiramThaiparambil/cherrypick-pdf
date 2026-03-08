const ICON_PATH = "/appIcon.svg";

const AppIcon = ({ size = 40 }) => {
  return (
    <>
      <img
        src={ICON_PATH}
        alt="App Logo"
        style={{
          width: size,
          height: size,
          objectFit: "cover",
          display: "block",
        }}
      />
    </>
  );
};

export default AppIcon;
