// src/components/ProfileSection.js
import { useState } from 'react';
import { 
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Package2Icon,
  SettingsIcon,
  UserIcon,
  LogOutIcon,
  MapPinIcon,
  CalendarIcon,
  MailIcon
} from "lucide-react";
import { useSelector, useDispatch } from 'react-redux';
import { changePasswordUser, signoutUser } from '@/store/authSlice';
import type { AppDispatch } from "@/store";
import { useNavigate } from 'react-router-dom';

// --- Placeholder Data ---
const placeholderUser = {
  name: 'Alex Thompson',
  email: 'alex.thompson@example.com',
  joinDate: '2023-05-15',
};

const placeholderOrders = [
  { id: 'ORD123', date: '2024-03-10', total: 75.50, status: 'Delivered' },
  { id: 'ORD456', date: '2024-03-22', total: 120.00, status: 'Processing' },
];

const placeholderAddresses = [
  { id: 1, type: 'Home', line1: '123 Main St', city: 'Anytown', state: 'CA', zip: '90210', default: true },
  { id: 2, type: 'Work', line1: '456 Business Ave', city: 'Metropolis', state: 'NY', zip: '10001', default: false },
];


const OrderRow = ({ order } : { order: any }) => {

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 border-b">
      <div className="space-y-1">
        <p className="font-medium text-primary">#{order.id}</p>
        <p className="text-sm text-muted-foreground">{order.date}</p>
      </div>
      <p className="font-medium">${order.total.toFixed(2)}</p>
      <Badge variant={order.status.toLowerCase()}>
        {order.status}
      </Badge>
    </div>
  );
};

const AddressCard = ({ address } : { address: any }) => (
  <Card className="relative">
    <CardHeader className="pb-2">
      <div className="flex justify-between items-start">
        <CardTitle className="text-lg flex items-center gap-2">
          <MapPinIcon className="h-5 w-5" />
          {address.type}
        </CardTitle>
        {address.default && (
          <Badge variant="secondary">Default</Badge>
        )}
      </div>
    </CardHeader>
    <CardContent>
      <p className="text-sm">{address.line1}</p>
      {address.line2 && <p className="text-sm">{address.line2}</p>}
      <p className="text-sm text-muted-foreground">
        {address.city}, {address.state} {address.zip}
      </p>
    </CardContent>
    <CardFooter className="flex gap-2">
      <Button variant="outline" size="sm">Edit</Button>
      {!address.default && (
        <Button variant="ghost" size="sm">Set as Default</Button>
      )}
    </CardFooter>
  </Card>
);

const AddAddressForm = () => (
  <div className="space-y-4">
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="type">Address Type</Label>
        <Input id="type" placeholder="Home, Work, etc." />
      </div>
      <div className="space-y-2">
        <Label htmlFor="default">Default Address</Label>
        <Input id="default" type="checkbox" className="w-4 h-4" />
      </div>
    </div>
    <div className="space-y-2">
      <Label htmlFor="line1">Street Address</Label>
      <Input id="line1" placeholder="123 Main St" />
    </div>
    <div className="space-y-2">
      <Label htmlFor="line2">Apt/Suite (Optional)</Label>
      <Input id="line2" placeholder="Apt 4B" />
    </div>
    <div className="grid grid-cols-3 gap-4">
      <div className="space-y-2">
        <Label htmlFor="city">City</Label>
        <Input id="city" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="state">State</Label>
        <Input id="state" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="zip">ZIP Code</Label>
        <Input id="zip" />
      </div>
    </div>
    <Button type="submit" className="w-full">
      Save Address
    </Button>
  </div>
);

