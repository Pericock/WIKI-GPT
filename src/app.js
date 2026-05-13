async function cargarContenidos() {
    const container = document.getElementById('app-container');
    try {
        // Accedemos a la carpeta data que está en el nivel superior
        const response = await fetch('../data/contenidos.xml');
        const text = await response.text();
        const xml = new DOMParser().parseFromString(text, "text/xml");
        
        container.innerHTML = '';
        const modulos = xml.getElementsByTagName('modulo');

        Array.from(modulos).forEach(mod => {
            const modDiv = document.createElement('div');
            modDiv.className = 'modulo-card';
            
            let html = `
                <div class="modulo-header"><h2>${mod.getAttribute('nombre')}</h2></div>
                <div class="modulo-body">
            `;

            const temas = mod.getElementsByTagName('tema');
            Array.from(temas).forEach(tema => {
                html += `
                    <div class="tema-item">
                        <h3>${tema.getElementsByTagName('titulo')[0].textContent}</h3>
                        <p>${tema.getElementsByTagName('contenido')[0].textContent}</p>
                    </div>
                `;
            });

            html += `</div>`;
            modDiv.innerHTML = html;
            container.appendChild(modDiv);
        });
    } catch (e) {
        container.innerHTML = `<p style="color:red">Error al cargar XML: Asegúrate de usar un servidor local (Live Server).</p>`;
    }
}

window.onload = cargarContenidos;