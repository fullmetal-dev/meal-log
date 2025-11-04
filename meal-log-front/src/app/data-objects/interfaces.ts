import { mealQualities } from "./enums";

export interface Day {

    id: string;
    dayNumber: number;
    meals: Meal[];
}

export interface Meal{

    mealQuality: mealQualities;
    description: string;
}