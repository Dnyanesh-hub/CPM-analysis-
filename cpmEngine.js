function runCPM(inputActivities) {
const activities = inputActivities.map(a => ({
  ...a,
  duration: Number(a.duration)
}));

  const adj = {};
  const inDegree = {};
  const map = {};

  activities.forEach(a => {
    adj[a.id] = [];
    inDegree[a.id] = 0;
    map[a.id] = a;
  });

  // Build graph
  activities.forEach(a => {
    a.predecessors.forEach(p => {
      adj[p].push(a.id);
      inDegree[a.id]++;
    });
  });

  // Topological Sort (Kahn)
  const queue = [];
  const topo = [];

  for (let node in inDegree) {
    if (inDegree[node] === 0) queue.push(node);
  }

  while (queue.length) {
    const node = queue.shift();
    topo.push(node);

    adj[node].forEach(nei => {
      inDegree[nei]--;
      if (inDegree[nei] === 0) queue.push(nei);
    });
  }

  if (topo.length !== activities.length) {
    throw new Error("Cycle detected");
  }

  // Forward Pass
  topo.forEach(id => {
    const act = map[id];
    if (act.predecessors.length === 0) {
      act.ES = 0;
    } else {
      act.ES = Math.max(
        ...act.predecessors.map(p => map[p].EF)
      );
    }
    act.EF = act.ES + act.duration;
  });

  const projectDuration = Math.max(
    ...activities.map(a => a.EF)
  );

  // Backward Pass
  topo.reverse().forEach(id => {
    const act = map[id];
    const successors = adj[id];

    if (successors.length === 0) {
      act.LF = projectDuration;
    } else {
      act.LF = Math.min(
        ...successors.map(s => map[s].LS)
      );
    }
    act.LS = act.LF - act.duration;
  });

  // Slack
  activities.forEach(a => {
    a.slack = a.LS - a.ES;
    a.isCritical = a.slack === 0;
  });

  // Critical Path DFS
  const criticalPaths = [];
  const startNodes = activities.filter(
    a => a.isCritical && a.predecessors.length === 0
  );

  function dfs(node, path) {
    path.push(node.id);
    const successors = adj[node.id].filter(
      s => map[s].isCritical
    );

    if (successors.length === 0) {
      criticalPaths.push([...path]);
    } else {
      successors.forEach(s => dfs(map[s], path));
    }

    path.pop();
  }

  startNodes.forEach(s => dfs(s, []));

  // Graph data for frontend
  const graph = {
    nodes: activities.map(a => a.id),
    edges: []
  };

  activities.forEach(a => {
    a.predecessors.forEach(p => {
      graph.edges.push({
        source: p,
        target: a.id
      });
    });
  });

  return {
    projectDuration,
    activities,
    criticalPaths,
    graph
  };
}

module.exports = runCPM;