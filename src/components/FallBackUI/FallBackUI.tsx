import type { FC } from "react";

export const FallbackUI: FC<{ onReset?: () => void }> = ({ onReset }) => {
  return (
    <div className="error-boundary">
      <h2>Something went wrong</h2>
      <p>The application encountered an error and cannot continue.</p>
      <button onClick={onReset || (() => window.location.reload())}>
        Reload
      </button>
    </div>
  );
};
