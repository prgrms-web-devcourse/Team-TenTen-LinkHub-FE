import { notify } from '@/components/common/Toast/Toast'

class FetchAPI {
  private baseURL: string
  private headers: { [key: string]: string }

  private static instance: FetchAPI

  private constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_INTERNAL_ADDRESS || ''
    this.headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    }
  }

  private async handleResponse(response: Response, type?: string) {
    if (!response.ok) {
      const data = await response.json()
      switch (response.status) {
        case 401:
          notify('error', '인증되지 않은 사용자입니다.')
          break
        case 404:
          notify(
            'error',
            `${data.errorMessage}` || '해당하는 요청을 찾을 수 없습니다.',
          )
          break
        case 500:
          notify(
            'error',
            `${data.errorMessage}` || '서버에 오류가 발생했습니다.',
          )
          break
        default:
          notify(
            'error',
            `${data.errorMessage}` || '알 수 없는 오류가 발생했습니다.',
          )
          break
      }
      return data
    } else {
      return type === 'delete' ? response : response.json()
    }
  }

  public static getInstance(): FetchAPI {
    if (!FetchAPI.instance) {
      FetchAPI.instance = new FetchAPI()
    }
    return FetchAPI.instance
  }

  public setBaseURL(url: string): void {
    this.baseURL = url
  }

  public setDefaultHeader(key: string, value: string): void {
    this.headers[key] = value
  }

  public async get(
    endpoint: string,
    nextInit: RequestInit = {},
    customHeaders: { [key: string]: string } = {},
  ): Promise<any> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'GET',
      headers: { ...this.headers, ...customHeaders },
      ...nextInit,
    })
    return this.handleResponse(response)
  }

  public async post(
    endpoint: string,
    body: any,
    nextInit: RequestInit = {},
    customHeaders: { [key: string]: string } = {},
    type: string = 'default',
  ): Promise<any> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers:
        type === 'multipart'
          ? { ...customHeaders }
          : { ...this.headers, ...customHeaders },
      body: type === 'multipart' ? body : JSON.stringify(body),
      ...nextInit,
    })
    return this.handleResponse(response)
  }

  public async put(
    endpoint: string,
    body: any,
    nextInit: RequestInit = {},
    customHeaders: { [key: string]: string } = {},
    type: string = 'default',
  ): Promise<any> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'PUT',
      headers:
        type === 'multipart'
          ? { ...customHeaders }
          : { ...this.headers, ...customHeaders },
      body: type === 'multipart' ? body : JSON.stringify(body),
      ...nextInit,
    })
    return this.handleResponse(response)
  }

  public async delete(
    endpoint: string,
    nextInit: RequestInit = {},
    customHeaders: { [key: string]: string } = {},
  ): Promise<any> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'DELETE',
      headers: { ...this.headers, ...customHeaders },
      ...nextInit,
    })
    return this.handleResponse(response, 'delete')
  }

  public async patch(
    endpoint: string,
    body: any,
    nextInit: RequestInit = {},
    customHeaders: { [key: string]: string } = {},
    type: string = 'default',
  ): Promise<any> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'PATCH',
      headers:
        type === 'multipart'
          ? { ...customHeaders }
          : { ...this.headers, ...customHeaders },
      body: type === 'multipart' ? body : JSON.stringify(body),
      ...nextInit,
    })
    return this.handleResponse(response)
  }
}

export default FetchAPI
