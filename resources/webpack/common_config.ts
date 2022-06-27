export const IS_DEV = process.env.NODE_ENV !== "production";
export const IS_DEV_SERVER = process.env.WEBPACK_SERVE;

export function baseURL(path: string, isDev: boolean = IS_DEV) {
    const p = path.replace(/^\//, "");
    if (isDev && IS_DEV_SERVER) {
        return `http://localhost:3000/${p}`;
    } else {
        return p;
    }
}
