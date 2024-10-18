// app/(dashboard)/medicines/edit/page.tsx

import React from 'react';
import { getMedicines } from './actions';
import EditMedicineForm from './EditMedicineForm';

export const dynamic = 'force-dynamic';

export default async function EditMedicinePage() {
  const medicines = await getMedicines();
  const serializedMedicines = JSON.parse(JSON.stringify(medicines));

  return <EditMedicineForm medicines={serializedMedicines} />;
}
