export interface FunctionalityResponse {
  id: number;
  name: string;
  assortment: number;
  children: FunctionalityResponse[];
}
