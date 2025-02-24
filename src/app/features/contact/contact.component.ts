// contact.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgOptimizedImage } from '@angular/common';

@Component({
	selector: 'app-contact',
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule],
	templateUrl: './contact.component.html',
	styleUrl: './contact.component.scss'
})
export class ContactComponent {
	contactForm: FormGroup = new FormGroup({});

	constructor(private fb: FormBuilder) {
		this.contactForm = this.fb.group({
			name: ['', Validators.required],
			email: ['', [Validators.required, Validators.email]],
			message: ['', Validators.required]
		});
	}

	onSubmit() {
		if (this.contactForm.valid) {
			console.log('Form submitted:', this.contactForm.value);
			// Implement your form submission logic here
		}
	}
}
