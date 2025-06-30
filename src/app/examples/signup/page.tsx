"use client"

import React, { useState } from "react"
import { Typography, H2, Text, Caption } from "@/components/ui/typography"
import { TextInput } from "@/components/ui/input"
import { Button } from "@/components/ui/button-shadcn"
import { Icon } from "@/components/ui/icon"
import { cn } from "@/lib/utils"

interface FormData {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  agreeToTerms: boolean
}

interface FormErrors {
  firstName?: string
  lastName?: string
  email?: string
  password?: string
  confirmPassword?: string
  agreeToTerms?: string
}

export default function SignupPage() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePassword = (password: string): boolean => {
    return password.length >= 8
  }

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required"
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (!validatePassword(formData.password)) {
      newErrors.password = "Password must be at least 8 characters long"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions"
    }

    return newErrors
  }

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const formErrors = validateForm()
    setErrors(formErrors)

    if (Object.keys(formErrors).length === 0) {
      setIsSubmitting(true)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setIsSubmitting(false)
      // Handle successful signup
      alert("Account created successfully!")
    }
  }

  const handleReset = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    })
    setErrors({})
  }

  return (
    <div className="min-h-screen bg-[var(--fleet-background-primary)] p-6">
      <div className="max-w-md mx-auto">
        <div className="mb-8 text-center">
          <H2 className="mb-2">Create Your Account</H2>
          <Text size="medium" className="text-[var(--fleet-text-secondary)]">
            Join thousands of developers using Fleet
          </Text>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Typography variant="default-semibold" as="label" htmlFor="firstName">
                First Name
              </Typography>
              <TextInput
                id="firstName"
                type="text"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                error={!!errors.firstName}
                aria-describedby={errors.firstName ? "firstName-error" : undefined}
              />
              {errors.firstName && (
                <Caption 
                  id="firstName-error" 
                  className="text-[var(--fleet-text-dangerous)] flex items-center gap-1"
                >
                  <Icon fleet="error-outline" size="sm" />
                  {errors.firstName}
                </Caption>
              )}
            </div>

            <div className="space-y-2">
              <Typography variant="default-semibold" as="label" htmlFor="lastName">
                Last Name
              </Typography>
              <TextInput
                id="lastName"
                type="text"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                error={!!errors.lastName}
                aria-describedby={errors.lastName ? "lastName-error" : undefined}
              />
              {errors.lastName && (
                <Caption 
                  id="lastName-error" 
                  className="text-[var(--fleet-text-dangerous)] flex items-center gap-1"
                >
                  <Icon fleet="error-outline" size="sm" />
                  {errors.lastName}
                </Caption>
              )}
            </div>
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Typography variant="default-semibold" as="label" htmlFor="email">
              Email Address
            </Typography>
            <TextInput
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              error={!!errors.email}
              prefix="email"
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <Caption 
                id="email-error" 
                className="text-[var(--fleet-text-dangerous)] flex items-center gap-1"
              >
                <Icon fleet="error-outline" size="sm" />
                {errors.email}
              </Caption>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Typography variant="default-semibold" as="label" htmlFor="password">
              Password
            </Typography>
            <TextInput
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              error={!!errors.password}
              suffix={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-1 text-[var(--fleet-inputField-hint-default)] hover:text-[var(--fleet-text-primary)] transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <Icon fleet={showPassword ? "hide" : "show"} size="sm" />
                </button>
              }
              aria-describedby={errors.password ? "password-error" : "password-help"}
            />
            {errors.password ? (
              <Caption 
                id="password-error" 
                className="text-[var(--fleet-text-dangerous)] flex items-center gap-1"
              >
                <Icon fleet="error-outline" size="sm" />
                {errors.password}
              </Caption>
            ) : (
              <Caption 
                id="password-help" 
                className="text-[var(--fleet-text-secondary)]"
              >
                Password must be at least 8 characters long
              </Caption>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <Typography variant="default-semibold" as="label" htmlFor="confirmPassword">
              Confirm Password
            </Typography>
            <TextInput
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
              error={!!errors.confirmPassword}
              suffix={
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="p-1 text-[var(--fleet-inputField-hint-default)] hover:text-[var(--fleet-text-primary)] transition-colors"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  <Icon fleet={showConfirmPassword ? "hide" : "show"} size="sm" />
                </button>
              }
              aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined}
            />
            {errors.confirmPassword && (
              <Caption 
                id="confirmPassword-error" 
                className="text-[var(--fleet-text-dangerous)] flex items-center gap-1"
              >
                <Icon fleet="error-outline" size="sm" />
                {errors.confirmPassword}
              </Caption>
            )}
          </div>

          {/* Terms and Conditions */}
          <div className="space-y-2">
            <label className="flex items-start gap-3 cursor-pointer">
              <div className="relative flex items-center mt-0.5">
                <input
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={(e) => handleInputChange("agreeToTerms", e.target.checked)}
                  className="sr-only"
                  aria-describedby={errors.agreeToTerms ? "terms-error" : undefined}
                />
                <div 
                  className={cn(
                    "w-4 h-4 rounded border-2 flex items-center justify-center transition-colors",
                    formData.agreeToTerms
                      ? "bg-[var(--fleet-checkbox-background-checked)] border-[var(--fleet-checkbox-border-checked)]"
                      : "bg-[var(--fleet-checkbox-background-default)] border-[var(--fleet-checkbox-border-default)]",
                    errors.agreeToTerms && "border-[var(--fleet-checkbox-border-error)]"
                  )}
                >
                  {formData.agreeToTerms && (
                    <Icon fleet="checkmark" size="xs" className="text-[var(--fleet-checkbox-checkmark-checked)]" />
                  )}
                </div>
              </div>
              <div className="flex-1">
                <Text size="default">
                  I agree to the{" "}
                  <button
                    type="button"
                    className="text-[var(--fleet-button-primary-background-default)] hover:underline focus:underline focus:outline-none"
                  >
                    Terms of Service
                  </button>
                  {" "}and{" "}
                  <button
                    type="button"
                    className="text-[var(--fleet-button-primary-background-default)] hover:underline focus:underline focus:outline-none"
                  >
                    Privacy Policy
                  </button>
                </Text>
              </div>
            </label>
            {errors.agreeToTerms && (
              <Caption 
                id="terms-error" 
                className="text-[var(--fleet-text-dangerous)] flex items-center gap-1 ml-7"
              >
                <Icon fleet="error-outline" size="sm" />
                {errors.agreeToTerms}
              </Caption>
            )}
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isSubmitting}
              isLoading={isSubmitting}
              loadingText="Creating Account..."
              className="flex-1"
            >
              Create Account
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="lg"
              onClick={handleReset}
              disabled={isSubmitting}
              className="px-6"
            >
              Reset
            </Button>
          </div>
        </form>

        {/* Footer Links */}
        <div className="mt-8 text-center">
          <Text size="default" className="text-[var(--fleet-text-secondary)]">
            Already have an account?{" "}
            <button className="text-[var(--fleet-button-primary-background-default)] hover:underline focus:underline focus:outline-none">
              Sign in
            </button>
          </Text>
        </div>

        {/* Security Notice */}
        <div className="mt-6 p-4 bg-[var(--fleet-background-secondary)] rounded border border-[var(--fleet-border-default)]">
          <div className="flex gap-3">
            <Icon fleet="info-outline" size="sm" className="text-[var(--fleet-text-accent)] mt-0.5 flex-shrink-0" />
            <div>
              <Typography variant="default-semibold" className="mb-1">
                Your data is secure
              </Typography>
              <Caption className="text-[var(--fleet-text-secondary)]">
                We use industry-standard encryption to protect your personal information. 
                Your password is encrypted and cannot be viewed by our team.
              </Caption>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}