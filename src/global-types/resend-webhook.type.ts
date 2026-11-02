export type ResendWebhookEventTypes = 
  | "email.sent"
  | "email.delivered"
  | "email.delivery_delayed"
  | "email.complained"
  | "email.bounced"
  | "email.failed"
  | "email.suppressed";

export type ResendWebhookEvent = {
  type:ResendWebhookEventTypes;
  created_at: string;
  data: {
    email_id: string;
    from: string;
    to: string[];
    subject: string;
    created_at: string;
  };
};
