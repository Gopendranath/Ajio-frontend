"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Trash2,
  Plus,
  Minus,
  Package,
  CreditCard,
  Truck,
  Shield,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { fetchCart, updateCart, removeFromCart } from "../store/cartSlice";
import type { AppDispatch } from "../store";

interface ShippingMethod {
  id: string;
  name: string;
  price: number;
  estimatedDays: string;
  description: string;
}

export default function ModernCart() {
  const dispatch: AppDispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const [shippingMethod, setShippingMethod] = useState<string>("standard");

  const shippingMethods: ShippingMethod[] = [
    {
      id: "standard",
      name: "Standard Shipping",
      price: 5.99,
      estimatedDays: "3-5 days",
      description: "Free shipping on orders over $200",
    },
    {
      id: "express",
      name: "Express Shipping",
      price: 12.99,
      estimatedDays: "1-2 days",
      description: "Priority delivery with tracking",
    },
  ];

  const subtotal = items.reduce(
    (sum, item) => sum + (item.productId?.price || 0) * item.count,
    0,
  );
  const shipping = shippingMethods.find((m) => m.id === shippingMethod)?.price || 0;
  const total = subtotal + shipping;

  const updateQuantity = (productId: string, change: number) => {
    const currentItem = items.find((item) => item.productId._id === productId);
    if (currentItem) {
      const newQuantity = Math.max(1, currentItem.count + change);
      dispatch(updateCart({ productId, count: newQuantity }));
    }
  };

  const removeItem = (productId: string) => {
    dispatch(removeFromCart({ productId }));
  };

  return (
    <div className="mx-auto w-full max-w-7xl p-6">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Cart Section */}
        <div className="space-y-6 lg:col-span-2">
          <div>
            <h1 className="text-2xl font-semibold">Shopping Cart</h1>
            <p className="text-muted-foreground">
              {items.length} {items.length === 1 ? "item" : "items"} in your
              cart
            </p>
          </div>

          <div className="space-y-4">
            {items.filter(item => item.productId && item.productId.price !== undefined && item.productId._id !== undefined).map((item) => (
              <Card key={item.productId?._id} className="overflow-hidden p-0">
                <CardContent className="p-0">
                  <div className="flex h-full flex-col md:flex-row">
                    {/* Product Image */}
                    <div className="relative h-auto w-full md:w-32">
                      <img
                        src={item.productId?.image || ''}
                        alt={item.productId?.title || 'Product Image'}
                        width={500}
                        height={500}
                        className="h-full w-full object-cover md:w-32"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 p-6 pb-3">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium">{item.productId?.title || 'Unknown Product'}</h3>
                          <p className="text-muted-foreground text-sm">
                            {/* Assuming color and size are not available in product object directly */}
                            N/A
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.productId?._id || '' )}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.productId?._id || '', -1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">
                            {item.count}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.productId?._id || '', 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="text-right">
                          <div className="font-medium">
                            ${((item.productId?.price || 0) * item.count).toFixed(2)}
                          </div>
                          {/* originalPrice not in product type */}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
              <CardDescription>
                Review your order details and shipping information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Shipping Method */}
              <div className="space-y-2">
                <Label>Shipping Method</Label>
                <Select
                  value={shippingMethod}
                  onValueChange={setShippingMethod}
                >
                  <SelectTrigger className="w-full max-w-none data-[size=default]:h-auto">
                    <SelectValue placeholder="Select shipping method" />
                  </SelectTrigger>
                  <SelectContent className="!h-auto">
                    {shippingMethods.map((method) => (
                      <SelectItem
                        key={method.id}
                        value={method.id}
                        className="!h-auto"
                      >
                        <div className="flex flex-col justify-between text-start">
                          <div className="font-medium">{method.name}</div>
                          <div className="text-muted-foreground text-sm">
                            {method.estimatedDays}
                          </div>
                          <div className="font-medium">
                            ${(method?.price || 0).toFixed(2)}
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Promo Code */}
              <div className="space-y-2">
                <Label>Promo Code</Label>
                <div className="flex gap-2">
                  <Input placeholder="Enter promo code" />
                  <Button variant="outline">Apply</Button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4 border-t pt-4">
                <div className="flex items-center gap-2 text-sm">
                  <Package className="text-primary h-4 w-4" />
                  <span>Free returns within 30 days</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="text-primary h-4 w-4" />
                  <span>Secure payment</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Truck className="text-primary h-4 w-4" />
                  <span>Fast delivery</span>
                </div>
              </div>

              {/* Checkout Button */}
              <Button className="w-full">
                <CreditCard className="mr-2 h-4 w-4" />
                Proceed to Checkout
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
