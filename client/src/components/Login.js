import React from 'react'

const Login = ({ user, pwd, setUser, setPwd, handleLogin }) => (
  <div>
    <form onSubmit={handleLogin}>
      Username
      <input id="username" type="text" value={user} name="Username" onChange={({ target }) => setUser(target.value)} /> <br />
      Password
      <input id="password" type="password" value={pwd} name="Password" onChange={({ target }) => setPwd(target.value)} /> <br />
      <button id="loginButton">login</button>
    </form>
  </div>
)

export default Login
