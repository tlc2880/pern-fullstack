import Nav from "./Nav"

type HeaderProps = {
  currentUserId: number;
  setCurrentUserId: React.Dispatch<React.SetStateAction<number>>;
}

const Header = ({ currentUserId, setCurrentUserId }: HeaderProps) => {
  return (
    <header>
      <h1>Suspense Typicode User Blogs</h1>
      <Nav
        currentUserId={currentUserId}
        setCurrentUserId={setCurrentUserId}
      />
    </header>
  )
}
export default Header