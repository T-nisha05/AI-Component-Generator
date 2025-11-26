import React from "react";
import "./AuthPage.css";

const AuthPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    if (!email) {
      alert("Please enter your email or username.");
      return;
    }
    if (!password) {
      alert("Please enter your password.");
      return;
    }

    alert(`Logged in with Email: ${email}`);
  };

  return (
    <main>
      <section className="login-card" aria-labelledby="login-heading">
        <h1 id="login-heading">Get started with GenUI.</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email or Username</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="enter your email or username"
              required
            />
            <i className="fas fa-user icon" aria-hidden="true"></i>
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="enter your password"
              required
            />
            <i className="fas fa-lock icon" aria-hidden="true"></i>
          </div>

          <div className="options-group">
            <div className="checkbox-group">
              <input type="checkbox" id="remember-me" name="remember-me" />
              <label htmlFor="remember-me">Remember Me</label>
            </div>
            <div className="forgot-password">
              <a href="#">Forgot Password?</a>
            </div>
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        <p className="signup-link">
          Don't have an account? <a href="#">Sign Up</a>
        </p>
      </section>
    </main>
  );
};

export default AuthPage;
