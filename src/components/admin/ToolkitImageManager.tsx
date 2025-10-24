"use client";

import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
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
import { Plus, Edit, Trash } from 'lucide-react';
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

interface ToolkitImage {
  id: string;
  label: string;
  image_url: string;
  group: string | null;
  order: number | null;
  created_at: string;
}

const toolkitImageSchema = z.object({
  label: z.string().min(1, 'Label is required'),
  image_url: z.string().url('Must be a valid URL').min(1, 'Image URL is required'),
  group: z.string().optional(),
  order: z.preprocess(
    (val) => (val === '' ? null : Number(val)),
    z.number().int().min(0, 'Order must be a non-negative integer').nullable().optional()
  ),
});

type ToolkitImageFormValues = z.infer<typeof toolkitImageSchema>;

const fetchToolkitImages = async (): Promise<ToolkitImage[]> => {
  const { data, error } = await supabase
    .from('toolkit_images')
    .select('*')
    .order('order', { ascending: true });
  if (error) throw new Error(error.message);
  return data;
};

const ToolkitImageManager: React.FC = () => {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<ToolkitImage | null>(null);

  const { data: images, isLoading, error } = useQuery<ToolkitImage[], Error>({
    queryKey: ['toolkitImages'],
    queryFn: fetchToolkitImages,
  });

  const form = useForm<ToolkitImageFormValues>({
    resolver: zodResolver(toolkitImageSchema),
    defaultValues: {
      label: '',
      image_url: '',
      group: '',
      order: null,
    },
  });

  useEffect(() => {
    if (editingImage) {
      form.reset({
        label: editingImage.label,
        image_url: editingImage.image_url,
        group: editingImage.group || '',
        order: editingImage.order || null,
      });
    } else {
      form.reset({
        label: '',
        image_url: '',
        group: '',
        order: null,
      });
    }
  }, [editingImage, form]);

  const addImageMutation = useMutation({
    mutationFn: async (newImage: ToolkitImageFormValues) => {
      const { data, error } = await supabase
        .from('toolkit_images')
        .insert(newImage)
        .select();
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['toolkitImages'] });
      showSuccess('Image added successfully!');
      setIsDialogOpen(false);
      setEditingImage(null);
    },
    onError: (err: Error) => {
      showError(`Failed to add image: ${err.message}`);
    },
  });

  const updateImageMutation = useMutation({
    mutationFn: async (updatedImage: ToolkitImage) => {
      const { data, error } = await supabase
        .from('toolkit_images')
        .update({
          label: updatedImage.label,
          image_url: updatedImage.image_url,
          group: updatedImage.group,
          order: updatedImage.order,
        })
        .eq('id', updatedImage.id)
        .select();
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['toolkitImages'] });
      showSuccess('Image updated successfully!');
      setIsDialogOpen(false);
      setEditingImage(null);
    },
    onError: (err: Error) => {
      showError(`Failed to update image: ${err.message}`);
    },
  });

  const deleteImageMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('toolkit_images')
        .delete()
        .eq('id', id);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['toolkitImages'] });
      showSuccess('Image deleted successfully!');
    },
    onError: (err: Error) => {
      showError(`Failed to delete image: ${err.message}`);
    },
  });

  const onSubmit = (values: ToolkitImageFormValues) => {
    if (editingImage) {
      updateImageMutation.mutate({ ...editingImage, ...values });
    } else {
      addImageMutation.mutate(values);
    }
  };

  if (isLoading) {
    return <p>Loading toolkit images...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error loading images: {error.message}</p>;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">Toolkit Images</CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingImage(null)}>
              <Plus className="mr-2 h-4 w-4" /> Add New Image
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{editingImage ? 'Edit Image' : 'Add New Image'}</DialogTitle>
              <DialogDescription>
                {editingImage ? 'Make changes to the image here.' : 'Add a new image to your toolkit.'}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                <FormField
                  control={form.control}
                  name="label"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Label</FormLabel>
                      <FormControl>
                        <Input placeholder="Image Label" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="image_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/image.jpg" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="group"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Group (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Logos, Banners" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="order"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Order (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          {...field}
                          value={field.value === null ? '' : field.value} // Convert null to empty string for input
                          onChange={(e) => {
                            const value = e.target.value;
                            field.onChange(value === '' ? null : Number(value)); // Convert back to number or null
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full"
                  disabled={addImageMutation.isPending || updateImageMutation.isPending}
                >
                  {editingImage ? 'Save Changes' : 'Add Image'}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {images && images.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Label</TableHead>
                  <TableHead>Group</TableHead>
                  <TableHead>Order</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {images.map((image) => (
                  <TableRow key={image.id}>
                    <TableCell>
                      <img src={image.image_url} alt={image.label} className="h-12 w-12 object-cover rounded-md" />
                    </TableCell>
                    <TableCell>{image.label}</TableCell>
                    <TableCell>{image.group || 'N/A'}</TableCell>
                    <TableCell>{image.order !== null ? image.order : 'N/A'}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditingImage(image);
                          setIsDialogOpen(true);
                        }}
                        className="mr-2"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteImageMutation.mutate(image.id)}
                        disabled={deleteImageMutation.isPending}
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
          <p className="text-center text-gray-500">No toolkit images found. Add one to get started!</p>
        )}
      </CardContent>
    </Card>
  );
};

export default ToolkitImageManager;