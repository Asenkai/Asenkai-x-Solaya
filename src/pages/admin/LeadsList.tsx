"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const LeadsList: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Leads List</CardTitle>
        <CardDescription>View and manage all submitted leads.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Leads table will go here. (Coming soon!)</p>
        {/* TODO: Implement leads table with search, filters, pagination, and CSV export */}
      </CardContent>
    </Card>
  );
};

export default LeadsList;