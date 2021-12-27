import { Progress } from "antd";
import { useEffect, useState } from "react";

const Loader = ({ onDone }: any) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(progress + 5);
      if (onDone && progress === 100) {
        clearInterval(interval);
        onDone();
      }
    }, 50);
    return () => clearInterval(interval);
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onDone, progress]);

  return (
    <div style={{ width: "100%", textAlign: "center" }}>
      <Progress type="circle" percent={progress} width={80} />
    </div>
  );
};
export default Loader;
