// @flow

import React, { Component } from "react";
import type { ComponentType } from "react";
import * as SRD from "storm-react-diagrams";
import "storm-react-diagrams/dist/style.min.css";

opaque type PortID = string;

/** @todo include all Port properties */
type Port = {|
  name: string,
  type: "in" | "out",
  id?: PortID,
  label?: string,
  maximumLinks?: number
|};

opaque type NodeID = string;

/** @todo include all Node properties */
type Node = {|
  name: string,
  color: string,
  id?: NodeID,
  ports?: Port[],
  position?: { x: number, y: number },
  component?: ComponentType
|};

/** @todo include all Link properties */
type Link = {|
  source: { node: NodeID, port: number },
  target: { node: NodeID, port: number }
|};

type Props = {|
  nodes: Node[],
  links: Link[],
  gridSize?: number,
  onNodesChange?: (
    event: SRD.BaseEvent & { node: SRD.NodeModel, isCreated: boolean }
  ) => void,
  onLinksChange?: (
    event: SRD.BaseEvent & { link: SRD.LinkModel, isCreated: boolean }
  ) => void,
  onOffsetChange?: (
    event: SRD.BaseEvent<SRD.DiagramModel> & {
      offsetX: number,
      offsetY: number
    }
  ) => void,
  onZoomChange?: (
    event: SRD.BaseEvent<SRD.DiagramModel> & { zoom: number }
  ) => void
|};

class Diagram extends Component<Props> {
  engine = new SRD.DiagramEngine();
  model = new SRD.DiagramModel();

  componentDidMount() {
    const {
      nodes,
      links,
      onNodesChange,
      onLinksChange,
      onOffsetChange,
      onZoomChange
    } = this.props;

    let modelListener = {};
    if (onNodesChange) {
      modelListener.nodesUpdated = onNodesChange;
    }
    if (onLinksChange) {
      modelListener.linksUpdated = onLinksChange;
    }
    if (onOffsetChange) {
      modelListener.offsetUpdated = onOffsetChange;
    }
    if (onZoomChange) {
      modelListener.zoomUpdated = onZoomChange;
    }

    this.model.addListener(modelListener);

    nodes.forEach(node => {
      /** @todo component */
      this.engine.installDefaultFactories();
      const nodeModel = new SRD.DefaultNodeModel(node.name, node.color);
      if (node.id) {
        nodeModel.id = node.id;
      }
      if (node.position) {
        nodeModel.x = node.position.x;
        nodeModel.y = node.position.y;
      }
      if (node.ports) {
        node.ports.forEach(port => {
          const isInput = port.type === "in";
          const portModel = new SRD.DefaultPortModel(
            isInput,
            port.name,
            port.label,
            port.id
          );
          if (port.maximumLinks !== undefined) {
            portModel.maximumLinks = port.maximumLinks;
          }
          nodeModel.addPort(portModel);
        });
      }
      this.model.addNode(nodeModel);
    });
    links.forEach(link => {
      const sourceNode = this.model.getNode(link.source.node);
      const targetNode = this.model.getNode(link.target.node);
      const sourcePort = sourceNode.getPort(link.source.port);
      const targetPort = targetNode.getPort(link.target.port);
      const linkModel = sourcePort.link(targetPort);
      this.model.addLink(linkModel);
    });
    if (this.props.gridSize !== undefined) {
      this.model.setGridSize(this.props.gridSize);
    }
    this.engine.setDiagramModel(this.model);
  }

  render() {
    return <SRD.DiagramWidget diagramEngine={this.engine} />;
  }
}

export default Diagram;
