import { Injectable } from '@angular/core';
import { Day, Meal } from '../data-objects/interfaces';
import { mealQualities } from '../data-objects/enums';

@Injectable({
  providedIn: 'root'
})
export class DaysServiceService {

  constructor() { }

  getDayByDate(date: Date): Day{
    var offset = (date.getTimezoneOffset()) * -1;
    var idDate = new Date(date.getTime() + (offset * 60 * 1000)).toISOString().substring(0, 10);
    var data = this.dataMock.filter(d => { return d.id === idDate; })[0];
    
    if (!data) return { id: idDate, dayNumber: date.getDate(), meals: []};

    return data;
  }

  getMealByDateAndId(date: Date, id: number): Meal{
    var day = this.getDayByDate(date);

    return day.meals[id];
  }

  createMeal(date: Date, meal: Meal){
    // TODO: Mandar a drive.
  }

  updateMeal(date: Date, id: number, meal: Meal){
    // TODO: Mandar a drive.
  }

  dataMock: Day[] = [
    {
      id: '2025-10-07',
      dayNumber: 7,
      meals: [
        {
          mealQuality: mealQualities.good,
          description: 'Tostadas con aceite, pavo y sal + Café sólo. Además me hinché de comer este día, porque la noche anterior no cené ná y me desperté enmayaito perdio mi arma.'
        },
        {
          mealQuality: mealQualities.bad,
          description: 'Kebab con patatas. Aquí luego me sentí culpable por el desayuno y no comí tanto la verdad.'
        },
        {
          mealQuality: mealQualities.neutral,
          description: 'Dos galletas con café.'
        },
        {
          mealQuality: mealQualities.good,
          description: 'Lubina al horno con verduras.'
        },
        {
          mealQuality: mealQualities.good,
          description: '.'
        }
      ]
    },
    {
      id: '2025-10-08',
      dayNumber: 8,
      meals: [
        {
          mealQuality: mealQualities.good,
          description: 'Tostadas con aceite, pavo y sal + Café sólo.'
        }
      ]
    },
    {
      id: '2025-10-16',
      dayNumber: 16,
      meals: [
        {
          mealQuality: mealQualities.good,
          description: 'Tostadas con aceite, pavo y sal + Café sólo.'
        },
        {
          mealQuality: mealQualities.neutral,
          description: 'Tostadas con aceite, pavo y sal + Café sólo.'
        }
      ]
    }
  ];
}
