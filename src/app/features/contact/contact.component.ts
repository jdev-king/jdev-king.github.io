import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGithub, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
	selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, FontAwesomeModule],
	templateUrl: './contact.component.html',
	styleUrl: './contact.component.scss'
})
export class ContactComponent {
  readonly faEnvelope = faEnvelope;
  readonly faGithub = faGithub;
  readonly faLinkedin = faLinkedin;
  readonly faInstagram = faInstagram;
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
