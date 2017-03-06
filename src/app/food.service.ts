import {Injectable} from '@angular/core';

import {Food} from './food';

export const FOODS:Food[] = [
  {name: 'Abricot au sirop', calories: 108, proteins: 1, carbohydrates: 28, fats: 0},
  {name: 'Abricot en boîte de conserve', calories: 88, proteins: 1, carbohydrates: 21, fats: 0},
  {name: 'Abricot frais', calories: 50, proteins: 1, carbohydrates: 11, fats: 0},
  {name: 'Abricot sec', calories: 200, proteins: 4, carbohydrates: 39, fats: 1},
  {name: 'Acras de morue', calories: 193, proteins: 20, carbohydrates: 11, fats: 8},
  {name: 'After Eight', calories: 414, proteins: 3, carbohydrates: 72, fats: 13},
  {name: 'Agneau sauté', calories: 238, proteins: 21, carbohydrates: 1, fats: 17},
  {name: 'Ail', calories: 149, proteins: 6, 4, carbohydrates: 33, fats: 0, 5},
  {name: 'Ail en poudre', calories: 332, 3, proteins: 16, 8, carbohydrates: 72, 7, fats: 0, 8},
  {name: 'Ail frais', calories: 133, proteins: 7, carbohydrates: 25, fats: 1},
  {name: 'Ailloli', calories: 704, proteins: 3, carbohydrates: 3, fats: 76},
  {name: 'Airelle en boîte de conserve', calories: 126, proteins: 0, carbohydrates: 30, fats: 0},
  {name: 'Airelle fraîche', calories: 25, proteins: 0, carbohydrates: 1, fats: 0},
  {name: 'Algue marine', calories: 239, proteins: 12, carbohydrates: 42, fats: 3},
  {name: 'Alose crue', calories: 197, proteins: 17, carbohydrates: 0, fats: 14},
  {name: 'Alose grillée au four', calories: 252, proteins: 22, carbohydrates: 0, fats: 18},
  {name: 'Aloyau de boeuf', calories: 266, proteins: 17, carbohydrates: 0, fats: 22},
  {name: 'Aloyau de veau', calories: 175, proteins: 19, carbohydrates: 0, fats: 11},
  {name: 'Amandes', calories: 575, proteins: 20, carbohydrates: 4, fats: 54},
  {name: 'Amandes blanchies séchées', calories: 586, proteins: 20, 4, carbohydrates: 18, 5, fats: 52, 5},
  {name: 'Amandes séchées', calories: 589, proteins: 20, carbohydrates: 20, 4, fats: 52},
  {name: 'Amandine (en boulangerie)', calories: 411, proteins: 8, carbohydrates: 41, fats: 24},
  {name: 'Amuse gueule à base de maïs', calories: 507, proteins: 8, carbohydrates: 56, fats: 27},
  {name: 'Ananas au sirop', calories: 65, proteins: 0, carbohydrates: 16, fats: 0},
  {name: 'Ananas frais', calories: 48, proteins: 1, carbohydrates: 11, fats: 0}
];

@Injectable()
export class FoodService {
  getFoods():Food[] {
    return FOODS;
  }
}
