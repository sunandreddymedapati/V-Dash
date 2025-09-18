import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Lock } from 'lucide-react';

const ChangePasswordDialog = ({
  open,
  onOpenChange,
  onSave
}) => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const [errors, setErrors] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [isCurrentPasswordValid, setIsCurrentPasswordValid] = useState(false);

  const validateCurrentPassword = (password) => {
    return password === "CurrentPass123!";
  };

  const validatePassword = (password) => {
    const errors = [];

    if (password.length < 8) {
      errors.push('At least 8 characters');
    }

    if (!/[A-Z]/.test(password)) {
      errors.push('One uppercase letter');
    }

    if (!/[0-9]/.test(password)) {
      errors.push('One number');
    }

    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      errors.push('One special character');
    }

    return errors;
  };

  const handleSave = () => {
    setErrors({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });

    let hasErrors = false;

    if (!formData.currentPassword) {
      setErrors(prev => ({ ...prev, currentPassword: 'Current password is required' }));
      hasErrors = true;
    } else if (!validateCurrentPassword(formData.currentPassword)) {
      setErrors(prev => ({ ...prev, currentPassword: 'Current password is incorrect' }));
      hasErrors = true;
    }

    if (!formData.newPassword) {
      setErrors(prev => ({ ...prev, newPassword: 'New password is required' }));
      hasErrors = true;
    } else {
      const passwordErrors = validatePassword(formData.newPassword);
      if (passwordErrors.length > 0) {
        setErrors(prev => ({ ...prev, newPassword: `Password must include: ${passwordErrors.join(', ')}` }));
        hasErrors = true;
      }
    }

    if (!formData.confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: 'Please confirm your new password' }));
      hasErrors = true;
    } else if (formData.newPassword !== formData.confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }));
      hasErrors = true;
    }

    if (!hasErrors) {
      onSave(formData);
      handleCancel();
    }
  };

  const handleCancel = () => {
    setFormData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setErrors({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setShowPasswords({
      current: false,
      new: false,
      confirm: false
    });
    setIsCurrentPasswordValid(false);
    onOpenChange(false);
  };

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }

    if (field === 'currentPassword') {
      const isValid = validateCurrentPassword(value);
      setIsCurrentPasswordValid(isValid);

      if (value && !isValid) {
        setErrors(prev => ({ ...prev, currentPassword: 'Current password is incorrect' }));
      }

      if (!isValid) {
        setFormData(prev => ({
          ...prev,
          newPassword: '',
          confirmPassword: ''
        }));
      }
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-800">
              <strong>Demo:</strong> Use "CurrentPass123!" as the current password
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <div className="relative">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-gray-400" />
                <Input
                  id="currentPassword"
                  type={showPasswords.current ? "text" : "password"}
                  value={formData.currentPassword}
                  onChange={(e) => updateFormData('currentPassword', e.target.value)}
                  placeholder="Enter current password"
                  className={errors.currentPassword ? "border-red-500" : ""}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => togglePasswordVisibility('current')}
                  className="flex-shrink-0"
                >
                  {showPasswords.current ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
            {errors.currentPassword && (
              <p className="text-sm text-red-600">{errors.currentPassword}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <div className="relative">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-gray-400" />
                <Input
                  id="newPassword"
                  type={showPasswords.new ? "text" : "password"}
                  value={formData.newPassword}
                  onChange={(e) => updateFormData('newPassword', e.target.value)}
                  placeholder={isCurrentPasswordValid ? "Enter new password" : "Enter correct current password first"}
                  className={errors.newPassword ? "border-red-500" : ""}
                  disabled={!isCurrentPasswordValid}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => togglePasswordVisibility('new')}
                  className="flex-shrink-0"
                  disabled={!isCurrentPasswordValid}
                >
                  {showPasswords.new ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>

            {isCurrentPasswordValid && (
              <div className="text-xs text-gray-600 space-y-1">
                <p className="font-medium">Password must contain:</p>
                <ul className="space-y-0.5 ml-2">
                  <li className={`flex items-center gap-1 ${formData.newPassword.length >= 8 ? 'text-green-600' : 'text-gray-500'}`}>
                    <span className="w-1 h-1 rounded-full bg-current"></span>
                    At least 8 characters
                  </li>
                  <li className={`flex items-center gap-1 ${/[A-Z]/.test(formData.newPassword) ? 'text-green-600' : 'text-gray-500'}`}>
                    <span className="w-1 h-1 rounded-full bg-current"></span>
                    One uppercase letter (A-Z)
                  </li>
                  <li className={`flex items-center gap-1 ${/[0-9]/.test(formData.newPassword) ? 'text-green-600' : 'text-gray-500'}`}>
                    <span className="w-1 h-1 rounded-full bg-current"></span>
                    One number (0-9)
                  </li>
                  <li className={`flex items-center gap-1 ${/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.newPassword) ? 'text-green-600' : 'text-gray-500'}`}>
                    <span className="w-1 h-1 rounded-full bg-current"></span>
                    One special character (!@#$%^&*)
                  </li>
                </ul>
              </div>
            )}

            {errors.newPassword && (
              <p className="text-sm text-red-600">{errors.newPassword}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Re-enter New Password</Label>
            <div className="relative">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-gray-400" />
                <Input
                  id="confirmPassword"
                  type={showPasswords.confirm ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                  placeholder={isCurrentPasswordValid ? "Re-enter new password" : "Enter correct current password first"}
                  className={errors.confirmPassword ? "border-red-500" : ""}
                  disabled={!isCurrentPasswordValid}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => togglePasswordVisibility('confirm')}
                  className="flex-shrink-0"
                  disabled={!isCurrentPasswordValid}
                >
                  {showPasswords.confirm ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
            {errors.confirmPassword && (
              <p className="text-sm text-red-600">{errors.confirmPassword}</p>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Change Password
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordDialog;