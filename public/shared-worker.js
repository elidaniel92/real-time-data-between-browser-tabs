let counter = 0;
let tabInstances = [];

onconnect = function (e) {
  const port = e.ports[0];

  // Add the new tab instance
  tabInstances.push(port);

  // Send initial counter value to the new tab
  port.postMessage({ counter });

  const browserInstancesId = tabInstances.length;

  // Message received from the tab
  port.onmessage = function (event) {
    switch (event.data.action) {
      case "increment":
        counter++;
        break;
      case "decrement":
        counter--
        break;
      case "reset":
        counter = browserInstancesId;
        break;
      default:
        counter = browserInstancesId; 
        break;
    }

    // Broadcast the updated counter to all connected tabs
    for (let i = 0; i <= tabInstances.length; i++) {
      tabInstances[i].postMessage({ counter });
    }
  };
};