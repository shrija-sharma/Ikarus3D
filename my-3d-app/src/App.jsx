import { useState, useEffect } from "react";
import axios from "axios";
import ModelViewer from "./components/ModelViewer";

function App() {
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/models")
      .then((res) => {
        console.log("✅ Models fetched:", res.data);
        const gltfModels = res.data.filter(model => model.name.endsWith(".glb"));
        setModels(gltfModels);
      })
      .catch((err) => console.error("❌ Error fetching models:", err));
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Select a 3D Model</h2>

      {models.length === 0 && <p>❌ No models found. Check backend!</p>}

      {models.map((model) => (
        <button key={model.name} onClick={() => setSelectedModel(model.path)}>
          {model.name}
        </button>
      ))}

      {selectedModel && <ModelViewer modelPath={`http://localhost:5000${selectedModel}`} />}
    </div>
  );
}

export default App;
