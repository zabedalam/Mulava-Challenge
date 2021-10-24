// Create a particular type to describe the state of progress of an asynchronous request
enum RequestState {
  // Not yet sent
  Idle,
  // Waiting for a response
  Pending,
  // Response successfully
  Success,
  // Response with an error
  Failed,
}

export default RequestState;
