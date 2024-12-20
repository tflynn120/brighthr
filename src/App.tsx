import Documents from "./components/Documents";
import data from "./jsonData/data.json";

function App() {
  console.log(data);
  return (
    <>
      <div className="ml-20 mr-20 lg:max-w-screen-xl">
        <h1>Documents</h1>
        <Documents />
      </div>
    </>
  );
}

export default App;
