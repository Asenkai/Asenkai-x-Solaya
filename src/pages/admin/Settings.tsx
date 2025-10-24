"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import ToolkitImageManager from '@/components/admin/ToolkitImageManager';
import BrokerAgencyManager from '@/components/admin/BrokerAgencyManager'; // Import the new component

const AdminSettings: React.FC = () => {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
          <CardDescription>Manage various administrative settings for your application.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>General settings will go here. (Coming soon!)</p>
        </CardContent>
      </Card>

      <ToolkitImageManager />

      <BrokerAgencyManager /> {/* Integrate the new component */}
    </div>
  );
};

export default AdminSettings;