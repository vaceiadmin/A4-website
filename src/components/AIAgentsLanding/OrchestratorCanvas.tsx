"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Play, Pause, ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface OrchestratorProps {
  namespace: "accounting" | "business";
}

const AGENTS = [
  { name: 'Penny', role: 'Planning', color: '#18181b', emoji: '🗺️', angle: -90 },
  { name: 'Rika', role: 'Risk Assess.', color: '#EF4444', emoji: '🔍', angle: -45 },
  { name: 'Felix', role: 'Fieldwork', color: '#10B981', emoji: '🔬', angle: 0 },
  { name: 'Glex', role: 'GL Anomaly', color: '#F59E0B', emoji: '🧮', angle: 45 },
  { name: 'Cleo', role: 'Completion', color: '#8B5CF6', emoji: '✅', angle: 90 },
  { name: 'Remy', role: 'Reporting', color: '#06B6D4', emoji: '📄', angle: 135 },
  { name: 'Comi', role: 'Comms', color: '#EC4899', emoji: '💬', angle: 180 },
  { name: 'Coda', role: 'Compliance', color: '#14B8A6', emoji: '🛡️', angle: 225 },
];

interface StepType {
  title: string;
  desc: string;
  active: number[];
  highlight: 'orchestrator' | 'all';
  pulseOrch?: boolean;
  beam?: number[];
}

const STEPS: StepType[] = [
  {
    title: 'Engagement received',
    desc: 'Your firm opens an engagement in the portal. The Orchestrator Agent instantly receives the brief — client name, materiality, prior year file, and deadline.',
    active: [],
    highlight: 'orchestrator',
    pulseOrch: true
  },
  {
    title: 'Orchestrator dispatches Planning',
    desc: 'The Orchestrator analyses the brief and activates Penny — the Audit Planning Agent — first. Penny produces the audit strategy, materiality calculations, and PBC list.',
    active: [0],
    highlight: 'orchestrator',
    beam: [0]
  },
  {
    title: 'Risk assessment activated',
    desc: 'With the plan approved, the Orchestrator dispatches Rika to perform the risk assessment — mapping every ISA 315 risk to audit assertions before fieldwork begins.',
    active: [0, 1],
    highlight: 'orchestrator',
    beam: [1]
  },
  {
    title: 'Parallel specialist deployment',
    desc: 'The Orchestrator simultaneously activates Felix (Fieldwork), Glex (GL Anomaly), Comi (Communications), and Cleo (Completion) — each working their area concurrently.',
    active: [0, 1, 2, 3, 4, 6],
    highlight: 'orchestrator',
    beam: [2, 3, 4, 6]
  },
  {
    title: 'Reporting & compliance finalised',
    desc: 'Remy drafts the audit report and management letter. The Orchestrator then activates Coda — the Compliance Agent — to review the completed file against ISAs and ISQM.',
    active: [0, 1, 2, 3, 4, 5, 6, 7],
    highlight: 'orchestrator',
    beam: [5, 7]
  },
  {
    title: 'Complete file delivered',
    desc: 'The Orchestrator consolidates all agent outputs into a single indexed audit file and delivers it to your partner portal. Your team reviews, applies judgement, and signs off.',
    active: [0, 1, 2, 3, 4, 5, 6, 7],
    highlight: 'all',
    beam: []
  }
];

