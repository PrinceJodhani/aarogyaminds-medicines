// app/(dashboard)/medicines/edit/actions.ts

'use server';

import { query } from '@/lib/db';

export interface Medicine {
  id: number;
  medicine_name: string;
  brands: string;
}

export async function getMedicines(): Promise<Medicine[]> {
  const sql = `
    SELECT id, medicine_name, brands
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
    }));
    return medicines;
  } catch (error) {
    console.error('Error fetching medicines:', error);
    throw error;
  }
}

export async function updateBrandsByMedicineId(medicineId: number, brands: string) {
  const sql = `
    UPDATE medicines
    SET brands = $1
    WHERE id = $2;
  `;
  try {
    await query(sql, [brands, medicineId]);
    return { success: true };
  } catch (error) {
    console.error('Error updating brands:', error);
    throw error;
  }
}
