// ============================================================
//  WIKI-GPT — app.js  (v2)
//  Lee data/contenidos.xml → genera tarjetas con acceso a PDFs
//  Animación: entrada escalonada tipo "ruleta / mazo de cartas"
// ============================================================

// Mapa tema → archivo PDF en assets/
// Ajusta los nombres si los PDFs llevan otro nombre
const TEMA_PDF_MAP = {
  // ISO
  "Administración de Linux":          "Tema1.pdf",
  "Servicios de Red":                 "Tema1_1.pdf",
  "Gestión de usuarios y permisos":   "Tema1_2.pdf",
  "Automatización con Bash":          "Tema1_2.pdf",   // reutiliza el último si no hay más
  // PAR
  "VLANs y Trunking":                 "Tema2.pdf",
  "Enrutamiento Estático":            "Tema2_1.pdf",
  "Protocolo OSPF":                   "Tema2_2.pdf",
  "Configuración de Switches Cisco":  "Tema2_2.pdf",
  // SEG
  "Hardening de servidores":          "Tema3.pdf",
  "Cortafuegos con iptables":         "Tema3_1.pdf",
  "Acceso seguro con SSH":            "Tema3_2.pdf",
  "Gestión de certificados SSL/TLS":  "Tema3_2.pdf",
  // BBDD
  "Diseño relacional y SQL":          "Tema4.pdf",
  "Optimización de consultas":        "Tema4_1.pdf",
  "Copias de seguridad y restauración":"Tema4_2.pdf",
  "Administración de MySQL/MariaDB":  "Tema4_2.pdf",
};

// Colores por módulo (ajusta a tu gusto)
const MOD_COLORS = {
  ISO:  { hue: "210", label: "🐧" },
  PAR:  { hue: "160", label: "🌐" },
  SEG:  { hue: "0",   label: "🔐" },
  BBDD: { hue: "45",  label: "🗄️"  },
};

// ─── Helper: primer texto de un tagName dentro de un elemento padre ───────────
function getTagText(parent, tagName) {
  const el = parent.getElementsByTagName(tagName)[0];
  return el ? el.textContent.trim() : "—";
}

// ─── Construye una tarjeta DOM para un <modulo> ───────────────────────────────
function buildCard(mod, index) {
  const id          = mod.getAttribute("id") || "??";
  const nombre      = getTagText(mod, "nombre");
  const responsable = getTagText(mod, "responsable");
  const temas       = Array.from(mod.getElementsByTagName("tema"));
  const color       = MOD_COLORS[id] || { hue: "270", label: "📄" };

  // Lista de temas con enlace al PDF si existe
  const temasHTML = temas.length
    ? temas.map(t => {
        const texto = t.textContent.trim();
        const pdf   = TEMA_PDF_MAP[texto];
        return pdf
          ? `<li class="tema-item">
               <a class="tema-link" href="../assets/${pdf}" target="_blank" rel="noopener">
                 <span class="pdf-icon">📄</span>${texto}
               </a>
             </li>`
          : `<li class="tema-item"><span class="pdf-icon">•</span>${texto}</li>`;
      }).join("")
    : `<li class="tema-item sin-temas">Sin temas registrados</li>`;

  const card = document.createElement("div");
  card.className = "modulo-card";
  card.style.setProperty("--card-hue", color.hue);
  // Delay escalonado para la "ruleta" de entrada
  card.style.setProperty("--card-index", index);

  card.innerHTML = `
    <div class="modulo-header">
      <span class="modulo-emoji">${color.label}</span>
      <div class="modulo-titles">
        <span class="modulo-id">${id}</span>
        <h3 class="modulo-nombre">${nombre}</h3>
      </div>
    </div>
    <div class="modulo-body">
      <p class="modulo-responsable">
        <span class="label">Responsable</span>
        <strong>${responsable}</strong>
      </p>
      <ul class="temas-list">${temasHTML}</ul>
    </div>
  `;

  // Efecto "flip de carta" al hacer clic en la cabecera
  card.querySelector(".modulo-header").addEventListener("click", () => {
    card.classList.toggle("flipped");
  });

  return card;
}

// ─── Función principal ────────────────────────────────────────────────────────
async function cargarContenidos() {
  const container = document.getElementById("app-container");
  const loader    = document.getElementById("loader");

  try {
    // Ruta relativa: desde src/app.js hacia data/contenidos.xml
    // Si index.html está en la raíz, la ruta es "data/contenidos.xml"
    const xmlPath = document.location.pathname.includes("/src/")
      ? "../data/contenidos.xml"
      : "data/contenidos.xml";

    const response = await fetch(xmlPath);
    if (!response.ok) throw new Error(`HTTP ${response.status} al cargar ${xmlPath}`);

    const text   = await response.text();
    const parser = new DOMParser();
    const xml    = parser.parseFromString(text, "text/xml");

    const parseError = xml.querySelector("parsererror");
    if (parseError) throw new Error("XML mal formado:\n" + parseError.textContent);

    const modulos = xml.getElementsByTagName("modulo");
    if (modulos.length === 0) {
      container.innerHTML = '<p class="error-msg">No se encontraron módulos en el XML.</p>';
      return;
    }

    // Ocultar loader
    if (loader) loader.style.display = "none";
    container.innerHTML = "";

    // Añadir las tarjetas con delay escalonado (efecto ruleta)
    Array.from(modulos).forEach((mod, i) => {
      const card = buildCard(mod, i);
      container.appendChild(card);
      // Forzar reflow para que la animación arranque
      requestAnimationFrame(() => {
        setTimeout(() => card.classList.add("visible"), i * 120);
      });
    });

  } catch (e) {
    console.error("Error al cargar el XML:", e);
    if (loader) loader.style.display = "none";
    container.innerHTML = `
      <div class="error-msg">
        <strong>⚠️ Error al cargar el XML</strong><br/>
        ${e.message}<br/>
        <small>Usa un servidor local (Live Server / Python http.server) y comprueba la ruta a <code>data/contenidos.xml</code>.</small>
      </div>`;
  }
}

window.addEventListener("DOMContentLoaded", cargarContenidos);

