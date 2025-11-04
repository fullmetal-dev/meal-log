import { Component, inject, OnInit } from '@angular/core';
import { Day } from '../../data-objects/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar',
  imports: [],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.less'
})
export class CalendarComponent implements OnInit {
  router: Router = inject(Router);

  monthName!: string;
  daysOfMonth!: Day[];
  currentDate!: Date;

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

  daysOfTheWeek = [
    'L',
    'M',
    'X',
    'J',
    'V',
    'S',
    'D'
  ];
  
  ngOnInit(): void {
    this.daysOfMonth = new Array();
    this.currentDate = new Date();
    this.monthName = this.getCurrentMonthName();

    var numberofDays = this.getMonthDays();
    for(let i = 1; i <= numberofDays; i++)
      this.daysOfMonth.push({ id: this.generateDayId(i), dayNumber: i, meals: [] });

    var initDay = this.getDayOfTheWeek();
    for(let i = 1; i < initDay; i++)
        this.daysOfMonth.unshift({ id: '', dayNumber: -1, meals: [] });
  }

  generateDayId(currentDay: number): string{
    var currentMont = this.currentDate.getMonth() + 1;
    var currentYear = this.currentDate.getFullYear();

    return `${currentDay}${currentMont}${currentYear}`;
  }

  getDayOfTheWeek(): number{
    return new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1).getDay();
  }

  getMonthDays(): number{
    return new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0).getDate();
  }

  getCurrentMonthName(): string{
    var month = this.currentDate.getMonth();

    return this.months[month];
  }

  goToDay(dayNumber: number){
    var currentYear = this.currentDate.getFullYear();
    var currentMonth = this.currentDate.getMonth() + 1;

    this.router.navigate(['day', `${currentYear}-${currentMonth}-${dayNumber}`]);
  }

}
