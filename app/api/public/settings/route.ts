import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const settings = await db.settings.findMany({
      select: {
        key: true,
        value: true
      }
    })

    // Convert to key-value object for easier frontend consumption
    const settingsMap = settings.reduce((acc: any, setting) => {
      acc[setting.key] = setting.value
      return acc
    }, {})

    return NextResponse.json(settingsMap)

  } catch (error) {
    console.error('Error fetching settings:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des paramètres' },
      { status: 500 }
    )
  }
}

// Cache settings for better performance
export const revalidate = 3600 // Revalidate every hour