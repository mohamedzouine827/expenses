import BudgetsList from "@/pages/_components/dashboard/budgets/BudgetsList";
import DashboardLayout from "@/pages/_components/dashboard/layout";


function index() {
  return (
    <DashboardLayout >
      <div className="p-10">
        <h2 className="text-3xl font-bold mb-8">My Budgets</h2>
        <BudgetsList />
      </div>
      </DashboardLayout>
  )
}

export default index