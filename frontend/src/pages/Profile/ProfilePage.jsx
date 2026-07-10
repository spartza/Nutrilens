import React, { useState, useEffect } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import AllergenSettings from '../../components/allergen/AllergenSettings';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { deleteUserProfile } from '../../api/auth.api';

export const ProfilePage = () => {
  const { user, updateProfile, logout } = useAuth();
  const { addToast } = useToast();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
    }
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    
    setUpdating(true);
    try {
      const updateData = { name, email };
      if (password) {
        updateData.password = password;
      }
      await updateProfile(updateData);
      setPassword('');
    } catch (err) {
      // Handled by toast alerts in useAuth
    } finally {
      setUpdating(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you absolutely sure you want to delete your account? This action is permanent and cannot be undone.")) {
      try {
        await deleteUserProfile();
        addToast('Your account was successfully deleted. Goodbye! 👋', 'success');
        logout();
      } catch (err) {
        addToast('Failed to delete account. Please try again.', 'error');
      }
    }
  };

  return (
    <PageWrapper>
      <div className="flex flex-col gap-6 w-full select-none max-w-2xl mx-auto animate-fade-in pb-12">
        <header className="flex flex-col gap-1 select-none">
          <h1 className="text-2xl font-black text-gray-808 leading-none">Profile Settings</h1>
          <p className="text-sm text-gray-400 font-semibold mt-1">
            Manage your personal allergen guidelines and account credentials.
          </p>
        </header>

        {/* Account Details */}
        <Card className="flex flex-col gap-4">
          <h2 className="text-base font-bold text-gray-800 flex items-center gap-2">
            <i className="bx bx-user-circle text-primary-500 text-xl" />
            <span>Account Credentials</span>
          </h2>
          <form onSubmit={handleUpdate} className="flex flex-col gap-4">
            <Input
              label="Full Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              icon={<i className="bx bx-user" />}
              required
            />
            
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<i className="bx bx-envelope" />}
              required
            />

            <Input
              label="New Password (optional)"
              type="password"
              placeholder="Leave blank to keep current password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<i className="bx bx-lock-alt" />}
            />

            <Button type="submit" variant="primary" className="mt-2 self-start" disabled={updating}>
              {updating ? 'Saving Changes...' : 'Save Profile Changes'}
            </Button>
          </form>
        </Card>

        {/* Allergen Filters */}
        <AllergenSettings />

        {/* Account deletion warning */}
        <Card className="border-red-100 bg-red-50/5 flex flex-col gap-3">
          <h2 className="text-base font-bold text-red-650 flex items-center gap-2">
            <i className="bx bx-error text-red-500 text-xl" />
            <span>Danger Zone</span>
          </h2>
          <p className="text-xs text-gray-500 leading-relaxed">
            Deleting your account will permanently wipe out all scan history, saved favorites, and preferences from our database.
          </p>
          <Button variant="danger" onClick={handleDeleteAccount} className="self-start text-xs font-bold mt-1 shadow-sm">
            <i className="bx bx-trash" />
            <span>Permanently Delete My Account</span>
          </Button>
        </Card>

      </div>
    </PageWrapper>
  );
};

export default ProfilePage;
