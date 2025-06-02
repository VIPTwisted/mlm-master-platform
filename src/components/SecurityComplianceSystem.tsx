'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import {
  Shield,
  Lock,
  Key,
  Users,
  FileText,
  AlertTriangle,
  CheckCircle,
  Eye,
  EyeOff,
  Settings,
  Database,
  Globe,
  Clock,
  User,
  UserCheck,
  UserX,
  Activity,
  Download,
  Upload,
  Trash2,
  Edit,
  Plus,
  Search,
  Filter,
  RefreshCw,
  Bell,
  Calendar,
  MapPin,
  Monitor,
  Smartphone,
  Laptop,
  Server,
  Cloud,
  Zap,
  BookOpen,
  Award,
  Target,
  TrendingUp,
  BarChart3,
  AlertCircle,
  Info,
  ExternalLink,
  Copy,
  Send
} from 'lucide-react';

interface SecurityRole {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
  userCount: number;
  isSystemRole: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Permission {
  id: string;
  resource: string;
  action: 'create' | 'read' | 'update' | 'delete' | 'execute';
  scope: 'all' | 'own' | 'team' | 'downline';
  conditions?: string[];
}

interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  resource: string;
  details: string;
  ipAddress: string;
  userAgent: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'success' | 'failure' | 'warning';
}

interface SecurityAlert {
  id: string;
  type: 'login_anomaly' | 'permission_escalation' | 'data_breach' | 'suspicious_activity' | 'compliance_violation';
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'investigating' | 'resolved' | 'false_positive';
  affectedUsers: string[];
  timestamp: string;
  assignedTo?: string;
  resolution?: string;
}

interface ComplianceStandard {
  id: string;
  name: string;
  description: string;
  framework: 'SOX' | 'GDPR' | 'CCPA' | 'HIPAA' | 'PCI_DSS' | 'ISO27001' | 'FTC_MLM';
  requirements: ComplianceRequirement[];
  overallScore: number;
  lastAssessment: string;
  nextAssessment: string;
  status: 'compliant' | 'non_compliant' | 'partial' | 'pending';
}

interface ComplianceRequirement {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'met' | 'not_met' | 'partial' | 'not_applicable';
  evidence: string[];
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  dueDate?: string;
  assignedTo?: string;
}

interface EncryptionConfig {
  dataAtRest: {
    enabled: boolean;
    algorithm: string;
    keyRotationInterval: number;
    lastRotation: string;
  };
  dataInTransit: {
    enabled: boolean;
    protocol: string;
    certificateExpiry: string;
  };
  backups: {
    encrypted: boolean;
    location: string;
    retention: number;
  };
}

