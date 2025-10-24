"use client";

import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { format } from 'date-fns';
import { showSuccess, showError } from '@/utils/toast';

interface Lead {
  id: string;
  created_at: string;
  first_name: string;
  last_name: string;
  country_residence: string;
  phone_country_code: string;
  phone_number: string;
  email: string;
  bedrooms_choice: string;
  buy_timeline: string;
  buy_purpose: string;
  broker_assisted: boolean;
  broker_type: string | null;
  broker_agency: string | null;
  consent: boolean;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
  page_referrer: string | null;
  ip: string | null;
  user_agent: string | null;
}

const fetchLeads = async (): Promise<Lead[]> => {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

const LeadsList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data: leads, isLoading, error } = useQuery<Lead[], Error>({
    queryKey: ['leads'],
    queryFn: fetchLeads,
  });

  const filteredLeads = useMemo(() => {
    if (!leads) return [];
    return leads.filter(lead =>
      lead.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.country_residence.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [leads, searchTerm]);

  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);
  const currentLeads = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredLeads.slice(startIndex, endIndex);
  }, [filteredLeads, currentPage, itemsPerPage]);

  const handleExportCsv = () => {
    if (!leads || leads.length === 0) {
      showError("No leads to export.");
      return;
    }

    const headers = Object.keys(leads[0]).join(',');
    const rows = leads.map(lead =>
      Object.values(lead).map(value => {
        if (typeof value === 'string' && value.includes(',')) {
          return `"${value}"`; // Enclose values with commas in quotes
        }
        return value;
      }).join(',')
    );

    const csvContent = [headers, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'leads.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showSuccess("Leads exported successfully!");
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Leads List</CardTitle>
          <CardDescription>View and manage all submitted leads.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Loading leads...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Leads List</CardTitle>
          <CardDescription>View and manage all submitted leads.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">Error loading leads: {error.message}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center mb-4">
          <div>
            <CardTitle>Leads List</CardTitle>
            <CardDescription>View and manage all submitted leads.</CardDescription>
          </div>
          <Button onClick={handleExportCsv} className="flex items-center">
            <Download className="mr-2 h-4 w-4" /> Export CSV
          </Button>
        </div>
        <Input
          placeholder="Search leads by name, email, or country..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset to first page on search
          }}
          className="max-w-sm"
        />
      </CardHeader>
      <CardContent>
        {currentLeads.length === 0 ? (
          <p className="text-center text-gray-500">No leads found.</p>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Bedrooms</TableHead>
                  <TableHead>Timeline</TableHead>
                  <TableHead>Purpose</TableHead>
                  <TableHead>Broker Assisted</TableHead>
                  <TableHead>Broker Info</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentLeads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell>{format(new Date(lead.created_at), 'PPP')}</TableCell>
                    <TableCell>{lead.first_name} {lead.last_name}</TableCell>
                    <TableCell>{lead.email}</TableCell>
                    <TableCell>{lead.phone_country_code} {lead.phone_number}</TableCell>
                    <TableCell>{lead.country_residence}</TableCell>
                    <TableCell>{lead.bedrooms_choice}</TableCell>
                    <TableCell>{lead.buy_timeline}</TableCell>
                    <TableCell>{lead.buy_purpose}</TableCell>
                    <TableCell>{lead.broker_assisted ? 'Yes' : 'No'}</TableCell>
                    <TableCell>
                      {lead.broker_assisted ? `${lead.broker_type || 'N/A'} - ${lead.broker_agency || 'N/A'}` : 'N/A'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
        <div className="flex justify-end items-center space-x-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" /> Previous
          </Button>
          <span className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeadsList;