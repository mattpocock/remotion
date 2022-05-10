import React, { useCallback, useEffect, useRef } from "react";
import { TemplateModalContent } from "./TemplateModalContent";

const container: React.CSSProperties = {
  position: "fixed",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  // Higher than Docusaurus highest
  zIndex: 1000,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "row",
};

export const TemplateModal: React.FC<{
  onDismiss: () => void;
}> = ({ onDismiss }) => {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onDismiss();
      }
    };

    window.addEventListener("keyup", onKeyPress);
    return () => {
      window.removeEventListener("keyup", onKeyPress);
    };
  }, []);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (inner.current.contains(event.target as Node)) {
        return;
      }
      onDismiss();
    };

    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  return (
    <div style={container} ref={outer}>
      <div ref={inner}>
        <TemplateModalContent></TemplateModalContent>
      </div>
    </div>
  );
};
