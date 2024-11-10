import {z} from "zod";

const StoresSchema = z.object({
    pageNumber: z.coerce.number(),
    limit: z.coerce.number(),
})
const StoreByIdSchema = z.object({
    pageNumber: z.coerce.number(),
    limit: z.coerce.number(),
})


export {StoresSchema,StoreByIdSchema}