"use client";

import { motion } from "framer-motion";
import type { OrgChartNode, OrgChartConnection } from "@/types/orgChart";

interface OrganizationalChartViewerProps {
  nodes: OrgChartNode[];
  connections: OrgChartConnection[];
  isAr?: boolean;
}

export default function OrganizationalChartViewer({
  nodes,
  connections,
  isAr = true,
}: OrganizationalChartViewerProps) {
  if (nodes.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        {isAr ? "لا يوجد مخطط تنظيمي" : "No organizational chart available"}
      </div>
    );
  }

  // Calculate bounding box
  const minX = Math.min(...nodes.map((n) => n.x));
  const minY = Math.min(...nodes.map((n) => n.y));
  const maxX = Math.max(...nodes.map((n) => n.x + n.width));
  const maxY = Math.max(...nodes.map((n) => n.y + n.height));

  const padding = 50;
  const viewBoxWidth = maxX - minX + padding * 2;
  const viewBoxHeight = maxY - minY + padding * 2;
  const viewBoxX = minX - padding;
  const viewBoxY = minY - padding;

  const getConnectionPath = (from: OrgChartNode, to: OrgChartNode) => {
    const fromX = from.x + from.width / 2;
    const fromY = from.y + from.height / 2;
    const toX = to.x + to.width / 2;
    const toY = to.y + to.height / 2;
    return `M ${fromX} ${fromY} L ${toX} ${toY}`;
  };

  return (
    <div className="w-full overflow-x-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative inline-block min-w-full"
        style={{ minWidth: viewBoxWidth }}
      >
        <svg
          viewBox={`${viewBoxX} ${viewBoxY} ${viewBoxWidth} ${viewBoxHeight}`}
          className="w-full h-auto"
          style={{ minHeight: viewBoxHeight }}
        >
          {/* Connections */}
          <g>
            {connections.map((conn, index) => {
              const from = nodes.find((n) => n.id === conn.from);
              const to = nodes.find((n) => n.id === conn.to);
              if (!from || !to) return null;

              return (
                <motion.g
                  key={conn.id}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <path
                    d={getConnectionPath(from, to)}
                    stroke={conn.color}
                    strokeWidth={2}
                    strokeDasharray={
                      conn.style === "dashed" ? "5,5" : conn.style === "dotted" ? "2,2" : undefined
                    }
                    fill="none"
                    className="transition-all duration-300"
                  />
                </motion.g>
              );
            })}
          </g>

          {/* Nodes */}
          <g>
            {nodes.map((node, index) => (
              <motion.g
                key={node.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {/* Node Shape */}
                {node.shape === "circle" ? (
                  <ellipse
                    cx={node.x + node.width / 2}
                    cy={node.y + node.height / 2}
                    rx={node.width / 2}
                    ry={node.height / 2}
                    fill={node.backgroundColor}
                    className="transition-all duration-300 hover:brightness-110"
                  />
                ) : (
                  <rect
                    x={node.x}
                    y={node.y}
                    width={node.width}
                    height={node.height}
                    rx={node.shape === "rounded" ? 8 : 0}
                    ry={node.shape === "rounded" ? 8 : 0}
                    fill={node.backgroundColor}
                    className="transition-all duration-300 hover:brightness-110"
                  />
                )}

                {/* Node Text */}
                <text
                  x={node.x + node.width / 2}
                  y={node.y + node.height / 2}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={node.textColor}
                  fontSize={Math.min(node.width / 8, 14)}
                  fontWeight="600"
                  className="pointer-events-none select-none"
                >
                  <tspan x={node.x + node.width / 2} dy="-0.2em">
                    {isAr ? node.labelAr : node.labelEn}
                  </tspan>
                </text>
              </motion.g>
            ))}
          </g>
        </svg>
      </motion.div>
    </div>
  );
}
