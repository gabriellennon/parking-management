import * as z from 'zod';

export const entranceParkingSchema = z.object({
    plateLicenseNumber: z
        .string()
        .trim()
        .toUpperCase()
        .regex(/^[A-Z0-9]+$/, { message: "A placa só pode conter letras e números." })
        .min(7, { message: "O número da placa deve ter pelo menos 7 caracteres." })
        .max(7, { message: "O número da placa deve ter no máximo 7 caracteres." })
        .regex(/^[A-Z]{3}[0-9]{4}$/, { message: "Formato de placa inválido. Use o formato ABC1234." }),
})
