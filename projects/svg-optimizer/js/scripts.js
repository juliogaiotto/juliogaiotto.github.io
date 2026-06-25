    const inputArea = document.getElementById('inputSvg');
    const outputArea = document.getElementById('outputSvg');
    const previewBox = document.getElementById('previewBox');
    const fileUpload = document.getElementById('fileUpload');
    
    let zoomLevel = 1;

    // Listener para upload de arquivos
    fileUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(event) {
            inputArea.value = event.target.result;
            renderPreview(event.target.result);
        };
        reader.readAsText(file);
    });

    // Atualização em tempo real do preview ao digitar no input
    inputArea.addEventListener('input', () => {
        renderPreview(inputArea.value);
    });

    // Mecanismo de Limpeza e Otimização
    function processSVG() {
        let svgString = inputArea.value.trim();
        
        if (!svgString) {
            alert("Por favor, insira ou carregue um código SVG primeiro.");
            return;
        }

        // Remove tags XML, Doctypes e comentários nativos
        svgString = svgString.replace(/<\?xml[\s\S]*?\?>/gi, '');
        svgString = svgString.replace(/<!DOCTYPE[\s\S]*?>/gi, '');
        svgString = svgString.replace(/<!--[\s\S]*?-->/g, '');

        try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(svgString, "image/svg+xml");

            if (doc.querySelector('parsererror')) {
                throw new Error("O código SVG possui erros de sintaxe estrutural.");
            }

            const svgElement = doc.documentElement;

            // Remove elementos ocultos via CSS do editor gráfico
            const hiddenElements = svgElement.querySelectorAll('[style*="display:none"], [style*="display: none"]');
            hiddenElements.forEach(el => el.remove());

            // Limpa contêineres de metadados e tags vazias comuns
            const tagsToClean = ['metadata', 'defs', 'g'];
            tagsToClean.forEach(tag => {
                const elements = svgElement.querySelectorAll(tag);
                elements.forEach(el => {
                    if (el.innerHTML.trim() === '') {
                        el.remove();
                    }
                });
            });

            // Conversão de volta para String de texto
            const serializer = new XMLSerializer();
            let cleanString = serializer.serializeToString(svgElement);

            // Varre Namespaces desnecessários (Inkscape, Illustrator, RDF)
            cleanString = cleanString.replace(/\s+xmlns:(rdf|cc|dc|sodipodi|inkscape)=".*?"/g, '');
            cleanString = cleanString.replace(/\s+(sodipodi|inkscape):[a-z\-]+=".*?"/g, '');

            // Exibe a saída formatada e atualiza a viewport
            outputArea.value = formatXML(cleanString);
            renderPreview(cleanString);

        } catch (error) {
            alert("Erro ao processar o SVG: " + error.message);
        }
    }

    // Renderização e controle de visualização do SVG
    function renderPreview(svgCode) {
        if (!svgCode.trim()) {
            previewBox.innerHTML = '<span id="previewPlaceholder" style="color: var(--comment);">A miniatura aparecerá aqui...</span>';
            return;
        }
        previewBox.innerHTML = svgCode;
        resetZoom(); // Sempre inicia novos arquivos na escala original
    }

    // Manipulação de Zoom
    function changeZoom(amount) {
        const svg = previewBox.querySelector('svg');
        if (!svg) return;

        // Restringe o zoom entre 20% e 400% do tamanho
        zoomLevel = Math.max(0.2, Math.min(4.0, zoomLevel + amount));
        svg.style.transform = `scale(${zoomLevel})`;
    }

    function resetZoom() {
        zoomLevel = 1;
        const svg = previewBox.querySelector('svg');
        if (svg) svg.style.transform = `scale(${zoomLevel})`;
    }

    // Funcionalidade de Cópia para o Clipboard
    function copyToClipboard(elementId, buttonElement) {
        const targetTextArea = document.getElementById(elementId);
        
        if (!targetTextArea.value.trim()) return;

        navigator.clipboard.writeText(targetTextArea.value).then(() => {
            const originalText = buttonElement.innerHTML;
            buttonElement.innerHTML = "✅ Copiado!";
            buttonElement.style.backgroundColor = "var(--green)";
            buttonElement.style.color = "var(--bg)";
            
            setTimeout(() => {
                buttonElement.innerHTML = originalText;
                buttonElement.style.backgroundColor = "";
                buttonElement.style.color = "";
            }, 1500);
        }).catch(err => {
            console.error("Falha ao copiar texto: ", err);
        });
    }

    // Reset geral da aplicação
    function clearAll() {
        inputArea.value = '';
        outputArea.value = '';
        fileUpload.value = '';
        renderPreview('');
    }

    // Indentador básico de nós XML/SVG
    function formatXML(xml) {
        let formatted = '';
        let pad = 0;
        xml.split(/>\s*</).forEach(function(node) {
            if (node.match( /^\/\w/ )) {
                pad -= 2;
            }
            formatted += ' '.repeat(Math.max(0, pad)) + '<' + node + '>\r\n';
            if (node.match( /^<?\w[^>]*[^\/]$/ ) && !node.startsWith("input")  ) {
                pad += 2;
            }
        });
        return formatted.substring(1, formatted.length - 2);
    }