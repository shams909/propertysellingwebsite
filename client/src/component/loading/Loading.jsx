import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import React from "react";

const Loading = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <DotLottieReact
        src="/lotties/loading.lottie"
        autoplay
        loop
        style={{ width: "100%", maxWidth: 200 }}
      />
    </div>
  );
};

export default Loading;
