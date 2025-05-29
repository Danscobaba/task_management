import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, Input } from '@angular/core';
@Component({
  selector: 'app-custom-modal',
  imports: [CommonModule],
  templateUrl: './custom-modal.component.html',
  styleUrl: './custom-modal.component.css'
})
export class CustomModalComponent {
  @Input() title: string = '';
  @Input() show = false;
  @Output() close = new EventEmitter<void>();

  handleClose() {
    this.close.emit();
  }
}
