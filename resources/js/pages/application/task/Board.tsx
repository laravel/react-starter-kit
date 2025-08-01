import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// project-imports
import TaskBoard from '@/sections/application/task/board';

// ==============================|| TASK BOARD ||============================== //

export default function TaskBoardPage() {
  return (
    <AppLayout>
      <Head title="Task board" />
      <TaskBoard />
    </AppLayout>
  )
}
