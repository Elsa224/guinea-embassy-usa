'use client'

import { useSession } from 'next-auth/react'
import { signIn, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AuthDebug() {
  const { data: session, status } = useSession()

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Authentication Debug</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">Session Status:</h3>
              <p className="text-gray-600">{status}</p>
            </div>

            {status === 'loading' && (
              <div className="text-blue-600">Loading session...</div>
            )}

            {status === 'unauthenticated' && (
              <div className="space-y-4">
                <div className="text-red-600">Not authenticated</div>
                <div className="space-y-2">
                  <Button 
                    onClick={() => signIn('credentials')}
                    className="mr-2"
                  >
                    Sign In with Credentials
                  </Button>
                  <div className="text-sm text-gray-500">
                    Or try direct credentials:
                  </div>
                  <Button 
                    onClick={() => signIn('credentials', {
                      email: 'admin@consulat-ci.org',
                      password: 'admin123',
                      callbackUrl: '/admin'
                    })}
                    variant="outline"
                  >
                    Quick Login (Demo)
                  </Button>
                </div>
              </div>
            )}

            {status === 'authenticated' && session && (
              <div className="space-y-4">
                <div className="text-green-600">✅ Authenticated!</div>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <h4 className="font-semibold">Session Data:</h4>
                  <pre className="text-sm mt-2 text-gray-700">
                    {JSON.stringify(session, null, 2)}
                  </pre>
                </div>
                <Button 
                  onClick={() => signOut()}
                  variant="destructive"
                >
                  Sign Out
                </Button>
              </div>
            )}

            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold">Environment Check:</h3>
              <div className="space-y-1 text-sm">
                <p>NEXTAUTH_URL: {process.env.NEXT_PUBLIC_NEXTAUTH_URL || 'Not set'}</p>
                <p>NEXTAUTH_SECRET: {process.env.NEXTAUTH_SECRET ? 'Set ✅' : 'Not set ❌'}</p>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold">Quick Actions:</h3>
              <div className="flex gap-2 flex-wrap">
                <Button 
                  onClick={() => window.location.href = '/admin'}
                  variant="outline"
                  size="sm"
                >
                  Go to Admin
                </Button>
                <Button 
                  onClick={() => window.location.href = '/auth/signin'}
                  variant="outline"
                  size="sm"
                >
                  Go to Sign In
                </Button>
                <Button 
                  onClick={() => window.location.href = '/'}
                  variant="outline"
                  size="sm"
                >
                  Go to Home
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}