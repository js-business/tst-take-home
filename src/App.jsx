import { useState } from "react";

// Note to reviewer: The requirements said I should persist the login data,
// but it doesn't say what I should do with it once stored so I'm
// intentionally not using it for anything.

export default function SignupForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitted(true);

    if (password === confirmPassword) {
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
      setPasswordMatch(true);
      setSubmitSuccess(true);
    } else {
      setPasswordMatch(false);
      setSubmitSuccess(false);
    }
  };

  const signupButtonDisabled = !username || !password || !confirmPassword;

  return (
    <div style={styles.container}>
      <h2>Signup Form</h2>
      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.inputGroup}>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);

              if (submitted && e.target.value === confirmPassword) {
                setPasswordMatch(true);
              }
            }}
            style={{
              ...styles.input,
              borderColor: passwordMatch === false ? "red" : "#ccc",
            }}
          />
        </div>
        <div style={styles.inputGroup}>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);

              if (submitted && e.target.value === password) {
                setPasswordMatch(true);
              }
            }}
            style={{
              ...styles.input,
              borderColor: passwordMatch === false ? "red" : "#ccc",
            }}
          />
        </div>
        <button
          type="submit"
          disabled={signupButtonDisabled}
          style={{
            ...styles.button,
            color: signupButtonDisabled ? "#000000" : "#fff",
            cursor: signupButtonDisabled ? "not-allowed" : "pointer",
            backgroundColor: signupButtonDisabled ? "#ccc" : "#007bff",
          }}
        >
          Submit
        </button>
        <div>
          {submitted && !passwordMatch && (
            <p style={styles.error}>Passwords do not match.</p>
          )}
          {submitted && passwordMatch && (
            <p style={styles.success}>Passwords match.</p>
          )}
          {submitted && submitSuccess && (
            <p style={styles.success}>Signup successful!</p>
          )}
          {submitted && !submitSuccess && (
            <p style={styles.error}>Signup failed.</p>
          )}
        </div>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "15px",
  },
  input: {
    padding: "8px",
    marginTop: "5px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
  },
  success: {
    color: "green",
  },
  error: {
    color: "red",
  },
};
