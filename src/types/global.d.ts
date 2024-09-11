interface ITask {
	key: string
	taskId: string
	title: string
	desc: string
	status: TaskStatus
}

type TaskStatus = 'COMPLETED' | 'PENDING' | 'NOT_COMPLETED'

interface IModal {
	isOpen: boolean
	data: ITask | null
}
