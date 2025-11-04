import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DaysServiceService } from '../../services/days-service.service';
import { Meal } from '../../data-objects/interfaces';
import { mealQualities as MealQualities } from "../../data-objects/enums";

@Component({
  selector: 'app-meal-form',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './meal-form.component.html',
  styleUrl: './meal-form.component.less'
})
export class MealFormComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private formBuilder = inject(FormBuilder);
  private dayService = inject(DaysServiceService);

  isUpdate: boolean = false;
  mealId?: number | null;
  currentDate!: Date;
  day!: number;
  currentMonth!: number;
  year!: number;

  showError: boolean = false;
  mealQualities = [
    { name: "bad", value : -1 },
    { name: "neutral", value : 0 },
    { name: "good", value : 1 },
  ];

  
  mealForm = this.formBuilder.group({
    mealQuality: [this.mealQualities[1].value, Validators.required],
    description: ['', Validators.required],
  });


  ngOnInit(): void {
    const param = String(this.route.snapshot.params['date']);
    this.currentDate = new Date(param);

    const paramId = Number(this.route.snapshot.params['id']);
    if(paramId != null && !Number.isNaN(paramId)){
      this.isUpdate = true;
      this.mealId = paramId;
      var meal: Meal = this.dayService.getMealByDateAndId(this.currentDate, paramId);
      var currentMealQuality = this.mealQualities.find((m) => m.value === meal.mealQuality);

      this.mealForm.patchValue(
        {
          mealQuality: currentMealQuality!.value,
          description: meal.description 
        }
      );
    }
          
    this.day = this.currentDate.getDate();
    this.currentMonth = this.currentDate.getMonth() + 1;
    this.year = this.currentDate.getFullYear();
  }
  
  onSubmit(){

    if(this.mealForm.status != "VALID"){
      this.showError = true;
      return;
    }

    var mealQuality = this.mealForm.controls.mealQuality.value ?? "";
    var mealQualityNumber = Number.parseInt(mealQuality.toString());
    var description = this.mealForm.controls.description.value ?? "";

    var meal: Meal = {
      mealQuality: mealQualityNumber as MealQualities,
      description: description
    };

    this.saveData(meal);
  }

  saveData(meal: Meal){
    if(!this.isUpdate){
      this.dayService.createMeal(this.currentDate, meal)
    }else{
      this.dayService.updateMeal(this.currentDate, this.day, meal);
    }
  }
}
