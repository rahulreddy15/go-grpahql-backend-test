import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { graphql } from 'relay-runtime'
import { useLazyLoadQuery } from "react-relay";
import viteLogo from '/vite.svg'
import './App.css'

const AppQuery = graphql`
  query AppQuery {
    books {
      id
      title
      author
      genre
    }
  }
`

function App() {
  const [count, setCount] = useState(0)
  
  const data = useLazyLoadQuery(
    AppQuery,
    {},
  );
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div>
        <h2>Books</h2>
        <pre>
          <code>
            {JSON.stringify(data, null, 4)}
          </code>
        </pre>
      </div>
    </>
  )
}

export default App
