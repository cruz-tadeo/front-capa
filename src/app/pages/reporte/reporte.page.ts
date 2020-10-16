import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.page.html',
  styleUrls: ['./reporte.page.scss'],
})
export class ReportePage implements OnInit {
  public reporte:string;
  constructor(private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.reporte = this.activatedRoute.snapshot.paramMap.get('id');
    
  }

}
