import { Component } from '@angular/core';

@Component({
	selector: 'app-footer-widget',
	template: `
		<!-- Credly badge image fallback since embed is not working -->
		<!-- <a href="https://www.credly.com/badges/8fdcaf01-04a9-40b5-9224-0d3a188bbe08/public_url" target="_blank">
			<img
				width="150"
				height="150"
				src="https://images.credly.com/images/4dda8ae4-99ee-476c-bca3-6f0adbab42fe/image.png"
				alt="AWS Certified Cloud Practitioner Badge"
			/>
		</a> -->
	`,
	styles: [``]
})
export class FooterComponent {}
