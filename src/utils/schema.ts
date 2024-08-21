import * as z from 'zod';

export const entranceParkingSchema = z.object({
    plateLicenseNumber: z
      .string()
      .trim()
      .toUpperCase()
      .regex(/^[A-Z]{3}-[0-9]{4}$/, { message: "Formato de placa inválido. Use o formato ABC-1234." })
      .min(8, { message: "O número da placa deve ter exatamente 8 caracteres (ex: ABC-1234)." })
      .max(8, { message: "O número da placa deve ter exatamente 8 caracteres (ex: ABC-1234)." })  
  });

export const exitParkingSchema = z.object({
    plateLicenseNumber: z
      .string()
      .trim()
      .toUpperCase()
      .regex(/^[A-Z]{3}-[0-9]{4}$/, { message: "Formato de placa inválido. Use o formato ABC-1234." })
      .min(8, { message: "O número da placa deve ter exatamente 8 caracteres (ex: ABC-1234)." })
      .max(8, { message: "O número da placa deve ter exatamente 8 caracteres (ex: ABC-1234)." })  
})
