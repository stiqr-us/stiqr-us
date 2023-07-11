import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Sticker } from 'src/app/types/sticker';

@Component({
  selector: 'app-stiqr-edit',
  templateUrl: './stiqr-edit.component.html',
  styleUrls: ['./stiqr-edit.component.scss']
})
export class StiqrEditComponent {
  private backupSticker: Sticker = { ...this.sticker }

  constructor(
    public dialogRef: MatDialogRef<StiqrEditComponent>,
    @Inject(MAT_DIALOG_DATA) public sticker: Sticker
  ) { }

  cancel(): void {
    this.sticker = this.backupSticker;
    this.dialogRef.close(this.sticker);
  }

}
