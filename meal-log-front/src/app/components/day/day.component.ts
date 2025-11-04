import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DaysServiceService } from '../../services/days-service.service';
import { Day } from '../../data-objects/interfaces';

@Component({
  selector: 'app-day',
  imports: [CommonModule],
  templateUrl: './day.component.html',
  styleUrl: './day.component.less'
})
export class DayComponent implements OnInit{
  dayService: DaysServiceService = inject(DaysServiceService);
  router: Router = inject(Router);

  currentDay!: Day;
  currentDate!: Date;
  day!: number;
  currentMonth!: number;
  monthName!: string;
  year!: number;
  expandedItems: Set<number> = new Set();
  editing!: boolean;

  months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const param = String(this.route.snapshot.params['date']);
    this.currentDate = new Date(param);
    
    this.day = this.currentDate.getDate();
    this.currentMonth = this.currentDate.getMonth() + 1;
    this.monthName = this.getCurrentMonthName();
    this.year = this.currentDate.getFullYear();

    this.currentDay = this.dayService.getDayByDate(this.currentDate);
  }

  getCurrentMonthName(): string{
    var month = this.currentDate.getMonth();

    return this.months[month];
  }


  toggleSize(index: number) {

    if(this.editing){
      this.editing = false;
      return;
    }

    if (this.expandedItems.has(index)) {
      this.expandedItems.delete(index);
    } else {
      this.expandedItems.add(index); 
    }
  }

  isExpanded(index: number): boolean {
    return this.expandedItems.has(index);
  }

  updateMeal(index:number, e: Event){
    e.preventDefault();

    if(this.isExpanded(index)){
      this.editing = true;

      this.router.navigate(
        [
          '/meal-form', 
          `${this.year}-${this.currentMonth}-${this.day}`,
          `${index}`
        ]
      );
    }
  }

  addNewMeal(){
    this.router.navigate(['/meal-form', `${this.year}-${this.currentMonth}-${this.day}`]);
  }
}
