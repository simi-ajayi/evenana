import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FadeIn, FADE_IN_DURATION_SCALE } from "./FadeIn";
import heroImage from "../../assets/hero.webp";
import evenanaWhiteText from "../../assets/evenana_white_text.png";

const HERO_ENTRANCE_DURATION = 0.55;
const HERO_NAV_REVEAL_PROGRESS = 0.7;
const HERO_NAV_REVEAL_DELAY_MS = Math.round(
  HERO_ENTRANCE_DURATION *
    FADE_IN_DURATION_SCALE *
    HERO_NAV_REVEAL_PROGRESS *
    1000,
);

export function PageHero({ hero, compact = false }) {
  const location = useLocation();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const pathname = location.pathname;
    const imageUrl = hero?.image;

    globalThis.__evenanaHeroBgReady = globalThis.__evenanaHeroBgReady || {};
    const readyMap = globalThis.__evenanaHeroBgReady;
    readyMap[pathname] = false;

    let imageReady = !imageUrl;
    let animationAlmostDone = false;
    let wasMarkedReady = false;

    const markReady = () => {
      if (wasMarkedReady || !imageReady || !animationAlmostDone) return;
      wasMarkedReady = true;
      readyMap[pathname] = true;
      window.dispatchEvent(
        new CustomEvent("evenana:hero-bg-loaded", {
          detail: { pathname },
        }),
      );
    };

    const animationTimerId = window.setTimeout(() => {
      animationAlmostDone = true;
      markReady();
    }, HERO_NAV_REVEAL_DELAY_MS);

    let img;
    if (imageUrl) {
      img = new Image();
      img.onload = () => {
        imageReady = true;
        markReady();
      };
      img.onerror = () => {
        imageReady = true;
        markReady();
      };
      img.src = imageUrl;
    }

    return () => {
      window.clearTimeout(animationTimerId);
      if (img) {
        img.onload = null;
        img.onerror = null;
      }
    };
  }, [hero?.image, location.pathname]);

  return (
    <FadeIn
      as="section"
      duration={HERO_ENTRANCE_DURATION}
      scaleFrom={1.06}
      fade={false}
      triggerOnScroll={false}
      className={[
        "relative  overflow-hidden h-screen min-h-[100dvh] w-screen  bg-cover bg-center bg-no-repeat",
        compact
          ? "min-h-[30rem] md:min-h-[36rem]"
          : "min-h-[38rem] md:min-h-[52rem]",
      ].join(" ")}
      style={{
        backgroundImage: `url(${hero?.image || heroImage})`,
      }}
    >
      {/* Whitish veil over the background for readability/branding */}
      <div className="absolute inset-0 bg-[#42736C]/30 pointer-events-none" />
      <div className="absolute inset-0 bg-black/30 pointer-events-none" />
      <div className="absolute inset-0  flex items-center justify-center px-6 pointer-events-none">
        <img
          src={evenanaWhiteText}
          alt="EVENANA"
          className="w-[min(82vw,52rem)]  object-contain"
        />
      </div>
    </FadeIn>
  );
}
