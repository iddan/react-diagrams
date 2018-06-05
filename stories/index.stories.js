import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Diagram from "../src/Diagram";
import "./index.css";

const nodes = [
  {
    id: "#1",
    name: "hello",
    ports: [{ name: "out", type: "out", label: "Out" }],
    position: { x: 20, y: 20 }
  },
  {
    id: "#2",
    name: "Hey",
    ports: [{ name: "in", type: "in", label: "In" }],
    position: { x: 20, y: 100 }
  }
];

const links = [
  { source: { node: "#1", port: "out" }, target: { node: "#2", port: "in" } }
];

storiesOf("Diagram", module).add("Diagram", () => (
  <div>
    <Diagram
      nodes={nodes}
      links={links}
      gridSize={10}
      onNodesChange={action("onNodesChange")}
      onLinksChange={action("onLinksChange")}
      onOffsetChange={action("onOffsetChange")}
      onZoomChange={action("onZoomChange")}
    />
  </div>
));
