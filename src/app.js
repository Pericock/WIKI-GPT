// ============================================================
//  WIKI-GPT — app.js
//  Carga dinámica desde data/contenidos.xml
//  Estructura real: <modulo id> > <nombre>, <responsable>, <temas> > <tema>
// ============================================================

async function cargarContenidos() {
  const container = document.getElementById('app-container');

  try {
    const response = await fetch('/WIKI-GPT/data/contenidos.xml');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const text = await response.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(text, 'text/xml');

    const parseError = xml.querySelector('parsererror');
    if (parseError) throw new Error('XML mal formado: ' + parseError.textContent);

    container.innerHTML = '';

    const modulos = xml.querySelectorAll('modulo');

    if (modulos.length === 0) {
      container.innerHTML = '<p class="error-msg">No se encontraron módulos en el XML.</p>';
      return;
    }

    Array.from(modulos).forEach(mod => {
      const id          = mod.getAttribute('id') || '—';
      const nombre      = getTagText(mod, 'nombre');
      const responsable = getTagText(mod, 'responsable');
      const temas       = mod.querySelectorAll('tema');

      const modDiv = document.createElement('div');
      modDiv.className = 'modulo-card';

      let temasHTML = '';

temas.forEach(tema => {
    const nombreTema = tema.textContent.trim();
    const pdf = tema.getAttribute('pdf');

    temasHTML += `
        <li class="tema-item">
            <a href="${pdf}" class="tema-link">
                ${nombreTema}
            </a>
        </li>
    `;
});

      modDiv.innerHTML = `
        <div class="modulo-header">
          <span class="modulo-id">${id}</span>
          <h3 class="modulo-nombre">${nombre}</h3>
        </div>
        <div class="modulo-body">
          <p class="modulo-responsable">
            <span class="label">Responsable:</span>
            <strong>${responsable}</strong>
          </p>
          <ul class="temas-list">
            ${temasHTML || '<li class="tema-item sin-temas">Sin temas registrados</li>'}
          </ul>
        </div>
      `;

      container.appendChild(modDiv);
    });

  } catch (e) {
    console.error('Error al cargar el XML:', e);
    container.innerHTML = `
      <div class="error-msg">
        <strong>Error al cargar el XML</strong><br />
        ${e.message}<br />
        <small>Ruta: <code>/WIKI-GPT/data/contenidos.xml</code></small>
      </div>
    `;
  }
}

function getTagText(parent, tagName) {
  const el = parent.querySelector(tagName);
  return el ? el.textContent.trim() : '—';
}

window.onload = cargarContenidos;
