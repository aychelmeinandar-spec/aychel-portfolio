import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Github,
} from "lucide-react";
import "./ProjectCardSwap.css";

/**
 * Card Swap for the existing portfolio projects.
 * Pass the same `projects` array already defined in main.jsx.
 */
export default function ProjectCardSwap({ projects, interval = 4200 }) {
  const [order, setOrder] = useState(() => projects.map((_, index) => index));
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    setOrder(projects.map((_, index) => index));
  }, [projects.length]);

  useEffect(() => {
    if (paused || projects.length < 2) return undefined;

    const timer = window.setInterval(() => {
      setOrder((current) => {
        if (current.length < 2) return current;
        return [...current.slice(1), current[0]];
      });
    }, interval);

    return () => window.clearInterval(timer);
  }, [paused, interval, projects.length]);

  if (!projects?.length) return null;

  return (
    <div
      className="project-swap"
      aria-label="Project portfolio cards"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
    >
      <div className="project-swap-stage">
        {order.map((projectIndex, stackPosition) => {
          const project = projects[projectIndex];
          const isFront = stackPosition === 0;

          return (
            <article
              className={`project-card project-swap-card ${project.accent || ""}`}
              key={project.no || project.name}
              style={{ "--swap-position": stackPosition }}
              aria-hidden={!isFront}
              inert={!isFront}
            >
              <div className="project-top">
                <span>{project.no} / {project.type}</span>
                <a
                  href={project.previewUrl || project.sourceUrl || project.link || "#work"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Buka ${project.name}`}
                  tabIndex={isFront ? 0 : -1}
                >
                  <ArrowUpRight size={19} />
                </a>
              </div>

              <div className="project-visual">
                <div className="mock-window">
                  <div className="window-bar">
                    <i /><i /><i />
                    <span>{project.name.toLowerCase()}.app</span>
                  </div>
                  <div className="mock-content">
                    <div className="mock-sidebar">
                      <b>A.</b><i /><i /><i />
                    </div>
                    <div className="mock-main">
                      <div className="mock-title" />
                      <div className="mock-subtitle" />
                      <div className="mock-blocks"><i /><i /><i /></div>
                      <div className="mock-line" />
                      <div className="mock-line short" />
                    </div>
                  </div>
                </div>
                <div className="visual-glow" />
              </div>

              <div className="project-info">
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <div className="tag-row">
                  {project.tags?.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                <div className="project-actions">
                  {project.previewUrl ? (
                    <a
                      className="project-btn project-btn-primary"
                      href={project.previewUrl}
                      target="_blank"
                      rel="noreferrer"
                      tabIndex={isFront ? 0 : -1}
                    >
                      Live Preview <ArrowUpRight size={15} />
                    </a>
                  ) : (
                    <span className="project-btn project-btn-disabled" aria-disabled="true">
                      Live Preview · Segera hadir
                    </span>
                  )}
                  {project.sourceUrl ? (
                    <a
                      className="project-btn project-btn-secondary"
                      href={project.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      tabIndex={isFront ? 0 : -1}
                    >
                      <Github size={15} /> Source Code
                    </a>
                  ) : (
                    <span className="project-btn project-btn-disabled" aria-disabled="true">
                      Source Code · Segera hadir
                    </span>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="project-swap-controls" aria-label="Project navigation">
        <button
          type="button"
          className="project-swap-control"
          onClick={() => setOrder((current) => [...current.slice(1), current[0]])}
          aria-label="Proyek berikutnya"
        >
          <ArrowUpRight size={17} />
        </button>
        <span>{String(projects.findIndex((project) => project === projects[order[0]]) + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
        <button
          type="button"
          className="project-swap-control"
          onClick={() => setOrder((current) => [current[current.length - 1], ...current.slice(0, -1)])}
          aria-label="Proyek sebelumnya"
        >
          <ArrowUpRight className="project-swap-previous-icon" size={17} />
        </button>
      </div>
    </div>
  );
}
