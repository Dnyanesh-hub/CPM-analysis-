import ReactFlow, { ReactFlowProvider } from "reactflow";
import "reactflow/dist/style.css";

function NetworkDiagram({ graph, activities }) {
  if (!graph || !graph.nodes || !graph.edges || !activities) {
    return <h2>Loading diagram...</h2>;
  }

  const nodes = graph.nodes.map((id, index) => {
    const activity = activities.find(a => a.id === id);

    return {
      id,
      position: { x: index * 150, y: 100 },
      data: {
        label: `${id} (ES:${activity?.ES}, EF:${activity?.EF})`
      },
      style: {
        background: activity?.isCritical ? "red" : "blue",
        color: "white",
        padding: 10
      }
    };
  });

  const edges = graph.edges.map((e, i) => ({
    id: `e${i}`,
    source: e.source,
    target: e.target,
    animated: true
  }));

  return (
    <div style={{ height: 400 }}>
      <ReactFlowProvider>
        <ReactFlow nodes={nodes} edges={edges} fitView />
      </ReactFlowProvider>
    </div>
  );
}

export default NetworkDiagram;