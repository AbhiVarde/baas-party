import { useQuery } from "convex/react"
import { api } from "../convex/_generated/api"

// Convex queries are live by default — no setup needed.
// The component re-renders automatically when data changes.
function PostsList() {
  const posts = useQuery(api.posts.list)

  return posts?.map((post) => (
    <div key={post._id}>{post.title}</div>
  ))
}