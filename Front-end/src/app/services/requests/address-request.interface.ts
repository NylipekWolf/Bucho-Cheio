import { KeyValueItem } from '@shared/utils/interfaces/keyvalue.interface';

export interface AddressRequest {
  addressId?: number;
  street: string;
  city: string;
  stateId: number;
  zipCode: string;
  principal?: boolean;
}
