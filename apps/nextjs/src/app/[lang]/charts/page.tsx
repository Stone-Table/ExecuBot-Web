'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import type { GraphData } from '@/types/graph';

// Dynamically import ForceGraph2D with no SSR
const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), {
  ssr: false,
  loading: () => (
    <div className="flex h-screen items-center justify-center">
      <div className="text-zinc-100">Loading visualization...</div>
    </div>
  ),
});

// Add sample data
const sampleGraphData: GraphData = {
  nodes: [
    // GitLab Users
    { id: "francisrj2-GL", label: "francisrj2", title: "GitLab User: francisrj2", status: "active", group: "gitlab" },
    { id: "batesdd-GL", label: "batesdd", title: "GitLab User: batesdd", status: "active", group: "gitlab" },
    { id: "coronacj-GL", label: "coronacj", title: "GitLab User: coronacj", status: "active", group: "gitlab" },
    { id: "smithj-GL", label: "smithj", title: "GitLab User: smithj", status: "active", group: "gitlab" },
    
    // Jira Users (matching GitLab users)
    { id: "francisrj2-JIRA", label: "francisrj2", title: "Jira User: francisrj2", status: "active", group: "jira" },
    { id: "batesdd-JIRA", label: "batesdd", title: "Jira User: batesdd", status: "active", group: "jira" },
    { id: "coronacj-JIRA", label: "coronacj", title: "Jira User: coronacj", status: "active", group: "jira" },
    { id: "smithj-JIRA", label: "smithj", title: "Jira User: smithj", status: "active", group: "jira" },

    // Jira Epics and Stories
    { id: "PROJ-100", label: "PROJ-100", title: "Authentication System Overhaul", status: "in_progress", group: "jira_issue" },
    { id: "PROJ-101", label: "PROJ-101", title: "User Profile Features", status: "in_progress", group: "jira_issue" },
    { id: "PROJ-102", label: "PROJ-102", title: "API Documentation", status: "todo", group: "jira_issue" },
    
    // GitLab Issues (both tracked and untracked)
    // Tracked Issues (linked to Jira)
    { id: "GL-123", label: "GL-123", title: "Implement OAuth2 flow", status: "closed", group: "gitlab_issue" },
    { id: "GL-124", label: "GL-124", title: "Add 2FA support", status: "open", group: "gitlab_issue" },
    { id: "GL-125", label: "GL-125", title: "Profile image upload", status: "closed", group: "gitlab_issue" },
    // Untracked Issues (no Jira ticket)
    { id: "GL-126", label: "GL-126", title: "Fix CSS in dev environment", status: "closed", group: "gitlab_issue" },
    { id: "GL-127", label: "GL-127", title: "Update npm packages", status: "closed", group: "gitlab_issue" },
    { id: "GL-128", label: "GL-128", title: "Fix typo in README", status: "closed", group: "gitlab_issue" },
    
    // GitLab Merge Requests
    { id: "MR-45", label: "MR-45", title: "Feature: OAuth Implementation", status: "merged", group: "gitlab_merge_request" },
    { id: "MR-46", label: "MR-46", title: "Feature: 2FA Support", status: "open", group: "gitlab_merge_request" },
    { id: "MR-47", label: "MR-47", title: "Feature: Profile Images", status: "merged", group: "gitlab_merge_request" },
    { id: "MR-48", label: "MR-48", title: "Fix: Dev CSS", status: "merged", group: "gitlab_merge_request" },
    { id: "MR-49", label: "MR-49", title: "Chore: Package Updates", status: "merged", group: "gitlab_merge_request" },
    
    // GitLab Commits
    // OAuth related
    { id: "commit-456", label: "a1b2c3d", title: "Initial OAuth setup", group: "gitlab_commit" },
    { id: "commit-457", label: "e4f5g6h", title: "Add OAuth routes", group: "gitlab_commit" },
    { id: "commit-458", label: "i7j8k9l", title: "OAuth tests", group: "gitlab_commit" },
    // 2FA related
    { id: "commit-459", label: "m0n1o2p", title: "2FA implementation", group: "gitlab_commit" },
    { id: "commit-460", label: "q3r4s5t", title: "Add 2FA validation", group: "gitlab_commit" },
    // Profile related
    { id: "commit-461", label: "u6v7w8x", title: "Image upload logic", group: "gitlab_commit" },
    { id: "commit-462", label: "y9z0a1b", title: "Image processing", group: "gitlab_commit" },
    // Untracked work commits
    { id: "commit-463", label: "c2d3e4f", title: "Fix dev CSS", group: "gitlab_commit" },
    { id: "commit-464", label: "g5h6i7j", title: "Update packages", group: "gitlab_commit" },
    { id: "commit-465", label: "k8l9m0n", title: "Fix README typo", group: "gitlab_commit" }
  ],
  links: [
    // User Identity Links
    { source: "francisrj2-GL", target: "francisrj2-JIRA", type: "user_link", value: 1 },
    { source: "batesdd-GL", target: "batesdd-JIRA", type: "user_link", value: 1 },
    { source: "coronacj-GL", target: "coronacj-JIRA", type: "user_link", value: 1 },
    { source: "smithj-GL", target: "smithj-JIRA", type: "user_link", value: 1 },

    // Jira Task Assignments
    { source: "francisrj2-JIRA", target: "PROJ-100", type: "assigned", value: 2 },
    { source: "batesdd-JIRA", target: "PROJ-101", type: "assigned", value: 2 },
    { source: "coronacj-JIRA", target: "PROJ-102", type: "assigned", value: 2 },

    // GitLab Issue to Jira Task Relations (only for tracked work)
    { source: "GL-123", target: "PROJ-100", type: "implements", value: 2 },
    { source: "GL-124", target: "PROJ-100", type: "implements", value: 2 },
    { source: "GL-125", target: "PROJ-101", type: "implements", value: 2 },

    // Merge Requests to Issues
    { source: "MR-45", target: "GL-123", type: "closes", value: 2 },
    { source: "MR-46", target: "GL-124", type: "closes", value: 2 },
    { source: "MR-47", target: "GL-125", type: "closes", value: 2 },
    { source: "MR-48", target: "GL-126", type: "closes", value: 2 }, // Untracked work
    { source: "MR-49", target: "GL-127", type: "closes", value: 2 }, // Untracked work

    // Commits to Merge Requests
    // OAuth implementation
    { source: "commit-456", target: "MR-45", type: "part_of", value: 1 },
    { source: "commit-457", target: "MR-45", type: "part_of", value: 1 },
    { source: "commit-458", target: "MR-45", type: "part_of", value: 1 },
    // 2FA implementation
    { source: "commit-459", target: "MR-46", type: "part_of", value: 1 },
    { source: "commit-460", target: "MR-46", type: "part_of", value: 1 },
    // Profile features
    { source: "commit-461", target: "MR-47", type: "part_of", value: 1 },
    { source: "commit-462", target: "MR-47", type: "part_of", value: 1 },
    // Untracked work
    { source: "commit-463", target: "MR-48", type: "part_of", value: 1 },
    { source: "commit-464", target: "MR-49", type: "part_of", value: 1 },
    { source: "commit-465", target: "GL-128", type: "closes", value: 1 }, // Direct commit to issue

    // User Assignments - GitLab Issues
    { source: "francisrj2-GL", target: "GL-123", type: "assigned", value: 2 },
    { source: "francisrj2-GL", target: "GL-124", type: "assigned", value: 2 },
    { source: "batesdd-GL", target: "GL-125", type: "assigned", value: 2 },
    { source: "coronacj-GL", target: "GL-126", type: "assigned", value: 2 }, // Untracked work
    { source: "smithj-GL", target: "GL-127", type: "assigned", value: 2 }, // Untracked work
    { source: "smithj-GL", target: "GL-128", type: "assigned", value: 2 }, // Untracked work

    // Commit Authors
    { source: "francisrj2-GL", target: "commit-456", type: "authored", value: 1 },
    { source: "francisrj2-GL", target: "commit-457", type: "authored", value: 1 },
    { source: "francisrj2-GL", target: "commit-458", type: "authored", value: 1 },
    { source: "francisrj2-GL", target: "commit-459", type: "authored", value: 1 },
    { source: "francisrj2-GL", target: "commit-460", type: "authored", value: 1 },
    { source: "batesdd-GL", target: "commit-461", type: "authored", value: 1 },
    { source: "batesdd-GL", target: "commit-462", type: "authored", value: 1 },
    { source: "coronacj-GL", target: "commit-463", type: "authored", value: 1 },
    { source: "smithj-GL", target: "commit-464", type: "authored", value: 1 },
    { source: "smithj-GL", target: "commit-465", type: "authored", value: 1 }
  ]
};

