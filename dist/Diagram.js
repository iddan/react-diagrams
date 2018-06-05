function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React, { Component } from "react";
import * as SRD from "storm-react-diagrams";
import "storm-react-diagrams/dist/style.min.css";

var Diagram =
/*#__PURE__*/
function (_Component) {
  _inherits(Diagram, _Component);

  function Diagram() {
    var _ref;

    var _temp, _this;

    _classCallCheck(this, Diagram);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_ref = Diagram.__proto__ || Object.getPrototypeOf(Diagram)).call.apply(_ref, [this].concat(args))), _this.engine = new SRD.DiagramEngine(), _this.model = new SRD.DiagramModel(), _temp));
  }

  _createClass(Diagram, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var _this$props = this.props,
          nodes = _this$props.nodes,
          links = _this$props.links,
          onNodesChange = _this$props.onNodesChange,
          onLinksChange = _this$props.onLinksChange,
          onOffsetChange = _this$props.onOffsetChange,
          onZoomChange = _this$props.onZoomChange;
      var modelListener = {};

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
      nodes.forEach(function (node) {
        /** @todo component */
        _this2.engine.installDefaultFactories();

        var nodeModel = new SRD.DefaultNodeModel(node.name, node.color);

        if (node.id) {
          nodeModel.id = node.id;
        }

        if (node.position) {
          nodeModel.x = node.position.x;
          nodeModel.y = node.position.y;
        }

        if (node.ports) {
          node.ports.forEach(function (port) {
            var isInput = port.type === "in";
            var portModel = new SRD.DefaultPortModel(isInput, port.name, port.label, port.id);

            if (port.maximumLinks !== undefined) {
              portModel.maximumLinks = port.maximumLinks;
            }

            nodeModel.addPort(portModel);
          });
        }

        _this2.model.addNode(nodeModel);
      });
      links.forEach(function (link) {
        var sourceNode = _this2.model.getNode(link.source.node);

        var targetNode = _this2.model.getNode(link.target.node);

        var sourcePort = sourceNode.getPort(link.source.port);
        var targetPort = targetNode.getPort(link.target.port);
        var linkModel = sourcePort.link(targetPort);

        _this2.model.addLink(linkModel);
      });

      if (this.props.gridSize !== undefined) {
        this.model.setGridSize(this.props.gridSize);
      }

      this.engine.setDiagramModel(this.model);
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(SRD.DiagramWidget, {
        diagramEngine: this.engine
      });
    }
  }]);

  return Diagram;
}(Component);

export default Diagram;