import { MessageService } from 'primeng/api';

export function warning(message: string, messageService: MessageService): void {
  messageService.add({
    severity: 'warn',
    summary: message,
    detail: `Oops, sorry :(`,
  });
}

export function itemHasBeenAdded(messageService: MessageService): void {
  warning('This item has already been added', messageService);
}

export function itemMustBeSelected(messageService: MessageService): void {
  warning('An item must be selected', messageService);
}

export function itemHasAnIncorrectPercentage(
  messageService: MessageService
): void {
  warning('This item has an incorrect percentage', messageService);
}
