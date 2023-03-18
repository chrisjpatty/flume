import ReactDOM from "react-dom/client";
//@ts-ignore next-line
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "./App";
import TestEditor from "./TestRoutes/TestEditor";
import "./index.css";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <Router>
      <Route exact path="/" render={() => <App />} />
      <Switch>
        <Route exact path="/test" render={() => <TestEditor />} />
      </Switch>
    </Router>
  );
}
