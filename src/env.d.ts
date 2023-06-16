/// <reference types="vite/client"/>

interface ImportMetaEnv {
    VITE_PLATFORM: "Web";
    DEV: boolean;
}

interface ImportMeta {
    env: ImportMetaEnv
}
