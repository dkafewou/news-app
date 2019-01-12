import QueryString from "querystring"
import * as errors from "./errors"

const API_HOST = process.env.API_HOST

export const urlForEndpoint = (endpoint, params = null) => {
  if (params == null) {
    return API_HOST + endpoint
  } else {
    return API_HOST + endpoint + "?" + QueryString.stringify(params)
  }
}

export const newRequest = (method, authToken = null, contentType = "application/json") => {
  const headers = new Headers()
  headers.append("Content-Type", contentType)
  if (authToken !== null) {
    headers.append("Authorization", "Bearer " + authToken)
  }

  // Return fetch request body
  return {
    method,
    headers
  }
}

export const fetchWithErrors = async (url, request) => {
  try {
    return await fetch(url, request)
  } catch (err) {
    console.error("Failed to fetch:", err)
    throw errors.SERVER_UNREACHABLE
  }
}

export const parseResponseAndHandleErrors = async (response) => {
  // Check if unauthorized
  if (response.status === "401") {
    // Show error
    throw errors.ACCESS_DENIED
  }

  // If not successful, throw JSON as response
  let responseStatusNumber = Number(response.status)
  if (responseStatusNumber >= 400 && responseStatusNumber <= 599) {
    throw await response.json()
  }

  // Parse response
  let json
  try {
    json = await response.json()
  } catch (err) {
    console.error("Failed to fetch:", err)
    throw errors.INVALID_RESPONSE
  }

  // Handle empty JSON with prejudice
  if (json === null || json === undefined) {
    throw errors.INVALID_RESPONSE
  }

  return json
}
