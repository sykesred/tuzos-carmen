import { NextResponse } from 'next/server'
import { getLeads } from '@/lib/twilio/leads'

export const dynamic = 'force-dynamic'

// GET /api/leads — returns all collected leads as JSON
// Protect this endpoint with a secret token in production
export function GET(request: Request) {
  const token = new URL(request.url).searchParams.get('token')
  if (token !== process.env.LEADS_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const leads = getLeads()
  return NextResponse.json({ total: leads.length, leads })
}
 