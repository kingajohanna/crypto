export const Colors = {
    richBlack: "#0B0C10",
    gunmetal: "#1F2833",
    silverSand: "#C5C6C7",
    fluorescentBlue: "#4CECE0",
    cadetBlue: "#45A29E",
    facebookBlue: "#1877F2",
    white: "#FFFFFF",
    black: "#000000",
    gray: "#8B8B8B",
};

export function hexToRGBA(h: string, opacity = 1): string {
    let r = "";
    let g = "";
    let b = "";

    if (h.length === 4) {
        r = `0x${h[1]}${h[1]}`;
        g = `0x${h[2]}${h[2]}`;
        b = `0x${h[3]}${h[3]}`;
    } else if (h.length === 7) {
        r = `0x${h[1]}${h[2]}`;
        g = `0x${h[3]}${h[4]}`;
        b = `0x${h[5]}${h[6]}`;
    }

    return `rgba(${parseInt(r, 16)}, ${parseInt(g, 16)}, ${parseInt(b, 16)}, ${opacity})`;
}
