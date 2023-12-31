import { useServerCookie } from '@/hooks/useServerCookie'
import { apiServer } from '@/services/apiServices'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  req: NextRequest,
  { params }: { params: { spaceId: number; commentId: number } },
) {
  const { token } = useServerCookie()
  const spaceId = params.spaceId
  const commentId = params.commentId
  const { searchParams } = new URL(req.url)
  const path = `/spaces/${spaceId}/comments/${commentId}/replies`
  const headers = {
    Authorization: `Bearer ${token}`,
  }

  try {
    const data = await apiServer.get(`${path}?${searchParams}`, {}, headers)
    return NextResponse.json(data)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.response.data.errorMessage },
      { status: error.response.status },
    )
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { spaceId: number; commentId: number } },
) {
  const { token } = useServerCookie()
  const { spaceId, commentId } = params
  const path = `/spaces/${spaceId}/comments/${commentId}/replies`
  const body = await req.json()
  const headers = {
    Authorization: `Bearer ${token}`,
  }

  try {
    const response = await apiServer.post(path, body, {}, headers)
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.response.data.errorMessage },
      { status: error.response.status },
    )
  }
}
