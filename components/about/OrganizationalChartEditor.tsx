"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, Link2, Settings, X, Save, GripVertical } from "lucide-react";
import type { OrgChartNode, OrgChartConnection, OrgChartNodeShape, OrgChartConnectionStyle } from "@/types/orgChart";

interface OrganizationalChartEditorProps {
  nodes: OrgChartNode[];
  connections: OrgChartConnection[];
  onChange: (nodes: OrgChartNode[], connections: OrgChartConnection[]) => void;
  isAr?: boolean;
}

const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 800;

export default function OrganizationalChartEditor({
  nodes,
  connections,
  onChange,
  isAr = true,
}: OrganizationalChartEditorProps) {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectingFrom, setConnectingFrom] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const addNode = useCallback(() => {
    const newNode: OrgChartNode = {
      id: generateId(),
      labelAr: "عنصر جديد",
      labelEn: "New Node",
      x: CANVAS_WIDTH / 2 - 75,
      y: CANVAS_HEIGHT / 2 - 30,
      width: 150,
      height: 60,
      backgroundColor: "#254151",
      textColor: "#ffffff",
      shape: "rounded",
      level: 0,
    };
    onChange([...nodes, newNode], connections);
    setSelectedNodeId(newNode.id);
  }, [nodes, connections, onChange]);

  const deleteNode = useCallback((nodeId: string) => {
    const newNodes = nodes.filter((n) => n.id !== nodeId);
    const newConnections = connections.filter((c) => c.from !== nodeId && c.to !== nodeId);
    onChange(newNodes, newConnections);
    if (selectedNodeId === nodeId) setSelectedNodeId(null);
  }, [nodes, connections, onChange, selectedNodeId]);

  const updateNode = useCallback((nodeId: string, updates: Partial<OrgChartNode>) => {
    const newNodes = nodes.map((n) => (n.id === nodeId ? { ...n, ...updates } : n));
    onChange(newNodes, connections);
  }, [nodes, connections, onChange]);

  const startConnecting = useCallback((nodeId: string) => {
    if (isConnecting && connectingFrom === nodeId) {
      setIsConnecting(false);
      setConnectingFrom(null);
    } else if (isConnecting && connectingFrom) {
      // Create connection
      if (connectingFrom !== nodeId) {
        const existingConnection = connections.find(
          (c) => c.from === connectingFrom && c.to === nodeId
        );
        if (!existingConnection) {
          const newConnection: OrgChartConnection = {
            id: generateId(),
            from: connectingFrom,
            to: nodeId,
            color: "#254151",
            style: "solid",
          };
          onChange(nodes, [...connections, newConnection]);
        }
      }
      setIsConnecting(false);
      setConnectingFrom(null);
    } else {
      setIsConnecting(true);
      setConnectingFrom(nodeId);
    }
  }, [isConnecting, connectingFrom, nodes, connections, onChange]);

  const deleteConnection = useCallback((connectionId: string) => {
    onChange(nodes, connections.filter((c) => c.id !== connectionId));
  }, [nodes, connections, onChange]);

  const handleMouseDown = useCallback((e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation();
    setSelectedNodeId(nodeId);
    setIsDragging(true);
    const node = nodes.find((n) => n.id === nodeId);
    if (node && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left - node.x,
        y: e.clientY - rect.top - node.y,
      });
    }
  }, [nodes]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging && selectedNodeId && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const newX = Math.max(0, Math.min(CANVAS_WIDTH - 150, e.clientX - rect.left - dragOffset.x));
      const newY = Math.max(0, Math.min(CANVAS_HEIGHT - 60, e.clientY - rect.top - dragOffset.y));
      updateNode(selectedNodeId, { x: newX, y: newY });
    }
  }, [isDragging, selectedNodeId, dragOffset, updateNode]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const getConnectionPath = (from: OrgChartNode, to: OrgChartNode) => {
    const fromX = from.x + from.width / 2;
    const fromY = from.y + from.height / 2;
    const toX = to.x + to.width / 2;
    const toY = to.y + to.height / 2;
    return `M ${fromX} ${fromY} L ${toX} ${toY}`;
  };

  const selectedNode = nodes.find((n) => n.id === selectedNodeId);

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 p-3 bg-gray-100 rounded-lg">
        <button
          onClick={addNode}
          className="flex items-center gap-2 px-3 py-2 bg-[#254151] text-white rounded-md hover:bg-[#1a2f3a] transition-colors"
        >
          <Plus className="w-4 h-4" />
          {isAr ? "إضافة عنصر" : "Add Node"}
        </button>
        <button
          onClick={() => setIsConnecting(!isConnecting)}
          className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
            isConnecting ? "bg-[#c2a772] text-white" : "bg-white border border-gray-300 hover:bg-gray-50"
          }`}
        >
          <Link2 className="w-4 h-4" />
          {isConnecting ? (isAr ? "إلغاء الربط" : "Cancel Connect") : (isAr ? "ربط عناصر" : "Connect Nodes")}
        </button>
        {selectedNode && (
          <>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <Settings className="w-4 h-4" />
              {isAr ? "الإعدادات" : "Settings"}
            </button>
            <button
              onClick={() => deleteNode(selectedNode.id)}
              className="flex items-center gap-2 px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              <Trash2 className="w-4 h-4" />
              {isAr ? "حذف" : "Delete"}
            </button>
          </>
        )}
        <div className="text-sm text-gray-600 mr-auto">
          {isAr ? `${nodes.length} عناصر، ${connections.length} روابط` : `${nodes.length} nodes, ${connections.length} connections`}
        </div>
      </div>

      <div className="flex gap-4">
        {/* Canvas */}
        <div
          ref={canvasRef}
          className="relative bg-white border-2 border-gray-200 rounded-lg overflow-hidden"
          style={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT }}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onClick={() => setSelectedNodeId(null)}
        >
          {/* Grid */}
          <svg className="absolute inset-0 pointer-events-none" width={CANVAS_WIDTH} height={CANVAS_HEIGHT}>
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width={CANVAS_WIDTH} height={CANVAS_HEIGHT} fill="url(#grid)" />
          </svg>

          {/* Connections */}
          <svg className="absolute inset-0 pointer-events-none" width={CANVAS_WIDTH} height={CANVAS_HEIGHT}>
            {connections.map((conn) => {
              const from = nodes.find((n) => n.id === conn.from);
              const to = nodes.find((n) => n.id === conn.to);
              if (!from || !to) return null;
              return (
                <g key={conn.id}>
                  <path
                    d={getConnectionPath(from, to)}
                    stroke={conn.color}
                    strokeWidth={2}
                    strokeDasharray={conn.style === "dashed" ? "5,5" : conn.style === "dotted" ? "2,2" : undefined}
                    fill="none"
                  />
                  <circle cx={from.x + from.width / 2} cy={from.y + from.height / 2} r="3" fill={conn.color} />
                  <circle cx={to.x + to.width / 2} cy={to.y + to.height / 2} r="3" fill={conn.color} />
                </g>
              );
            })}
          </svg>

          {/* Nodes */}
          {nodes.map((node) => (
            <motion.div
              key={node.id}
              className={`absolute cursor-move select-none ${
                selectedNodeId === node.id ? "ring-2 ring-[#c2a772] ring-offset-2" : ""
              } ${isConnecting && connectingFrom === node.id ? "ring-2 ring-blue-500 ring-offset-2" : ""}`}
              style={{
                left: node.x,
                top: node.y,
                width: node.width,
                height: node.height,
              }}
              onMouseDown={(e) => handleMouseDown(e, node.id)}
              onClick={(e) => {
                e.stopPropagation();
                if (isConnecting) startConnecting(node.id);
                else setSelectedNodeId(node.id);
              }}
              drag={false}
            >
              <div
                className={`w-full h-full flex items-center justify-center text-center text-sm font-semibold overflow-hidden ${
                  node.shape === "circle"
                    ? "rounded-full"
                    : node.shape === "rounded"
                    ? "rounded-lg"
                    : ""
                }`}
                style={{
                  backgroundColor: node.backgroundColor,
                  color: node.textColor,
                }}
              >
                <div className="px-2">
                  <div className="text-xs">{isAr ? node.labelAr : node.labelEn}</div>
                </div>
              </div>
              {isConnecting && connectingFrom === node.id && (
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                  {isAr ? "اختر هدف" : "Select target"}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Settings Panel */}
        {showSettings && selectedNode && (
          <div className="w-72 bg-white border border-gray-200 rounded-lg p-4 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">{isAr ? "إعدادات العنصر" : "Node Settings"}</h3>
              <button onClick={() => setShowSettings(false)}>
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-600 mb-1">{isAr ? "النص (عربي)" : "Text (Arabic)"}</label>
                <input
                  type="text"
                  value={selectedNode.labelAr}
                  onChange={(e) => updateNode(selectedNode.id, { labelAr: e.target.value })}
                  className="w-full px-2 py-1 border rounded text-sm"
                  dir="rtl"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">{isAr ? "النص (إنجليزي)" : "Text (English)"}</label>
                <input
                  type="text"
                  value={selectedNode.labelEn}
                  onChange={(e) => updateNode(selectedNode.id, { labelEn: e.target.value })}
                  className="w-full px-2 py-1 border rounded text-sm"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">{isAr ? "الشكل" : "Shape"}</label>
                <select
                  value={selectedNode.shape}
                  onChange={(e) => updateNode(selectedNode.id, { shape: e.target.value as OrgChartNodeShape })}
                  className="w-full px-2 py-1 border rounded text-sm"
                >
                  <option value="rectangle">{isAr ? "مستطيل" : "Rectangle"}</option>
                  <option value="rounded">{isAr ? "زوايا دائرية" : "Rounded"}</option>
                  <option value="circle">{isAr ? "دائرة" : "Circle"}</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">{isAr ? "لون الخلفية" : "Background"}</label>
                  <input
                    type="color"
                    value={selectedNode.backgroundColor}
                    onChange={(e) => updateNode(selectedNode.id, { backgroundColor: e.target.value })}
                    className="w-full h-8 rounded cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">{isAr ? "لون النص" : "Text Color"}</label>
                  <input
                    type="color"
                    value={selectedNode.textColor}
                    onChange={(e) => updateNode(selectedNode.id, { textColor: e.target.value })}
                    className="w-full h-8 rounded cursor-pointer"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">{isAr ? "العرض" : "Width"}</label>
                  <input
                    type="number"
                    value={selectedNode.width}
                    onChange={(e) => updateNode(selectedNode.id, { width: parseInt(e.target.value) })}
                    className="w-full px-2 py-1 border rounded text-sm"
                    min="50"
                    max="400"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">{isAr ? "الارتفاع" : "Height"}</label>
                  <input
                    type="number"
                    value={selectedNode.height}
                    onChange={(e) => updateNode(selectedNode.id, { height: parseInt(e.target.value) })}
                    className="w-full px-2 py-1 border rounded text-sm"
                    min="30"
                    max="200"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Connection List */}
      {connections.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-3">
          <h4 className="font-semibold mb-2 text-sm">{isAr ? "الروابط" : "Connections"}</h4>
          <div className="flex flex-wrap gap-2">
            {connections.map((conn) => {
              const from = nodes.find((n) => n.id === conn.from);
              const to = nodes.find((n) => n.id === conn.to);
              return (
                <div
                  key={conn.id}
                  className="flex items-center gap-2 bg-white px-3 py-1 rounded border text-sm"
                >
                  <span>{isAr ? from?.labelAr : from?.labelEn}</span>
                  <span>→</span>
                  <span>{isAr ? to?.labelAr : to?.labelEn}</span>
                  <button
                    onClick={() => deleteConnection(conn.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
