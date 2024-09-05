import { Component, effect, signal, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VeltService } from '../../services/velt.service';

interface Slide {
	id: number;
	imageUrl: string;
	note: string;
}

@Component({
	selector: 'app-document',
	standalone: true,
	imports: [CommonModule, FormsModule],
	templateUrl: './document.component.html',
	styleUrls: ['./document.component.scss'],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DocumentComponent {

	recordingId = ''
	recordingIds: string[] = []

	// Getting the Velt Client
	client = this.veltService.clientSignal();

	constructor(
		private veltService: VeltService
	) {
		// Set Document when the velt client is initialized
		effect(() => {

			this.client = this.veltService.clientSignal();
			if (this.client) {

				// Contain your comments in a document by setting a Document ID & Name
				this.client.setDocument('task', { documentName: 'task' });

				// Enable dark mode for Velt UI
				this.client.setDarkMode(true);
			}
		});
	}

	async ngOnInit(): Promise<void> {

		// Load Old Recordings
		const oldRecordingId: string[] = JSON.parse(localStorage.getItem('recordingIds') || '[]') as string[]
		if (oldRecordingId) {
			this.recordingIds = oldRecordingId
		}

		// After recording is completed, we set the recorder id
		const recorderControlPanel = document.querySelector('velt-recorder-control-panel');
		recorderControlPanel?.addEventListener('onRecordedData', (s: any) => {
			this.recordingId = s.detail.id
			this.recordingIds.push(s.detail.id)
			localStorage.setItem('recordingIds', JSON.stringify(this.recordingIds))
		});

	}

}