import { postType, userType } from './app.Types'

type PostProps = {
  post: postType
  user: userType
}

const Post = ({ post, user }: PostProps) => {
  // if (user.id === 2) throw new Error('Error #2') // this used for testing
  return (
    <article className="post">
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <p>Post ID: {post.id}</p>
      <p>
        Author: {user.name} from {user.company.name}
      </p>
      <p>Tagline: {user.company.catchPhrase}</p>
    </article>
  )
}
export default Post
