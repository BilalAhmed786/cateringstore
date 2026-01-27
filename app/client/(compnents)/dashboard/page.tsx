'use client'
import { useAuthRedirect } from "@/components/reusables/hooks/useAuthRedirect"

const Page = () => {
  const {isPending} = useAuthRedirect()
   
  if(isPending) return <>....</>
   return (
    <div>Clientdashboard</div>
  )
}

export default Page