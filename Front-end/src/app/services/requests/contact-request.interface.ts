export interface ContactRequest {
  contactId?: number;
  description: string;
  owner: string;
  contactTypeId: number;
  principal?: boolean;
}
