import PropTypes from 'prop-types'

const loginForm = (props) => {
    return(
        <div>
            <h2>Log in to application</h2>
            <form onSubmit={props.handleLogin}>
                <div>
                username
                    <input
                        type="text"
                        value={props.username}
                        name="Username"
                        onChange={props.handleUsernameChange}
                    />
                </div>
                <div>
                password
                    <input
                        type="password"
                        value={props.password}
                        name="Password"
                        onChange={props.handlePasswordChange}
                        autoComplete="on"
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

loginForm.propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    handleLogin: PropTypes.func.isRequired,
    handleUsernameChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired
}

export default loginForm