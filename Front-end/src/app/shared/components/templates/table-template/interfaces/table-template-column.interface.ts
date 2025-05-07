import { TableTemplateEnum } from '../enums/table-template.enum';

export interface TableTemplateColumn {
  field: string;
  header: string;
  type?: TableTemplateEnum;
}
