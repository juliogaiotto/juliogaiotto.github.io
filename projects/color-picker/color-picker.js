const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const selector = document.getElementById("selector");
const preview = document.getElementById("preview");
const hexField = document.getElementById("hexField");
const oklchField = document.getElementById("oklchField");
const lightnessSlider = document.getElementById("lightnessSlider");
const alphaSlider = document.getElementById("alphaSlider");
const size = canvas.width;
const radius = size / 2;
const center = radius;

let isDragging = false;
let currentHue = 0;
let currentSaturation = 1;
let currentLightness = 0.5;
let currentAlpha = 1;

//
// DESENHA RODA
//
function drawWheel() {

    const image = ctx.createImageData(size, size);
    const data = image.data;

    for (let y = 0; y < size; y++) {

        for (let x = 0; x < size; x++) {

            const dx = x - center;
            const dy = y - center;

            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist <= radius) {

                let angle =
                    Math.atan2(dy, dx) *
                    180 / Math.PI;

                if (angle < 0) {
                    angle += 360;
                }

                const saturation = dist / radius;

                const rgb = hslToRgb(
                    angle,
                    saturation,
                    currentLightness
                );

                const i = (y * size + x) * 4;

                data[i] = rgb.r;
                data[i + 1] = rgb.g;
                data[i + 2] = rgb.b;
                data[i + 3] = 255;
            }
        }
    }

    ctx.putImageData(image, 0, 0);
}

