import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { fadeAnimation, slideAnimation } from '../../shared/animations/animations';
import { SkillsComponent } from './components/skills/skills.component';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { ScrollScrubberComponent } from './components/scroll-scrubber/scroll-scrubber.component';
import { ProjectsComponent } from './components/projects-section/projects-section.component';
import { WorkComponent } from './components/work/work.component';
import { ArticlesComponent } from './components/articles-section/articles-section.component';
import { EnterprisePipelineComponent } from './components/enterprise-pipeline/enterprise-pipeline.component';

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [
		CommonModule,
		RouterModule,
		HeroSectionComponent,
		ScrollScrubberComponent,
		EnterprisePipelineComponent,
		ProjectsComponent,
		SkillsComponent,
		WorkComponent,
		ArticlesComponent
	],
	animations: [slideAnimation, fadeAnimation],
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
	readonly flagshipArchitecture = {
		id: 'sintad-ai-agent',
		code: 'RFC-AI-301 · v3.1',
		title: 'SINTAD AI Knowledge Agent (Fortress Lite)',
		subtitle: 'Kubernetes GKE · Redis Semantic Cache · Hybrid GraphRAG (Neo4j + pgvector)',
		summary:
			'Sistema conversacional en producción para comercio exterior, aduanas y contabilidad que procesa 33,333 consultas diarias con un presupuesto total de $800 USD/mes. El cortafuegos semántico en Redis resuelve el 40% del tráfico recurrente en menos de 50ms antes de invocar agentes LightRAG y Gemini Flash.',
		metrics: [
			{ label: 'Reducción Costo Inferencia', value: '-95%' },
			{ label: 'Latencia Cache Hit', value: '<50ms' },
			{ label: 'Volumen Operativo', value: '33,333 / día' },
		],
		diagramsCount: '1 Diagrama Archify',
	};

	readonly supportingArchitectures = [
		{
			id: 'nexusflow-v1',
			code: 'RFC-ERP-101 · v1.0',
			title: 'NexusFlow Hybrid ERP Integration',
			subtitle: 'Debezium Binlog CDC · Cloud Run · Firestore Locks · Claim-Check',
			summary:
				'Puente de integración asíncrono entre servidores MySQL 5.7 on-premise y Google Cloud. Captura cambios directamente del Binary Log sin generar bloqueos en tablas transaccionales y descarga payloads mayores a 1MB en Cloud Storage.',
			metric: '0.0% DB Locks en ERP Legacy',
			diagramsCount: '2 Diagramas Archify',
		},
		{
			id: 'analytics-bridge',
			code: 'RFC-DATA-201 · v2.0',
			title: 'Unified Analytics Bridge',
			subtitle: 'Cloud Dataflow (Apache Beam) · BigQuery Star Schema · FastAPI',
			summary:
				'Pipeline de datos con estado en streaming que homologa más de 15 tablas operativas del ERP legacy hacia un esquema dimensional Star Schema en BigQuery, consumido desde el microfrontend Angular en AWS.',
			metric: '$1.83 a $4.33 USD/mes por cliente',
			diagramsCount: '3 Diagramas Archify',
		},
	];
}

