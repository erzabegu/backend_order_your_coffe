import {NextFunction, Request, Response} from 'express';
import {StoreByIdSchema, StoresSchema} from "../schema/StoresSchema";
import prismaClient from "../config/prismaConfig";
import {z} from "zod";

export const getStores = async (req: Request, res: Response, next: NextFunction) => {
    const validatedData = StoresSchema.parse(req.query);
    const skip = (validatedData.pageNumber - 1) * validatedData.limit;

    const stores = await prismaClient.store.findMany({
        skip,
        take: validatedData?.limit,
    });
    const totalRecords = await prismaClient.store.count();

    res.status(200).json({
        data: stores,
        meta: {
            totalRecords,
            currentPage: validatedData.pageNumber,
            pageSize: validatedData?.limit,
            totalPages: Math.ceil(totalRecords / validatedData?.limit),
        },
    });

}


export const getStoreById = async (req: Request, res: Response, next: NextFunction) => {
    const validatedData = StoreByIdSchema.parse(req.query);
    const storeId = z.coerce.number().parse(req?.params?.id)
    const skip = (validatedData.pageNumber - 1) * validatedData.limit;

    const storeItems = await prismaClient.storeItem.findMany({
        where: {
            storeId: storeId
        },
        select: {
            item: true,
        },
        skip,
        take: validatedData?.limit,
    });
    const totalRecords = await prismaClient.storeItem.count();

    res.status(200).json({
        data: storeItems,
        meta: {
            totalRecords,
            currentPage: validatedData.pageNumber,
            pageSize: validatedData?.limit,
            totalPages: Math.ceil(totalRecords / validatedData?.limit),
        },
    });


}