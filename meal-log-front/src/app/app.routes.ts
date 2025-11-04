import { Routes } from '@angular/router';
import { DayComponent } from './components/day/day.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { MealFormComponent } from './components/meal-form/meal-form.component';

export const routes: Routes = [
    { path: '', component: CalendarComponent },
    { path: 'day/:date', component: DayComponent },
    { path: 'meal-form/:date', component: MealFormComponent},
    { path: 'meal-form/:date/:id', component: MealFormComponent}
];
