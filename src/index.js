class Color {
    constructor() {
        this.render();
        Color.handleColorForm();
    }

    static #hexNames = {};
    static hexPattern = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;
    static partialHexPattern = /^#([0-9a-f]{0,2}|[0-9a-f]{4,5})$/i;
    static names = {
        aliceblue: '#f0f8ff',
        antiquewhite: '#faebd7',
        aqua: '#00ffff',
        aquamarine: '#7fffd4',
        azure: '#f0ffff',
        beige: '#f5f5dc',
        bisque: '#ffe4c4',
        black: '#000000',
        blanchedalmond: '#ffebcd',
        blue: '#0000ff',
        blueviolet: '#8a2be2',
        brown: '#a52a2a',
        burlywood: '#deb887',
        cadetblue: '#5f9ea0',
        chartreuse: '#7fff00',
        chocolate: '#d2691e',
        coral: '#ff7f50',
        cornflowerblue: '#6495ed',
        cornsilk: '#fff8dc',
        crimson: '#dc143c',
        cyan: '#00ffff',
        darkblue: '#00008b',
        darkcyan: '#008b8b',
        darkgoldenrod: '#b8860b',
        darkgray: '#a9a9a9',
        darkgreen: '#006400',
        darkgrey: '#a9a9a9',
        darkkhaki: '#bdb76b',
        darkmagenta: '#8b008b',
        darkolivegreen: '#556b2f',
        darkorange: '#ff8c00',
        darkorchid: '#9932cc',
        darkred: '#8b0000',
        darksalmon: '#e9967a',
        darkseagreen: '#8fbc8f',
        darkslateblue: '#483d8b',
        darkslategray: '#2f4f4f',
        darkslategrey: '#2f4f4f',
        darkturquoise: '#00ced1',
        darkviolet: '#9400d3',
        deeppink: '#ff1493',
        deepskyblue: '#00bfff',
        dimgray: '#696969',
        dimgrey: '#696969',
        dodgerblue: '#1e90ff',
        firebrick: '#b22222',
        floralwhite: '#fffaf0',
        forestgreen: '#228b22',
        fuchsia: '#ff00ff',
        gainsboro: '#dcdcdc',
        ghostwhite: '#f8f8ff',
        gold: '#ffd700',
        goldenrod: '#daa520',
        gray: '#808080',
        green: '#008000',
        greenyellow: '#adff2f',
        grey: '#808080',
        honeydew: '#f0fff0',
        hotpink: '#ff69b4',
        indianred: '#cd5c5c',
        indigo: '#4b0082',
        ivory: '#fffff0',
        khaki: '#f0e68c',
        lavender: '#e6e6fa',
        lavenderblush: '#fff0f5',
        lawngreen: '#7cfc00',
        lemonchiffon: '#fffacd',
        lightblue: '#add8e6',
        lightcoral: '#f08080',
        lightcyan: '#e0ffff',
        lightgoldenrodyellow: '#fafad2',
        lightgray: '#d3d3d3',
        lightgreen: '#90ee90',
        lightgrey: '#d3d3d3',
        lightpink: '#ffb6c1',
        lightsalmon: '#ffa07a',
        lightseagreen: '#20b2aa',
        lightskyblue: '#87cefa',
        lightslategray: '#778899',
        lightslategrey: '#778899',
        lightsteelblue: '#b0c4de',
        lightyellow: '#ffffe0',
        lime: '#00ff00',
        limegreen: '#32cd32',
        linen: '#faf0e6',
        magenta: '#ff00ff',
        maroon: '#800000',
        mediumaquamarine: '#66cdaa',
        mediumblue: '#0000cd',
        mediumorchid: '#ba55d3',
        mediumpurple: '#9370db',
        mediumseagreen: '#3cb371',
        mediumslateblue: '#7b68ee',
        mediumspringgreen: '#00fa9a',
        mediumturquoise: '#48d1cc',
        mediumvioletred: '#c71585',
        midnightblue: '#191970',
        mintcream: '#f5fffa',
        mistyrose: '#ffe4e1',
        moccasin: '#ffe4b5',
        navajowhite: '#ffdead',
        navy: '#000080',
        oldlace: '#fdf5e6',
        olive: '#808000',
        olivedrab: '#6b8e23',
        orange: '#ffa500',
        orangered: '#ff4500',
        orchid: '#da70d6',
        palegoldenrod: '#eee8aa',
        palegreen: '#98fb98',
        paleturquoise: '#afeeee',
        palevioletred: '#db7093',
        papayawhip: '#ffefd5',
        peachpuff: '#ffdab9',
        peru: '#cd853f',
        pink: '#ffc0cb',
        plum: '#dda0dd',
        powderblue: '#b0e0e6',
        purple: '#800080',
        rebeccapurple: '#663399',
        red: '#ff0000',
        rosybrown: '#bc8f8f',
        royalblue: '#4169e1',
        saddlebrown: '#8b4513',
        salmon: '#fa8072',
        sandybrown: '#f4a460',
        seagreen: '#2e8b57',
        seashell: '#fff5ee',
        sienna: '#a0522d',
        silver: '#c0c0c0',
        skyblue: '#87ceeb',
        slateblue: '#6a5acd',
        slategray: '#708090',
        slategrey: '#708090',
        snow: '#fffafa',
        springgreen: '#00ff7f',
        steelblue: '#4682b4',
        tan: '#d2b48c',
        teal: '#008080',
        thistle: '#d8bfd8',
        tomato: '#ff6347',
        turquoise: '#40e0d0',
        violet: '#ee82ee',
        wheat: '#f5deb3',
        white: '#ffffff',
        whitesmoke: '#f5f5f5',
        yellow: '#ffff00',
        yellowgreen: '#9acd32',
    };
    static namedCodes = Color.#getNamedCodes();
    static #shorts = {};
    static substrings = Color.#listSubstrings();

    static expandHex(hex) {
        // Expand 3 digit hexadecimal color codes into 6 digit codes.
        return hex.replace(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i, '#$1$1$2$2$3$3');
    }

    static findName(hex) {
        hex = Color.expandHex(hex);
        hex = hex.toLowerCase();

        if (Object.hasOwn(Color.#hexNames, hex)) {
            return Color.#hexNames[hex];
        }

        const name = Object.keys(Color.names).find(name => Color.names[name] === hex);
        Color.#hexNames[hex] = name;

        return name;
    }

    static isDark(hex) {
        return !Color.isLight(hex);
    }

    static isLight(hex) {
        const luma = Color.getBrightness(hex);
        return luma > 128;
    }

    static getBrightness(hex) {
        const fullHex = Color.expandHex(hex);
        const red = parseInt(fullHex.substring(1, 3), 16);
        const green = parseInt(fullHex.substring(3, 5), 16);
        const blue = parseInt(fullHex.substring(5, 8), 16);

        // See: https://en.wikipedia.org/wiki/Rec._709#Luma_coefficients
        return (0.2126 * red) + (0.7152 * green) + (0.0722 * blue);
    }

    static getBrightnessPercentage(hex, digits = 0) {
        const luma = Color.getBrightness(hex) / 255;
        const percent = luma * 100;
        return percent.toFixed(digits);
    }

    static #getNamedCodes() {
        const codes = {};
        for (const name in Color.names) {
            const code = Color.names[name];
            if (code in codes) {
                codes[code].push(name);
            }
            else {
                codes[code] = [name];
            }
        }
        return codes;
    }

    static #addSubstrings(substrings, string, name = null) {
        // Accepts:
        // - an object, with substrings as keys, and matching names in an array,
        // - the string to add substrings of, starting from the beginning,
        // - an optional name to store in the array, otherwise uses the 2nd arg.
        // Returns undefined, modifies the object (1st arg) by reference.
        if (!name) {
            name = string;
        }
        for (let start = 0; start < string.length; start++) {
            for (let end = start + 1; end <= string.length; end++) {
                const substring = string.substring(start, end);
                if (!(substring in substrings)) {
                    substrings[substring] = [name];
                }
                else if (substrings[substring].indexOf(name) === -1) {
                    substrings[substring].push(name);
                }
            }
        }
    }

    static #listSubstrings() {
        const substrings = {};

        for (const name in Color.names) {
            Color.#addSubstrings(substrings, name);
        }

        for (const code in Color.namedCodes) {
            const names = Color.namedCodes[code];
            const short = Color.shortenHex(code, false);
            for (const name of names) {
                Color.#addSubstrings(substrings, code, name);
                if (short.length !== 4) {
                    continue;
                }
                Color.#addSubstrings(substrings, short, name);
            }
        }

        return substrings;
    }

    static shortenHex(hex, strict = true) {
        // Accepts a 6 digit hex code, with a leading # (e.g. "#cd853f").
        // Returns a 3 digit hex code only if all 3 color components are
        // repeated (e.g. "#663399" becomes "#639") when the 2nd arg is omitted
        // or true and otherwise returns the 1st arg, or the closest 3 digit
        // hex code if the 2nd arg is false (e.g. "#cd853f" becomes "#c84").

        if (hex.length !== 7) {
            return hex;
        }

        const red = hex.substring(1, 3);
        const green = hex.substring(3, 5);
        const blue = hex.substring(5, 8);

        const r = Color.shortenHexComponent(red, strict);
        if (r.length !== 1) {
            return hex;
        }

        const g = Color.shortenHexComponent(green, strict);
        if (g.length !== 1) {
            return hex;
        }

        const b = Color.shortenHexComponent(blue, strict);
        if (b.length !== 1) {
            return hex;
        }

        return `#${r}${g}${b}`;
    }

    static shortenHexComponent(hex, strict = true) {
        // Accepts a 2 digit hex code, without a leading # (e.g. "ff").
        // Returns a single hex digit if the 1st is repetitive, (e.g. "ff"
        // becomes "f"), or the nearest 1 digit hex code (e.g. "f0" becomes
        // "e") if the 2nd arg is false.

        if (hex.length !== 2) {
            return '';
        }

        // Is it already the same hexadecimal digit repeated?
        const h = hex[0];
        if (h === hex[1]) {
            return h;
        }

        if (strict) {
            return '';
        }

        // Is it already cached?
        if (hex in Color.#shorts) {
            return Color.#shorts[hex];
        }

        // What is the most significant figure repeated?
        const hh = `${h}${h}`;

        // What are the decimal values?
        const dec = parseInt(hex, 16);
        const d = parseInt(h, 16);
        const dd = parseInt(hh, 16);

        // Find decimal candidates above and below our input.
        let above = dd;
        let below = dd;
        if (dd > dec) {
            const n = (d < 1) ? d : d - 1;
            const x = n.toString(16);
            const xx = `${x}${x}`;
            below = parseInt(xx, 16);
        }
        else {
            const n = (d > 14) ? d : d + 1;
            const x = n.toString(16);
            const xx = `${x}${x}`;
            above = parseInt(xx, 16);
        }

        // Which candidate is nearer to our input?
        const decimal = ((above - dec) < 9) ? above : below;

        // Convert the winning decimal to hex, and shorten it.
        const ret = decimal.toString(16).substring(0, 1);

        // Cache the result.
        Color.#shorts[hex] = ret;

        return ret;
    }

    static style(hex) {
        const textColor = (Color.isLight(hex)) ? 'black' : 'white';
        return `background-color: ${hex}; color: ${textColor}`;
    }

    render() {
        let html = Color.renderColorForm();
        html += Color.renderColors();

        document.body.insertAdjacentHTML('beforeend', html);
    }

    static handleColorForm() {
        const form = document.querySelector('form#color');

        if (form === null) {
            return;
        }

        const input = form.querySelector('input[name="color"]');
        input.addEventListener('input', event => {
            const colorsDiv = document.querySelector('div#colors');
            colorsDiv.innerHTML = Color.renderColors(input.value);
        });
    }

    static renderColorForm() {
        let html = '<form id="color">';
        html += '<input name="color">';
        html += '</form>';

        return html;
    }

    static renderColors(color = null) {
        let html = '<div id="colors">';
        html += Color.renderColorNames(color);
        html += Color.renderColorCodes(color);
        html += '</div>';
        return html;
    }

    static renderColorNames(color = null) {
        if (color !== null) {
            color = color.trim();
        }

        const colorNames = (!color) ? Object.keys(Color.names) :
            (color in Color.substrings) ? Color.substrings[color] : [];

        if (colorNames.length < 1) {
            return '';
        }

        let html = '<table class="color-names"><thead>';
        html += '<th class="color-name">Name</th>';
        html += '<th class="color-code">Code</th>';
        html += '<th class="color-code" title="Nearest short code">Short</th>';
        html += '</tr></thead><tbody>';

        for (const name of colorNames) {
            const hex = Color.names[name];
            const hexLuma = Color.getBrightnessPercentage(hex, 1);
            const hexTitle = `Brightness: ${hexLuma}%`;
            const hexStyle = Color.style(hex);

            const shortHex = Color.shortenHex(hex, false);
            const shortHexLuma = Color.getBrightnessPercentage(shortHex, 1);
            const shortHexTitle = `Brightness: ${shortHexLuma}%`;
            const shortHexStyle = Color.style(shortHex);

            const textColor = (Color.isLight(hex)) ? 'black' : 'white';
            const nameStyle = `background: ${name}; color: ${textColor}`;

            html += '<tr>';
            html += `<td class="color-name" style="${nameStyle}">${name}</td>`;
            html += `<td class="color-code" style="${hexStyle}" title="${hexTitle}">${hex}</td>`;
            html += `<td class="color-code" style="${shortHexStyle}" title="${shortHexTitle}">${shortHex}</td>`;
            html += '</tr>';
        }

        html += '</tbody></table>';

        return html;
    }

    static renderColorCodes(color = null) {
        if (color !== null) {
            color = color.trim();
        }

        const prefix = (color !== null && color.length > 4) ? color.substring(1, 4) : '';

        const max = 4096;
        let count = 0;
        let rowMax = 0;
        let html = '';

        while (rowMax <= max) {
            let tr = '';

            for (; count < rowMax; count += 1) {
                const hex = '#' + prefix + count.toString(16).padStart(3, '0');
                const luma = Color.getBrightnessPercentage(hex, 1);
                const title = `Brightness: ${luma}%`;

                if (color !== null && hex.indexOf(color) === -1) {
                    tr += (color.length < 3) ? '<td></td>' : '';
                    continue;
                }

                const style = Color.style(hex);
                tr += `<td style="${style}" title="${title}">${hex}</td>`;
            }

            if (tr.indexOf('#') !== -1) {
                html += `<tr>${tr}</tr>`;
            }

            rowMax += 16;
        }

        if (html.length > 0) {
            html = `<table class="color-codes"><tbody>${html}</tbody></table>`;
        }

        return html;
    }
}

new Color();
