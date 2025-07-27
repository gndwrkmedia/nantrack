
'use client';

import React from 'react';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function SettingsPage() {
  return (
    <div>
      <PageHeader
        title="Settings"
        description="Manage your account and notification preferences."
      />

      <div className="grid gap-6 max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Update your personal information.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-base">Name</Label>
              <Input id="name" defaultValue="Grandma" className="text-lg h-12"/>
            </div>
             <div className="space-y-2">
              <Label htmlFor="email" className="text-base">Email Address</Label>
              <Input id="email" type="email" defaultValue="grandma@goldhealth.com" className="text-lg h-12"/>
            </div>
            <Button size="lg" className="text-lg h-12">Save Changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Set how you receive alerts and reminders.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="med-reminders" className="flex flex-col space-y-1 flex-grow">
                <span className="font-medium text-base">Medication Reminders</span>
                <span className="font-normal leading-snug text-muted-foreground">
                  Receive alerts when it's time to take your medication.
                </span>
              </Label>
              <Switch id="med-reminders" defaultChecked />
            </div>
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="weekly-summary" className="flex flex-col space-y-1 flex-grow">
                 <span className="font-medium text-base">Weekly Summary</span>
                <span className="font-normal leading-snug text-muted-foreground">
                  Get a weekly email with your health progress and trends.
                </span>
              </Label>
              <Switch id="weekly-summary" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
