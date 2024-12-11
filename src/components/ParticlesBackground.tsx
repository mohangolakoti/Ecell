import { useCallback } from "react";
import type { Container, Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";
import { useEffect, useState } from "react";

export function ParticlesBackground() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    setInit(true);
  }, []);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  if (!init) return null;

  return (
    <div className="absolute inset-0">
      {typeof window !== 'undefined' && (
        // @ts-ignore - Type issues with tsparticles
        <tsparticles
          init={particlesInit}
          options={{
            background: {
              color: {
                value: "#000000",
              },
            },
            fpsLimit: 120,
            particles: {
              color: {
                value: ["#9c27b0", "#e91e63", "#00bcd4"],
              },
              links: {
                color: "#ffffff",
                distance: 150,
                enable: true,
                opacity: 0.2,
                width: 1,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "bounce",
                },
                random: false,
                speed: 1,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                },
                value: 80,
              },
              opacity: {
                value: 0.5,
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 1, max: 3 },
              },
            },
            detectRetina: true,
          }}
        />
      )}
    </div>
  );
}