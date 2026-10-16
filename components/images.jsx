"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gallery } from "@/lib/data";
import styles from "./images.module.css";

export default function Images() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [zoomed, setZoomed] = useState(false);
  const dialogRef = useRef(null);
  const stageRef = useRef(null);
  const touchStart = useRef(null);
  const isOpen = activeIndex !== null;
  const selected = gallery[activeIndex ?? 0];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (!dialog.open) dialog.showModal();
    return () => {
      document.body.style.overflow = previousOverflow;
      if (dialog.open) dialog.close();
    };
  }, [isOpen]);

  useEffect(() => {
    const stage = stageRef.current;
    if (stage) stage.scrollTo({ left: zoomed ? (stage.scrollWidth - stage.clientWidth) / 2 : 0, top: zoomed ? (stage.scrollHeight - stage.clientHeight) / 2 : 0 });
  }, [zoomed]);

  function move(direction) {
    setZoomed(false);
    setActiveIndex((current) => current === null ? null : (current + direction + gallery.length) % gallery.length);
  }

  function close() {
    dialogRef.current.close();
  }

  return (
    <section aria-labelledby="work-heading">
      <div className={styles.galleryHeading}>
        <h2 id="work-heading">Selected photographs</h2>
        <p>Select a photograph to view larger <span aria-hidden="true">↗</span></p>
      </div>
      <div className={styles.gallery}>
        {gallery.map((item, index) => (
          <button
            key={item.imageUrl.src}
            type="button"
            className={styles.photoButton}
            aria-haspopup="dialog"
            aria-label={`View photograph ${index + 1}: ${item.description}`}
            onClick={() => { setZoomed(false); setActiveIndex(index); }}
          >
            <Image
              src={item.imageUrl}
              alt={item.description}
              sizes="(max-width: 650px) calc(100vw - 40px), (max-width: 1216px) calc((100vw - 120px) / 2), 548px"
              quality={85}
              priority={index === 0}
              className={styles.thumbnail}
            />
            <span className={styles.enlarge} aria-hidden="true">View larger ↗</span>
          </button>
        ))}
      </div>
      <dialog
        ref={dialogRef}
        className={styles.viewer}
        aria-label="Photograph viewer"
        aria-describedby="viewer-caption"
        onClose={() => setActiveIndex(null)}
        onKeyDown={(event) => {
          if (event.key === "Tab") {
            const buttons = dialogRef.current.querySelectorAll("button:not(:disabled)");
            const first = buttons[0];
            const last = buttons[buttons.length - 1];
            if (event.shiftKey && document.activeElement === first) {
              event.preventDefault();
              last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
              event.preventDefault();
              first.focus();
            }
          }
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault();
            move(event.key === "ArrowRight" ? 1 : -1);
          }
        }}
        onClick={(event) => { if (event.target === event.currentTarget) close(); }}
      >
        {isOpen && (
          <div className={styles.viewerContent}>
            <div className={styles.viewerHeader}>
              <p>Jeremy Jakob / Selected photographs</p>
              <div className={styles.viewerActions}>
                <button type="button" className={styles.zoomButton} aria-pressed={zoomed} onClick={() => setZoomed((current) => !current)}>{zoomed ? "Zoom out" : "Zoom in"}</button>
                <button type="button" onClick={close} className={styles.closeButton} aria-label="Close photograph viewer">Close <span aria-hidden="true">×</span></button>
              </div>
            </div>
            <div
              ref={stageRef}
              className={`${styles.stage} ${zoomed ? styles.zoomed : ""}`}
              onClick={(event) => { if (event.target === event.currentTarget) close(); }}
              onPointerDown={(event) => {
                if (!zoomed && event.pointerType === "touch") touchStart.current = { x: event.clientX, y: event.clientY };
              }}
              onPointerUp={(event) => {
                const start = touchStart.current;
                touchStart.current = null;
                if (!start || event.pointerType !== "touch") return;
                const distanceX = event.clientX - start.x;
                const distanceY = event.clientY - start.y;
                if (Math.abs(distanceX) > 50 && Math.abs(distanceX) > Math.abs(distanceY)) move(distanceX < 0 ? 1 : -1);
              }}
              onPointerCancel={() => { touchStart.current = null; }}
            >
              <div className={styles.imageSurface}>
              <Image
                key={selected.imageUrl.src}
                src={selected.imageUrl}
                alt={selected.description}
                fill
                sizes={zoomed ? "200vw" : "100vw"}
                quality={90}
                className={styles.largeImage}
              />
              </div>
            </div>
            <div className={styles.viewerFooter}>
              <p id="viewer-caption" className={styles.caption}>{selected.description}</p>
              <div className={styles.controls}>
                <button type="button" onClick={() => move(-1)} aria-label="Previous photograph">←</button>
                <span aria-live="polite" aria-atomic="true">{activeIndex + 1} / {gallery.length}</span>
                <button type="button" onClick={() => move(1)} aria-label="Next photograph">→</button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
