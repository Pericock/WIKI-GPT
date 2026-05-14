---
layout: default
title: Home
---

<!-- Encabezado Principal (Hero Section) -->
<div style="text-align: center; padding: 40px 20px; background: linear-gradient(135deg, #1e293b 0%, #334155 100%); color: white; border-radius: 15px; margin-bottom: 30px; box-shadow: 0 10px 25px rgba(0,0,0,0.1);">
    <h1 style="margin: 0; font-size: 3em; letter-spacing: -1px;">🚀 WIKI-GPT</h1>
    <p style="font-size: 1.2em; opacity: 0.9; margin-top: 10px;">ASIR Technical Knowledge Hub</p>
    
    <div style="margin-top: 20px; display: flex; justify-content: center; gap: 10px; flex-wrap: wrap;">
        <img src="https://img.shields.io/github/contributors/pericock/WIKI-GPT?style=for-the-badge&color=orange" alt="Contributors">
        <img src="https://img.shields.io/github/last-commit/pericock/WIKI-GPT?style=for-the-badge&color=blue" alt="Last Commit">
        <img src="https://img.shields.io/badge/Version-1.0.0--Stable-green?style=for-the-badge" alt="Version">
    </div>
</div>

<!-- Sección de Introducción -->
<div style="max-width: 800px; margin: 0 auto; text-align: center; margin-bottom: 50px;">
    <h2 style="color: #1e293b;">Bienvenido a la Documentación Oficial</h2>
    <p style="color: #64748b; line-height: 1.6;">Esta wiki centraliza el conocimiento técnico del equipo para el grado de <b>Administración de Sistemas e Infraestructura de Red (ASIR)</b>. Aquí encontrarás guías validadas, configuraciones de red y despliegues de servidores.</p>
</div>

<!-- Grid de Categorías (Botones grandes) -->
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; margin-bottom: 50px;">
    
    <!-- Linux -->
    <a href="./linux/" style="text-decoration: none; color: inherit;">
        <div style="padding: 30px; border: 1px solid #e2e8f0; border-radius: 12px; text-align: center; transition: transform 0.3s; background: white; box-shadow: 0 4px 6px rgba(0,0,0,0.05);" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
            <img src="https://img.icons8.com/color/96/000000/linux.png" width="60">
            <h3 style="margin-top: 15px;">Linux & Shell</h3>
            <p style="font-size: 0.9em; color: #64748b;">Bash, Apache, Systemd y administración.</p>
        </div>
    </a>

    <!-- Redes -->
    <a href="./redes/" style="text-decoration: none; color: inherit;">
        <div style="padding: 30px; border: 1px solid #e2e8f0; border-radius: 12px; text-align: center; transition: transform 0.3s; background: white; box-shadow: 0 4px 6px rgba(0,0,0,0.05);" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
            <img src="https://img.icons8.com/color/96/000000/network.png" width="60">
            <h3 style="margin-top: 15px;">Networking</h3>
            <p style="font-size: 0.9em; color: #64748b;">Enrutamiento, VLANs y servicios IP.</p>
        </div>
    </a>

    <!-- XML/XSD -->
    <a href="./schemas/" style="text-decoration: none; color: inherit;">
        <div style="padding: 30px; border: 1px solid #e2e8f0; border-radius: 12px; text-align: center; transition: transform 0.3s; background: white; box-shadow: 0 4px 6px rgba(0,0,0,0.05);" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
            <img src="https://img.icons8.com/color/96/000000/xml-transformer.png" width="60">
            <h3 style="margin-top: 15px;">Datos & XML</h3>
            <p style="font-size: 0.9em; color: #64748b;">Validación XSD y estructuras de datos.</p>
        </div>
    </a>

</div>

<!-- Sección del Equipo (Corregida) -->
<h2 style="text-align: center; color: #1e293b; margin-bottom: 30px;">👥 El Equipo de Desarrollo</h2>
<div style="display: flex; justify-content: center; gap: 40px; flex-wrap: wrap; text-align: center;">
    
    <div style="width: 150px;">
        <img src="https://github.com/pericock.png" style="width: 80px; border-radius: 50%; border: 3px solid #007bff;">
        <h4 style="margin: 10px 0 5px 0;">Pedro</h4>
        <span style="font-size: 0.8em; color: #007bff; font-weight: bold;">DevOps / Linux</span>
    </div>

    <div style="width: 150px;">
        <img src="https://github.com/identicons/salvador.png" style="width: 80px; border-radius: 50%; border: 3px solid #28a745;">
        <h4 style="margin: 10px 0 5px 0;">Salvador</h4>
        <span style="font-size: 0.8em; color: #28a745; font-weight: bold;">Net Architect</span>
    </div>

    <div style="width: 150px;">
        <img src="https://github.com/identicons/abde.png" style="width: 80px; border-radius: 50%; border: 3px solid #dc3545;">
        <h4 style="margin: 10px 0 5px 0;">Abde</h4>
        <span style="font-size: 0.8em; color: #dc3545; font-weight: bold;">Security Lead</span>
    </div>

</div>

<hr style="margin: 50px 0; border: 0; border-top: 1px solid #e2e8f0;">

<p style="text-align: center; color: #94a3b8; font-size: 0.9em;">
    Construido para el IES Aljada • 2026
</p>
