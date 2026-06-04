import { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import Overlay from "./Overlay";

export default function ScrollyCanvas({ frameCount = 75 }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  const [images, setImages] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // LOAD IMAGES
  useEffect(() => {
    const loadImages = async () => {
      const loadedImages = [];
      const promises = [];

      for (let i = 0; i < frameCount; i++) {
        const promise = new Promise((resolve) => {
          const img = new Image();

          const frameId = i.toString().padStart(4, "0");

          img.src = `/sequence/${frameId}.png`;

          img.onload = () => {
            loadedImages[i] = img;
            resolve();
          };

          img.onerror = () => resolve();
        });

        promises.push(promise);
      }

      await Promise.all(promises);

      setImages(loadedImages);
      setIsLoaded(true);
    };

    loadImages();
  }, [frameCount]);

  // RENDER FRAME
  const renderFrame = (index) => {
    const canvas = canvasRef.current;

    if (!canvas || !images[index]) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const img = images[index];

    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;

    let drawWidth;
    let drawHeight;
    let offsetX;
    let offsetY;

    // KEEP ORIGINAL FRAME POSITION
    if (imgRatio > canvasRatio) {
      drawHeight = canvas.height;
      drawWidth = img.width * (canvas.height / img.height);

      offsetX = (canvas.width - drawWidth) / 2;
      offsetY = 0;
    } else {
      drawWidth = canvas.width;
      drawHeight = img.height * (canvas.width / img.width);

      offsetX = 0;
      offsetY = (canvas.height - drawHeight) / 2;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#121212";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // SCROLL FRAME CHANGE
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!isLoaded || images.length === 0) return;

    const frameIndex = Math.min(
      frameCount - 1,
      Math.floor(latest * frameCount)
    );

    requestAnimationFrame(() => renderFrame(frameIndex));
  });

  // RESPONSIVE
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#121212]"
    >
      {/* STICKY SECTION */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* TOP RUFFLE */}
        <div className="absolute top-0 left-0 w-full z-50 rotate-180">
          <svg
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            className="w-full h-7 md:h-9"
          >
            <path
              fill="#fd3f5a"
              d="
                M0,60
                C25,35 50,35 75,60
                C100,85 125,85 150,60
                C175,35 200,35 225,60
                C250,85 275,85 300,60
                C325,35 350,35 375,60
                C400,85 425,85 450,60
                C475,35 500,35 525,60
                C550,85 575,85 600,60
                C625,35 650,35 675,60
                C700,85 725,85 750,60
                C775,35 800,35 825,60
                C850,85 875,85 900,60
                C925,35 950,35 975,60
                C1000,85 1025,85 1050,60
                C1075,35 1100,35 1125,60
                C1150,85 1175,85 1200,60
                C1225,35 1250,35 1275,60
                C1300,85 1325,85 1350,60
                C1375,35 1400,35 1440,60
                L1440,120
                L0,120
                Z
              "
            />
          </svg>
        </div>

        {/* LEFT RUFFLE */}
        <div className="absolute left-0 top-0 h-full z-50 rotate-90 origin-top-left">
          <svg
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            className="h-7 md:h-9 w-screen"
          >
            <path
              fill="#fd3f5a"
              d="
                M0,60
                C25,35 50,35 75,60
                C100,85 125,85 150,60
                C175,35 200,35 225,60
                C250,85 275,85 300,60
                C325,35 350,35 375,60
                C400,85 425,85 450,60
                C475,35 500,35 525,60
                C550,85 575,85 600,60
                C625,35 650,35 675,60
                C700,85 725,85 750,60
                C775,35 800,35 825,60
                C850,85 875,85 900,60
                C925,35 950,35 975,60
                C1000,85 1025,85 1050,60
                C1075,35 1100,35 1125,60
                C1150,85 1175,85 1200,60
                C1225,35 1250,35 1275,60
                C1300,85 1325,85 1350,60
                C1375,35 1400,35 1440,60
                L1440,120
                L0,120
                Z
              "
            />
          </svg>
        </div>

        {/* RIGHT RUFFLE */}
        <div className="absolute right-0 top-0 h-full z-50 -rotate-90 origin-top-right">
          <svg
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            className="h-7 md:h-9 w-screen"
          >
            <path
              fill="#fd3f5a"
              d="
                M0,60
                C25,35 50,35 75,60
                C100,85 125,85 150,60
                C175,35 200,35 225,60
                C250,85 275,85 300,60
                C325,35 350,35 375,60
                C400,85 425,85 450,60
                C475,35 500,35 525,60
                C550,85 575,85 600,60
                C625,35 650,35 675,60
                C700,85 725,85 750,60
                C775,35 800,35 825,60
                C850,85 875,85 900,60
                C925,35 950,35 975,60
                C1000,85 1025,85 1050,60
                C1075,35 1100,35 1125,60
                C1150,85 1175,85 1200,60
                C1225,35 1250,35 1275,60
                C1300,85 1325,85 1350,60
                C1375,35 1400,35 1440,60
                L1440,120
                L0,120
                Z
              "
            />
          </svg>
        </div>

        {/* BOTTOM RUFFLE */}
        <div className="absolute bottom-0 left-0 w-full z-50">
          <svg
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            className="w-full h-7 md:h-9"
          >
            <path
              fill="#fd3f5a"
              d="
                M0,60
                C25,35 50,35 75,60
                C100,85 125,85 150,60
                C175,35 200,35 225,60
                C250,85 275,85 300,60
                C325,35 350,35 375,60
                C400,85 425,85 450,60
                C475,35 500,35 525,60
                C550,85 575,85 600,60
                C625,35 650,35 675,60
                C700,85 725,85 750,60
                C775,35 800,35 825,60
                C850,85 875,85 900,60
                C925,35 950,35 975,60
                C1000,85 1025,85 1050,60
                C1075,35 1100,35 1125,60
                C1150,85 1175,85 1200,60
                C1225,35 1250,35 1275,60
                C1300,85 1325,85 1350,60
                C1375,35 1400,35 1440,60
                L1440,120
                L0,120
                Z
              "
            />
          </svg>
        </div>

        {/* CANVAS */}
        <canvas ref={canvasRef} className="w-full h-full block" />

        {/* OVERLAY */}
        <Overlay scrollYProgress={scrollYProgress} />
      </div>

      {/* SCROLL HEIGHT */}
      <div style={{ height: `${frameCount * 4}px` }} />
    </div>
  );
}