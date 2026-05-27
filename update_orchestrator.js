const fs = require('fs');
let content = fs.readFileSync('src/components/AIAgentsLanding/OrchestratorCanvas.tsx', 'utf8');

// Replace JSX classes
content = content.replace(/bg-\\[#020205\\]/g, 'bg-zinc-50');
content = content.replace(/border-white\/5/g, 'border-zinc-200');
content = content.replace(/text-white/g, 'text-zinc-900');
content = content.replace(/text-white\/50/g, 'text-zinc-600');
content = content.replace(/bg-white\/10/g, 'bg-zinc-200');
content = content.replace(/bg-\\[#3B4EFF\\]\/20/g, 'bg-zinc-200');
content = content.replace(/text-\\[#6B8AFF\\]/g, 'text-zinc-700');
content = content.replace(/bg-\\[#3B4EFF\\]/g, 'bg-zinc-900');
content = content.replace(/border-\\[#3B4EFF\\]\/30/g, 'border-zinc-300');
content = content.replace(/border-white\/\[0\.05\]/g, 'border-zinc-200');

// Replace Canvas colors
content = content.replace(/'#6B8AFF'/g, "'rgba(0,0,0,0.15)'");
content = content.replace(/'#3B4EFF'/g, "'#18181b'");
content = content.replace(/isActive \? '#fff' : 'rgba\\(255,255,255,0.3\\)'/g, "isActive ? '#000' : 'rgba(0,0,0,0.4)'");
content = content.replace(/isActive \? a.color : 'rgba\\(255,255,255,0.2\\)'/g, "isActive ? a.color : 'rgba(0,0,0,0.4)'");
content = content.replace(/'rgba\\(30,36,80,0.9\\)'/g, "'#f4f4f5'");
content = content.replace(/'rgba\\(15,18,48,0.9\\)'/g, "'#e4e4e7'");
content = content.replace(/'rgba\\(107,138,255,0.3\\)'/g, "'rgba(0,0,0,0.1)'");
content = content.replace(/'#fff'/g, "'#18181b'");

// Keep the orchestrator circle glow bright for the white background
content = content.replace(/'rgba\\(107,138,255,0.95\\)'/g, "'rgba(24,24,27,0.95)'");
content = content.replace(/'rgba\\(59,78,255,0.85\\)'/g, "'rgba(39,39,42,0.85)'");
content = content.replace(/'rgba\\(10,14,46,0.95\\)'/g, "'rgba(9,9,11,0.95)'");
content = content.replace(/'rgba\\(59,78,255,0.8\\)'/g, "'rgba(39,39,42,0.8)'");

fs.writeFileSync('src/components/AIAgentsLanding/OrchestratorCanvas.tsx', content);
