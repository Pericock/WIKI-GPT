<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" 
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:mw="http://www.mediawiki.org/xml/export-0.10/"
                exclude-result-prefixes="mw">
    
    <xsl:output method="html" indent="yes" encoding="UTF-8"/>

    <xsl:template match="/">
        <html>
            <head>
                <title>Vista Previa: <xsl:value-of select="//mw:page/mw:title"/></title>
                <style>
                    body {
                        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                        background-color: #f6f6f6;
                        margin: 0;
                        padding: 20px;
                        color: #202122;
                    }
                    .mw-body {
                        background-color: #ffffff;
                        border: 1px solid #a2a9b1;
                        padding: 1.25em 1.5em;
                        max-width: 900px;
                        margin: 0 auto;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    }
                    h1 {
                        font-family: 'Linux Libertine', 'Georgia', 'Times', serif;
                        font-size: 1.8em;
                        border-bottom: 1px solid #a2a9b1;
                        margin-bottom: 0.25em;
                        padding-top: 0;
                    }
                    .site-notice {
                        font-size: 0.8em;
                        color: #54595d;
                        margin-bottom: 1em;
                    }
                    .content-text {
                        line-height: 1.6;
                        white-space: pre-wrap; /* Mantiene los saltos de línea del wikitexto */
                        font-size: 0.95em;
                        background: #f8f9fa;
                        padding: 15px;
                        border: 1px solid #eaecf0;
                        border-radius: 2px;
                    }
                    .metadata {
                        font-size: 0.75em;
                        color: #72777d;
                        border-top: 1px solid #eaecf0;
                        margin-top: 20px;
                        padding-top: 10px;
                    }
                    .infobox-sim {
                        float: right;
                        width: 280px;
                        background-color: #f8f9fa;
                        border: 1px solid #a2a9b1;
                        padding: 5px;
                        margin-left: 15px;
                        font-size: 0.85em;
                    }
                </style>
            </head>
            <body>
                <div class="mw-body">
                    <div class="site-notice">De Wikipedia, la enciclopedia libre (Simulación XML)</div>
                    <h1><xsl:value-of select="//mw:page/mw:title"/></h1>
                    
                    <div class="content-text">
                        <xsl:value-of select="//mw:page/mw:revision/mw:text"/>
                    </div>

                    <div class="metadata">
                        <strong>Última revisión:</strong> <xsl:value-of select="//mw:page/mw:revision/mw:timestamp"/> <br/>
                        <strong>Colaborador:</strong> <xsl:value-of select="//mw:page/mw:revision/mw:contributor/mw:username"/> <br/>
                        <strong>Comentario:</strong> <xsl:value-of select="//mw:page/mw:revision/mw:comment"/>
                    </div>
                </div>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
