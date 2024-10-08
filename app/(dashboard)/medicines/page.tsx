// app/(dashboard)/medicines/page.tsx
import React from 'react';
import MedicineForm from './MedicineForm';

export default function MedicinesPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Add New Medicine</h1>
      <MedicineForm />
    </div>
  );
}
