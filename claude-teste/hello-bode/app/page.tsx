"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Navbar from './components/Navbar';

// Conjunto de cores disponíveis para as bolas
const availableColors = [
  "from-blue-400 to-cyan-400",
  "from-pink-400 to-rose-400",
  "from-purple-400 to-indigo-400",
  "from-green-400 to-emerald-400",
  "from-yellow-400 to-orange-400",
  "from-red-400 to-pink-400",
  "from-indigo-400 to-purple-400",
  "from-teal-400 to-cyan-400",
  "from-orange-400 to-red-400",
  "from-lime-400 to-green-400",
];

interface Ball {
  id: number;
  color: string;
}

interface DragState {
  index: number;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
}

export default function Home() {
  // Estado inicial das 3 bolas
  const [balls, setBalls] = useState<Ball[]>([
    { id: 1, color: "from-blue-400 to-cyan-400" },
    { id: 2, color: "from-pink-400 to-rose-400" },
    { id: 3, color: "from-purple-400 to-indigo-400" },
  ]);

  const [dragState, setDragState] = useState<DragState | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const ballRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafIdRef = useRef<number | null>(null);
  const lastMousePosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Função para gerar uma cor aleatória diferente da atual
  const getRandomColor = (currentColor: string): string => {
    const otherColors = availableColors.filter((c) => c !== currentColor);
    return otherColors[Math.floor(Math.random() * otherColors.length)];
  };

  // Quando começa a arrastar
  const handleMouseDown = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    setDragState({
      index,
      startX: e.clientX,
      startY: e.clientY,
      currentX: 0,
      currentY: 0,
    });
  };

  // Enquanto arrasta (otimizado com RAF)
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (dragState?.index === null || dragState === null) return;

    // Store latest mouse position
    lastMousePosition.current = { x: e.clientX, y: e.clientY };

    // Cancel previous frame request
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
    }

    // Schedule update for next frame
    rafIdRef.current = requestAnimationFrame(() => {
      const { x, y } = lastMousePosition.current;
      const deltaX = x - dragState.startX;
      const deltaY = y - dragState.startY;

      setDragState(prev => ({
        ...prev!,
        currentX: deltaX,
        currentY: deltaY,
      }));

      // Collision detection (optimized)
      let collisionDetected = false;
      balls.forEach((ball, index) => {
        if (index === dragState.index || !ballRefs.current[index]) return;

        const rect = ballRefs.current[index]!.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.hypot(x - centerX, y - centerY);

        if (distance < rect.width && !collisionDetected) {
          setHoveredIndex(index);
          collisionDetected = true;
        }
      });

      if (!collisionDetected) {
        setHoveredIndex(null);
      }

      rafIdRef.current = null;
    });
  }, [dragState, balls]);

  // Quando solta a bola
  const handleMouseUp = useCallback(() => {
    if (!dragState) return;

    if (hoveredIndex !== null && hoveredIndex !== dragState.index) {
      // Cria uma cópia do array de bolas
      const newBalls = [...balls];

      // Troca as posições
      [newBalls[dragState.index], newBalls[hoveredIndex]] = [
        newBalls[hoveredIndex],
        newBalls[dragState.index],
      ];

      // Muda a cor da bola que foi arrastada (agora na nova posição)
      newBalls[hoveredIndex] = {
        ...newBalls[hoveredIndex],
        color: getRandomColor(newBalls[hoveredIndex].color),
      };

      setBalls(newBalls);
    }

    setDragState(null);
    setHoveredIndex(null);
  }, [dragState, hoveredIndex, balls]);

  // Adicionar e remover event listeners
  useEffect(() => {
    if (dragState) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
        if (rafIdRef.current !== null) {
          cancelAnimationFrame(rafIdRef.current);
        }
      };
    }
  }, [dragState, handleMouseMove, handleMouseUp]);

  return (
    <main className="min-h-screen flex flex-col bg-black overflow-hidden">
      <Navbar />
      {/* Futuristic animated background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-black to-purple-950 opacity-80" />

        {/* Animated grid */}
        <div className="absolute inset-0 grid-background opacity-30" />

        {/* Glowing orbs */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20 animate-pulse-slow" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-20 animate-pulse-slow animation-delay-2000" />

        {/* Scan lines */}
        <div className="absolute inset-0 scan-lines opacity-10" />
      </div>

      {/* Main content with relative positioning */}
      <div className="relative z-10 flex-1 flex items-center justify-center">
        <div className="text-center p-8 bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20">
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent animate-pulse">
          Hello Bode, from Claudinho Code!
        </h1>
        <div className="flex justify-center gap-4 mt-8 relative">
          {balls.map((ball, index) => {
            const isDragging = dragState?.index === index;
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={ball.id}
                ref={(el) => (ballRefs.current[index] = el)}
                onMouseDown={(e) => handleMouseDown(index, e)}
                className={`w-16 h-16 rounded-full bg-gradient-to-r ${ball.color} cursor-move transition-all duration-300 ${
                  isDragging ? "z-50 scale-110" : "animate-bounce"
                } ${isHovered ? "scale-90 opacity-50" : ""} ${
                  index === 1 && !isDragging ? "delay-100" : ""
                } ${index === 2 && !isDragging ? "delay-200" : ""}`}
                style={{
                  transform: isDragging
                    ? `translate(${dragState.currentX}px, ${dragState.currentY}px) scale(1.1)`
                    : undefined,
                  position: isDragging ? "relative" : "static",
                  boxShadow: isDragging ? "0 10px 40px rgba(0,0,0,0.3)" : undefined,
                }}
              />
            );
          })}
        </div>
        <p className="text-white/70 text-sm mt-4">
          Arraste as bolas para trocar de posição e mudar suas cores!
        </p>
        </div>
      </div>
      <style jsx global>{`
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(1.1);
          }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 8s ease infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .grid-background {
          background-image:
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: grid-move 20s linear infinite;
        }

        @keyframes grid-move {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(50px, 50px);
          }
        }

        .scan-lines {
          background: repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.15),
            rgba(0, 0, 0, 0.15) 1px,
            transparent 1px,
            transparent 2px
          );
        }

        .delay-100 {
          animation-delay: 0.1s;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </main>
  );
}
