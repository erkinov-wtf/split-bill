import './App.css'
import Layout from "./components/Layout";

const Home = () => {
    return <div>
      <p className="text-black"> Home Page Content</p>
    </div>;
};

function App() {
    return (
        <Layout>
            <Home />
        </Layout>
    );
}

export default App
