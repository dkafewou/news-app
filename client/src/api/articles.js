import {
  urlForEndpoint,
  newRequest,
  fetchWithErrors,
  parseResponseAndHandleErrors
} from "./helperFunctions"

export const getArticles = async () => {
  // Build request
  const url = urlForEndpoint(`/v1/articles`)
  const request = newRequest("GET")

  // Fetch
  const response = await fetchWithErrors(url, request)

  // Handle errors and return response
  return await parseResponseAndHandleErrors(response)
}
