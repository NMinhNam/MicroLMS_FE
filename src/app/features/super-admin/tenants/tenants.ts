import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

/**
 * Tenant Management Feature (Super Admin)
 * 
 * Responsible for:
 * - Provisioning new tenants (Create New Tenant).
 * - Monitoring existing tenants' health and usage.
 * - Visualizing backend deployment logs.
 * 
 * Location: src/app/features/super-admin/tenants
 */
@Component({
  selector: 'app-tenants',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tenants.html',
  styleUrl: './tenants.css',
})
export class Tenants implements OnInit {
  // Flag to control the visibility of the "Create Tenant" modal
  showCreateModal = false;

  // New Tenant Form
  newTenant = {
    name: '',
    subdomain: ''
  };

  // Filter state
  searchQuery = '';
  selectedStatus = 'All';

  // Flag to simulate deployment process
  isDeploying = false;

  // Simulated deployment logs
  logs: string[] = [];

  // Dashboard Stats
  stats = [
    { label: 'Active Ecosystems', value: '1,284', trend: '+12%', icon: '🌐' },
    { label: 'Avg. Response Time', value: '42ms', trend: '-8%', icon: '⚡' },
    { label: 'Total Storage used', value: '4.2 TB', trend: '+18%', icon: '💾' },
    { label: 'Uptime (24h)', value: '99.99%', trend: 'Stable', icon: '💎' }
  ];

  // Data for the tenant list
  tenantsData = [
    { id: 1, name: 'English First', domain: 'ef.lms-saas.com', students: 1200, storage: '45GB', status: 'Active', health: 98, region: 'us-east-1' },
    { id: 2, name: 'SkillShare Vietnam', domain: 'skillshare.lms-saas.com', students: 450, storage: '12GB', status: 'Active', health: 100, region: 'ap-southeast-1' },
    { id: 3, name: 'Coding Academy', domain: 'ca.lms-saas.com', students: 80, storage: '2GB', status: 'Warning', health: 72, region: 'eu-central-1' },
    { id: 4, name: 'Design Hub', domain: 'design.lms-saas.com', students: 900, storage: '38GB', status: 'Active', health: 95, region: 'us-west-2' },
    { id: 5, name: 'Global Finance Inst.', domain: 'finance.lms-saas.com', students: 3200, storage: '120GB', status: 'Active', health: 100, region: 'ap-northeast-1' },
    { id: 6, name: 'Future Tech', domain: 'future.lms-saas.com', students: 150, storage: '5GB', status: 'Inactive', health: 0, region: 'us-east-1' },
  ];

  constructor() { }

  ngOnInit(): void { }

  /**
   * Returns a subset of tenants based on search and status filters.
   */
  get filteredTenants() {
    return this.tenantsData.filter(tenant => {
      const matchesSearch = tenant.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        tenant.domain.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesStatus = this.selectedStatus === 'All' || tenant.status === this.selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }

  /**
   * Triggers the "Create Tenant" provisioning process.
   * Simulates a backend script running with visual terminal logs.
   */
  createTenant() {
    if (!this.newTenant.name || !this.newTenant.subdomain) return;

    this.isDeploying = true;
    this.logs = [];
    this.addLog(`Initializing deployment script for: ${this.newTenant.name}...`);

    // Simulate deployment steps with timeouts
    setTimeout(() => this.addLog(`Creating new database schema: \`tenant_${this.newTenant.subdomain}_db\`...`), 1000);
    setTimeout(() => this.addLog('Configuring S3 bucket permissions and quotas...'), 2500);
    setTimeout(() => this.addLog(`Provisioning Admin account for ${this.newTenant.name}...`), 4000);
    setTimeout(() => {
      this.addLog(`SUCCESS: Tenant "${this.newTenant.name}" is now live at ${this.newTenant.subdomain}.lms-saas.com`);
      this.isDeploying = false;

      // Add to list for demo purposes
      this.tenantsData.unshift({
        id: Date.now(),
        name: this.newTenant.name,
        domain: `${this.newTenant.subdomain}.lms-saas.com`,
        students: 0,
        storage: '0GB',
        status: 'Active',
        health: 100,
        region: 'us-east-1'
      });
    }, 5500);
  }

  /**
   * Action: Suspend Tenant
   */
  toggleTenantStatus(tenant: any) {
    tenant.status = tenant.status === 'Active' ? 'Warning' : 'Active';
    console.log(`Tenant ${tenant.name} status changed to ${tenant.status}`);
  }

  /**
   * Action: Delete Tenant
   */
  deleteTenant(tenant: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: `PERMANENT DATA LOSS: You are about to delete ${tenant.name}. This will wipe their database and S3 storage.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.tenantsData = this.tenantsData.filter(t => t.id !== tenant.id);
        Swal.fire(
          'Deleted!',
          'The tenant has been removed from the platform.',
          'success'
        );
      }
    });
  }

  private addLog(message: string) {
    const timestamp = new Date().toLocaleTimeString();
    this.logs.push(`[${timestamp}] ${message}`);
  }

  toggleModal() {
    this.showCreateModal = !this.showCreateModal;
    if (!this.showCreateModal) {
      this.isDeploying = false;
      this.logs = [];
    }
  }
}
