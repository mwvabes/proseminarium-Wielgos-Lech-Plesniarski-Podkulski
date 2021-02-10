import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private titleService: Title,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.translate.get('title').subscribe((res: string) => {
      this.titleService.setTitle(res);
    });
  }
}
