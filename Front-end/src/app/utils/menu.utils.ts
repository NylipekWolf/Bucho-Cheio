import { PrimeIcons } from 'primeng/api';

export function findMenuIcon(functionalityName: string): string {
  let icon;
  switch (functionalityName) {
    case 'Dashboard':
      icon = PrimeIcons.TH_LARGE;
      break;
    case 'Registration':
      icon = PrimeIcons.BOOK;
      break;
    case 'Sales':
      icon = PrimeIcons.SHOPPING_BAG;
      break;
    case 'Stock':
      icon = PrimeIcons.INBOX;
      break;
    case 'Labor':
      icon = PrimeIcons.BRIEFCASE;
      break;
    case 'Report':
      icon = PrimeIcons.CHART_BAR;
      break;
    case 'Settings':
      icon = PrimeIcons.COG;
      break;
    default:
      icon = PrimeIcons.LIST;
      break;
  }
  return icon;
}
