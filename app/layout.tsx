import './globals.css'
import { Figtree } from 'next/font/google'
import Sidebar from '@/components/Sidebar'
import SupabaseProvider from '@/provider/SupabaseProvider'
import UserProvider from '@/provider/UserProvider'
import ModalProvider from '@/provider/ModalProvider'
import ToasterProvider from '@/provider/ToasterProvider'
import getSongsByUserId from '@/actions/getSongsByUserId'
import Player from '@/components/Player'

const font = Figtree({ subsets: ['latin'] })

export const metadata = {
  title: 'Spotify-Music for Everyone',
  description: 'Listen to Music',
}

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const userSongs = await getSongsByUserId()
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider/>
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider/>
            <Sidebar songs={userSongs}>
              {children}
            </Sidebar>
            <Player/>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}
