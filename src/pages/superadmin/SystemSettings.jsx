import { useState } from 'react'
import toast from 'react-hot-toast'
import { 
  Save, 
  Settings, 
  Bell, 
  Shield, 
  Globe, 
  Mail, 
  Database,
  Lock,
  Users,
  Palette,
  FileText,
  Download,
  Upload,
  RefreshCw
} from 'lucide-react'

export default function SystemSettings() {
  const [settings, setSettings] = useState({
    // General Settings
    siteName: 'Admin Dashboard Pro',
    siteUrl: 'https://dashboard.example.com',
    adminEmail: 'admin@example.com',
    supportEmail: 'support@example.com',
    timezone: 'America/New_York',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h',
    language: 'English',
    
    // Security Settings
    enable2FA: true,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    passwordExpiry: 90,
    ipWhitelist: ['192.168.1.1', '10.0.0.1'],
    
    // Email Settings
    emailProvider: 'SMTP',
    smtpHost: 'smtp.example.com',
    smtpPort: '587',
    smtpUsername: 'noreply@example.com',
    emailNotifications: true,
    
    // Notification Settings
    notifyNewUser: true,
    notifyFailedLogin: true,
    notifySystemAlerts: true,
    notifyPaymentReceived: true,
    notifySubscriptionExpiry: true,
    
    // Appearance Settings
    theme: 'light',
    primaryColor: '#10b981',
    sidebarCollapsed: false,
    showAvatars: true,
    
    // Backup Settings
    autoBackup: true,
    backupFrequency: 'daily',
    backupRetention: 30,
    lastBackup: '2024-03-15 02:00',
    
    // API Settings
    apiEnabled: true,
    apiRateLimit: 100,
    apiLogging: true,
  })

  const [activeTab, setActiveTab] = useState('general')
  const [isSaving, setIsSaving] = useState(false)

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'backup', label: 'Backup', icon: Database },
    { id: 'api', label: 'API', icon: FileText },
  ]

  const handleChange = (key, value) => {
    setSettings({ ...settings, [key]: value })
  }

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      toast.success('Settings saved successfully')
      setIsSaving(false)
    }, 1000)
  }

  const handleReset = (section) => {
    if (window.confirm(`Are you sure you want to reset ${section} settings to default?`)) {
      toast.success(`${section} settings reset to default`)
    }
  }

  const handleBackup = () => {
    toast.success('Backup initiated. You will be notified when complete.')
  }

  const handleRestore = () => {
    const fileInput = document.createElement('input')
    fileInput.type = 'file'
    fileInput.accept = '.json'
    fileInput.onchange = (e) => {
      const file = e.target.files[0]
      toast.success(`Settings restored from ${file.name}`)
    }
    fileInput.click()
  }

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Site Name *
          </label>
          <input
            type="text"
            className="input-field"
            value={settings.siteName}
            onChange={(e) => handleChange('siteName', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Site URL *
          </label>
          <input
            type="url"
            className="input-field"
            value={settings.siteUrl}
            onChange={(e) => handleChange('siteUrl', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Admin Email *
          </label>
          <input
            type="email"
            className="input-field"
            value={settings.adminEmail}
            onChange={(e) => handleChange('adminEmail', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Support Email
          </label>
          <input
            type="email"
            className="input-field"
            value={settings.supportEmail}
            onChange={(e) => handleChange('supportEmail', e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Timezone
          </label>
          <select
            className="input-field"
            value={settings.timezone}
            onChange={(e) => handleChange('timezone', e.target.value)}
          >
            <option value="America/New_York">Eastern Time (ET)</option>
            <option value="America/Chicago">Central Time (CT)</option>
            <option value="America/Denver">Mountain Time (MT)</option>
            <option value="America/Los_Angeles">Pacific Time (PT)</option>
            <option value="Europe/London">GMT (London)</option>
            <option value="Europe/Paris">CET (Paris)</option>
            <option value="Asia/Tokyo">JST (Tokyo)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date Format
          </label>
          <select
            className="input-field"
            value={settings.dateFormat}
            onChange={(e) => handleChange('dateFormat', e.target.value)}
          >
            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Language
          </label>
          <select
            className="input-field"
            value={settings.language}
            onChange={(e) => handleChange('language', e.target.value)}
          >
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="German">German</option>
            <option value="Japanese">Japanese</option>
          </select>
        </div>
      </div>
    </div>
  )

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Enable Two-Factor Authentication
            </label>
            <p className="text-sm text-gray-500">Require 2FA for all admin accounts</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.enable2FA}
              onChange={(e) => handleChange('enable2FA', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Session Timeout (minutes)
          </label>
          <input
            type="number"
            min="1"
            max="240"
            className="input-field"
            value={settings.sessionTimeout}
            onChange={(e) => handleChange('sessionTimeout', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Max Login Attempts
          </label>
          <input
            type="number"
            min="1"
            max="10"
            className="input-field"
            value={settings.maxLoginAttempts}
            onChange={(e) => handleChange('maxLoginAttempts', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password Expiry (days)
          </label>
          <input
            type="number"
            min="1"
            max="365"
            className="input-field"
            value={settings.passwordExpiry}
            onChange={(e) => handleChange('passwordExpiry', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            IP Whitelist
          </label>
          <textarea
            className="input-field"
            rows="3"
            value={settings.ipWhitelist.join('\n')}
            onChange={(e) => handleChange('ipWhitelist', e.target.value.split('\n'))}
            placeholder="Enter one IP per line"
          />
          <p className="text-sm text-gray-500 mt-1">Leave empty to allow all IPs</p>
        </div>
      </div>
    </div>
  )

  const renderEmailSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Provider
          </label>
          <select
            className="input-field"
            value={settings.emailProvider}
            onChange={(e) => handleChange('emailProvider', e.target.value)}
          >
            <option value="SMTP">SMTP</option>
            <option value="SendGrid">SendGrid</option>
            <option value="Mailgun">Mailgun</option>
            <option value="AWS SES">AWS SES</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Notifications
            </label>
            <p className="text-sm text-gray-500">Send email notifications</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.emailNotifications}
              onChange={(e) => handleChange('emailNotifications', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
          </label>
        </div>
      </div>

      {settings.emailProvider === 'SMTP' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              SMTP Host
            </label>
            <input
              type="text"
              className="input-field"
              value={settings.smtpHost}
              onChange={(e) => handleChange('smtpHost', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              SMTP Port
            </label>
            <input
              type="text"
              className="input-field"
              value={settings.smtpPort}
              onChange={(e) => handleChange('smtpPort', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              SMTP Username
            </label>
            <input
              type="text"
              className="input-field"
              value={settings.smtpUsername}
              onChange={(e) => handleChange('smtpUsername', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              SMTP Password
            </label>
            <input
              type="password"
              className="input-field"
              value="••••••••"
              onChange={() => {}}
            />
          </div>
        </div>
      )}
    </div>
  )

  const renderNotificationSettings = () => (
    <div className="space-y-4">
      <div className="space-y-4">
        {[
          { key: 'notifyNewUser', label: 'New User Registration', desc: 'Notify when new user registers' },
          { key: 'notifyFailedLogin', label: 'Failed Login Attempts', desc: 'Notify on failed login attempts' },
          { key: 'notifySystemAlerts', label: 'System Alerts', desc: 'Notify about system issues' },
          { key: 'notifyPaymentReceived', label: 'Payment Received', desc: 'Notify when payment is received' },
          { key: 'notifySubscriptionExpiry', label: 'Subscription Expiry', desc: 'Notify before subscription expires' },
        ].map((notification) => (
          <div key={notification.key} className="flex items-center justify-between">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {notification.label}
              </label>
              <p className="text-sm text-gray-500">{notification.desc}</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings[notification.key]}
                onChange={(e) => handleChange(notification.key, e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  )

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Theme
          </label>
          <select
            className="input-field"
            value={settings.theme}
            onChange={(e) => handleChange('theme', e.target.value)}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="auto">Auto</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Primary Color
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="color"
              className="w-12 h-12 cursor-pointer"
              value={settings.primaryColor}
              onChange={(e) => handleChange('primaryColor', e.target.value)}
            />
            <input
              type="text"
              className="input-field"
              value={settings.primaryColor}
              onChange={(e) => handleChange('primaryColor', e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Collapsed Sidebar
            </label>
            <p className="text-sm text-gray-500">Start with sidebar collapsed</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.sidebarCollapsed}
              onChange={(e) => handleChange('sidebarCollapsed', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Show User Avatars
            </label>
            <p className="text-sm text-gray-500">Display user avatars throughout the app</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.showAvatars}
              onChange={(e) => handleChange('showAvatars', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
          </label>
        </div>
      </div>
    </div>
  )

  const renderBackupSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-center justify-between">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Automatic Backups
            </label>
            <p className="text-sm text-gray-500">Enable automatic system backups</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.autoBackup}
              onChange={(e) => handleChange('autoBackup', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Backup Frequency
          </label>
          <select
            className="input-field"
            value={settings.backupFrequency}
            onChange={(e) => handleChange('backupFrequency', e.target.value)}
          >
            <option value="hourly">Hourly</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Backup Retention (days)
          </label>
          <input
            type="number"
            min="1"
            max="365"
            className="input-field"
            value={settings.backupRetention}
            onChange={(e) => handleChange('backupRetention', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last Backup
          </label>
          <input
            type="text"
            className="input-field bg-gray-50"
            value={settings.lastBackup}
            readOnly
          />
        </div>
      </div>

      <div className="flex space-x-3">
        <button
          onClick={handleBackup}
          className="btn-primary flex items-center"
        >
          <Download size={18} className="mr-2" />
          Create Backup Now
        </button>
        <button
          onClick={handleRestore}
          className="btn-secondary flex items-center"
        >
          <Upload size={18} className="mr-2" />
          Restore Backup
        </button>
      </div>
    </div>
  )

  const renderAPISettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-center justify-between">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              API Access
            </label>
            <p className="text-sm text-gray-500">Enable external API access</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.apiEnabled}
              onChange={(e) => handleChange('apiEnabled', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rate Limit (requests/hour)
          </label>
          <input
            type="number"
            min="10"
            max="10000"
            className="input-field"
            value={settings.apiRateLimit}
            onChange={(e) => handleChange('apiRateLimit', e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              API Logging
            </label>
            <p className="text-sm text-gray-500">Log all API requests</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.apiLogging}
              onChange={(e) => handleChange('apiLogging', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          API Documentation
        </label>
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            API Base URL: <code className="bg-white px-2 py-1 rounded">{settings.siteUrl}/api/v1</code>
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Generate API keys from the API Keys section
          </p>
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
          <p className="text-gray-600">Configure your system preferences</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => handleReset(activeTab)}
            className="btn-secondary flex items-center"
          >
            <RefreshCw size={18} className="mr-2" />
            Reset
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="btn-primary flex items-center"
          >
            <Save size={18} className="mr-2" />
            {isSaving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center
                  ${isActive
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                <Icon size={18} className="mr-2" />
                {tab.label}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Settings Content */}
      <div className="card">
        <div className="flex items-center mb-6">
          <div className="p-2 bg-emerald-100 rounded-lg mr-3">
            {(() => {
              const TabIcon = tabs.find(t => t.id === activeTab)?.icon || Settings
              return <TabIcon className="text-emerald-600" size={20} />
            })()}
          </div>
          <div>
            <h3 className="text-lg font-semibold">
              {tabs.find(t => t.id === activeTab)?.label || 'Settings'}
            </h3>
            <p className="text-sm text-gray-600">
              Configure {activeTab} settings
            </p>
          </div>
        </div>

        <div className="mt-6">
          {activeTab === 'general' && renderGeneralSettings()}
          {activeTab === 'security' && renderSecuritySettings()}
          {activeTab === 'email' && renderEmailSettings()}
          {activeTab === 'notifications' && renderNotificationSettings()}
          {activeTab === 'appearance' && renderAppearanceSettings()}
          {activeTab === 'backup' && renderBackupSettings()}
          {activeTab === 'api' && renderAPISettings()}
        </div>

        <div className="mt-8 pt-6 border-t flex justify-end">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="btn-primary flex items-center"
          >
            <Save size={18} className="mr-2" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="card border border-red-200">
        <div className="flex items-center mb-4">
          <div className="p-2 bg-red-100 rounded-lg mr-3">
            <Lock className="text-red-600" size={20} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-red-700">Danger Zone</h3>
            <p className="text-sm text-red-600">Irreversible actions</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <p className="font-medium text-gray-900">Clear All Data</p>
              <p className="text-sm text-gray-600">Remove all companies, admins, and settings</p>
            </div>
            <button
              onClick={() => {
                if (window.confirm('Are you sure? This will delete ALL data and cannot be undone!')) {
                  toast.error('Data cleared - this would delete all data in production')
                }
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
            >
              Clear Data
            </button>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <p className="font-medium text-gray-900">Reset System</p>
              <p className="text-sm text-gray-600">Reset all settings to factory defaults</p>
            </div>
            <button
              onClick={() => {
                if (window.confirm('Reset all settings to factory defaults?')) {
                  toast.success('System reset - settings restored to defaults')
                }
              }}
              className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 font-medium"
            >
              Reset System
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}