const SecurityComplianceSystem = () => {
  const [roles, setRoles] = useState<SecurityRole[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [securityAlerts, setSecurityAlerts] = useState<SecurityAlert[]>([]);
  const [complianceStandards, setComplianceStandards] = useState<ComplianceStandard[]>([]);
  const [encryptionConfig, setEncryptionConfig] = useState<EncryptionConfig | null>(null);
  const [selectedRole, setSelectedRole] = useState<SecurityRole | null>(null);
  const [isCreatingRole, setIsCreatingRole] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Sample security roles
    const sampleRoles: SecurityRole[] = [
      {
        id: '1',
        name: 'System Administrator',
        description: 'Full system access with all administrative privileges',
        permissions: [
          { id: '1', resource: 'users', action: 'create', scope: 'all' },
          { id: '2', resource: 'users', action: 'read', scope: 'all' },
          { id: '3', resource: 'users', action: 'update', scope: 'all' },
          { id: '4', resource: 'users', action: 'delete', scope: 'all' },
          { id: '5', resource: 'system', action: 'execute', scope: 'all' }
        ],
        userCount: 3,
        isSystemRole: true,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01'
      },
      {
        id: '2',
        name: 'Team Leader',
        description: 'Manage team members and view team analytics',
        permissions: [
          { id: '6', resource: 'team', action: 'read', scope: 'downline' },
          { id: '7', resource: 'team', action: 'update', scope: 'downline' },
          { id: '8', resource: 'reports', action: 'read', scope: 'team' },
          { id: '9', resource: 'analytics', action: 'read', scope: 'team' }
        ],
        userCount: 45,
        isSystemRole: false,
        createdAt: '2024-01-15',
        updatedAt: '2024-05-20'
      },
      {
        id: '3',
        name: 'Distributor',
        description: 'Basic member access for distributors',
        permissions: [
          { id: '10', resource: 'profile', action: 'read', scope: 'own' },
          { id: '11', resource: 'profile', action: 'update', scope: 'own' },
          { id: '12', resource: 'orders', action: 'create', scope: 'own' },
          { id: '13', resource: 'reports', action: 'read', scope: 'own' }
        ],
        userCount: 1247,
        isSystemRole: false,
        createdAt: '2024-01-01',
        updatedAt: '2024-03-15'
      },
      {
        id: '4',
        name: 'Compliance Officer',
        description: 'Monitor compliance and audit activities',
        permissions: [
          { id: '14', resource: 'audit_logs', action: 'read', scope: 'all' },
          { id: '15', resource: 'compliance', action: 'read', scope: 'all' },
          { id: '16', resource: 'compliance', action: 'update', scope: 'all' },
          { id: '17', resource: 'reports', action: 'read', scope: 'all' }
        ],
        userCount: 2,
        isSystemRole: false,
        createdAt: '2024-02-01',
        updatedAt: '2024-04-10'
      }
    ];

    // Sample audit logs
    const sampleAuditLogs: AuditLog[] = [
      {
        id: '1',
        userId: 'user-001',
        userName: 'Sarah Johnson',
        action: 'User Login',
        resource: 'Authentication',
        details: 'Successful login from new device',
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        timestamp: '2024-06-01T10:30:00Z',
        severity: 'low',
        status: 'success'
      },
      {
        id: '2',
        userId: 'user-002',
        userName: 'Mike Chen',
        action: 'Role Assignment',
        resource: 'User Management',
        details: 'Assigned Team Leader role to user ID: user-045',
        ipAddress: '10.0.0.15',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
        timestamp: '2024-06-01T09:15:00Z',
        severity: 'medium',
        status: 'success'
      },
      {
        id: '3',
        userId: 'user-003',
        userName: 'Unknown',
        action: 'Failed Login Attempt',
        resource: 'Authentication',
        details: 'Multiple failed login attempts for user: admin@company.com',
        ipAddress: '203.0.113.45',
        userAgent: 'curl/7.68.0',
        timestamp: '2024-06-01T08:45:00Z',
        severity: 'high',
        status: 'failure'
      },
      {
        id: '4',
        userId: 'user-004',
        userName: 'David Kim',
        action: 'Data Export',
        resource: 'Customer Data',
        details: 'Exported customer list (1,247 records) to CSV',
        ipAddress: '172.16.0.10',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        timestamp: '2024-06-01T07:20:00Z',
        severity: 'medium',
        status: 'success'
      }
    ];

    // Sample security alerts
    const sampleSecurityAlerts: SecurityAlert[] = [
      {
        id: '1',
        type: 'login_anomaly',
        title: 'Unusual Login Pattern Detected',
        description: 'User logged in from 5 different countries within 24 hours',
        severity: 'high',
        status: 'investigating',
        affectedUsers: ['user-001'],
        timestamp: '2024-06-01T12:00:00Z',
        assignedTo: 'security-team'
      },
      {
        id: '2',
        type: 'permission_escalation',
        title: 'Unauthorized Permission Change',
        description: 'User attempted to modify their own role permissions',
        severity: 'critical',
        status: 'open',
        affectedUsers: ['user-027'],
        timestamp: '2024-06-01T11:30:00Z'
      },
      {
        id: '3',
        type: 'compliance_violation',
        title: 'GDPR Data Retention Violation',
        description: 'Customer data retained beyond 24-month limit',
        severity: 'medium',
        status: 'resolved',
        affectedUsers: ['batch-2022-q1'],
        timestamp: '2024-05-31T16:45:00Z',
        assignedTo: 'compliance-team',
        resolution: 'Data purged according to retention policy'
      }
    ];

    // Sample compliance standards
    const sampleComplianceStandards: ComplianceStandard[] = [
      {
        id: '1',
        name: 'FTC MLM Guidelines',
        description: 'Federal Trade Commission guidelines for MLM businesses',
        framework: 'FTC_MLM',
        requirements: [
          {
            id: '1',
            title: 'Income Disclosure Statements',
            description: 'Provide clear income disclosure statements to potential recruits',
            category: 'Financial Disclosure',
            status: 'met',
            evidence: ['income-disclosure-2024.pdf', 'website-disclosure-screenshot.png'],
            riskLevel: 'high'
          },
          {
            id: '2',
            title: 'Product Sales Documentation',
            description: 'Maintain records proving legitimate product sales to end consumers',
            category: 'Sales Records',
            status: 'met',
            evidence: ['sales-reports-q1-2024.xlsx', 'customer-purchase-logs.csv'],
            riskLevel: 'critical'
          },
          {
            id: '3',
            title: 'No Pay-to-Play Requirements',
            description: 'Ensure distributors are not required to purchase products to remain eligible for compensation',
            category: 'Compensation Structure',
            status: 'partial',
            evidence: ['compensation-plan-v2.pdf'],
            riskLevel: 'high',
            dueDate: '2024-07-01',
            assignedTo: 'legal-team'
          }
        ],
        overallScore: 85,
        lastAssessment: '2024-05-15',
        nextAssessment: '2024-08-15',
        status: 'compliant'
      },
      {
        id: '2',
        name: 'GDPR Compliance',
        description: 'General Data Protection Regulation compliance for EU operations',
        framework: 'GDPR',
        requirements: [
          {
            id: '4',
            title: 'Data Processing Consent',
            description: 'Obtain explicit consent for all data processing activities',
            category: 'Consent Management',
            status: 'met',
            evidence: ['consent-management-system.pdf', 'privacy-policy-v3.pdf'],
            riskLevel: 'critical'
          },
          {
            id: '5',
            title: 'Right to be Forgotten',
            description: 'Implement processes for data subject deletion requests',
            category: 'Data Rights',
            status: 'met',
            evidence: ['deletion-workflow.pdf', 'request-handling-logs.csv'],
            riskLevel: 'high'
          },
          {
            id: '6',
            title: 'Data Breach Notification',
            description: 'Report data breaches to authorities within 72 hours',
            category: 'Incident Response',
            status: 'met',
            evidence: ['incident-response-plan.pdf', 'notification-templates.docx'],
            riskLevel: 'critical'
          }
        ],
        overallScore: 92,
        lastAssessment: '2024-04-20',
        nextAssessment: '2024-07-20',
        status: 'compliant'
      },
      {
        id: '3',
        name: 'ISO 27001',
        description: 'Information Security Management System standard',
        framework: 'ISO27001',
        requirements: [
          {
            id: '7',
            title: 'Risk Assessment',
            description: 'Conduct regular information security risk assessments',
            category: 'Risk Management',
            status: 'not_met',
            evidence: [],
            riskLevel: 'high',
            dueDate: '2024-06-30',
            assignedTo: 'security-team'
          }
        ],
        overallScore: 45,
        lastAssessment: '2024-03-01',
        nextAssessment: '2024-09-01',
        status: 'non_compliant'
      }
    ];

    // Sample encryption configuration
    const sampleEncryptionConfig: EncryptionConfig = {
      dataAtRest: {
        enabled: true,
        algorithm: 'AES-256-GCM',
        keyRotationInterval: 90, // days
        lastRotation: '2024-05-01'
      },
      dataInTransit: {
        enabled: true,
        protocol: 'TLS 1.3',
        certificateExpiry: '2024-12-31'
      },
      backups: {
        encrypted: true,
        location: 'AWS S3 (encrypted)',
        retention: 365 // days
      }
    };

    setRoles(sampleRoles);
    setAuditLogs(sampleAuditLogs);
    setSecurityAlerts(sampleSecurityAlerts);
    setComplianceStandards(sampleComplianceStandards);
    setEncryptionConfig(sampleEncryptionConfig);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-500';
      case 'high':
        return 'bg-orange-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
      case 'met':
      case 'compliant':
      case 'resolved':
        return 'bg-green-500';
      case 'failure':
      case 'not_met':
      case 'non_compliant':
      case 'open':
        return 'bg-red-500';
      case 'warning':
      case 'partial':
      case 'investigating':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const SecurityOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Users</p>
                <p className="text-2xl font-bold">1,297</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <UserCheck className="h-3 w-3 mr-1" />
                  98.5% authenticated
                </p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Security Alerts</p>
                <p className="text-2xl font-bold">{securityAlerts.filter(a => a.status === 'open').length}</p>
                <p className="text-xs text-red-600 flex items-center mt-1">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  {securityAlerts.filter(a => a.severity === 'critical').length} critical
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Compliance Score</p>
                <p className="text-2xl font-bold">
                  {Math.round(complianceStandards.reduce((acc, std) => acc + std.overallScore, 0) / complianceStandards.length)}%
                </p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <Award className="h-3 w-3 mr-1" />
                  Above benchmark
                </p>
              </div>
              <Award className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Data Encryption</p>
                <p className="text-2xl font-bold">100%</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <Lock className="h-3 w-3 mr-1" />
                  All data encrypted
                </p>
              </div>
              <Lock className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Security Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Recent Security Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {securityAlerts.slice(0, 5).map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className={`h-5 w-5 ${alert.severity === 'critical' ? 'text-red-600' : alert.severity === 'high' ? 'text-orange-600' : 'text-yellow-600'}`} />
                  <div>
                    <div className="font-medium">{alert.title}</div>
                    <div className="text-sm text-gray-600">{alert.description}</div>
                    <div className="text-xs text-gray-500">{new Date(alert.timestamp).toLocaleString()}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getSeverityColor(alert.severity)}>
                    {alert.severity}
                  </Badge>
                  <Badge className={getStatusColor(alert.status)}>
                    {alert.status.replace('_', ' ')}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Compliance Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Compliance Status Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {complianceStandards.map((standard) => (
              <div key={standard.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold">{standard.name}</h4>
                  <Badge className={getStatusColor(standard.status)}>
                    {standard.status.replace('_', ' ')}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Overall Score:</span>
                    <span className="font-medium">{standard.overallScore}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${standard.overallScore >= 80 ? 'bg-green-500' : standard.overallScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{ width: `${standard.overallScore}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Last: {new Date(standard.lastAssessment).toLocaleDateString()}</span>
                    <span>Next: {new Date(standard.nextAssessment).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const RoleManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Role & Permission Management</h2>
        <Button onClick={() => setIsCreatingRole(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Role
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map((role) => (
          <Card key={role.id} className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{role.name}</CardTitle>
                <div className="flex items-center space-x-2">
                  {role.isSystemRole && (
                    <Badge variant="outline" className="text-xs">System</Badge>
                  )}
                  <Badge className="bg-blue-500">{role.userCount} users</Badge>
                </div>
              </div>
              <CardDescription>{role.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Permissions:</span>
                    <span className="font-medium">{role.permissions.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Created:</span>
                    <span>{new Date(role.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Updated:</span>
                    <span>{new Date(role.updatedAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div>
                  <h5 className="text-sm font-medium mb-2">Key Permissions:</h5>
                  <div className="space-y-1">
                    {role.permissions.slice(0, 3).map((permission) => (
                      <div key={permission.id} className="text-xs text-gray-600">
                        • {permission.action} {permission.resource} ({permission.scope})
                      </div>
                    ))}
                    {role.permissions.length > 3 && (
                      <div className="text-xs text-gray-500">
                        +{role.permissions.length - 3} more
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button size="sm" onClick={() => setSelectedRole(role)}>
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                  <Button size="sm" variant="outline" disabled={role.isSystemRole}>
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline" disabled={role.isSystemRole}>
                    <Copy className="h-3 w-3 mr-1" />
                    Clone
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedRole && (
        <Card>
          <CardHeader>
            <CardTitle>Role Details: {selectedRole.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Role Information</h4>
                <div className="space-y-2">
                  <div><strong>Name:</strong> {selectedRole.name}</div>
                  <div><strong>Description:</strong> {selectedRole.description}</div>
                  <div><strong>Users Assigned:</strong> {selectedRole.userCount}</div>
                  <div><strong>System Role:</strong> {selectedRole.isSystemRole ? 'Yes' : 'No'}</div>
                  <div><strong>Created:</strong> {new Date(selectedRole.createdAt).toLocaleDateString()}</div>
                  <div><strong>Last Updated:</strong> {new Date(selectedRole.updatedAt).toLocaleDateString()}</div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Permissions ({selectedRole.permissions.length})</h4>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {selectedRole.permissions.map((permission) => (
                    <div key={permission.id} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{permission.resource}</div>
                        <Badge variant="outline" className="text-xs">
                          {permission.action}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        Scope: {permission.scope}
                      </div>
                      {permission.conditions && permission.conditions.length > 0 && (
                        <div className="text-xs text-gray-500 mt-1">
                          Conditions: {permission.conditions.join(', ')}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const AuditLogs = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Audit Logs</h2>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4 font-medium">Timestamp</th>
                  <th className="text-left p-4 font-medium">User</th>
                  <th className="text-left p-4 font-medium">Action</th>
                  <th className="text-left p-4 font-medium">Resource</th>
                  <th className="text-left p-4 font-medium">IP Address</th>
                  <th className="text-left p-4 font-medium">Severity</th>
                  <th className="text-left p-4 font-medium">Status</th>
                  <th className="text-center p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {auditLogs.map((log, index) => (
                  <tr key={log.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="p-4">
                      <div className="text-xs text-gray-600">
                        {new Date(log.timestamp).toLocaleString()}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium">{log.userName}</div>
                      <div className="text-xs text-gray-600">{log.userId}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium">{log.action}</div>
                    </td>
                    <td className="p-4">
                      <div>{log.resource}</div>
                      <div className="text-xs text-gray-600 mt-1">{log.details}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-xs font-mono">{log.ipAddress}</div>
                    </td>
                    <td className="p-4">
                      <Badge className={getSeverityColor(log.severity)}>
                        {log.severity}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Badge className={getStatusColor(log.status)}>
                        {log.status}
                      </Badge>
                    </td>
                    <td className="p-4 text-center">
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const ComplianceMonitoring = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Compliance Monitoring</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Framework
        </Button>
      </div>

      <div className="space-y-6">
        {complianceStandards.map((standard) => (
          <Card key={standard.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    {standard.name}
                  </CardTitle>
                  <CardDescription>{standard.description}</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(standard.status)}>
                    {standard.status.replace('_', ' ')}
                  </Badge>
                  <Badge variant="outline">{standard.framework}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{standard.overallScore}%</div>
                  <div className="text-sm text-gray-600">Overall Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {standard.requirements.filter(r => r.status === 'met').length}
                  </div>
                  <div className="text-sm text-gray-600">Requirements Met</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">
                    {standard.requirements.filter(r => r.status === 'not_met').length}
                  </div>
                  <div className="text-sm text-gray-600">Not Met</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">
                    {standard.requirements.filter(r => r.status === 'partial').length}
                  </div>
                  <div className="text-sm text-gray-600">Partial</div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Requirements Breakdown</h4>
                {standard.requirements.map((requirement) => (
                  <div key={requirement.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium">{requirement.title}</h5>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(requirement.status)}>
                          {requirement.status.replace('_', ' ')}
                        </Badge>
                        <Badge className={getSeverityColor(requirement.riskLevel)}>
                          {requirement.riskLevel} risk
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{requirement.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <strong>Category:</strong> {requirement.category}
                      </div>
                      {requirement.assignedTo && (
                        <div>
                          <strong>Assigned To:</strong> {requirement.assignedTo}
                        </div>
                      )}
                      {requirement.dueDate && (
                        <div>
                          <strong>Due Date:</strong> {new Date(requirement.dueDate).toLocaleDateString()}
                        </div>
                      )}
                      <div>
                        <strong>Evidence:</strong> {requirement.evidence.length} files
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const DataProtection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Data Protection & Encryption</h2>
        <Button>
          <Settings className="h-4 w-4 mr-2" />
          Encryption Settings
        </Button>
      </div>

      {encryptionConfig && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="h-5 w-5 mr-2" />
                Data at Rest
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Status:</span>
                  <Badge className={encryptionConfig.dataAtRest.enabled ? 'bg-green-500' : 'bg-red-500'}>
                    {encryptionConfig.dataAtRest.enabled ? 'Enabled' : 'Disabled'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Algorithm:</span>
                  <span className="font-mono text-sm">{encryptionConfig.dataAtRest.algorithm}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Key Rotation:</span>
                  <span>{encryptionConfig.dataAtRest.keyRotationInterval} days</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Last Rotation:</span>
                  <span>{new Date(encryptionConfig.dataAtRest.lastRotation).toLocaleDateString()}</span>
                </div>
                <Button className="w-full" size="sm">
                  <Key className="h-4 w-4 mr-2" />
                  Rotate Keys Now
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="h-5 w-5 mr-2" />
                Data in Transit
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Status:</span>
                  <Badge className={encryptionConfig.dataInTransit.enabled ? 'bg-green-500' : 'bg-red-500'}>
                    {encryptionConfig.dataInTransit.enabled ? 'Enabled' : 'Disabled'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Protocol:</span>
                  <span className="font-mono text-sm">{encryptionConfig.dataInTransit.protocol}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Certificate Expiry:</span>
                  <span>{new Date(encryptionConfig.dataInTransit.certificateExpiry).toLocaleDateString()}</span>
                </div>
                <Button className="w-full" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Renew Certificate
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Cloud className="h-5 w-5 mr-2" />
                Backup Encryption
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Status:</span>
                  <Badge className={encryptionConfig.backups.encrypted ? 'bg-green-500' : 'bg-red-500'}>
                    {encryptionConfig.backups.encrypted ? 'Encrypted' : 'Not Encrypted'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Location:</span>
                  <span className="text-sm">{encryptionConfig.backups.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Retention:</span>
                  <span>{encryptionConfig.backups.retention} days</span>
                </div>
                <Button className="w-full" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Backup Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Data Classification & Protection Policies</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Data Classification Levels</h4>
              <div className="space-y-3">
                {[
                  { level: 'Public', description: 'Information that can be shared publicly', color: 'bg-green-500' },
                  { level: 'Internal', description: 'Information for internal use only', color: 'bg-blue-500' },
                  { level: 'Confidential', description: 'Sensitive business information', color: 'bg-yellow-500' },
                  { level: 'Restricted', description: 'Highly sensitive data requiring special handling', color: 'bg-red-500' }
                ].map((item) => (
                  <div key={item.level} className="flex items-center space-x-3 p-3 border rounded-lg">
                    <Badge className={item.color}>{item.level}</Badge>
                    <span className="text-sm">{item.description}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Protection Policies</h4>
              <div className="space-y-3">
                {[
                  'Customer PII requires encryption and access logging',
                  'Financial data must be encrypted with AES-256',
                  'Backup data must be encrypted and stored off-site',
                  'Access to sensitive data requires multi-factor authentication',
                  'Data retention policies enforced automatically'
                ].map((policy, index) => (
                  <div key={index} className="flex items-start space-x-2 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span className="text-sm">{policy}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <Shield className="h-8 w-8 mr-3 text-blue-600" />
            Security & Compliance Center
          </h1>
          <p className="text-gray-600">Enterprise-grade security controls and compliance monitoring</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Bell className="h-4 w-4 mr-2" />
            Alert Settings
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Security Report
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
          <TabsTrigger value="audit">Audit Logs</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="encryption">Data Protection</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <SecurityOverview />
        </TabsContent>

        <TabsContent value="roles">
          <RoleManagement />
        </TabsContent>

        <TabsContent value="audit">
          <AuditLogs />
        </TabsContent>

        <TabsContent value="compliance">
          <ComplianceMonitoring />
        </TabsContent>

        <TabsContent value="encryption">
          <DataProtection />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SecurityComplianceSystem;
