// API Service - Example of how to use the configured axios instance
import api from './axiosConfig';

// User related API calls
export const userService = {
  // Get user profile
  getProfile: () => api.get('/user/profile'),
  
  // Update user profile
  updateProfile: (data) => api.put('/user/profile', data),
  
  // Change password
  changePassword: (data) => api.post('/user/change-password', data),
};

// Tasks related API calls
export const taskService = {
  // Get all tasks
  getTasks: () => api.get('/tasks'),
  
  // Get task by ID
  getTask: (id) => api.get(`/tasks/${id}`),
  
  // Create new task
  createTask: (data) => api.post('/tasks', data),
  
  // Update task
  updateTask: (id, data) => api.put(`/tasks/${id}`, data),
  
  // Delete task
  deleteTask: (id) => api.delete(`/tasks/${id}`),
};

// Analytics related API calls
export const analyticsService = {
  // Get user analytics
  getUserAnalytics: () => api.get('/analytics/user'),
  
  // Get project analytics
  getProjectAnalytics: (projectId) => api.get(`/analytics/project/${projectId}`),
  
  // Get team analytics
  getTeamAnalytics: () => api.get('/analytics/team'),
};

// Team related API calls
export const teamService = {
  // Get team members
  getTeamMembers: () => api.get('/team/members'),
  
  // Invite team member
  inviteMember: (data) => api.post('/team/invite', data),
  
  // Remove team member
  removeMember: (memberId) => api.delete(`/team/members/${memberId}`),
};

// Settings related API calls
export const settingsService = {
  // Get user settings
  getSettings: () => api.get('/settings'),
  
  // Update user settings
  updateSettings: (data) => api.put('/settings', data),
  
  // Get notification preferences
  getNotificationPreferences: () => api.get('/settings/notifications'),
  
  // Update notification preferences
  updateNotificationPreferences: (data) => api.put('/settings/notifications', data),
};

// Example usage in components:
/*
import { userService, taskService } from '../utils/apiService';

// In a component:
const fetchUserData = async () => {
  try {
    const response = await userService.getProfile();
    setUserData(response.data);
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

const createNewTask = async (taskData) => {
  try {
    const response = await taskService.createTask(taskData);
    console.log('Task created:', response.data);
  } catch (error) {
    console.error('Error creating task:', error);
  }
};
*/ 