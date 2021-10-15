import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InfoService } from 'src/app/services/info.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  @Output() onMenuButtonClick = new EventEmitter();

  title: string = 'タイトル';
  constructor(private info: InfoService) { }

  ngOnInit(): void {
    this.info.getTitle().subscribe(
      next => {
        this.title = next.title;
      }
    );
  }

}