const ProfileSection = ({ 
  user = placeholderUser, 
  orders = placeholderOrders, 
  addresses = placeholderAddresses 
}) => {
  const [activeSection, setActiveSection] = useState('overview');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordChangeError, setPasswordChangeError] = useState<string | null>(null);
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState<string | null>(null);

  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: any) => state.auth);

  const handleChangePassword = async () => {
    setPasswordChangeError(null);
    setPasswordChangeSuccess(null);

    if (!oldPassword || !newPassword || !confirmNewPassword) {
      setPasswordChangeError("All fields are required.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setPasswordChangeError("New passwords do not match.");
      return;
    }

    try {
      await dispatch(changePasswordUser({ oldPassword, newPassword })).unwrap();
      setPasswordChangeSuccess("Password changed successfully!");
      setOldPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (err: any) {
      setPasswordChangeError(err || "Failed to change password.");
    }
  };

  const handleSignout = async () => {
    try {
      await dispatch(signoutUser()).unwrap();
      navigate("/");
    } catch (err: any) {
      console.log(err);
    }
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'orders':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight">Order History</h2>
            </div>
            <Separator />
            {orders.length > 0 ? (
              <div className="divide-y rounded-lg border">
                {orders.map(order => (
                  <OrderRow key={order.id} order={order} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center gap-1 text-center">
                <Package2Icon className="h-8 w-8 text-muted-foreground" />
                <h3 className="text-lg font-semibold">No orders yet</h3>
                <p className="text-sm text-muted-foreground">
                  You haven't placed any orders yet.
                </p>
              </div>
            )}
          </div>
        );

      case 'addresses':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight">Manage Addresses</h2>
              <Sheet>
                <SheetTrigger asChild>
                  <Button>Add New Address</Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Add New Address</SheetTitle>
                    <SheetDescription>
                      Fill in the details for your new address.
                    </SheetDescription>
                  </SheetHeader>
                  <AddAddressForm />
                </SheetContent>
              </Sheet>
            </div>
            <Separator />
            {addresses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses.map(addr => (
                  <AddressCard key={addr.id} address={addr} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center gap-1 text-center">
                <MapPinIcon className="h-8 w-8 text-muted-foreground" />
                <h3 className="text-lg font-semibold">No addresses saved</h3>
                <p className="text-sm text-muted-foreground">
                  You haven't saved any addresses yet.
                </p>
              </div>
            )}
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight">Account Settings</h2>
            <Separator />
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>
                    Update your account password here.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current">Current Password</Label>
                    <Input 
                      id="current" 
                      type="password" 
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new">New Password</Label>
                    <Input 
                      id="new" 
                      type="password" 
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm">Confirm New Password</Label>
                    <Input 
                      id="confirm" 
                      type="password" 
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                    />
                  </div>
                  {passwordChangeError && (
                    <div className="text-red-500 text-sm">{passwordChangeError}</div>
                  )}
                  {passwordChangeSuccess && (
                    <div className="text-green-500 text-sm">{passwordChangeSuccess}</div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button onClick={handleChangePassword} disabled={loading}>
                    {loading ? "Updating..." : "Update Password"}
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Danger Zone</CardTitle>
                  <CardDescription>
                    These actions are irreversible. Proceed with caution.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="destructive">Delete Account</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'overview':
      default:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Profile Overview</h2>
              <p className="text-muted-foreground">
                Welcome back, {user.name}!
              </p>
            </div>
            <Separator />
            <Card>
              <CardHeader className="flex flex-col sm:flex-row items-center gap-4 space-y-0">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <UserIcon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-center sm:text-left">
                  <CardTitle>{user.name}</CardTitle>
                  <CardDescription>{user.email}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Member since {user.joinDate}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MailIcon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {user.email}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className='flex justify-center md:justify-end'>
                <Button variant="outline">Edit Profile</Button>
              </CardFooter>
            </Card>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Total Orders</CardDescription>
                  <CardTitle className="text-4xl">{orders.length}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    +{Math.floor(orders.length * 1.5)} from last month
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Saved Addresses</CardDescription>
                  <CardTitle className="text-4xl">{addresses.length}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    {addresses.filter(a => a.default).length} default address
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
    }
  };

  const navItems = [
    { id: 'overview', label: 'Overview', icon: <UserIcon className="h-5 w-5" /> },
    { id: 'orders', label: 'Orders', icon: <Package2Icon className="h-5 w-5" /> },
    { id: 'addresses', label: 'Addresses', icon: <MapPinIcon className="h-5 w-5" /> },
    { id: 'settings', label: 'Settings', icon: <SettingsIcon className="h-5 w-5" /> },
  ];

  return (
    <div className="container py-8 md:py-12">
      <h1 className="text-3xl font-bold tracking-tight mb-8">My Account</h1>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="w-full md:w-1/4">
          <nav className="space-y-1">
            {navItems.map(item => (
              <Button
                key={item.id}
                variant={activeSection === item.id ? 'secondary' : 'ghost'}
                className={`w-full justify-start ${activeSection === item.id ? 'bg-accent' : ''}`}
                onClick={() => setActiveSection(item.id)}
              >
                {item.icon}
                <span className="ml-2">{item.label}</span>
              </Button>
            ))}
            <Separator className="my-2" />
            <Button
              variant="ghost"
              className="w-full justify-start text-destructive hover:text-destructive"
              onClick={handleSignout}
            >
              <LogOutIcon className="h-5 w-5" />
              <span className="ml-2">Logout</span>
            </Button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {renderSectionContent()}
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;