import "./ToolsSection.css";

const techRows = [
  [
    { name: "React", category: "UI Library", icon: "⚛", color: "#61DAFB" },
    { name: "Next.js", category: "React Framework", icon: "N", color: "#F5F0E8" },
    { name: "JavaScript", category: "Programming", icon: "JS", color: "#F7DF1E" },
    { name: "TypeScript", category: "Typed JavaScript", icon: "TS", color: "#3178C6" },
    { name: "HTML5", category: "Markup", icon: "5", color: "#E96228" },
    { name: "CSS3", category: "Styling", icon: "3", color: "#2999E8" },
  ],
  [
    { name: "Tailwind CSS", category: "CSS Framework", icon: "≈", color: "#38BDF8" },
    { name: "Node.js", category: "Runtime Environment", icon: "JS", color: "#68A063" },
    { name: "Git", category: "Version Control", icon: "◆", color: "#F05032" },
    { name: "GitHub", category: "Repositories", icon: "◉", color: "#E9E1D6" },
    { name: "Figma", category: "UI Design", icon: "F", color: "#F24E1E" },
    { name: "Vite", category: "Build Tool", icon: "ϟ", color: "#A78BFA" },
  ],
];

function TechCard({ tech, index }) {
  return (
    <article className="marquee-tech-card" key={`${tech.name}-${index}`}>
      <div className="marquee-tech-icon" style={{ "--tech-color": tech.color }}>
        {tech.icon}
      </div>
      <h3>{tech.name}</h3>
      <p>{tech.category}</p>
    </article>
  );
}

export default function ToolsSection() {
  return (
    <section className="marquee-tools" id="toolkit" aria-labelledby="toolkit-title">
      <div className="marquee-tools-label">
        <span>03 / TOOLKIT</span>
        <div aria-hidden="true" />
      </div>

      <div className="marquee-tools-heading">
        <h2 id="toolkit-title">The Tech Stack.</h2>
        <p>
          Teknologi dan tools yang kugunakan untuk membangun pengalaman web
          yang fungsional, menarik, dan mudah digunakan.
        </p>
      </div>

      <div className="marquee-rows">
        {techRows.map((row, rowIndex) => (
          <div
            className={`marquee-track ${rowIndex === 1 ? "marquee-reverse" : ""}`}
            key={rowIndex}
          >
            <div className="marquee-track-inner">
              {row.map((tech, index) => (
                <TechCard tech={tech} index={index} key={`first-${tech.name}`} />
              ))}
              {row.map((tech, index) => (
                <TechCard tech={tech} index={index} key={`second-${tech.name}`} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
