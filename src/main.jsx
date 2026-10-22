
import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowDownRight,
  ArrowUpRight,
  Github,
  Instagram,
  Mail,
  Moon,
  Sun,
  Code2,
  Sparkles,
  Menu,
  X,
  MonitorSmartphone,
} from "lucide-react";
import "./style.css";
import Lanyard from "./component/Lanyard";

const githubUrl = "https://github.com/aychelmeinandar-spec";
const instagramUrl = "https://www.instagram.com/aychel_gm/";

const projects = [
  {
    no: "01",
    name: "Website Toko Online",
    type: "E-COMMERCE",
    description:
      "Website toko online untuk menampilkan produk dan membantu pengunjung menjelajahi katalog belanja. Tambahkan fitur dan teknologi spesifik sesuai implementasi proyekmu.",
    tags: ["E-commerce", "Product Catalog", "Web Development"],
    accent: "violet",
    link: githubUrl,
    previewUrl: "",
    sourceUrl: "",
  },
  {
    no: "02",
    name: "Website Toko Obat",
    type: "BUSINESS WEBSITE",
    description:
      "Website toko obat untuk menyajikan informasi toko dan katalog produk dengan struktur yang mudah dijelajahi.",
    tags: ["Business Website", "Catalog", "Responsive UI"],
    accent: "blue",
    link: githubUrl,
    previewUrl:
      "https://penjualanobatberbasisweb.kesug.com/Project-Tugas-Akhir/",
    sourceUrl: "",
  },
  {
    no: "03",
    name: "Website Rental Mobil",
    type: "RENTAL SERVICE",
    description:
      "Website layanan rental mobil untuk menampilkan pilihan kendaraan dan informasi layanan bagi calon pelanggan.",
    tags: ["Vehicle Catalog", "Rental Service", "Web Development"],
    accent: "orange",
    link: githubUrl,
    previewUrl: "",
    sourceUrl: "",
  },
];

const toolItems = [
  {
    name: "HTML5",
    description: "Markup",
    className: "html-logo",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
  },
  {
    name: "CSS3",
    description: "Styling",
    className: "css-logo",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
  },
  {
    name: "JavaScript",
    description: "Programming",
    className: "js-logo",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
  },
  {
    name: "React",
    description: "UI Library",
    className: "react-logo",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  },
  {
    name: "Git",
    description: "Version Control",
    className: "git-logo",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
  },
  {
    name: "GitHub",
    description: "Repositories",
    className: "github-logo",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
  },
];

