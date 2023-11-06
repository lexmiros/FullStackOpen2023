const LoginForm = ({
  loginHandler,
  username,
  setUsername,
  password,
  setPassword,
}) => {
  return (
    <div>
      <div>
        Log in to application
      </div>
      <form onSubmit={loginHandler}>
        <div>
          Username:
          <input
            type="text"
            value={username}
            name="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password:
          <input
            type="text"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm