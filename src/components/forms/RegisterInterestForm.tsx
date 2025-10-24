"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { showSuccess, showError } from "@/utils/toast";

// Define the schema for the form
const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  countryResidence: z.string().min(1, {
    message: "Please select your country of residence.",
  }),
  phoneCountryCode: z.string().min(1, {
    message: "Please select a country code.",
  }),
  phoneNumber: z.string().min(7, {
    message: "Phone number must be at least 7 digits.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  bedroomsChoice: z.string().min(1, {
    message: "Please select your preferred number of bedrooms.",
  }),
  buyTimeline: z.string().min(1, {
    message: "Please select your buying timeline.",
  }),
  buyPurpose: z.string().min(1, {
    message: "Please select your buying purpose.",
  }),
  brokerAssisted: z.boolean(),
  brokerType: z.string().optional(),
  brokerAgency: z.string().optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must consent to receive communications.",
  }),
  message: z.string().optional(),
});

const RegisterInterestForm: React.FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      countryResidence: "",
      phoneCountryCode: "+971", // Default to UAE
      phoneNumber: "",
      email: "",
      bedroomsChoice: "",
      buyTimeline: "",
      buyPurpose: "",
      brokerAssisted: false,
      brokerType: "",
      brokerAgency: "",
      consent: false,
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Auto-capture UTM parameters from URL
      const urlParams = new URLSearchParams(window.location.search);
      const utmParams = {
        utmSource: urlParams.get('utm_source'),
        utmMedium: urlParams.get('utm_medium'),
        utmCampaign: urlParams.get('utm_campaign'),
        utmTerm: urlParams.get('utm_term'),
        utmContent: urlParams.get('utm_content'),
      };

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_FUNCTIONS_URL}/leads-post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY, // Pass anon key for Edge Function
        },
        body: JSON.stringify({
          ...values,
          ...utmParams,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to register interest.');
      }

      showSuccess("Thank you for registering your interest! We'll be in touch soon.");
      form.reset(); // Reset the form after successful submission
    } catch (error: any) {
      console.error("Submission error:", error);
      showError(error.message || "An unexpected error occurred. Please try again.");
    }
  };

  const brokerAssisted = form.watch("brokerAssisted");

  return (
    <Card className="w-full max-w-lg p-8 shadow-lg rounded-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-primary mb-2">Register Your Interest</CardTitle>
        <CardDescription className="text-gray-600">Fill out the form below to receive exclusive updates.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="your@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="phoneCountryCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Code</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Code" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="+971">UAE (+971)</SelectItem>
                        <SelectItem value="+1">USA (+1)</SelectItem>
                        <SelectItem value="+44">UK (+44)</SelectItem>
                        {/* Add more country codes as needed */}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="555 123 4567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="countryResidence"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country of Residence</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your country" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="UAE">United Arab Emirates</SelectItem>
                      <SelectItem value="USA">United States</SelectItem>
                      <SelectItem value="UK">United Kingdom</SelectItem>
                      <SelectItem value="KSA">Kingdom of Saudi Arabia</SelectItem>
                      {/* Add more countries as needed */}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bedroomsChoice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Bedrooms</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select number of bedrooms" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1 Bedroom">1 Bedroom</SelectItem>
                      <SelectItem value="2 Bedrooms">2 Bedrooms</SelectItem>
                      <SelectItem value="3 Bedrooms">3 Bedrooms</SelectItem>
                      <SelectItem value="4 Bedrooms">4 Bedrooms</SelectItem>
                      <SelectItem value="5+ Bedrooms">5+ Bedrooms</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="buyTimeline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Buying Timeline</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="When do you plan to buy?" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Immediately">Immediately</SelectItem>
                      <SelectItem value="3 months">Within 3 months</SelectItem>
                      <SelectItem value="6 months">Within 6 months</SelectItem>
                      <SelectItem value="1 year">Within 1 year</SelectItem>
                      <SelectItem value="More than a year">More than a year</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="buyPurpose"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Purpose of Purchase</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="What is your purpose?" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Self-use">Self-use</SelectItem>
                      <SelectItem value="Investment">Investment</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="brokerAssisted"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Are you being assisted by a broker?
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />

            {brokerAssisted && (
              <>
                <FormField
                  control={form.control}
                  name="brokerType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Broker Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select broker type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Registered Brokers">Registered Brokers</SelectItem>
                          <SelectItem value="Broker Under Registration">Broker Under Registration</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="brokerAgency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Broker Agency (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Broker Agency Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="I'm interested in..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="consent"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      I consent to receive communications from Solaya.
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-primary text-white hover:bg-primary/90 text-lg py-6 rounded-full font-semibold"
              disabled={!form.formState.isValid || form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default RegisterInterestForm;