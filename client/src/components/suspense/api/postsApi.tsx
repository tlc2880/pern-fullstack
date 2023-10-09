import axios from 'axios'

// Not needed until optimistic UI updates example
const delay = () => new Promise<void>((res) => setTimeout(() => res(), 1800))

const postsApi = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
})

export const postsUrlEndpoint = '/posts'

export const getPostsByUserId = async (url: URL | string, userId: number) => {
  await delay()
  const response = await postsApi.get(`${url}?userId=${userId}`)
  return response.data
}