function TaskCorrelationChart() {
  const containerRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<any>();
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  // Use sample data directly instead of empty initial state
  const [graphData, setGraphData] = useState<GraphData>(sampleGraphData);
  // Remove loading state since we're using static data
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const updateDimensions = () => {
      const width = window?.innerWidth || 800;
      const height = window?.innerHeight || 600;
      setDimensions({ width, height });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Remove loading check since we're using static data
  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#1e1e1e]">
      <header className="absolute top-0 left-0 right-0 z-10 px-8 py-6">
        <div className="flex justify-center items-center">
          <h1 className="text-2xl font-bold text-zinc-100">Task Correlation Analysis</h1>
        </div>
        <p className="mt-2 text-center text-sm text-zinc-400">
          Visualizing the relationship between GitLab and Jira tasks
        </p>
        <p className="mt-1 text-center text-xs text-zinc-500">
          Outliers indicate potential tracking inconsistencies between platforms
        </p>
      </header>

      <main className="h-screen w-screen">
        <div ref={containerRef} className="h-full w-full">
          <ForceGraph2D
            ref={fgRef}
            graphData={graphData}
            nodeColor={(node: any) => {
              switch (node.group) {
                case 'gitlab_issue':
                  return '#f97316'; // orange-500
                case 'gitlab_merge_request':
                  return '#71717a'; // zinc-500
                case 'gitlab_commit':
                  return '#22c55e'; // green-500
                case 'gitlab':
                  return '#22c55e'; // green-500
                case 'jira':
                  return '#3b82f6'; // blue-500
                case 'jira_issue':
                  return '#3b82f6'; // blue-500
                default:
                  return '#e4e4e7'; // zinc-200
              }
            }}
            nodeLabel={(node: any) => `${node.label}\n${node.title}\nStatus: ${node.status}`}
            linkColor={(link: any) => link.type === 'regular' ? '#22c55e80' : '#3b82f680'}
            backgroundColor="#1e1e1e"
            width={dimensions.width}
            height={dimensions.height}
            nodeRelSize={6}
            linkWidth={1.5}
            linkDirectionalParticles={4}
            linkDirectionalParticleSpeed={0.003}
            d3VelocityDecay={0.4}
            cooldownTime={1500}
            d3AlphaDecay={0.01}
            onNodeClick={(node: any) => {
              fgRef.current.centerAt(node.x, node.y, 1000);
              fgRef.current.zoom(2.5, 1000);
            }}
            minZoom={0.5}
            maxZoom={5}
            d3Force={(d3) => {
              d3.force('charge').strength(-8);
              d3.force('link').distance(8).strength(3);
              d3.force('center').strength(2);
              d3.force('collide').strength(0.3).radius(3);
            }}
            nodeCanvasObject={(node: any, ctx: any, globalScale: number) => {
              const label = node.label;
              const fontSize = globalScale < 1.5 ? 4 : 5;
              ctx.font = `${fontSize}px Inter`;
              ctx.fillStyle = node.group === 'gitlab' ? '#22c55e' : '#3b82f6';
              ctx.beginPath();
              ctx.arc(node.x, node.y, 3.5, 0, 2 * Math.PI);
              ctx.fill();
              ctx.fillStyle = '#e4e4e7';
              ctx.textAlign = 'center';
              ctx.fillText(label, node.x, node.y + 8);
            }}
          />
        </div>
      </main>
    </div>
  );
}

export default TaskCorrelationChart;


