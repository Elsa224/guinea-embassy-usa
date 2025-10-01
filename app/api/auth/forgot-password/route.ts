import { NextResponse } from "next/server"
import { db as prisma } from "@/lib/db"
import bcrypt from "bcryptjs"
import crypto from "crypto"

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      )
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    })

    if (!user) {
      // Don't reveal if user exists or not for security
      return NextResponse.json({
        message: "If an account with this email exists, you will receive a password reset link."
      })
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex')
    const resetTokenHash = await bcrypt.hash(resetToken, 12)
    const resetTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

    // Save reset token to database (we'll add this field to the User model)
    await prisma.user.update({
      where: { id: user.id },
      data: {
        // For now, we'll store in a temporary way since the schema doesn't have these fields
        // In production, you should add resetToken and resetTokenExpiry fields to the User model
      }
    })

    // TODO: Send email with reset link
    // For demo purposes, we'll just log it
    const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`
    console.log('Password reset URL:', resetUrl)

    // In production, send email here
    // await sendPasswordResetEmail(email, resetUrl)

    return NextResponse.json({
      message: "If an account with this email exists, you will receive a password reset link."
    })
  } catch (error) {
    console.error("Forgot password error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}