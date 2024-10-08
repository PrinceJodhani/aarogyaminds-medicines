// app/(dashboard)/medicines/actions.ts
'use server';

import { query } from '@/lib/db';


export async function addMedicine(formData: FormData) {
  // Extract form data
  const getField = (field: string) => formData.get(field)?.toString() ?? '';

  const medicine_name = getField('medicine_name');
  const brands = getField('brands');
  const generic = getField('generic');
  const med_class = getField('class'); // 'class' is a reserved word, so we handle it appropriately
  const commonly_prescribed_for = getField('commonly_prescribed_for');
  const how_the_drug_works = getField('how_the_drug_works');
  const how_long_until_it_works = getField('how_long_until_it_works');
  const if_it_works = getField('if_it_works');
  const if_it_doesnt_work = getField('if_it_doesnt_work');
  const best_augmenting_combos = getField('best_augmenting_combos');
  const tests = getField('tests');

  // SIDE EFFECTS
  const how_drug_causes_side_effects = getField('how_drug_causes_side_effects');
  const notable_side_effects = getField('notable_side_effects');
  const life_threatening_side_effects = getField('life_threatening_side_effects');
  const weight_gain = getField('weight_gain');
  const sedation = getField('sedation');
  const what_to_do_about_side_effects = getField('what_to_do_about_side_effects');
  const best_augmenting_agents_for_side_effects = getField('best_augmenting_agents_for_side_effects');

  // DOSING AND USE
  const usual_dosage_range = getField('usual_dosage_range');
  const dosage_forms = getField('dosage_forms');
  const how_to_dose = getField('how_to_dose');
  const dosing_tips = getField('dosing_tips');
  const overdose = getField('overdose');
  const long_term_use = getField('long_term_use');
  const habit_forming = getField('habit_forming');
  const how_to_stop = getField('how_to_stop');
  const pharmacokinetics = getField('pharmacokinetics');
  const drug_interactions = getField('drug_interactions');
  const other_warnings_precautions = getField('other_warnings_precautions');
  const do_not_use = getField('do_not_use');

  // SPECIAL POPULATIONS
  const renal_impairment = getField('renal_impairment');
  const hepatic_impairment = getField('hepatic_impairment');
  const cardiac_impairment = getField('cardiac_impairment');
  const elderly = getField('elderly');
  const children_and_adolescents = getField('children_and_adolescents');
  const pregnancy = getField('pregnancy');
  const breast_feeding = getField('breast_feeding');

  // THE ART OF PSYCHOPHARMACOLOGY
  const potential_advantages = getField('potential_advantages');
  const potential_disadvantages = getField('potential_disadvantages');
  const primary_target_symptoms = getField('primary_target_symptoms');
  const pearls = getField('pearls');

  const sql = `
    INSERT INTO medicines (
      medicine_name,
      brands,
      generic,
      med_class,
      commonly_prescribed_for,
      how_the_drug_works,
      how_long_until_it_works,
      if_it_works,
      if_it_doesnt_work,
      best_augmenting_combos,
      tests,
      how_drug_causes_side_effects,
      notable_side_effects,
      life_threatening_side_effects,
      weight_gain,
      sedation,
      what_to_do_about_side_effects,
      best_augmenting_agents_for_side_effects,
      usual_dosage_range,
      dosage_forms,
      how_to_dose,
      dosing_tips,
      overdose,
      long_term_use,
      habit_forming,
      how_to_stop,
      pharmacokinetics,
      drug_interactions,
      other_warnings_precautions,
      do_not_use,
      renal_impairment,
      hepatic_impairment,
      cardiac_impairment,
      elderly,
      children_and_adolescents,
      pregnancy,
      breast_feeding,
      potential_advantages,
      potential_disadvantages,
      primary_target_symptoms,
      pearls
    ) VALUES (
      $1, $2, $3, $4, $5,
      $6, $7, $8, $9, $10,
      $11, $12, $13, $14, $15,
      $16, $17, $18, $19, $20,
      $21, $22, $23, $24, $25,
      $26, $27, $28, $29, $30,
      $31, $32, $33, $34, $35,
      $36, $37, $38, $39, $40,
      $41
    )
  `;

  const values = [
    medicine_name,
    brands,
    generic,
    med_class,
    commonly_prescribed_for,
    how_the_drug_works,
    how_long_until_it_works,
    if_it_works,
    if_it_doesnt_work,
    best_augmenting_combos,
    tests,
    how_drug_causes_side_effects,
    notable_side_effects,
    life_threatening_side_effects,
    weight_gain,
    sedation,
    what_to_do_about_side_effects,
    best_augmenting_agents_for_side_effects,
    usual_dosage_range,
    dosage_forms,
    how_to_dose,
    dosing_tips,
    overdose,
    long_term_use,
    habit_forming,
    how_to_stop,
    pharmacokinetics,
    drug_interactions,
    other_warnings_precautions,
    do_not_use,
    renal_impairment,
    hepatic_impairment,
    cardiac_impairment,
    elderly,
    children_and_adolescents,
    pregnancy,
    breast_feeding,
    potential_advantages,
    potential_disadvantages,
    primary_target_symptoms,
    pearls,
  ];

  try {
    await query(sql, values);
    // Optionally, redirect or return a success message
   
  } catch (error) {
    
  
    // Handle error appropriately
  }
}
