import useSWR from 'swr'

import {
  getPostsByUserId,
  postsUrlEndpoint as postsCacheKey,
} from './api/postsApi'

import { getUserById, usersUrlEndpoint as usersCacheKey } from './api/usersApi'

import Post from './Post'

import { postType } from './app.Types'
type PostsListProps = {
  currentUserId: number
}

export default function PostsList({ currentUserId }: PostsListProps) {
  const { data: posts } = useSWR(
    [postsCacheKey, currentUserId],
    ([url, userId]) => getPostsByUserId(url, userId),
    { suspense: true }
  )

  const { data: user } = useSWR(
    posts?.length ? [usersCacheKey, currentUserId] : null,
    ([url, userId]) => getUserById(url, userId),
    { suspense: true }
  )

  const content = (
    <main>
      {posts.map((post: postType) => {
        return <Post key={post.id} post={post} user={user} />
      })}
    </main>
  )

  return content
}
// export default PostsList
