import { Subject } from "rxjs";
import type { ResendWebhookEvent } from "../global-types/resend-webhook.type.js";

export const ResendEmailWebHookSubscription: Subject<ResendWebhookEvent> = new Subject()