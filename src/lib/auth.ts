'use server'

import { cookies } from 'next/headers'
import fs from 'fs/promises'
import path from 'path'

const COOKIE_NAME = 'naturo_auth'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

interface Author {
  name: string
  bio: string
  picture: string
  links: {
    facebook: string
    whatsapp: string
  }
  password: string
}

export async function getAuthorData(): Promise<Author> {
  const filePath = path.join(process.cwd(), 'src/data/author.json')
  const data = await fs.readFile(filePath, 'utf-8')
  return JSON.parse(data)
}

export async function login(password: string): Promise<boolean> {
  const author = await getAuthorData()
  
  if (password === author.password) {
    const cookieStore = await cookies()
    cookieStore.set(COOKIE_NAME, 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: COOKIE_MAX_AGE,
      sameSite: 'lax',
      path: '/'
    })
    return true
  }
  
  return false
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  const authCookie = cookieStore.get(COOKIE_NAME)
  return authCookie?.value === 'authenticated'
}

export async function updateAuthor(data: Partial<Author>): Promise<boolean> {
  try {
    const filePath = path.join(process.cwd(), 'src/data/author.json')
    const currentData = await getAuthorData()
    const updatedData = { ...currentData, ...data }
    await fs.writeFile(filePath, JSON.stringify(updatedData, null, 2))
    return true
  } catch (error) {
    console.error('Error updating author:', error)
    return false
  }
}
