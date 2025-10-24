"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import ToolkitImageManager from '@/components/admin/ToolkitImageManager';

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

      {/* TODO: Implement CSV upload for broker agencies */}
      <Card>
        <CardHeader>
          <CardTitle>Broker Agencies</CardTitle>
          <CardDescription>Upload and manage broker agencies via CSV.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Broker agency management will be implemented here. (Coming soon!)</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSettings;