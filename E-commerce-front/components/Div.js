import React, { useEffect, useState } from "react";

const Div = ({children}) => {
  const [deviceHeight, setDeviceHeight] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setDeviceHeight(window.innerHeight );
    }
  }, []);

  const style = ` grid grid-cols-1 gap-5 `

  return <div className={style}>{children}</div>;
};

export default Div;
