import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RippleModule } from 'primeng/ripple';
import { HttpClientInterceptor } from './interceptors/http-client.interceptor';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule, RippleModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpClientInterceptor,
      multi: true,
    },
    {
      provide: MessageService,
    },
  ],
})
export class CoreModule {}
