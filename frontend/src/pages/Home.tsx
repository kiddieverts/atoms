import { Link } from 'react-router-dom';

const Home = () => {
  return <>
    <h1>Atoms Music NFTs</h1>

    <Link to="/mint">
      <button>Mint</button>
    </Link>
  </>
}

export default Home;