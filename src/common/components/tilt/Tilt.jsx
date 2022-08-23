import React, { useEffect, useRef } from "react";
import VanillaTilt from "vanilla-tilt";

export function Tilt({ options, children, ...rest }) {
  const self = useRef(null);
  useEffect(() => VanillaTilt.init(self.current, options), [options]);

  return (
    <div ref={self} {...rest}>
      {children}
    </div>
  );
}
