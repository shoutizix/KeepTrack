import addIcon from "../assets/add.svg";

interface AddButtonProps {
  onClick: () => void;
}

const AddButton: React.FC<AddButtonProps> = ({ onClick }) => {
  return (
    <div style={styles.buttonAddContainer}>
      <img
        src={addIcon}
        alt="Add book"
        style={styles.floatingAddButton}
        onClick={onClick}
      />
    </div>
  );
};

export default AddButton;

// Styles
const styles = {
  buttonAddContainer: {
    position: "fixed" as const, // Sticks the button to a fixed place
    bottom: "20px",
    right: "20px",
  },
  floatingAddButton: {
    padding: "15px",
    width: "80px",
    height: "80px",
    cursor: "pointer" as const,
  },
};
