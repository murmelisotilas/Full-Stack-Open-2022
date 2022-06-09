const Notification = ({ message }) => {

    const addedStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }
    /*const errorStyle = {
      color: 'red',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    }*/




    if (message === null) {
        return null
    }


    return (
        <div style={addedStyle}>
            {message}
        </div>
    )
}

export default Notification