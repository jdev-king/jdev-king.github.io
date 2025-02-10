import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

export const slideAnimation = trigger('slideAnimation', [
	transition(':increment', [
		query(
			':enter',
			[
				style({ transform: 'translateX(100%)', opacity: 0 }),
				stagger(100, [animate('400ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))])
			],
			{ optional: true }
		),
		query(
			':leave',
			[stagger(100, [animate('400ms ease-out', style({ transform: 'translateX(-100%)', opacity: 0 }))])],
			{ optional: true }
		)
	]),
	transition(':decrement', [
		query(
			':enter',
			[
				style({ transform: 'translateX(-100%)', opacity: 0 }),
				stagger(100, [animate('400ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))])
			],
			{ optional: true }
		),
		query(':leave', [stagger(100, [animate('400ms ease-out', style({ transform: 'translateX(100%)', opacity: 0 }))])], {
			optional: true
		})
	])
]);

export const fadeAnimation = trigger('fadeAnimation', [
	transition(':enter', [
		style({ opacity: 0, transform: 'scale(0.95)' }),
		animate('300ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
	]),
	transition(':leave', [animate('300ms ease-in', style({ opacity: 0, transform: 'scale(0.95)' }))])
]);
