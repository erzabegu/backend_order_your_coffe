import {Schema} from "node:inspector";
import {z} from "zod";

export const OrderSchema = z.object({
    userId: z.coerce.string(),
    storeId: z.coerce.number(),
    items: z.array(
        z.object({
            itemId: z.number(),
            amount: z.number(),
            cupSize: z.enum(["SMALL", "MEDIUM", "LARGE"])
        })
    )
})
export const getUserOrdersSchema = z.object({
    userId: z.coerce.string(),
    storeId: z.coerce.number(),
})