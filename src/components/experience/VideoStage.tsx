"use client";

import { forwardRef } from "react";

type VideoStageProps = {
  mode: "video" | "canvas";
};

export const VideoStage = forwardRef<HTMLDivElement, VideoStageProps>(function VideoStage(
  { mode },
  ref,
) {
  return (
    <div ref={ref} className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <video
        data-scrub-video
        className={`absolute inset-0 h-full w-full object-cover ${mode === "video" ? "opacity-100" : "opacity-0"}`}
        src="/video/rafael-couto.mp4"
        muted
        playsInline
        preload="none"
        controls={false}
        disablePictureInPicture
      />
      <canvas
        data-scrub-canvas
        className={`absolute inset-0 h-full w-full ${mode === "canvas" ? "opacity-100" : "opacity-0"}`}
      />
      <div className="absolute inset-0 bg-petrol/30" />
      <div className="absolute inset-0 bg-veil-video" />
    </div>
  );
});
