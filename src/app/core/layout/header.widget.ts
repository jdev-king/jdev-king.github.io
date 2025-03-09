import { Component } from '@angular/core';

@Component({
	selector: 'app-header-widget',
	template: `
		<header class="flex justify-between items-center mb-12">
			<div>
				<h1 class="text-2xl font-mono">Jesus Diez</h1>
				<h2 class="text-xl font-mono text-gray-400">{{ '@jdev-king' }}</h2>
			</div>
			<nav class="flex items-center" [style]="{ gap: '1rem' }">
				<a href="/" class="text-white hover:text-gray-300">Home</a>
				<a href="#projects" class="text-white hover:text-gray-300">Projects</a>
				<a href="#skills" class="text-white hover:text-gray-300">Expertise</a>
				<a href="#articles" class="text-white hover:text-gray-300">Articles</a>
				<a href="/contact" class="text-white hover:text-gray-300">Contact</a>
				<!-- <select class="bg-black text-white border border-gray-700 rounded">
				<option>EN</option>
				<option>GE</option>
			</select> -->
			</nav>
		</header>
	`,
	styles: [``],
	standalone: true
})
export class HeaderWidgetComponent {}
