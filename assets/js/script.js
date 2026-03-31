// Divida o e-mail para que o bot não ache a string completa no código
const user = "&#106;&#117;&#108;&#105;&#111;&#46;&#103;&#97;&#105;&#111;&#116;&#116;&#111;"; /* julio.gaiotto */
const domain = "&#103;&#109;&#97;&#105;&#108;&#46;&#99;&#111;&#109;" /* "gmail.com"; */

const link = document.getElementById("contato-email");
link.innerHTML = `${user}@${domain}`;


(function(document) {
    var metas = document.getElementsByTagName('meta'),
        changeViewportContent = function(content) {
            for (var i = 0; i < metas.length; i++) {
                if (metas[i].name == "viewport") {
                    metas[i].content = content;
                }
            }
        },
        initialize = function() {
            changeViewportContent("width=device-width, minimum-scale=1.0, maximum-scale=1.0");
        },
        gestureStart = function() {
            changeViewportContent("width=device-width, minimum-scale=0.25, maximum-scale=1.6");
        },
        gestureEnd = function() {
            initialize();
        };


    if (navigator.userAgent.match(/iPhone/i)) {
        initialize();

        document.addEventListener("touchstart", gestureStart, false);
        document.addEventListener("touchend", gestureEnd, false);
    }
})(document);
