import type { AppSettings } from "@shared/common/app-settings.js";

export const APP_GENERAL_SETTINGS: AppSettings = {
    allowedFileExtensions: ["png", "jpeg", "webp"],

    maxImageSizeInMB: (1024 ^ 2) * 5
}