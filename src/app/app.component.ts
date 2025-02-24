import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderWidgetComponent } from './core/layout/header.widget';
import { FooterComponent } from './core/layout/footer.widget';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, HeaderWidgetComponent, FooterComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss'
})
export class AppComponent {
	title = 'jdev-king.github.io';
}
