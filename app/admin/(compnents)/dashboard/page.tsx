'use client'
import { useAuthRedirect } from "@/components/reusables/hooks/useAuthRedirect"
const Page = () => {

  const {isPending} = useAuthRedirect()

  if(isPending) return <p>....</p>
  return (
    <div>AdminDashboard</div>
  )
}

export default Page