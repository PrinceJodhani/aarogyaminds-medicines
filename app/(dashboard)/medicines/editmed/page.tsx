// app/(dashboard)/medicines/editmed/page.tsx

import React from 'react';
import { getAllMedicines } from './actions';
import EditMedicineForm from './EditMedicineForm';

export const dynamic = 'force-dynamic';

export default async function EditMedicinePage() {
  const medicines = await getAllMedicines();
  const serializedMedicines = JSON.parse(JSON.stringify(medicines));

  return <EditMedicineForm medicines={serializedMedicines} />;
}
