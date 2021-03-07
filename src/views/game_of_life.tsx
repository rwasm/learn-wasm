import React, { useRef, useEffect } from 'react';
import init, { Universe } from '@rsw/game-of-life';


export default function ChasmPage() {
  const preRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    (async () => {
      await init();
      const universe = Universe.new();

      const renderLoop = () => {
        if (preRef.current) {
          preRef.current.textContent = universe.render();

          universe.tick();
          requestAnimationFrame(renderLoop);
        }
      };
      renderLoop();
    })()
  }, [])


  return (
    <div className="game-of-life-page">
      <pre ref={preRef} id="game-of-life" />
    </div>
  );
}
