import settingsIcon from "../assets/settings.svg";

const handleSettings = () => {
  alert("Settings");
};

const Settings = () => {
  return (
    <div style={styles.buttonSettingsContainer}>
      <img
        src={settingsIcon}
        alt="Settings"
        style={styles.floatingSettingsButton}
        onClick={handleSettings}
      />
    </div>
  );
};

export default Settings;

// Styles
const styles = {
  buttonSettingsContainer: {
    position: "fixed" as const, // Sticks the button to a fixed place
    top: "20px",
    right: "20px",
  },
  floatingSettingsButton: {
    padding: "15px",
    width: "40px",
    height: "40px",
    cursor: "pointer" as const,
  },
};
