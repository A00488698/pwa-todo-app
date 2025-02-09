import React, { useState, useEffect } from 'react'
import {
    TextField,
    Button,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Container,
    Typography,
    Pagination
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

const TaskManager = () => {
    const [tasks, setTasks] = useState([])
    const [newTask, setNewTask] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const tasksPerPage = 7

    // Load tasks from localStorage
    useEffect(() => {
        const savedTasks = localStorage.getItem('tasks')
        if (savedTasks) setTasks(JSON.parse(savedTasks))
    }, [])

    // Save tasks to localStorage
    const saveTasks = (tasksToSave) => {
        localStorage.setItem('tasks', JSON.stringify(tasksToSave))
    }

    // Add new task
    const addTask = () => {
        if (newTask.trim()) {
            const updatedTasks = [...tasks, { id: Date.now(), text: newTask.trim() }]
            setTasks(updatedTasks)
            saveTasks(updatedTasks)
            setNewTask('')
            setCurrentPage(Math.ceil(updatedTasks.length / tasksPerPage))
        }
    }

    // Delete task
    const deleteTask = (id) => {
        const updatedTasks = tasks.filter(task => task.id !== id)
        setTasks(updatedTasks)
        saveTasks(updatedTasks)
    }

    // Pagination calculations
    const indexOfLastTask = currentPage * tasksPerPage
    const indexOfFirstTask = indexOfLastTask - tasksPerPage
    const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask)
    const totalPages = Math.ceil(tasks.length / tasksPerPage)

    return (
        <Container
            disableGutters
            sx={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                width: '600px',
                margin: '0 auto',
                backgroundColor: 'background.paper',
                boxShadow: 3,
                overflowX: 'hidden',
                '@media (max-width: 600px)': {
                    width: '100%',
                    boxShadow: 'none'
                }
            }}
        >
            {/* Fixed Header */}
            <div style={{
                position: 'sticky',
                top: 0,
                backgroundColor: 'inherit',
                zIndex: 1000,
                padding: 16,
                borderBottom: '1px solid',
                borderColor: 'divider'
            }}>
                <Typography
                    variant="h4"
                    sx={{
                        fontSize: '2rem',
                        fontWeight: 500,
                        mb: 2,
                        color: 'text.primary'
                    }}
                >
                    Task Manager
                </Typography>

                <div style={{ display: 'flex', gap: 8 }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="New Task"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addTask()}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                height: 48
                            }
                        }}
                    />
                    <Button
                        variant="contained"
                        onClick={addTask}
                        sx={{
                            height: 48,
                            minWidth: 96,
                            flexShrink: 0
                        }}
                    >
                        Add
                    </Button>
                </div>
            </div>

            {/* Main Content Area */}
            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
            }}>
                {/* Scrollable Task List */}
                <div style={{
                    flex: 1,
                    overflowY: 'auto',
                    padding: 16,
                    paddingTop: 8
                }}>
                    <List sx={{
                        '& .MuiListItem-root': {
                            position: 'relative',
                            pr: '72px !important',
                            mb: 1,
                            borderRadius: 1,
                            border: '1px solid',
                            borderColor: 'divider',
                            '&:hover': {
                                backgroundColor: 'action.hover'
                            }
                        }
                    }}>
                        {currentTasks.map(task => (
                            <ListItem
                                key={task.id}
                                sx={{
                                    transition: 'all 0.2s',
                                    height: 56
                                }}
                            >
                                <ListItemText
                                    primary={task.text}
                                    primaryTypographyProps={{
                                        sx: {
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            pr: 2
                                        }
                                    }}
                                />
                                <IconButton
                                    sx={{
                                        position: 'absolute',
                                        right: 8,
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        color: 'error.main'
                                    }}
                                    onClick={() => deleteTask(task.id)}
                                >
                                    <DeleteIcon fontSize="medium" />
                                </IconButton>
                            </ListItem>
                        ))}
                    </List>
                </div>

                {/* Fixed Pagination */}
                <div style={{
                    position: 'sticky',
                    bottom: 0,
                    backgroundColor: 'background.paper',
                    borderTop: '1px solid',
                    borderColor: 'divider',
                    padding: '16px 24px',
                    zIndex: 1000
                }}>
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={(e, page) => setCurrentPage(page)}
                        sx={{
                            '& .MuiPagination-ul': {
                                justifyContent: 'center'
                            }
                        }}
                    />
                </div>
            </div>
        </Container>
    )
}

export default TaskManager