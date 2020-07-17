import React, {Component} from 'react';
import * as d3 from 'd3';
import {select} from 'd3';

const width = 600;
const height = 400;
const padding = 40;
const nodeSize = 30;
var color = d3.scaleOrdinal(d3.schemeCategory10);

const data = {
  nodes: [
    {label: 'i0', layer: 1},
    {label: 'i1', layer: 1},
    {label: 'h0', layer: 2},
    {label: 'i2', layer: 1},
    {label: 'h1', layer: 2},
    {label: 'h2', layer: 2},
    {label: 'h3', layer: 2},
    {label: 'o0', layer: 3},
  ],
};

class NetworkArchitecture extends Component {
  constructor(props) {
    super(props);

    this.createLossChart = this.createLossChart.bind(this);
  }

  componentWillMount() {}

  componentDidMount() {
    this.createLossChart();
  }
  componentDidUpdate() {
    this.createLossChart();
  }

  createLossChart() {
    const node = this.nodes;
    var nodes = data.nodes;

    // get network size
    var netsize = {};
    nodes.forEach(function (d) {
      if (d.layer in netsize) {
        netsize[d.layer] += 1;
      } else {
        netsize[d.layer] = 1;
      }
      d['lidx'] = netsize[d.layer];
    });

    // calc distances between nodes
    var largestLayerSize = Math.max.apply(
      null,
      Object.keys(netsize).map(function (i) {
        return netsize[i];
      })
    );

    var xdist = width / Object.keys(netsize).length,
      ydist = height / largestLayerSize;

    // create node locations
    nodes.map(function (d) {
      d['x'] = (d.layer - 0.5) * xdist;
      d['y'] = (d.lidx - 0.5) * ydist;
    });

    // autogenerate links
    var links = [];
    nodes
      .map(function (d, i) {
        for (var n in nodes) {
          if (d.layer + 1 == nodes[n].layer) {
            links.push({source: parseInt(i), target: parseInt(n), value: 1});
          }
        }
      })
      .filter(function (d) {
        return typeof d !== 'undefined';
      });

    // draw links
    select(node)
      .selectAll('.link')
      .data(links)
      .enter()
      .append('line')
      .attr('class', 'link')
      .attr('x1', function (d) {
        return nodes[d.source].x;
      })
      .attr('y1', function (d) {
        return nodes[d.source].y;
      })
      .attr('x2', function (d) {
        return nodes[d.target].x;
      })
      .attr('y2', function (d) {
        return nodes[d.target].y;
      })
      .style('stroke-width', function (d) {
        return Math.sqrt(d.value);
      });

    // draw nodes
    select(node)
      .selectAll('.node')
      .data(nodes)
      .enter()
      .append('g')
      .attr('transform', function (d) {
        return 'translate(' + d.x + ',' + d.y + ')';
      })
      .append('circle')
      .attr('class', 'node')
      .attr('r', nodeSize)
      .style('fill', function (d) {
        return color(d.layer);
      })
      .append('text')
      .attr('dx', '-.35em')
      .attr('dy', '.35em')
      .text(function (d) {
        return d.label;
      });
  }

  render() {
    return (
      <div className="card-network-architecture">
        <div className="card-body">
          <div class="header-label">Model Architecture</div>
          <svg
            ref={(node) => (this.nodes = node)}
            width={width}
            height={height}></svg>
        </div>
      </div>
    );
  }
}

export default NetworkArchitecture;
