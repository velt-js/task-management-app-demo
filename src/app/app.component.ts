import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ToolbarComponent } from "./component/toolbar/toolbar.component";
import { DocumentComponent } from './component/document/document.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { VeltService } from './services/velt.service';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, ToolbarComponent, DocumentComponent, SidebarComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {
	title = 'task';


	constructor(
		private authService: AuthService,
		private veltService: VeltService
	) { }

	async ngOnInit(): Promise<void> {
		// Follow the Setup Guide for more info: https://docs.velt.dev/get-started/setup/install


		// Initialize Velt
		await this.veltService.initializeVelt('AN5s6iaYIuLLXul0X4zf');


		// Get your user and identify
		const user = this.authService.getUser()();
		if (user) {
			await this.veltService.identifyUser(user);
		}

		// Set Document as a unique place in your app
		await this.veltService.setDocument('task', { documentName: 'task' });

		// Setting Dark Mode as Default
		this.veltService.setDarkMode(true);
	}

}