const OrchestratorCanvas = ({ namespace }: OrchestratorProps) => {
  const { t } = useTranslation(namespace);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0, CX = 0, CY = 0, OR = 0, ORCH_R = 0, AGENT_R = 0;
    let animFrame: number;
    let playing = isPlaying;
    let localStep = currentStep;
    
    let pulseT = 0;
    let stepT = 0; 
    const STEP_DURATION = 3200; 
    let lastTime: number | null = null;
    let beamParticles: any[] = [];
    let autoPlayTimer: NodeJS.Timeout | null = null;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      const dpr = window.devicePixelRatio || 1;
      W = Math.min(rect.width, 1020);
      H = W * 0.58;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + 'px';
      canvas.style.height = H + 'px';
      ctx.scale(dpr, dpr);
      CX = W / 2; CY = H / 2;
      OR = Math.min(W, H) * 0.36;
      ORCH_R = Math.min(W, H) * 0.12;
      AGENT_R = Math.min(W, H) * 0.075;
    };

    window.addEventListener("resize", resize);
    resize();

    const agentPos = (a: any) => {
      const rad = (a.angle - 90) * Math.PI / 180;
      return { x: CX + OR * Math.cos(rad), y: CY + OR * Math.sin(rad) };
    };

    const drawRing = (x: number, y: number, r: number, color: string, alpha: number, lw: number) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.strokeStyle = color;
      ctx.lineWidth = lw;
      ctx.stroke();
      ctx.restore();
    };

    const drawConnector = (x1: number, y1: number, x2: number, y2: number, color: string, alpha: number, lw: number, dashed: boolean) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = color;
      ctx.lineWidth = lw;
      if (dashed) ctx.setLineDash([6, 8]);
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();
    };

    const drawText = (text: string, x: number, y: number, size: number, color: string, alpha: number, weight: string | number = 400) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      ctx.font = `${weight} ${size}px 'Inter', sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, x, y);
      ctx.restore();
    };

    const spawnBeamParticles = (agentIdx: number) => {
      const a = AGENTS[agentIdx];
      for (let i = 0; i < 12; i++) {
        const t = i / 12;
        beamParticles.push({
          agentIdx,
          t: t * 0.6,
          speed: 0.018 + Math.random() * 0.012,
          size: 3 + Math.random() * 3,
          color: a.color,
          done: false
        });
      }
    };

    const drawBeamParticle = (p: any) => {
      const a = AGENTS[p.agentIdx];
      const pos = agentPos(a);
      const x = CX + (pos.x - CX) * p.t;
      const y = CY + (pos.y - CY) * p.t;
      ctx.save();
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 12;
      ctx.globalAlpha = Math.sin(p.t * Math.PI) * 0.9;
      ctx.beginPath();
      ctx.arc(x, y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
      ctx.restore();
    };

    const draw = (ts: number) => {
      if (!lastTime) lastTime = ts;
      const dt = ts - lastTime;
      lastTime = ts;
      pulseT += dt * 0.001;
      stepT = Math.min(stepT + dt / STEP_DURATION, 1);

      ctx.clearRect(0, 0, W, H);

      const step = STEPS[localStep];

      // BG grid
      ctx.save();
      ctx.globalAlpha = 0.04;
      ctx.strokeStyle = 'rgba(0,0,0,0.15)';
      ctx.lineWidth = 0.5;
      for (let x = 0; x < W; x += 52) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (let y = 0; y < H; y += 52) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
      ctx.restore();

      // Orbits
      drawRing(CX, CY, OR, '#18181b', 0.08, 1);
      drawRing(CX, CY, OR * 1.12, '#18181b', 0.04, 0.5);
      drawRing(CX, CY, OR * 0.6, '#18181b', 0.05, 0.5);

      const orbitAngle = pulseT * 0.8;
      ctx.save();
      ctx.globalAlpha = 0.6;
      ctx.shadowColor = 'rgba(0,0,0,0.15)';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(CX + OR * Math.cos(orbitAngle), CY + OR * Math.sin(orbitAngle), 3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,0,0,0.15)';
      ctx.fill();
      ctx.restore();

      // Connectors
      AGENTS.forEach((a, i) => {
        const pos = agentPos(a);
        const isActive = step.active.includes(i);
        const alpha = isActive ? 0.35 : 0.08;
        drawConnector(CX, CY, pos.x, pos.y, isActive ? a.color : 'rgba(0,0,0,0.15)', alpha, isActive ? 1.5 : 0.5, !isActive);
      });

      // Beams
      beamParticles = beamParticles.filter(p => !p.done);
      beamParticles.forEach(p => {
        p.t += p.speed;
        if (p.t >= 1) p.done = true;
        else drawBeamParticle(p);
      });

      // Agents
      AGENTS.forEach((a, i) => {
        const pos = agentPos(a);
        const isActive = step.active.includes(i);
        const isBeaming = step.beam && step.beam.includes(i);

        if (isActive) {
          const pulse = 0.5 + 0.5 * Math.sin(pulseT * 2 + i);
          drawRing(pos.x, pos.y, AGENT_R + 8 + pulse * 6, a.color, 0.15 + pulse * 0.1, 1);
        }

        ctx.save();
        ctx.shadowColor = isActive ? a.color : 'transparent';
        ctx.shadowBlur = isActive ? 20 : 0;
        ctx.globalAlpha = isActive ? 1 : 0.35;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, AGENT_R, 0, Math.PI * 2);

        const grad = ctx.createRadialGradient(pos.x - AGENT_R * 0.3, pos.y - AGENT_R * 0.3, 0, pos.x, pos.y, AGENT_R);
        if (isActive) {
          grad.addColorStop(0, a.color + 'CC');
          grad.addColorStop(1, a.color + '44');
        } else {
          grad.addColorStop(0, '#ffffff');
          grad.addColorStop(1, '#f4f4f5');
        }
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.strokeStyle = isActive ? a.color : '#e4e4e7';
        ctx.lineWidth = isActive ? 2 : 1;
        ctx.stroke();
        ctx.restore();

        ctx.save();
        ctx.globalAlpha = isActive ? 1 : 0.3;
        ctx.font = `${AGENT_R * 0.7}px serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(a.emoji, pos.x, pos.y - AGENT_R * 0.1);
        ctx.restore();

        const labelY = pos.y + AGENT_R + 14;
        drawText(a.name, pos.x, labelY, Math.max(10, AGENT_R * 0.55), isActive ? '#18181b' : '#a1a1aa', 1, 600);
        drawText(a.role, pos.x, labelY + Math.max(12, AGENT_R * 0.6), Math.max(9, AGENT_R * 0.42), isActive ? a.color : '#d4d4d8', 1, 400);

        if (isBeaming) {
          ctx.save();
          const shimmerAlpha = 0.4 + 0.4 * Math.sin(pulseT * 6 + i);
          ctx.globalAlpha = shimmerAlpha;
          ctx.strokeStyle = '#18181b';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, AGENT_R + 4, -Math.PI / 2, -Math.PI / 2 + Math.PI * (stepT * 1.5 % 1) * 2);
          ctx.stroke();
          ctx.restore();
        }
      });

      // Orchestrator
      const orchPulse = 0.5 + 0.5 * Math.sin(pulseT * 1.5);
      const isHighlightAll = step.highlight === 'all';

      ctx.save();
      ctx.globalAlpha = 0.08 + orchPulse * 0.06;
      ctx.strokeStyle = '#18181b';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(CX, CY, ORCH_R * 1.5 + orchPulse * 8, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(CX, CY, ORCH_R * 1.8 + orchPulse * 6, 0, Math.PI * 2); ctx.stroke();
      ctx.restore();

      ctx.save();
      ctx.shadowColor = isHighlightAll ? 'rgba(74,222,128,0.5)' : 'rgba(0,0,0,0.08)';
      ctx.shadowBlur = 30 + orchPulse * 20;
      const og = ctx.createRadialGradient(CX - ORCH_R * 0.2, CY - ORCH_R * 0.2, 0, CX, CY, ORCH_R);
      if (isHighlightAll) {
        og.addColorStop(0, '#f0fdf4');
        og.addColorStop(0.5, '#bbf7d0');
        og.addColorStop(1, '#4ade80');
      } else {
        og.addColorStop(0, '#ffffff');
        og.addColorStop(0.5, '#f4f4f5');
        og.addColorStop(1, '#e4e4e7');
      }
      ctx.beginPath();
      ctx.arc(CX, CY, ORCH_R, 0, Math.PI * 2);
      ctx.fillStyle = og;
      ctx.fill();
      ctx.strokeStyle = isHighlightAll ? '#4ADE80' : 'rgba(0,0,0,0.05)';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();

      ctx.save();
      ctx.globalAlpha = 0.5;
      ctx.strokeStyle = 'rgba(0,0,0,0.15)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 6]);
      ctx.translate(CX, CY);
      ctx.rotate(pulseT * 0.6);
      ctx.beginPath();
      ctx.arc(0, 0, ORCH_R + 6, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      const orchFontSize = Math.max(11, ORCH_R * 0.28);
      drawText('⚡', CX, CY - ORCH_R * 0.22, ORCH_R * 0.5, '#18181b', 1);
      drawText('ORCHESTRATOR', CX, CY + ORCH_R * 0.22, orchFontSize, '#18181b', 1, 800);
      drawText('AGENT', CX, CY + ORCH_R * 0.5, orchFontSize * 0.85, isHighlightAll ? '#166534' : '#71717a', 1, 600);

      if (isHighlightAll) {
        const burst = stepT;
        for (let i = 0; i < 8; i++) {
          const angle = (i / 8) * Math.PI * 2 + pulseT * 0.3;
          const r = ORCH_R * (1.4 + burst * 0.6);
          const x = CX + r * Math.cos(angle);
          const y = CY + r * Math.sin(angle);
          ctx.save();
          ctx.globalAlpha = (1 - burst) * 0.6;
          ctx.shadowColor = '#4ADE80';
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(x, y, 3, 0, Math.PI * 2);
          ctx.fillStyle = '#4ADE80';
          ctx.fill();
          ctx.restore();
        }
      }

      animFrame = requestAnimationFrame(draw);
    };

    animFrame = requestAnimationFrame(draw);

    const runStepLogic = (idx: number) => {
      stepT = 0;
      beamParticles = [];
      const st = STEPS[idx];
      if (st.beam) {
        st.beam.forEach(b => spawnBeamParticles(b));
      }
    };

    const nextStep = () => {
      localStep = (localStep + 1) % STEPS.length;
      setCurrentStep(localStep);
      runStepLogic(localStep);
    };

    if (playing) {
      autoPlayTimer = setInterval(nextStep, STEP_DURATION + 600);
    }

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animFrame);
      if (autoPlayTimer) clearInterval(autoPlayTimer);
    };
  }, [isPlaying]);

  return (
    <section id="how" className="relative z-10 py-32 border-t border-zinc-200 overflow-hidden bg-white">
      <div className="text-center px-6 mb-16">
        <div className="inline-flex items-center gap-2.5 mb-4">
          <div className="w-7 h-[2px] bg-zinc-400 rounded-full" />
          <span className="text-[11px] font-bold tracking-widest uppercase text-zinc-500">
            {t("how.eyebrow")}
          </span>
          <div className="w-7 h-[2px] bg-zinc-400 rounded-full" />
        </div>
        <h2 className="font-sora text-[clamp(34px,4.5vw,56px)] font-extrabold tracking-tight leading-[1.08] text-zinc-900 mb-3">
          {t("how.titleLine1")} <span className="text-zinc-500">{t("how.titleHighlight")}</span>
        </h2>
        <p className="text-base font-normal text-zinc-600 leading-relaxed max-w-xl mx-auto">
          {t("how.sub")}
        </p>
      </div>

      <div className="relative w-full max-w-[1100px] mx-auto px-10">
        <canvas ref={canvasRef} className="w-full block rounded-3xl" />

        <div className="text-center mt-8 min-h-[72px] px-10">
          <div className="inline-block text-[10px] font-bold tracking-widest uppercase py-1 px-3.5 rounded-full bg-zinc-100 text-zinc-600 mb-2.5 border border-zinc-200">
            Step {currentStep + 1} of {STEPS.length}
          </div>
          <div className="font-sora text-xl font-bold text-zinc-900 mb-1.5 tracking-tight">
            {STEPS[currentStep].title}
          </div>
          <div className="text-sm font-light text-zinc-900/50 leading-relaxed max-w-2xl mx-auto min-h-[48px]">
            {STEPS[currentStep].desc}
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === currentStep ? "w-6 bg-zinc-800" : "w-1.5 bg-zinc-300"
              )}
            />
          ))}
        </div>

        <div className="flex justify-center gap-3 mt-6">
          <button 
            onClick={() => {
              setCurrentStep(s => (s - 1 + STEPS.length) % STEPS.length);
              setIsPlaying(false);
            }}
            className="w-10 h-10 rounded-full bg-zinc-50 border border-zinc-200 text-zinc-500 flex items-center justify-center transition-colors hover:bg-zinc-100 hover:text-zinc-900"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-7 h-10 rounded-full bg-zinc-900 text-white font-sora text-xs font-bold tracking-wider flex items-center gap-2 transition-all hover:bg-black hover:shadow-md"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            {isPlaying ? "PAUSE" : "PLAY"}
          </button>

          <button 
            onClick={() => {
              setCurrentStep(s => (s + 1) % STEPS.length);
              setIsPlaying(false);
            }}
            className="w-10 h-10 rounded-full bg-zinc-50 border border-zinc-200 text-zinc-500 flex items-center justify-center transition-colors hover:bg-zinc-100 hover:text-zinc-900"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default OrchestratorCanvas;
