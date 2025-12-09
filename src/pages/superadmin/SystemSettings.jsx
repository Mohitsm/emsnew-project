// src/pages/superadmin/SystemSettings.jsx
import React, { useState } from 'react';
import { 
  Save,
  Globe,
  Shield,
  Bell,
  Database,
  Mail,
  Lock,
  Users,
  Clock,
  RefreshCw
} from 'lucide-react';
import Card, { CardHeader, CardTitle, CardContent, CardFooter } from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { toast } from 'react-hot-toast';

const SystemSettings = () => {
  const [settings, setSettings] = useState({
    companyName: '',
    companyEmail: 'info@jainimpex.com',
    timezone: 'Asia/Kolkata',
    dateFormat: 'DD/MM/YYYY',
    sessionTimeout: '30',
    maxLoginAttempts: '5',
    backupFrequency: 'daily',
    emailNotifications: true,
    systemMaintenance: false,
    twoFactorAuth: false
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success('Settings saved successfully');
    }, 1000);
  };

  const handleReset = () => {
    setSettings({
      companyName: '',
      companyEmail: 'info@jainimpex.com',
      timezone: 'Asia/Kolkata',
      dateFormat: 'DD/MM/YYYY',
      sessionTimeout: '30',
      maxLoginAttempts: '5',
      backupFrequency: 'daily',
      emailNotifications: true,
      systemMaintenance: false,
      twoFactorAuth: false
    });
    toast.success('Settings reset to defaults');
  };

  const sections = [
    {
      title: 'General Settings',
      icon: <Globe className="h-5 w-5" />,
      fields: [
        {
          label: 'Company Name',
          name: 'companyName',
          type: 'text',
          icon: <Users className="h-5 w-5" />
        },
        {
          label: 'Company Email',
          name: 'companyEmail',
          type: 'email',
          icon: <Mail className="h-5 w-5" />
        },
        {
          label: 'Timezone',
          name: 'timezone',
          type: 'select',
          options: [
            { value: 'Asia/Kolkata', label: 'India Standard Time (IST)' },
            { value: 'America/New_York', label: 'Eastern Time (ET)' },
            { value: 'Europe/London', label: 'Greenwich Mean Time (GMT)' }
          ],
          icon: <Clock className="h-5 w-5" />
        },
        {
          label: 'Date Format',
          name: 'dateFormat',
          type: 'select',
          options: [
            { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
            { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
            { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' }
          ]
        }
      ]
    },
    {
      title: 'Security Settings',
      icon: <Shield className="h-5 w-5" />,
      fields: [
        {
          label: 'Session Timeout (minutes)',
          name: 'sessionTimeout',
          type: 'number',
          min: 5,
          max: 120
        },
        {
          label: 'Max Login Attempts',
          name: 'maxLoginAttempts',
          type: 'number',
          min: 1,
          max: 10
        },
        {
          label: 'Enable Two-Factor Authentication',
          name: 'twoFactorAuth',
          type: 'switch'
        }
      ]
    },
    {
      title: 'Notification Settings',
      icon: <Bell className="h-5 w-5" />,
      fields: [
        {
          label: 'Email Notifications',
          name: 'emailNotifications',
          type: 'switch'
        },
        {
          label: 'System Maintenance Mode',
          name: 'systemMaintenance',
          type: 'switch'
        }
      ]
    },
    {
      title: 'Database Settings',
      icon: <Database className="h-5 w-5" />,
      fields: [
        {
          label: 'Backup Frequency',
          name: 'backupFrequency',
          type: 'select',
          options: [
            { value: 'hourly', label: 'Hourly' },
            { value: 'daily', label: 'Daily' },
            { value: 'weekly', label: 'Weekly' },
            { value: 'monthly', label: 'Monthly' }
          ]
        }
      ]
    }
  ];

  const renderField = (field) => {
    switch (field.type) {
      case 'select':
        return (
          <select
            value={settings[field.name]}
            onChange={(e) => setSettings({ ...settings, [field.name]: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            {field.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case 'switch':
        return (
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings[field.name]}
              onChange={(e) => setSettings({ ...settings, [field.name]: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 dark:peer-focus:ring-emerald-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              {settings[field.name] ? 'Enabled' : 'Disabled'}
            </span>
          </label>
        );
      default:
        return (
          <Input
            type={field.type}
            value={settings[field.name]}
            onChange={(e) => setSettings({ ...settings, [field.name]: e.target.value })}
            startIcon={field.icon}
            min={field.min}
            max={field.max}
          />
        );
    }
  };

  return (
    <div className="space-y-6 fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">System Settings</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Configure global system settings and preferences
          </p>
        </div>
        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <Button variant="outline" startIcon={<RefreshCw className="h-4 w-4" />} onClick={handleReset}>
            Reset
          </Button>
          <Button startIcon={<Save className="h-4 w-4" />} onClick={handleSave} loading={isSaving}>
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sections.map((section, index) => (
          <Card key={index} className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                  {section.icon}
                </div>
                <div>
                  <CardTitle>{section.title}</CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Configure {section.title.toLowerCase()}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {section.fields.map((field, fieldIndex) => (
                  <div key={fieldIndex} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {field.label}
                    </label>
                    {renderField(field)}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Danger Zone */}
      <Card>
        <CardHeader>
          <CardTitle className="text-red-600">Danger Zone</CardTitle>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Critical actions that cannot be undone
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-red-200 dark:border-red-900 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Delete All Data</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Permanently delete all system data
                </p>
              </div>
              <Button variant="danger" onClick={() => {
                if (window.confirm('This will delete ALL data. Are you absolutely sure?')) {
                  toast.error('Data deletion initiated');
                }
              }}>
                Delete All
              </Button>
            </div>
            <div className="flex items-center justify-between p-4 border border-yellow-200 dark:border-yellow-900 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">System Reset</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Reset system to factory defaults
                </p>
              </div>
              <Button variant="outline" className="text-yellow-600 border-yellow-600" onClick={() => {
                if (window.confirm('This will reset all settings to defaults. Continue?')) {
                  handleReset();
                }
              }}>
                Reset System
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemSettings;