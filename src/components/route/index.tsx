import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Base from "../../pages/base";
import View from "../../pages/view";

const BaseRoute: React.FC = () => {
  return (
    <Router>
      <Route exact path="/" default={true} component={Base} />
      <Route exact path="/:id" component={View} />
    </Router>
  );
};

export default BaseRoute;
