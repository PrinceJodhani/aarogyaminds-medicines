// app/(dashboard)/medicines/editmed/EditMedicineForm.tsx

'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@/components/ui/command';

import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';

import { updateMedicineById, Medicine } from './actions';

interface EditMedicineFormProps {
  medicines: Medicine[];
}

export default function EditMedicineForm({ medicines }: EditMedicineFormProps) {
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);
  const [updatedFields, setUpdatedFields] = useState<Partial<Medicine>>({});
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  // Ensure medicines data is available
  if (!medicines || medicines.length === 0) {
    return <p>No medicines available.</p>;
  }

  const handleMedicineSelect = (medicineName: string) => {
    const medicine = medicines.find((med) => med.medicine_name === medicineName) || null;
    setSelectedMedicine(medicine);
    setOpen(false);

    if (medicine) {
      setUpdatedFields(medicine);
    } else {
      setUpdatedFields({});
    }
  };

  const handleUpdate = async () => {
    if (!selectedMedicine) {
      toast({
        title: 'Please select a medicine',
        variant: 'destructive',
      });
      return;
    }
    setLoading(true);
    try {
      await updateMedicineById(selectedMedicine.id, updatedFields);
      toast({
        title: 'Medicine updated successfully',
      });
      // Optionally, you can reset the form or fetch updated medicines
    } catch (error) {
      console.error('Error updating medicine:', error);
      toast({
        title: 'Error updating medicine',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (field: keyof Medicine, value: string) => {
    setUpdatedFields((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="max-w-5xl p-4">
      <h1 className="text-2xl font-semibold mb-6">Edit Medicine Details</h1>

      {/* Medicine Combobox */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Select Medicine
        </label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              {selectedMedicine
                ? selectedMedicine.medicine_name
                : 'Select medicine name'}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="Search medicine..." />
              <CommandEmpty>No medicine found.</CommandEmpty>
              <CommandList>
                <CommandGroup>
                  {medicines.map((medicine) => (
                    <CommandItem
                      key={medicine.id}
                      value={medicine.medicine_name}
                      onSelect={() => handleMedicineSelect(medicine.medicine_name)}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          selectedMedicine?.medicine_name === medicine.medicine_name
                            ? 'opacity-100'
                            : 'opacity-0'
                        )}
                      />
                      {medicine.medicine_name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* Medicine Fields Form */}
      {selectedMedicine && (
        <div className="space-y-6">
          {/* medicine_name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Medicine Name
            </label>
            <Input
              value={updatedFields.medicine_name || ''}
              onChange={(e) => handleFieldChange('medicine_name', e.target.value)}
              className="w-full"
            />
          </div>

          {/* brands */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Brands
            </label>
            <Textarea
              value={updatedFields.brands || ''}
              onChange={(e) => handleFieldChange('brands', e.target.value)}
              rows={3}
              className="w-full"
            />
          </div>

          {/* med_class */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Class
            </label>
            <Input
              value={updatedFields.med_class || ''}
              onChange={(e) => handleFieldChange('med_class', e.target.value)}
              className="w-full"
            />
          </div>

          {/* commonly_prescribed_for */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Commonly Prescribed For
            </label>
            <Textarea
              value={updatedFields.commonly_prescribed_for || ''}
              onChange={(e) => handleFieldChange('commonly_prescribed_for', e.target.value)}
              rows={3}
              className="w-full"
            />
          </div>

          {/* how_the_drug_works */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              How the Drug Works
            </label>
            <Textarea
              value={updatedFields.how_the_drug_works || ''}
              onChange={(e) => handleFieldChange('how_the_drug_works', e.target.value)}
              rows={4}
              className="w-full"
            />
          </div>

          {/* how_long_until_it_works */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              How Long Until It Works
            </label>
            <Textarea
              value={updatedFields.how_long_until_it_works || ''}
              onChange={(e) => handleFieldChange('how_long_until_it_works', e.target.value)}
              rows={3}
              className="w-full"
            />
          </div>

          {/* if_it_works */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              If It Works
            </label>
            <Textarea
              value={updatedFields.if_it_works || ''}
              onChange={(e) => handleFieldChange('if_it_works', e.target.value)}
              rows={3}
              className="w-full"
            />
          </div>

          {/* if_it_doesnt_work */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              If It Does not Work
            </label>
            <Textarea
              value={updatedFields.if_it_doesnt_work || ''}
              onChange={(e) => handleFieldChange('if_it_doesnt_work', e.target.value)}
              rows={3}
              className="w-full"
            />
          </div>

          {/* best_augmenting_combos */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Best Augmenting Combos
            </label>
            <Textarea
              value={updatedFields.best_augmenting_combos || ''}
              onChange={(e) => handleFieldChange('best_augmenting_combos', e.target.value)}
              rows={4}
              className="w-full"
            />
          </div>

          {/* tests */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tests
            </label>
            <Textarea
              value={updatedFields.tests || ''}
              onChange={(e) => handleFieldChange('tests', e.target.value)}
              rows={3}
              className="w-full"
            />
          </div>

          {/* how_drug_causes_side_effects */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              How Drug Causes Side Effects
            </label>
            <Textarea
              value={updatedFields.how_drug_causes_side_effects || ''}
              onChange={(e) => handleFieldChange('how_drug_causes_side_effects', e.target.value)}
              rows={4}
              className="w-full"
            />
          </div>

          {/* notable_side_effects */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notable Side Effects
            </label>
            <Textarea
              value={updatedFields.notable_side_effects || ''}
              onChange={(e) => handleFieldChange('notable_side_effects', e.target.value)}
              rows={4}
              className="w-full"
            />
          </div>

          {/* life_threatening_side_effects */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Life Threatening Side Effects
            </label>
            <Textarea
              value={updatedFields.life_threatening_side_effects || ''}
              onChange={(e) => handleFieldChange('life_threatening_side_effects', e.target.value)}
              rows={4}
              className="w-full"
            />
          </div>

          {/* weight_gain */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Weight Gain
            </label>
            <Input
              value={updatedFields.weight_gain || ''}
              onChange={(e) => handleFieldChange('weight_gain', e.target.value)}
              className="w-full"
            />
          </div>

          {/* sedation */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sedation
            </label>
            <Input
              value={updatedFields.sedation || ''}
              onChange={(e) => handleFieldChange('sedation', e.target.value)}
              className="w-full"
            />
          </div>

          {/* what_to_do_about_side_effects */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              What to Do About Side Effects
            </label>
            <Textarea
              value={updatedFields.what_to_do_about_side_effects || ''}
              onChange={(e) => handleFieldChange('what_to_do_about_side_effects', e.target.value)}
              rows={4}
              className="w-full"
            />
          </div>

          {/* best_augmenting_agents_for_side_effects */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Best Augmenting Agents for Side Effects
            </label>
            <Textarea
              value={updatedFields.best_augmenting_agents_for_side_effects || ''}
              onChange={(e) => handleFieldChange('best_augmenting_agents_for_side_effects', e.target.value)}
              rows={4}
              className="w-full"
            />
          </div>

          {/* usual_dosage_range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Usual Dosage Range
            </label>
            <Input
              value={updatedFields.usual_dosage_range || ''}
              onChange={(e) => handleFieldChange('usual_dosage_range', e.target.value)}
              className="w-full"
            />
          </div>

          {/* dosage_forms */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dosage Forms
            </label>
            <Textarea
              value={updatedFields.dosage_forms || ''}
              onChange={(e) => handleFieldChange('dosage_forms', e.target.value)}
              rows={3}
              className="w-full"
            />
          </div>

          {/* how_to_dose */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              How to Dose
            </label>
            <Textarea
              value={updatedFields.how_to_dose || ''}
              onChange={(e) => handleFieldChange('how_to_dose', e.target.value)}
              rows={4}
              className="w-full"
            />
          </div>

          {/* dosing_tips */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dosing Tips
            </label>
            <Textarea
              value={updatedFields.dosing_tips || ''}
              onChange={(e) => handleFieldChange('dosing_tips', e.target.value)}
              rows={4}
              className="w-full"
            />
          </div>

          {/* overdose */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Overdose
            </label>
            <Textarea
              value={updatedFields.overdose || ''}
              onChange={(e) => handleFieldChange('overdose', e.target.value)}
              rows={3}
              className="w-full"
            />
          </div>

          {/* long_term_use */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Long Term Use
            </label>
            <Textarea
              value={updatedFields.long_term_use || ''}
              onChange={(e) => handleFieldChange('long_term_use', e.target.value)}
              rows={3}
              className="w-full"
            />
          </div>

          {/* habit_forming */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Habit Forming
            </label>
            <Input
              value={updatedFields.habit_forming || ''}
              onChange={(e) => handleFieldChange('habit_forming', e.target.value)}
              className="w-full"
            />
          </div>

          {/* how_to_stop */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              How to Stop
            </label>
            <Textarea
              value={updatedFields.how_to_stop || ''}
              onChange={(e) => handleFieldChange('how_to_stop', e.target.value)}
              rows={3}
              className="w-full"
            />
          </div>

          {/* pharmacokinetics */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pharmacokinetics
            </label>
            <Textarea
              value={updatedFields.pharmacokinetics || ''}
              onChange={(e) => handleFieldChange('pharmacokinetics', e.target.value)}
              rows={4}
              className="w-full"
            />
          </div>

          {/* drug_interactions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Drug Interactions
            </label>
            <Textarea
              value={updatedFields.drug_interactions || ''}
              onChange={(e) => handleFieldChange('drug_interactions', e.target.value)}
              rows={4}
              className="w-full"
            />
          </div>

          {/* other_warnings_precautions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Other Warnings Precautions
            </label>
            <Textarea
              value={updatedFields.other_warnings_precautions || ''}
              onChange={(e) => handleFieldChange('other_warnings_precautions', e.target.value)}
              rows={4}
              className="w-full"
            />
          </div>

          {/* do_not_use */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Do Not Use
            </label>
            <Textarea
              value={updatedFields.do_not_use || ''}
              onChange={(e) => handleFieldChange('do_not_use', e.target.value)}
              rows={3}
              className="w-full"
            />
          </div>

          {/* renal_impairment */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Renal Impairment
            </label>
            <Textarea
              value={updatedFields.renal_impairment || ''}
              onChange={(e) => handleFieldChange('renal_impairment', e.target.value)}
              rows={3}
              className="w-full"
            />
          </div>

          {/* hepatic_impairment */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hepatic Impairment
            </label>
            <Textarea
              value={updatedFields.hepatic_impairment || ''}
              onChange={(e) => handleFieldChange('hepatic_impairment', e.target.value)}
              rows={3}
              className="w-full"
            />
          </div>

          {/* cardiac_impairment */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cardiac Impairment
            </label>
            <Textarea
              value={updatedFields.cardiac_impairment || ''}
              onChange={(e) => handleFieldChange('cardiac_impairment', e.target.value)}
              rows={3}
              className="w-full"
            />
          </div>

          {/* elderly */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Elderly
            </label>
            <Textarea
              value={updatedFields.elderly || ''}
              onChange={(e) => handleFieldChange('elderly', e.target.value)}
              rows={3}
              className="w-full"
            />
          </div>

          {/* children_and_adolescents */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Children and Adolescents
            </label>
            <Textarea
              value={updatedFields.children_and_adolescents || ''}
              onChange={(e) => handleFieldChange('children_and_adolescents', e.target.value)}
              rows={3}
              className="w-full"
            />
          </div>

          {/* pregnancy */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pregnancy
            </label>
            <Textarea
              value={updatedFields.pregnancy || ''}
              onChange={(e) => handleFieldChange('pregnancy', e.target.value)}
              rows={3}
              className="w-full"
            />
          </div>

          {/* breast_feeding */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Breast Feeding
            </label>
            <Textarea
              value={updatedFields.breast_feeding || ''}
              onChange={(e) => handleFieldChange('breast_feeding', e.target.value)}
              rows={3}
              className="w-full"
            />
          </div>

          {/* potential_advantages */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Potential Advantages
            </label>
            <Textarea
              value={updatedFields.potential_advantages || ''}
              onChange={(e) => handleFieldChange('potential_advantages', e.target.value)}
              rows={4}
              className="w-full"
            />
          </div>

          {/* potential_disadvantages */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Potential Disadvantages
            </label>
            <Textarea
              value={updatedFields.potential_disadvantages || ''}
              onChange={(e) => handleFieldChange('potential_disadvantages', e.target.value)}
              rows={4}
              className="w-full"
            />
          </div>

          {/* primary_target_symptoms */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Primary Target Symptoms
            </label>
            <Textarea
              value={updatedFields.primary_target_symptoms || ''}
              onChange={(e) => handleFieldChange('primary_target_symptoms', e.target.value)}
              rows={4}
              className="w-full"
            />
          </div>

          {/* pearls */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pearls
            </label>
            <Textarea
              value={updatedFields.pearls || ''}
              onChange={(e) => handleFieldChange('pearls', e.target.value)}
              rows={4}
              className="w-full"
            />
          </div>

          {/* the_art_of_switching */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              The Art of Switching
            </label>
            <Textarea
              value={updatedFields.the_art_of_switching || ''}
              onChange={(e) => handleFieldChange('the_art_of_switching', e.target.value)}
              rows={4}
              className="w-full"
            />
          </div>

          {/* depot_formulation */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Depot Formulation
            </label>
            <Textarea
              value={updatedFields.depot_formulation || ''}
              onChange={(e) => handleFieldChange('depot_formulation', e.target.value)}
              rows={3}
              className="w-full"
            />
          </div>

          {/* Update Button */}
          <Button
            onClick={handleUpdate}
            disabled={loading}
            className="mt-4"
          >
            {loading ? 'Updating...' : 'Update Medicine'}
          </Button>
        </div>
      )}
    </div>
  );
}
