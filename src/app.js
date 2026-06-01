// ============================================================
//  WIKI-GPT — app.js
//  Carga dinámica desde data/contenidos.xml
//  Estructura real: <modulo id> > <nombre>, <responsable>, <temas> > <tema>
// ============================================================

async function cargarContenidos() {
  const container = document.getElementById('app-container');

  try {
    // 1. Fetch del XML (requiere servidor local, p.ej. Live Server)
    const response = await fetch('/WIKI-GPT/data/contenidos.xml');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const text = await response.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(text, 'text/xml');

    // Comprobar errores de parseo XML
    const parseError = xml.querySelector('parsererror');
    if (parseError) throw new Error('XML mal formado: ' + parseError.textContent);

    // 2. Limpiar contenedor
    container.innerHTML = '';

    // 3. Recorrer cada <modulo>
    const modulos = xml.getElementsByTagName('modulo > modulo');

    if (modulos.length === 0) {
      container.innerHTML = '<p class="error-msg">No se encontraron módulos en el XML.</p>';
      return;
    }

    Array.from(modulos).forEach(mod => {
      // Leer atributo id y elementos hijos directos
      const id          = mod.getAttribute('id') || '—';
      const nombre      = getTagText(mod, 'nombre');
      const responsable = getTagText(mod, 'responsable');

      // Leer todos los <tema> dentro de <temas>
      const temas = mod.getElementsByTagName('tema > tema');

      // 4. Construir HTML de la tarjeta
      const modDiv = document.createElement('div');
      modDiv.className = 'modulo-card';

      let temasHTML = '';
      Array.from(temas).forEach(tema => {
        // El texto del nodo <tema> es directamente su contenido (xs:string)
        const textoTema = tema.textContent.trim();
        temasHTML += `<li class="tema-item">${textoTema}</li>`;
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
        <small>Asegúrate de usar un servidor local (Live Server) y que la ruta a <code>data/contenidos.xml</code> sea correcta.</small>
      </div>
    `;
  }
}

// Helper: obtiene el textContent del primer hijo con ese tagName
function getTagText(parent, tagName) {
  const el = parent.getElementsByTagName(tagName)[0];
  return el ? el.textContent.trim() : '—';
}

// Ejecutar al cargar la página
window.onload = cargarContenidos;