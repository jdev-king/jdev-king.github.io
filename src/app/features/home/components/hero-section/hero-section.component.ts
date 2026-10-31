import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGithub, faLinkedin, faInstagram, faMedium } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-hero-section',
  standalone: true,
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

  readonly rfcIndex = [
    {
      id: 'sintad-ai-agent',
      code: 'RFC-AI-301',
      title: 'SINTAD AI Knowledge Agent v3.1',
      spec: 'GKE · Redis Semantic Cache (<50ms) · Neo4j GraphRAG',
    },
    {
      id: 'nexusflow-v1',
      code: 'RFC-ERP-101',
      title: 'NexusFlow Hybrid ERP Integration v1.0',
      spec: 'Debezium Binlog CDC (0.0% Locks) · Firestore · Claim-Check',
    },
    {
      id: 'analytics-bridge',
      code: 'RFC-DATA-201',
      title: 'Unified Analytics Bridge v2.0',
      spec: 'Apache Beam Dataflow · BigQuery Star Schema ($1.83 a $4.33/mes)',
    },
  ] as const;

  readonly heroContent = {
    roleLine: 'Jesus Sebastian Diez Plasencia (@jdev-king) · Tech Lead & Arquitecto de Sistemas IA en AICSAC / SINTAD',
    headline: 'Arquitectura de Sistemas IA, GraphRAG Híbrido e Interoperabilidad Cloud.',
    description:
      'Diseño y dirijo la implementación de sistemas distribuidos e inteligencia artificial en producción que conectan ERPs transaccionales con Google Cloud y AWS. Autor de las arquitecturas Fortress Lite (GraphRAG sobre Kubernetes), NexusFlow (captura de datos Debezium CDC sin bloqueos) y Unified Analytics Bridge (streaming en Apache Beam hacia BigQuery).',
    image: {
      src: 'imgs/black_background.jpg',
      alt: 'Retrato de Jesus Sebastian Diez Plasencia, Tech Lead y Arquitecto de Sistemas IA'
    }
  } as const;

  trackBySocialLink(_index: number, item: typeof this.socialLinks[number]): string {
    return item.name;
  }

  scrollToSection(event: Event, id: string): void {
    event.preventDefault();
    const el = document.getElementById(id);
    if (el && typeof window !== 'undefined') {
      const y = el.getBoundingClientRect().top + window.scrollY - 84;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }
}


