export type Asset = {
  id: number;
  title: string;
  categories: string[];
  datePosted: Date;
  location: string;
  imgUrls?: string[];
  description: string;
  poster: User;
  organization: number;
  type: 'need' | 'donation';
  org: string;
  condition: string;
};

export type Organization = {
  id?: number;
  name: string;
  doing_business_as: string;
  description: string;
  website: string;
  address: string;
  phone: string;
  city: string;
  state: string;
  ein: string;
  nonprofit_classification: string;
  image_url: string;
};

export enum Role {
  admin = 'ADMIN',
  owner = 'OWNER',
  revoked = 'REVOKED',
}

export enum ApprovalStatus {
  approved = 'APPROVED',
  pending = 'PENDING',
  denied = 'DENIED',
}

export type UserOrg = {
  organization: Organization;
  organizationId: number;
  user: User;
  role: string;
  approvalStatus: string;
};

export type User = {
  id?: number;
  firstName: string;
  last_name?: string;
  email?: string;
  profile_image_url?: string;
  organizations: UserOrg[];
  city?: string;
  state?: string;
  zip_code?: string;
  bio?: string;
  interests?: { names: string[] };
};

export type Transaction = {
  id: number;
  donater_user: User;
  donater_organization: Organization;
  asset: Pick<Asset, 'id' | 'title'>;
  claimer: Organization;
  messages: Message[];
};

export type Message = {
  id: number;
  text: string;
  transactionId: number;
  sendingUserId: number | null;
  sendingOrgId: number | null;
  created_date: string;
  read: boolean;
};

export type Option = {
  id?: string;
  text: string;
  value: string;
};

export type TextLink = {
  url: string;
  text: string;
};

export type Category = {
  id: number;
  name: string;
  applies_to_assets: boolean;
  applies_to_organizations: boolean;
};

export type StoreUser = {
  id?: number;
  firstName: string;
  lastName?: string;
  email?: string;
  profileImageUrl?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  interests?: { names: string[] };
  isLoading: boolean;
};
