import { useState } from "react";
import ActivityForm from "./ActivityForm";
import NetworkDiagram from "./NetworkDiagram";
import ActivityTable from "./ActivityTable";

function App() {
  const [data, setData] = useState(null);

  const calculateCPM = async (activities) => {
    const res = await fetch("http://localhost:5000/calculate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ activities })
    });

    const result = await res.json();
    setData(result);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>CPM Calculator</h2>

      <ActivityForm onSubmit={calculateCPM} />

      {data && (
        <>
          <h3>Project Duration: {data.projectDuration}</h3>

          <NetworkDiagram
            graph={data.graph}
            activities={data.activities}
          />

          <ActivityTable activities={data.activities} />
        </>
      )}
    </div>
  );
}

export default App;