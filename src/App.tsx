import { useUserState } from "./state/user"

function App() {
  const { setData, resetData } = useUserState();
  return (
    <>
    <UserCard />
      <input type="text" onChange={(e) => setData({ name: e.target.value })} />
      <button onClick={resetData}>Reset</button>
      <input type="text" placeholder="Enter text ...."  />
    </>
  )
}

function UserCard() {
  const { data } = useUserState();
  return (
    <>
      <h1 className="text-xl font-bold">{data?.name}</h1>
    </>
  )
}

export default App
