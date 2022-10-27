export class Order {
    id: number;
    status: string;
    customer: string;
    orderContent: string[];
    totalPrice: number;
    totalPaid: number;
    deliverSlot: string;
}