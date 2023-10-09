import axios from 'axios'

// Not needed until optimistic UI updates example
const delay = () => new Promise<void>((res) => setTimeout(() => res(), 1800))

const usersApi = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
})

export const usersUrlEndpoint = '/users'

export const getUsers = async () => {
  await delay()
  const response = await usersApi.get(usersUrlEndpoint)
  return response.data
}

export const getUserById = async (url: URL | string, userId: number) => {
  await delay()
  const response = await usersApi.get(`${url}/${userId}`)
  return response.data
}
