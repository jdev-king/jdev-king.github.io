import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGithub, faLinkedin, faInstagram, faMedium } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-hero-section',
  imports: [CommonModule, RouterModule, FontAwesomeModule],
	templateUrl: './hero-section.component.html',
	styleUrl: './hero-section.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroSectionComponent {
  readonly socialLinks = [
    {
      href: 'https://github.com/jdev-king',
      icon: faGithub,
      label: 'GitHub Profile',
      name: 'GitHub'
    },
    {
      href: 'https://www.linkedin.com/in/jesusdiezp/',
      icon: faLinkedin,
      label: 'LinkedIn Profile',
      name: 'LinkedIn'
    },
    {
      href: 'https://jdev-king.medium.com',
      icon: faMedium,
      label: 'Medium Profile',
      name: 'Medium'
    },
    {
      href: 'https://www.instagram.com/jdev_king/',
      icon: faInstagram,
      label: 'Instagram Profile',
      name: 'Instagram'
    }
  ] as const;

  readonly heroMetrics = [
    { value: '-95%', label: 'Costo LLM', note: 'Gemini Flash-8B + Cache' },
    { value: '<50ms', label: 'Latencia Cache', note: 'Redis Cognitive Firewall' },
    { value: '33,000+', label: 'Consultas / Día', note: 'GraphRAG en GKE' },
    { value: '$1.83/mo', label: 'TCO Cliente', note: 'Serverless Dataflow + BQ' }
  ] as const;

  readonly heroContent = {
    badge: 'Tech Lead & Full Stack AI Engineer • Cloud-Native & Distributed Systems',
    headlinePrefix: 'Diseñando Soluciones de IA y',
    headlineAccent: 'Arquitecturas Cloud',
    description:
      'Lidero el diseño e implementación de sistemas de IA de alta disponibilidad y plataformas de interoperabilidad empresarial para gigantes de comercio internacional (DHL, Maersk, Expeditors, Ripley). Especializado en GraphRAG, captura en tiempo real (CDC Debezium) y pipelines híbridos en GCP y AWS.',
    image: {
      src: 'imgs/black_background.jpg',
      alt: 'Jesus Diez - Tech Lead & AI Engineer'
    }
  } as const;

  trackBySocialLink(index: number, item: typeof this.socialLinks[number]): string {
    return item.name;
  }
}

