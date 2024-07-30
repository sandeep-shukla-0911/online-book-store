import { Address } from "./address";
import { Books } from "./books";

﻿export class Orders {
    orderId?: number;
    userId?: number;
    totalAmount?: number;
    orderDate?: Date;
    deliveryDate?: Date;
    userName?: string;
    title?: string;
    author?: string;
    description?: string;
    category?: string;
    language?: string;
    price?: number;
    orderItems?: OrderItems[] = []
    deliveryAddress?: Address = new Address();
};

export class OrderItems extends Books{
    override id?: number | undefined;
};