//
// HSL -> RGB
//
function hslToRgb(h, s, l) {

    h /= 360;

    let r, g, b;

    if (s === 0) {

        r = g = b = l;

    } else {

        const hue2rgb = (p, q, t) => {

            if (t < 0) t += 1;
            if (t > 1) t -= 1;

            if (t < 1 / 6)
                return p + (q - p) * 6 * t;

            if (t < 1 / 2)
                return q;

            if (t < 2 / 3)
                return p + (q - p) * (2 / 3 - t) * 6;

            return p;
        };

        const q =
            l < 0.5
                ? l * (1 + s)
                : l + s - l * s;

        const p = 2 * l - q;

        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

//
// RGB -> HEX
//
function rgbToHex(r, g, b) {

    return "#" + [r, g, b]
        .map(v =>
            v.toString(16)
                .padStart(2, "0")
        )
        .join("");
}

//
// HEX -> RGB
//
function hexToRgb(hex) {

    hex = hex.replace("#", "");

    if (hex.length === 3) {

        hex = hex
            .split("")
            .map(v => v + v)
            .join("");
    }

    if (hex.length !== 6) {
        return null;
    }

    const num =
        parseInt(hex, 16);

    return {
        r: (num >> 16) & 255,
        g: (num >> 8) & 255,
        b: num & 255
    };
}

//
// RGB -> HSL
//
function rgbToHsl(r, g, b) {

    r /= 255;
    g /= 255;
    b /= 255;

    const max =
        Math.max(r, g, b);

    const min =
        Math.min(r, g, b);

    let h, s;

    const l =
        (max + min) / 2;

    if (max === min) {

        h = s = 0;

    } else {

        const d = max - min;

        s =
            l > 0.5
                ? d / (2 - max - min)
                : d / (max + min);

        switch (max) {

            case r:
                h =
                    (g - b) / d +
                    (g < b ? 6 : 0);
                break;

            case g:
                h =
                    (b - r) / d + 2;
                break;

            case b:
                h =
                    (r - g) / d + 4;
                break;
        }

        h /= 6;
    }

    return {
        h: h * 360,
        s,
        l
    };
}

//
// RGB -> OKLCH
//
function rgbToOklch(r, g, b) {

    r /= 255;
    g /= 255;
    b /= 255;

    const linear = c =>
        c <= 0.04045
            ? c / 12.92
            : Math.pow(
                (c + 0.055) / 1.055,
                2.4
            );

    r = linear(r);
    g = linear(g);
    b = linear(b);

    const l =
        0.4122214708 * r +
        0.5363325363 * g +
        0.0514459929 * b;

    const m =
        0.2119034982 * r +
        0.6806995451 * g +
        0.1073969566 * b;

    const s =
        0.0883024619 * r +
        0.2817188376 * g +
        0.6299787005 * b;

    const l_ = Math.cbrt(l);
    const m_ = Math.cbrt(m);
    const s_ = Math.cbrt(s);

    const L =
        0.2104542553 * l_ +
        0.793617785 * m_ -
        0.0040720468 * s_;

    const a =
        1.9779984951 * l_ -
        2.428592205 * m_ +
        0.4505937099 * s_;

    const b2 =
        0.0259040371 * l_ +
        0.7827717662 * m_ -
        0.808675766 * s_;

    const C =
        Math.sqrt(a * a + b2 * b2);

    let H =
        Math.atan2(b2, a) *
        180 / Math.PI;

    if (H < 0) {
        H += 360;
    }

    return {
        L,
        C,
        H
    };
}

//
// ATUALIZA UI
//
function updateColor(r, g, b) {

    const hex =
        rgbToHex(r, g, b);

    const oklch =
        rgbToOklch(r, g, b);

    preview.style.background =
        `rgba(${r},${g},${b},${currentAlpha})`;

    hexField.value = hex;

    oklchField.value =
        `oklch(${oklch.L.toFixed(3)} ${oklch.C.toFixed(3)} ${oklch.H.toFixed(1)} / ${currentAlpha.toFixed(2)})`;
}

//
// POSICIONA SELETOR
//
function updateSelectorPosition() {

    const angle =
        currentHue *
        Math.PI / 180;

    const dist =
        currentSaturation *
        radius;

    const x =
        center +
        Math.cos(angle) * dist;

    const y =
        center +
        Math.sin(angle) * dist;

    selector.style.left =
        x + "px";

    selector.style.top =
        y + "px";
}

//
// SELECIONA COR
//
function pickColor(clientX, clientY) {

    const rect =
        canvas.getBoundingClientRect();

    const x =
        clientX - rect.left;

    const y =
        clientY - rect.top;

    const dx = x - center;
    const dy = y - center;

    const dist =
        Math.sqrt(dx * dx + dy * dy);

    if (dist > radius) {
        return;
    }

    selector.style.left =
        x + "px";

    selector.style.top =
        y + "px";

    const pixel =
        ctx.getImageData(
            x,
            y,
            1,
            1
        ).data;

    const r = pixel[0];
    const g = pixel[1];
    const b = pixel[2];

    const hsl =
        rgbToHsl(r, g, b);

    currentHue = hsl.h;
    currentSaturation = hsl.s;

    updateColor(r, g, b);
}

//
// MOUSE
//
canvas.addEventListener("mousedown", e => {

    isDragging = true;

    pickColor(
        e.clientX,
        e.clientY
    );
});

window.addEventListener("mousemove", e => {

    if (isDragging) {

        pickColor(
            e.clientX,
            e.clientY
        );
    }
});

window.addEventListener("mouseup", () => {

    isDragging = false;
});

//
// TOUCH
//
canvas.addEventListener(
    "touchmove",
    e => {

        e.preventDefault();

        const touch =
            e.touches[0];

        pickColor(
            touch.clientX,
            touch.clientY
        );

    },
    { passive: false }
);

//
// BRILHO
//
lightnessSlider.addEventListener(
    "input",
    () => {

        currentLightness =
            lightnessSlider.value / 100;

        drawWheel();

        const rgb = hslToRgb(
            currentHue,
            currentSaturation,
            currentLightness
        );

        updateColor(
            rgb.r,
            rgb.g,
            rgb.b
        );
    }
);

//
// TRANSPARÊNCIA
//
alphaSlider.addEventListener(
    "input",
    () => {

        currentAlpha =
            alphaSlider.value / 100;

        const rgb = hslToRgb(
            currentHue,
            currentSaturation,
            currentLightness
        );

        updateColor(
            rgb.r,
            rgb.g,
            rgb.b
        );
    }
);

//
// ENTER HEX
//
hexField.addEventListener(
    "keydown",
    e => {

        if (e.key === "Enter") {

            const rgb =
                hexToRgb(
                    hexField.value
                );

            if (!rgb) {

                alert("HEX inválido");
                return;
            }

            const hsl =
                rgbToHsl(
                    rgb.r,
                    rgb.g,
                    rgb.b
                );

            currentHue = hsl.h;
            currentSaturation = hsl.s;
            currentLightness = hsl.l;

            lightnessSlider.value =
                Math.round(
                    currentLightness * 100
                );

            drawWheel();

            updateSelectorPosition();

            const finalRgb =
                hslToRgb(
                    currentHue,
                    currentSaturation,
                    currentLightness
                );

            updateColor(
                finalRgb.r,
                finalRgb.g,
                finalRgb.b
            );
        }
    }
);

//
// ENTER OKLCH
//
oklchField.addEventListener(
    "keydown",
    e => {

        if (e.key === "Enter") {

            try {

                const value =
                    oklchField.value.trim();

                const div =
                    document.createElement("div");

                div.style.color = value;

                document.body.appendChild(div);

                const computed =
                    getComputedStyle(div).color;

                document.body.removeChild(div);

                const match =
                    computed.match(/\d+/g);

                if (!match) {
                    throw "erro";
                }

                const r =
                    Number(match[0]);

                const g =
                    Number(match[1]);

                const b =
                    Number(match[2]);

                const hsl =
                    rgbToHsl(r, g, b);

                currentHue = hsl.h;
                currentSaturation = hsl.s;
                currentLightness = hsl.l;

                lightnessSlider.value =
                    Math.round(
                        currentLightness * 100
                    );

                drawWheel();

                updateSelectorPosition();

                const finalRgb =
                    hslToRgb(
                        currentHue,
                        currentSaturation,
                        currentLightness
                    );

                updateColor(
                    finalRgb.r,
                    finalRgb.g,
                    finalRgb.b
                );

            } catch {

                alert("Valor OKLCH inválido");
            }
        }
    }
);

//
// INICIALIZAÇÃO
//
drawWheel();

const initial =
    hslToRgb(0, 1, 0.5);

updateColor(
    initial.r,
    initial.g,
    initial.b
);

updateSelectorPosition();