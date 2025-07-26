export const requestDetails = [
  {
    serviceRequestId: "EKKGAQEPCA",
    repairCategory: "Computer",
    serviceRequestType: "Custom New PC Builds",
    brand: "Asus",
    model: "ROG",
    repairIssues: [
      "Battery Replacement",
      "Data Recovery / Backup / Transfer",
      "Diagnostic",
      "EFI Password Reset/Removal",
      "Install / Upgrade New macOS",
    ],
    deliveryType: "Home Pickup",
    technicianName: "Raj Malhotra",
    technicianEmail: "raj.malhotra@example.com",
    technicianPhone: "+91 9876543210",
    pickupPerson: "Vikram Singh",
    uploadedImages: ["img1.png", "img2.png", "", ""],
  },
  {
    serviceRequestId: "DKLQWE9823",
    repairCategory: "Mobile",
    serviceRequestType: "Screen Replacement",
    brand: "Samsung",
    model: "Galaxy S22",
    repairIssues: ["Screen Crack", "Touch Not Working"],
    deliveryType: "Walk-in",
    technicianName: "Anita Joshi",
    technicianEmail: "anita.joshi@example.com",
    technicianPhone: "+91 9988776655",
    pickupPerson: "",
    uploadedImages: ["img3.png", "", "", ""],
  },
  {
    serviceRequestId: "PLMNB0987X",
    repairCategory: "Laptop",
    serviceRequestType: "OS & Software Setup",
    brand: "Dell",
    model: "XPS 15",
    repairIssues: [
      "Windows Installation",
      "Driver Setup",
      "Microsoft Office Activation",
    ],
    deliveryType: "Courier",
    technicianName: "",
    technicianEmail: "",
    technicianPhone: "",
    pickupPerson: "Ravi Patel",
    uploadedImages: ["", "", "", ""],
  },
];
export interface RequestDetailType {
  serviceRequestId: string;
  repairCategory: string;
  serviceRequestType: string;
  brand: string;
  model: string;
  repairIssues: string[];
  deliveryType: string;
  technicianName: string;
  technicianEmail: string;
  technicianPhone: string;
  pickupPerson: string;
  uploadedImages: string[]; // can be URLs or local file names/placeholders
}

// notification

export interface NotificationType {
  id: string;
  title: string;
  messages: string[];
  isRead: boolean;
  timestamp: string; // ISO string or formatted
}
export const dummyNotifications: NotificationType[] = [
  {
    id: "1",
    title: "Update on Your Repair Request",
    isRead: false,
    timestamp: "2025-07-14T09:00:00Z",
    messages: [
      "A technician has started reviewing your issue.",
      "New fault(s) identified. Images attached.",
      "Your repair estimate is ready for review.",
      "Pickup has been scheduled. Check your calendar.",
    ],
  },
  {
    id: "2",
    title: "Your Repair is Progressing!",
    isRead: true,
    timestamp: "2025-07-13T17:30:00Z",
    messages: [
      "Repair work has begun on your device.",
      "You will be notified once it's ready for pickup or delivery.",
    ],
  },
  {
    id: "3",
    title: "Payment Received",
    isRead: true,
    timestamp: "2025-07-12T14:45:00Z",
    messages: [
      "We have received your payment.",
      "You will be notified when your device is shipped.",
    ],
  },
];

export interface LoginResponse {
  status: number;
  userId: number;
  fullName: string;
  email: string;
  userType: number;
  message: string;
}

export interface RegisterResponse {
  status: string;
  message: string;
  userId: number;
}
export interface UserDetails {
  userId: number;
  customerId: string;
  timezoneId: number;
  timezone: string;
  fname: string;
  lname: string;
  email: string;
  profileImg: string;
  gender: string | null;
  date_of_birth: string | null;
  address: string | null;
  latitude: string | null;
  longitude: string | null;
  phoneNumber: string;
  city: string | null;
  state: string | null;
  country: string | null;
  zip_code: string | null;
  stripe_customer_id: string | null;
  stripe_connect_id: string | null;
  stripe_account_verified: number;
  profile_description: string;
}
export interface RepairCategory {
  id: number;
  name: string;
  image: any;
  description: string;
}
export interface serviceType {
  id: number;
  name: string;
  image: any;
  description: string;
}
export interface manufacturerType {
  id: number;
  name: string;
}
export interface modelListType {
  id: number;
  name: string;
}
export interface RepairRequestPayload {
  repair_category_id: string;
  maufacturer_id: string;
  model_id: string;
  service_type_id: string;
  repair_issue_id: number[]; // Array of issue IDs
}
