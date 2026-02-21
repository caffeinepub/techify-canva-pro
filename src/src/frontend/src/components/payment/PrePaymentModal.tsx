import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, CreditCard, CheckCircle } from "lucide-react";
import { useActor } from "@/hooks/useActor";
import { toast } from "sonner";

declare global {
  interface Window {
    fbq?: (track: string, event: string, params?: Record<string, unknown>) => void;
  }
}

interface PrePaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  amount: number;
  razorpayButtonId: string;
}

export default function PrePaymentModal({
  isOpen,
  onClose,
  planName,
  amount,
  razorpayButtonId,
}: PrePaymentModalProps) {
  const { actor } = useActor();
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [showPaymentButton, setShowPaymentButton] = useState(false);
  const paymentFormRef = useRef<HTMLFormElement>(null);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setCustomerName("");
      setEmail("");
      setPhone("");
      setOrderId(null);
      setShowPaymentButton(false);
      setIsSubmitting(false);
    }
  }, [isOpen]);

  // Load Razorpay script when payment button should be shown
  useEffect(() => {
    if (showPaymentButton && orderId && paymentFormRef.current) {
      const baseUrl = window.location.origin;
      
      // Remove any existing script
      const existingScript = paymentFormRef.current.querySelector("script");
      if (existingScript) {
        existingScript.remove();
      }

      // Create and inject new Razorpay script
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/payment-button.js";
      script.setAttribute("data-payment_button_id", razorpayButtonId);
      script.setAttribute("data-redirect_url", `${baseUrl}/thank-you?orderId=${orderId}&plan=${encodeURIComponent(planName)}&amount=${amount}`);
      script.async = true;

      paymentFormRef.current.appendChild(script);
    }
  }, [showPaymentButton, orderId, razorpayButtonId, planName, amount]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    // Remove spaces and special characters
    const cleanPhone = phone.replace(/[\s\-()]/g, "");
    // Check if it's a valid 10-digit number (Indian format)
    return /^\d{10}$/.test(cleanPhone);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!customerName.trim()) {
      toast.error("Please enter your name");
      return;
    }

    if (!email.trim() || !validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!phone.trim() || !validatePhone(phone)) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }

    if (!actor) {
      toast.error("Backend connection not available. Please try again.");
      return;
    }

    try {
      setIsSubmitting(true);

      // Fire Meta Pixel InitiateCheckout event
      if (window.fbq) {
        window.fbq("track", "InitiateCheckout", {
          value: amount,
          currency: "INR",
          content_name: planName,
        });
      }

      // Create payment request in backend
      const newOrderId = await actor.createPaymentRequest(
        customerName.trim(),
        email.trim(),
        phone.trim(),
        planName,
        BigInt(amount)
      );

      setOrderId(newOrderId);
      setShowPaymentButton(true);
      toast.success("Details saved! Please proceed with payment.");
    } catch (error) {
      console.error("Error creating payment request:", error);
      toast.error("Failed to process your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-primary" />
            Complete Your Purchase
          </DialogTitle>
          <DialogDescription>
            Enter your details to proceed with payment
          </DialogDescription>
        </DialogHeader>

        {/* Plan Summary */}
        <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Selected Plan</p>
              <p className="font-semibold text-foreground">{planName}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-display font-bold text-primary">₹{amount}</p>
            </div>
          </div>
        </div>

        {!showPaymentButton ? (
          // Customer Details Form
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                disabled={isSubmitting}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="10-digit mobile number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={isSubmitting}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Proceed to Payment
                </>
              )}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              Your details are secure and will only be used for order processing.
            </p>
          </form>
        ) : (
          // Razorpay Payment Button
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-success bg-success/10 p-3 rounded-lg">
              <CheckCircle className="h-5 w-5" />
              <p className="text-sm font-medium">Details saved successfully!</p>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground text-center">
                Order ID: <span className="font-mono font-semibold">{orderId}</span>
              </p>
              <p className="text-sm font-medium text-center">
                Click the button below to complete your payment:
              </p>
            </div>

            <form ref={paymentFormRef} className="flex justify-center">
              {/* Razorpay script will be injected here */}
            </form>

            <p className="text-xs text-center text-muted-foreground">
              Secure payment powered by Razorpay. Your payment will be processed instantly.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
