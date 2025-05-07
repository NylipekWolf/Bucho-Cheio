import { MessageService } from 'primeng/api';

export function showWarningMessage(
  messageService: MessageService,
  message: string
): void {
  messageService.add({
    severity: 'warn',
    summary: 'I have some info.',
    detail: message,
    life: 9999,
  });
}

export function showErrorMessage(
  messageService: MessageService,
  message: string
): void {
  messageService.add({
    severity: 'error',
    summary: `I'm sorry.`,
    detail: message,
    life: 9999,
  });
}

export function showSuccessMessage(
  messageService: MessageService,
  message: string
): void {
  messageService.add({
    severity: 'success',
    summary: 'Successfully',
    detail: message,
  });
}
