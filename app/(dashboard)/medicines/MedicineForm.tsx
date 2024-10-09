'use client';

import React, { useState, useTransition } from 'react';
import { addMedicine } from './actions';
import { Input } from '@/components/ui/input'; 
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function MedicineForm() {
   
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    startTransition(() => {
      addMedicine(formData)
        .then(() => {
          toast({
            title: 'Success',
            description: 'Medicine added successfully.',
            variant: 'success',
          });
        })
        .catch((error) => {
          console.error('Error inserting medicine:', error);
          toast({
            title: 'Error',
            description: 'Error inserting medicine.',
            variant: 'destructive',
          });
        });
    });

    event.currentTarget.reset();

  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Medicine Name */}
      <div>
        <Label htmlFor="medicine_name" className="text-lg font-medium">
          Medicine Name <span className="text-red-500">*</span>
        </Label>
        <Input
          type="text"
          name="medicine_name"
          id="medicine_name"
          className="mt-1 block w-full"
          required
        />
      </div>

      {/* Include all other fields here, similar to previous code */}
      {/* For brevity, here's how you can include one of them: */}
{/* THERAPEUTICS */}
<h2 className="text-2xl font-semibold mt-8">Therapeutics</h2>
      {/* Brands */}
      <div>
        <Label htmlFor="brands" className="text-lg font-medium">
          Brands
        </Label>
        <Textarea
          name="brands"
          id="brands"
          rows={2}
          className="mt-1 block w-full"
        />
      </div>


    {/* Generic */}
    {/* <div>
          <Label htmlFor="generic" className="text-lg font-medium">
            Generic?
          </Label>
          <Textarea
            name="generic"
            id="generic"
            rows={2}
            className="mt-1 block w-full"
          />
        </div> */}

        {/* Class */}
        <div>
          <Label htmlFor="class" className="text-lg font-medium">
            Class
          </Label>
          <Textarea
            name="class"
            id="class"
            rows={2}
            className="mt-1 block w-full"
          />
        </div>

        {/* Commonly Prescribed for */}
        <div>
          <Label htmlFor="commonly_prescribed_for" className="text-lg font-medium">
            Commonly Prescribed for
          </Label>
          <Textarea
            name="commonly_prescribed_for"
            id="commonly_prescribed_for"
            rows={3}
            className="mt-1 block w-full"
          />
        </div>

        {/* How the Drug Works */}
        <div>
          <Label htmlFor="how_the_drug_works" className="text-lg font-medium">
            How the Drug Works
          </Label>
          <Textarea
            name="how_the_drug_works"
            id="how_the_drug_works"
            rows={3}
            className="mt-1 block w-full"
          />
        </div>

        {/* How Long Until It Works */}
        <div>
          <Label htmlFor="how_long_until_it_works" className="text-lg font-medium">
            How Long Until It Works
          </Label>
          <Textarea
            name="how_long_until_it_works"
            id="how_long_until_it_works"
            rows={3}
            className="mt-1 block w-full"
          />
        </div>

        {/* If It Works */}
        <div>
          <Label htmlFor="if_it_works" className="text-lg font-medium">
            If It Works
          </Label>
          <Textarea
            name="if_it_works"
            id="if_it_works"
            rows={3}
            className="mt-1 block w-full"
          />
        </div>

        {/* If It Doesn’t Work */}
        <div>
          <Label htmlFor="if_it_doesnt_work" className="text-lg font-medium">
            If It Doesn’t Work
          </Label>
          <Textarea
            name="if_it_doesnt_work"
            id="if_it_doesnt_work"
            rows={3}
            className="mt-1 block w-full"
          />
        </div>

        {/* Best Augmenting Combos for Partial Response or Treatment Resistance */}
        <div>
          <Label htmlFor="best_augmenting_combos" className="text-lg font-medium">
            Best Augmenting Combos for Partial Response or Treatment Resistance
          </Label>
          <Textarea
            name="best_augmenting_combos"
            id="best_augmenting_combos"
            rows={4}
            className="mt-1 block w-full"
          />
        </div>

        {/* Tests */}
        <div>
          <Label htmlFor="tests" className="text-lg font-medium">
            Tests
          </Label>
          <Textarea
            name="tests"
            id="tests"
            rows={3}
            className="mt-1 block w-full"
          />
        </div>

        {/* SIDE EFFECTS */}
        <h2 className="text-2xl font-semibold mt-8">Side Effects</h2>

        {/* How Drug Causes Side Effects */}
        <div>
          <Label htmlFor="how_drug_causes_side_effects" className="text-lg font-medium">
            How Drug Causes Side Effects
          </Label>
          <Textarea
            name="how_drug_causes_side_effects"
            id="how_drug_causes_side_effects"
            rows={4}
            className="mt-1 block w-full"
          />
        </div>

        {/* Notable Side Effects */}
        <div>
          <Label htmlFor="notable_side_effects" className="text-lg font-medium">
            Notable Side Effects
          </Label>
          <Textarea
            name="notable_side_effects"
            id="notable_side_effects"
            rows={3}
            className="mt-1 block w-full"
          />
        </div>

        {/* Life-Threatening or Dangerous Side Effects */}
        <div>
          <Label htmlFor="life_threatening_side_effects" className="text-lg font-medium">
            Life-Threatening or Dangerous Side Effects
          </Label>
          <Textarea
            name="life_threatening_side_effects"
            id="life_threatening_side_effects"
            rows={4}
            className="mt-1 block w-full"
          />
        </div>

       {/* Weight Gain */}
      <div>
        <Label className="text-lg font-medium">Weight Gain</Label>
        <RadioGroup name="weight_gain" className="mt-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="unusual" id="weight_gain_unusual" />
            <Label htmlFor="weight_gain_unusual">Unusual</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="not usual" id="weight_gain_not_usual" />
            <Label htmlFor="weight_gain_not_usual">Not Usual</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="common" id="weight_gain_common" />
            <Label htmlFor="weight_gain_common">Common</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="problematic" id="weight_gain_problematic" />
            <Label htmlFor="weight_gain_problematic">Problematic</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Sedation */}
      <div>
        <Label className="text-lg font-medium">Sedation</Label>
        <RadioGroup name="sedation" className="mt-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="unusual" id="sedation_unusual" />
            <Label htmlFor="sedation_unusual">Unusual</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="not usual" id="sedation_not_usual" />
            <Label htmlFor="sedation_not_usual">Not Usual</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="common" id="sedation_common" />
            <Label htmlFor="sedation_common">Common</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="problematic" id="sedation_problematic" />
            <Label htmlFor="sedation_problematic">Problematic</Label>
          </div>
        </RadioGroup>
      </div>

        {/* What to Do About Side Effects */}
        <div>
          <Label htmlFor="what_to_do_about_side_effects" className="text-lg font-medium">
            What to Do About Side Effects
          </Label>
          <Textarea
            name="what_to_do_about_side_effects"
            id="what_to_do_about_side_effects"
            rows={4}
            className="mt-1 block w-full"
          />
        </div>

        {/* Best Augmenting Agents for Side Effects */}
        <div>
          <Label htmlFor="best_augmenting_agents_for_side_effects" className="text-lg font-medium">
            Best Augmenting Agents for Side Effects
          </Label>
          <Textarea
            name="best_augmenting_agents_for_side_effects"
            id="best_augmenting_agents_for_side_effects"
            rows={3}
            className="mt-1 block w-full"
          />
        </div>

        {/* DOSING AND USE */}
        <h2 className="text-2xl font-semibold mt-8">Dosing and Use</h2>

        {/* Usual Dosage Range */}
        <div>
          <Label htmlFor="usual_dosage_range" className="text-lg font-medium">
            Usual Dosage Range
          </Label>
          <Textarea
            name="usual_dosage_range"
            id="usual_dosage_range"
            rows={2}
            className="mt-1 block w-full"
          />
        </div>

        {/* Dosage Forms */}
        <div>
          <Label htmlFor="dosage_forms" className="text-lg font-medium">
            Dosage Forms
          </Label>
          <Textarea
            name="dosage_forms"
            id="dosage_forms"
            rows={2}
            className="mt-1 block w-full"
          />
        </div>

        {/* How to Dose */}
        <div>
          <Label htmlFor="how_to_dose" className="text-lg font-medium">
            How to Dose
          </Label>
          <Textarea
            name="how_to_dose"
            id="how_to_dose"
            rows={3}
            className="mt-1 block w-full"
          />
        </div>

        {/* Dosing Tips */}
        <div>
          <Label htmlFor="dosing_tips" className="text-lg font-medium">
            Dosing Tips
          </Label>
          <Textarea
            name="dosing_tips"
            id="dosing_tips"
            rows={3}
            className="mt-1 block w-full"
          />
        </div>

        {/* Overdose */}
        <div>
          <Label htmlFor="overdose" className="text-lg font-medium">
            Overdose
          </Label>
          <Textarea
            name="overdose"
            id="overdose"
            rows={3}
            className="mt-1 block w-full"
          />
        </div>

        {/* Long-Term Use */}
        <div>
          <Label htmlFor="long_term_use" className="text-lg font-medium">
            Long-Term Use
          </Label>
          <Textarea
            name="long_term_use"
            id="long_term_use"
            rows={3}
            className="mt-1 block w-full"
          />
        </div>

        {/* Habit Forming */}
        <div>
          <Label htmlFor="habit_forming" className="text-lg font-medium">
            Habit Forming
          </Label>
          <Textarea
            name="habit_forming"
            id="habit_forming"
            rows={2}
            className="mt-1 block w-full"
          />
        </div>

        {/* How to Stop */}
        <div>
          <Label htmlFor="how_to_stop" className="text-lg font-medium">
            How to Stop
          </Label>
          <Textarea
            name="how_to_stop"
            id="how_to_stop"
            rows={3}
            className="mt-1 block w-full"
          />
        </div>

        {/* Pharmacokinetics */}
        <div>
          <Label htmlFor="pharmacokinetics" className="text-lg font-medium">
            Pharmacokinetics
          </Label>
          <Textarea
            name="pharmacokinetics"
            id="pharmacokinetics"
            rows={3}
            className="mt-1 block w-full"
          />
        </div>

        {/* Drug Interactions */}
        <div>
          <Label htmlFor="drug_interactions" className="text-lg font-medium">
            Drug Interactions
          </Label>
          <Textarea
            name="drug_interactions"
            id="drug_interactions"
            rows={3}
            className="mt-1 block w-full"
          />
        </div>

        {/* Other Warnings/Precautions */}
        <div>
          <Label htmlFor="other_warnings_precautions" className="text-lg font-medium">
            Other Warnings/Precautions
          </Label>
          <Textarea
            name="other_warnings_precautions"
            id="other_warnings_precautions"
            rows={3}
            className="mt-1 block w-full"
          />
        </div>

        {/* Do Not Use */}
        <div>
          <Label htmlFor="do_not_use" className="text-lg font-medium">
            Do Not Use
          </Label>
          <Textarea
            name="do_not_use"
            id="do_not_use"
            rows={2}
            className="mt-1 block w-full"
          />
        </div>

        {/* SPECIAL POPULATIONS */}
        <h2 className="text-2xl font-semibold mt-8">Special Populations</h2>

        {/* Renal Impairment */}
        <div>
          <Label htmlFor="renal_impairment" className="text-lg font-medium">
            Renal Impairment
          </Label>
          <Textarea
            name="renal_impairment"
            id="renal_impairment"
            rows={2}
            className="mt-1 block w-full"
          />
        </div>

        {/* Hepatic Impairment */}
        <div>
          <Label htmlFor="hepatic_impairment" className="text-lg font-medium">
            Hepatic Impairment
          </Label>
          <Textarea
            name="hepatic_impairment"
            id="hepatic_impairment"
            rows={2}
            className="mt-1 block w-full"
          />
        </div>

        {/* Cardiac Impairment */}
        <div>
          <Label htmlFor="cardiac_impairment" className="text-lg font-medium">
            Cardiac Impairment
          </Label>
          <Textarea
            name="cardiac_impairment"
            id="cardiac_impairment"
            rows={2}
            className="mt-1 block w-full"
          />
        </div>

        {/* Elderly */}
        <div>
          <Label htmlFor="elderly" className="text-lg font-medium">
            Elderly
          </Label>
          <Textarea
            name="elderly"
            id="elderly"
            rows={2}
            className="mt-1 block w-full"
          />
        </div>

        {/* Children and Adolescents */}
        <div>
          <Label htmlFor="children_and_adolescents" className="text-lg font-medium">
            Children and Adolescents
          </Label>
          <Textarea
            name="children_and_adolescents"
            id="children_and_adolescents"
            rows={2}
            className="mt-1 block w-full"
          />
        </div>

        {/* Pregnancy */}
        <div>
          <Label htmlFor="pregnancy" className="text-lg font-medium">
            Pregnancy
          </Label>
          <Textarea
            name="pregnancy"
            id="pregnancy"
            rows={2}
            className="mt-1 block w-full"
          />
        </div>

        {/* Breast Feeding */}
        <div>
          <Label htmlFor="breast_feeding" className="text-lg font-medium">
            Breast Feeding
          </Label>
          <Textarea
            name="breast_feeding"
            id="breast_feeding"
            rows={2}
            className="mt-1 block w-full"
          />
        </div>

        {/* THE ART OF PSYCHOPHARMACOLOGY */}
        <h2 className="text-2xl font-semibold mt-8">The Art of Psychopharmacology</h2>

        {/* Potential Advantages */}
        <div>
          <Label htmlFor="potential_advantages" className="text-lg font-medium">
            Potential Advantages
          </Label>
          <Textarea
            name="potential_advantages"
            id="potential_advantages"
            rows={3}
            className="mt-1 block w-full"
          />
        </div>

        {/* Potential Disadvantages */}
        <div>
          <Label htmlFor="potential_disadvantages" className="text-lg font-medium">
            Potential Disadvantages
          </Label>
          <Textarea
            name="potential_disadvantages"
            id="potential_disadvantages"
            rows={3}
            className="mt-1 block w-full"
          />
        </div>

        {/* Primary Target Symptoms */}
        <div>
          <Label htmlFor="primary_target_symptoms" className="text-lg font-medium">
            Primary Target Symptoms
          </Label>
          <Textarea
            name="primary_target_symptoms"
            id="primary_target_symptoms"
            rows={3}
            className="mt-1 block w-full"
          />
        </div>

        {/* Pearls */}
        <div>
          <Label htmlFor="pearls" className="text-lg font-medium">
            Pearls
          </Label>
          <Textarea
            name="pearls"
            id="pearls"
            rows={3}
            className="mt-1 block w-full"
          />
        </div>


        <h2 className="text-2xl font-semibold mt-8">The Art Of Switching</h2>


        <div>
          <Label htmlFor="the_art_of_switching" className="text-lg font-medium">
          The art of switching
          </Label>
          <Textarea
            name="the_art_of_switching"
            id="the_art_of_switching"
            rows={2}
            className="mt-1 block w-full"
          />
        </div>

        <div>
          <Label htmlFor="depot_formulation" className="text-lg font-medium">
          Depot Formulation
          </Label>
          <Textarea
            name="depot_formulation"
            id="depot_formulation"
            rows={2}
            className="mt-1 block w-full"
          />
        </div>


        {/* <h2 className="text-2xl font-semibold mt-8">Courtesy</h2>
        <div>
          <Label htmlFor="courtesy" className="text-lg font-medium">
          Reference Link
          </Label>
          <Textarea
            name="courtesy"
            id="courtesy"
            rows={2}
            className="mt-1 block w-full"
          />
        </div> */}


      {/* Repeat the above pattern for all other fields */}

      {/* Submit Button */}
      <div className="flex justify-end mt-8">
        <Button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded"
          disabled={isPending}
        >
          {isPending ? 'Adding...' : 'Add Medicine'}
        </Button>
      </div>
    </form>
  );
}
