import { Component } from '@angular/core';
import { CalendarComponent } from "./components/calendar/calendar.component";
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-root',
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent {
  title = 'meal-log';
}
