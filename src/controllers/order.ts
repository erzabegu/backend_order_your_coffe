import prismaClient from "../config/prismaConfig";
import {getUserOrdersSchema, OrderSchema} from "../schema/OrderSchema";
import {Request, Response} from "express";

export const createOrder = async (req: Request, res: Response) => {
    const validatedNewOrder = OrderSchema.parse(req.query);
    const newOrder = await prismaClient.order.create({
        data: {
            userOrders: {
                create: {
                    userId: validatedNewOrder.userId,
                    storeId: validatedNewOrder.storeId,
                },
            },
            orderItems: {
                create: validatedNewOrder?.items.map(item => ({
                    itemId: item.itemId,
                    amount: item.amount,
                    cupSize: item.cupSize,
                })),
            },
        },
        include: {
            orderItems: true,
        },
    });

    res.status(200).json({
        data: newOrder,
    })
}


export const getUserOrders = async (req: Request, res: Response) => {
    const validateOrder = getUserOrdersSchema.parse(req.query);
    const order = await prismaClient.userOrders.findMany({
        where: {
            userId: validateOrder?.userId,
            storeId: validateOrder?.storeId
        },
        include: {
            order: {
                include: {
                    orderItems: {
                        include: {
                            item: true,
                        },
                    },
                },
            },
            store: true,
            user: true,
        }
    })
    res.status(200).json({data: order})
}