function App() {
  const [light, setLight] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [year] = useState(new Date().getFullYear());
  const [profileOpen, setProfileOpen] = useState(false);
  
  useEffect(() => {
    const elements = document.querySelectorAll(
      "main section.reveal, .project-card, .stack-item"
    );

    // Samakan kelas animasi agar section, kartu proyek, dan toolkit memakai satu sistem.
    elements.forEach((element) => element.classList.add("reveal"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          } else {
            entry.target.classList.remove("visible");
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);


// Efek kartu proyek 3D mengikuti posisi kursor.
useEffect(() => {
  const cards = document.querySelectorAll(".project-card");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (reduceMotion || !finePointer) return;

  const cleanups = [];

  cards.forEach((card) => {
    const handleMove = (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      const rotateY = (x - 0.5) * 12;
      const rotateX = (0.5 - y) * 10;

      card.style.setProperty("--tilt-x", `${rotateX.toFixed(2)}deg`);
      card.style.setProperty("--tilt-y", `${rotateY.toFixed(2)}deg`);
      card.style.setProperty("--spot-x", `${(x * 100).toFixed(1)}%`);
      card.style.setProperty("--spot-y", `${(y * 100).toFixed(1)}%`);
    };

    const reset = () => {
      card.style.setProperty("--tilt-x", "0deg");
      card.style.setProperty("--tilt-y", "0deg");
      card.style.setProperty("--spot-x", "50%");
      card.style.setProperty("--spot-y", "50%");
    };

    card.addEventListener("pointermove", handleMove);
    card.addEventListener("pointerleave", reset);
    cleanups.push(() => {
      card.removeEventListener("pointermove", handleMove);
      card.removeEventListener("pointerleave", reset);
    });
  });

  return () => cleanups.forEach((cleanup) => cleanup());
}, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className={light ? "site light" : "site"}>
      <div className="grain" aria-hidden="true" />

      <header className="nav wrap">
        <a className="brand" href="#home" onClick={closeMenu}>
          <span className="brand-mark">
            A<span>.</span>
          </span>
          <span>
            AYCHEL<span className="brand-muted">/DEV</span>
          </span>
        </a>

        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          <a href="#about" onClick={closeMenu}>
            About
          </a>
          <a href="#work" onClick={closeMenu}>
            Projects
          </a>
          <a href="#contact" onClick={closeMenu}>
            Contact
          </a>
        </nav>

        <div className="nav-actions">
          <button
            className="icon-button theme-toggle"
            aria-label="Ganti tema"
            onClick={() => setLight(!light)}
          >
            {light ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          <a className="nav-cta" href="#contact">
            Let’s talk <ArrowUpRight size={15} />
          </a>

          <button
            className="icon-button menu-toggle"
            aria-label="Buka menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <main>
        <section id="home" className="hero wrap">
          <div className="hero-copy">
          <button
             type="button"
            className="profile-avatar"
             onClick={() => setProfileOpen(true)}
              aria-label="Lihat foto profil Aychel"
            >
             <img
               src="/profile-aychel.jpg"
                 alt="Foto Aychel"
               />
                <span className="profile-avatar-hint">
                 View profile ↗
                    </span>
            </button>
            <div className="eyebrow">
              <span className="status-dot" />
              AVAILABLE FOR OPPORTUNITIES
              <span className="eyebrow-line" />
            </div>

            <h1>
              Building digital
              <br />
              things with <span className="gradient-text">purpose.</span>
            </h1>

            <p className="hero-intro">
              Halo, aku <strong>Aychel Gusti M.</strong> — developer yang suka
              mengubah ide menjadi pengalaman digital yang fungsional, menarik,
              dan mudah digunakan.
            </p>

            <div className="hero-buttons">
              <a className="button primary" href="#work">
                Explore my work <ArrowDownRight size={17} />
              </a>
              <a className="button secondary" href="#contact">
                Get in touch <ArrowUpRight size={17} />
              </a>
            </div>

            <div className="hero-social">
              <span>FIND ME ON</span>
              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <Github size={17} />
              </a>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <Instagram size={17} />
              </a>
              <a href="mailto:aychelmeinandar@gmail.com" aria-label="Email">
                <Mail size={17} />
              </a>
            </div>
          </div>

          <div className="hero-art lanyard-hero">
            <Lanyard
              frontImage="/profile-aychel.jpg"
           backImage="/profile-aychel.jpg"
             imageFit="cover"
             cardColor="#ffffff"
             orientation="portrait"
             size={0.7}
           interactive={true}
          />
            </div>

          <div className="hero-bottom">
            <span>SCROLL TO EXPLORE</span>
            <div className="scroll-line" />
            <span className="mono">{String(year)}</span>
          </div>
        </section>

        <section id="about" className="about section wrap reveal">
          <div className="section-label">
            <span>01 / ABOUT ME</span>
            <span className="label-rule" />
          </div>

          <div className="about-grid">
            <h2>
              Curious mind.
              <br />
              <span className="muted-heading">Builder’s mindset.</span>
            </h2>

            <div className="about-content">
              <p className="large-copy">
                Aku membangun website yang berfokus pada kebutuhan pengguna—
                mulai dari toko online hingga website layanan bisnis seperti
                toko obat dan rental mobil.
              </p>

              <p>
                Pengalamanku mencakup pengerjaan website toko online, website
                toko obat, dan website rental mobil. Aku terus mengasah
                kemampuan web development dan memperhatikan struktur informasi,
                kemudahan penggunaan, serta tampilan yang responsif.
              </p>

              <div className="skill-list">
                <span>CORE INTERESTS</span>
                <div className="pills">
                  <b>Frontend Development</b>
                  <b>UI / UX</b>
                  <b>Creative Coding</b>
                  <b>Problem Solving</b>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="work" className="work section wrap reveal">
          <div className="section-label">
            <span>02 / SELECTED WORK</span>
            <span className="label-rule" />
            <span className="label-note">A FEW THINGS I’VE BUILT</span>
          </div>

          <div className="work-heading">
            <h2>
              Ideas into <span className="gradient-text">reality.</span>
            </h2>
            <p>
              Tiga proyek website yang pernah aku kerjakan: toko online, toko
              obat, dan rental mobil. Demo dan source code akan ditautkan di
              sini setelah masing-masing proyek dipublikasikan.
            </p>
          </div>

          <div className="project-grid">
            {projects.map((project) => (
              <article
                className={`project-card ${project.accent}`}
                key={project.no}
              >
                <div className="project-top">
                  <span>
                    {project.no} / {project.type}
                  </span>
                  <a
                    href={
                      project.previewUrl ||
                      project.sourceUrl ||
                      project.link
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Buka ${project.name}`}
                  >
                    <ArrowUpRight size={19} />
                  </a>
                </div>

                <div className="project-visual">
                  <div className="mock-window">
                    <div className="window-bar">
                      <i />
                      <i />
                      <i />
                      <span>{project.name.toLowerCase()}.app</span>
                    </div>

                    <div className="mock-content">
                      <div className="mock-sidebar">
                        <b>A.</b>
                        <i />
                        <i />
                        <i />
                      </div>

                      <div className="mock-main">
                        <div className="mock-title" />
                        <div className="mock-subtitle" />
                        <div className="mock-blocks">
                          <i />
                          <i />
                          <i />
                        </div>
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
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>

                  <div className="project-actions">
                    {project.previewUrl ? (
                      <a
                        className="project-btn project-btn-primary"
                        href={project.previewUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Live Preview <ArrowUpRight size={15} />
                      </a>
                    ) : (
                      <span
                        className="project-btn project-btn-disabled"
                        aria-disabled="true"
                      >
                        Live Preview · Segera hadir
                      </span>
                    )}

                    {project.sourceUrl ? (
                      <a
                        className="project-btn project-btn-secondary"
                        href={project.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Github size={15} /> Source Code
                      </a>
                    ) : (
                      <span
                        className="project-btn project-btn-disabled"
                        aria-disabled="true"
                      >
                        Source Code · Segera hadir
                      </span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <p className="project-note">
            <Sparkles size={15} />
            Tautan demo dan source code tersedia sesuai proyek yang sudah
            dipublikasikan.
          </p>
        </section>

        <section className="stack section wrap reveal">
          <div className="section-label">
            <span>03 / TOOLKIT</span>
            <span className="label-rule" />
          </div>

          <div className="tech-stack-heading">
            <h2>Tools &amp; capabilities.</h2>
            <p>
              Teknologi dan tools yang kugunakan untuk membangun pengalaman
              web yang fungsional, responsif, dan menarik.
            </p>
          </div>

          <div className="tech-marquee" aria-label="Daftar teknologi dan tools">
            <div className="tech-marquee-row">
              <div className="tech-marquee-track">
                {[...toolItems, { name: "Responsive UI", description: "All screens", className: "responsive-logo", image: null }, ...toolItems, { name: "Responsive UI", description: "All screens", className: "responsive-logo", image: null }].map((tool, index) => (
                  <article
                    className="tech-card"
                    key={`top-${tool.name}-${index}`}
                    aria-hidden={index >= toolItems.length + 1 ? true : undefined}
                  >
                    <span className={`tech-card-logo ${tool.className}`}>
                      {tool.image ? (
                        <img src={tool.image} alt="" loading="lazy" />
                      ) : (
                        <MonitorSmartphone size={27} strokeWidth={1.8} />
                      )}
                    </span>
                    <span className="tech-card-name">{tool.name}</span>
                    <small>{tool.description}</small>
                  </article>
                ))}
              </div>
            </div>

            <div className="tech-marquee-row reverse">
              <div className="tech-marquee-track">
                {[...toolItems, { name: "Responsive UI", description: "All screens", className: "responsive-logo", image: null }, ...toolItems, { name: "Responsive UI", description: "All screens", className: "responsive-logo", image: null }].map((tool, index) => (
                  <article
                    className="tech-card"
                    key={`bottom-${tool.name}-${index}`}
                    aria-hidden={index >= toolItems.length + 1 ? true : undefined}
                  >
                    <span className={`tech-card-logo ${tool.className}`}>
                      {tool.image ? (
                        <img src={tool.image} alt="" loading="lazy" />
                      ) : (
                        <MonitorSmartphone size={27} strokeWidth={1.8} />
                      )}
                    </span>
                    <span className="tech-card-name">{tool.name}</span>
                    <small>{tool.description}</small>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="contact section wrap reveal">
          <div className="section-label">
            <span>04 / CONTACT</span>
            <span className="label-rule" />
          </div>

          <div className="contact-panel">
            <div className="contact-orb" />
            <span className="eyebrow">HAVE A PROJECT IN MIND?</span>
            <h2>
              Let’s make something
              <br />
              <span className="gradient-text">meaningful.</span>
            </h2>
            <p>
              Punya ide, kesempatan kolaborasi, atau sekadar ingin ngobrol soal
              teknologi? Kirim pesan, yuk.
            </p>
            
              <a
                className="button primary"
                href="https://mail.google.com/mail/?view=cm&fs=1&to=aychelemeinandar%40gmail.com"
                target="_blank"
                  rel="noopener noreferrer"
          >
                 Say hello <ArrowUpRight size={17} />
              </a>
              
            <span className="contact-deco mono">0101 / LET’S BUILD</span>
          </div>

          <div className="contact-links">
            <span>ELSEWHERE ON THE INTERNET</span>
            <a href={githubUrl} target="_blank" rel="noreferrer">
              GitHub <ArrowUpRight size={15} />
            </a>
            <a href={instagramUrl} target="_blank" rel="noreferrer">
              Instagram <ArrowUpRight size={15} />
            </a>
            <a href="mailto:aychelmeinandar@gmail.com">
              Email <ArrowUpRight size={15} />
            </a>
          </div>
        </section>
      </main>

      
      
      {profileOpen && (
        <div
          className="profile-modal"
          onClick={() => setProfileOpen(false)}
        >
          <div
            className="profile-modal-content profile-card-style"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="profile-modal-close"
              onClick={() => setProfileOpen(false)}
              aria-label="Tutup profil"
            >
              ×
            </button>

            <img
              src="/profile-aychel.jpg"
              alt="Foto profil Aychel"
              className="profile-modal-image"
            />

            <div className="profile-info">
              <h3>
                Aychel Gusti M.
                <span className="verified-mark" title="Verified">✓</span>
              </h3>
              <p>FullStack Developer – Profile Avatar</p>
            </div>
          </div>
        </div>
      )}


      <footer className="footer wrap">
        <a className="brand" href="#home">
          <span className="brand-mark">
            A<span>.</span>
          </span>
          <span>
            AYCHEL<span className="brand-muted">/DEV</span>
          </span>
        </a>
        <span>DESIGNED &amp; BUILT WITH CURIOSITY © {year}</span>
        <a href="#home" className="back-top">
          BACK TO TOP ↑
        </a>
      </footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);