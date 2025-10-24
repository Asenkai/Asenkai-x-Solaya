"use client";

import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus, Edit, Trash, Upload } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from 'zod';
import { showSuccess, showError } from '@/utils/toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import Papa, { ParseResult } from 'papaparse'; // Import ParseResult

interface BrokerAgency {
  id: string;
  name: string;
  created_at: string;
}

const brokerAgencySchema = z.object({
  name: z.string().min(1, 'Agency name is required'),
});

type BrokerAgencyFormValues = z.infer<typeof brokerAgencySchema>;

const fetchBrokerAgencies = async (): Promise<BrokerAgency[]> => {
  const { data, error } = await supabase
    .from('broker_agencies')
    .select('*')
    .order('name', { ascending: true });
  if (error) throw new Error(error.message);
  return data;
};

const BrokerAgencyManager: React.FC = () => {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAgency, setEditingAgency] = useState<BrokerAgency | null>(null);
  const [csvFile, setCsvFile] = useState<File | null>(null);

  const { data: agencies, isLoading, error } = useQuery<BrokerAgency[], Error>({
    queryKey: ['brokerAgencies'],
    queryFn: fetchBrokerAgencies,
  });

  const form = useForm<BrokerAgencyFormValues>({
    resolver: zodResolver(brokerAgencySchema),
    defaultValues: {
      name: '',
    },
  });

  useEffect(() => {
    if (editingAgency) {
      form.reset({
        name: editingAgency.name,
      });
    } else {
      form.reset({
        name: '',
      });
    }
  }, [editingAgency, form]);

  const addAgencyMutation = useMutation({
    mutationFn: async (newAgency: BrokerAgencyFormValues) => {
      const { data, error } = await supabase
        .from('broker_agencies')
        .insert(newAgency)
        .select();
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['brokerAgencies'] });
      showSuccess('Broker agency added successfully!');
      setIsDialogOpen(false);
      setEditingAgency(null);
    },
    onError: (err: Error) => {
      showError(`Failed to add broker agency: ${err.message}`);
    },
  });

  const updateAgencyMutation = useMutation({
    mutationFn: async (updatedAgency: BrokerAgency) => {
      const { data, error } = await supabase
        .from('broker_agencies')
        .update({
          name: updatedAgency.name,
        })
        .eq('id', updatedAgency.id)
        .select();
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['brokerAgencies'] });
      showSuccess('Broker agency updated successfully!');
      setIsDialogOpen(false);
      setEditingAgency(null);
    },
    onError: (err: Error) => {
      showError(`Failed to update broker agency: ${err.message}`);
    },
  });

  const deleteAgencyMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('broker_agencies')
        .delete()
        .eq('id', id);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['brokerAgencies'] });
      showSuccess('Broker agency deleted successfully!');
    },
    onError: (err: Error) => {
      showError(`Failed to delete broker agency: ${err.message}`);
    },
  });

  const onSubmit = (values: BrokerAgencyFormValues) => {
    if (editingAgency) {
      updateAgencyMutation.mutate({ ...editingAgency, ...values });
    } else {
      addAgencyMutation.mutate(values);
    }
  };

  const handleCsvUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setCsvFile(event.target.files[0]);
    }
  };

  const processCsv = () => {
    if (!csvFile) {
      showError("Please select a CSV file to upload.");
      return;
    }

    Papa.parse(csvFile, {
      header: true,
      skipEmptyLines: true,
      complete: async (results: ParseResult<any>) => { // Explicitly type results
        const newAgencies: { name: string }[] = results.data.map((row: any) => ({
          name: row.name?.trim(),
        })).filter((agency: { name: string }) => agency.name); // Explicitly type agency

        if (newAgencies.length === 0) {
          showError("No valid agency names found in the CSV.");
          return;
        }

        let successCount = 0;
        let errorCount = 0;

        for (const agency of newAgencies) {
          try {
            // Check if agency already exists
            const { data: existingAgency, error: fetchError } = await supabase
              .from('broker_agencies')
              .select('id')
              .eq('name', agency.name)
              .single();

            if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 means no rows found
              throw fetchError;
            }

            if (existingAgency) {
              // Agency exists, skip or update if needed (for now, just skip if name is the same)
              successCount++;
            } else {
              // Agency does not exist, insert it
              const { error: insertError } = await supabase
                .from('broker_agencies')
                .insert({ name: agency.name });
              if (insertError) throw insertError;
              successCount++;
            }
          } catch (err: any) {
            console.error(`Error processing agency "${agency.name}":`, err.message);
            errorCount++;
          }
        }

        queryClient.invalidateQueries({ queryKey: ['brokerAgencies'] });
        if (successCount > 0) {
          showSuccess(`${successCount} broker agencies processed successfully.`);
        }
        if (errorCount > 0) {
          showError(`${errorCount} broker agencies failed to process.`);
        }
        setCsvFile(null); // Clear the file input
        if (document.getElementById('csv-upload-input')) {
          (document.getElementById('csv-upload-input') as HTMLInputElement).value = '';
        }
      },
      error: (err: any) => {
        showError(`Error parsing CSV: ${err.message}`);
      }
    });
  };

  if (isLoading) {
    return <p>Loading broker agencies...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error loading agencies: {error.message}</p>;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-2xl font-bold">Broker Agencies</CardTitle>
          <CardDescription>Manage the list of broker agencies for lead forms.</CardDescription>
        </div>
        <div className="flex items-center space-x-2">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingAgency(null)}>
                <Plus className="mr-2 h-4 w-4" /> Add New Agency
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{editingAgency ? 'Edit Agency' : 'Add New Agency'}</DialogTitle>
                <DialogDescription>
                  {editingAgency ? 'Make changes to the agency name here.' : 'Add a new broker agency.'}
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Agency Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Agency Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={addAgencyMutation.isPending || updateAgencyMutation.isPending}
                  >
                    {editingAgency ? 'Save Changes' : 'Add Agency'}
                  </Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-6 flex items-center space-x-2">
          <Input
            id="csv-upload-input"
            type="file"
            accept=".csv"
            onChange={handleCsvUpload}
            className="max-w-xs"
          />
          <Button onClick={processCsv} disabled={!csvFile}>
            <Upload className="mr-2 h-4 w-4" /> Upload CSV
          </Button>
        </div>

        {agencies && agencies.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Agency Name</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {agencies.map((agency) => (
                  <TableRow key={agency.id}>
                    <TableCell>{agency.name}</TableCell>
                    <TableCell>{new Date(agency.created_at).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditingAgency(agency);
                          setIsDialogOpen(true);
                        }}
                        className="mr-2"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteAgencyMutation.mutate(agency.id)}
                        disabled={deleteAgencyMutation.isPending}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <p className="text-center text-gray-500">No broker agencies found. Add one or upload a CSV to get started!</p>
        )}
      </CardContent>
    </Card>
  );
};

export default BrokerAgencyManager;