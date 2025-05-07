import { SalesProductKitResponse } from '@modules/site/modules/sales/sales-customer/service/responses/sales-product-kit-response.interface';

export interface SalesItem {
  itemId: number | null;
  name: string;
  salePrice: number;
  costPrice?: number;
  quantity: number;
  taxable: boolean;
  kitProducts?: SalesProductKitResponse[];
  kitName?: string;
}
