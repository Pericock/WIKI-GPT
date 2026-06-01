// ============================================================
//  WIKI-GPT — app.js
//  Carga dinámica desde data/contenidos.xml
//  Cada <tema pdf="ruta.pdf">Nombre</tema> genera un enlace al PDF
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

    const modulos = xml.getElementsByTagName('modulo');
    if (modulos.length === 0) {
      container.innerHTML = '<p class="error-msg">No se encontraron módulos en el XML.</p>';
      return;
    }

    Array.from(modulos).forEach(mod => {
      const id          = mod.getAttribute('id') || '—';
      const nombre      = getTagText(mod, 'nombre');
      const responsable = getTagText(mod, 'responsable');
      const temas       = mod.getElementsByTagName('tema');

      const modDiv = document.createElement('div');
      modDiv.className = 'modulo-card';

      let temasHTML = '';
      Array.from(temas).forEach(tema => {
        const textoTema = tema.textContent.trim();
        const pdfRuta   = tema.getAttribute('pdf');

        if (pdfRuta) {
          // Si tiene PDF: enlace que abre en nueva pestaña
          temasHTML += `
            <li class="tema-item">
              <a class="tema-link" href="${pdfRuta}" target="_blank" rel="noopener">
                📄 ${textoTema}
              </a>
            </li>`;
        } else {
          // Sin PDF: texto plano
          temasHTML += `<li class="tema-item">${textoTema}</li>`;
        }
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
        <small>Asegúrate de usar Live Server y que la ruta a <code>data/contenidos.xml</code> sea correcta.</small>
      </div>
    `;
  }
}

function getTagText(parent, tagName) {
  const el = parent.getElementsByTagName(tagName)[0];
  return el ? el.textContent.trim() : '—';
}

window.onload = cargarContenidos;