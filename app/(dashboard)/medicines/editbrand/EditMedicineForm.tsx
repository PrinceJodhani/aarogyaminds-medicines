// app/(dashboard)/medicines/edit/EditMedicineForm.tsx

'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
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

import { updateBrandsByMedicineId, Medicine } from './actions';

interface EditMedicineFormProps {
  medicines: Medicine[];
}

export default function EditMedicineForm({ medicines }: EditMedicineFormProps) {
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);
  const [brands, setBrands] = useState('');
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
      setBrands(medicine.brands || '');
    } else {
      setBrands('');
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
      await updateBrandsByMedicineId(selectedMedicine.id, brands);
      toast({
        title: 'Medicine updated successfully',
      });
      // Reset fields
      setSelectedMedicine(null);
      setBrands('');
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

  return (
    <div className="max-w-xl p-1">
      <h1 className="text-2xl font-semibold mb-4">Edit Medicine Brands</h1>

      {/* Medicine Combobox */}
      <div className="mb-4">
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

      {/* Brands Textarea */}
      {selectedMedicine && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Brands
          </label>
          <Textarea
            value={brands}
            onChange={(e) => setBrands(e.target.value)}
            rows={10}
            className="w-full"
          />
        </div>
      )}

      {/* Update Button */}
      <Button
        onClick={handleUpdate}
        disabled={loading || !selectedMedicine}
        className="mt-2"
      >
        {loading ? 'Updating...' : 'Update Medicine'}
      </Button>
    </div>
  );
}
