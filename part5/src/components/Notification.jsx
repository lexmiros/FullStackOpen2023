const Notification = ( {notification} ) => {

  const { message, isError } = notification

  if (!message) {
    return null
  }

  if (isError) {
    return (
    <div className="error">
      {message}
    </div>
    )
  }
  return(
    <div className="message">
      {message}
    </div>
  )
}

export default Notification