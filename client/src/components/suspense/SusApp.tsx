import { useState, Suspense } from "react";
import Header from "./Header";
import PostsList from "./PostsList";
import SkeletonPost from "./skeletons/SkeletonPost";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ErrorFallback";
import "./index.css";

function SusApp() {
  const [currentUserId, setCurrentUserId] = useState(0)
  const content = currentUserId === 0
    ? <h2 className="message">Select an Employee to view posts</h2>
    : (
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => setCurrentUserId(0)}
        resetKeys={[currentUserId]}
      >
        <Suspense fallback={[...Array(10).keys()].map(i => <SkeletonPost key={i} />)}>
          <PostsList currentUserId={currentUserId} />
        </Suspense>
      </ErrorBoundary>
    )
  return (
    <>
      <Header
        currentUserId={currentUserId}
        setCurrentUserId={setCurrentUserId}
      />
      {content}
    </>
  )
}
export default SusApp;