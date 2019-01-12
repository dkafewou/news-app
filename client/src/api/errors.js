export const ACCESS_DENIED = {
  type:    "unauthorized",
  message: "Access is denied",
}

export const INVALID_RESPONSE = {
  type:    "invalid_response",
  message: "Couldn't understand server response.",
}

export const SERVER_UNREACHABLE = {
  type:    "could_not_contact_server",
  message: "Couldn't contact the server. Please check your internet connection and try again.",
}
