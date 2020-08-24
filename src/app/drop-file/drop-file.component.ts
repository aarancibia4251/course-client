import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-drop-file',
  templateUrl: './drop-file.component.html',
  styleUrls: ['./drop-file.component.scss']
})
export class DropFileComponent implements OnInit {
  files: File[] = [];
  constructor() { }

  ngOnInit(): void {
  }

  onSelect(event) {
    console.log(event);
    this.files = event.addedFiles;
    const reader = new FileReader();
    reader.onload = (e) => {
      const bstr = e.target.result;
      const workbook = XLSX.read(bstr, { type: 'buffer' });
      const sheetNameList = workbook.SheetNames;
      const xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNameList[0]]);
      console.log(xlData);
      console.log(workbook);
      //const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});
      //console.log(wb);
    };
    const blobFile = new Blob([...event.addedFiles], { type: 'blob'});
    reader.readAsArrayBuffer(blobFile);
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

}
