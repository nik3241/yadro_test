import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WidgetCurrencyValueComponent } from './widgets/widget-currency-value/widget-currency-value.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WidgetCurrencyValueComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Тестовое задание на стажировку в YADRO';
}
