// ============================================================
//  WIKI-GPT — app.js  (v4 - Corrección Definitiva)
//  Fix: Enrutamiento absoluto seguro para GitHub Pages y Local
// ============================================================

// Base path inteligente para evitar fallos de barras inclinadas (/) y mayúsculas en GitHub Pages
const basePath = (() => {
  const hostname = window.location.hostname;
  const pathname = window.location.pathname;

  // 1. Si estamos desplegados en GitHub Pages
  if (hostname.includes('github.io')) {
    // Forzamos el nombre exacto del repositorio en mayúsculas. 
    // Esto evita fallos si el usuario entra sin la barra '/' al final.
    return '/WIKI-GPT';
  }

  // 2. Si estamos en local (Live Server o servidor local)
  // Limpia '/index.html' o barras finales para dejar la ruta limpia
  return pathname.replace(/\/index\.html$/, '').replace(/\/$/, '');
})();

function assetURL(filename) {
  return `${basePath}/assets/${filename}`;
}

function xmlURL() {
  return `${basePath}/data/contenidos.xml`;
}

// ── Mapa tema → PDF ───────────────────────────────────────────
const TEMA_PDF_MAP = {
  "Administración de Linux":           "Tema1.pdf",
  "Servicios de Red":                  "Tema1_1.pdf",
  "Gestión de usuarios y permisos":    "Tema1_2.pdf",
  "Automatización con Bash":           "Tema1_2.pdf",
  "VLANs y Trunking":                  "Tema2.pdf",
  "Enrutamiento Estático":             "Tema2_1.pdf",
  "Protocolo OSPF":                    "Tema2_2.pdf",
  "Configuración de Switches Cisco":   "Tema2_2.pdf",
  "Hardening de servidores":           "Tema3.pdf",
  "Cortafuegos con iptables":          "Tema3_1.pdf",
  "Acceso seguro con SSH":             "Tema3_2.pdf",
  "Gestión de certificados SSL/TLS":   "Tema3_2.pdf",
  "Diseño relacional y SQL":           "Tema4.pdf",
  "Optimización de consultas":         "Tema4_1.pdf",
  "Copias de seguridad y restauración":"Tema4_2.pdf",
  "Administración de MySQL/MariaDB":   "Tema4_2.pdf",
};

const MOD_COLORS = {
  ISO:  { accent: 'var(--accent)',  emoji: '🐧' },
  PAR:  { accent: 'var(--accent2)', emoji: '🌐' },
  SEG:  { accent: 'var(--accent3)', emoji: '🔐' },
  BBDD: { accent: '#f0b429',        emoji: '🗄️'  },
};

function getTagText(parent, tagName) {
  const el = parent.getElementsByTagName(tagName)[0];
  return el ? el.textContent.trim() : '—';
}

function buildCard(mod, index) {
  const id          = mod.getAttribute('id') || '??';
  const nombre      = getTagText(mod, 'nombre');
  const responsable = getTagText(mod, 'responsable');
  const temas       = Array.from(mod.getElementsByTagName('tema'));
  const color       = MOD_COLORS[id] || { accent: 'var(--accent)', emoji: '📄' };

  const temasHTML = temas.length
    ? temas.map(t => {
        const texto = t.textContent.trim();
        const pdf   = TEMA_PDF_MAP[texto];
        return pdf
          ? `<li class="tema-item">
               <a class="tema-link" href="${assetURL(pdf)}" target="_blank" rel="noopener">
                 <span class="pdf-icon">📄</span>${texto}
               </a>
             </li>`
          : `<li class="tema-item"><span class="pdf-icon">•</span>${texto}</li>`;
      }).join('')
    : `<li class="tema-item sin-temas">Sin temas registrados</li>`;

  const card = document.createElement('div');
  card.className = 'modulo-card';
  card.style.setProperty('--mod-accent', color.accent);
  card.style.animationDelay = `${index * 0.09}s`;

  card.innerHTML = `
    <div class="modulo-header">
      <span class="modulo-emoji">${color.emoji}</span>
      <div>
        <span class="modulo-id">${id}</span>
        <h3 class="modulo-nombre">${nombre}</h3>
      </div>
    </div>
    <div class="modulo-body">
      <p class="modulo-responsable">
        <span class="label">Responsable:</span>
        <strong>${responsable}</strong>
      </p>
      <ul class="temas-list">${temasHTML}</ul>
    </div>
  `;
  return card;
}

async function cargarContenidos() {
  const grid = document.getElementById('modulos-grid');
  if (!grid) return;

  grid.innerHTML = `
    <div class="loading-state">
      <div class="spinner"></div>
      <span>Cargando módulos…</span>
    </div>`;

  try {
    const response = await fetch(xmlURL());
    if (!response.ok) throw new Error(`HTTP ${response.status} — ${xmlURL()}`);

    const text = await response.text();
    const xml  = new DOMParser().parseFromString(text, 'text/xml');

    const parseError = xml.querySelector('parsererror');
    if (parseError) throw new Error('XML mal formado: ' + parseError.textContent);

    const modulos = xml.getElementsByTagName('modulo');
    if (modulos.length === 0) {
      grid.innerHTML = '<p class="error-msg">No se encontraron módulos en el XML.</p>';
      return;
    </div>

    grid.innerHTML = '';
    Array.from(modulos).forEach((mod, i) => grid.appendChild(buildCard(mod, i)));

  } catch (e) {
    console.error(e);
    grid.innerHTML = `
      <div class="error-msg">
        <strong>⚠️ Error al cargar el XML</strong><br/>
        ${e.message}<br/>
        <small>Ruta intentada: <code>${xmlURL()}</code><br/>
        Asegúrate de que el archivo XML existe en la ruta correcta.</small>
      </div>`;
  }
}

window.addEventListener('DOMContentLoaded', cargarContenidos);
