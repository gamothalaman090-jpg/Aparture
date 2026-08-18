/**
 * Base User Class demonstrating OOP Polymorphism
 */
export class UserDomain {
  constructor({ id, name, email, role, createdAt }) {
    if (new.target === UserDomain) {
      throw new Error("Cannot instantiate abstract class UserDomain directly.");
    }
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
    this.createdAt = createdAt;
  }

  // Polymorphic method to be overridden by subclasses
  getPermissions() {
    return [];
  }

  canPerformAction(action) {
    return this.getPermissions().includes(action);
  }

  getDashboardTitle() {
    return "User Portal";
  }
}

export class CustomerUser extends UserDomain {
  constructor(data) {
    super({ ...data, role: 'customer' });
  }

  getPermissions() {
    return [
      'browse_catalog',
      'create_booking',
      'view_own_orders',
      'cancel_own_booking',
      'submit_review',
    ];
  }

  getDashboardTitle() {
    return "Customer Rental History & Account";
  }
}

export class AdminUser extends UserDomain {
  constructor(data) {
    super({ ...data, role: 'admin' });
  }

  getPermissions() {
    return [
      'browse_catalog',
      'create_booking',
      'view_own_orders',
      'cancel_own_booking',
      'submit_review',
      'manage_inventory',
      'manage_categories',
      'manage_orders',
      'update_order_status',
      'view_financial_reports',
    ];
  }

  getDashboardTitle() {
    return "Admin Command Center";
  }
}
