import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { fadeAnimation, slideAnimation } from '../../shared/animations/animations';
import { SkillsComponent } from './components/skills/skills.component';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { ProjectsComponent } from './components/projects-section/projects-section.component';
import { WorkComponent } from './components/work/work.component';
import { ArticlesComponent } from './components/articles-section/articles-section.component';

@Component({
	selector: 'app-home',
	imports: [CommonModule, HeroSectionComponent, ProjectsComponent, SkillsComponent, WorkComponent, ArticlesComponent],
	encapsulation: ViewEncapsulation.None,
	animations: [slideAnimation, fadeAnimation],
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss'
})
export class HomeComponent {}
