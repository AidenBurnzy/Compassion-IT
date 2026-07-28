"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import type { NgfSiteContent } from "@/lib/ngf";

type Props = {
  content: NgfSiteContent;
};

// The globe shows all 6 "help with" entry points — the 5 dedicated service
// pages plus Break/Fix — as one repeatable NGF group (services.items).
const cards = [
  { title: "Business Continuity", description: "Enterprise-tested strategies for keeping operations running", href: "/services/business-continuity" },
  { title: "vCIO Leadership", description: "Strategic IT guidance without full-time cost", href: "/services/vcio-leadership" },
  { title: "Project Management", description: "Expert oversight for IT projects and vendors", href: "/services/vendor-project-management" },
  { title: "Remote Monitoring", description: "Proactive system protection and updates", href: "/services/remote-monitoring" },
  { title: "Cybersecurity", description: "Practical security reviews without jargon", href: "/services/cybersecurity-assessment" },
  { title: "Break/Fix Support", description: "Fast, reliable help when things go wrong", href: "/breakfix" },
];

// Ported as-is from the original compassionitconsulting.com static site
// (globe-script.js / index.html inline script), just wrapped in a React
// lifecycle instead of vanilla DOMContentLoaded/IntersectionObserver globals.
// Three.js is lazy-loaded from the same CDN URL the original site used, only
// once the section scrolls into view, to keep it off the initial bundle.
export function InteractiveGlobe({ content }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dragHintRef = useRef<HTMLDivElement>(null);
  const timelineContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let threeJsLoaded = false;
    let cleanupFns: Array<() => void> = [];
    let disposed = false;

    function loadThreeJs() {
      if (threeJsLoaded) return;
      threeJsLoaded = true;

      const existing = document.querySelector('script[data-three-cdn="1"]') as HTMLScriptElement | null;
      if (existing) {
        if ((window as unknown as { THREE?: unknown }).THREE) {
          initGlobe();
        } else {
          existing.addEventListener("load", initGlobe);
        }
        return;
      }

      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
      script.dataset.threeCdn = "1";
      script.onload = initGlobe;
      document.body.appendChild(script);
    }

    function initGlobe() {
      if (disposed) return;
      const canvasEl = canvasRef.current;
      const dragHint = dragHintRef.current;
      const timelineContainer = timelineContainerRef.current;
      if (!canvasEl || !timelineContainer) return;
      // Re-bind to a non-null const so TS keeps the narrowing inside the
      // nested closures below (onDragStart/onDragEnd etc. capture this).
      const canvas: HTMLCanvasElement = canvasEl;

      // Three.js is not an npm dependency here — it's loaded from the CDN at
      // runtime (see loadThreeJs above), same as the original static site.
      // There's no local type package to type this against, so the global is
      // treated as `any` at this single boundary rather than hand-rolling a
      // partial type declaration for the handful of THREE APIs used below.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const THREE = (window as any).THREE;
      if (!THREE) {
        console.error("Three.js not found");
        return;
      }

      const timelineItems = Array.from(timelineContainer.querySelectorAll<HTMLElement>(".timeline-item"));

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
      camera.position.z = 4.5;
      camera.position.y = 0;

      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: window.devicePixelRatio <= 1.5,
        powerPreference: "high-performance",
      });

      const container = canvas.parentElement as HTMLElement;
      const size = Math.min(container.clientWidth, container.clientHeight, 1000);
      renderer.setSize(size, size);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

      // The orbiting cards are positioned with plain CSS 3D transforms
      // (rotateY + translateZ), a completely separate coordinate system from
      // the WebGL sphere above. To make the cards actually orbit outside the
      // globe's rendered edge (with real clearance) instead of floating at an
      // arbitrary fixed distance, derive the orbit radius from the sphere's
      // real on-screen silhouette size (same camera FOV / distance / radius
      // used above) plus the card's own half-width plus a small gap (tunable
      // via ORBIT_GAP_PX — negative means a slight snug overlap with the
      // globe's edge), so the card's *near* edge clears the globe rather
      // than just its center.
      const SPHERE_RADIUS = 1.5;
      const CAMERA_Z = 4.5;
      const CAMERA_FOV_DEG = 45;
      const ORBIT_GAP_PX = -10;
      function computeOrbitRadiusPx(canvasSize: number) {
        const sphereAngle = Math.asin(SPHERE_RADIUS / CAMERA_Z);
        const halfFovRad = (CAMERA_FOV_DEG / 2) * (Math.PI / 180);
        const apparentSphereRadius = (Math.tan(sphereAngle) / Math.tan(halfFovRad)) * (canvasSize / 2);
        const cardHalfWidth = window.matchMedia("(min-width: 640px)").matches ? 96 : 80;
        const desired = apparentSphereRadius + cardHalfWidth + ORBIT_GAP_PX;
        // Clamp against the actual viewport, not the small globe sub-container
        // (the container is only 560px wide at most, but cards are allowed to
        // extend beyond its box into the section's surrounding whitespace) —
        // clamping against the container itself was the bug that made cards
        // land *inside* the globe on desktop.
        const maxSafeRadius = Math.max(120, window.innerWidth / 2 - cardHalfWidth - 16);
        return Math.min(desired, maxSafeRadius);
      }
      timelineContainer.style.setProperty("--orbit-radius", `${computeOrbitRadiusPx(size)}px`);

      const geometry = new THREE.SphereGeometry(1.5, 32, 32);
      const material = new THREE.MeshPhongMaterial({
        color: 0x8b1a1a,
        emissive: 0x4a0a0a,
        specular: 0xdc143c,
        shininess: 100,
        transparent: true,
        opacity: 0.75,
      });
      const globe = new THREE.Mesh(geometry, material);
      scene.add(globe);

      const wireframeGeo = new THREE.SphereGeometry(1.52, 16, 16);
      const wireframeMat = new THREE.MeshBasicMaterial({ color: 0xdc143c, wireframe: true, transparent: true, opacity: 0.35 });
      const wireframe = new THREE.Mesh(wireframeGeo, wireframeMat);
      scene.add(wireframe);

      scene.add(new THREE.AmbientLight(0x404040, 2));
      const pointLight1 = new THREE.PointLight(0xff6b6b, 2, 100);
      pointLight1.position.set(2, 2, 2);
      scene.add(pointLight1);
      const pointLight2 = new THREE.PointLight(0xdc143c, 1.5, 100);
      pointLight2.position.set(-2, -1, 2);
      scene.add(pointLight2);

      let rotationX = 0;
      let rotationY = 0;
      let targetRotationX = 0;
      let targetRotationY = 0;
      let isDragging = false;
      let previousMouseX = 0;
      let previousMouseY = 0;
      let velocityX = 0;
      let velocityY = 0;
      let hasDragged = false;
      let touchStartTime = 0;
      let touchStartX = 0;
      let touchStartY = 0;

      const cardCount = timelineItems.length;
      const angleStep = 360 / cardCount;
      timelineItems.forEach((item, index) => {
        item.style.setProperty("--item-angle", `${angleStep * index}deg`);
      });

      function onDragStart(e: MouseEvent | TouchEvent) {
        const target = e.target as HTMLElement;
        if (target === canvas || target.closest(".timeline-item")) {
          const isMouse = e.type.includes("mouse");
          const clientX = isMouse ? (e as MouseEvent).clientX : (e as TouchEvent).touches[0].clientX;
          const clientY = isMouse ? (e as MouseEvent).clientY : (e as TouchEvent).touches[0].clientY;

          if (isMouse) {
            isDragging = true;
            canvas.style.cursor = "grabbing";
            e.preventDefault();
          } else {
            touchStartTime = Date.now();
            touchStartX = clientX;
            touchStartY = clientY;
          }

          hasDragged = false;
          previousMouseX = clientX;
          previousMouseY = clientY;
          velocityX = 0;
          velocityY = 0;

          if (dragHint) dragHint.style.opacity = "0";
        }
      }

      function onDragMove(e: MouseEvent | TouchEvent) {
        const isMouse = e.type.includes("mouse");
        const clientX = isMouse ? (e as MouseEvent).clientX : (e as TouchEvent).touches[0].clientX;
        const clientY = isMouse ? (e as MouseEvent).clientY : (e as TouchEvent).touches[0].clientY;

        if (!isDragging && !isMouse && touchStartTime > 0) {
          const deltaX = clientX - touchStartX;
          const deltaY = clientY - touchStartY;
          const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
          if (distance > 10) {
            isDragging = true;
            hasDragged = true;
            e.preventDefault();
          } else {
            return;
          }
        }

        if (!isDragging) return;

        const deltaX = clientX - previousMouseX;
        const deltaY = clientY - previousMouseY;
        if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) hasDragged = true;

        targetRotationY += deltaX * 0.005;
        targetRotationX -= deltaY * 0.005;
        targetRotationX = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, targetRotationX));

        velocityX = -deltaY * 0.005;
        velocityY = deltaX * 0.005;

        previousMouseX = clientX;
        previousMouseY = clientY;

        const target = e.target as HTMLElement;
        if (target === canvas || target.closest(".timeline-item")) {
          e.preventDefault();
        }
      }

      function onDragEnd() {
        if (!isDragging) {
          touchStartTime = 0;
          return;
        }
        isDragging = false;
        touchStartTime = 0;
        canvas.style.cursor = "grab";
        targetRotationX += velocityX * 10;
        targetRotationY += velocityY * 10;
        targetRotationX = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, targetRotationX));
      }

      canvas.addEventListener("mousedown", onDragStart);
      document.addEventListener("mousemove", onDragMove);
      document.addEventListener("mouseup", onDragEnd);
      canvas.addEventListener("touchstart", onDragStart, { passive: false });
      document.addEventListener("touchmove", onDragMove, { passive: true });
      document.addEventListener("touchend", onDragEnd, { passive: true });

      const clickBlockers: Array<() => void> = [];
      timelineItems.forEach((item) => {
        const down = (e: Event) => onDragStart(e as MouseEvent | TouchEvent);
        const click = (e: Event) => {
          if (hasDragged) e.preventDefault();
        };
        item.addEventListener("mousedown", down);
        item.addEventListener("touchstart", down, { passive: false });
        item.addEventListener("click", click);
        clickBlockers.push(() => {
          item.removeEventListener("mousedown", down);
          item.removeEventListener("touchstart", down);
          item.removeEventListener("click", click);
        });
      });

      let lastFrameTime = 0;
      const targetFPS = 60;
      const frameInterval = 1000 / targetFPS;
      let rafId = 0;

      function animate(currentTime = 0) {
        rafId = requestAnimationFrame(animate);
        const elapsed = currentTime - lastFrameTime;
        if (elapsed < frameInterval) return;
        lastFrameTime = currentTime - (elapsed % frameInterval);

        rotationX += (targetRotationX - rotationX) * 0.1;
        rotationY += (targetRotationY - rotationY) * 0.1;

        if (!isDragging) {
          velocityX *= 0.95;
          velocityY *= 0.95;
        }

        globe.rotation.x = rotationX;
        globe.rotation.y = rotationY;
        wireframe.rotation.x = rotationX * 0.95;
        wireframe.rotation.y = rotationY * 0.95;

        if (timelineContainer) {
          const rotationXDeg = (rotationX * 180) / Math.PI;
          const rotationYDeg = (rotationY * 180) / Math.PI;
          timelineContainer.style.transform = `translate(-50%, -50%) rotateX(${rotationXDeg}deg) rotateY(${rotationYDeg}deg)`;

          timelineItems.forEach((item, index) => {
            const angle = angleStep * index;
            const adjusted = (((angle + rotationYDeg) % 360) + 540) % 360 - 180;
            const isFront = Math.abs(adjusted) <= 90;
            item.style.opacity = isFront ? "1" : "0";
            item.style.pointerEvents = isFront ? "auto" : "none";
            item.style.filter = isFront ? "none" : "blur(2px) opacity(0.25)";
          });
        }

        renderer.render(scene, camera);
      }
      animate();

      const onResize = () => {
        const newSize = Math.min(container.clientWidth, container.clientHeight, 1000);
        renderer.setSize(newSize, newSize);
        timelineContainer.style.setProperty("--orbit-radius", `${computeOrbitRadiusPx(newSize)}px`);
      };
      window.addEventListener("resize", onResize);

      cleanupFns.push(() => {
        cancelAnimationFrame(rafId);
        canvas.removeEventListener("mousedown", onDragStart);
        document.removeEventListener("mousemove", onDragMove);
        document.removeEventListener("mouseup", onDragEnd);
        canvas.removeEventListener("touchstart", onDragStart);
        document.removeEventListener("touchmove", onDragMove);
        document.removeEventListener("touchend", onDragEnd);
        clickBlockers.forEach((fn) => fn());
        window.removeEventListener("resize", onResize);
        renderer.dispose();
      });
    }

    const section = sectionRef.current;
    let observer: IntersectionObserver | null = null;
    if (section) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              loadThreeJs();
              observer?.disconnect();
            }
          });
        },
        { rootMargin: "200px" },
      );
      observer.observe(section);
    }

    return () => {
      disposed = true;
      observer?.disconnect();
      cleanupFns.forEach((fn) => fn());
      cleanupFns = [];
    };
  }, []);

  return (
    <section ref={sectionRef} className="globe-section relative py-16 md:py-24">
      <div className="section-shell !py-0 text-center">
        <h2
          data-ngf-field="servicesSection.title"
          data-ngf-label="Section Title"
          data-ngf-type="text"
          data-ngf-section="Services"
          className="text-2xl font-bold sm:text-3xl md:text-4xl"
        >
          {content["servicesSection.title"] || "What We Help With"}
        </h2>
        <p
          data-ngf-field="servicesSection.description"
          data-ngf-label="Section Description"
          data-ngf-type="textarea"
          data-ngf-section="Services"
          className="mx-auto mt-3 max-w-2xl text-white/75"
        >
          {content["servicesSection.description"] || "Practical, compassionate IT consulting across security, continuity, efficiency, and cloud."}
        </p>
      </div>

      <div className="relative mx-auto mt-12 flex h-[420px] w-full max-w-[560px] items-center justify-center sm:h-[520px] md:h-[620px]">
        <div className="relative h-full w-full">
          <canvas ref={canvasRef} className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 cursor-grab" />
          <div ref={dragHintRef} className="drag-hint pointer-events-none absolute left-1/2 top-[8%] -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-xs text-white/80 transition-opacity duration-300">
            Drag to rotate
          </div>

          <div
            ref={timelineContainerRef}
            data-ngf-group="services.items"
            data-ngf-item-label="Service"
            data-ngf-min-items="1"
            data-ngf-max-items="6"
            data-ngf-item-fields='[{"key":"name","label":"Title","type":"text"},{"key":"description","label":"Description","type":"textarea"}]'
            className="absolute left-1/2 top-1/2 h-0 w-0 [transform-style:preserve-3d]"
          >
            {cards.map((card, i) => (
              <Link
                key={card.href}
                href={card.href}
                data-index={i}
                className="timeline-item card absolute left-1/2 top-1/2 w-40 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-brand/40 bg-black/80 p-3 text-center no-underline shadow-lg backdrop-blur transition sm:w-48 sm:p-4"
                style={{
                  transform: `rotateY(var(--item-angle, 0deg)) translateZ(var(--orbit-radius, 180px))`,
                }}
              >
                <h3
                  data-ngf-field={`services.items.${i}.name`}
                  data-ngf-label="Title"
                  data-ngf-type="text"
                  data-ngf-section="Services"
                  className="text-sm font-semibold text-white sm:text-base"
                >
                  {content[`services.items.${i}.name`] || card.title}
                </h3>
                <p
                  data-ngf-field={`services.items.${i}.description`}
                  data-ngf-label="Description"
                  data-ngf-type="textarea"
                  data-ngf-section="Services"
                  className="mt-1 text-xs text-white/70 sm:text-sm"
                >
                  {content[`services.items.${i}.description`] || card.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link
          href="/contact"
          data-ngf-field="servicesSection.ctaPrimary"
          data-ngf-label="Primary CTA"
          data-ngf-type="text"
          data-ngf-section="Services"
          className="btn-brand"
        >
          {content["servicesSection.ctaPrimary"] || "Schedule Your Free Assessment"}
        </Link>
        <Link
          href="/breakfix"
          data-ngf-field="servicesSection.ctaSecondary"
          data-ngf-label="Secondary CTA"
          data-ngf-type="text"
          data-ngf-section="Services"
          className="btn-outline"
        >
          {content["servicesSection.ctaSecondary"] || "Learn About Break/Fix Support"}
        </Link>
      </div>
    </section>
  );
}
