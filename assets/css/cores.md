```CSS
        --color-marble:     #f2f8fc;
        --color-ivory:      #feffef;
        --color-pearl:      #fbfcf6;
        --color-lavender:   #f4f1f8;
        --color-cold-steel: #f8f7f3;
        
        --color-white:      oklch(98% 0.009 271);
        --color-black:      oklch(18% 0.001 271);
        --color-red:        oklch(38% 0.126 25);
        --color-green:      oklch(38% 0.126 145);        
        --color-yellow:     oklch(85% 0.126 91);
        --color-blue:       oklch(36% 0.126 253);
        --color-purple:     oklch(38% 0.126 300);
        --color-orange:     oklch(45% 0.135 55);
        --color-pink:       oklch(38% 0.126 340);
        --color-brown:      oklch(38% 0.126 60);
        --color-gray:       oklch(50% 0 0);        
        --color-gold:       #d8b16c;
        --color-gold:       oklch(78% 0.098 80);
        --color-gold-hover: oklch(70% 0.105 80);
        --color-card-bg:    oklch(22% 0.061 267 / 0.75);
        --color-dark-blue:  oklch(22% 0.061 267);        

    /*  ──────────────────────────────────────────────────────────────────────────────────────
        PALETA DE CORES COM LIGHT-DARK()
        Sintaxe: light-dark(versão-clara, versão-escura)
        ────────────────────────────────────────────────────────────────────────────────────── */
        /* Cores de Fundo (Surfaces) ───────────────────────────────────────────────────────────── */
        --color-bg-site:        light-dark(oklch(95% 0.013 82), oklch(14% 0.035 271));
        --color-bg-site-alt:    light-dark(oklch(14% 0.035 271), oklch(95% 0.013 82));
        --color-surface:        light-dark(oklch(95% 0.013 267), oklch(30% 0.023 267));
        --color-surface-alt:    light-dark(oklch(30% 0.023 267), oklch(95% 0.013 267));
        --color-bg-card:        light-dark(oklch(97% 0.008 237), oklch(28% 0.061 267 / 0.75));
        --color-bg-card-alt:    light-dark(oklch(22% 0.061 268 / 0.75), oklch(97% 0.008 237));
        --color-bg-card-clean:  light-dark(oklch(97% 0.008 237), oklch(58% 0.061 268 / 0.75));

        /* Cores de Texto (Tipografia) ─────────────────────────────────────────────────────────── */
        --color-text:           light-dark(oklch(21% 0.001 271), oklch(98% 0.009 271));
        --color-text-alt:       light-dark(oklch(98% 0.008 271), oklch(28% 0.001 271));
        --color-text-muted:     light-dark(oklch(24% 0.029 271), oklch(71% 0.019 271));
        --color-text-muted-alt: light-dark(oklch(71% 0.019 271), oklch(61% 0.090 271));        
        /* --color-text-accent:    light-dark(oklch(78% 0.098 80), oklch(68% 0.105 80)); */
        --color-text-accent:    light-dark(oklch(72% 0.105 80), oklch(68% 0.105 80));

        /* Cores de Marca e Destaques (Brand & Accents) ───────────────────────────────────────── */
        --color-primary:   light-dark(oklch(90% 0.019 271), oklch(24% 0.024 271));
        --color-secondary: light-dark(oklch(51% 0.087 61), oklch(74% 0.087 80));
        --color-accent:    light-dark(oklch(42% 0.148 26), oklch(38% 0.126 26));
        --color-action:    light-dark(oklch(74% 0.087 80), oklch(51% 0.087 61));
        
        --color-primary-alt:    light-dark(oklch(24% 0.024 271), oklch(90% 0.019 271));
        --color-secondary-alt:  light-dark(oklch(74% 0.087 80), oklch(51% 0.087 61));
        --color-accent-alt:     light-dark(oklch(38% 0.126 26), oklch(42% 0.148 26));
        --color-action-alt:     light-dark(oklch(51% 0.087 61), oklch(74% 0.087 80));
```