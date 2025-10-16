import DashboardHeader from '@/components/custom/DashboardHeader';
import React from 'react'

const Page = () => {
  return (
    <div className="flex-1 bg-gradient-to-br from-blue-400 to-blue-500 overflow-auto">
      {/* Header */}
      <DashboardHeader
        title="Payments and Billings"
        description="Manage project payments and invoices efficiently."
      />
    </div>
  )
}

export default Page;