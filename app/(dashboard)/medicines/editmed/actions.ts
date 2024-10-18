// app/(dashboard)/medicines/editmed/actions.ts

'use server';

import { query } from '@/lib/db';

export interface Medicine {
  id: number;
  medicine_name: string;
  brands: string;
  med_class: string;
  commonly_prescribed_for: string;
  how_the_drug_works: string;
  how_long_until_it_works: string;
  if_it_works: string;
  if_it_doesnt_work: string;
  best_augmenting_combos: string;
  tests: string;
  how_drug_causes_side_effects: string;
  notable_side_effects: string;
  life_threatening_side_effects: string;
  weight_gain: string;
  sedation: string;
  what_to_do_about_side_effects: string;
  best_augmenting_agents_for_side_effects: string;
  usual_dosage_range: string;
  dosage_forms: string;
  how_to_dose: string;
  dosing_tips: string;
  overdose: string;
  long_term_use: string;
  habit_forming: string;
  how_to_stop: string;
  pharmacokinetics: string;
  drug_interactions: string;
  other_warnings_precautions: string;
  do_not_use: string;
  renal_impairment: string;
  hepatic_impairment: string;
  cardiac_impairment: string;
  elderly: string;
  children_and_adolescents: string;
  pregnancy: string;
  breast_feeding: string;
  potential_advantages: string;
  potential_disadvantages: string;
  primary_target_symptoms: string;
  pearls: string;
  the_art_of_switching: string;
  depot_formulation: string;
  // Add any additional fields from your database here
}

export async function getAllMedicines(): Promise<Medicine[]> {
  const sql = `
    SELECT *
    FROM medicines
    ORDER BY medicine_name ASC;
  `;
  try {
    const res = await query(sql);
    // Ensure the data is serializable
    const medicines = res.rows.map((row) => ({
      id: row.id,
      medicine_name: row.medicine_name,
      brands: row.brands || '',
      med_class: row.med_class || '',
      commonly_prescribed_for: row.commonly_prescribed_for || '',
      how_the_drug_works: row.how_the_drug_works || '',
      how_long_until_it_works: row.how_long_until_it_works || '',
      if_it_works: row.if_it_works || '',
      if_it_doesnt_work: row.if_it_doesnt_work || '',
      best_augmenting_combos: row.best_augmenting_combos || '',
      tests: row.tests || '',
      how_drug_causes_side_effects: row.how_drug_causes_side_effects || '',
      notable_side_effects: row.notable_side_effects || '',
      life_threatening_side_effects: row.life_threatening_side_effects || '',
      weight_gain: row.weight_gain || '',
      sedation: row.sedation || '',
      what_to_do_about_side_effects: row.what_to_do_about_side_effects || '',
      best_augmenting_agents_for_side_effects: row.best_augmenting_agents_for_side_effects || '',
      usual_dosage_range: row.usual_dosage_range || '',
      dosage_forms: row.dosage_forms || '',
      how_to_dose: row.how_to_dose || '',
      dosing_tips: row.dosing_tips || '',
      overdose: row.overdose || '',
      long_term_use: row.long_term_use || '',
      habit_forming: row.habit_forming || '',
      how_to_stop: row.how_to_stop || '',
      pharmacokinetics: row.pharmacokinetics || '',
      drug_interactions: row.drug_interactions || '',
      other_warnings_precautions: row.other_warnings_precautions || '',
      do_not_use: row.do_not_use || '',
      renal_impairment: row.renal_impairment || '',
      hepatic_impairment: row.hepatic_impairment || '',
      cardiac_impairment: row.cardiac_impairment || '',
      elderly: row.elderly || '',
      children_and_adolescents: row.children_and_adolescents || '',
      pregnancy: row.pregnancy || '',
      breast_feeding: row.breast_feeding || '',
      potential_advantages: row.potential_advantages || '',
      potential_disadvantages: row.potential_disadvantages || '',
      primary_target_symptoms: row.primary_target_symptoms || '',
      pearls: row.pearls || '',
      the_art_of_switching: row.the_art_of_switching || '',
      depot_formulation: row.depot_formulation || '',
      // Map any additional fields here
    }));
    return medicines;
  } catch (error) {
    console.error('Error fetching medicines:', error);
    throw error;
  }
}

export async function updateMedicineById(medicineId: number, updatedFields: Partial<Medicine>) {
  const fields = Object.keys(updatedFields);
  const values = Object.values(updatedFields);

  if (fields.length === 0) {
    return { success: false, message: 'No fields to update' };
  }

  const setClause = fields.map((field, index) => `"${field}" = $${index + 1}`).join(', ');

  const sql = `
    UPDATE medicines
    SET ${setClause}
    WHERE id = $${fields.length + 1};
  `;

  try {
    await query(sql, [...values, medicineId]);
    return { success: true };
  } catch (error) {
    console.error('Error updating medicine:', error);
    throw error;
  }
}
